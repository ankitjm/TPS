import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SplineTestProps {
    onBack: () => void;
}

const SplineTest: React.FC<SplineTestProps> = ({ onBack }) => {
    return (
        <div className="relative w-full h-screen bg-black">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
                <X className="w-6 h-6" />
            </motion.button>

            {/* Iframe Container */}
            <div className="w-full h-full">
                <iframe
                    src='https://my.spline.design/particles-zYlnu3pcJ9pcdp5xqoSRmRJp/'
                    frameBorder='0'
                    width='100%'
                    height='100%'
                    title="Spline Test"
                    className="w-full h-full"
                />
            </div>
        </div>
    );
};

export default SplineTest;
