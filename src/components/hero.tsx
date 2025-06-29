"use client";

import { Button } from "./ui/button";
import { useScrollEffect } from "../hooks/useScrollEffect";

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

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glass container - the main showcase */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="relative">
          {/* Main glass panel */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 lg:p-24 shadow-2xl">
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
                <Button
                  size="lg"
                  className="bg-primary/90 hover:bg-primary/60 text-white border-0 px-8 py-4 text-lg font-regular font-display shadow-xl hover:shadow-2xl transition-all duration-600"
                >
                  Voir une démo
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-sm bg-cream-100/90 border-white/30 text-primary hover:bg-cream-100/60 px-8 py-4 text-lg font-regular font-display transition-all duration-600"
                >
                  Voir les tarifs
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cream-100/80 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-xl"></div>
          </div>

          {/* Secondary glass panels for depth */}
          <div className="absolute -z-10 top-4 left-4 right-4 bottom-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl"></div>
          <div className="absolute -z-20 top-8 left-8 right-8 bottom-8 backdrop-blur-sm bg-white/5 border border-white/5 rounded-3xl"></div>
        </div>

        {/* Floating elements around the glass */}
        <div
          className="absolute top-20 -left-20 lg:block hidden transition-all duration-300 ease-out"
          style={{
            transform: `translateX(${leftElementTransform}px)`,
            opacity: elementsOpacity,
          }}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl animate-float">
            <div className="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center"></div>
            <p className="text-primary/80 mt-3 font-medium text-lg">
              Page web + <br />
              1 an de maintenance
              <br />
              490€
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
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl animate-float">
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
