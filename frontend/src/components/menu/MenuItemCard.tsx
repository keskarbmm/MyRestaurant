import React from 'react';
import { Star, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuItem {
  _id: string;
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
}

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ice-cream':
        return '🍦';
      case 'snacks':
        return '🍪';
      case 'beverages':
        return '🥤';
      case 'desserts':
        return '🍰';
      case 'specialty':
        return '⭐';
      default:
        return '🍽️';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ice-cream':
        return 'bg-blue-100 text-blue-600';
      case 'snacks':
        return 'bg-green-100 text-green-600';
      case 'beverages':
        return 'bg-purple-100 text-purple-600';
      case 'desserts':
        return 'bg-pink-100 text-pink-600';
      case 'specialty':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`card hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
        !item.isAvailable ? 'opacity-60' : ''
      }`}
    >
      {/* Special Badge */}
      {item.isSpecial && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Special
          </div>
        </div>
      )}

      {/* Unavailable Overlay */}
      {!item.isAvailable && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-4 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-semibold">Out of Stock</p>
          </div>
        </div>
      )}

      {/* Image */}
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
          <span className="text-6xl">{getCategoryIcon(item.category)}</span>
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {item.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                {getCategoryIcon(item.category)} {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
              {item.isSpecial && (
                <span className="px-2 py-1 bg-accent-100 text-accent-600 rounded-full text-xs font-medium">
                  Limited Time
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              ${item.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3">
          {item.description}
        </p>

        {/* Allergens */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500">Contains:</span>
            {item.allergens.map((allergen, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium"
              >
                {allergen}
              </span>
            ))}
          </div>
        )}

        {/* Nutrition Info */}
        {item.nutritionInfo && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Nutrition (per serving)</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {item.nutritionInfo.calories && (
                <div className="flex justify-between">
                  <span>Calories:</span>
                  <span className="font-medium">{item.nutritionInfo.calories}</span>
                </div>
              )}
              {item.nutritionInfo.fat && (
                <div className="flex justify-between">
                  <span>Fat:</span>
                  <span className="font-medium">{item.nutritionInfo.fat}g</span>
                </div>
              )}
              {item.nutritionInfo.protein && (
                <div className="flex justify-between">
                  <span>Protein:</span>
                  <span className="font-medium">{item.nutritionInfo.protein}g</span>
                </div>
              )}
              {item.nutritionInfo.carbs && (
                <div className="flex justify-between">
                  <span>Carbs:</span>
                  <span className="font-medium">{item.nutritionInfo.carbs}g</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4">
          {item.isAvailable ? (
            <a
              href="tel:5551234567"
              className="w-full btn-primary text-center inline-flex items-center justify-center"
            >
              <Clock className="mr-2 w-4 h-4" />
              Call to Order
            </a>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
            >
              Currently Unavailable
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;