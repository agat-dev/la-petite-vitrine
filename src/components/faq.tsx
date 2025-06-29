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
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15">
        <button
          className="w-full text-left flex justify-between items-center focus:outline-none group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-lg font-semibold text-gray-800 pr-4 group-hover:text-gray-900 transition-colors">
            {item.question}
          </h3>
          <ChevronDown 
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}>
          <p className="text-gray-700 leading-relaxed">
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
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%25239C92AC%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22nonzero%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-800 ${
            titleVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Foire aux Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus fréquentes
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <FAQItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h3>
            <p className="text-gray-700 mb-6">
              Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons rapidement.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
