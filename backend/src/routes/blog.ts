import express from 'express';
import { body, validationResult, query } from 'express-validator';
import BlogPost from '../models/BlogPost';
import { authenticate, authorize } from '../middleware/auth';
import upload from '../middleware/upload';

const router = express.Router();

// @route   GET /api/blog
// @desc    Get published blog posts
// @access  Public
router.get('/', [
  query('category').optional().isIn(['news', 'recipes', 'events', 'tips', 'seasonal']),
  query('search').optional().isString().trim(),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('page').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, search, limit = 10, page = 1 } = req.query;
    const filter: any = { published: true };

    if (category) filter.category = category;
    if (search) {
      filter.$text = { $search: search as string };
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const blogPosts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await BlogPost.countDocuments(filter);

    res.json({
      posts: blogPosts,
      pagination: {
        current: parseInt(page as string),
        pages: Math.ceil(total / parseInt(limit as string)),
        total
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:id
// @desc    Get single blog post
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost || !blogPost.published) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment view count
    blogPost.viewCount += 1;
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Private (Admin only)
router.post('/', authenticate, authorize('admin'), upload.single('image'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('category').isIn(['news', 'recipes', 'events', 'tips', 'seasonal']).withMessage('Invalid category'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, author, category, tags = [], published = false } = req.body;
    
    const blogPost = new BlogPost({
      title,
      content,
      excerpt,
      author,
      category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      tags: Array.isArray(tags) ? tags : JSON.parse(tags),
      published: published === 'true' || published === true
    });

    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private (Admin only)
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('excerpt').optional().notEmpty().withMessage('Excerpt cannot be empty'),
  body('category').optional().isIn(['news', 'recipes', 'events', 'tips', 'seasonal']).withMessage('Invalid category'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const updateData: any = { ...req.body };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    if (updateData.tags) {
      updateData.tags = Array.isArray(updateData.tags) ? updateData.tags : JSON.parse(updateData.tags);
    }

    if (updateData.published !== undefined) {
      updateData.published = updateData.published === 'true' || updateData.published === true;
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedBlogPost);
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/blog/:id/publish
// @desc    Toggle blog post published status
// @access  Private (Admin only)
router.patch('/:id/publish', authenticate, authorize('admin'), [
  body('published').isBoolean().withMessage('Published must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { published } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blogPost.published = published;
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error('Toggle publish status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;