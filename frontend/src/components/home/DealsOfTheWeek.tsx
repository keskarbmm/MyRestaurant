import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isSpecial: boolean;
  isAvailable: boolean;
}

interface DealsOfTheWeekProps {
  specials: MenuItem[];
}

const DealsOfTheWeek: React.FC<DealsOfTheWeekProps> = ({ specials }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-accent-100 text-accent-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Deals of the Week
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing specials! Available for a limited time only.
          </p>
        </motion.div>

        {specials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specials.slice(0, 3).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Special Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Special
                  </div>
                </div>

                {item.imageUrl ? (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-6xl">
                      {item.category === 'ice-cream' ? '🍦' : 
                       item.category === 'snacks' ? '🍪' : 
                       item.category === 'beverages' ? '🥤' : '🍰'}
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Limited Time</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              New Specials Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              We're preparing some amazing deals for you. Check back soon!
            </p>
            <Link
              to="/menu"
              className="btn-primary inline-flex items-center"
            >
              View Full Menu
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/menu"
            className="btn-outline text-lg px-8 py-3 inline-flex items-center"
          >
            View All Specials
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DealsOfTheWeek;