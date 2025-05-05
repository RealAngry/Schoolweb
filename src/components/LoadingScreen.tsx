import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  
  // Simulate loading progress
  useEffect(() => {
    const texts = [
      'Initializing',
      'Loading resources',
      'Preparing content',
      'Almost there'
    ];
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
      
      const textIndex = Math.floor((progress / 100) * texts.length);
      setLoadingText(texts[Math.min(textIndex, texts.length - 1)]);
    }, 20);
    
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
    >
      {/* Background imagery */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <img 
          src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg" 
          alt="School Campus"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center max-w-md text-center px-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Logo />
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2 transition-colors duration-300"
        >
          HMPS Azamgarh
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-medium transition-colors duration-300"
        >
          Empowering Minds, Building Futures
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2 transition-colors duration-300">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-primary-600 dark:bg-primary-400 h-2.5 rounded-full transition-all transition-colors duration-300"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <span>{loadingText}...</span>
            <span>{progress}%</span>
          </div>
        </motion.div>
        
        <div className="mt-12 space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            className="text-sm text-primary-600 dark:text-primary-400 transition-colors duration-300"
          >
            Established in 2019 | CBSE Affiliated
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 0.5 }}
            className="text-sm text-primary-600 dark:text-primary-400 transition-colors duration-300"
          >
            Admission Open for Session 2025-26
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;