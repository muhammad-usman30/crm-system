
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Fade in animation wrapper
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.3,
  className = ""
}: { 
  children: React.ReactNode,
  delay?: number,
  duration?: number,
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide up animation wrapper
export const SlideUp = ({ 
  children, 
  delay = 0,
  duration = 0.4,
  className = "" 
}: { 
  children: React.ReactNode,
  delay?: number,
  duration?: number,
  className?: string
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 20, opacity: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide from left animation wrapper
export const SlideFromLeft = ({ 
  children, 
  delay = 0,
  duration = 0.4,
  className = "" 
}: { 
  children: React.ReactNode,
  delay?: number,
  duration?: number,
  className?: string
}) => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -20, opacity: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide from right animation wrapper
export const SlideFromRight = ({ 
  children, 
  delay = 0,
  duration = 0.4,
  className = "" 
}: { 
  children: React.ReactNode,
  delay?: number,
  duration?: number,
  className?: string
}) => (
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 20, opacity: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale animation wrapper
export const Scale = ({ 
  children, 
  delay = 0,
  duration = 0.3,
  className = "" 
}: { 
  children: React.ReactNode,
  delay?: number,
  duration?: number,
  className?: string
}) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered children animation wrapper
export const StaggeredChildren = ({ 
  children, 
  staggerDelay = 0.1,
  initialDelay = 0,
  className = "" 
}: { 
  children: React.ReactNode,
  staggerDelay?: number,
  initialDelay?: number,
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: initialDelay + i * staggerDelay, duration: 0.4 }}
          key={i}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Page transition wrapper
export const PageTransition = ({ 
  children,
  className = "" 
}: { 
  children: React.ReactNode,
  className?: string
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Hover card animation
export const HoverCard = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode,
  className?: string
}) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    whileTap={{ y: 0, transition: { duration: 0.2 } }}
    className={className}
  >
    {children}
  </motion.div>
);
