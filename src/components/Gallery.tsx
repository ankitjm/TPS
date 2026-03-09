import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string;
}

interface GalleryProps {
  onNext: () => void;
  onPrevious: () => void;
}

const videoData: VideoItem[] = [
  {
    id: '1',
    title: 'Phygital Experience 1',
    description: 'Immersive digital-physical interaction showcase',
    thumbnail: 'https://img.youtube.com/vi/ZuMp4PW8mH0/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=ZuMp4PW8mH0',
    category: 'Interactive'
  },
  {
    id: '2',
    title: 'Digital Art Installation',
    description: 'Blending virtual and physical art spaces',
    thumbnail: 'https://img.youtube.com/vi/OL3ym2aneHE/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OL3ym2aneHE',
    category: 'Art'
  },
  {
    id: '3',
    title: 'Mixed Reality Project',
    description: 'Exploring the boundaries of reality',
    thumbnail: 'https://img.youtube.com/vi/IAlA-2bteKA/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IAlA-2bteKA',
    category: 'Technology'
  },
  {
    id: '4',
    title: 'Immersive Environment',
    description: 'Creating digital spaces that feel real',
    thumbnail: 'https://img.youtube.com/vi/RjObZz4eHa4/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=RjObZz4eHa4',
    category: 'Environment'
  },
  {
    id: '5',
    title: 'Digital Performance',
    description: 'Live digital-physical performance art',
    thumbnail: 'https://img.youtube.com/vi/vlLvbJMH9lw/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=vlLvbJMH9lw',
    category: 'Performance'
  },
  {
    id: '6',
    title: 'Interactive Installation',
    description: 'Touch-responsive digital environments',
    thumbnail: 'https://img.youtube.com/vi/Af__tBSHGZ0/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Af__tBSHGZ0',
    category: 'Interactive'
  },
  {
    id: '7',
    title: 'Future of Experience',
    description: 'Pioneering the next generation of digital interaction',
    thumbnail: 'https://img.youtube.com/vi/5xLSS1wNeGo/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=5xLSS1wNeGo',
    category: 'Innovation'
  }
];

const Gallery: React.FC<GalleryProps> = ({ onNext, onPrevious }) => {
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
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.2),transparent_50%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8 text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-8xl font-thin text-white mb-4 px-4"
        >
          Our Work
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
        >
          Explore our portfolio of phygital experiences that blur the boundaries between digital and physical worlds
        </motion.p>
      </div>

      {/* Video Grid */}
      <div className="relative z-10 px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {videoData.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 h-full">
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
                    <span className="inline-block px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/30 rounded-full border border-purple-500/30">
                      {video.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => handleVideoClick(video)}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
                    >
                      Watch Video
                    </button>
                    
                    <button
                      onClick={() => openVideo(video.url)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4 md:gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          className="px-4 md:px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm md:text-base"
        >
          Previous
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-4 md:px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white hover:shadow-lg transition-all duration-300 text-sm md:text-base"
        >
          Next
        </motion.button>
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
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors duration-300 flex items-center gap-2"
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

export default Gallery;
