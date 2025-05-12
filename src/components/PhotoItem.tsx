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
      className="overflow-hidden cursor-pointer transition-transform duration-300 mb-2"
      onClick={onClick}
    >
      <div ref={imgRef} className="relative group">
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-white bg-opacity-60" />
          <span className="relative z-10 text-base md:text-lg font-normal text-gray-800 drop-shadow text-center px-2">{photo.title}</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;