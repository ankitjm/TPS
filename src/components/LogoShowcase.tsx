import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LogoShowcaseProps {
  onNext: () => void;
}

const logoData = [
  { name: 'Nike', color: '#FF0000', url: 'https://example.com/nike' },
  { name: 'Apple', color: '#007AFF', url: 'https://example.com/apple' },
  { name: 'Google', color: '#4285F4', url: 'https://example.com/google' },
  { name: 'Microsoft', color: '#00BCF2', url: 'https://example.com/microsoft' },
  { name: 'Meta', color: '#1877F2', url: 'https://example.com/meta' },
  { name: 'Tesla', color: '#CC0000', url: 'https://example.com/tesla' },
  { name: 'Amazon', color: '#FF9900', url: 'https://example.com/amazon' },
  { name: 'Netflix', color: '#E50914', url: 'https://example.com/netflix' },
];

const LogoShowcase: React.FC<LogoShowcaseProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 12000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center mb-20 z-10"
      >
        <h2 className="text-3xl md:text-5xl font-thin mb-4">
          Trusted by industry leaders
        </h2>
        <p className="text-xl text-gray-400 font-light">
          Click any logo to explore our work
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-8 z-10"
      >
        {logoData.map((logo, index) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(logo.url, '_blank')}
            className="cursor-pointer"
          >
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-white/20 
                         flex items-center justify-center text-lg md:text-xl font-bold
                         backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
              style={{ borderColor: logo.color + '40' }}
              whileHover={{ 
                borderColor: logo.color,
                boxShadow: `0 0 30px ${logo.color}40`,
                color: logo.color
              }}
            >
              {logo.name}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255, 0, 100, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(0, 100, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(100, 255, 0, 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 20%, rgba(255, 0, 100, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 70% 80%, rgba(0, 100, 255, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(100, 255, 0, 0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at 70% 30%, rgba(255, 0, 100, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 30% 70%, rgba(0, 100, 255, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(100, 255, 0, 0.1) 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
};

export default LogoShowcase;