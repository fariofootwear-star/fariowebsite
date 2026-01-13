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
  Zap,
  Play
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

import { Product } from '../types';

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

  // Combine gallery images and video into media items
  const mediaItems = React.useMemo(() => {
    let items: { type: 'image' | 'video', url: string, thumbnail?: string }[] = [];

    if (product?.gallery && product.gallery.length > 0) {
      items = product.gallery.map(url => ({ type: 'image', url }));
    } else if (product?.image) {
      items = [{ type: 'image', url: product.image }];
    }

    if (product?.video) {
      // Extract Google Drive ID to generate a thumbnail
      const driveIdMatch = product.video.match(/\/d\/([^/]+)/);
      const videoThumbnail = driveIdMatch
        ? `https://drive.google.com/thumbnail?id=${driveIdMatch[1]}&sz=w400`
        : undefined;

      items.push({
        type: 'video',
        url: product.video,
        thumbnail: videoThumbnail
      });
    }

    return items;
  }, [product]);

  // Image tag needs referrerPolicy for Google Drive images
  const ImageComponent = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
    />
  );

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
                {/* Main Media Display */}
                <motion.div
                  className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square"
                  layoutId={`product-image-${product.id}`}
                >
                  {mediaItems[activeImageIndex]?.type === 'video' ? (
                    <iframe
                      src={mediaItems[activeImageIndex].url}
                      className="w-full h-full border-0"
                      allow="autoplay"
                      title="Product Video"
                    />
                  ) : (
                    <ImageComponent
                      src={mediaItems[activeImageIndex]?.url || product.image || ''}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}

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

                {/* Thumbnail Media */}
                <div className="grid grid-cols-4 gap-3">
                  {mediaItems.map((item, index) => (
                    <motion.button
                      key={index}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors relative ${activeImageIndex === index ? 'border-cyan-500' : 'border-gray-200'
                        }`}
                      onClick={() => setActiveImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.type === 'video' ? (
                        <div className="w-full h-full relative">
                          {item.thumbnail ? (
                            <ImageComponent
                              src={item.thumbnail}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover opacity-60"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-900" />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white fill-current drop-shadow-lg" />
                          </div>
                        </div>
                      ) : (
                        <ImageComponent
                          src={item.url}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {item.type === 'video' && (
                        <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1">
                          <span className="text-[10px] text-white font-bold">VIDEO</span>
                        </div>
                      )}
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
                        className={`w-5 h-5 ${i < Math.floor(product.rating)
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
                        className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all duration-200 ${selectedColor === color
                          ? 'border-cyan-500 ring-4 ring-cyan-200 shadow-lg'
                          : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                          } ${color.toLowerCase() === 'white' ? 'bg-white' :
                            color.toLowerCase() === 'black' ? 'bg-black' :
                              color.toLowerCase() === 'gray' ? 'bg-gray-400' :
                                color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                                  color.toLowerCase() === 'brown' ? 'bg-amber-800' :
                                    color.toLowerCase() === 'tan' ? 'bg-amber-600' :
                                      color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                                        'bg-gray-400'
                          }`}
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <Check className={`w-5 h-5 ${color.toLowerCase() === 'white' ? 'text-gray-800' : 'text-white'
                            }`} />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700">Selected: <span className="text-cyan-600">{selectedColor}</span></p>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                    <button className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline font-medium">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        className={`py-3 px-4 border-2 rounded-xl text-center font-semibold transition-all duration-200 ${selectedSize === size
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700 shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-cyan-300 hover:bg-gray-50'
                          }`}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ scale: 1.05, y: -2 }}
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
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 ${quantity <= 1
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-cyan-500 bg-white text-cyan-600 hover:bg-cyan-50 hover:border-cyan-600 active:bg-cyan-100'
                        }`}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-bold text-gray-900 w-16 text-center bg-gray-50 py-2 px-4 rounded-xl border-2 border-gray-200">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementQuantity}
                      className="w-10 h-10 rounded-xl border-2 border-cyan-500 bg-white text-cyan-600 hover:bg-cyan-50 hover:border-cyan-600 active:bg-cyan-100 transition-all duration-200"
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
                      className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${isAddedToCart
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700'
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

                  <Button variant="outline" className="w-full py-4 text-lg border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white">
                    <Zap className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                      <p className="text-xs text-gray-600">Above ₹499</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <RotateCcw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                      <p className="text-xs text-gray-600">7 days return</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                    <CardContent className="p-4 text-center">
                      <Shield className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Warranty</p>
                      <p className="text-xs text-gray-600">1 year warranty</p>
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
                          className={`w-5 h-5 ${i < Math.floor(product.rating)
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
                                className={`w-4 h-4 ${i < review.rating
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