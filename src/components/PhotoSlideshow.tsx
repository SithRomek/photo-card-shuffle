
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface PhotoSlideshowProps {
  photos: Photo[];
  initialPhotoId: string;
  onClose: () => void;
}

const PhotoSlideshow = ({ photos, initialPhotoId, onClose }: PhotoSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = photos.findIndex(photo => photo.id === initialPhotoId);
    setCurrentIndex(index >= 0 ? index : 0);
  }, [initialPhotoId, photos]);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photo stack animation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ x: 100, opacity: 0, rotate: 5, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ x: -100, opacity: 0, rotate: -5, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              <img
                src={`https://images.unsplash.com/${currentPhoto.url}?w=800&h=600&fit=crop`}
                alt={currentPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Photo info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
              >
                <h2 className="text-white text-2xl font-bold mb-2">{currentPhoto.title}</h2>
                {currentPhoto.description && (
                  <p className="text-white/80">{currentPhoto.description}</p>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Photo indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoSlideshow;
