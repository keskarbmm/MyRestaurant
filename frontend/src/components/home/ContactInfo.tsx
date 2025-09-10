import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactInfo: React.FC = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Us Today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're conveniently located and ready to serve you the best ice cream experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="card text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600 mb-4">
              123 Sweet Street<br />
              Ice Cream City, IC 12345
            </p>
            <Link
              to="/location"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
            >
              Get Directions
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">
              (555) 123-4567<br />
              <span className="text-sm">Call for orders</span>
            </p>
            <a
              href="tel:5551234567"
              className="text-secondary-600 hover:text-secondary-700 font-medium inline-flex items-center"
            >
              Call Now
              <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="card text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">
              hello@sweetdreams.com<br />
              <span className="text-sm">We'll respond quickly</span>
            </p>
            <a
              href="mailto:hello@sweetdreams.com"
              className="text-accent-600 hover:text-accent-700 font-medium inline-flex items-center"
            >
              Send Email
              <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="card text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hours</h3>
            <div className="text-gray-600 text-sm space-y-1">
              <p>Mon - Thu: 11:00 AM - 10:00 PM</p>
              <p>Fri - Sat: 11:00 AM - 11:00 PM</p>
              <p>Sunday: 12:00 PM - 9:00 PM</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Order?
            </h3>
            <p className="text-gray-600 mb-6">
              Give us a call or visit us in person. We're here to make your day sweeter!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5551234567"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call (555) 123-4567
              </a>
              <Link
                to="/contact"
                className="btn-outline text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;