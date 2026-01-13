import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import WhatsAppFAB from './components/WhatsAppFAB';
import ContactFormModal from './components/ContactFormModal';
import CollectionsPage from './components/CollectionsPage';
import ProductDetailPage from './components/ProductDetailPage';
import ScrollToTopFAB from './components/ScrollToTopFAB';
import ContactDetails from './components/ContactDetails';
import LegalPages from './components/LegalPages';
import { submitToGoogleSheets } from './services/googleSheets';
import {
  Menu,
  X,
  ChevronDown,
  Star,
  Shield,
  Heart,
  Zap,
  Leaf,
  Award,
  Truck,
  ArrowRight,
  Play,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Package,
  Sparkles,
  TrendingUp,
  Users,
  Check,
  Shovel
} from 'lucide-react';
import farioLogo from 'figma:asset/2fbb3db6ff6253ade9152b8169134bbbdda77108.png';

// Import images
const heroShoeImage = "https://lh3.googleusercontent.com/d/1-MpRu-Bhu1dsUHB1Z62vQeh5qSCAMJBU";
const floatingShoeImage = "https://lh3.googleusercontent.com/d/1rNQ-9y8gYT9HKlGwdbu2H98CqmMWO2LJ";
const studioShoeImage ="https://lh3.googleusercontent.com/d/1-MpRu-Bhu1dsUHB1Z62vQeh5qSCAMJBU";
const levitationShoeImage = "https://images.unsplash.com/photo-1616615965190-08884c4d85c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMGxldml0YXRpb24lMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NTY5MTUyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const lifestyleImage = "https://lh3.googleusercontent.com/d/1DssonQYpkjLBmrV88JyA_TEUAK7aQjZz";
const collectionImage = "https://lh3.googleusercontent.com/d/1qQoqTIQqmTPi5uK_Gz6BEEeUwfxlwuHe";
const packagingImage = "https://lh3.googleusercontent.com/d/1qQoqTIQqmTPi5uK_Gz6BEEeUwfxlwuHe";
const modelImage = "https://lh3.googleusercontent.com/d/1LuQCGYJ6V9-KRu8Yi6OVadZq_nYZrxyZ";
const shoesImage = "https://lh3.googleusercontent.com/d/1n1HSbw1WJwwIKDNa5eB3rEJm6g1km1v2";
const socksImage = "https://lh3.googleusercontent.com/d/1_n1w-wkzkN0D_pc9oTMdEZPqetnWYcZ_";
const bagsImage = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWdzJTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc1NzEzMzkyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const lookbookImage = "https://lh3.googleusercontent.com/d/1d1tGt7NGjosihmea9WEZiF5GeLL0XsDx";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Navigation Component
interface NavigationProps {
  onExploreCollection: () => void;
  onShowContact: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onExploreCollection, onShowContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0e3039] shadow-xl border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={farioLogo} alt="FARIO" className="h-8 lg:h-10 w-auto" />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Collections', 'About', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative hover:text-cyan-300 transition-colors duration-200 font-medium text-white"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (item === 'Collections') {
                    onExploreCollection();
                  } else if (item === 'Contact') {
                    const element = document.getElementById('contact-details');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {item}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('waitlist');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Join Now
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-md text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-[#0e3039] rounded-2xl shadow-xl border border-white/10 mt-4 p-6 mx-4">
            <div className="space-y-4">
              {['Collections', 'About', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 px-4 text-white hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    if (item === 'Contact') {
                      const element = document.getElementById('contact-details');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      const element = document.getElementById(item.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-3 shadow-lg"
                  onClick={() => {
                    setIsOpen(false);
                    const element = document.getElementById('waitlist');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Join Waitlist
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

// Hero Section
interface HeroSectionProps {
  onExploreCollection: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCollection }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const yBackground = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #0e3039 0%, #1a4b56 50%, #0e3039 100%)' }}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Dynamic Background Elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y: yBackground }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-white/20 to-cyan-300/20 rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-white/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-300/20 to-white/20 rounded-full opacity-40 blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 items-center min-h-[calc(100vh-8rem)]">
          {/* Text Content */}
          <motion.div
            className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <Badge className="bg-cyan-400/20 backdrop-blur-sm text-cyan-100 border-cyan-300/30 px-4 py-2 text-sm font-medium">
                ✨ New Collection Available
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[0.9] sm:leading-tight"
              variants={fadeInUp}
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Step In,
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-cyan-200 via-cyan-100 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stand Out
              </motion.span>
            </motion.h1>

            <motion.div
              className="mb-8 space-y-4"
              variants={fadeInUp}
            >
              <motion.p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Fashion × Function × Sustainability
              </motion.p>
              <motion.p
                className="text-base sm:text-lg text-white/80 max-w-xl lg:max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Discover premium footwear that combines innovative design with unmatched comfort. Every step tells your story.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-start mb-12"
              variants={fadeInUp}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white hover:from-cyan-500 hover:to-teal-500 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  onClick={onExploreCollection}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-2 w-5 h-5" />
                    Shop Collection
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              variants={fadeInUp}
            >
              {[
                { icon: Star, text: "4.9 / 5 Rating", subtext: "Reviewed by 25000+ students", color: "text-yellow-400" },
                { icon: Users, text: "100K+ Satisfied Institutions", subtext: "India level", color: "text-cyan-400" },
                { icon: TrendingUp, text: "95% Satisfaction", subtext: "Rate", color: "text-teal-400" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-8 h-8 ${item.color.includes('yellow') ? 'bg-yellow-400/20' : item.color.includes('cyan') ? 'bg-cyan-400/20' : 'bg-teal-400/20'} rounded-full flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.color} ${item.icon === Star ? 'fill-current' : ''}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{item.text}</div>
                    <div className="text-white/70 text-xs">{item.subtext}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image Section */}
          <motion.div
            className="lg:col-span-6 relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ opacity, scale }}
          >
            <div className="relative">
              {/* Main Hero Image */}
              <motion.div
                className="relative z-20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-6 bg-gradient-to-r from-purple-600/30 via-violet-600/20 to-teal-600/30 rounded-3xl blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <img
                    src={heroShoeImage}
                    alt="FARIO Premium Footwear"
                    className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Floating Product Cards */}
              <motion.div
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-30"
                animate={{
                  y: [-8, 8, -8],
                  rotate: [0, 1, 0],
                  opacity: 1,
                  scale: 1
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.6, delay: 1.2 },
                  scale: { duration: 0.6, delay: 1.2 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Starting from</p>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">₹699</p>
                  <p className="text-xs text-gray-400">Premium Quality</p>
                </div> */}
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl text-white z-30"
                animate={{
                  y: [8, -8, 8],
                  rotate: [0, -1, 0],
                  opacity: 1,
                  scale: 1
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.6, delay: 1.4 },
                  scale: { duration: 0.6, delay: 1.4 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* <div className="flex items-center space-x-2 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold text-sm sm:text-base">4.2 / 5</span>
                </div>
                <p className="text-xs opacity-90">2,847 Reviews</p> */}
              </motion.div>

              {/* Background Floating Shoes - Hidden on mobile for better performance */}
              <motion.div
                className="hidden lg:block absolute top-16 -left-12 w-24 h-24 opacity-20 z-10"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                  opacity: 0.2,
                  scale: 1
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.8, delay: 1.6 },
                  scale: { duration: 0.8, delay: 1.6 }
                }}
              >
                <img
                  src={floatingShoeImage}
                  alt="Floating Shoe"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                className="hidden lg:block absolute bottom-20 -right-8 w-20 h-20 opacity-15 z-10"
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                  opacity: 0.15,
                  scale: 1
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.8, delay: 1.8 },
                  scale: { duration: 0.8, delay: 1.8 }
                }}
              >
                <img
                  src={studioShoeImage}
                  alt="Studio Shoe"
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>

              {/* Interactive Elements */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full opacity-60 z-10"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.3, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs text-white/70 mb-3 uppercase tracking-wide">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center items-start relative"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </section>
  );
};

// Animated Text Component
interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Brand Story Section
const BrandStorySection = () => {
  return (
    <section id="about" className="py-24 bg-[#0e3039]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src={lifestyleImage}
                alt="FARIO Lifestyle"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--fario-purple)]/20 to-[var(--fario-teal)]/20 rounded-2xl"></div>
            </div>
          </motion.div>

          <div>
            <AnimatedText>
              <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-4 py-2">
                The FARIO Difference
              </Badge>
            </AnimatedText>

            <AnimatedText>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                More Than Just Footwear
              </h2>
            </AnimatedText>

            <AnimatedText>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                At FARIO, we believe footwear is more than just a necessity—it's a statement of comfort, style, and individuality. Rooted in legacy and driven by innovation, our brand is built on the promise to make every step count.
              </p>
            </AnimatedText>

            <AnimatedText>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our logo tells our story: the slanted "F" shaped like a hill reflects our journey of growth and ambition, while the shoe silhouette reminds us of our core passion—creating footwear that blends function with fashion.
              </p>
            </AnimatedText>

            <AnimatedText>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">50K+</h3>
                  <p className="text-gray-200"> Satisfied Institutions</p>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-2xl font-bold text-teal-400 mb-2">25000+</h3>
                  <p className="text-gray-200">Students Using FARIO</p>
                </div>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
};

// Collection Section
interface CollectionSectionProps {
  onExploreCollection: () => void;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ onExploreCollection }) => {
  const collections = [
    {
      id: 1,
      name: "Premium Shoes",
      description: "Sophisticated designs for every occasion",
      image: shoesImage,
      price: "From ₹699",
      category: "shoes"
    },
    {
      id: 2,
      name: "Premium Socks",
      description: "Comfort and style from the ground up",
      image: socksImage,
      price: "From ₹499",
      category: "socks"
    }
    // {
    //   id: 3,
    //   name: "Premium Bags",
    //   description: "Elegant and durable, made for every journey",
    //   image: bagsImage,
    //   price: "From ₹999",
    //   category: "bags"
    // }
  ];

  return (
    <section id="collections" className="py-24 bg-[#1a4b56]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText>
            <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-4 py-2">
              Explore Our Collection
            </Badge>
          </AnimatedText>

          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Find Your Perfect Match
            </h2>
          </AnimatedText>

          <AnimatedText>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover our carefully curated collections designed for every lifestyle and occasion
            </p>
          </AnimatedText>

          <AnimatedText>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8"
            >
              <Button
                size="lg"
                onClick={onExploreCollection}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View All Collections
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </AnimatedText>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Quick Shop
                      </Button>
                    </motion.div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-cyan-600 text-white">
                      {collection.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {collection.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
                    onClick={onExploreCollection}
                  >
                    Explore Collection
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// // Packaging Section
// const PackagingSection = () => {
//   return (
//     <section className="py-24 bg-[#1a4b56]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <AnimatedText>
//               <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-4 py-2">
//                 More Than Just Shoes
//               </Badge>
//             </AnimatedText>

//             <AnimatedText>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
//                 Sustainable Packaging Experience
//               </h2>
//             </AnimatedText>

//             <AnimatedText>
//               <p className="text-lg text-gray-300 mb-8 leading-relaxed">
//                 Every FARIO purchase comes with eco-friendly, reusable packaging that reflects our commitment to sustainability and style.
//               </p>
//             </AnimatedText>

//             <AnimatedText>
//               <div className="space-y-6">
//                 {[
//                   { icon: Leaf, title: "Eco-Friendly", description: "Made from recycled materials" },
//                   { icon: Package, title: "Reusable Design", description: "Multi-compartment storage solution" },
//                   { icon: Award, title: "Premium Quality", description: "Durable and stylish construction" }
//                 ].map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     className="flex items-start space-x-4"
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                   >
//                     <div className="flex-shrink-0 w-12 h-12 bg-cyan-400/20 rounded-xl flex items-center justify-center">
//                       <feature.icon className="w-6 h-6 text-cyan-400" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-white mb-1">
//                         {feature.title}
//                       </h3>
//                       <p className="text-gray-300">
//                         {feature.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </AnimatedText>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <div className="relative">
//               <img
//                 src={packagingImage}
//                 alt="FARIO Packaging"
//                 className="w-full rounded-2xl shadow-2xl"
//               />
//               <motion.div
//                 className="absolute -bottom-6 -right-6 bg-cyan-600 text-white p-6 rounded-2xl shadow-xl"
//                 animate={{ rotate: [0, 5, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//               >
//                 <Leaf className="w-8 h-8 mb-2" />
//                 <p className="font-semibold">100% Eco</p>
//                 <p className="text-sm opacity-90">Friendly</p>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Infographic Section
// const infographicFeatures = [
//   {
//     id: 'fit',
//     title: 'Adaptive Fit',
//     description: 'Smart mesh fibers expand and contract to mold perfectly to unique foot shapes.',
//     visual: (
//       <svg viewBox="0 0 200 200" className="w-full h-full stroke-fario-lime fill-none stroke-2">
//         {/* Abstract Mesh that breathes */}
//         <motion.path
//           d="M40,100 C40,60 160,60 160,100 C160,140 40,140 40,100 Z"
//           animate={{
//             d: [
//               "M40,100 C40,60 160,60 160,100 C160,140 40,140 40,100 Z",
//               "M30,100 C30,40 170,40 170,100 C170,160 30,160 30,100 Z",
//               "M40,100 C40,60 160,60 160,100 C160,140 40,140 40,100 Z"
//             ],
//             strokeWidth: [2, 4, 2],
//             strokeOpacity: [0.5, 1, 0.5]
//           }}
//           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.path
//           d="M50,100 C50,70 150,70 150,100 C150,130 50,130 50,100 Z"
//           animate={{
//             d: [
//               "M50,100 C50,70 150,70 150,100 C150,130 50,130 50,100 Z",
//               "M45,100 C45,60 155,60 155,100 C155,140 45,140 45,100 Z",
//               "M50,100 C50,70 150,70 150,100 C150,130 50,130 50,100 Z"
//             ]
//           }}
//           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
//           opacity="0.6"
//         />
//         {/* Grid Lines */}
//         {[...Array(5)].map((_, i) => (
//           <motion.line
//             key={i}
//             x1={60 + i * 20} y1="60" x2={60 + i * 20} y2="140"
//             strokeDasharray="4 4"
//             animate={{ y1: [60, 50, 60], y2: [140, 150, 140] }}
//             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
//           />
//         ))}
//       </svg>
//     )
//   },
//   {
//     id: 'cushion',
//     title: 'Cushioned Comfort',
//     description: 'High-density memory foam absorbs impact and returns energy with every step.',
//     visual: (
//       <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
//         {/* Floor Lines */}
//         <motion.line x1="20" y1="150" x2="180" y2="150" stroke="#4b5563" strokeWidth="2" />

//         {/* Compressed Layers */}
//         {[0, 10, 20].map((offset, i) => (
//           <motion.path
//             key={i}
//             d={`M40,${140 - offset} Q100,${140 - offset} 160,${140 - offset}`}
//             stroke="#7a51a0"
//             strokeWidth="4"
//             animate={{
//               d: [
//                 `M40,${140 - offset} Q100,${140 - offset} 160,${140 - offset}`,
//                 `M40,${140 - offset} Q100,${160 - offset} 160,${140 - offset}`,
//                 `M40,${140 - offset} Q100,${140 - offset} 160,${140 - offset}`
//               ]
//             }}
//             transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut" }}
//           />
//         ))}

//         {/* Bouncing Energy Ball */}
//         <motion.circle
//           cx="100"
//           cy="100"
//           r="15"
//           fill="#d9f99d"
//           animate={{ cy: [60, 120, 60], scaleY: [1, 0.8, 1] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut" }}
//         />

//         {/* Impact Rings */}
//         <motion.ellipse
//           cx="100" cy="140" rx="10" ry="2"
//           stroke="#d9f99d"
//           animate={{ rx: [10, 40], opacity: [1, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
//         />
//       </svg>
//     )
//   },
//   {
//     id: 'grip',
//     title: 'Anti-Skid Grip',
//     description: 'Advanced tread patterns lock onto surfaces for maximum traction and safety.',
//     visual: (
//       <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-fario-lime stroke-2">
//         {/* Moving Tread Pattern */}
//         <defs>
//           <pattern id="tread" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
//             <path d="M0,20 L20,0 L40,20 M0,40 L20,20 L40,40" fill="none" stroke="currentColor" strokeWidth="2" />
//           </pattern>
//         </defs>

//         <motion.rect
//           x="0" y="0" width="200" height="200" fill="url(#tread)"
//           animate={{ y: [0, 40] }}
//           transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
//           mask="url(#circleMask)"
//         />

//         {/* Mask to keep it in circle */}
//         <mask id="circleMask">
//           <circle cx="100" cy="100" r="80" fill="white" />
//         </mask>

//         {/* Lock Icon Overlay */}
//         <motion.circle
//           cx="100" cy="100" r="85" stroke="#0e3039" strokeWidth="10"
//           animate={{ stroke: ["#0e3039", "#d9f99d", "#0e3039"] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         />
//         <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" strokeDasharray="10 5" />
//       </svg>
//     )
//   },
//   {
//     id: 'fresh',
//     title: 'Freshness Control',
//     description: 'Antimicrobial lining promotes airflow and prevents odors all day long.',
//     visual: (
//       <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
//         {/* Shield Boundary */}
//         <path d="M100,30 L160,50 V100 C160,140 100,180 100,180 C100,180 40,140 40,100 V50 L100,30 Z" stroke="#7a51a0" strokeWidth="2" />

//         {/* Particles Flowing Up */}
//         {[...Array(8)].map((_, i) => (
//           <motion.circle
//             key={i}
//             r={Math.random() * 3 + 2}
//             fill="#d9f99d"
//             initial={{ x: 70 + Math.random() * 60, y: 160, opacity: 0 }}
//             animate={{ y: 40, opacity: [0, 1, 0] }}
//             transition={{
//               duration: 2 + Math.random(),
//               repeat: Infinity,
//               ease: "linear",
//               delay: Math.random() * 2
//             }}
//           />
//         ))}

//         {/* Wavy Air Lines */}
//         {[1, 2, 3].map(i => (
//           <motion.path
//             key={`line-${i}`}
//             d={`M${80 + i * 10},150 Q${90 + i * 10},120 ${80 + i * 10},90 T${80 + i * 10},30`}
//             stroke="white"
//             strokeOpacity="0.2"
//             strokeDasharray="5 5"
//             animate={{ strokeDashoffset: [0, -20] }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           />
//         ))}
//       </svg>
//     )
//   }
// ];

// const InfographicSection: React.FC = () => {
//   const [activeIdx, setActiveIdx] = useState(0);

//   // Auto rotate features every 5 seconds if user hasn't interacted recently
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveIdx((prev) => (prev + 1) % infographicFeatures.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="py-24 bg-gradient-to-b from-[#1a4b56] to-[#0e3039] relative overflow-hidden">

//       {/* Top Slant Edge - Matched to section bg */}
//       {/* <div className="absolute top-0 left-0 w-full h-12 bg-[#1a4b56] z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}></div> */}

//       <div className="container mx-auto px-6 relative z-10">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <span className="px-3 py-1 bg-[#0e3039] text-white text-xs font-bold uppercase tracking-widest rounded-sm mb-4 inline-block font-heading">
//             Engineering Lab
//           </span>
//           <h2 className="text-4xl md:text-5xl font-semibold font-heading text-[#0e3039] uppercase tracking-tight">
//             Science in <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50" style={{ WebkitTextStroke: "1px white" }}>Motion</span>
//           </h2>
//         </div>

//         {/* Interactive Lab Interface */}
//         <div className="bg-[#0b252c] rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-16 text-white border border-[#1a4b56] relative">

//           {/* Background Texture: Shoe Pattern */}
//           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "30px 30px" }}></div>

//           {/* Abstract Shoe Sole Watermark */}
//           <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#d9f99d]/5 rounded-full blur-[80px] pointer-events-none"></div>

//           {/* Controls (Left Side) */}
//           <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center gap-4 relative z-10">
//             {infographicFeatures.map((feature, idx) => (
//               <motion.button
//                 key={feature.id}
//                 onClick={() => setActiveIdx(idx)}
//                 className={`text-left pl-6 pr-4 py-4 rounded-xl transition-all duration-300 group relative ${activeIdx === idx
//                   ? 'bg-[#1a4b56] shadow-lg'
//                   : 'bg-transparent hover:bg-white/5'
//                   }`}
//                 whileHover={{ x: 5 }}
//               >
//                 {activeIdx === idx && (
//                   <motion.div
//                     layoutId="active-pill-bg"
//                     className="absolute inset-0 bg-[#1a4b56] rounded-xl -z-10"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}

//                 {/* Left Green Bar Indicator */}
//                 {activeIdx === idx && (
//                   <motion.div
//                     layoutId="active-bar"
//                     className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#d9f99d] rounded-r-md z-10"
//                   />
//                 )}

//                 <div className="relative z-10">
//                   <div className="flex justify-between items-center mb-1">
//                     <h3 className={`text-xl font-bold font-heading ${activeIdx === idx ? 'text-[#d9f99d]' : 'text-white group-hover:text-gray-200'}`}>
//                       {feature.title}
//                     </h3>
//                     {activeIdx === idx && (
//                       <motion.div layoutId="active-dot" className="w-2 h-2 bg-[#d9f99d] rounded-full" />
//                     )}
//                   </div>
//                   <p className={`text-sm leading-relaxed ${activeIdx === idx ? 'text-gray-200' : 'text-gray-500'}`}>
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.button>
//             ))}
//           </div>

//           {/* Visualization Viewport (Right Side) */}
//           <div className="w-full md:w-1/2 lg:w-7/12 min-h-[350px] md:h-auto bg-[#081e24] rounded-[2rem] border border-[#1a4b56] relative flex items-center justify-center overflow-hidden shadow-inner">

//             {/* Tech Overlay Lines */}
//             <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#d9f99d] rounded-tl-2xl opacity-40"></div>
//             <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#d9f99d] rounded-br-2xl opacity-40"></div>

//             <div className="absolute top-8 right-8 text-xs font-bold font-heading text-[#d9f99d] opacity-60 tracking-widest">
//               MATERIAL.LAB // 0{activeIdx + 1}
//             </div>

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeIdx}
//                 className="w-full h-full p-12 max-w-sm"
//                 initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
//                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                 exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {infographicFeatures[activeIdx].visual}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//         </div>
//       </div>

//       {/* Bottom Slant Edge */}
//       <div className="absolute bottom-0 left-0 w-full h-12 bg-[#0e3039] z-10" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}></div>
//     </section>
//   );
// };

// USP Section
const USPSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Durability",
      description: "Built with premium materials to withstand daily wear and active use"
    },
    {
      icon: Heart,
      title: "Comfort",
      description: "Ergonomic designs ensure support and ease with every step"
    },
    {
      icon: Zap,
      title: "Design",
      description: "Contemporary styles that help you express your unique personality"
    },
    {
      icon: Check,
      title: "Anti-Skid",
      description: "Anti-slip technology provides maximum protection and comfort"
    }
  ];

  return (
    <section className="py-24 bg-[#0e3039]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText>
            <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-4 py-2">
              Why Choose FARIO
            </Badge>
          </AnimatedText>

          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Quality You Can Trust
            </h2>
          </AnimatedText>

          <AnimatedText>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe footwear should be more than stylish—it should be comfortable, durable, and made for real life
            </p>
          </AnimatedText>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center p-8 h-full hover:shadow-xl transition-shadow duration-300 bg-white/10 backdrop-blur-sm border-white/10">
                <motion.div
                  className="w-16 h-16 bg-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// // Testimonials Section
// const TestimonialsSection = () => {
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Fashion Blogger",
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3df?w=150&h=150&fit=crop&crop=face",
//       content: "FARIO shoes are absolutely amazing! The comfort and style combination is unmatched. I've been wearing them daily for months.",
//       rating: 5
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Fitness Instructor",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//       content: "The durability and support these shoes provide is incredible. Perfect for my active lifestyle and still look great.",
//       rating: 5
//     },
//     {
//       id: 3,
//       name: "Emma Davis",
//       role: "Marketing Manager",
//       avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
//       content: "Love the sustainable packaging and the shoes are so comfortable. FARIO has become my go-to footwear brand!",
//       rating: 5
//     }
//   ];

//   return (
//     <section className="py-24 bg-[#1a4b56]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <AnimatedText>
//             <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-4 py-2">
//               Testimonials
//             </Badge>
//           </AnimatedText>

//           <AnimatedText>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
//               Our Happy Customers
//             </h2>
//           </AnimatedText>
//         </div>

//         <motion.div
//           className="grid md:grid-cols-3 gap-8"
//           variants={staggerContainer}
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//         >
//           {testimonials.map((testimonial) => (
//             <motion.div
//               key={testimonial.id}
//               variants={fadeInUp}
//               whileHover={{ y: -5 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Card className="p-8 h-full bg-white/10 backdrop-blur-sm border-white/10">
//                 <div className="flex items-center mb-4">
//                   {Array.from({ length: testimonial.rating }).map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-300 mb-6 leading-relaxed">
//                   "{testimonial.content}"
//                 </p>
//                 <div className="flex items-center">
//                   <img
//                     src={testimonial.avatar}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full mr-4"
//                   />
//                   <div>
//                     <h4 className="font-semibold text-white">
//                       {testimonial.name}
//                     </h4>
//                     <p className="text-sm text-gray-400">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// Lifestyle Gallery
const LifestyleGallery = () => {
  const images = [
    lookbookImage,
    modelImage,
    lifestyleImage,
    collectionImage,
    heroShoeImage,
    packagingImage
  ];

  return (
    <section className="py-24 bg-[#0e3039]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText>
            <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-4 py-2">
              FARIO Gallery
            </Badge>
          </AnimatedText>

          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Step Into Style
            </h2>
          </AnimatedText>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
            >
              <img
                src={image}
                alt={`Lifestyle ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button className={`backdrop-blur-sm text-white shadow-xl ${index % 3 === 0 ? 'bg-cyan-500 hover:bg-cyan-600' :
                    index % 3 === 1 ? 'bg-teal-500 hover:bg-teal-600' :
                      'bg-orange-500 hover:bg-orange-600'
                    }`}>
                    <Heart className="w-4 h-4 mr-2" />
                    Shop This Look
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Waitlist Section
const WaitlistSection = () => {
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
      const success = await new Promise((resolve) => setTimeout(() => resolve(true), 1500)); // Mock API call

      if (success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '' });
        }, 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success to user
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.phone.trim();

  return (
    <section id="waitlist" className="py-32 bg-gradient-to-br from-[#0e3039] via-[#1a4b56] to-[#0e3039] text-white relative overflow-hidden">
      {/* Animated Background with Lifestyle Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600/10 to-teal-600/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Modern Lifestyle Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGxheWZ1bC1wYXR0ZXJuIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjMiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMiIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iNzAiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMiIvPjxwYXRoIGQ9Ik0yMCwyMCBMMjUsNTAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMTUiLz48cGF0aCBkPSJNNTUsNTUgTDYwLDI1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjE1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BsYXlmdWwtcGF0dGVybikiIC8+PC9zdmc+')]"></div>
      </div>

      {/* Decorative Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-lg blur-xl rotate-45"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1], rotate: [45, 60, 45] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-xl"
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-8 bg-white/10 text-white border-white/20 backdrop-blur-sm px-6 py-3 text-base">
            ✨ Early Access Available
          </Badge>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-teal-200 bg-clip-text text-transparent">
            Join Our Customer list
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive customer list and be the first to step into the future of premium footwear.
            <span className="text-teal-300 font-semibold"> Special discounts available.</span>
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.95 : 1 }}
                    className={`px-8 py-4 font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap ${isFormValid && !isLoading
                      ? 'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-500 hover:to-teal-500 text-white'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8 text-center"
              >
                <div className="text-green-400 text-3xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold mb-3">Welcome to the FARIO Family!</h3>
                <p className="text-gray-200 text-lg mb-4">You're now on our exclusive waitlist.</p>
                <div className="bg-green-400/20 border border-green-400/30 rounded-xl p-4">
                  <p className="text-green-300 font-medium">
                    🎉 You'll be the first to know when we launch with special early bird discounts!
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { number: '100+', label: 'Insitutional Investors' },
              { number: '25000+', label: 'Students Using FARIO' },
              { number: '4.9⭐', label: 'Comfortable Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '👑', label: 'Premium Quality' },
              { icon: '🌱', label: 'Eco-Friendly' },
              { icon: '🚀', label: 'Innovative Design' },
              { icon: '💝', label: 'School Edition' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="text-sm font-medium text-gray-200">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Mission & Vision Section
const MissionVisionSection = () => {
  return (
    <section className="py-24 bg-[#1a4b56] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText>
            <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-6 py-3 text-sm font-semibold">
              Our Purpose
            </Badge>
          </AnimatedText>

          <AnimatedText>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Mission
              </span>
              <span className="text-white"> & </span>
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
          </AnimatedText>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(34, 211, 238, 0.4)",
                        "0 0 0 10px rgba(34, 211, 238, 0)",
                        "0 0 0 0 rgba(34, 211, 238, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <TrendingUp className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Our Mission
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-lg lg:text-xl text-white leading-relaxed font-medium">
                    To create trend-driven, high-quality footwear that blends style with affordability.
                  </p>

                  <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                    Fario is committed to designing shoes that fit real lives - versatile, dependable, and always in tune with what our customers need today and tomorrow.
                  </p>
                </div>

                {/* Mission highlights */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { icon: '🎯', label: 'Trend-Driven' },
                    { icon: '💎', label: 'High-Quality' },
                    { icon: '💰', label: 'Affordable' },
                    { icon: '🔄', label: 'Versatile' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-cyan-400/20 rounded-xl p-3 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(20, 184, 166, 0.4)",
                        "0 0 0 10px rgba(20, 184, 166, 0)",
                        "0 0 0 0 rgba(20, 184, 166, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Our Vision
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-lg lg:text-xl text-white leading-relaxed font-medium">
                    To become India's go-to affordable fashion footwear brand for the next generation - always relevant, always in step.
                  </p>

                  <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                    We aspire to make stylish, quality footwear accessible to all, redefining everyday fashion with designs that reflect confidence, comfort, and culture.
                  </p>
                </div>

                {/* Vision highlights */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { icon: '🇮🇳', label: 'India First' },
                    { icon: '👥', label: 'Next Gen' },
                    { icon: '✨', label: 'Always Relevant' },
                    { icon: '🌟', label: 'Accessible' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-teal-400/20 rounded-xl p-3 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom highlight section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIgLz48L3N2Zz4=')] opacity-20"></div>

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-4xl font-bold mb-4">
                Boldness. Cushion. Craft.
              </h3>
              <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto">
                Every step with FARIO is a step towards a more stylish, confident, and culturally connected you.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
interface FooterProps {
  onOpenLegalPage: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegalPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const quickLinks = [
    { name: 'Collections', href: '#collections' },
    { name: 'About', href: '#about' },
    { name: 'Sustainability', href: '#' },
    { name: 'Size Guide', href: '#' }
  ];

  const support = [
    { name: 'Contact Us', href: '#contact-details' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#', tab: 'privacy' },
    { name: 'Terms of Service', href: '#', tab: 'terms' },
    { name: 'Cookie Policy', href: '#', tab: 'cookies' },
    { name: 'Accessibility', href: '#', tab: 'accessibility' }
  ];

  return (
    <footer id="contact" className="relative bg-[#0e3039] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjNGZkMWM3IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIgLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <img src={farioLogo} alt="FARIO" className="h-12 w-auto" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                  Where innovation meets tradition. Crafting premium footwear that tells your story with every step.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4 mb-8">
                  {[
                    { Icon: Instagram, href: 'https://www.instagram.com/fario.in/', label: 'Instagram' },
                    { Icon: Facebook, href: '#', label: 'Facebook' },
                    { Icon: Twitter, href: '#', label: 'Twitter' },
                    { Icon: Linkedin, href: '#', label: 'LinkedIn' }
                  ].map(({ Icon, href, label }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Icon className="w-5 h-5 text-gray-300" />
                    </motion.a>
                  ))}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Stay Updated</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Get the latest updates on new collections and exclusive offers.
                  </p>

                  {!subscribed ? (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg hover:from-purple-500 hover:to-teal-500 transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-center py-2 text-green-400">
                      <span className="text-sm">✓ Subscribed successfully!</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7 grid md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-white relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"></div>
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                        whileHover={{ x: 4 }}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            const element = document.getElementById(link.href.substring(1));
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                      >
                        <ChevronDown className="w-4 h-4 mr-2 transform -rotate-90 group-hover:text-cyan-400 transition-colors" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-white relative">
                  Support
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
                </h3>
                <ul className="space-y-3">
                  {support.map((link, index) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                        whileHover={{ x: 4 }}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            const elementId = link.href.substring(1);
                            const element = document.getElementById(elementId);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                      >
                        <ChevronDown className="w-4 h-4 mr-2 transform -rotate-90 group-hover:text-teal-400 transition-colors" />
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-white relative">
                  Legal
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                </h3>
                <ul className="space-y-3">
                  {legal.map((link, index) => (
                    <li key={link.name}>
                      <motion.button
                        onClick={() => onOpenLegalPage(link.tab)}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group text-left w-full"
                        whileHover={{ x: 4 }}
                      >
                        <ChevronDown className="w-4 h-4 mr-2 transform -rotate-90 group-hover:text-orange-400 transition-colors" />
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>

                {/* Awards/Certifications */}
                <div className="mt-8">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span>B-Corp Certified</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Leaf className="w-4 h-4 text-green-400" />
                      <span>Carbon Neutral</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Secure Payments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2026 FARIO. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Made with ❤️ by KREATEUP <a href="http://www.kreateup.in">www.kreateup.in</a></span>
                <span>Instagram<a href="https://www.instagram.com/kreateup.in/">kreateup.in</a></span>
                <span>•</span>
                <span>Version 1.0</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

// Main App Component
import { Product } from './types';

// ... existing code ...

const App = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCollectionsPage, setShowCollectionsPage] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showLegalPages, setShowLegalPages] = useState(false);
  const [legalPageTab, setLegalPageTab] = useState('privacy');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Auto show contact modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContactModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleBackToCollections = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const handleCloseCollections = () => {
    setShowCollectionsPage(false);
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const handleOpenLegalPage = (tab) => {
    setLegalPageTab(tab);
    setShowLegalPages(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation
        onExploreCollection={() => setShowCollectionsPage(true)}
        onShowContact={() => setShowContactModal(true)}
      />
      <HeroSection onExploreCollection={() => setShowCollectionsPage(true)} />
      <BrandStorySection />
      <CollectionSection onExploreCollection={() => setShowCollectionsPage(true)} />
      {/* <PackagingSection /> */}
      {/* <InfographicSection /> */}
      <USPSection />
      {/* <TestimonialsSection /> */}
      <MissionVisionSection />
      <LifestyleGallery />
      <ContactDetails />
      <WaitlistSection />
      <Footer onOpenLegalPage={handleOpenLegalPage} />

      {/* WhatsApp FAB */}
      <WhatsAppFAB />

      {/* Scroll to Top FAB */}
      <ScrollToTopFAB />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      {/* Collections Page */}
      <CollectionsPage
        isOpen={showCollectionsPage}
        onClose={handleCloseCollections}
        onProductSelect={handleProductSelect}
      />

      {/* Product Detail Page */}
      <ProductDetailPage
        product={selectedProduct}
        isOpen={showProductDetail}
        onClose={handleCloseCollections}
        onBack={handleBackToCollections}
      />

      {/* Legal Pages */}
      <LegalPages
        isOpen={showLegalPages}
        onClose={() => setShowLegalPages(false)}
        initialTab={legalPageTab}
      />
    </div>
  );

};

export default App;