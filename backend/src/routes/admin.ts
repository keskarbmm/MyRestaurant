import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import MenuItem from '../models/MenuItem';
import Review from '../models/Review';
import BlogPost from '../models/BlogPost';
import ContactMessage from '../models/ContactMessage';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', async (req, res) => {
  try {
    const [
      menuStats,
      reviewStats,
      blogStats,
      contactStats
    ] = await Promise.all([
      // Menu statistics
      MenuItem.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            available: { $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] } },
            unavailable: { $sum: { $cond: [{ $eq: ['$isAvailable', false] }, 1, 0] } },
            specials: { $sum: { $cond: [{ $eq: ['$isSpecial', true] }, 1, 0] } }
          }
        }
      ]),
      
      // Review statistics
      Review.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            approved: { $sum: { $cond: [{ $eq: ['$isApproved', true] }, 1, 0] } },
            pending: { $sum: { $cond: [{ $eq: ['$isApproved', false] }, 1, 0] } },
            averageRating: { $avg: '$rating' }
          }
        }
      ]),
      
      // Blog statistics
      BlogPost.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            published: { $sum: { $cond: [{ $eq: ['$published', true] }, 1, 0] } },
            drafts: { $sum: { $cond: [{ $eq: ['$published', false] }, 1, 0] } },
            totalViews: { $sum: '$viewCount' }
          }
        }
      ]),
      
      // Contact statistics
      ContactMessage.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            read: { $sum: { $cond: [{ $eq: ['$isRead', true] }, 1, 0] } },
            unread: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } }
          }
        }
      ])
    ]);

    const dashboard = {
      menu: menuStats[0] || { total: 0, available: 0, unavailable: 0, specials: 0 },
      reviews: reviewStats[0] || { total: 0, approved: 0, pending: 0, averageRating: 0 },
      blog: blogStats[0] || { total: 0, published: 0, drafts: 0, totalViews: 0 },
      contact: contactStats[0] || { total: 0, read: 0, unread: 0 }
    };

    res.json(dashboard);
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/recent-activity
// @desc    Get recent activity across all modules
// @access  Private (Admin only)
router.get('/recent-activity', async (req, res) => {
  try {
    const [recentReviews, recentMessages, recentBlogPosts] = await Promise.all([
      Review.find({ isApproved: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('customerName rating comment createdAt')
        .lean(),
      
      ContactMessage.find({ isRead: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name subject createdAt')
        .lean(),
      
      BlogPost.find({ published: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title author createdAt')
        .lean()
    ]);

    res.json({
      pendingReviews: recentReviews,
      unreadMessages: recentMessages,
      draftPosts: recentBlogPosts
    });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/menu-categories
// @desc    Get menu item statistics by category
// @access  Private (Admin only)
router.get('/menu-categories', async (req, res) => {
  try {
    const categoryStats = await MenuItem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          available: { $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] } },
          specials: { $sum: { $cond: [{ $eq: ['$isSpecial', true] }, 1, 0] } },
          averagePrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(categoryStats);
  } catch (error) {
    console.error('Get menu categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/review-trends
// @desc    Get review trends over time
// @access  Private (Admin only)
router.get('/review-trends', async (req, res) => {
  try {
    const trends = await Review.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 },
          averageRating: { $avg: '$rating' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.json(trends);
  } catch (error) {
    console.error('Get review trends error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;