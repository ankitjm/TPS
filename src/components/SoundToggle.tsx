import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full 
                 backdrop-blur-sm bg-white/10 border border-white/20
                 hover:bg-white/20 transition-all duration-300"
      title={isEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {isEnabled ? (
        <Volume2 className="w-6 h-6 text-white" />
      ) : (
        <VolumeX className="w-6 h-6 text-white/60" />
      )}
    </motion.button>
  );
};

export default SoundToggle;