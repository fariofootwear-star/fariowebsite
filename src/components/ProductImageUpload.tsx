import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ProductImageUploadProps {
  currentImage?: string;
  onImageChange?: (image: string | File) => void;
  className?: string;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  currentImage,
  onImageChange,
  className = ''
}) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (onImageChange) {
          onImageChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (onImageChange) {
          onImageChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageChange) {
      onImageChange('');
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="product-image-upload"
      />

      {preview ? (
        <Card className="relative overflow-hidden group">
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-64 object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="flex gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <Upload className="w-4 h-4 mr-2" />
                Change
              </Button>
              <Button
                onClick={handleRemove}
                variant="destructive"
                className="bg-red-500 text-white hover:bg-red-600"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </motion.div>
        </Card>
      ) : (
        <motion.div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-gray-300 hover:border-cyan-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragging ? 'bg-cyan-100' : 'bg-gray-100'
            }`}>
              {isDragging ? (
                <Upload className="w-8 h-8 text-cyan-600" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Upload Product Image
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            <Button
              type="button"
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-cyan-900 mb-2">📝 Image Guidelines</h4>
        <ul className="text-xs text-cyan-800 space-y-1">
          <li>• Use high-quality images (minimum 800x800px)</li>
          <li>• Square aspect ratio works best</li>
          <li>• Clean background for better product visibility</li>
          <li>• File size should be under 5MB</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductImageUpload;
