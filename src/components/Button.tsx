import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'light' | 'outline-light';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  as?: React.ElementType;
  className?: string;
  [x: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  as: Component = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    light: 'bg-white hover:bg-gray-100 text-primary-700 focus:ring-white',
    'outline-light': 'border border-white text-white hover:bg-white/10 focus:ring-white',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotateX: 10,
        rotateY: 5,
        transformPerspective: 1000
      }}
      whileTap={{ 
        scale: 0.95,
        rotateX: -5,
        rotateY: -2.5
      }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      <Component className={classes} {...props}>
        <motion.span
          initial={{ y: 0, z: 0 }}
          whileHover={{ 
            y: -4,
            z: 20,
            textShadow: "0 8px 16px rgba(0,0,0,0.2)"
          }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
          style={{
            display: "inline-block"
          }}
        >
          {children}
        </motion.span>
      </Component>
    </motion.div>
  );
};

export default Button;