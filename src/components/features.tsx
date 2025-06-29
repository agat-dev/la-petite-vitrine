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
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background with gradient transition from atouts section */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-500/70 via-cream-500/40 to-cream-500/80"></div>

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
