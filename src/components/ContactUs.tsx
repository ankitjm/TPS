import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import Footer from './Footer';
import { saveInquiry } from '../lib/db';

interface ContactUsProps {
  onRestart: () => void;
  onHome: () => void;
  onStartExperience: () => void;
  onOurWork: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onRestart, onHome, onStartExperience, onOurWork }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveInquiry(formData);
      setShowThankYou(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to save inquiry:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto flex flex-col"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,100,100,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(150,150,150,0.2),transparent_50%)]" />
      </div>

      {/* Header with Navigation */}
      <div className="relative z-10 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center lg:text-left mb-6 lg:mb-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-thin text-white mb-2">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl">
              Ready to get phygital? Let's create something amazing together!
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHome}
              className="px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Home
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartExperience}
              className="px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Start Experience
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOurWork}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-white hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Our Work
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative z-10 px-4 pb-20 flex-1">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12"
          >


            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 
                               focus:border-white/40 focus:outline-none backdrop-blur-sm
                               text-white placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 
                               focus:border-white/40 focus:outline-none backdrop-blur-sm
                               text-white placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/20 
                               focus:border-white/40 focus:outline-none backdrop-blur-sm
                               text-white placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tell us about your vision
                </label>
                <textarea
                  name="message"
                  placeholder="Describe your phygital project or idea..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-4 rounded-lg bg-white/5 border border-white/20 
                             focus:border-white/40 focus:outline-none backdrop-blur-sm resize-none
                             text-white placeholder-gray-400 transition-all duration-300"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full 
                             hover:shadow-xl transition-all duration-300 
                             font-medium text-white text-lg sm:text-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRestart}
                  className="flex-1 py-4 sm:py-5 border border-white/20 rounded-full hover:bg-white/10 
                             transition-all duration-300 text-white font-medium text-lg sm:text-xl
                             flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Start Journey Again
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Thank You Message */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-30 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              className="text-center max-w-md"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <h3 className="text-4xl font-thin mb-4">Thank You!</h3>
              <p className="text-xl text-gray-300 mb-8">
                We'll be in touch soon to discuss your phygital vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRestart}
                  className="px-8 sm:px-10 py-4 sm:py-5 border border-white/30 rounded-full 
                             backdrop-blur-sm bg-white/10 text-lg sm:text-xl font-medium
                             hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Experience Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onHome}
                  className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full 
                             text-lg sm:text-xl font-medium hover:shadow-xl transition-all duration-300"
                >
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactUs;