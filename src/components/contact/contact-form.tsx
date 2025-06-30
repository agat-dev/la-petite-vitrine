"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ContactInfoStep from "./contact-info-step";
import RequestTypeStep from "./request-type-step";
import InformationRequestStepNew from "./information-request-step-new";  
import QuoteRequestStep from "./quote-request-step";
import { ProjectDetailsStep } from "./project-details-step";
import SummaryStep from "./summary-step";
import StepIndicator from "./step-indicator";

export type RequestType = 'information' | 'quote';

export interface FormData {
  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  
  // Request Type
  requestType: RequestType;
  
  // Information Request
  subject: string;
  message: string;
  
  // Quote Request
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  urgentProject: boolean;
  
  // Project Details  
  businessName: string;
  activity: string;
  city: string;
  postalCode: string;
  targetAudience: string;
  currentWebsite: string;
  sections: {
    about: boolean;
    services: boolean;
    portfolio: boolean;
    practicalInfo: boolean;
    contactForm: boolean;
  };
  additionalInfo: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    requestType: 'information',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    urgentProject: false,
    businessName: '',
    activity: '',
    city: '',
    postalCode: '',
    targetAudience: '',
    currentWebsite: '',
    sections: {
      about: false,
      services: false,
      portfolio: false,
      practicalInfo: false,
      contactForm: false,
    },
    additionalInfo: '',
  });

  // Calculate total steps based on request type
  const totalSteps = formData.requestType === 'information' ? 3 : 5;

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0: // Request Type
        return formData.requestType !== '';
      case 1: // Contact Info
        return !!(formData.firstName && formData.lastName && formData.email);
      case 2: // Information Request or Quote Request
        if (formData.requestType === 'information') {
          return !!(formData.message);
        } else {
          return !!(formData.projectType && formData.budget && formData.timeline);
        }
      case 3: // Project Details (only for quote)
        return formData.requestType === 'quote' ? !!(formData.businessName && formData.activity) : true;
      case 4: // Summary (only for quote)
        return formData.requestType === 'quote';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    toast({
      title: "Formulaire envoyé !",
      description: "Nous vous recontacterons sous 24h.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <RequestTypeStep
            requestType={formData.requestType}
            setRequestType={(type: RequestType) => setFormData(prev => ({ ...prev, requestType: type }))}
          />
        );
      case 1:
        return (
          <ContactInfoStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        if (formData.requestType === 'information') {
          return (
            <InformationRequestStepNew
              formData={{ subject: formData.subject, message: formData.message }}
              setFormData={(data) => setFormData(prev => ({ ...prev, ...data }))}
            />
          );
        } else {
          return (
            <QuoteRequestStep
              formData={formData}
              setFormData={setFormData}
            />
          );
        }
      case 3:
        return (
          <ProjectDetailsStep
            projectDetails={{
              businessName: formData.businessName,
              activity: formData.activity,
              city: formData.city,
              postalCode: formData.postalCode,
              targetAudience: formData.targetAudience,
              currentWebsite: formData.currentWebsite,
              sections: formData.sections,
              additionalInfo: formData.additionalInfo
            }}
            setProjectDetails={(details) => 
              setFormData(prev => ({ ...prev, ...details }))
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <SummaryStep
            formData={formData}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps}
          requestType={formData.requestType}
        />
        
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          {renderStepContent()}
          
          {currentStep !== 1 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-3 text-primary/70 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Retour
              </button>
              
              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium transition-colors"
                >
                  Envoyer
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;