import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photo, onClose, onPrevious, onNext }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrevious, onNext]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      <button 
        className="fixed top-4 right-4 z-50 text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <div className="flex w-full max-h-screen p-4 md:p-16 flex-col md:flex-row">
        <div className="w-full md:w-[60%] flex items-center justify-center mb-4 md:mb-0 relative">
          <div className="relative w-full mt-12 md:mt-0" style={{ aspectRatio: '3/2' }}>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              onClick={onPrevious}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              onClick={onNext}
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={photo.fullSrc}
                alt={photo.alt}
                className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  filter: 'contrast(1.05) brightness(0.95) saturate(0.9)',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                onLoad={handleImageLoad}
              />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] md:pl-8 flex flex-col justify-center">
          <h2 className="text-2xl font-light text-gray-800 mb-4">{photo.title}</h2>
          <p className="text-sm font-light leading-relaxed text-gray-600">{photo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;