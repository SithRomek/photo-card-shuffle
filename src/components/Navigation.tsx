
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Camera className="w-6 h-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              PhotoDeck
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Gallery
            </Link>
            <Link 
              to="/admin" 
              className={`flex items-center space-x-2 transition-colors hover:text-primary ${
                location.pathname === '/admin' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
