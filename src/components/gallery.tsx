
"use client";

import React from 'react';
import GalleryItem from './gallery-item';

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
    <section id="demos" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-36 bg-cream-50/50 backdrop-blur-xl border-y border-white/30 shadow-2xl">
      {/* Background with subtle gradient - tons crème avec glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100/60 via-cream-200/40 to-cream-300/50 backdrop-blur-sm"></div>

      {/* Animated background elements - tons crème harmonieux */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-coral-300/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-100/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-8 animate-fade-in">
          <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
            Un site web pour chaque
            </span>
          <span className="font-serif font-light italic text-slate-700 ml-4">artisans</span>
        </h1>
    
        
        {/* Grille des vignettes sans container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index}
            />
          ))}
        </div>
        
        {/* Éléments décoratifs flottants - supprimés car déjà dans le background */}
      </div>
    </section>
  );
};

export default Gallery;
