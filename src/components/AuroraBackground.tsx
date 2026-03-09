import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(0, 255, 127, 0.2) 0%,
              rgba(0, 191, 255, 0.2) 25%,
              rgba(138, 43, 226, 0.2) 50%,
              rgba(255, 20, 147, 0.2) 75%,
              rgba(255, 69, 0, 0.2) 100%
            )
          `,
        }}
        animate={{
          background: [
            `linear-gradient(45deg, 
              rgba(0, 255, 127, 0.2) 0%,
              rgba(0, 191, 255, 0.2) 25%,
              rgba(138, 43, 226, 0.2) 50%,
              rgba(255, 20, 147, 0.2) 75%,
              rgba(255, 69, 0, 0.2) 100%
            )`,
            `linear-gradient(135deg, 
              rgba(255, 69, 0, 0.2) 0%,
              rgba(255, 20, 147, 0.2) 25%,
              rgba(138, 43, 226, 0.2) 50%,
              rgba(0, 191, 255, 0.2) 75%,
              rgba(0, 255, 127, 0.2) 100%
            )`,
            `linear-gradient(225deg, 
              rgba(0, 191, 255, 0.2) 0%,
              rgba(0, 255, 127, 0.2) 25%,
              rgba(255, 69, 0, 0.2) 50%,
              rgba(255, 20, 147, 0.2) 75%,
              rgba(138, 43, 226, 0.2) 100%
            )`
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Aurora waves */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(0, 255, 127, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, rgba(255, 20, 147, 0.3) 0%, transparent 50%)
          `,
        }}
        animate={{
          transform: ['translateY(0%) scale(1)', 'translateY(-10%) scale(1.1)', 'translateY(0%) scale(1)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Flowing particles */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 200px 200px'
        }}
        animate={{ 
          backgroundPosition: [
            '0% 0%, 0% 0%, 0% 0%',
            '100% 100%, -100% 100%, 50% -50%'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default AuroraBackground;