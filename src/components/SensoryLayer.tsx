import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';


interface SensoryLayerProps {
  onNext: () => void;
}

const SensoryLayer: React.FC<SensoryLayerProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/AyzurOGHzRHA7uS0/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="text-2xl sm:text-3xl md:text-5xl font-thin text-center mb-12 sm:mb-16 z-20 text-white drop-shadow-lg pointer-events-none px-4"
      >
        The walls light up to{' '}
        <motion.span
          animate={{
            color: ['#ffffff', '#00ffff', '#ff00ff', '#ffffff'],
            textShadow: [
              '0 0 0px rgba(255,255,255,0)',
              '0 0 20px rgba(0,255,255,0.5)',
              '0 0 20px rgba(255,0,255,0.5)',
              '0 0 0px rgba(255,255,255,0)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="italic"
        >
          your presence.
        </motion.span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-1/3 z-20 pointer-events-none px-4"
      >
        <motion.h3
          className="text-xl sm:text-2xl md:text-4xl font-thin text-center text-white drop-shadow-2xl backdrop-blur-sm bg-black/30 px-6 py-3 rounded-lg"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          The story{' '}
          <span className="text-cyan-300 italic font-medium">senses you.</span>
        </motion.h3>
      </motion.div>
    </motion.div>
  );
};

export default SensoryLayer;