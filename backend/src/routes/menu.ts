import express from 'express';
import { body, validationResult, query } from 'express-validator';
import MenuItem from '../models/MenuItem';
import { authenticate, authorize } from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', [
  query('category').optional().isIn(['ice-cream', 'snacks', 'beverages', 'desserts', 'specialty']),
  query('available').optional().isBoolean(),
  query('special').optional().isBoolean(),
  query('search').optional().isString().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, available, special, search } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (available !== undefined) filter.isAvailable = available === 'true';
    if (special !== undefined) filter.isSpecial = special === 'true';
    if (search) {
      filter.$text = { $search: search as string };
    }

    const menuItems = await MenuItem.find(filter)
      .sort({ category: 1, name: 1 })
      .lean();

    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem);
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/menu
// @desc    Create new menu item
// @access  Private (Admin only)
router.post('/', authenticate, authorize('admin'), upload.single('image'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['ice-cream', 'snacks', 'beverages', 'desserts', 'specialty']).withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, category, allergens, nutritionInfo, isSpecial } = req.body;
    
    const menuItem = new MenuItem({
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      allergens: allergens ? JSON.parse(allergens) : [],
      nutritionInfo: nutritionInfo ? JSON.parse(nutritionInfo) : undefined,
      isSpecial: isSpecial === 'true'
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private (Admin only)
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('category').optional().isIn(['ice-cream', 'snacks', 'beverages', 'desserts', 'specialty']).withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const updateData: any = { ...req.body };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    if (updateData.allergens) {
      updateData.allergens = JSON.parse(updateData.allergens);
    }

    if (updateData.nutritionInfo) {
      updateData.nutritionInfo = JSON.parse(updateData.nutritionInfo);
    }

    if (updateData.price) {
      updateData.price = parseFloat(updateData.price);
    }

    if (updateData.isSpecial !== undefined) {
      updateData.isSpecial = updateData.isSpecial === 'true';
    }

    if (updateData.isAvailable !== undefined) {
      updateData.isAvailable = updateData.isAvailable === 'true';
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedMenuItem);
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/menu/:id/availability
// @desc    Toggle menu item availability
// @access  Private (Admin only)
router.patch('/:id/availability', authenticate, authorize('admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();

    res.json(menuItem);
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;