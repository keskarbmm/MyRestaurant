import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  getMe: () => api.get('/auth/me'),
  
  register: (userData: any) => api.post('/auth/register', userData),
};

// Menu API
export const getMenuItems = (params: any = {}) =>
  api.get('/menu', { params }).then(res => res.data);

export const getMenuItem = (id: string) =>
  api.get(`/menu/${id}`).then(res => res.data);

export const createMenuItem = (data: any) =>
  api.post('/menu', data).then(res => res.data);

export const updateMenuItem = (id: string, data: any) =>
  api.put(`/menu/${id}`, data).then(res => res.data);

export const deleteMenuItem = (id: string) =>
  api.delete(`/menu/${id}`).then(res => res.data);

export const toggleMenuItemAvailability = (id: string) =>
  api.patch(`/menu/${id}/availability`).then(res => res.data);

// Reviews API
export const getReviews = (params: any = {}) =>
  api.get('/reviews', { params }).then(res => res.data);

export const getReviewStats = () =>
  api.get('/reviews/stats').then(res => res.data);

export const createReview = (data: any) =>
  api.post('/reviews', data).then(res => res.data);

export const approveReview = (id: string, isApproved: boolean) =>
  api.patch(`/reviews/${id}/approve`, { isApproved }).then(res => res.data);

export const deleteReview = (id: string) =>
  api.delete(`/reviews/${id}`).then(res => res.data);

// Blog API
export const getBlogPosts = (params: any = {}) =>
  api.get('/blog', { params }).then(res => res.data);

export const getBlogPost = (id: string) =>
  api.get(`/blog/${id}`).then(res => res.data);

export const createBlogPost = (data: any) =>
  api.post('/blog', data).then(res => res.data);

export const updateBlogPost = (id: string, data: any) =>
  api.put(`/blog/${id}`, data).then(res => res.data);

export const deleteBlogPost = (id: string) =>
  api.delete(`/blog/${id}`).then(res => res.data);

export const toggleBlogPostPublish = (id: string, published: boolean) =>
  api.patch(`/blog/${id}/publish`, { published }).then(res => res.data);

// Contact API
export const getContactMessages = (params: any = {}) =>
  api.get('/contact', { params }).then(res => res.data);

export const getContactMessage = (id: string) =>
  api.get(`/contact/${id}`).then(res => res.data);

export const createContactMessage = (data: any) =>
  api.post('/contact', data).then(res => res.data);

export const markContactMessageRead = (id: string, isRead: boolean) =>
  api.patch(`/contact/${id}/read`, { isRead }).then(res => res.data);

export const deleteContactMessage = (id: string) =>
  api.delete(`/contact/${id}`).then(res => res.data);

export const getContactStats = () =>
  api.get('/contact/stats/overview').then(res => res.data);

// Admin API
export const getDashboardStats = () =>
  api.get('/admin/dashboard').then(res => res.data);

export const getRecentActivity = () =>
  api.get('/admin/recent-activity').then(res => res.data);

export const getMenuCategories = () =>
  api.get('/admin/menu-categories').then(res => res.data);

export const getReviewTrends = () =>
  api.get('/admin/review-trends').then(res => res.data);

export default api;