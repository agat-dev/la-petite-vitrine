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
    question: "Qu'est-ce que notre service ?",
    answer: "Notre service est une plateforme innovante qui vous permet de gérer facilement vos projets et de collaborer avec votre équipe. Nous offrons des outils intuitifs et des fonctionnalités avancées pour optimiser votre productivité."
  },
  {
    id: 2,
    question: "Comment commencer ?",
    answer: "Il suffit de créer un compte gratuit en quelques clics. Une fois inscrit, vous pouvez explorer toutes nos fonctionnalités avec notre guide d'intégration personnalisé qui vous accompagnera pas à pas."
  },
  {
    id: 3,
    question: "Quels sont les prix ?",
    answer: "Nous proposons plusieurs formules adaptées à vos besoins : un plan gratuit pour débuter, un plan Pro à 19€/mois pour les équipes, et un plan Enterprise sur mesure pour les grandes organisations."
  },
  {
    id: 4,
    question: "Y a-t-il un support technique ?",
    answer: "Oui, notre équipe de support est disponible 24h/24 et 7j/7 pour vous aider. Vous pouvez nous contacter par chat en direct, email ou téléphone. Nous proposons également une base de connaissances complète."
  },
  {
    id: 5,
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire (SSL 256-bit), nos serveurs sont certifiés ISO 27001, et nous respectons scrupuleusement le RGPD. Vos données sont sauvegardées quotidiennement."
  },
  {
    id: 6,
    question: "Peut-on intégrer des outils tiers ?",
    answer: "Oui, nous proposons plus de 100 intégrations avec les outils les plus populaires comme Slack, Google Workspace, Microsoft 365, Trello, et bien d'autres. Notre API REST permet aussi des intégrations personnalisées."
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
      <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40"
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
          <h3 className="text-lg font-semibold text-primary pr-4 group-hover:text-primary/80 transition-colors drop-shadow-sm">
            {item.question}
          </h3>
          <ChevronDown 
            className={`w-5 h-5 text-primary/70 transition-transform duration-300 flex-shrink-0 drop-shadow-sm ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}>
          <p className="text-primary/80 leading-relaxed drop-shadow-sm">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { ref: titleRef, isIntersecting: titleVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section className="relative min-h-screen py-16 md:py-24 lg:py-36 px-4 overflow-hidden">
      {/* Background with subtle gradient - matching atouts */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-500 via-cream-500/30 to-cream-500"></div>

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
          <h2 className="text-5xl font-bold text-center mb-8 animate-fade-in">
            <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
              Foire aux
            </span>
            <span className="font-serif font-light italic text-primary ml-4">Questions</span>
          </h2>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto text-center">
            Trouvez rapidement les réponses à vos questions les plus fréquentes
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-8 shadow-lg"
            style={{
              backdropFilter: 'blur(24px) saturate(1.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08), 0 3px 10px rgba(0, 0, 0, 0.05), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(255, 255, 255, 0.25)',
            }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4 drop-shadow-sm">
              Vous n'avez pas trouvé votre réponse ?
            </h3>
            <p className="text-primary/80 mb-6 drop-shadow-sm">
              Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons rapidement.
            </p>
            <button className="bg-gradient-to-r from-coral-500 to-primary text-white px-8 py-3 rounded-full font-semibold hover:from-coral-600 hover:to-primary/90 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg backdrop-blur-sm">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
