import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Book3DProps {
  cover: string;
  title: string;
}

const Book3D: React.FC<Book3DProps> = ({ cover, title }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-64 h-96 perspective-1000"
    >
      <div className="w-full h-full transform-style-3d hover:rotate-y-10 transition-transform duration-500">
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transform: 'translateZ(20px)',
            borderRadius: '4px'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        </div>
        <div 
          className="absolute w-8 h-full right-0 transform origin-left rotate-y-90"
          style={{
            background: 'linear-gradient(to right, #e0e0e0, #c0c0c0)',
            transformOrigin: 'left center'
          }}
        />
      </div>
    </motion.div>
  );
};

export default Book3D;