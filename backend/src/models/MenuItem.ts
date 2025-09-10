import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  isSpecial: boolean;
  allergens?: string[];
  nutritionInfo?: {
    calories?: number;
    fat?: number;
    protein?: number;
    carbs?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['ice-cream', 'snacks', 'beverages', 'desserts', 'specialty'],
    default: 'ice-cream'
  },
  imageUrl: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  allergens: [{
    type: String,
    enum: ['dairy', 'eggs', 'nuts', 'soy', 'gluten', 'sulfites']
  }],
  nutritionInfo: {
    calories: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    protein: { type: Number, min: 0 },
    carbs: { type: Number, min: 0 }
  }
}, {
  timestamps: true
});

// Index for efficient queries
MenuItemSchema.index({ category: 1, isAvailable: 1 });
MenuItemSchema.index({ isSpecial: 1 });
MenuItemSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);