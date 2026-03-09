import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';


interface TransitionProps {
  onComplete: () => void;
}

const Transition: React.FC<TransitionProps> = () => {
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
      setShowMobileMessage(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex items-center justify-center bg-black"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/1pazW6XvufvVUQ6P/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center max-w-6xl px-8 bg-black/40 backdrop-blur-md rounded-2xl py-8 md:py-12">
        <motion.h2
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-thin text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] pointer-events-none mb-6 sm:mb-8 px-4"
        >
          You arrive, and the space{' '}
          <motion.span
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            className="italic bg-gradient-to-r from-pink-300 via-pink-500 to-rose-600 bg-clip-text text-transparent"
          >
            arrives with you.
          </motion.span>
        </motion.h2>

        {/* Tutorial-style instruction that appears and disappears */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [30, 0, 0, -10]
          }}
          transition={{
            delay: 2,
            duration: 4,
            times: [0, 0.2, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="text-base sm:text-lg md:text-xl text-gray-200 font-light drop-shadow-md"
        >
          Hover, drag, or tap - it's all alive.
        </motion.div>
      </div>

      {/* Mobile rotation message */}
      {showMobileMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center max-w-md border border-white/20"
          >
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">
              For the best view, rotate to landscape mode.
            </h3>
            <motion.button
              onClick={() => setShowMobileMessage(false)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Anyway
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Transition;