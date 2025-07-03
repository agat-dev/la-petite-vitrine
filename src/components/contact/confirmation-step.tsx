"use client";

import React from 'react';
import { CheckCircle, Mail, Clock } from 'lucide-react';
import { RequestType } from './contact-form';

interface ConfirmationStepProps {
  requestType: RequestType;
  clientName: string;
  email: string;
  onNewRequest: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  requestType,
  clientName,
  email,
  onNewRequest
}) => {
  const isOrder = requestType === 'quote';

  return (
    <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 lg:p-12">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
      
      {/* Reflection lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
      
      <div className="relative z-10 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-green-500" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
          {isOrder ? (
            <>
              <span className="font-display bg-coral-500 bg-clip-text text-transparent">
                Commande
              </span>
              <span className="font-serif text-primary ml-2">confirmée !</span>
            </>
          ) : (
            <>
              <span className="font-display bg-coral-500 bg-clip-text text-transparent">
                Message
              </span>
              <span className="font-serif text-primary ml-2">envoyé !</span>
            </>
          )}
        </h2>

        {/* Confirmation message */}
        <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-2xl p-6 mb-8">
          <p className="text-lg text-primary/80 mb-4">
            Merci <span className="font-semibold text-primary">{clientName}</span> !
          </p>
          
          {isOrder ? (
            <div className="space-y-3 text-primary/70">
              <p>Votre commande de site web a été envoyée avec succès.</p>
              <p>Nous avons envoyé une confirmation à <span className="font-medium text-primary">{email}</span></p>
            </div>
          ) : (
            <div className="space-y-3 text-primary/70">
              <p>Votre demande d&apos;information a été envoyée avec succès.</p>
              <p>Nous avons envoyé une confirmation à <span className="font-medium text-primary">{email}</span></p>
            </div>
          )}
        </div>

        {/* Next steps */}
        <div className="backdrop-blur-sm bg-white/15 border border-white/25 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4 flex items-center justify-center gap-2">
            <Clock className="w-5 h-5" />
            Prochaines étapes
          </h3>
          
          {isOrder ? (
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <p className="text-primary/70">Notre équipe analyse votre projet (24-48h)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <p className="text-primary/70">Nous vous contactons pour finaliser les détails</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <p className="text-primary/70">Création de votre site en 5 jours ouvrés</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-primary/70">
              <p>Nous traitons votre demande et vous répondrons sous 24h</p>
              <p>Vérifiez votre boîte email (et vos spams) pour notre réponse</p>
            </div>
          )}
        </div>

        {/* Contact info */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-primary/60">
            <Mail className="w-4 h-4" />
            <span className="text-sm">
              Une question ? Contactez-nous : <span className="font-medium">contact@lapetitevitrine.com</span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewRequest}
            className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-full font-medium transition-colors"
          >
            {isOrder ? 'Nouvelle commande' : 'Nouvelle demande'}
          </button>
          
          <a
            href="#"
            className="px-8 py-3 backdrop-blur-sm bg-white/20 border border-white/30 text-primary hover:bg-white/25 rounded-full font-medium transition-colors"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
