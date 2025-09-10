# 🍦 Ice Cream Parlour Frontend

React frontend application for the Sweet Dreams Ice Cream Parlour website.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to http://localhost:3000

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── home/          # Home page components
│   │   │   ├── Hero.tsx
│   │   │   ├── WhatsNew.tsx
│   │   │   ├── DealsOfTheWeek.tsx
│   │   │   ├── GuestReviews.tsx
│   │   │   └── ContactInfo.tsx
│   │   └── menu/          # Menu page components
│   │       ├── MenuItemCard.tsx
│   │       ├── CategoryFilter.tsx
│   │       └── SearchBar.tsx
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Menu.tsx
│   │   ├── Location.tsx
│   │   ├── OurStory.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── services/          # API service functions
│   │   └── api.ts
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # Entry point
│   └── index.css          # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── Dockerfile
```

## 🎨 Features

### Customer Pages
- **Home Page**: Hero section, what's new, deals, reviews, contact info
- **Menu Page**: Complete menu with search, filtering, and categories
- **Location Page**: Store location with map and directions
- **Our Story Page**: Company history, mission, values, team
- **Testimonials Page**: Customer reviews with submission form
- **Blog Page**: News, recipes, events, seasonal content
- **Contact Page**: Contact form and store information

### Admin Console
- **Dashboard**: Overview statistics and recent activity
- **Menu Management**: Add, edit, delete menu items
- **Review Management**: Approve/reject customer reviews
- **Content Management**: Manage blog posts and announcements
- **Message Management**: Handle customer inquiries

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **React Query** for data fetching and caching
- **React Hook Form** for form handling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Axios** for HTTP requests

## 🎨 Styling

The application uses Tailwind CSS with a custom design system:

### Color Palette
- **Primary**: Red tones for ice cream theme
- **Secondary**: Blue tones for complementary elements
- **Accent**: Yellow tones for highlights and special items

### Typography
- **Headings**: Poppins font family
- **Body**: Inter font family

### Components
- Custom button styles (primary, secondary, outline)
- Card components with consistent styling
- Form components with validation states
- Responsive grid layouts

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px+

## 🔧 Configuration

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Tailwind Configuration

The app uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Responsive utilities
- Component classes

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Build and Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Docker
```bash
# Build image
docker build -t ice-cream-frontend .

# Run container
docker run -p 3000:80 ice-cream-frontend
```

## 📊 Performance Optimizations

- **Code Splitting**: Automatic code splitting with React.lazy
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching**: React Query for intelligent data caching
- **Compression**: Gzip compression in production

## 🎯 SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: Schema markup for business information
- **Sitemap**: XML sitemap generation
- **URL Structure**: SEO-friendly URLs
- **Performance**: Core Web Vitals optimization

## 🔒 Security Features

- **XSS Protection**: Input sanitization and validation
- **CSRF Protection**: Token-based CSRF protection
- **Content Security Policy**: CSP headers
- **Secure Headers**: Security headers via Helmet.js
- **Input Validation**: Client-side and server-side validation

## 📱 PWA Features (Future)

- Service Worker for offline functionality
- Web App Manifest for installability
- Push notifications for updates
- Background sync for form submissions

## 🎨 Design System

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Consistent card styling with hover effects
- **Forms**: Styled form inputs with validation states
- **Navigation**: Responsive navigation with mobile menu
- **Modals**: Reusable modal components

### Animations
- **Framer Motion**: Smooth page transitions
- **Hover Effects**: Interactive element animations
- **Loading States**: Skeleton loaders and spinners
- **Micro-interactions**: Button and form feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   ```bash
   # Clear build cache
   npm run build -- --reset-cache
   ```

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Framer Motion Documentation](https://www.framer.com/motion/)