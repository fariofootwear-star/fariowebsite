import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Shield, 
  FileText, 
  Cookie, 
  Eye,
  Check,
  AlertCircle,
  Lock,
  Users,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface LegalPagesProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'cookies' | 'accessibility';
}

const LegalPages: React.FC<LegalPagesProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { 
      id: 'privacy', 
      label: 'Privacy Policy', 
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      id: 'terms', 
      label: 'Terms of Service', 
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      id: 'cookies', 
      label: 'Cookie Policy', 
      icon: Cookie,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    { 
      id: 'accessibility', 
      label: 'Accessibility', 
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  const PrivacyPolicy = () => (
    <div className="space-y-8">
      <div className="text-center">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At FARIO, we respect your privacy and are committed to protecting your personal data.
        </p>
        <Badge className="mt-4 bg-blue-100 text-blue-800">Last updated: January 2025</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Information We Collect
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Name and contact information</li>
                    <li>• Email address and phone number</li>
                    <li>• Shipping and billing addresses</li>
                    <li>• Payment information (processed securely)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Usage Information</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Website browsing behavior</li>
                    <li>• Product preferences and purchases</li>
                    <li>• Device and browser information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                How We Use Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Process and fulfill orders',
                  'Provide customer support',
                  'Send order updates',
                  'Improve our products',
                  'Personalize your experience',
                  'Marketing (with consent)'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Data Protection</h3>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Your Rights</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Delete your data</li>
                  <li>• Data portability</li>
                  <li>• Withdraw consent</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Privacy Questions?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Contact our privacy team for any questions about your data.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                privacy@fario.in
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Quick Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">We only collect necessary information</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">Your data is encrypted and secure</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">We never sell your information</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                  <span className="text-gray-600">You control your data</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const TermsOfService = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FileText className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these terms carefully before using our services.
        </p>
        <Badge className="mt-4 bg-purple-100 text-purple-800">Last updated: January 2025</Badge>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">1. Acceptance of Terms</h3>
            <p className="text-gray-600 mb-4">
              By accessing and using FARIO's website and services, you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-800 text-sm">
                <strong>Important:</strong> If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">2. Product Information & Availability</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Product Descriptions</h4>
                <p className="text-gray-600">
                  We strive to ensure all product information is accurate. However, we do not warrant 
                  that product descriptions are error-free, complete, or current.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
                <p className="text-gray-600">
                  All products are subject to availability. We reserve the right to discontinue any 
                  product at any time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">3. Orders & Payment</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Orders are processed within 24-48 hours</li>
                  <li>• We reserve the right to refuse orders</li>
                  <li>• Confirmation email will be sent</li>
                  <li>• Changes must be made within 2 hours</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Payment required at time of order</li>
                  <li>• Secure payment processing</li>
                  <li>• Multiple payment methods accepted</li>
                  <li>• Prices include applicable taxes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">4. Returns & Exchanges</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-900 mb-2">30-Day Return Policy</h4>
              <p className="text-green-800 text-sm">
                Return unused items in original condition within 30 days for a full refund.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Eligible Returns</h5>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Unused products</li>
                  <li>• Original packaging</li>
                  <li>• Within 30 days</li>
                  <li>• With receipt/order number</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Non-Returnable</h5>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Worn or damaged items</li>
                  <li>• Items without tags</li>
                  <li>• Sale items (final sale)</li>
                  <li>• Custom/personalized items</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">5. Limitation of Liability</h3>
            <p className="text-gray-600 mb-4">
              FARIO shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from your use of our products or services.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 text-sm">
                <strong>Maximum Liability:</strong> Our total liability is limited to the amount 
                you paid for the specific product or service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CookiePolicy = () => (
    <div className="space-y-8">
      <div className="text-center">
        <Cookie className="w-16 h-16 text-orange-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about how we use cookies to improve your browsing experience.
        </p>
        <Badge className="mt-4 bg-orange-100 text-orange-800">Last updated: January 2025</Badge>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">What Are Cookies?</h3>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              analyzing how you use our site.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 text-sm">
                <strong>Note:</strong> Cookies do not contain any personal information that can identify you directly.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Types of Cookies We Use</h3>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Essential Cookies
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  These cookies are necessary for the website to function properly.
                </p>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>• Shopping cart functionality</li>
                  <li>• User authentication</li>
                  <li>• Security features</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Functional Cookies
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  These cookies enhance functionality and personalization.
                </p>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>• Language preferences</li>
                  <li>• Remember login details</li>
                  <li>• Customized content</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  Analytics Cookies
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>• Page views and traffic</li>
                  <li>• User behavior analysis</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  Marketing Cookies
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  These cookies are used to track visitors and display relevant ads.
                </p>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>• Targeted advertising</li>
                  <li>• Social media integration</li>
                  <li>• Retargeting campaigns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Managing Your Cookie Preferences</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                You can control and manage cookies in various ways:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Browser Settings</h4>
                  <p className="text-gray-600 text-sm">
                    Most browsers allow you to control cookies through their settings preferences.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Banner</h4>
                  <p className="text-gray-600 text-sm">
                    Use our cookie consent banner to customize your preferences.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AccessibilityStatement = () => (
    <div className="space-y-8">
      <div className="text-center">
        <Eye className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Statement</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're committed to ensuring our website is accessible to everyone, including people with disabilities.
        </p>
        <Badge className="mt-4 bg-green-100 text-green-800">WCAG 2.1 AA Compliant</Badge>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
            <p className="text-gray-600 mb-4">
              FARIO is dedicated to providing an inclusive online experience for all users. We believe 
              that everyone should have equal access to information and functionality.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: '🎯', title: 'Clear Navigation', desc: 'Intuitive and consistent navigation throughout the site' },
                { icon: '📱', title: 'Mobile Friendly', desc: 'Fully responsive design that works on all devices' },
                { icon: '🎨', title: 'High Contrast', desc: 'Sufficient color contrast for better readability' }
              ].map((feature, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-green-900 mb-1">{feature.title}</h4>
                  <p className="text-green-800 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Accessibility Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Keyboard Navigation</h4>
                <ul className="space-y-2">
                  {[
                    'Tab through all interactive elements',
                    'Skip navigation links available',
                    'Visible focus indicators',
                    'Logical tab order maintained'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Screen Reader Support</h4>
                <ul className="space-y-2">
                  {[
                    'Descriptive alt text for images',
                    'Proper heading structure',
                    'ARIA labels and landmarks',
                    'Form labels and instructions'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Known Issues & Workarounds</h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Currently Working On
                </h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Enhanced voice navigation support</li>
                  <li>• Additional keyboard shortcuts</li>
                  <li>• Improved zoom functionality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Feedback & Support</h3>
            <p className="text-gray-600 mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter any 
              accessibility barriers, please let us know.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <Mail className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                <p className="text-gray-600 text-sm mb-2">accessibility@fario.in</p>
                <p className="text-gray-500 text-xs">Response within 2 business days</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Phone className="w-6 h-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                <p className="text-gray-600 text-sm mb-2">+91 98765 43210</p>
                <p className="text-gray-500 text-xs">Monday-Friday 9AM-6PM IST</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfService />;
      case 'cookies': return <CookiePolicy />;
      case 'accessibility': return <AccessibilityStatement />;
      default: return <PrivacyPolicy />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onClose}
                    className="p-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h1 className="text-xl font-bold text-gray-900">Legal & Policies</h1>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 overflow-x-auto pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? `${tab.bgColor} ${tab.color} shadow-sm`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalPages;