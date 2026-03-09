import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  onContact?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContact }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative z-10 py-8 px-4 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} The Phygital Studio. All rights reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          {onContact && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContact}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300 whitespace-nowrap"
            >
              Contact Us
            </motion.button>
          )}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
