import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import Footer from './Footer';
import { getVideos, getLogos, LogoItem } from '../lib/db';
import { VideoItem, getVideoData, getLogoData } from '../data/ourWorkData';

interface OurWorkProps {
  onNext: () => void;
  onHome: () => void;
  onStartExperience: () => void;
  onContact: () => void;
}

const OurWork: React.FC<OurWorkProps> = ({ onHome, onStartExperience, onContact }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [logos, setLogos] = useState<LogoItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [videoData, logoData] = await Promise.all([
          getVideos(),
          getLogos()
        ]);

        // If DB is empty, fall back to local data (for first run)
        setVideos(videoData.length > 0 ? videoData : getVideoData());
        setLogos(logoData.length > 0 ? logoData : getLogoData());
      } catch (error) {
        console.error('Failed to load data from DB:', error);
        setVideos(getVideoData());
        setLogos(getLogoData());
      }
    };

    loadData();

    // Check for updates periodically
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen bg-white overflow-y-auto flex flex-col"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)]" />
      </div>

      {/* Header with Navigation */}
      <div className="relative z-10 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center lg:text-left mb-6 lg:mb-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-thin text-black mb-2">
              Our Work
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
              Explore our portfolio of phygital experiences
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHome}
              className="px-3 sm:px-4 py-2 bg-black/5 backdrop-blur-sm border border-black/10 rounded-full text-black hover:bg-black/10 transition-all duration-300 text-xs sm:text-sm font-medium"
            >
              Home
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartExperience}
              className="px-3 sm:px-4 py-2 bg-black/5 backdrop-blur-sm border border-black/10 rounded-full text-black hover:bg-black/10 transition-all duration-300 text-xs sm:text-sm font-medium"
            >
              Start Experience
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContact}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-medium"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Video Portfolio Section - Now First */}
      <div className="relative z-10 px-4 py-12 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-thin mb-4 text-black">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light">
            Dive into our portfolio of immersive experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 mb-16">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleVideoClick(video)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 h-full video-card-enhanced">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Play Button */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="mb-3">
                    <span className="inline-block text-sm font-semibold text-pink-500 mb-1">
                      {video.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-pink-600 transition-colors duration-300">
                    {video.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-pink-400 group-hover:text-pink-600 text-sm font-medium transition-colors duration-300">
                      Watch Video
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openVideo(video.url);
                      }}
                      className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors duration-300 relative z-10"
                    >
                      <ExternalLink className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trusted Partners Section - Now Second with Horizontal Scrolling */}
      <div className="relative z-10 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-thin mb-4 text-black">
            Trusted by industry leaders
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Hover over any logo to bring it to life
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="max-w-7xl mx-auto"
          >
            {/* Grid Layout */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8 pb-10">
              {logos.map((logo, index) => (
                <motion.div
                  key={logo.folder}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.05, duration: 0.8 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer group"
                >
                  <div className="relative w-full aspect-square rounded-2xl border border-gray-100 
                               flex items-center justify-center p-4
                               bg-white shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
                    {/* White Image (Default grayscale/opacity) */}
                    <img
                      src={logo.white_url || `/logos/${logo.folder}/black-white.png`}
                      alt={logo.name}
                      className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 group-hover:opacity-0"
                    />
                    {/* Color Image (Hover) */}
                    <img
                      src={logo.color_url || `/logos/${logo.folder}/color.${logo.folder === 'axiscades' ? 'jpeg' : 'png'}`}
                      alt={logo.name}
                      className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer onContact={onContact} />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.url.split('v=')[1]}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {selectedVideo.description}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openVideo(selectedVideo.url)}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open on YouTube
                  </button>

                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OurWork;
