import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';


interface InteriorityProps {
  onNext: () => void;
}

const Interiority: React.FC<InteriorityProps> = ({ onNext }) => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  const handleSplineLoad = () => {
    console.log('Spline scene loaded successfully');
    setSplineLoaded(true);
  };

  const handleSplineError = (error: any) => {
    console.error('Spline scene failed to load:', error);
    setSplineError(true);
    setSplineLoaded(true); // Still show content even if Spline fails
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative w-full h-screen flex flex-col items-center justify-center px-8 bg-black"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/sheLheZ3fgYWvSLH/scene.splinecode"
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

      {/* Debug info - remove this in production */}
      {splineError && (
        <div className="absolute top-4 left-4 z-50 text-red-500 text-sm pointer-events-none">
          Spline scene failed to load - check console for details
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: splineLoaded ? 1 : 0, scale: splineLoaded ? 1 : 0.8 }}
        transition={{ delay: 0.2, duration: 2 }}
        className="text-center z-20 max-w-6xl pointer-events-none"
      >
        <ScrambleText
          text="You're not watching a story. You're inside it."
          className="text-4xl md:text-7xl font-thin mb-16 text-white drop-shadow-lg"
          delay={1000}
        />
      </motion.div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splineLoaded ? [0, 0.3, 0] : 0 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent z-10 pointer-events-none"
      />
    </motion.div>
  );
};

export default Interiority;