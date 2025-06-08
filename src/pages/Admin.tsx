
import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AdminSettings from '@/components/AdminSettings';
import AdminLogin from '@/components/AdminLogin';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
}

const Admin = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { isAuthenticated, isLoading, authenticate, logout } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const handlePhotosUpdate = (updatedPhotos: Photo[]) => {
    setPhotos(updatedPhotos);
    localStorage.setItem('photoGallery', JSON.stringify(updatedPhotos));
  };

  const handleLogout = () => {
    logout();
    setPhotos([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={authenticate} />;
  }

  return (
    <>
      <Navigation />
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-md"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      <AdminSettings photos={photos} onPhotosUpdate={handlePhotosUpdate} />
    </>
  );
};

export default Admin;
