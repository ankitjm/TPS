import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';


interface TouchSoundLayerProps {
  onNext: () => void;
}

const TouchSoundLayer: React.FC<TouchSoundLayerProps> = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [splineLoaded, setSplineLoaded] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/ECq-uYUMuJmRFZyn/scene.splinecode"
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

      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="text-4xl md:text-6xl font-thin text-center mb-20 z-20 text-white drop-shadow-lg pointer-events-none"
      >
        Every display{' '}
        <motion.span
          animate={{
            rotateX: [0, 10, 0],
            textShadow: [
              '0 0 0px rgba(0,0,0,0)',
              '0 0 30px rgba(139,69,19,0.8)',
              '0 0 0px rgba(0,0,0,0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="italic text-amber-700"
        >
          reacts.
        </motion.span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-1/3 z-20 pointer-events-none"
      >
        <motion.h3
          className="text-3xl md:text-5xl font-thin text-center text-gray-800 drop-shadow-lg"
          animate={{
            color: ['#1f2937', '#dc2626', '#059669', '#0284c7', '#1f2937']
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Every pixel{' '}
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="italic"
          >
            pays attention.
          </motion.span>
        </motion.h3>
      </motion.div>

      {/* Interactive cursor effect */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-white/30 pointer-events-none z-30"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default TouchSoundLayer;