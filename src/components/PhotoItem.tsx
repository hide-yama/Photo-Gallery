import React, { useState, useRef, useEffect } from 'react';
import { Photo } from '../types';

interface PhotoItemProps {
  photo: Photo;
  onClick: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className="overflow-hidden cursor-pointer transition-transform duration-300 hover:opacity-95 mb-2"
      onClick={onClick}
    >
      <div ref={imgRef} className="relative">
        {isInView && (
          <img
            src={photo.src}
            alt={photo.alt}
            className={`w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              filter: 'contrast(1.05) brightness(0.95) saturate(0.9)',
              maxWidth: '100%',
              display: 'block'
            }}
            onLoad={handleImageLoad}
          />
        )}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default PhotoItem;