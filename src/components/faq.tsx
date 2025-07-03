"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Qu'est-ce qui est compris dans le site à 390€ ?",
    answer: "Le tarif comprend tout ce qu'il faut pour être visible, professionnel et crédible :\n– La création d'un site vitrine 1 page responsive (adapté mobile)\n– Le design personnalisé\n– Le formulaire de contact\n– L'hébergement et le nom de domaine pour 1 an\n– L'optimisation pour Google (SEO local, balises, vitesse)\n– La mise en ligne en 5 jours ouvrés\n\n Aucun coût caché, aucun abonnement obligatoire."
  },
  {
    id: 2,
    question: "L'hébergement et le nom de domaine sont-ils compris ?",
    answer: "Oui, tout est inclus pendant 1 an :\n– Le nom de domaine personnalisé (en .fr, .com, etc.)\n– L'hébergement sécurisé et optimisé\n\nAucune démarche technique à faire. Ensuite, vous pouvez renouveler l'hébergement chez nous ou transférer votre site si vous le souhaitez."
  },
  {
    id: 3,
    question: "Qui s'occupe de la maintenance du site ?",
    answer: "C'est nous.\nSi vous choisissez l'option maintenance à 9€/mois, nous assurons :\n– Les mises à jour techniques\n– Les sauvegardes régulières\n– Les modifications simples (textes, images…)\n– Le support par e-mail sous 48h\n\nRien à gérer, votre site reste toujours à jour."
  },
  {
    id: 4,
    question: "Qui crée les textes et contenus du site ?",
    answer: "Vous pouvez nous fournir votre texte, mais si vous préfére, nous rédigeons le contenu à partir de quelques infos simples (votre métier, vos services, votre zone géographique).\n\nNotre objectif : un site clair, pro, et bien référencé, même si vous ne voulez pas rédiger vous-même."
  },
  {
    id: 5,
    question: "Qui s'occupe du logo et du design du site ?",
    answer: "Vous avez déjà un logo ? Parfait, on l'intègre.\nVous n'en as pas ? Aucun souci : nous pouvons créer un visuel simple et propre adapté à votre activité.\n\nLe design du site est toujours personnalisé : couleurs, typographie, style sobre ou dynamique selon votre profil."
  }
];

const FAQItem: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  
  const animationClass = isIntersecting 
    ? 'animate-slide-in-left'
    : 'opacity-0 translate-x-10';

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 delay-${index * 100} ${animationClass}`}
    >
      <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
        style={{
          backdropFilter: 'blur(20px) saturate(1.2)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.10) 100%)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        <button
          className="w-full text-left flex justify-between items-center focus:outline-none group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-lg font-semibold text-primary pr-4 group-hover:text-primary/80 transition-colors">
            {item.question}
          </h3>
          <ChevronDown 
            className={`w-5 h-5 text-primary/70 transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
        }`}>
          <div className="text-primary/80 leading-relaxed whitespace-pre-line">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { ref: titleRef, isIntersecting: titleVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section className="relative min-h-screen py-16 md:py-24 lg:py-36 p-3 sm:px-4">
      {/* Background with subtle gradient - matching atouts */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-500 via-cream-500/30 to-cream-500"></div>

      {/* SVG Background sophistiqué - thème ondulant zen */}
      <div className="absolute inset-0 opacity-25">
        {/* Vagues zen concentriques */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,180 Q300,80 600,160 Q900,240 1200,140 L1200,0 L0,0 Z" 
            fill="url(#faqGradient1)" 
            opacity="0.6"
          />
          <path 
            d="M0,320 Q400,220 800,300 Q1000,350 1200,280 L1200,800 L0,800 Z" 
            fill="url(#faqGradient2)" 
            opacity="0.4"
          />
          <path 
            d="M0,500 Q200,400 500,480 Q800,560 1200,460 L1200,800 L0,800 Z" 
            fill="url(#faqGradient3)" 
            opacity="0.3"
          />
          <defs>
            <linearGradient id="faqGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F6E6D7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C9645A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="faqGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="faqGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F6E6D7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C9645A" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Cercles concentriques flottants */}
        <svg className="absolute top-1/5 left-1/6 w-1/3 h-1/3" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="rgba(201, 100, 90, 0.3)" strokeWidth="1.5" fill="none" 
                  className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="100" cy="100" r="60" stroke="rgba(246, 230, 215, 0.4)" strokeWidth="1.5" fill="none" 
                  className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="100" cy="100" r="40" stroke="rgba(201, 100, 90, 0.2)" strokeWidth="1.5" fill="none" 
                  className="animate-pulse" style={{ animationDelay: '3s' }} />
          <circle cx="100" cy="100" r="20" fill="rgba(246, 230, 215, 0.3)" />
        </svg>

        {/* Motifs de question stylisés */}
        <svg className="absolute bottom-1/5 right-1/6 w-2/5 h-2/5" viewBox="0 0 300 250">
          <path 
            d="M100,50 Q130,30 160,50 Q170,80 160,110 Q150,130 130,140 L130,160 M125,180 Q130,185 135,180 Q130,175 125,180" 
            stroke="rgba(201, 100, 90, 0.4)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
          <path 
            d="M200,80 Q230,60 260,80 Q270,110 260,140 Q250,160 230,170 L230,190 M225,210 Q230,215 235,210 Q230,205 225,210" 
            stroke="rgba(246, 230, 215, 0.5)" 
            strokeWidth="2.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2.5s' }}
          />
        </svg>

        {/* Lignes de réflexion courbes */}
        <svg className="absolute top-1/2 left-1/8 w-72 h-72" viewBox="0 0 180 180">
          <path 
            d="M20,90 Q60,30 100,90 Q140,150 180,90" 
            stroke="rgba(201, 100, 90, 0.3)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.8s' }}
          />
          <path 
            d="M10,60 Q50,10 90,60 Q130,110 170,60" 
            stroke="rgba(246, 230, 215, 0.4)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.8s' }}
          />
          <path 
            d="M30,120 Q70,70 110,120 Q150,170 190,120" 
            stroke="rgba(201, 100, 90, 0.25)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2.8s' }}
          />
        </svg>

        {/* Points de méditation */}
        <svg className="absolute bottom-1/3 left-1/3 w-48 h-48" viewBox="0 0 120 120">
          <circle cx="30" cy="30" r="4" fill="rgba(201, 100, 90, 0.4)" 
                  className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="90" cy="30" r="4" fill="rgba(246, 230, 215, 0.5)" 
                  className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="60" cy="60" r="5" fill="rgba(201, 100, 90, 0.5)" 
                  className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          <circle cx="30" cy="90" r="4" fill="rgba(246, 230, 215, 0.4)" 
                  className="animate-pulse" style={{ animationDelay: '2.5s' }} />
          <circle cx="90" cy="90" r="4" fill="rgba(201, 100, 90, 0.3)" 
                  className="animate-pulse" style={{ animationDelay: '3s' }} />
        </svg>
      </div>

      {/* Animated background elements - matching atouts */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-800 ${
            titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 animate-fade-in break-words">
            <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
              Foire aux
            </span>
            <span className="font-serif font-light italic text-primary ml-2 sm:ml-4">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-primary/70 max-w-2xl mx-auto text-center leading-relaxed">
            Trouvez rapidement les réponses à vos questions les plus fréquentes
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8"
            style={{
              backdropFilter: 'blur(24px) saturate(1.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.05), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(255, 255, 255, 0.25)',
            }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Vous n&apos;avez pas trouvé votre réponse ?
            </h3>
            <p className="text-primary/80 mb-6">
              Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons rapidement.
            </p>
            <a 
            href="#contact">
            <button 
            className="bg-gradient-to-r from-coral-500 to-coral-500/70 text-white px-8 py-3 rounded-full font-semibold hover:from-coral-600 hover:to-coral-500/90 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Nous contacter
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
