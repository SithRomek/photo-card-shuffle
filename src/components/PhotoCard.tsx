
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
}

const PhotoCard = ({ photo, onCardClick, index }: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCardClick(photo)}
    >
      <div className="relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="aspect-square relative">
          <img
            src={`https://images.unsplash.com/${photo.url}?w=400&h=400&fit=crop`}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Card stack effect */}
          <div className="absolute inset-0 -z-10 bg-card rounded-xl transform translate-x-1 translate-y-1 shadow-md" />
          <div className="absolute inset-0 -z-20 bg-muted rounded-xl transform translate-x-2 translate-y-2 shadow-sm" />
        </div>
        
        {/* Content overlay */}
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
      </div>
    </motion.div>
  );
};

export default PhotoCard;
