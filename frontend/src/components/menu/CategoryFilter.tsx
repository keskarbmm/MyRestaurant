import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
            selectedCategory === category.id
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:text-primary-600'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="text-sm">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;