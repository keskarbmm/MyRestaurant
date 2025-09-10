# 🍦 Ice Cream Parlour Backend API

Node.js/Express backend API for the Sweet Dreams Ice Cream Parlour application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6.0+

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/          # Database models
│   │   ├── User.ts
│   │   ├── MenuItem.ts
│   │   ├── Review.ts
│   │   ├── BlogPost.ts
│   │   └── ContactMessage.ts
│   ├── routes/          # API routes
│   │   ├── auth.ts
│   │   ├── menu.ts
│   │   ├── reviews.ts
│   │   ├── blog.ts
│   │   ├── contact.ts
│   │   └── admin.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.ts
│   │   └── upload.ts
│   ├── scripts/         # Utility scripts
│   │   └── seed.ts
│   └── server.ts        # Main server file
├── uploads/             # File uploads directory
├── dist/                # Compiled JavaScript
├── package.json
├── tsconfig.json
└── Dockerfile
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Register new admin

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Create menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)
- `PATCH /api/menu/:id/availability` - Toggle availability (Admin)

### Reviews
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews/stats` - Get review statistics
- `PATCH /api/reviews/:id/approve` - Approve/reject review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Admin)

### Blog Posts
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/blog` - Create blog post (Admin)
- `PUT /api/blog/:id` - Update blog post (Admin)
- `DELETE /api/blog/:id` - Delete blog post (Admin)
- `PATCH /api/blog/:id/publish` - Toggle publish status (Admin)

### Contact Messages
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get contact messages (Admin)
- `GET /api/contact/:id` - Get single message (Admin)
- `PATCH /api/contact/:id/read` - Mark as read/unread (Admin)
- `DELETE /api/contact/:id` - Delete message (Admin)
- `GET /api/contact/stats/overview` - Get message statistics (Admin)

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/recent-activity` - Get recent activity
- `GET /api/admin/menu-categories` - Get menu category stats
- `GET /api/admin/review-trends` - Get review trends

## 🗄️ Database Models

### User
```typescript
{
  username: string;
  email: string;
  password: string; // hashed
  role: 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}
```

### MenuItem
```typescript
{
  name: string;
  description: string;
  price: number;
  category: 'ice-cream' | 'snacks' | 'beverages' | 'desserts' | 'specialty';
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
```

### Review
```typescript
{
  customerName: string;
  email?: string;
  rating: number; // 1-5
  comment: string;
  isApproved: boolean;
  menuItemId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

### BlogPost
```typescript
{
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: 'news' | 'recipes' | 'events' | 'tips' | 'seasonal';
  imageUrl?: string;
  published: boolean;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### ContactMessage
```typescript
{
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS configuration
- Rate limiting
- Helmet.js security headers
- File upload validation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t ice-cream-backend .

# Run container
docker run -p 5000:5000 ice-cream-backend
```

### Production
```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ice-cream-parlour
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔧 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run seed` - Seed database with sample data

## 📊 Monitoring

The API includes:
- Request logging with Morgan
- Error handling middleware
- Health check endpoint (`/api/health`)
- Performance monitoring ready for Azure Application Insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.