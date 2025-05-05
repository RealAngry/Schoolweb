import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({
  events,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line connecting all events */}
      <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-700"></div>
      
      <div className="space-y-16">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                {event.year}
              </div>
              <div className="flex-grow pt-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 