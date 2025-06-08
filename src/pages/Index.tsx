
import React, { useState, useEffect } from 'react';
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

const Index = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Load photos from localStorage
    const savedPhotos = localStorage.getItem('photoGallery');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      // Set default placeholder photos
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
        }
      ];
      setPhotos(defaultPhotos);
      localStorage.setItem('photoGallery', JSON.stringify(defaultPhotos));
    }
  }, []);

  const handleCardClick = (photo: Photo) => {
    setSelectedPhoto(photo.id);
  };

  const handleCloseSlideshow = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                Photo Gallery
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Discover moments captured in time. Click on any photo to experience our interactive card-deck slideshow.
              </p>
            </div>

            {/* Photo Grid */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {photos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    onCardClick={handleCardClick}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Photos Yet</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Your gallery is waiting for beautiful moments. Visit the admin panel to add your first photos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slideshow Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoSlideshow
            photos={photos}
            initialPhotoId={selectedPhoto}
            onClose={handleCloseSlideshow}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
