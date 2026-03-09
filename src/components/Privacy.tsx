import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

interface PrivacyProps {
  onHome: () => void;
  onStartExperience: () => void;
  onOurWork: () => void;
  onContact: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onHome, onStartExperience, onOurWork, onContact }) => {
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
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl">
              Your privacy is important to us. Learn how we protect your information.
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

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContact}
              className="px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="relative z-10 px-4 pb-20 flex-1">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-6 text-gray-300"
            >
              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Introduction</h2>
                <p className="leading-relaxed">
                  At Phygital Studio, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Information We Collect</h2>
                <p className="leading-relaxed mb-3">
                  We may collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Company or organization name</li>
                  <li>Project details and requirements</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">How We Use Your Information</h2>
                <p className="leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Information Sharing</h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us in operating our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Your Rights</h2>
                <p className="leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Cookies and Tracking</h2>
                <p className="leading-relaxed">
                  We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-thin text-white mb-4">Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our contact page or email us directly.
                </p>
              </section>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Last Updated: January 2025
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer onContact={onContact} />
    </motion.div>
  );
};

export default Privacy;

