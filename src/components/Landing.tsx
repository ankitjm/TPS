import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Play, X, Eye } from 'lucide-react';

import Footer from './Footer';

interface LandingProps {
  onEnter: () => void;
  onSeeWork: () => void;
  onContact: () => void;
}

// Spline background component matching other pages
const SplineBackground = () => {
  const [splineError, setSplineError] = useState(false);

  const handleSplineLoad = () => {
    console.log('Spline scene loaded successfully');
  };

  const handleSplineError = (error: any) => {
    console.error('Spline scene failed to load:', error);
    setSplineError(true);
  };

  return (
    <>
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/aTzlvFg1qkMe6DZR/scene.splinecode"
          onLoad={handleSplineLoad}
          onError={handleSplineError}
          className="w-full h-full"
        />
      </div>


      {splineError && (
        <div className="absolute top-4 right-4 z-20 text-red-400 text-sm">
          Spline scene failed to load - check console for details
        </div>
      )}
    </>
  );
};

const Landing: React.FC<LandingProps> = ({ onEnter, onSeeWork, onContact }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoToggle = () => {
    setShowVideo(!showVideo);
  };

  const handleSeeWork = () => {
    onSeeWork();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative w-full min-h-[100dvh] flex flex-col overflow-x-hidden"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <SplineBackground />
      </div>

      {/* Logo - Top Left */}
      <motion.img
        src="https://thephygitalstudio.com/assets/images/logo/phygital-studio-logo.png"
        alt="The Phygital Studio"
        className="absolute top-6 left-6 z-40 h-16 md:h-20 lg:h-24 w-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Content Overlay */}
      <div className="flex-1 flex items-center justify-center z-30 mt-24 md:mt-0 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center max-w-6xl mx-auto px-6 sm:px-8 mt-12 md:mt-0"
        >

          <motion.h1
            className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-wider mb-6 sm:mb-12 leading-[1.1] md:leading-[0.9] text-white px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Let's get{' '}
            <motion.span
              className="italic bg-gradient-to-r from-pink-300 via-pink-500 to-rose-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Phygital
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Where reality meets digital. Creating immersive experiences that blur the boundaries between physical and virtual worlds.
          </motion.p>

          {/* Three Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 px-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
              }}
              transition={{ delay: 3, duration: 0.8 }}
              onClick={onEnter}
              className="py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full 
                         text-lg sm:text-xl font-medium shadow-2xl hover:shadow-xl
                         transition-all duration-300 w-full sm:w-[280px] text-white cursor-pointer
                         flex items-center justify-center border border-transparent"
            >
              Start Experience
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              onClick={handleVideoToggle}
              className="py-4 sm:py-5 border border-white/30 rounded-full 
                         backdrop-blur-sm bg-white/10 text-lg sm:text-xl font-medium
                         hover:bg-white/20 transition-all duration-300 
                         flex items-center gap-3 w-full sm:w-[280px] justify-center text-white cursor-pointer"
            >
              <Play className="w-6 h-6" />
              Watch the Video
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              onClick={handleSeeWork}
              className="py-4 sm:py-5 border border-white/30 rounded-full 
                         backdrop-blur-sm bg-white/10 text-lg sm:text-xl font-medium
                         hover:bg-white/20 transition-all duration-300 
                         flex items-center gap-3 w-full sm:w-[280px] justify-center text-white cursor-pointer"
            >
              <Eye className="w-6 h-6" />
              See Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* YouTube Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-full mx-4 sm:mx-6"
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                src="https://www.youtube.com/embed/Zj_wF20HErY?autoplay=1"
                title="Phygital Studio Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <button
              onClick={handleVideoToggle}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <Footer onContact={onContact} />
    </motion.div>
  );
};

export default Landing;