"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from './step-indicator';
import RequestTypeStep from './request-type-step';
import ContactInfoStep from './contact-info-step';
import RequestDetailsStep from './request-details-step';
import ProjectDetailsStep, { ProjectDetails } from './project-details-step';

export type RequestType = 'information' | 'quote';

export interface FormData {
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
}

export interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  specifications: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [requestType, setRequestType] = useState<RequestType>('quote');
  const [formData, setFormData] = useState<FormData>({
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
    urgentProject: false
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, product: '', quantity: 1, specifications: '' }
  ]);

  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
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
      about: true,
      services: true,
      portfolio: false,
      practicalInfo: false,
      contactForm: true,
    },
    additionalInfo: '',
  });

  const totalSteps = requestType === 'information' ? 4 : 5;

  // Scroll automatique au sommet du formulaire lors du changement d'étape
  useEffect(() => {
    if (formRef.current) {
      const yOffset = -100; // Offset pour laisser un peu d'espace au-dessus
      const element = formRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (requestType === 'information') {
      console.log('Demande d\'information soumise:', formData);
      toast({
        title: "Demande envoyée !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
    } else {
      console.log('Demande de devis soumise:', { formData, orderItems, projectDetails });
      toast({
        title: "Demande de devis envoyée !",
        description: "Nous vous enverrons votre devis personnalisé sous 24h.",
      });
    }

    // Reset form
    setFormData({
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
      urgentProject: false
    });
    setOrderItems([{ id: 1, product: '', quantity: 1, specifications: '' }]);
    setProjectDetails({
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
        about: true,
        services: true,
        portfolio: false,
        practicalInfo: false,
        contactForm: true,
      },
      additionalInfo: '',
    });
    setCurrentStep(1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        // À l'étape 1, on choisit le type de demande - toujours possible
        return true;
      case 2:
        // À l'étape 2, validation des informations de contact selon le type choisi
        if (requestType === 'quote') {
          return formData.firstName && formData.lastName && formData.email && formData.phone && formData.company;
        } else {
          return formData.firstName && formData.lastName && formData.email;
        }
      case 3:
        // À l'étape 3, validation des détails du projet
        return projectDetails.artisanType && projectDetails.location && projectDetails.city;
      case 4:
        if (requestType === 'information') {
          return formData.subject && formData.message;
        } else {
          return orderItems.some(item => item.product);
        }
      default:
        return false;
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      x: 15,
      scale: 0.99
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1
    },
    exit: { 
      opacity: 0, 
      x: -15,
      scale: 0.99
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.01
    },
    tap: { 
      scale: 0.99
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RequestTypeStep 
            requestType={requestType} 
            setRequestType={setRequestType} 
          />
        );
      case 2:
        return (
          <ContactInfoStep 
            formData={formData} 
            handleInputChange={handleInputChange}
            requestType={requestType}
          />
        );
      case 3:
        return (
          <ProjectDetailsStep
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        if (requestType === 'information') {
          return (
            <RequestDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
              requestType={requestType}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
            />
          );
        } else {
          return (
            <RequestDetailsStep
              formData={formData}
              handleInputChange={handleInputChange}
              requestType={requestType}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
              showOrderItems={true}
            />
          );
        }
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-primary/80 mb-4">
                Résumé de votre demande
              </h2>
              <p className="text-primary/70 mb-6">
                Vérifiez vos informations avant envoi
              </p>
            </div>
            <div className="bg-white/40 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-primary">Informations personnelles</h3>
              <p><strong>Nom:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Téléphone:</strong> {formData.phone}</p>
              {formData.company && <p><strong>Entreprise:</strong> {formData.company}</p>}
              
              <h3 className="font-semibold text-primary mt-6">Détails du projet</h3>
              <p><strong>Type d'artisan:</strong> {projectDetails.artisanType}</p>
              <p><strong>Zone d'intervention:</strong> {projectDetails.location}</p>
              <p><strong>Ville:</strong> {projectDetails.city} ({projectDetails.postalCode})</p>
              {projectDetails.servicesOffered && <p><strong>Services:</strong> {projectDetails.servicesOffered}</p>}
              
              <h3 className="font-semibold text-primary mt-6">Fichiers joints</h3>
              <p>{projectDetails.uploadedFiles.length} fichier(s) joint(s)</p>
            </div>
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep}>
                Retour
              </Button>
              <Button onClick={handleSubmit} variant="submit">
                Envoyer la demande
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-36">
      {/* Background with subtle gradient - matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 via-blue-500/30 to-blue-500/80"></div>

      {/* SVG Background sophistiqué - thème bleu héroïque contact */}
      <div className="absolute inset-0 opacity-40">
        {/* Vagues dynamiques principales */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,350 Q250,200 500,300 T1000,250 Q1100,200 1200,350 L1200,0 L0,0 Z" 
            fill="url(#contactGradient1)" 
            opacity="0.5"
          />
          <path 
            d="M0,450 Q350,300 700,400 T1200,350 L1200,800 L0,800 Z" 
            fill="url(#contactGradient2)" 
            opacity="0.4"
          />
          <defs>
            <linearGradient id="contactGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#69AFC8" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#F6E6D7" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#69AFC8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="contactGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#69AFC8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {/* Formes géométriques de communication */}
        <svg className="absolute top-1/6 left-0 w-1/2 h-1/2" viewBox="0 0 300 250" preserveAspectRatio="none">
          <path 
            d="M0,125 Q75,50 150,125 Q225,200 300,125 L300,0 L0,0 Z" 
            fill="rgba(105, 175, 200, 0.3)" 
          />
        </svg>

        <svg className="absolute bottom-1/6 right-0 w-3/5 h-2/5" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path 
            d="M400,100 Q300,25 200,75 Q100,125 0,50 L0,200 L400,200 Z" 
            fill="rgba(246, 230, 215, 0.4)" 
          />
        </svg>

        {/* Éléments de connexion et communication */}
        <svg className="absolute top-1/4 right-1/4 w-80 h-80" viewBox="0 0 200 200">
          <path 
            d="M50,100 Q100,50 150,100 Q100,150 50,100" 
            stroke="rgba(105, 175, 200, 0.6)" 
            strokeWidth="2.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          <circle cx="50" cy="100" r="8" fill="rgba(105, 175, 200, 0.4)" 
                  className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="150" cy="100" r="8" fill="rgba(201, 100, 90, 0.4)" 
                  className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          <circle cx="100" cy="70" r="6" fill="rgba(246, 230, 215, 0.6)" 
                  className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="100" cy="130" r="6" fill="rgba(246, 230, 215, 0.6)" 
                  className="animate-pulse" style={{ animationDelay: '2.5s' }} />
        </svg>

        {/* Lignes de messages flottantes */}
        <svg className="absolute bottom-1/4 left-1/6 w-72 h-72" viewBox="0 0 180 180">
          <path 
            d="M20,60 Q50,20 80,60 Q110,100 140,60" 
            stroke="rgba(246, 230, 215, 0.7)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1.8s' }}
          />
          <path 
            d="M30,90 Q60,50 90,90 Q120,130 150,90" 
            stroke="rgba(105, 175, 200, 0.4)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.8s' }}
          />
          <path 
            d="M10,120 Q40,80 70,120 Q100,160 130,120" 
            stroke="rgba(201, 100, 90, 0.5)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2.8s' }}
          />
        </svg>

        {/* Icônes de contact stylisées */}
        <svg className="absolute top-1/3 left-1/8 w-64 h-64" viewBox="0 0 150 150">
          <rect x="40" y="50" width="70" height="50" rx="8" 
                stroke="rgba(105, 175, 200, 0.5)" strokeWidth="2" fill="none"
                className="animate-pulse" style={{ animationDelay: '1.2s' }} />
          <path d="M40,50 L75,75 L110,50" 
                stroke="rgba(201, 100, 90, 0.6)" strokeWidth="2" fill="none"
                className="animate-pulse" style={{ animationDelay: '1.7s' }} />
        </svg>
      </div>

      {/* Animated background elements - matching hero */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4" ref={formRef}>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-center mb-8 animate-fade-in">
            <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
              Commandez 
            </span>
            <span className="font-serif font-light italic text-primary ml-4">votre site</span>
          </h1>
          <p className="text-xl text-primary/90 max-w-2xl mx-auto">
            Suivez les étapes pour nous faire part de votre demande
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-white/30 to-white/50 backdrop-blur-sm text-primary rounded-t-3xl border-b border-white/20">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.15 }}
            >
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </motion.div>
          </CardHeader>
          <CardContent className="p-8 text-primary">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.15,
                  ease: "easeOut"
                }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
            
            <motion.div 
              className="flex justify-between mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.15 }}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.1 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="bg-white border-white/30 text-primary hover:bg-white/90"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              </motion.div>

              {currentStep === totalSteps ? (
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ duration: 0.1 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className={requestType === 'information' 
                      ? 'bg-primary hover:bg-primary text-white backdrop-blur-sm' 
                      : 'bg-coral-500/80 hover:bg-coral-500/80 backdrop-blur-sm'
                    }
                  >
                    {requestType === 'information' ? 'Envoyer la demande' : 'Demander le devis'}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ duration: 0.1 }}
                >
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="bg-white border-white/30 text-primary hover:bg-white/80"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
