import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  customerName: string;
  email?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  menuItemId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  menuItemId: {
    type: Schema.Types.ObjectId,
    ref: 'MenuItem'
  }
}, {
  timestamps: true
});

// Index for efficient queries
ReviewSchema.index({ isApproved: 1, createdAt: -1 });
ReviewSchema.index({ rating: 1 });

export default mongoose.model<IReview>('Review', ReviewSchema);