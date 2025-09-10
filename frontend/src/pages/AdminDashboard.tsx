import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  getDashboardStats, 
  getRecentActivity, 
  getMenuItems, 
  getReviews, 
  getContactMessages,
  getBlogPosts,
  deleteMenuItem,
  deleteReview,
  deleteContactMessage,
  deleteBlogPost,
  approveReview,
  markContactMessageRead
} from '../services/api';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch data
  const { data: stats } = useQuery('dashboardStats', getDashboardStats);
  const { data: recentActivity } = useQuery('recentActivity', getRecentActivity);
  const { data: menuItems } = useQuery('adminMenuItems', () => getMenuItems({}));
  const { data: reviews } = useQuery('adminReviews', () => getReviews({}));
  const { data: contactMessages } = useQuery('adminContactMessages', () => getContactMessages({}));
  const { data: blogPosts } = useQuery('adminBlogPosts', () => getBlogPosts({}));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (type) {
        case 'menuItem':
          await deleteMenuItem(id);
          break;
        case 'review':
          await deleteReview(id);
          break;
        case 'contactMessage':
          await deleteContactMessage(id);
          break;
        case 'blogPost':
          await deleteBlogPost(id);
          break;
      }
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const handleApproveReview = async (id: string, approved: boolean) => {
    try {
      await approveReview(id, approved);
      toast.success(`Review ${approved ? 'approved' : 'rejected'}`);
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    try {
      await markContactMessageRead(id, read);
      toast.success(`Message marked as ${read ? 'read' : 'unread'}`);
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'menu', name: 'Menu Items', icon: FileText },
    { id: 'reviews', name: 'Reviews', icon: MessageSquare },
    { id: 'messages', name: 'Messages', icon: Users },
    { id: 'blog', name: 'Blog Posts', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍦</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Menu Items</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.menu?.total || 0}</p>
                        <p className="text-xs text-gray-500">{stats?.menu?.available || 0} available</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Reviews</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.reviews?.total || 0}</p>
                        <p className="text-xs text-gray-500">{stats?.reviews?.pending || 0} pending</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Messages</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.contact?.total || 0}</p>
                        <p className="text-xs text-gray-500">{stats?.contact?.unread || 0} unread</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                        <p className="text-2xl font-bold text-gray-900">{stats?.blog?.total || 0}</p>
                        <p className="text-xs text-gray-500">{stats?.blog?.published || 0} published</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
                    <div className="space-y-3">
                      {recentActivity?.pendingReviews?.slice(0, 3).map((review: any) => (
                        <div key={review._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{review.customerName}</p>
                            <p className="text-sm text-gray-600">{review.comment.substring(0, 50)}...</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveReview(review._id, true)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleApproveReview(review._id, false)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
                    <div className="space-y-3">
                      {recentActivity?.unreadMessages?.slice(0, 3).map((message: any) => (
                        <div key={message._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{message.name}</p>
                            <p className="text-sm text-gray-600">{message.subject}</p>
                          </div>
                          <button
                            onClick={() => handleMarkRead(message._id, true)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
                  <button className="btn-primary inline-flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </button>
                </div>

                <div className="card">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {menuItems?.slice(0, 10).map((item: any) => (
                          <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.isAvailable 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item.isAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete('menuItem', item._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Similar tables for other tabs would go here */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <div className="card">
                  <p className="text-gray-600">Review management interface would go here</p>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
                <div className="card">
                  <p className="text-gray-600">Message management interface would go here</p>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
                <div className="card">
                  <p className="text-gray-600">Blog management interface would go here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;