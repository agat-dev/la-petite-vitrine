'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import RequestTypeStep from './request-type-step';
import ContactInfoStep from './contact-info-step';
import InformationRequestStep from './information-request-step-new';
import { ProjectDetails, MultiStepFormData, RequestType } from './types';
import ProductSelectionStep from './product-selection-step';
import ProjectDetailsStep from './project-details-step';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<MultiStepFormData>({
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

  const handleInputChange = (field: keyof MultiStepFormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Effacer l'erreur pour ce champ si elle existe
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleProjectDetailsChange = (details: ProjectDetails) => {
    setFormData({ ...formData, projectDetails: details });
    // Effacer les erreurs pour les champs de détails du projet
    const projectFieldErrors = ['artisanType', 'location', 'city'];
    if (projectFieldErrors.some(field => validationErrors[field])) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        projectFieldErrors.forEach(field => delete newErrors[field]);
        return newErrors;
      });
    }
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
        'product', // Étape 2: Sélection du produit
        'details', // Étape 3: Détails du projet
        'summary' // Étape 4: Récapitulatif avec CTA commander
      ];
    } else {
      return ['choix']; // Par défaut, seule l'étape de choix
    }
  };

  const steps = getStepsForRequestType();
  const maxSteps = steps.length - 1;

  // Fonction de validation selon l'étape courante
  const validateCurrentStep = () => {
    const currentStepType = steps[currentStep];
    const errors: {[key: string]: string} = {};

    switch (currentStepType) {
      case 'contact':
        // Validation des informations de contact
        if (!formData.firstName.trim()) {
          errors.firstName = 'Le prénom est obligatoire';
        }
        if (!formData.lastName.trim()) {
          errors.lastName = 'Le nom est obligatoire';
        }
        if (!formData.email.trim()) {
          errors.email = 'L\'email est obligatoire';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = 'Veuillez saisir un email valide';
        }
        
        // Pour le flow commande, téléphone et entreprise sont obligatoires
        if (formData.requestType === 'quote') {
          if (!formData.phone.trim()) {
            errors.phone = 'Le téléphone est obligatoire pour une commande';
          }
          if (!formData.company.trim()) {
            errors.company = 'L\'entreprise est obligatoire pour une commande';
          }
        }
        break;

      case 'information':
        // Cette validation est déjà gérée dans le composant information-request-step
        break;

      case 'details':
        // Validation des détails du projet
        if (!formData.projectDetails.artisanType) {
          errors.artisanType = 'Le type d\'artisan est obligatoire';
        }
        if (!formData.projectDetails.location) {
          errors.location = 'La zone d\'intervention est obligatoire';
        }
        if (!formData.projectDetails.city) {
          errors.city = 'La ville est obligatoire';
        }
        break;

      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fonction pour maintenir la position du formulaire
  const scrollToFormTop = () => {
    if (formRef.current) {
      const formRect = formRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const formTopPosition = currentScrollY + formRect.top - 100; // 100px de marge
      
      window.scrollTo({
        top: formTopPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    // Valider l'étape courante avant de passer à la suivante
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
      // Délai pour permettre à l'animation de commencer, puis scroll
      setTimeout(() => {
        scrollToFormTop();
      }, 150);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Délai pour permettre à l'animation de commencer, puis scroll
      setTimeout(() => {
        scrollToFormTop();
      }, 150);
    }
  };

  const handleRequestTypeSelection = (type: RequestType) => {
    setFormData({ ...formData, requestType: type });
    setCurrentStep(1); // Aller directement à l'étape "contact"
    // Délai pour permettre à l'animation de commencer, puis scroll
    setTimeout(() => {
      scrollToFormTop();
    }, 150);
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
            validationErrors={validationErrors}
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

      case 'product':
        return (
          <ProductSelectionStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );

      case 'details':
        return (
          <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 shadow-2xl">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
            
            {/* Reflection lines */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
            
            <div className="relative z-10">
              <ProjectDetailsStep
                projectDetails={formData.projectDetails}
                setProjectDetails={handleProjectDetailsChange}
                validationErrors={validationErrors}
              />
              
              <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 text-primary/70 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
                >
                  Retour
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium transition-colors shadow-lg"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 shadow-2xl">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
            
            {/* Reflection lines */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  Récapitulatif de votre commande
                </h2>
                <p className="text-primary/70">
                  Vérifiez vos informations avant de finaliser votre commande
                </p>
              </div>

              <div className="space-y-8">
                {/* Informations de contact */}
                <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-primary">Informations de contact</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-primary/80">Nom :</span>
                      <span className="ml-2 text-primary">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary/80">Email :</span>
                      <span className="ml-2 text-primary">{formData.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary/80">Téléphone :</span>
                      <span className="ml-2 text-primary">{formData.phone || 'Non renseigné'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary/80">Entreprise :</span>
                      <span className="ml-2 text-primary">{formData.company || 'Non renseigné'}</span>
                    </div>
                  </div>
                </div>

                {/* Produit commandé */}
                <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-primary">📦 Produit commandé</h3>
                  <div className="bg-coral-500/10 border border-coral-500/30 rounded-xl p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold text-primary">Votre site web d&apos;artisan</h4>
                      <div className="text-2xl font-bold text-coral-500">390€ HT</div>
                    </div>
                    <p className="text-primary/80 mb-4">Toutes les fonctionnalités personnalisées</p>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Site web d&apos;une page</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Identité visuelle</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Contenu optimisé premium</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Section Services</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Section Avis clients</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Section A propos</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Section FAQ</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Formulaire de contact</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Hébergement 1 an</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Nom de domaine 1 an</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                        <span className="text-primary">Maintenance 1 an</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-primary/80 text-sm">
                        <strong>Coût de maintenance :</strong> Puis 9€ par mois pour l&apos;hébergement, nom de domaine et maintenance
                      </p>
                    </div>
                  </div>
                </div>

                {/* Détails du projet */}
                <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-primary">Informations détaillées du projet</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-primary/80">Type d&apos;artisan :</span>
                      <span className="ml-2 text-primary">{formData.projectDetails.artisanType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary/80">Zone d&apos;intervention :</span>
                      <span className="ml-2 text-primary">{formData.projectDetails.location}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary/80">Ville :</span>
                      <span className="ml-2 text-primary">{formData.projectDetails.city}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary/80">Code postal :</span>
                      <span className="ml-2 text-primary">{formData.projectDetails.postalCode}</span>
                    </div>
                    {formData.projectDetails.companyAddress && (
                      <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                        <span className="font-medium text-primary/80">Adresse entreprise :</span>
                        <span className="ml-2 text-primary">{formData.projectDetails.companyAddress}</span>
                      </div>
                    )}
                    {formData.projectDetails.specialty && (
                      <div>
                        <span className="font-medium text-primary/80">Spécialité :</span>
                        <span className="ml-2 text-primary">{formData.projectDetails.specialty}</span>
                      </div>
                    )}
                    {formData.projectDetails.targetClients && (
                      <div>
                        <span className="font-medium text-primary/80">Clients ciblés :</span>
                        <span className="ml-2 text-primary">{formData.projectDetails.targetClients}</span>
                      </div>
                    )}
                  </div>

                  {formData.projectDetails.servicesOffered && (
                    <div className="mt-4">
                      <span className="font-medium text-primary/80">Services proposés :</span>
                      <p className="mt-1 text-primary bg-white/10 p-3 rounded-lg border border-white/20">{formData.projectDetails.servicesOffered}</p>
                    </div>
                  )}

                  {formData.projectDetails.contentTone && (
                    <div className="mt-4">
                      <span className="font-medium text-primary/80">Ton du contenu :</span>
                      <p className="mt-1 text-primary bg-white/10 p-3 rounded-lg border border-white/20">{formData.projectDetails.contentTone}</p>
                    </div>
                  )}

                  {/* Sections à inclure */}
                  <div className="mt-4">
                    <span className="font-medium text-primary/80">Sections à inclure :</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(formData.projectDetails.sections).map(([key, value]) => 
                        value && (
                          <span key={key} className="px-3 py-1 bg-coral-500/20 text-coral-300 rounded-full text-xs border border-coral-500/30 backdrop-blur-sm">
                            {key === 'about' && 'À propos'}
                            {key === 'services' && 'Services'}
                            {key === 'portfolio' && 'Réalisations'}
                            {key === 'practicalInfo' && 'Infos pratiques'}
                            {key === 'contactForm' && 'Formulaire de contact'}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Fichiers uploadés */}
                  {formData.projectDetails.uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <span className="font-medium text-primary/80">Fichiers joints :</span>
                      <div className="mt-2 space-y-1">
                        {formData.projectDetails.uploadedFiles.map((file, index) => (
                          <div key={index} className="text-xs text-primary bg-white/10 p-2 rounded border border-white/20 backdrop-blur-sm">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.projectDetails.additionalInfo && (
                    <div className="mt-4">
                      <span className="font-medium text-primary/80">Informations supplémentaires :</span>
                      <p className="mt-1 text-primary bg-white/10 p-3 rounded-lg border border-white/20">{formData.projectDetails.additionalInfo}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 text-primary/70 hover:text-primary transition-colors backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => alert('Commande envoyée !')}
                  className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium transition-colors shadow-lg"
                >
                  Commander
                </button>
              </div>
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
    <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-36">
      {/* Background with subtle gradient - same as hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 via-blue-500/30 to-blue-500/80"></div>

      {/* SVG Background sophistiqué - thème bleu héroïque */}
      <div className="absolute inset-0 opacity-40">
        {/* Vagues dynamiques principales */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,300 Q200,150 400,250 T800,200 Q1000,150 1200,300 L1200,0 L0,0 Z" 
            fill="url(#formGradient1)" 
            opacity="0.5"
          />
          <path 
            d="M0,500 Q300,350 600,450 T1200,400 L1200,800 L0,800 Z" 
            fill="url(#formGradient2)" 
            opacity="0.4"
          />
          <defs>
            <linearGradient id="formGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#69AFC8" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#F6E6D7" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#69AFC8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="formGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#69AFC8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Formes géométriques flottantes */}
        <svg className="absolute top-1/4 right-0 w-2/3 h-1/2" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path 
            d="M0,150 Q100,50 200,100 T400,150 L400,0 L0,0 Z" 
            fill="rgba(105, 175, 200, 0.3)" 
          />
        </svg>

        <svg className="absolute bottom-1/4 left-0 w-1/2 h-1/3" viewBox="0 0 300 200" preserveAspectRatio="none">
          <path 
            d="M0,100 Q75,25 150,75 T300,100 L300,200 L0,200 Z" 
            fill="rgba(201, 100, 90, 0.3)" 
          />
        </svg>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div ref={formRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-center mb-8 animate-fade-in">
            <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
              Réalisons
            </span>
            <span className="font-serif font-light italic text-primary ml-4">Ensemble</span>
          </h1>
          <p className="text-xl text-primary/80 max-w-2xl mx-auto">
            Démarrez votre projet dès aujourd&apos;hui. Choisissez votre parcours et laissez-nous vous accompagner dans votre réussite.
          </p>
        </div>

        {/* Indicateur de progression */}
        {formData.requestType && (
          <div className="mb-12">
            <div className="flex justify-between text-sm text-primary/70 mb-2">
              <span>Étape {currentStep + 1} sur {steps.length}</span>
              <span>{Math.round(getProgressPercentage())}% completé</span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 border border-white/30">
              <motion.div
                className="bg-coral-500 h-2 rounded-full shadow-lg"
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
    </section>
  );
};

export default MultiStepForm;
