import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Volume2, Headphones, Smartphone, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import Landing from './components/Landing';
import SoundManager from './components/SoundManager';
import SoundToggle from './components/SoundToggle';
import Transition from './components/Transition';
import SensoryLayer from './components/SensoryLayer';
import TouchSoundLayer from './components/TouchSoundLayer';
import Interiority from './components/Interiority';
import Philosophy from './components/Philosophy';
import PhilosophyExtended from './components/PhilosophyExtended';
import OurWork from './components/OurWork';
import ContactUs from './components/ContactUs';
import Privacy from './components/Privacy';
import Admin from './components/Admin';
import SplineTest from './components/SplineTest';
import SplashCursor from './components/SplashCursor';
import { initDb } from './lib/db';

type Section = 'landing' | 'transition' | 'sensory' | 'touch-sound' | 'interiority' | 'philosophy' | 'philosophy-extended' | 'our-work' | 'contact' | 'privacy' | 'admin' | 'spline-test';

// Route mapping
const routeToSection: Record<string, Section> = {
  '/': 'landing',
  '/home': 'landing',
  '/experience/transition': 'transition',
  '/experience/sensory': 'sensory',
  '/experience/touch-sound': 'touch-sound',
  '/experience/interiority': 'interiority',
  '/experience/philosophy': 'philosophy',
  '/experience/philosophy-extended': 'philosophy-extended',
  '/our-work': 'our-work',
  '/contact': 'contact',
  '/privacy-policy': 'privacy',
  '/admin': 'admin',
  '/spline-test': 'spline-test',
};

const sectionToRoute: Record<Section, string> = {
  'landing': '/',
  'transition': '/experience/transition',
  'sensory': '/experience/sensory',
  'touch-sound': '/experience/touch-sound',
  'interiority': '/experience/interiority',
  'philosophy': '/experience/philosophy',
  'philosophy-extended': '/experience/philosophy-extended',
  'our-work': '/our-work',
  'contact': '/contact',
  'privacy': '/privacy-policy',
  'admin': '/admin',
  'spline-test': '/spline-test',
};

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [showSplash, setShowSplash] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [slidesStarted, setSlidesStarted] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Initialize from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');

    let initialSection: Section = 'landing';

    // Check hash first (for backward compatibility)
    if (hash) {
      const hashSection = hash as Section;
      if (routeToSection[`/${hashSection}`] || Object.values(routeToSection).includes(hashSection)) {
        initialSection = hashSection as Section;
      }
    } else {
      // Check pathname
      initialSection = routeToSection[path] || routeToSection['/'];
    }

    setCurrentSection(initialSection);

    // Initialize Database
    initDb().catch(console.error);

    // If accessing an experience slide directly, enable sound and mark slides as started
    const experienceSlides: Section[] = ['transition', 'sensory', 'touch-sound', 'interiority', 'philosophy', 'philosophy-extended'];
    if (experienceSlides.includes(initialSection as Section)) {
      setSlidesStarted(true);
      setSoundEnabled(true);
    }
  }, []);

  const handleRestart = () => {
    setCurrentSection('landing');
    setShowSplash(false);
    setSlidesStarted(false);
  };

  const handleStartSlides = () => {
    setShowExperienceModal(true);
  };

  const handleStartExperience = () => {
    setShowExperienceModal(false);
    setSlidesStarted(true);
    setSoundEnabled(true);
    handleSectionChange('transition');
  };

  const handleCloseExperience = () => {
    setSlidesStarted(false);
    setSoundEnabled(false);
    handleSectionChange('landing');
  };

  const handleSectionChange = (section: Section) => {
    // Automatically stop sound when transitioning to our-work or contact
    if (section === 'our-work' || section === 'contact' || section === 'privacy') {
      setSoundEnabled(false);
    }

    // Update URL without page reload
    const route = sectionToRoute[section];
    if (route) {
      window.history.pushState({ section }, '', route);
    }

    if (section === 'transition') {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        setCurrentSection(section);
      }, 1000);
    } else {
      setCurrentSection(section);
    }
  };

  // Handle browser back/forward buttons and orientation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const section = routeToSection[path] || routeToSection['/'];
      setCurrentSection(section);

      // Enable sound if navigating to experience slide
      const experienceSlides: Section[] = ['transition', 'sensory', 'touch-sound', 'interiority', 'philosophy', 'philosophy-extended'];
      if (experienceSlides.includes(section as Section)) {
        setSlidesStarted(true);
        setSoundEnabled(true);
      } else {
        setSoundEnabled(false);
      }
    };

    const handleOrientationChange = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const navigateToNext = () => {
    if (!slidesStarted) return;

    const sections: (Section | 'privacy')[] = ['landing', 'transition', 'sensory', 'touch-sound', 'interiority', 'philosophy', 'philosophy-extended', 'our-work', 'contact', 'privacy'];
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1] as Section);
    }
  };

  const navigateToPrevious = () => {
    if (!slidesStarted) return;

    const sections: (Section | 'privacy')[] = ['landing', 'transition', 'sensory', 'touch-sound', 'interiority', 'philosophy', 'philosophy-extended', 'our-work', 'contact', 'privacy'];
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1] as Section);
    }
  };

  useEffect(() => {
    if (!slidesStarted || currentSection === 'landing' || currentSection === 'our-work' || currentSection === 'contact' || currentSection === 'privacy' || currentSection === 'admin') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        navigateToNext();
      } else if (e.key === 'ArrowLeft') {
        navigateToPrevious();
      } else if (e.key === 'Escape') {
        handleCloseExperience();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, slidesStarted]);

  // Attempt to regain focus when section changes so keyboard works initially
  useEffect(() => {
    window.focus();
  }, [currentSection]);

  // Determine navigation text color based on current section
  const getNavigationTextColor = () => {
    if (currentSection === 'sensory' || currentSection === 'philosophy') {
      return 'text-black';
    }
    return 'text-white';
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      <SoundManager currentSection={currentSection} isEnabled={soundEnabled} />

      {/* Sound Toggle - Only show during slides experience */}
      {(currentSection === 'transition' || currentSection === 'sensory' || currentSection === 'touch-sound' || currentSection === 'interiority' || currentSection === 'philosophy' || currentSection === 'philosophy-extended') && (
        <div className="fixed top-6 left-6 z-40">
          <SoundToggle isEnabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
        </div>
      )}

      <div className={`flex-1 flex flex-col ${slidesStarted ? 'select-none' : ''}`}>
        <AnimatePresence mode="wait" initial={false}>
          {currentSection === 'landing' && (
            <Landing key="landing" onEnter={handleStartSlides} onSeeWork={() => handleSectionChange('our-work')} onContact={() => handleSectionChange('contact')} />
          )}
          {currentSection === 'transition' && (
            <Transition key="transition" onComplete={() => handleSectionChange('sensory')} />
          )}
          {currentSection === 'sensory' && (
            <SensoryLayer key="sensory" onNext={() => handleSectionChange('touch-sound')} />
          )}
          {currentSection === 'touch-sound' && (
            <TouchSoundLayer key="touch-sound" onNext={() => handleSectionChange('interiority')} />
          )}
          {currentSection === 'interiority' && (
            <Interiority key="interiority" onNext={() => handleSectionChange('philosophy')} />
          )}
          {currentSection === 'philosophy' && (
            <Philosophy key="philosophy" onNext={() => handleSectionChange('philosophy-extended')} />
          )}
          {currentSection === 'philosophy-extended' && (
            <PhilosophyExtended key="philosophy-extended" onNext={() => handleSectionChange('our-work')} />
          )}
          {currentSection === 'our-work' && (
            <OurWork
              key="our-work"
              onNext={() => handleSectionChange('contact')}
              onHome={() => handleSectionChange('landing')}
              onStartExperience={handleStartSlides}
              onContact={() => handleSectionChange('contact')}
            />
          )}
          {currentSection === 'contact' && (
            <ContactUs
              key="contact"
              onRestart={handleRestart}
              onHome={() => handleSectionChange('landing')}
              onStartExperience={handleStartSlides}
              onOurWork={() => handleSectionChange('our-work')}
            />
          )}
          {currentSection === 'privacy' && (
            <Privacy
              key="privacy"
              onHome={() => handleSectionChange('landing')}
              onStartExperience={handleStartSlides}
              onOurWork={() => handleSectionChange('our-work')}
              onContact={() => handleSectionChange('contact')}
            />
          )}
          {currentSection === 'admin' && (
            <Admin
              key="admin"
              onBack={() => handleSectionChange('landing')}
            />
          )}
          {currentSection === 'spline-test' && (
            <SplineTest
              key="spline-test"
              onBack={() => handleSectionChange('landing')}
            />
          )}
        </AnimatePresence>

        {/* Navigation Indicators */}
        {currentSection !== 'landing' && currentSection !== 'our-work' && currentSection !== 'contact' && currentSection !== 'privacy' && currentSection !== 'admin' && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={navigateToPrevious}
              className={`p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl ${getNavigationTextColor()}`}
              aria-label="Previous"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={navigateToNext}
              className={`p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-xl ${getNavigationTextColor()}`}
              aria-label="Next"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        )}

        {/* Close Experience Button */}
        {(currentSection === 'transition' || currentSection === 'sensory' || currentSection === 'touch-sound' || currentSection === 'interiority' || currentSection === 'philosophy' || currentSection === 'philosophy-extended') && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCloseExperience}
            className="fixed top-20 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {showExperienceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center"
            >
              <div className="flex flex-col items-center justify-center mb-6">
                <Volume2 className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-3xl font-thin text-white mb-4">
                Get ready for the experience
              </h2>
              <div className="space-y-4 text-gray-300 mb-8 text-left">
                <p className="flex items-center gap-4">
                  <Volume2 className="w-6 h-6 text-gray-400" />
                  Sound will start automatically
                </p>
                <p className="flex items-center gap-4">
                  <Headphones className="w-6 h-6 text-gray-400" />
                  Wear headphones for best experience
                </p>
                <div className="flex items-center gap-4">
                  <div className="rotate-90">
                    <Smartphone className="w-6 h-6 text-gray-400" />
                  </div>
                  Watch in landscape mode
                </div>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartExperience}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-medium"
                >
                  Start Experience
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowExperienceModal(false)}
                  className="flex-1 py-3 border border-white/20 rounded-full text-white font-medium hover:bg-white/10"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSplash && <SplashCursor />}

      {/* Portrait Lock Overlay - Mobile Only */}
      {!isPortrait && !slidesStarted && isMobileDevice && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 text-center">
          <RotateCw className="w-16 h-16 text-white mb-6 animate-spin" />
          <h2 className="text-2xl font-thin text-white mb-4">Please Rotate</h2>
          <p className="text-gray-400">This site is best viewed in portrait mode.</p>
        </div>
      )}
    </div>
  );
}

export default App;