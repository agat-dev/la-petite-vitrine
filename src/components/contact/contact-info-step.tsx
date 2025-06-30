import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RequestType, MultiStepFormData } from './types';

interface ContactInfoStepProps {
  formData: MultiStepFormData;
  handleInputChange: (field: keyof MultiStepFormData, value: string | boolean) => void;
  requestType: RequestType;
  validationErrors?: {[key: string]: string};
  onNext: () => void;
  onBack: () => void;
}

const ContactInfoStep = ({ formData, handleInputChange, requestType, validationErrors = {}, onNext, onBack }: ContactInfoStepProps) => {
  // Composant pour afficher les messages d'erreur
  const ErrorMessage = ({ error }: { error?: string }) => {
    return (
      <div className="h-6 mt-1">
        {error && (
          <p className="text-sm text-coral-500">
            {error}
          </p>
        )}
      </div>
    );
  };

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
            Vos informations de contact
          </h2>
          <p className="text-primary/70">
            {requestType === 'quote' 
              ? "Ces informations nous permettront de vous recontacter pour votre devis" 
              : "Ces informations nous permettront de vous répondre"
            }
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-primary font-medium">Prénom *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            />
            <ErrorMessage error={validationErrors.firstName} />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-primary font-medium">Nom *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            />
            <ErrorMessage error={validationErrors.lastName} />
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-primary font-medium">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            />
            <ErrorMessage error={validationErrors.email} />
          </div>
          <div>
            <Label htmlFor="phone" className="text-primary font-medium">Téléphone {requestType === 'quote' ? '*' : ''}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required={requestType === 'quote'}
              placeholder="Votre numéro de téléphone"
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            />
            <ErrorMessage error={validationErrors.phone} />
          </div>
        </div>

        {requestType === 'quote' && (
          <div>
            <Label htmlFor="company" className="text-primary font-medium">Entreprise *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              required
              placeholder="Nom de votre entreprise"
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            />
            <ErrorMessage error={validationErrors.company} />
          </div>
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-primary/70 hover:text-primary transition-colors backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
          >
            Retour
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium transition-colors"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep;
