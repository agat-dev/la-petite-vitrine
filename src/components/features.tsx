"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Users, Globe, Heart, Sparkles } from 'lucide-react';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Gestion du redimensionnement pour l'animation responsive
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Initialisation
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0");
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Fonction pour déterminer l'animation selon la position dans la ligne
  const getCardAnimation = (index: number, isVisible: boolean) => {
    // Responsive: 1 colonne sur mobile, 2 sur tablette, 3 sur desktop
    let colsPerRow = 3; // Desktop par défaut
    if (windowWidth < 768) colsPerRow = 1;
    else if (windowWidth >= 768 && windowWidth < 1024) colsPerRow = 2;
    
    const rowIndex = Math.floor(index / colsPerRow);
    const colIndex = index % colsPerRow;
    
    // Direction d'animation par ligne: alternance droite/gauche
    const isEvenRow = rowIndex % 2 === 0;
    
    let translateClass = '';
    if (colsPerRow === 1) {
      // Mobile: alternance ligne par ligne (pas par carte)
      translateClass = isVisible ? 'translate-x-0' : (isEvenRow ? 'translate-x-20' : '-translate-x-20');
    } else {
      // Tablette et Desktop: toute la ligne arrive du même côté
      if (isEvenRow) {
        // Lignes paires (0, 2, 4...) : arrivent de la droite
        translateClass = isVisible ? 'translate-x-0' : 'translate-x-20';
      } else {
        // Lignes impaires (1, 3, 5...) : arrivent de la gauche
        translateClass = isVisible ? 'translate-x-0' : '-translate-x-20';
      }
    }
    
    return {
      animation: `${translateClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`,
      delay: rowIndex * 300 + colIndex * 100 // Plus de temps entre les lignes pour l'effet groupé
    };
  };

  const features = [
    {
      icon: Shield,
      title: "Site vitrine 1 page",
      description: "Military-grade encryption to keep your data safe and secure at all times.",
      gradient: "from-blue-500 to-blue-500/40"
    },
    {
      icon: Zap,
      title: "Adapté mobile / tablette",
      description: "Optimized performance that delivers results in milliseconds, not seconds.",
      gradient: "from-yellow-400/20 to-orange-400/20"
    },
    {
      icon: Users,
      title: "Formulaire de contact",
      description: "Seamless collaboration tools that bring your team together effortlessly.",
      gradient: "from-green-400/20 to-emerald-400/20"
    },
    {
      icon: Globe,
      title: "Référencement Google (SEO local)",
      description: "Connect with users worldwide through our distributed network infrastructure.",
      gradient: "from-purple-400/20 to-pink-400/20"
    },
    {
      icon: Heart,
      title: "Nom de domaine + hébergement offerts 1 an",
      description: "Every feature is designed with user experience and satisfaction in mind.",
      gradient: "from-red-400/20 to-rose-400/20"
    },
    {
      icon: Sparkles,
      title: "Lien vers fiche Google Maps",
      description: "Intelligent automation that learns and adapts to your workflow patterns.",
      gradient: "from-indigo-400/20 to-violet-400/20"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-36 px-6 overflow-hidden">
      {/* Background with gradient transition from atouts section */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-500/70 via-cream-500/40 to-cream-500/80"></div>

      {/* SVG Background sophistiqué - thème géométrique moderne */}
      <div className="absolute inset-0 opacity-30">
        {/* Lignes géométriques croisées */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,200 L400,50 L800,180 L1200,100 L1200,0 L0,0 Z" 
            fill="url(#featuresGradient1)" 
            opacity="0.5"
          />
          <path 
            d="M0,600 L300,450 L700,580 L1200,400 L1200,800 L0,800 Z" 
            fill="url(#featuresGradient2)" 
            opacity="0.4"
          />
          <defs>
            <linearGradient id="featuresGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#69AFC8" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#F6E6D7" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#69AFC8" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="featuresGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#69AFC8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hexagones et formes polygonales */}
        <svg className="absolute top-1/6 left-1/8 w-1/3 h-1/3" viewBox="0 0 200 200" preserveAspectRatio="none">
          <polygon 
            points="100,20 160,60 160,140 100,180 40,140 40,60" 
            fill="rgba(105, 175, 200, 0.25)" 
            stroke="rgba(105, 175, 200, 0.4)" 
            strokeWidth="1"
          />
          <polygon 
            points="100,40 140,70 140,130 100,160 60,130 60,70" 
            fill="rgba(246, 230, 215, 0.3)" 
          />
        </svg>

        {/* Grille de points connectés */}
        <svg className="absolute bottom-1/6 right-1/8 w-2/5 h-2/5" viewBox="0 0 300 250" preserveAspectRatio="none">
          <g stroke="rgba(201, 100, 90, 0.3)" strokeWidth="1.5" fill="none">
            <line x1="50" y1="50" x2="150" y2="80" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <line x1="150" y1="80" x2="250" y2="60" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <line x1="50" y1="150" x2="150" y2="120" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <line x1="150" y1="120" x2="250" y2="140" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <line x1="50" y1="50" x2="50" y2="150" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            <line x1="150" y1="80" x2="150" y2="120" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
          </g>
          <circle cx="50" cy="50" r="3" fill="rgba(105, 175, 200, 0.6)" />
          <circle cx="150" cy="80" r="3" fill="rgba(201, 100, 90, 0.6)" />
          <circle cx="250" cy="60" r="3" fill="rgba(246, 230, 215, 0.8)" />
          <circle cx="50" cy="150" r="3" fill="rgba(105, 175, 200, 0.6)" />
          <circle cx="150" cy="120" r="3" fill="rgba(201, 100, 90, 0.6)" />
          <circle cx="250" cy="140" r="3" fill="rgba(246, 230, 215, 0.8)" />
        </svg>

        {/* Spirales technologiques */}
        <svg className="absolute top-1/3 right-1/3 w-64 h-64" viewBox="0 0 150 150">
          <path 
            d="M75,75 Q75,25 125,75 Q75,125 25,75 Q75,25 100,75 Q75,100 50,75 Q75,50 87,75" 
            stroke="rgba(69, 175, 200, 0.5)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2.5s' }}
          />
        </svg>

        {/* Motifs de circuits */}
        <svg className="absolute bottom-1/4 left-1/4 w-72 h-72" viewBox="0 0 180 180">
          <g stroke="rgba(201, 100, 90, 0.4)" strokeWidth="1.5" fill="none">
            <rect x="20" y="20" width="30" height="30" rx="5" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <rect x="130" y="130" width="30" height="30" rx="5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <path d="M50,35 L130,35 L130,130" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="90" cy="35" r="5" fill="rgba(246, 230, 215, 0.6)" />
            <circle cx="130" cy="82" r="5" fill="rgba(105, 175, 200, 0.6)" />
          </g>
        </svg>
      </div>

      {/* Animated background elements - matching atouts style */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-coral-500 mb-6">
            Nos
            <span className="text-transparent font-serif font-light italic bg-clip-text bg-gradient-to-r from-primary/80 to-primary ml-4">
              fonctionnalités
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez les capacités qui font de notre plateforme le choix des professionnels
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isVisible = visibleCards.includes(index);
            const cardAnimation = getCardAnimation(index, isVisible);
            
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-index={index}
                className={`transition-all duration-700 ease-out group ${cardAnimation.animation}`}
                style={{ transitionDelay: `${cardAnimation.delay}ms` }}
              >
                {/* Feature sans carte - Design minimaliste */}
                <div className="relative h-full text-center group">
                  {/* Icon Container */}
                  <div className="mb-6 flex justify-center">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.gradient} p-1 transition-all duration-300 group-hover:scale-110`}>
                      <div className="w-full h-full bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <IconComponent className="w-10 h-10 text-gray-700 transition-all duration-300 group-hover:text-coral-500" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-all duration-300 group-hover:text-coral-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-700">
                    {feature.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-6 mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-coral-500/50 to-transparent transition-all duration-300 group-hover:w-24 group-hover:via-coral-500"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
