import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import MenuItem from '../models/MenuItem';
import Review from '../models/Review';
import BlogPost from '../models/BlogPost';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ice-cream-parlour');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await Review.deleteMany({});
    await BlogPost.deleteMany({});

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@icecreamparlour.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create sample menu items
    const menuItems = [
      // Ice Cream Flavors
      {
        name: 'Vanilla Dream',
        description: 'Classic vanilla ice cream made with real vanilla beans',
        price: 4.99,
        category: 'ice-cream',
        isAvailable: true,
        isSpecial: false,
        allergens: ['dairy'],
        nutritionInfo: { calories: 250, fat: 12, protein: 4, carbs: 32 }
      },
      {
        name: 'Chocolate Fudge',
        description: 'Rich chocolate ice cream with fudge swirls',
        price: 5.49,
        category: 'ice-cream',
        isAvailable: true,
        isSpecial: true,
        allergens: ['dairy'],
        nutritionInfo: { calories: 280, fat: 15, protein: 5, carbs: 35 }
      },
      {
        name: 'Strawberry Swirl',
        description: 'Creamy strawberry ice cream with real fruit pieces',
        price: 5.29,
        category: 'ice-cream',
        isAvailable: true,
        isSpecial: false,
        allergens: ['dairy'],
        nutritionInfo: { calories: 260, fat: 13, protein: 4, carbs: 33 }
      },
      {
        name: 'Mint Chocolate Chip',
        description: 'Refreshing mint ice cream with chocolate chips',
        price: 5.79,
        category: 'ice-cream',
        isAvailable: true,
        isSpecial: false,
        allergens: ['dairy'],
        nutritionInfo: { calories: 270, fat: 14, protein: 4, carbs: 34 }
      },
      {
        name: 'Cookies & Cream',
        description: 'Vanilla ice cream loaded with chocolate cookie pieces',
        price: 5.99,
        category: 'ice-cream',
        isAvailable: true,
        isSpecial: true,
        allergens: ['dairy', 'gluten'],
        nutritionInfo: { calories: 290, fat: 16, protein: 5, carbs: 36 }
      },
      
      // Snacks
      {
        name: 'Waffle Cone',
        description: 'Freshly made crispy waffle cone',
        price: 1.99,
        category: 'snacks',
        isAvailable: true,
        isSpecial: false,
        allergens: ['gluten', 'eggs'],
        nutritionInfo: { calories: 120, fat: 3, protein: 3, carbs: 22 }
      },
      {
        name: 'Chocolate Chip Cookies',
        description: 'Soft and chewy chocolate chip cookies',
        price: 2.49,
        category: 'snacks',
        isAvailable: true,
        isSpecial: false,
        allergens: ['gluten', 'eggs', 'dairy'],
        nutritionInfo: { calories: 180, fat: 8, protein: 2, carbs: 26 }
      },
      {
        name: 'Brownie Sundae',
        description: 'Warm brownie topped with ice cream and chocolate sauce',
        price: 7.99,
        category: 'snacks',
        isAvailable: true,
        isSpecial: true,
        allergens: ['gluten', 'eggs', 'dairy'],
        nutritionInfo: { calories: 450, fat: 22, protein: 6, carbs: 58 }
      },
      
      // Beverages
      {
        name: 'Milkshake - Vanilla',
        description: 'Thick and creamy vanilla milkshake',
        price: 4.49,
        category: 'beverages',
        isAvailable: true,
        isSpecial: false,
        allergens: ['dairy'],
        nutritionInfo: { calories: 320, fat: 12, protein: 8, carbs: 45 }
      },
      {
        name: 'Milkshake - Chocolate',
        description: 'Rich chocolate milkshake with whipped cream',
        price: 4.99,
        category: 'beverages',
        isAvailable: true,
        isSpecial: false,
        allergens: ['dairy'],
        nutritionInfo: { calories: 380, fat: 16, protein: 9, carbs: 52 }
      },
      {
        name: 'Fresh Lemonade',
        description: 'Refreshing freshly squeezed lemonade',
        price: 2.99,
        category: 'beverages',
        isAvailable: true,
        isSpecial: false,
        allergens: [],
        nutritionInfo: { calories: 120, fat: 0, protein: 0, carbs: 32 }
      }
    ];

    for (const item of menuItems) {
      const menuItem = new MenuItem(item);
      await menuItem.save();
    }
    console.log('Menu items created');

    // Create sample reviews
    const reviews = [
      {
        customerName: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        rating: 5,
        comment: 'Amazing ice cream! The vanilla dream is absolutely perfect. Will definitely come back!',
        isApproved: true
      },
      {
        customerName: 'Mike Chen',
        email: 'mike.chen@email.com',
        rating: 4,
        comment: 'Great variety of flavors. The chocolate fudge is my favorite. Service was excellent.',
        isApproved: true
      },
      {
        customerName: 'Emily Davis',
        email: 'emily.davis@email.com',
        rating: 5,
        comment: 'Love the mint chocolate chip! Perfect balance of mint and chocolate. Highly recommended!',
        isApproved: true
      },
      {
        customerName: 'David Wilson',
        email: 'david.w@email.com',
        rating: 4,
        comment: 'Good ice cream, reasonable prices. The waffle cones are fresh and crispy.',
        isApproved: true
      },
      {
        customerName: 'Lisa Brown',
        email: 'lisa.brown@email.com',
        rating: 5,
        comment: 'The brownie sundae is to die for! Perfect for a special treat. Staff is very friendly.',
        isApproved: true
      },
      {
        customerName: 'John Smith',
        email: 'john.smith@email.com',
        rating: 3,
        comment: 'Ice cream is good but a bit pricey. Would like to see more variety in flavors.',
        isApproved: false
      }
    ];

    for (const review of reviews) {
      const reviewDoc = new Review(review);
      await reviewDoc.save();
    }
    console.log('Reviews created');

    // Create sample blog posts
    const blogPosts = [
      {
        title: 'Welcome to Our Ice Cream Parlour!',
        content: 'We are excited to welcome you to our new ice cream parlour! Our mission is to bring you the finest quality ice cream made with the freshest ingredients. From classic vanilla to unique seasonal flavors, we have something for everyone.',
        excerpt: 'Welcome to our new ice cream parlour! Discover our mission and commitment to quality ice cream.',
        author: 'Admin',
        category: 'news',
        published: true,
        tags: ['welcome', 'announcement', 'ice-cream']
      },
      {
        title: 'The Perfect Summer Treat: Homemade Ice Cream Recipe',
        content: 'Summer is here and what better way to cool down than with homemade ice cream? Here\'s our secret recipe for the perfect vanilla ice cream that you can make at home. You\'ll need fresh cream, whole milk, sugar, and vanilla extract. The key is to use high-quality ingredients and to churn slowly for the perfect texture.',
        excerpt: 'Learn how to make the perfect vanilla ice cream at home with our secret recipe.',
        author: 'Chef Maria',
        category: 'recipes',
        published: true,
        tags: ['recipe', 'homemade', 'vanilla', 'summer']
      },
      {
        title: 'New Seasonal Flavors Coming Soon!',
        content: 'We\'re working on some exciting new seasonal flavors for fall! Get ready for pumpkin spice, apple cinnamon, and maple pecan. These limited-time flavors will be available starting next month. Don\'t miss out on these delicious autumn treats!',
        excerpt: 'Exciting new seasonal flavors are coming this fall. Discover what we have in store!',
        author: 'Admin',
        category: 'seasonal',
        published: true,
        tags: ['seasonal', 'fall', 'new-flavors', 'limited-time']
      },
      {
        title: 'Ice Cream History: A Sweet Journey',
        content: 'Ice cream has a rich history dating back thousands of years. From ancient China where ice and milk were mixed with rice, to the modern ice cream we know today, this frozen treat has evolved significantly. Learn about the fascinating history of ice cream and how it became one of the world\'s favorite desserts.',
        excerpt: 'Discover the fascinating history of ice cream from ancient times to modern day.',
        author: 'History Buff',
        category: 'tips',
        published: true,
        tags: ['history', 'ice-cream', 'education', 'fun-facts']
      }
    ];

    for (const post of blogPosts) {
      const blogPost = new BlogPost(post);
      await blogPost.save();
    }
    console.log('Blog posts created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();