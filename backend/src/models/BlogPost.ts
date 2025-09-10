import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  imageUrl?: string;
  published: boolean;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [50, 'Author name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['news', 'recipes', 'events', 'tips', 'seasonal'],
    default: 'news'
  },
  imageUrl: {
    type: String,
    trim: true
  },
  published: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
BlogPostSchema.index({ published: 1, createdAt: -1 });
BlogPostSchema.index({ category: 1, published: 1 });
BlogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
BlogPostSchema.index({ tags: 1 });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);