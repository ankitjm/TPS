import React from 'react';
import { motion } from 'framer-motion';

interface DitheredBackgroundProps {
  mousePosition: { x: number; y: number };
}

const DitheredBackground: React.FC<DitheredBackgroundProps> = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 100, 100, 0.3) 0%, 
              rgba(100, 255, 100, 0.2) 30%,
              rgba(100, 100, 255, 0.2) 60%,
              transparent 70%
            ),
            linear-gradient(45deg, rgba(0,0,0,0.8), rgba(20,20,40,0.8))
          `,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Dithered pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.1) 1px,
              rgba(255,255,255,0.1) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.1) 1px,
              rgba(255,255,255,0.1) 2px
            )
          `,
        }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Sound wave visualization */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              ${mousePosition.x / 10}deg,
              transparent 0px,
              rgba(255,255,255,0.05) 1px,
              transparent 2px
            )
          `
        }}
        animate={{
          background: [
            `repeating-linear-gradient(
              ${mousePosition.x / 10}deg,
              transparent 0px,
              rgba(255,255,255,0.05) 1px,
              transparent 2px
            )`,
            `repeating-linear-gradient(
              ${mousePosition.x / 10 + 90}deg,
              transparent 0px,
              rgba(255,255,255,0.1) 1px,
              transparent 2px
            )`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default DitheredBackground;