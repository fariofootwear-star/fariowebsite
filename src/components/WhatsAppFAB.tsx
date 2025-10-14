import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFABProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ 
  phoneNumber = "919876543210", // Default Indian number format
  message = "Hi! I'm interested in FARIO footwear. Can you help me?" 
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 2, 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        className="relative bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all duration-300 group"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Pulsing background effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap relative">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppFAB;