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
            <div className="space-y-4">
              <div className="backdrop-blur-sm bg-coral-500/10 border border-coral-500/30 rounded-xl p-4">
                <h4 className="text-xl font-semibold text-coral-600 mb-2">🎉 Commande confirmée !</h4>
                <p className="text-primary/80">Votre commande de site web professionnel a été envoyée avec succès.</p>
              </div>
              
              <div className="space-y-3 text-primary/70">
                <p>✅ Confirmation envoyée à <span className="font-medium text-primary">{email}</span></p>
                <p>✅ Notre équipe a reçu votre demande</p>
                <p>✅ Votre projet est maintenant en cours de traitement</p>
              </div>
              
              <div className="backdrop-blur-sm bg-green-500/10 border border-green-500/30 rounded-xl p-4 mt-4">
                <p className="text-green-700 font-medium text-center">
                  📧 Vous recevrez un email de notre équipe dans les prochaines heures
                </p>
              </div>
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
            <div className="space-y-4">
              <div className="backdrop-blur-sm bg-coral-500/5 border border-coral-500/20 rounded-xl p-4">
                <h4 className="font-semibold text-coral-600 mb-3 text-center">🚀 Processus de création de votre site</h4>
                <div className="space-y-3 text-left max-w-lg mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">1</div>
                    <div>
                      <p className="text-primary font-medium">Analyse de votre projet</p>
                      <p className="text-primary/60 text-sm">Notre équipe étudie vos besoins (24-48h)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">2</div>
                    <div>
                      <p className="text-primary font-medium">Contact et finalisation</p>
                      <p className="text-primary/60 text-sm">Nous vous contactons pour les derniers détails</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">3</div>
                    <div>
                      <p className="text-primary font-medium">Création de votre site</p>
                      <p className="text-primary/60 text-sm">Développement en 5 jours ouvrés maximum</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">4</div>
                    <div>
                      <p className="text-primary font-medium">Livraison et mise en ligne</p>
                      <p className="text-primary/60 text-sm">Votre site est prêt et accessible !</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-center text-primary/70">
                  <span className="font-medium text-blue-600">💡 Astuce :</span> Préparez vos textes, images et informations de contact pour accélérer le processus
                </p>
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
            {isOrder ? '🚀 Nouvelle commande' : 'Nouvelle demande'}
          </button>
          
          <a
            href="#"
            className="px-8 py-3 backdrop-blur-sm bg-white/20 border border-white/30 text-primary hover:bg-white/25 rounded-full font-medium transition-colors"
          >
            🏠 Retour à l&apos;accueil
          </a>
          
          {isOrder && (
            <a
              href="mailto:contact@lapetitevitrine.com"
              className="px-8 py-3 backdrop-blur-sm bg-blue-500/10 border border-blue-500/30 text-blue-600 hover:bg-blue-500/15 rounded-full font-medium transition-colors"
            >
              📧 Nous contacter
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
