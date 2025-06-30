"use client";
import React, { useState } from 'react';
import { Image } from 'lucide-react';

interface GalleryItemProps {
  image: {
    id: number;
    src: string;
    alt: string;
    title: string;
    url?: string;
  };
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (image.url) {
      window.open(image.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-500 animate-fade-in ${
        index % 2 === 0 ? 'hover:rotate-[0.3deg]' : 'hover:-rotate-[0.3deg]'
      } hover:scale-[1.01]`}
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Container de l'image avec glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:bg-white/8">
        
        {/* Placeholder pendant le chargement */}
        {!isLoaded && (
          <div className="aspect-[4/3] flex items-center justify-center bg-white/5">
            <Image className="w-full h-full object-cover text-white/50 animate-pulse" />
          </div>
        )}
        
        {/* Image */}
        <img
          src={image.src}
          alt={image.alt}
          className={`w-fit aspect-[4/3] object-cover object-center transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-[1.2]' : 'scale-110'}`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Overlay avec titre - Nouvelle approche */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient bottom pour lisibilité */}
          
          {/* Titre toujours visible avec glassmorphism */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="backdrop-blur-md bg-white/50 border border-white/20 rounded-xl px-4 py-3 shadow-lg transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30">
              <h3 className="text-primary font-semibold text-lg leading-tight transition-all duration-300 group-hover:text-coral-500">
                {image.title}
              </h3>
              <div className="flex items-center justify-between mt-1 ">
                <p className="text-primary group-hover:text-coral-500 text-sm transition-colors duration-300">Portfolio</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {image.url && (
                    <div className="text-primary text-xs group-hover:text-white transition-colors duration-300">
                      Cliquez pour voir
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Effet de brillance au survol - plus subtil */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-1000 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}></div>
        
        {/* Bordure animée - plus discrète */}
        <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${
          isHovered ? 'border-white/20' : 'border-transparent'
        }`}></div>
      </div>
      
      {/* Ombre portée dynamique - plus subtile */}
      <div className={`absolute inset-0 rounded-2xl bg-white/5 blur-xl transition-all duration-300 -z-10 ${
        isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-20'
      }`}></div>
    </div>
  );
};

export default GalleryItem;
