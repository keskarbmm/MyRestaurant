import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Phone, MapPin, Clock } from 'lucide-react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

// Components
import Hero from '../components/home/Hero';
import WhatsNew from '../components/home/WhatsNew';
import DealsOfTheWeek from '../components/home/DealsOfTheWeek';
import GuestReviews from '../components/home/GuestReviews';
import ContactInfo from '../components/home/ContactInfo';

// API functions
import { getMenuItems, getReviews, getBlogPosts } from '../services/api';

const Home: React.FC = () => {
  // Fetch data for home page
  const { data: specials } = useQuery('specials', () => getMenuItems({ special: 'true' }));
  const { data: reviews } = useQuery('reviews', () => getReviews({ limit: 6 }));
  const { data: blogPosts } = useQuery('blogPosts', () => getBlogPosts({ limit: 3 }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* What's New Section */}
      <WhatsNew blogPosts={blogPosts?.posts || []} />

      {/* Deals of the Week */}
      <DealsOfTheWeek specials={specials || []} />

      {/* Guest Reviews */}
      <GuestReviews reviews={reviews?.reviews || []} />

      {/* Contact Info */}
      <ContactInfo />

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Something Sweet?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Visit us today and discover why we're the favorite ice cream spot in town. 
              Call ahead for quick pickup or walk in for a sweet experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                View Our Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:5551234567"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;