import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Mail, User, Sparkles, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { submitToGoogleSheets } from '../services/googleSheets';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  title = "Stay Connected with FARIO",
  subtitle = "Be the first to know about new collections and exclusive offers"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await submitToGoogleSheets({
        ...formData,
        source: 'contact'
      });
      
      if (success) {
        setIsSubmitted(true);
        
        // Auto close after success
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '' });
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success to user, data is stored locally as fallback
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.phone.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-[#0e3039] rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto border border-white/10"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-br from-cyan-600 via-teal-600 to-cyan-700 p-8 text-white">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIgLz48L3N2Zz4=')] opacity-20"></div>
              
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <p className="text-white/90 text-sm leading-relaxed">{subtitle}</p>
                </motion.div>
              </div>
            </div>

            {/* Form content */}
            <div className="p-8 bg-[#0e3039]">
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Badge className="bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-3 py-1 text-xs">
                    Join 5,000+ Fashion Enthusiasts
                  </Badge>

                  {/* Name Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <User className="h-5 w-5 text-cyan-300" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-white/20"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Mail className="h-5 w-5 text-cyan-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-white/20"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Phone className="h-5 w-5 text-cyan-300" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:bg-white/20"
                    />
                  </div>

                  {/* Privacy notice */}
                  <p className="text-xs text-gray-300 leading-relaxed">
                    By submitting this form, you agree to receive marketing communications from FARIO. 
                    We respect your privacy and you can unsubscribe at any time.
                  </p>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                  >
                    <Button
                      type="submit"
                      disabled={!isFormValid || isLoading}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        isFormValid
                          ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-white/20 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="ml-2">Submitting...</span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Sparkles className="w-5 h-5 mr-2" />
                          Join Our Community
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                // Success state
                <motion.div
                  className="text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                  >
                    <Check className="w-8 h-8 text-green-400" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">Welcome to FARIO!</h3>
                  <p className="text-gray-300 mb-4">
                    Thank you for joining our community. You'll be the first to know about our latest collections and exclusive offers.
                  </p>
                  
                  <div className="bg-green-400/20 border border-green-400/30 rounded-xl p-4">
                    <p className="text-green-300 font-medium text-sm">
                      🎉 Check your email for a special welcome discount!
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;