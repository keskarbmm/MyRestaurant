import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Star, Quote, Plus, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getReviews, getReviewStats, createReview } from '../services/api';

interface Review {
  _id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewFormData {
  customerName: string;
  email: string;
  rating: number;
  comment: string;
}

const Testimonials: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>();

  const { data: reviewsData, isLoading, refetch } = useQuery('reviews', () => getReviews({ limit: 20 }));
  const { data: stats } = useQuery('reviewStats', getReviewStats);

  const reviews = reviewsData?.reviews || [];

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await createReview(data);
      toast.success('Thank you for your review! It will be published after approval.');
      reset();
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-accent-500 fill-current' : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-accent-400' : ''}`}
        onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Customer Reviews
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              See what our customers are saying about their Sweet Dreams experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {stats.averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {renderStars(Math.round(stats.averageRating))}
                  </div>
                  <p className="text-gray-600">Average Rating</p>
                </div>
                <div className="card">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {stats.totalReviews}
                  </div>
                  <p className="text-gray-600">Total Reviews</p>
                </div>
                <div className="card">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {stats.ratingDistribution[5] || 0}
                  </div>
                  <p className="text-gray-600">5-Star Reviews</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              What Our Customers Say
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Experience</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      {...register('customerName', { required: 'Name is required' })}
                      className="input-field"
                      placeholder="Enter your name"
                    />
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      {...register('email', { 
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="input-field"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderStars(0, true, (rating) => {
                      // This would need to be handled with a state variable for the form
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    {...register('comment', { required: 'Review is required' })}
                    rows={4}
                    className="input-field"
                    placeholder="Tell us about your experience..."
                  />
                  {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary inline-flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Reviews List */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review: Review, index: number) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <div className="absolute top-4 left-4 text-primary-200">
                    <Quote className="w-8 h-8" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>

                    <p className="text-gray-700 italic line-clamp-4">
                      "{review.comment}"
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {review.customerName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {review.customerName.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your experience with us!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Write the First Review
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;