"use client";

import { Button } from "./ui/button";
import { useScrollEffect } from "../hooks/useScrollEffect";
import  Link from "next/link";

const Hero = () => {
  const scrollY = useScrollEffect();

  // Calculer les transformations basées sur le scroll
  const leftElementTransform = Math.max(-100, -scrollY * 0.5);
  const rightElementTransform = Math.min(100, scrollY * 0.5);
  const elementsOpacity = Math.max(0, 1 - scrollY * 0.003);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pb-24 lg:pb-36">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 via-blue-500/30 to-blue-500/80"></div>

      {/* SVG Background sophistiqué - thème bleu héroïque */}
      <div className="absolute inset-0 opacity-40">
        {/* Vagues dynamiques principales */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,300 Q200,150 400,250 T800,200 Q1000,150 1200,300 L1200,0 L0,0 Z" 
            fill="url(#heroGradient1)" 
            opacity="0.5"
          />
          <path 
            d="M0,500 Q300,350 600,450 T1200,400 L1200,800 L0,800 Z" 
            fill="url(#heroGradient2)" 
            opacity="0.4"
          />
          <defs>
            <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#69AFC8" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#F6E6D7" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#69AFC8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#69AFC8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Formes géométriques flottantes */}
        <svg className="absolute top-1/6 left-0 w-1/2 h-1/2" viewBox="0 0 300 250" preserveAspectRatio="none">
          <path 
            d="M0,125 Q75,50 150,125 Q225,200 300,125 L300,0 L0,0 Z" 
            fill="rgba(105, 175, 200, 0.3)" 
          />
        </svg>

        <svg className="absolute bottom-1/6 right-0 w-3/5 h-2/5" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path 
            d="M400,100 Q300,25 200,75 Q100,125 0,50 L0,200 L400,200 Z" 
            fill="rgba(246, 230, 215, 0.4)" 
          />
        </svg>

        {/* Spirales et courbes organiques */}
        <svg className="absolute top-1/4 right-1/4 w-72 h-72" viewBox="0 0 200 200">
          <path 
            d="M100,50 Q150,75 125,125 Q75,150 100,100 Q125,75 100,50" 
            stroke="rgba(105, 175, 200, 0.6)" 
            strokeWidth="2.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          <path 
            d="M80,70 Q120,90 100,130 Q60,140 80,110 Q100,90 80,70" 
            stroke="rgba(201, 100, 90, 0.5)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.2s' }}
          />
        </svg>

        {/* Lignes de connexion élégantes */}
        <svg className="absolute bottom-1/4 left-1/6 w-64 h-64" viewBox="0 0 150 150">
          <path 
            d="M20,75 Q50,25 75,75 Q100,125 130,75" 
            stroke="rgba(246, 230, 215, 0.7)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <path 
            d="M10,50 Q40,10 70,50 Q100,90 130,50" 
            stroke="rgba(105, 175, 200, 0.4)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.8s' }}
          />
        </svg>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glass container - the main showcase */}
      <div className="relative z-10 max-w-6xl mx-auto md:px-6 px-3">
        <div className="relative">
          {/* Main glass panel */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 lg:p-24">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>

            {/* Reflection lines */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-8">
                <span className="text-primary/70 text-sm font-medium">
                  Site web + hébergement + maintenance
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
                  Vitrine numérique
                </span>
                <br />
                <span className="font-serif font-medium italic bg-gradient-to-r from-primary/60 to-primary/90 bg-clip-text text-transparent">
                  des artisans
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-primary/70 mb-12 max-w-3xl mx-auto">
                Votre présence numérique complète et clé en main de
                qualité
                <br /> sans se ruiner
                <br />
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#demos"
                  >
                <Button
                  size="lg"
                  className="bg-primary/90 hover:bg-primary/60 text-white border-0 px-8 py-4 text-lg font-regular font-display transition-all duration-600 rounded-full"
                >
                  Voir une démo
                </Button>
                </Link>
                <Link
                  href="#tarifs"
                  >
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-sm bg-cream-100/90 border-white/30 text-primary hover:bg-cream-100/60 px-8 py-4 text-lg font-regular font-display transition-all duration-600 rounded-full"
                >
                  Voir les tarifs
                </Button>
                </Link>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cream-100/80 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
        {/* Floating elements around the glass */}
        <div
          className="absolute top-20 -left-20 lg:block hidden transition-all duration-300 ease-out"
          style={{
            transform: `translateX(${leftElementTransform}px)`,
            opacity: elementsOpacity,
          }}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 animate-float">
            <div className="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center"></div>
            <p className="text-primary/80 mt-3 font-medium text-lg">
              Page web + <br />
              1 an de maintenance
              <br />
              390€
            </p>
          </div>
        </div>
        <div
          className="absolute bottom-20 -right-20 lg:block hidden transition-all duration-300 ease-out"
          style={{
            transform: `translateX(${rightElementTransform}px)`,
            opacity: elementsOpacity,
          }}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 animate-float">
            <div className="w-12 h-12 bg-cream-100 rounded-xl flex items-center justify-center"></div>
            <p className="text-primary/80 mt-3 font-medium text-lg">
              Livraison
              <br /> sous 5 jours
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
    </section>
  );
};

export default Hero;
