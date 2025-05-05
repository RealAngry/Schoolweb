import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpen className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="flex flex-col"
        whileHover={{ scale: 1.05 }}
      >
        <span className="font-bold text-lg leading-tight">HMPS</span>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Azamgarh</span>
      </motion.div>
    </Link>
  );
};

export default Logo;