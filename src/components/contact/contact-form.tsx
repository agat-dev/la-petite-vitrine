"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from './step-indicator';
import RequestTypeStep from './request-type-step';
import ContactInfoStep from './contact-info-step';
import RequestDetailsStep from './request-details-step';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [requestType, setRequestType] = useState<RequestType>('information');
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

  const totalSteps = requestType === 'information' ? 3 : 4;

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
      console.log('Demande de devis soumise:', { formData, orderItems });
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
    setCurrentStep(1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true; // Type selection always allows proceeding
      case 2:
        return formData.firstName && formData.lastName && formData.email && 
               (requestType === 'information' || (formData.phone && formData.company));
      case 3:
        if (requestType === 'information') {
          return formData.subject && formData.message;
        } else {
          return formData.projectType;
        }
      case 4:
        return requestType === 'quote' && orderItems.some(item => item.product);
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
          <RequestDetailsStep
            formData={formData}
            handleInputChange={handleInputChange}
            requestType={requestType}
            orderItems={orderItems}
            setOrderItems={setOrderItems}
          />
        );
      case 4:
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-300">
            Suivez les étapes pour nous faire part de votre demande
          </p>
        </div>

        <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600/80 to-green-600/80 backdrop-blur-sm text-white rounded-t-lg border-b border-white/20">
            <CardTitle className="text-2xl text-center">
              Formulaire de contact
            </CardTitle>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.15 }}
            >
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            </motion.div>
          </CardHeader>
          <CardContent className="p-8 text-white">
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
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
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
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className={requestType === 'information' 
                      ? 'bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm' 
                      : 'bg-green-600/80 hover:bg-green-700/80 backdrop-blur-sm'
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
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
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
    </div>
  );
};

export default ContactForm;
