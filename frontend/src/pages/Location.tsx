import React from 'react';
import { MapPin, Phone, Clock, Car, Directions } from 'lucide-react';
import { motion } from 'framer-motion';

const Location: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Us
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Visit us at our convenient location and experience the sweetest treats in town
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 text-primary-600 mr-2" />
                Our Location
              </h2>
              
              {/* Map placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map Coming Soon</p>
                  <p className="text-sm text-gray-500 mt-2">
                    We're working on integrating a real map here
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      123 Sweet Street<br />
                      Ice Cream City, IC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:5551234567" className="text-primary-600 hover:text-primary-700">
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                      <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                      <p>Sunday: 12:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Directions */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Directions className="w-6 h-6 text-primary-600 mr-2" />
                How to Get Here
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Car className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">By Car</p>
                    <p className="text-gray-600">
                      We're located on Sweet Street, just off Main Avenue. 
                      Free parking is available in our lot behind the building.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">From Downtown</h3>
                  <ol className="text-gray-600 space-y-1 text-sm">
                    <li>1. Head north on Main Avenue</li>
                    <li>2. Turn right onto Sweet Street</li>
                    <li>3. We're on the left side, 2 blocks down</li>
                  </ol>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">From Highway 101</h3>
                  <ol className="text-gray-600 space-y-1 text-sm">
                    <li>1. Take exit 15 for Main Avenue</li>
                    <li>2. Head south for 3 miles</li>
                    <li>3. Turn left onto Sweet Street</li>
                    <li>4. We're on the right side</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Parking</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Free parking available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Handicap accessible spaces</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Street parking available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Limited spaces during peak hours</span>
                </div>
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Landmarks</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">City Park</span>
                  <span className="text-sm text-gray-500">2 blocks away</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Shopping Mall</span>
                  <span className="text-sm text-gray-500">0.5 miles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Movie Theater</span>
                  <span className="text-sm text-gray-500">1 block away</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Bus Stop</span>
                  <span className="text-sm text-gray-500">Across the street</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Visit?</h2>
            <p className="text-xl text-primary-100 mb-6 max-w-2xl mx-auto">
              We can't wait to serve you! Call ahead to place your order or just walk in for a sweet surprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5551234567"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call (555) 123-4567
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Directions className="mr-2 w-5 h-5" />
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Location;