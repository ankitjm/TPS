import React from 'react';
import { motion } from 'framer-motion';

const IridescenceBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.2) 0%, transparent 50%),
            linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(255, 0, 136, 0.1))
          `,
        }}
        animate={{
          background: [
            `
              radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.2) 0%, transparent 50%),
              linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(255, 0, 136, 0.1))
            `,
            `
              radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 60% 40%, rgba(119, 255, 198, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(255, 0, 136, 0.1))
            `,
            `
              radial-gradient(circle at 40% 60%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 60% 30%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 20% 50%, rgba(119, 255, 198, 0.2) 0%, transparent 50%),
              linear-gradient(225deg, rgba(0, 255, 136, 0.1), rgba(255, 0, 136, 0.1))
            `
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <div className="absolute inset-0 bg-black/20" />
      
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, transparent 20%, rgba(255, 255, 255, 0.1) 21%, rgba(255, 255, 255, 0.1) 25%, transparent 26%),
            radial-gradient(circle at 75% 75%, transparent 20%, rgba(255, 255, 255, 0.1) 21%, rgba(255, 255, 255, 0.1) 25%, transparent 26%)
          `,
          backgroundSize: '100px 100px, 150px 150px'
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default IridescenceBackground;