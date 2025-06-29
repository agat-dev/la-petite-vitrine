
import React from 'react';
import GalleryItem from './gallery-item';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      alt: "Rivière entre les montagnes sous des nuages blancs",
      title: "Paysage montagneux",
      url: "https://unsplash.com/photos/water-between-green-leafed-trees-sALqbthUj6A"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      alt: "Photographie de paysage de montagne frappée par les rayons du soleil",
      title: "Rayons dorés",
      url: "https://unsplash.com/photos/landscape-photography-of-mountain-hit-by-golden-sunlight-qC2n6RQU4Vw"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
      alt: "Sommet de montagne brumeux",
      title: "Sommet brumeux",
      url: "https://unsplash.com/photos/fog-covered-mountain-peak-siQgni-AkGs"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&h=600&fit=crop",
      alt: "Photo de paysage des Alpes de montagne",
      title: "Alpes majestueuses",
      url: "https://unsplash.com/photos/landscape-photo-of-mountain-alps-d2MSDujJl2g"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100/20 via-cream-100/10 to-cream-100/30 py-24 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-center mb-8 animate-fade-in">
          <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
            Pour tous les
            </span>
          <span className="font-serif font-light italic text-primary ml-4">artisans</span>
        </h1>
    
        
        {/* Container principal avec effet glassmorphism */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <GalleryItem 
                key={image.id} 
                image={image} 
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Éléments décoratifs flottants */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cream-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-coral-500/25 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/15 rounded-full blur-3xl -z-10 animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default Gallery;
