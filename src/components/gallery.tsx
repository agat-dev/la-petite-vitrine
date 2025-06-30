
"use client";

import React from 'react';
import GalleryItem from './gallery-item';

const Gallery = () => {

  const images = [
    {
      id: 1,
      src: "/artisan-plombier.jpg",
      alt: "Site web d'artisan plombier",
      title: "Site web d'artisan plombier",
      url: "https://lapetitevitrine.com/artisan-renov"
    },
    {
      id: 2,
      src: "/artisan-coiffeur.jpg",
      alt: "Site web d'artisan coiffeur",
      title: "Site web d'artisan coiffeur",
      url: "https://lapetitevitrine.com/artisan-coiffeur"
    },
    {
      id: 3,
      src: "/artisan-paysagiste.jpg",
      alt: "Site web d'artisan paysagiste",
      title: "Site web d'artisan paysagiste",
      url: ""
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

      {/* SVG Courbes sophistiquées - thème crème */}
      <div className="absolute inset-0 opacity-50">
        {/* Courbes principales élégantes */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,150 Q350,50 700,120 T1200,150 L1200,0 L0,0 Z" 
            fill="url(#creamGradient1)" 
            opacity="0.4"
          />
          <path 
            d="M0,650 Q300,550 600,600 T1200,650 L1200,800 L0,800 Z" 
            fill="url(#creamGradient2)" 
            opacity="0.3"
          />
          <defs>
            <linearGradient id="creamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#F6E6D7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C9645A" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="creamGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F6E6D7" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Courbes décoratives secondaires */}
        <svg className="absolute top-1/5 right-0 w-3/5 h-2/5" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path 
            d="M0,120 Q120,40 240,90 T400,120 L400,0 L0,0 Z" 
            fill="rgba(246, 230, 215, 0.4)" 
          />
        </svg>

        <svg className="absolute bottom-1/5 left-0 w-2/5 h-1/3" viewBox="0 0 300 200" preserveAspectRatio="none">
          <path 
            d="M0,80 Q90,20 180,60 T300,80 L300,200 L0,200 Z" 
            fill="rgba(201, 100, 90, 0.3)" 
          />
        </svg>

        {/* Lignes courbes flottantes sophistiquées */}
        <svg className="absolute top-1/4 left-1/5 w-80 h-80" viewBox="0 0 200 200">
          <path 
            d="M25,90 Q70,25 115,90 T185,90" 
            stroke="rgba(201, 100, 90, 0.5)" 
            strokeWidth="2.5" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M15,110 Q55,45 95,110 T175,110" 
            stroke="rgba(246, 230, 215, 0.6)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
        </svg>

        <svg className="absolute bottom-1/4 right-1/5 w-96 h-96" viewBox="0 0 200 200">
          <path 
            d="M175,85 Q130,15 85,85 T15,85" 
            stroke="rgba(246, 230, 215, 0.7)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2.5s' }}
          />
          <path 
            d="M185,105 Q140,35 95,105 T25,105" 
            stroke="rgba(201, 100, 90, 0.4)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.8s' }}
          />
        </svg>

        {/* Courbes diagonales subtiles */}
        <svg className="absolute top-1/3 right-1/3 w-64 h-64" viewBox="0 0 150 150">
          <path 
            d="M10,75 Q40,20 75,75 Q110,130 140,75" 
            stroke="rgba(201, 100, 90, 0.3)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </svg>
      </div>

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
