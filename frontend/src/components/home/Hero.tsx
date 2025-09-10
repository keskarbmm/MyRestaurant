import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Sweet Dreams
                <span className="block text-gradient">Await You</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Indulge in our premium ice cream flavors, handcrafted snacks, and refreshing beverages. 
                Every scoop is made with love and the finest ingredients.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent-500" />
                <span className="text-gray-700 font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent-500" />
                <span className="text-gray-700 font-medium">Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent-500" />
                <span className="text-gray-700 font-medium">Family Owned</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Explore Our Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:5551234567"
                className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call to Order
              </a>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-gray-600">Flavors Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">4.9</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main ice cream image placeholder */}
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl animate-bounce-slow">🍦</div>
                  <div className="text-6xl animate-bounce-slow" style={{ animationDelay: '0.2s' }}>🧁</div>
                  <div className="text-6xl animate-bounce-slow" style={{ animationDelay: '0.4s' }}>🍰</div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-400 rounded-full flex items-center justify-center text-3xl animate-bounce-slow">
                🍪
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center text-2xl animate-bounce-slow" style={{ animationDelay: '0.3s' }}>
                🍭
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100 rounded-full -translate-y-36 translate-x-36 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full translate-y-48 -translate-x-48 opacity-50"></div>
    </section>
  );
};

export default Hero;