
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import PhotoCard from '@/components/PhotoCard';
import PhotoSlideshow from '@/components/PhotoSlideshow';

interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface PhotoGridItem {
  photo: Photo;
  size: 'small' | 'medium' | 'large';
  isRevealed: boolean;
  isInteractive: boolean;
}

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoGrid, setPhotoGrid] = useState<PhotoGridItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12); // Increased initial load

  useEffect(() => {
    // Load photos from localStorage
    const savedPhotos = localStorage.getItem('photoGallery');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      // Extended default photos for better demo
      const defaultPhotos: Photo[] = [
        {
          id: '1',
          url: 'photo-1649972904349-6e44c42644a7',
          title: 'Creative Workspace',
          description: 'A peaceful moment of productivity and creativity'
        },
        {
          id: '2',
          url: 'photo-1488590528505-98d2b5aba04b',
          title: 'Modern Technology',
          description: 'Clean lines and modern design in computing'
        },
        {
          id: '3',
          url: 'photo-1581091226825-a6a2a5aee158',
          title: 'Digital Focus',
          description: 'The intersection of technology and human creativity'
        },
        {
          id: '4',
          url: 'photo-1500673922987-e212871fec22',
          title: 'Natural Beauty',
          description: 'Serene waters surrounded by lush greenery'
        },
        {
          id: '5',
          url: 'photo-1518877593221-1f28583780b4',
          title: 'Ocean Majesty',
          description: 'The incredible power and grace of marine life'
        },
        {
          id: '6',
          url: 'photo-1472396961693-142e6e269027',
          title: 'Wildlife Wonder',
          description: 'Majestic creatures in their natural habitat'
        },
        {
          id: '7',
          url: 'photo-1433086966358-54859d0ed716',
          title: 'Mountain Vista',
          description: 'Breathtaking landscapes that inspire wonder'
        },
        {
          id: '8',
          url: 'photo-1465146344425-f00d5f5c8f07',
          title: 'Floral Symphony',
          description: 'Nature\'s delicate artistry in full bloom'
        },
        {
          id: '9',
          url: 'photo-1482938289607-e9573fc25ebb',
          title: 'River Journey',
          description: 'Flowing waters through pristine wilderness'
        },
        {
          id: '10',
          url: 'photo-1469474968028-56623f02e42e',
          title: 'Golden Hour',
          description: 'When light transforms the ordinary into magic'
        }
      ];
      setPhotos(defaultPhotos);
      localStorage.setItem('photoGallery', JSON.stringify(defaultPhotos));
    }
  }, []);

  const generatePhotoGrid = useCallback((photoList: Photo[], count: number) => {
    const sizes: ('small' | 'medium' | 'large')[] = ['large', 'medium', 'small', 'medium', 'small', 'small'];
    const sizePattern = sizes.concat(['medium', 'small', 'large', 'small', 'medium']);
    
    return photoList.slice(0, count).map((photo, index) => {
      const size = sizePattern[index % sizePattern.length];
      const groupIndex = Math.floor(index / 3);
      const positionInGroup = index % 3;
      
      // First photo in each group of 3 is always revealed
      // Other photos require interaction to reveal
      const isRevealed = positionInGroup === 0;
      const isInteractive = !isRevealed;
      
      return {
        photo,
        size,
        isRevealed,
        isInteractive
      };
    });
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setPhotoGrid(generatePhotoGrid(photos, visibleCount));
    }
  }, [photos, visibleCount, generatePhotoGrid]);

  const handleRevealPhoto = (index: number) => {
    setPhotoGrid(prev => prev.map((item, i) => 
      i === index ? { ...item, isRevealed: true } : item
    ));
  };

  const handleCardClick = (photo: Photo) => {
    setSelectedPhoto(photo.id);
  };

  const handleCloseSlideshow = () => {
    setSelectedPhoto(null);
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1500) { // Reduced threshold for earlier loading
      if (visibleCount < photos.length) {
        setVisibleCount(prev => Math.min(prev + 9, photos.length)); // Load more at once
      }
    }
  }, [visibleCount, photos.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      photoGrid.slice(0, visibleCount + 6).forEach(item => { // Preload 6 more images ahead
        const img = new Image();
        img.src = `https://images.unsplash.com/${item.photo.url}?w=600&h=400&fit=crop`;
      });
    };
    
    if (photoGrid.length > 0) {
      preloadImages();
    }
  }, [photoGrid, visibleCount]);

  const revealedPhotos = photoGrid.filter(item => item.isRevealed).map(item => item.photo);

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[2400px]">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8">
                Photo Gallery
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-600 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed">
                Discover moments captured in time. Interact with photos to reveal hidden gems and click to experience our slideshow.
              </p>
            </div>

            {/* Photo Grid */}
            {photoGrid.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-4 lg:gap-6 max-w-[2400px] mx-auto auto-rows-max">
                {photoGrid.map((item, index) => (
                  <PhotoCard
                    key={item.photo.id}
                    photo={item.photo}
                    onCardClick={handleCardClick}
                    index={index}
                    size={item.size}
                    isRevealed={item.isRevealed}
                    onReveal={() => handleRevealPhoto(index)}
                    isInteractive={item.isInteractive}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-slate-700 mb-2 sm:mb-3 lg:mb-4">No Photos Yet</h3>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-500 mb-4 sm:mb-6 lg:mb-8 max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                  Your gallery is waiting for beautiful moments. Visit the admin panel to add your first photos.
                </p>
              </div>
            )}

            {/* Loading indicator */}
            {visibleCount < photos.length && (
              <div className="text-center mt-8 sm:mt-12 lg:mt-16">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary/10 rounded-full">
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-primary mr-2"></div>
                  <span className="text-xs sm:text-sm lg:text-base text-primary">Loading more photos...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slideshow Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoSlideshow
            photos={revealedPhotos}
            initialPhotoId={selectedPhoto}
            onClose={handleCloseSlideshow}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
