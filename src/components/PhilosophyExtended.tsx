import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';


interface PhilosophyExtendedProps {
  onNext: () => void;
}

const PhilosophyExtended: React.FC<PhilosophyExtendedProps> = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const handleSplineLoad = () => {
    console.log('Spline scene loaded successfully');
    setSplineLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative w-full h-screen flex items-center justify-center px-8 bg-black"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/aTzlvFg1qkMe6DZR/scene.splinecode"
          onLoad={handleSplineLoad}
          className="w-full h-full"
        />
      </div>

      {/* Loading overlay that fades out when Spline loads */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: splineLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: splineLoaded ? 1 : 0, scale: splineLoaded ? 1 : 0.8 }}
        transition={{ delay: 0.2, duration: 2 }}
        className="text-center z-20 max-w-6xl pointer-events-none"
      >
        <motion.h2
          className="text-3xl md:text-6xl font-thin leading-tight text-white drop-shadow-lg"
          animate={{
            textShadow: [
              '0 0 0px rgba(255,255,255,0)',
              '0 0 20px rgba(255,255,255,0.3)',
              '0 0 40px rgba(255,255,255,0.1)',
              '0 0 0px rgba(255,255,255,0)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          That's when tech becomes{' '}
          <motion.span
            animate={{
              color: ['#ffffff', '#ff6b9d', '#c44569', '#f8b500', '#ffffff'],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="italic"
          >
            theatre.
          </motion.span>
          <br />
          And space becomes{' '}
          <motion.span
            animate={{
              color: ['#ffffff', '#ff6b9d', '#c44569', '#f8b500', '#ffffff'],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            className="italic"
          >
            memory.
          </motion.span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splineLoaded ? [0, 0.3, 0] : 0 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute inset-0 bg-gradient-conic from-purple-500/20 via-pink-500/20 to-purple-500/20 z-10 pointer-events-none"
      />
    </motion.div>
  );
};

export default PhilosophyExtended;
