/**
 * CollectionsPage Component
 * 
 * PRODUCT IMAGE UPLOAD FEATURE:
 * To enable manual product image uploads instead of Unsplash URLs:
 * 1. Import ProductImageUpload component: import ProductImageUpload from './ProductImageUpload';
 * 2. Replace the static 'image' URLs in the products array with uploaded image paths
 * 3. Use ProductImageUpload component in an admin panel or product management interface
 * 4. Store uploaded images in your backend/CDN and reference them in the products data
 * 
 * For production deployment:
 * - Set up image storage (AWS S3, Cloudinary, or similar)
 * - Create admin interface with ProductImageUpload component
 * - Update product data to use uploaded image URLs
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  ChevronDown,
  X,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

import { Product } from '../types';

interface CollectionsPageProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({
  isOpen,
  onClose,
  onProductSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const images = {
    velcro_front: "https://lh3.googleusercontent.com/d/1LQ-CwxI7sg5tY4CQuqeEnUcpvFS9-Tec",
    velcro_side: "https://lh3.googleusercontent.com/d/1bpG2MXhsu3mT3fbZ1CNPmNX2vTP9mIbl",
    velcro_back: "https://lh3.googleusercontent.com/d/1CZ1pT2T6sy2QCfrE0VnsWj-I3oFAymAb",
    velcro_box: "https://lh3.googleusercontent.com/d/151FEmF8HxvSbNn3qxY7k5_pLUmKj5WWg",
    velcro_mockup1: "https://lh3.googleusercontent.com/d/1nZ7gULOoCRFXoKiZCvszNM-13-8WL48p",
    velcro_mockup2: "https://lh3.googleusercontent.com/d/1RwpNq3Qn912nD2k7sKuRN_VRllPTr0DX",
    velcro_tag_mockup1:"https://lh3.googleusercontent.com/d/1DssonQYpkjLBmrV88JyA_TEUAK7aQjZz",
    laces_front: "https://lh3.googleusercontent.com/d/1n1HSbw1WJwwIKDNa5eB3rEJm6g1km1v2",
    laces_side: "https://lh3.googleusercontent.com/d/1rNQ-9y8gYT9HKlGwdbu2H98CqmMWO2LJ",
    laces_back: "https://lh3.googleusercontent.com/d/1FS_L2gPg4mUm9u0bfBVn-ogmL_Cp4pl4",
    laces_box: "https://lh3.googleusercontent.com/d/1LuQCGYJ6V9-KRu8Yi6OVadZq_nYZrxyZ",
    laces_mockup1: "https://lh3.googleusercontent.com/d/1qQoqTIQqmTPi5uK_Gz6BEEeUwfxlwuHe",
    laces_mockup2: "https://lh3.googleusercontent.com/d/1d1tGt7NGjosihmea9WEZiF5GeLL0XsDx",
    silicon_tag: "https://lh3.googleusercontent.com/d/1y20o0TzV9A9QH6jMIcQCB2qv_BSjU1IK"
  };
  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: "FARIO Velcro School Shoe S",
      category: "shoes",
      price: 999,
      originalPrice: 1299,
      image: images.velcro_front,          // main image
      gallery: [                            // product gallery
        images.velcro_front,
        images.velcro_side,
        images.velcro_back,
        images.velcro_box,
        images.silicon_tag,
        images.velcro_mockup1,
        images.velcro_mockup2,
        images.velcro_tag_mockup1
      ],
      video: "https://drive.google.com/file/d/1LQ-CwxI7sg5tY4CQuqeEnUcpvFS9-Tec/preview",
      rating: 4.5,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["Black"],
      sizes: ["UK S8", "UK S9", "UK S10", "UK S11", "UK S12", "UK S13"],
      description: "FARIO velcro school shoes are designed for everyday school wear, offering comfort, durability, and a neat appearance. These shoes feature an easy velcro closure that allows kids to wear and remove them quickly. The cushioned insole provides all-day comfort, while the anti-skid sole ensures better grip and stability during walking and play. Made with a breathable mesh upper, these school shoes help keep feet fresh throughout long school hours. Ideal for daily use, FARIO school shoes combine practicality with long-lasting performance."
    },
    {
      id: 2,
      name: "FARIO Velcro School Shoe M",
      category: "shoes",
      price: 1049,
      originalPrice: 1399,
      image: images.velcro_front,          // main image
      gallery: [                            // product gallery
        images.velcro_front,
        images.velcro_side,
        images.velcro_back,
        images.velcro_box,
        images.silicon_tag,
        images.velcro_mockup1,
        images.velcro_mockup2,
        images.velcro_tag_mockup1
      ],
      video: "https://drive.google.com/file/d/1LQ-CwxI7sg5tY4CQuqeEnUcpvFS9-Tec/preview", rating: 4.5,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["Black"],
      sizes: ["UK2", "UK3", "UK4", "UK5"],
      description: "FARIO velcro school shoes are designed for everyday school wear, offering comfort, durability, and a neat appearance. These shoes feature an easy velcro closure that allows kids to wear and remove them quickly. The cushioned insole provides all-day comfort, while the anti-skid sole ensures better grip and stability during walking and play. Made with a breathable mesh upper, these school shoes help keep feet fresh throughout long school hours. Ideal for daily use, FARIO school shoes combine practicality with long-lasting performance."
    },
    {
      id: 3,
      name: "FARIO Velcro School Shoe L",
      category: "shoes",
      price: 1099,
      originalPrice: 1499,
      image: images.velcro_front,          // main image
      gallery: [                            // product gallery
        images.velcro_front,
        images.velcro_side,
        images.velcro_back,
        images.velcro_box,
        images.silicon_tag,
        images.velcro_mockup1,
        images.velcro_mockup2,
        images.velcro_tag_mockup1
      ],
      video: "https://drive.google.com/file/d/1LQ-CwxI7sg5tY4CQuqeEnUcpvFS9-Tec/preview", rating: 4.5,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["Black"],
      sizes: ["UK6", "UK7", "UK8", "UK9", "UK10", "UK11", "UK12"],
      description: "FARIO velcro school shoes are designed for everyday school wear, offering comfort, durability, and a neat appearance. These shoes feature an easy velcro closure that allows kids to wear and remove them quickly. The cushioned insole provides all-day comfort, while the anti-skid sole ensures better grip and stability during walking and play. Made with a breathable mesh upper, these school shoes help keep feet fresh throughout long school hours. Ideal for daily use, FARIO school shoes combine practicality with long-lasting performance."
    },

    {
      id: 4,
      name: "Premium Cotton Socks",
      category: "socks",
      price: 299,
      image: images.velcro_front,          // main image
      gallery: [                            // product gallery
        images.velcro_front,
        images.velcro_side,
        images.velcro_back,
        images.velcro_box,
        images.silicon_tag
      ],
      video: "https://drive.google.com/file/d/1LQ-CwxI7sg5tY4CQuqeEnUcpvFS9-Tec/preview", rating: 4.6,
      reviews: 89,
      isNew: false,
      colors: ["White", "Black", "Gray", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      description: "Soft, breathable cotton socks with moisture-wicking technology."
    },
    {
      id: 5,
      name: "Leather Messenger Bag",
      category: "bags",
      price: 1499,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 156,
      colors: ["Brown", "Black", "Tan"],
      sizes: ["One Size"],
      description: "Handcrafted leather messenger bag with multiple compartments."
    },
    {
      id: 7,
      name: "Support Socks Ankle High",
      category: "socks",
      price: 399,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 67,
      isNew: true,
      colors: ["White", "Black", "Gray"],
      sizes: ["S", "M", "L"],
      description: "Athletic socks with enhanced ankle support for sports activities."
    },
    {
      id: 8,
      name: "School Bag",
      category: "bags",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 203,
      isSale: true,
      colors: ["Gray", "Black", "Navy"],
      sizes: ["One Size"],
      description: "Versatile backpack perfect for work, travel, or everyday use."
    },
    {
      id: 9,
      name: "Performance Running Socks",
      category: "socks",
      price: 349,
      image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 145,
      isNew: true,
      colors: ["Black", "White", "Blue", "Red"],
      sizes: ["S", "M", "L", "XL"],
      description: "High-performance running socks with arch support and cushioning."
    },
    {
      id: 10,
      name: "Merino Wool Dress Socks",
      category: "socks",
      price: 499,
      originalPrice: 699,
      image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 98,
      isSale: true,
      colors: ["Navy", "Black", "Gray", "Brown"],
      sizes: ["M", "L", "XL"],
      description: "Premium merino wool dress socks for all-day comfort and style."
    },
    {
      id: 11,
      name: "FARIO Lace School Shoe S",
      category: "shoes",
      price: 999,
      originalPrice: 1299,
      image: images.laces_front,          // main image
      gallery: [                            // product gallery
        images.laces_front,
        images.laces_side,
        images.laces_back,
        images.laces_box,
        images.silicon_tag,
        images.laces_mockup1,
        images.laces_mockup2
      ],
      rating: 4.5,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["Black"],
      sizes: ["UK S8", "UK S9", "UK S10", "UK S11", "UK S12", "UK S13"],
      description: "FARIO lace-up school shoes are designed for everyday school use, combining comfort, durability, and a smart appearance. The classic lace-up closure ensures a secure and adjustable fit, making these shoes ideal for active school days. A soft cushioned insole provides all-day comfort, while the anti-skid sole offers stability and better grip on different surfaces. Crafted with a breathable mesh upper, these school shoes help keep feet fresh during long hours of wear. Perfect for daily school activities, FARIO lace shoes deliver reliable performance with a neat and polished look."
    },
    {
      id: 12,
      name: "FARIO Lace School Shoe M",
      category: "shoes",
      price: 1049,
      originalPrice: 1399,
      image: images.laces_front,          // main image
      gallery: [                            // product gallery
        images.laces_front,
        images.laces_side,
        images.laces_back,
        images.laces_box,
        images.silicon_tag,
        images.laces_mockup1,
        images.laces_mockup2
      ],
      rating: 4.5,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["Black"],
      sizes: ["UK2", "UK3", "UK4", "UK5"],
      description: "FARIO lace-up school shoes are designed for everyday school wear, offering comfort, durability, and a neat appearance. These shoes feature an easy velcro closure that allows kids to wear and remove them quickly. The cushioned insole provides all-day comfort, while the anti-skid sole ensures better grip and stability during walking and play. Made with a breathable mesh upper, these school shoes help keep feet fresh throughout long school hours. Ideal for daily use, FARIO school shoes combine practicality with long-lasting performance."
    },
    {
      id: 13,
      name: "FARIO Lace School Shoe L",
      category: "shoes",
      price: 1099,
      originalPrice: 1499,
      image: images.laces_front,          // main image
      gallery: [                            // product gallery
        images.laces_front,
        images.laces_side,
        images.laces_back,
        images.laces_box,
        images.silicon_tag,
        images.laces_mockup1,
        images.laces_mockup2
      ],
      rating: 4.5,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["Black"],
      sizes: ["UK6", "UK7", "UK8", "UK9", "UK10", "UK11", "UK12"],
      description: "FARIO lace-up school shoes are designed for everyday school wear, offering comfort, durability, and a neat appearance. These shoes feature an easy velcro closure that allows kids to wear and remove them quickly. The cushioned insole provides all-day comfort, while the anti-skid sole ensures better grip and stability during walking and play. Made with a breathable mesh upper, these school shoes help keep feet fresh throughout long school hours. Ideal for daily use, FARIO school shoes combine practicality with long-lasting performance."
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'socks', label: 'Socks' },
    { value: 'bags', label: 'Bags' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Available filter options
  const availableBrands = ['FARIO', 'Premium', 'Classic', 'Sport'];
  const availableColors = ['White', 'Black', 'Gray', 'Navy', 'Brown', 'Tan', 'Blue'];
  const availableSizes = ['6', '7', '8', '9', '10', '11', '12', 'S', 'M', 'L', 'XL', 'One Size'];

  const filteredAndSortedProducts = useMemo(() => {
    // Apply all filters
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesBrands = selectedBrands.length === 0 || selectedBrands.some((brand: string) => product.name.toLowerCase().includes(brand.toLowerCase()));
      const matchesColors = selectedColors.length === 0 || selectedColors.some((color: string) => product.colors.includes(color));
      const matchesSizes = selectedSizes.length === 0 || selectedSizes.some((size: string) => product.sizes.includes(size));
      const matchesStock = !inStock || true; // Assume all products are in stock for demo
      const matchesSale = !onSale || product.isSale;

      return matchesSearch && matchesCategory && matchesPrice && matchesBrands && matchesColors && matchesSizes && matchesStock && matchesSale;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, minPrice, maxPrice, selectedBrands, selectedColors, selectedSizes, inStock, onSale]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Filter out duplicate identical image URLs if any
    const galleryImages = useMemo(() => {
      if (!product.gallery || product.gallery.length === 0) return [product.image];
      // Ensure main image is first
      const allImages = [product.image, ...product.gallery.filter(img => img !== product.image)];
      return [...new Set(allImages)]; // remove duplicates
    }, [product]);

    // Handle hover cycle
    React.useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isHovered && galleryImages.length > 1) {
        interval = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
        }, 1500); // Change image every 1.5 seconds on hover
      } else {
        setCurrentImageIndex(0);
      }
      return () => clearInterval(interval);
    }, [isHovered, galleryImages.length]);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onProductSelect(product)}
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative overflow-hidden">
            <motion.img
              key={galleryImages[currentImageIndex]}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[currentImageIndex]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Image Dots Indicator if multiple images */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                {galleryImages.map((_, idx) => (
                  <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === currentImageIndex ? 'bg-cyan-600' : 'bg-gray-300/80'}`} />
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-500 text-white text-xs">New</Badge>
              )}
              {product.isSale && (
                <Badge className="bg-red-500 text-white text-xs">Sale</Badge>
              )}
            </div>

            {/* Favorite Button */}
            <motion.button
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${favorites.has(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
            >
              <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onProductSelect(product);
                  }}
                >
                  Quick View
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-600">({product.reviews})</span>
              </div>
              <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">
                {product.category}
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-600 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border border-gray-300 ${color.toLowerCase() === 'white' ? 'bg-white' :
                      color.toLowerCase() === 'black' ? 'bg-black' :
                        color.toLowerCase() === 'gray' ? 'bg-gray-400' :
                          color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                            color.toLowerCase() === 'brown' ? 'bg-amber-800' :
                              color.toLowerCase() === 'tan' ? 'bg-amber-600' :
                                color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                                  'bg-gray-400'
                      }`}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <div className="text-xs text-gray-700 font-medium">+{product.colors.length - 3}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
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
                    className="p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h1 className="text-xl font-bold text-gray-900">Collections</h1>
                  <Badge variant="secondary">
                    {filteredAndSortedProducts.length} products
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 ${viewMode === 'grid'
                      ? 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 hover:text-white shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900'
                      }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 ${viewMode === 'list'
                      ? 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 hover:text-white shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-900 font-medium hover:border-gray-400 transition-all cursor-pointer shadow-sm"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value} className="py-2">
                      {category.label}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900 font-medium hover:border-gray-400 transition-all cursor-pointer shadow-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="py-2">
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* More Filters Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 border-2 rounded-xl px-5 py-3 font-medium transition-all duration-200 shadow-sm ${showFilters
                    ? 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 shadow-md'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700'
                    }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {/* Extended Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Price Range - Input Boxes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Price Range
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Minimum Price Input */}
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                              <input
                                type="number"
                                min="0"
                                max={maxPrice}
                                step="50"
                                value={minPrice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const value = Math.max(0, Number(e.target.value));
                                  setMinPrice(value <= maxPrice ? value : maxPrice);
                                }}
                                className="w-full pl-7 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-900 font-medium transition-all"
                                placeholder="0"
                              />
                            </div>
                          </div>

                          {/* Maximum Price Input */}
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                              <input
                                type="number"
                                min={minPrice}
                                step="50"
                                value={maxPrice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const value = Number(e.target.value);
                                  setMaxPrice(value >= minPrice ? value : minPrice);
                                }}
                                className="w-full pl-7 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900 font-medium transition-all"
                                placeholder="5000"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 text-center">
                          Showing: ₹{minPrice} - ₹{maxPrice}
                        </div>
                      </div>

                      {/* Brand Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Brand
                        </label>
                        <div className="space-y-2">
                          {availableBrands.map((brand) => (
                            <label key={brand} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  if (e.target.checked) {
                                    setSelectedBrands([...selectedBrands, brand]);
                                  } else {
                                    setSelectedBrands(selectedBrands.filter((b: string) => b !== brand));
                                  }
                                }}
                                className="mr-2 text-purple-600 focus:ring-purple-500"
                              />
                              <span className="text-sm text-gray-700">{brand}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Color Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Color
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {availableColors.map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                if (selectedColors.includes(color)) {
                                  setSelectedColors(selectedColors.filter((c: string) => c !== color));
                                } else {
                                  setSelectedColors([...selectedColors, color]);
                                }
                              }}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedColors.includes(color)
                                ? 'border-purple-500 ring-2 ring-purple-200'
                                : 'border-gray-300 hover:border-gray-400'
                                } ${color.toLowerCase() === 'white' ? 'bg-white' :
                                  color.toLowerCase() === 'black' ? 'bg-black' :
                                    color.toLowerCase() === 'gray' ? 'bg-gray-400' :
                                      color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                                        color.toLowerCase() === 'brown' ? 'bg-amber-800' :
                                          color.toLowerCase() === 'tan' ? 'bg-amber-600' :
                                            color.toLowerCase() === 'blue' ? 'bg-blue-500' :
                                              'bg-gray-400'
                                }`}
                              title={color}
                            >
                              {selectedColors.includes(color) && (
                                <Check className={`w-4 h-4 ${color.toLowerCase() === 'white' ? 'text-gray-800' : 'text-white'
                                  }`} />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Size Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Size
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {availableSizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                if (selectedSizes.includes(size)) {
                                  setSelectedSizes(selectedSizes.filter((s: string) => s !== size));
                                } else {
                                  setSelectedSizes([...selectedSizes, size]);
                                }
                              }}
                              className={`py-2 px-3 text-sm border rounded-lg transition-colors ${selectedSizes.includes(size)
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Stock & Sale Filters */}
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Availability
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={inStock}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInStock(e.target.checked)}
                              className="mr-2 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">In Stock Only</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={onSale}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnSale(e.target.checked)}
                              className="mr-2 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">On Sale</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setMinPrice(0);
                          setMaxPrice(5000);
                          setSelectedBrands([]);
                          setSelectedColors([]);
                          setSelectedSizes([]);
                          setInStock(false);
                          setOnSale(false);
                        }}
                        className="text-sm text-cyan-600 hover:text-cyan-700 font-medium hover:underline transition-all"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Grid */}
            <motion.div
              className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
                }`}
              layout
            >
              <AnimatePresence>
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No results */}
            {filteredAndSortedProducts.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollectionsPage;