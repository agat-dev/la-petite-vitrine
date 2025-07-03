import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface SummaryStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    requestType: string;
    subject?: string;
    message?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    description?: string;
    urgentProject?: boolean;
    businessName?: string;
    activity?: string;
    city?: string;
    postalCode?: string;
    targetAudience?: string;
    currentWebsite?: string;
    sections?: {
      about: boolean;
      services: boolean;
      portfolio: boolean;
      practicalInfo: boolean;
      contactForm: boolean;
    };
    additionalInfo?: string;
  };
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: string) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ formData, onSubmitSuccess, onSubmitError }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      if (onSubmitError) {
        onSubmitError('Une erreur s\'est produite lors de l\'envoi de votre demande. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Récapitulatif de votre demande</h2>
        
        {/* Informations de contact */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Informations de contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Prénom :</strong> {formData.firstName}</p>
            <p><strong>Nom :</strong> {formData.lastName}</p>
            <p><strong>Email :</strong> {formData.email}</p>
            <p><strong>Téléphone :</strong> {formData.phone}</p>
            {formData.company && <p><strong>Entreprise :</strong> {formData.company}</p>}
          </div>
        </div>

        {/* Type de demande */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Type de demande</h3>
          <p className="text-sm">
            <strong>{formData.requestType === 'information' ? 'Demande d\'information' : 'Commande de site web'}</strong>
          </p>
        </div>

        {/* Détails selon le type de demande */}
        {formData.requestType === 'information' && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Détails de votre demande</h3>
            <div className="space-y-2 text-sm">
              {formData.subject && <p><strong>Sujet :</strong> {formData.subject}</p>}
              {formData.message && (
                <div>
                  <strong>Message :</strong>
                  <p className="mt-1 text-gray-700">{formData.message}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {formData.requestType === 'quote' && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Détails du projet</h3>
            <div className="space-y-2 text-sm">
              {formData.businessName && <p><strong>Nom de l'entreprise :</strong> {formData.businessName}</p>}
              {formData.activity && <p><strong>Activité :</strong> {formData.activity}</p>}
              {formData.city && <p><strong>Ville :</strong> {formData.city}</p>}
              {formData.projectType && <p><strong>Type de projet :</strong> {formData.projectType}</p>}
              {formData.budget && <p><strong>Budget :</strong> {formData.budget}</p>}
              {formData.timeline && <p><strong>Délai souhaité :</strong> {formData.timeline}</p>}
              {formData.urgentProject && <p><strong>Projet urgent :</strong> Oui</p>}
              
              {formData.sections && (
                <div>
                  <strong>Sections souhaitées :</strong>
                  <ul className="list-disc list-inside mt-1 text-gray-700">
                    {formData.sections.about && <li>À propos</li>}
                    {formData.sections.services && <li>Services</li>}
                    {formData.sections.portfolio && <li>Portfolio</li>}
                    {formData.sections.practicalInfo && <li>Informations pratiques</li>}
                    {formData.sections.contactForm && <li>Formulaire de contact</li>}
                  </ul>
                </div>
              )}
              
              {formData.description && (
                <div>
                  <strong>Description :</strong>
                  <p className="mt-1 text-gray-700">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {formData.additionalInfo && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Informations supplémentaires</h3>
            <p className="text-sm text-gray-700">{formData.additionalInfo}</p>
          </div>
        )}
      </div>

      {/* Bouton d'envoi */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-medium"
          size="lg"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
