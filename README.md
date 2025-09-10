# 🍦 Sweet Dreams Ice Cream Parlour

A complete full-stack web application for an ice cream parlour and snacks center, built with modern technologies and deployed on Microsoft Azure.

## 🌟 Features

### Customer-Facing Website
- **Home Page**: Hero section, what's new, deals of the week, guest reviews, contact info
- **Menu Page**: Complete menu with categories, search, filtering, and detailed item information
- **Location Page**: Store location with map integration and directions
- **Our Story Page**: Company history, mission, values, and team information
- **Testimonials Page**: Customer reviews with rating system and submission form
- **Blog Page**: News, recipes, events, and seasonal content
- **Contact Page**: Contact form, store information, and quick actions

### Administrative Console
- **Dashboard**: Overview statistics and recent activity
- **Menu Management**: Add, edit, delete, and manage menu items
- **Review Management**: Approve/reject customer reviews
- **Content Management**: Manage blog posts and announcements
- **Message Management**: Handle customer inquiries and feedback
- **Analytics**: Track performance and customer engagement

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for data fetching
- **React Hook Form** for forms
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Express Validator** for validation
- **Bcrypt** for password hashing

### Infrastructure
- **Microsoft Azure** for cloud hosting
- **Azure App Service** for web hosting
- **Azure Database for MongoDB** for database
- **Azure Blob Storage** for file storage
- **Azure CDN** for content delivery
- **Docker** for containerization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ice-cream-parlour.git
   cd ice-cream-parlour
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # From root directory
   npm run dev
   ```

   This will start:
   - Backend API on http://localhost:5000
   - Frontend on http://localhost:3000

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

### Default Admin Credentials
- Email: admin@icecreamparlour.com
- Password: admin123

## 📁 Project Structure

```
ice-cream-parlour/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── ...
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── ...
│   ├── uploads/            # File uploads directory
│   └── package.json
├── azure-deployment/        # Azure deployment configuration
│   ├── azure-pipelines.yml # CI/CD pipeline
│   ├── azure-resources.bicep # Infrastructure as code
│   └── docker-compose.yml  # Docker configuration
└── README.md
```

## 🚀 Deployment

### Azure Deployment

1. **Set up Azure resources**
   ```bash
   # Login to Azure
   az login
   
   # Deploy infrastructure
   az deployment group create \
     --resource-group ice-cream-parlour-rg \
     --template-file azure-deployment/azure-resources.bicep
   ```

2. **Deploy application**
   ```bash
   # Build and push Docker images
   docker-compose -f azure-deployment/docker-compose.yml build
   docker-compose -f azure-deployment/docker-compose.yml push
   
   # Deploy to Azure App Service
   az webapp deployment container config \
     --name ice-cream-parlour-app \
     --resource-group ice-cream-parlour-rg \
     --enable-cd true
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose -f azure-deployment/docker-compose.yml up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin: http://localhost:3000/admin

## 📊 API Documentation

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

### Reviews
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review
- `GET /api/reviews/stats` - Get review statistics
- `PATCH /api/reviews/:id/approve` - Approve/reject review (Admin)

### Blog Posts
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/blog` - Create blog post (Admin)
- `PUT /api/blog/:id` - Update blog post (Admin)
- `DELETE /api/blog/:id` - Delete blog post (Admin)

### Contact Messages
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get contact messages (Admin)
- `PATCH /api/contact/:id/read` - Mark message as read (Admin)

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Test Coverage
```bash
# Backend coverage
cd backend
npm run test:coverage

# Frontend coverage
cd frontend
npm run test:coverage
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ice-cream-parlour
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Helmet.js security headers
- HTTPS enforcement in production

## 📈 Performance Optimizations

- Image optimization and lazy loading
- Code splitting and tree shaking
- CDN integration
- Database indexing
- Caching strategies
- Gzip compression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@sweetdreams.com or create an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database
- Microsoft Azure for the cloud platform
- All the open-source contributors

---

**Made with ❤️ for ice cream lovers everywhere! 🍦**