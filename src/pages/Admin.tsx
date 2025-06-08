
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import AdminSettings from '@/components/AdminSettings';

interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
}

const Admin = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

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
        }
      ];
      setPhotos(defaultPhotos);
      localStorage.setItem('photoGallery', JSON.stringify(defaultPhotos));
    }
  }, []);

  const handlePhotosUpdate = (updatedPhotos: Photo[]) => {
    setPhotos(updatedPhotos);
    localStorage.setItem('photoGallery', JSON.stringify(updatedPhotos));
  };

  return (
    <>
      <Navigation />
      <AdminSettings photos={photos} onPhotosUpdate={handlePhotosUpdate} />
    </>
  );
};

export default Admin;
