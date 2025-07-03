
import React from 'react';
import { RequestType } from './types';

interface RequestTypeStepProps {
  requestType: RequestType;
  setRequestType: (type: RequestType) => void;
}

const RequestTypeStep = ({ requestType, setRequestType }: RequestTypeStepProps) => {
  return (
    <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 lg:p-12">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
      
      {/* Reflection lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
      
      <div className="relative z-10 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Quel est l&apos;objet de votre demande ?
          </h2>
          <p className="text-primary/70">
            Choisissez le type de demande pour personnaliser votre parcours
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 max-w-5xl mx-auto">
          {/* CTA Contact */}
          <div 
            onClick={() => setRequestType('information')}
            className={`group relative flex-1 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
              requestType === 'information' 
                ? 'ring-2 ring-cream-100 rounded-3xl' 
                : 'hover:bg-white/20'
            }`}
          >
            <div className="relative backdrop-blur-xl bg-white/50 border border-white/50 rounded-3xl p-8 lg:p-10 h-full overflow-hidden">
              {/* Enhanced inner glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 via-white/30 to-transparent group-hover:from-white/80 group-hover:via-white/40 transition-all duration-500"></div>
              
              {/* Multiple reflection lines for depth */}
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/80 via-white/30 to-transparent"></div>
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent"></div>
              
              {/* Subtle corner highlights */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/30 to-transparent rounded-br-3xl"></div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-coral-500140 to-coral-500/15 border border-coral-500/40 mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10 text-coral-500/50 group-hover:text-coral-500/50 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-primary mb-3 group-hover:text-primary/90 transition-colors duration-300">
                  Nous contacter
                </h3>
                <p className="text-primary/80 text-base leading-relaxed mb-4">
                  Questions générales, informations sur nos services, demandes de renseignements
                </p>
                
                {/* Enhanced selection indicator */}
                {requestType === 'information' && (
                  <div className="mt-6 inline-flex items-center text-coral-500 text-base font-semibold bg-coral-500/10 px-4 py-2 rounded-full border border-coral-500/30 backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sélectionné
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Commande */}
          <div 
            onClick={() => setRequestType('quote')}
            className={`group relative flex-1 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
              requestType === 'quote' 
                ? 'ring-2 ring-coral-500/50 rounded-3xl' 
                : 'hover:bg-white/25'
            }`}
          >
            <div className="relative backdrop-blur-xl bg-white/50 border border-white/50 rounded-3xl p-8 lg:p-10 h-full overflow-hidden">
              {/* Enhanced inner glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 via-white/30 to-transparent group-hover:from-white/80 group-hover:via-white/40 transition-all duration-500"></div>
              
              {/* Multiple reflection lines for depth */}
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/80 via-white/30 to-transparent"></div>
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent"></div>
              
              {/* Subtle corner highlights */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/30 to-transparent rounded-br-3xl"></div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-coral-500/15 to-coral-500/10 border border-coral-500/30 mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10 text-coral-500 group-hover:text-coral-500/80 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-primary mb-3 group-hover:text-primary/90 transition-colors duration-300">
                  Commander
                </h3>
                <p className="text-primary/80 text-base leading-relaxed mb-4">
                  Demande de devis personnalisé pour votre projet d&apos;artisanat
                </p>
                
                {/* Enhanced selection indicator */}
                {requestType === 'quote' && (
                  <div className="mt-6 inline-flex items-center text-coral-500 text-base font-semibold bg-coral-500/10 px-4 py-2 rounded-full border border-coral-500/30 backdrop-blur-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sélectionné
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTypeStep;
