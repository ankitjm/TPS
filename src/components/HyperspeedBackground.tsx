import React from 'react';
import { motion } from 'framer-motion';

const HyperspeedBackground: React.FC = () => {
  const lines = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.7,
    thickness: 1 + Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(0, 255, 255, 0.1) 0%,
              rgba(255, 0, 255, 0.1) 50%,
              rgba(255, 255, 0, 0.1) 100%
            )
          `,
        }}
        animate={{
          background: [
            `linear-gradient(45deg, 
              rgba(0, 255, 255, 0.1) 0%,
              rgba(255, 0, 255, 0.1) 50%,
              rgba(255, 255, 0, 0.1) 100%
            )`,
            `linear-gradient(225deg, 
              rgba(255, 255, 0, 0.1) 0%,
              rgba(0, 255, 255, 0.1) 50%,
              rgba(255, 0, 255, 0.1) 100%
            )`,
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Hyperspeed lines */}
      {lines.map(line => (
        <motion.div
          key={line.id}
          className="absolute bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${line.thickness}px`,
            height: '2px',
            opacity: line.opacity
          }}
          animate={{
            x: ['-100vw', '100vw'],
            scaleX: [0, 1, 0]
          }}
          transition={{
            delay: line.delay,
            duration: line.duration,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Diagonal speed lines */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`diagonal-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 120 - 10}%`,
            width: '200px',
            height: '1px',
            transform: 'rotate(45deg)'
          }}
          animate={{
            x: ['-20%', '120%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            delay: Math.random() * 3,
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Particle field */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 30% 90%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 200px 200px, 80px 80px, 120px 120px'
        }}
        animate={{ 
          backgroundPosition: [
            '0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%',
            '200% 200%, -100% 100%, 100% -100%, 150% 150%, -50% 150%'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default HyperspeedBackground;