import React, { useState, useEffect, useRef } from 'react';
import { Photo } from '../types';
import PhotoItem from './PhotoItem';
import Lightbox from './Lightbox';

interface MasonryGalleryProps {
  photos: Photo[];
  title: string;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ photos, title }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  if (photos.length === 0) {
    return null;
  }

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !isLoading) {
            // loadMorePhotos(); // 無効化
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(loadingRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, photos.length]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handlePrevious = () => {
    const index = photos.findIndex(p => p.id === selectedPhoto?.id);
    const newIndex = (index - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[newIndex]);
  };

  const handleNext = () => {
    const index = photos.findIndex(p => p.id === selectedPhoto?.id);
    const newIndex = (index + 1) % photos.length;
    setSelectedPhoto(photos[newIndex]);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const getVisiblePhotosByHeight = (photos: Photo[], showAll: boolean, maxHeightVW: number) => {
    if (showAll) return photos;
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 100;
    const maxHeightPx = vw * maxHeightVW;
    let sum = 0;
    const result: Photo[] = [];
    for (let i = 0; i < photos.length; i++) {
      const h = 200;
      if (sum + h > maxHeightPx) break;
      sum += h;
      result.push(photos[i]);
    }
    return result;
  };

  // 画面幅でmaxHeightVWを切り替え
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const maxHeightVW = isMobile ? 300 : 180;
  const visiblePhotos = getVisiblePhotosByHeight(photos, showAll, maxHeightVW);
  const columnsClass = 'columns-3 md:columns-3 lg:columns-5 xl:columns-6 2xl:columns-6';

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 pt-16 pb-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">{title}</h2>
        <ul className={`${columnsClass} gap-4 space-y-4 ${!showAll ? `max-h-[${maxHeightVW}vw] overflow-hidden` : ''}`}>
          {visiblePhotos.map(photo => (
            <li key={photo.id} className="break-inside-avoid mb-4">
              <PhotoItem
                photo={photo}
                onClick={() => handlePhotoClick(photo)}
              />
            </li>
          ))}
        </ul>
        {photos.length > visiblePhotos.length && !showAll && (
          <button
            className="block mx-auto mt-6 px-6 py-2 rounded transition text-gray-600 hover:text-black"
            onClick={() => setShowAll(true)}
          >
            more +
          </button>
        )}
        {showAll && (
          <button
            className="block mx-auto mt-4 px-6 py-2 rounded transition text-gray-600 hover:text-black"
            onClick={() => setShowAll(false)}
          >
            less -
          </button>
        )}
      </section>
      <div ref={loadingRef} className="h-10 w-full flex justify-center items-center mt-8 mb-4">
        {isLoading && (
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-ping"></div>
        )}
      </div>
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={handleCloseLightbox}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default MasonryGallery;