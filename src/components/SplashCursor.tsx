import React from 'react';
import { motion } from 'framer-motion';

const SplashCursor: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 3, 5]
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        className="w-32 h-32 rounded-full border-2 border-white/30"
        animate={{ 
          scale: [1, 1.5, 2],
          opacity: [0.8, 0.3, 0]
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-white/20"
        animate={{ 
          scale: [0, 1, 2],
          opacity: [1, 0.5, 0]
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default SplashCursor;