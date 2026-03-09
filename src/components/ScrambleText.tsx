import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';

  useEffect(() => {
    const startScramble = setTimeout(() => {
      setIsScrambling(true);
      
      let iteration = 0;
      const scrambleInterval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(scrambleInterval);
          setIsScrambling(false);
          setDisplayText(text);
        }

        iteration += 1 / 3;
      }, 50);

      return () => clearInterval(scrambleInterval);
    }, delay);

    return () => clearTimeout(startScramble);
  }, [text, delay, characters]);

  return (
    <motion.h2
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      {displayText}
      {isScrambling && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </motion.h2>
  );
};

export default ScrambleText;