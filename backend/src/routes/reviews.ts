import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Review from '../models/Review';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get approved reviews
// @access  Public
router.get('/', [
  query('approved').optional().isBoolean(),
  query('menuItem').optional().isMongoId(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { approved = 'true', menuItem, limit = 10, page = 1 } = req.query;
    const filter: any = {};

    if (approved !== undefined) {
      filter.isApproved = approved === 'true';
    }

    if (menuItem) {
      filter.menuItemId = menuItem;
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const reviews = await Review.find(filter)
      .populate('menuItemId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await Review.countDocuments(filter);

    res.json({
      reviews,
      pagination: {
        current: parseInt(page as string),
        pages: Math.ceil(total / parseInt(limit as string)),
        total
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews
// @desc    Submit new review
// @access  Public
router.post('/', [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
  body('menuItemId').optional().isMongoId().withMessage('Invalid menu item ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerName, email, rating, comment, menuItemId } = req.body;

    const review = new Review({
      customerName,
      email,
      rating: parseInt(rating),
      comment,
      menuItemId: menuItemId || undefined
    });

    await review.save();

    res.status(201).json({
      message: 'Review submitted successfully. It will be published after approval.',
      review
    });
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/stats
// @desc    Get review statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await Review.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }

    const { averageRating, totalReviews, ratingDistribution } = stats[0];
    
    // Calculate rating distribution
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingDistribution.forEach((rating: number) => {
      distribution[rating as keyof typeof distribution]++;
    });

    res.json({
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingDistribution: distribution
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/reviews/:id/approve
// @desc    Approve/reject review
// @access  Private (Admin only)
router.patch('/:id/approve', authenticate, authorize('admin'), [
  body('isApproved').isBoolean().withMessage('isApproved must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { isApproved } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.isApproved = isApproved;
    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;