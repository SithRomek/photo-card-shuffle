
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PhotoCardProps {
  photo: {
    id: string;
    url: string;
    title: string;
    description?: string;
  };
  onCardClick: (photo: any, isExpanded?: boolean) => void;
  onCollapseCard?: () => void;
  index: number;
  size?: 'smallest' | 'small' | 'medium' | 'large';
  isRevealed?: boolean;
  onReveal?: () => void;
  isInteractive?: boolean;
  isExpanded?: boolean;
}

const PhotoCard = memo(({ 
  photo, 
  onCardClick, 
  onCollapseCard,
  index, 
  size = 'medium',
  isRevealed = true,
  onReveal,
  isInteractive = false,
  isExpanded = false
}: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    smallest: 'aspect-square',
    small: 'aspect-square',
    medium: 'aspect-[4/3]',
    large: isExpanded ? 'aspect-[3/2]' : 'aspect-[3/2]'
  };

  const gridClasses = {
    smallest: 'col-span-1 row-span-1',
    small: 'col-span-1 md:col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: isExpanded 
      ? 'col-span-2 md:col-span-4 lg:col-span-5 xl:col-span-6 2xl:col-span-5 row-span-2 md:row-span-3' 
      : 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2'
  };

  const handleClick = () => {
    if (isInteractive && !isRevealed && onReveal) {
      onReveal();
    } else if (isRevealed) {
      onCardClick(photo, isExpanded);
    }
  };

  const handleCollapseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCollapseCard) {
      onCollapseCard();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isExpanded ? 1.02 : 1,
        zIndex: isExpanded ? 10 : 1
      }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.4,
        scale: { duration: 0.3 },
        zIndex: { duration: 0 }
      }}
      className={`relative group cursor-pointer ${gridClasses[size]} ${isExpanded ? 'z-10' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={isExpanded ? { 
        width: '50vw', 
        maxWidth: '50vw',
        position: 'relative'
      } : {}}
    >
      <div className="relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
        {/* Collapse button for expanded cards */}
        {isExpanded && (
          <button
            onClick={handleCollapseClick}
            className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className={`${sizeClasses[size]} relative`}>
          {isRevealed ? (
            <>
              {!imageLoaded && (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 animate-pulse" />
              )}
              <img
                src={`https://images.unsplash.com/${photo.url}?w=${isExpanded ? 1200 : 600}&h=${isExpanded ? 800 : 400}&fit=crop`}
                alt={photo.title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.1 : 1
                }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Click to reveal</p>
              </motion.div>
            </div>
          )}
          
          {/* Overlay gradient */}
          {isRevealed && imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Card stack effect - only for non-expanded cards */}
          {!isExpanded && (
            <>
              <div className="absolute inset-0 -z-10 bg-card rounded-xl transform translate-x-1 translate-y-1 shadow-md" />
              <div className="absolute inset-0 -z-20 bg-muted rounded-xl transform translate-x-2 translate-y-2 shadow-sm" />
            </>
          )}
        </div>
        
        {/* Content overlay */}
        {isRevealed && imageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white"
          >
            <h3 className={`font-semibold mb-1 ${isExpanded ? 'text-lg md:text-xl lg:text-2xl' : 'text-sm sm:text-base lg:text-lg'}`}>
              {photo.title}
            </h3>
            {photo.description && (
              <p className={`text-white/80 ${isExpanded ? 'text-base md:text-lg' : 'text-xs sm:text-sm'}`}>
                {photo.description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
