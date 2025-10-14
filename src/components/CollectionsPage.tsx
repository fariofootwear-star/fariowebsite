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
  X
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
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: "Classic Canvas Sneakers",
      category: "shoes",
      price: 699,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      isNew: true,
      isSale: true,
      colors: ["White", "Black", "Navy"],
      sizes: ["6", "7", "8", "9", "10", "11"],
      description: "Comfortable and stylish canvas sneakers perfect for everyday wear."
    },
    {
      id: 2,
      name: "Premium Cotton Socks",
      category: "socks",
      price: 299,
      image: "https://images.unsplash.com/photo-1608357746078-342b38f738c1?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 89,
      isNew: false,
      colors: ["White", "Black", "Gray", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      description: "Soft, breathable cotton socks with moisture-wicking technology."
    },
    {
      id: 3,
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
      id: 4,
      name: "Running Shoes Pro",
      category: "shoes",
      price: 1299,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 312,
      colors: ["Blue", "Black", "White"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      description: "High-performance running shoes with advanced cushioning technology."
    },
    {
      id: 5,
      name: "Ankle Support Socks",
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
      id: 6,
      name: "Casual Backpack",
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
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'socks', label: 'Socks' }
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
    // First filter out bags category, then apply other filters
    let filtered = products.filter(product => product.category !== 'bags').filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      const matchesBrands = selectedBrands.length === 0 || selectedBrands.some(brand => product.name.toLowerCase().includes(brand.toLowerCase()));
      const matchesColors = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
      const matchesSizes = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
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
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, selectedBrands, selectedColors, selectedSizes, inStock, onSale]);

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

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            onClick={() => onProductSelect(product)}
          />
          
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
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              favorites.has(product.id) 
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
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-white/90 text-gray-900 hover:bg-white"
                onClick={() => onProductSelect(product)}
              >
                Quick View
              </Button>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
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
                  className={`w-4 h-4 rounded-full border border-gray-300 ${
                    color.toLowerCase() === 'white' ? 'bg-white' :
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
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-white text-gray-900"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-white text-gray-900"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* More Filters Button */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
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
                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Max Price: ₹{priceRange}
                        </label>
                        <input
                          type="range"
                          min="100"
                          max="2000"
                          step="50"
                          value={priceRange}
                          onChange={(e) => setPriceRange(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>₹100</span>
                          <span>₹2000</span>
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
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedBrands([...selectedBrands, brand]);
                                  } else {
                                    setSelectedBrands(selectedBrands.filter(b => b !== brand));
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
                                  setSelectedColors(selectedColors.filter(c => c !== color));
                                } else {
                                  setSelectedColors([...selectedColors, color]);
                                }
                              }}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedColors.includes(color) 
                                  ? 'border-purple-500 ring-2 ring-purple-200' 
                                  : 'border-gray-300 hover:border-gray-400'
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
                              title={color}
                            >
                              {selectedColors.includes(color) && (
                                <Check className={`w-4 h-4 ${
                                  color.toLowerCase() === 'white' ? 'text-gray-800' : 'text-white'
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
                                  setSelectedSizes(selectedSizes.filter(s => s !== size));
                                } else {
                                  setSelectedSizes([...selectedSizes, size]);
                                }
                              }}
                              className={`py-2 px-3 text-sm border rounded-lg transition-colors ${
                                selectedSizes.includes(size)
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
                              onChange={(e) => setInStock(e.target.checked)}
                              className="mr-2 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">In Stock Only</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={onSale}
                              onChange={(e) => setOnSale(e.target.checked)}
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
                          setPriceRange(2000);
                          setSelectedBrands([]);
                          setSelectedColors([]);
                          setSelectedSizes([]);
                          setInStock(false);
                          setOnSale(false);
                        }}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
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
              className={`grid gap-6 ${
                viewMode === 'grid' 
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