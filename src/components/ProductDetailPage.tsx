import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  RotateCcw, 
  Shield, 
  Plus, 
  Minus,
  Check,
  Share2,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface Product {
  id: number;
  name: string;
  category: 'shoes' | 'socks' | 'bags';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  colors: string[];
  sizes: string[];
  description: string;
}

interface ProductDetailPageProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  isOpen,
  onClose,
  onBack
}) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Mock additional images
  const additionalImages = [
    product?.image,
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
  ].filter(Boolean);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!product) return null;

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

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
                    onClick={onBack}
                    className="p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>
                    <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? 'text-red-500' : ''}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <motion.div 
                  className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square"
                  layoutId={`product-image-${product.id}`}
                >
                  <img
                    src={additionalImages[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white">New</Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-red-500 text-white">
                        {discount}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Quick Features */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">Free Delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RotateCcw className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">Easy Returns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-3">
                  {additionalImages.map((image, index) => (
                    <motion.button
                      key={index}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImageIndex === index ? 'border-purple-500' : 'border-gray-200'
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-lg font-medium text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                    {discount > 0 && (
                      <Badge className="bg-red-100 text-red-800">Save {discount}%</Badge>
                    )}
                  </div>
                  <p className="text-gray-600">Inclusive of all taxes</p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">About this product</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Color Selection */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedColor === color 
                            ? 'border-purple-500 ring-2 ring-purple-200' 
                            : 'border-gray-300'
                        } ${
                          color.toLowerCase() === 'white' ? 'bg-white' :
                          color.toLowerCase() === 'black' ? 'bg-black' :
                          color.toLowerCase() === 'gray' ? 'bg-gray-400' :
                          color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                          color.toLowerCase() === 'brown' ? 'bg-amber-800' :
                          color.toLowerCase() === 'tan' ? 'bg-amber-600' :
                          color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`}
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <Check className={`w-4 h-4 ${
                            color.toLowerCase() === 'white' ? 'text-gray-800' : 'text-white'
                          }`} />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Selected: {selectedColor}</p>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                    <button className="text-sm text-purple-600 hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        className={`py-2 px-4 border rounded-lg text-center transition-colors ${
                          selectedSize === size
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleAddToCart}
                      disabled={!selectedColor || !selectedSize}
                      className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${
                        isAddedToCart
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700'
                      }`}
                    >
                      {isAddedToCart ? (
                        <div className="flex items-center justify-center">
                          <Check className="w-5 h-5 mr-2" />
                          Added to Cart!
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart - ₹{product.price * quantity}
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  <Button variant="outline" className="w-full py-4 text-lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                      <p className="text-xs text-gray-500">Above ₹499</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <RotateCcw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                      <p className="text-xs text-gray-500">7 days return</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Warranty</p>
                      <p className="text-xs text-gray-500">1 year warranty</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium text-gray-900">Premium Quality</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Care:</span>
                      <span className="font-medium text-gray-900">Easy Maintenance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span className="font-medium text-gray-900">Made in India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16 border-t border-gray-200 pt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h3>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Based on {product.reviews} reviews</p>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  {/* Sample Reviews */}
                  {[
                    {
                      name: "Raj Kumar",
                      rating: 5,
                      comment: "Excellent quality and very comfortable. Highly recommended!",
                      date: "2 days ago"
                    },
                    {
                      name: "Priya Sharma",
                      rating: 4,
                      comment: "Good product, fast delivery. Worth the price.",
                      date: "1 week ago"
                    }
                  ].map((review, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.name}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailPage;