import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface JourneyItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
}

export interface JourneyProps {
  items: JourneyItem[];
  className?: string;
}

export const Journey: React.FC<JourneyProps> = ({ items, className }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const pointVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className={cn("relative py-8", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-800 dark:bg-gray-600" />
      
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={cn(
            "relative flex items-center mb-12 last:mb-0",
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          )}
          variants={itemVariants}
        >
          {/* Content */}
          <div className={cn(
            "w-5/12 px-4",
            index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
          )}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            {item.date && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {item.date}
              </div>
            )}
            <p className="text-gray-700 dark:text-gray-300">
              {item.description}
            </p>
          </div>

          {/* Center point */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black dark:bg-gray-900 border-2 border-gray-400 dark:border-gray-700 rounded-full z-10 flex items-center justify-center"
            variants={pointVariants}
          >
            {item.icon ? (
              <span className="text-white dark:text-gray-300">{item.icon}</span>
            ) : (
              <span className="w-2 h-2 bg-white dark:bg-gray-300 rounded-full" />
            )}
          </motion.div>

          {/* Empty space for the opposite side */}
          <div className="w-5/12" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Journey; 