import React, { useEffect, useRef } from 'react';

interface SoundManagerProps {
  currentSection: string;
  isEnabled: boolean;
}

// Music start timestamps for each slide (in seconds)
// Adjust these values based on your actual music track
const SoundManager: React.FC<SoundManagerProps> = ({ currentSection, isEnabled }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element if not already created
    if (!audioRef.current) {
      audioRef.current = new Audio('/Futurecity.wav');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    const audio = audioRef.current;

    // Only play during the slides experience (not on landing, our-work, contact, privacy, or admin pages)
    const experienceSlides = ['transition', 'sensory', 'touch-sound', 'interiority', 'philosophy', 'philosophy-extended'];
    const shouldPlay = experienceSlides.includes(currentSection) && isEnabled;

    if (shouldPlay) {
      // If we're at the very start of the experience, reset to beginning
      if (currentSection === 'transition' && audio.currentTime > 5) {
        audio.currentTime = 0;
      }

      // Play the audio
      audio.play().catch((error) => {
        console.log('Audio autoplay blocked:', error);
      });
    } else {
      // Pause if not on an experience slide or if sound is disabled
      audio.pause();

      // If we've reached 'our-work' or other pages, we can reset the audio
      if (!experienceSlides.includes(currentSection)) {
        audio.currentTime = 0;
      }
    }

    // Update volume based on enabled state
    audio.volume = isEnabled ? 0.4 : 0;

    return () => {
      // Don't stop the audio on cleanup, just pause if needed
      if (!isEnabled) {
        audio.pause();
      }
    };
  }, [currentSection, isEnabled]);

  return null;
};

export default SoundManager;