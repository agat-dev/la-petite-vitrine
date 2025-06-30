'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RequestTypeStep from './request-type-step';
import ContactInfoStep from './contact-info-step';
import InformationRequestStep from './information-request-step-new';
import { ProjectDetails } from './types';
import QuoteRequestStep from './quote-request-step';

type RequestType = 'information' | 'quote';

interface FormData {
  requestType: RequestType | '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  urgentProject: boolean;
  additionalInfo: string;
  projectDetails: {
    artisanType: string;
    location: string;
    companyAddress: string;
    city: string;
    postalCode: string;
    servicesOffered: string;
    specialty: string;
    targetClients: string;
    contentTone: string;
    uploadedFiles: File[];
    sections: {
      about: boolean;
      services: boolean;
      portfolio: boolean;
      practicalInfo: boolean;
      contactForm: boolean;
    };
    additionalInfo: string;
  };
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    requestType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    urgentProject: false,
    additionalInfo: '',
    projectDetails: {
      artisanType: '',
      location: '',
      companyAddress: '',
      city: '',
      postalCode: '',
      servicesOffered: '',
      specialty: '',
      targetClients: '',
      contentTone: '',
      uploadedFiles: [],
      sections: {
        about: false,
        services: false,
        portfolio: false,
        practicalInfo: false,
        contactForm: false,
      },
      additionalInfo: '',
    },
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProjectDetailsChange = (details: ProjectDetails) => {
    setFormData({ ...formData, projectDetails: details });
  };

  // Définition des étapes selon le type de demande
  const getStepsForRequestType = () => {
    if (formData.requestType === 'information') {
      return [
        'choix', // Étape 0: Choix de l'objet de la demande
        'contact', // Étape 1: Informations de contact
        'information' // Étape 2: Demande d'information
      ];
    } else if (formData.requestType === 'quote') {
      return [
        'choix', // Étape 0: Choix de l'objet de la demande
        'contact', // Étape 1: Informations de contact
        'quote', // Étape 2: Demande de devis
        'details', // Étape 3: Détails du projet
        'summary' // Étape 4: Récapitulatif avec CTA commander
      ];
    } else {
      return ['choix']; // Par défaut, seule l'étape de choix
    }
  };

  const steps = getStepsForRequestType();
  const maxSteps = steps.length - 1;

  const handleNext = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRequestTypeSelection = (type: RequestType) => {
    setFormData({ ...formData, requestType: type });
    setCurrentStep(1); // Aller directement à l'étape "contact"
  };

  const renderCurrentStep = () => {
    const currentStepType = steps[currentStep];

    switch (currentStepType) {
      case 'choix':
        return (
          <RequestTypeStep
            requestType={formData.requestType as RequestType}
            setRequestType={handleRequestTypeSelection}
          />
        );

      case 'contact':
        return (
          <ContactInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
            requestType={formData.requestType as RequestType}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 'information':
        return (
          <InformationRequestStep
            formData={{ additionalInfo: formData.additionalInfo }}
            setFormData={(data) => setFormData({ ...formData, additionalInfo: data.additionalInfo })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 'quote':
        return (
          <QuoteRequestStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 'details':
        return (
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-primary/80 mb-4">
                Détails du projet
              </h2>
              <p className="text-primary/70">
                Aidez-nous à mieux comprendre vos besoins spécifiques
              </p>
            </div>
            
            {/* Ici on peut intégrer le contenu du ProjectDetailsStep existant */}
            <div className="space-y-6">
              <p className="text-center text-gray-600">
                Formulaire de détails du projet (à intégrer)
              </p>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-primary border border-primary/30 rounded hover:bg-primary/10 transition-colors"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Suivant
              </button>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-primary/80 mb-4">
                Récapitulatif de votre commande
              </h2>
              <p className="text-primary/70">
                Vérifiez vos informations avant de finaliser votre commande
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Informations de contact</h3>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
                {formData.company && <p>{formData.company}</p>}
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Détails du projet</h3>
                <p><strong>Type:</strong> {formData.projectType}</p>
                <p><strong>Budget:</strong> {formData.budget}</p>
                <p><strong>Timeline:</strong> {formData.timeline}</p>
                {formData.description && (
                  <div>
                    <strong>Description:</strong>
                    <p className="mt-1 text-gray-600">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-primary border border-primary/30 rounded hover:bg-primary/10 transition-colors"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => alert('Commande envoyée !')}
                className="px-8 py-3 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors"
              >
                Commander
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Indicateur de progression
  const getProgressPercentage = () => {
    return ((currentStep) / maxSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Indicateur de progression */}
        {formData.requestType && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Étape {currentStep + 1} sur {steps.length}</span>
              <span>{Math.round(getProgressPercentage())}% completé</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Étape courante */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentStep()}
        </motion.div>
      </div>
    </div>
  );
};

export default MultiStepForm;
