
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoCardProps {
  photo: {
    id: string;
    url: string;
    title: string;
    description?: string;
  };
  onCardClick: (photo: any) => void;
  index: number;
  size?: 'small' | 'medium' | 'large';
  isRevealed?: boolean;
  onReveal?: () => void;
  isInteractive?: boolean;
}

const PhotoCard = ({ 
  photo, 
  onCardClick, 
  index, 
  size = 'medium',
  isRevealed = true,
  onReveal,
  isInteractive = false
}: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'aspect-square',
    medium: 'aspect-[4/3]',
    large: 'aspect-[3/2]'
  };

  const gridClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2'
  };

  const handleClick = () => {
    if (isInteractive && !isRevealed && onReveal) {
      onReveal();
    } else if (isRevealed) {
      onCardClick(photo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative group cursor-pointer ${gridClasses[size]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
        <div className={`${sizeClasses[size]} relative`}>
          {isRevealed ? (
            <img
              src={`https://images.unsplash.com/${photo.url}?w=600&h=400&fit=crop`}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0 
                }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground font-medium">Click to reveal</p>
              </motion.div>
            </div>
          )}
          
          {/* Overlay gradient */}
          {isRevealed && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Card stack effect */}
          <div className="absolute inset-0 -z-10 bg-card rounded-xl transform translate-x-1 translate-y-1 shadow-md" />
          <div className="absolute inset-0 -z-20 bg-muted rounded-xl transform translate-x-2 translate-y-2 shadow-sm" />
        </div>
        
        {/* Content overlay */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
          >
            <h3 className="text-lg font-semibold mb-1">{photo.title}</h3>
            {photo.description && (
              <p className="text-sm text-white/80">{photo.description}</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PhotoCard;
