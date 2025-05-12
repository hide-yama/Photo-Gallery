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
  const [isZoomed, setIsZoomed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  
  useEffect(() => {
    setVisible(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePreviousWithFade();
      } else if (e.key === 'ArrowRight') {
        handleNextWithFade();
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

  const handleImageClick = () => {
    setIsZoomed(z => !z);
  };

  const handlePreviousWithFade = () => {
    setIsFading(true);
    setTimeout(() => {
      onPrevious();
      setIsLoaded(false);
      setTimeout(() => setIsFading(false), 20);
    }, 300);
  };

  const handleNextWithFade = () => {
    setIsFading(true);
    setTimeout(() => {
      onNext();
      setIsLoaded(false);
      setTimeout(() => setIsFading(false), 20);
    }, 300);
  };

  const handleCloseWithFade = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div className={`fixed inset-0 bg-white z-50 flex transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <button 
        className="fixed top-4 right-4 z-50 text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
        onClick={handleCloseWithFade}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>
      {!isZoomed && (
        <>
          <button
            className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-50 text-gray-500 p-3 rounded-full transition-colors duration-300"
            onClick={handlePreviousWithFade}
            aria-label="Previous photo (PC)"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-50 text-gray-500 p-3 rounded-full transition-colors duration-300"
            onClick={handleNextWithFade}
            aria-label="Next photo (PC)"
          >
            <ChevronRight size={40} />
          </button>
        </>
      )}
      <div className={`flex w-full max-h-screen p-4 md:p-16 flex-col md:flex-row ${isZoomed ? 'items-center justify-center' : ''}`}>
        <div className={`w-full ${!isZoomed ? 'md:w-[60%] flex items-center justify-center mb-4 md:mb-0 relative' : 'flex items-center justify-center'}`}>
          <div className={`relative w-full ${!isZoomed ? 'mt-12 md:mt-0' : ''}`} style={{ aspectRatio: '3/2' }}>
            {!isZoomed && (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-500 p-2 rounded-full transition-colors duration-300 md:hidden"
                  onClick={handlePreviousWithFade}
                  aria-label="Previous photo (mobile)"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-500 p-2 rounded-full transition-colors duration-300 md:hidden"
                  onClick={handleNextWithFade}
                  aria-label="Next photo (mobile)"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={photo.fullSrc}
                alt={photo.alt}
                className={`max-w-full max-h-full object-contain transition-opacity duration-700 ${isLoaded && !isFading ? 'opacity-100' : 'opacity-0'} ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                style={{ 
                  filter: 'contrast(1.05) brightness(0.95) saturate(0.9)',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                onLoad={handleImageLoad}
                onClick={handleImageClick}
              />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {!isZoomed && (
          <div className="w-full md:w-[40%] md:pl-8 flex flex-col justify-center">
            <h2 className="text-2xl font-light text-gray-800 mb-4">{photo.title}</h2>
            <p className="text-sm font-light leading-relaxed text-gray-600">{photo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;