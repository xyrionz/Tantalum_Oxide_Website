import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface Image {
  url: string;
  title: string;
  description: string;
}

interface ImageCarouselProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Filmstrip Header */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
        <div className="flex space-x-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-4 bg-green-500/30 rounded-sm"></div>
          ))}
        </div>
        <Camera className="w-5 h-5 text-green-400" />
        <div className="flex space-x-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-4 bg-green-500/30 rounded-sm"></div>
          ))}
        </div>
        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
      </div>

      {/* Main Image Display */}
      <div className="relative bg-slate-800/50 border border-green-500/30 rounded-lg overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="w-full h-full object-cover"
          />
          
          {/* Vintage Photo Border */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-lg"></div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-slate-900/80 border border-green-500/50 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-green-400" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-slate-900/80 border border-green-500/50 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-green-400" />
          </button>
        </div>
        
        {/* Image Info */}
        <div className="p-4 bg-slate-900/60">
          <h4 className="text-green-400 font-semibold mb-1">
            {images[currentIndex].title}
          </h4>
          <p className="text-green-200/80 text-sm">
            {images[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-green-400' 
                : 'bg-green-500/30 hover:bg-green-500/50'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;