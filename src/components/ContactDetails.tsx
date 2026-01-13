import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ContactDetails: React.FC = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Head Office",
      details: [
        "FARIO Footwear,",
        "D.No.36, Thaneerpandal Road,",
        "Peelamedu East, Coimbatore South - 641004,",
        "Tamil Nadu - India"
      ],
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+91 97519 13330"
        // "+91 87654 32109",
        // "Toll Free: 1800-FARIO-01"
      ],
      color: "text-teal-400",
      bgColor: "bg-teal-400/20"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "fariofootwear@gmail.com",
        "official@fario.in "
        // "support@fario.in",
        // "business@fario.in"
      ],
      color: "text-blue-400",
      bgColor: "bg-blue-400/20"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Sunday: 9:00 AM - 10:00 PM"
      ],
      color: "text-green-400",
      bgColor: "bg-green-400/20"
    }
  ];



  return (
    <section id="contact-details" className="py-24 bg-[#0e3039] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-cyan-400/20 text-cyan-100 border-cyan-300/30 px-6 py-3 text-sm font-semibold">
              Get In Touch
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Contact
              </span>
              <span className="text-white"> FARIO</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We'd love to hear from you. Reach out to us through any of these channels.
            </p>
          </motion.div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group bg-white/10 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: index === 1 ? [0, 10, 0] : [0, 0, 0] // Phone icon gets special animation
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    >
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-1">
                    {item.details.map((detail, detailIndex) => (
                      <p 
                        key={detailIndex} 
                        className={`text-gray-300 text-sm ${detailIndex === 0 ? 'font-medium' : ''}`}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  
                  {/* Interactive Action */}
                  {index === 1 && (
                    <motion.a
                      href={`tel:${item.details[0].replace(/\s/g, '')}`}
                      className="inline-block mt-4 px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Call Now
                    </motion.a>
                  )}
                  
                  {index === 2 && (
                    <motion.a
                      href={`mailto:${item.details[0]}`}
                      className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Email
                    </motion.a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Contact CTA */}
        <motion.div
          className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Connect?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you find the perfect footwear.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="tel:+919876543210"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
            </motion.a>
            
            <motion.a
              href="https://wa.me/919876543210?text=Hi! I'm interested in FARIO footwear."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactDetails;