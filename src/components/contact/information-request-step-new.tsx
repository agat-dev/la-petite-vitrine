import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface InformationRequestStepProps {
  formData: {
    additionalInfo: string;
  };
  setFormData: (data: { additionalInfo: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const InformationRequestStep = ({ setFormData, onNext, onBack }: InformationRequestStepProps) => {
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState<{[key: string]: string}>({});

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

  const handleNext = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!subject) {
      newErrors.subject = 'Le sujet est obligatoire';
    }
    if (!message.trim()) {
      newErrors.message = 'Le message est obligatoire';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setFormData({ additionalInfo: `${subject}: ${message}` });
      onNext();
    }
  };

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    if (errors.subject) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.subject;
        return newErrors;
      });
    }
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    if (errors.message) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.message;
        return newErrors;
      });
    }
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 lg:p-12">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
      
      {/* Reflection lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 space-y-8"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Votre demande d&apos;information
          </h2>
          <p className="text-primary/70">
            Décrivez votre demande et nous vous répondrons rapidement
          </p>
        </div>

        <div className="space-y-6">
          {/* Sujet */}
          <div>
            <Label htmlFor="subject" className="text-primary font-medium">Sujet de votre demande *</Label>
            <Select value={subject} onValueChange={handleSubjectChange}>
              <SelectTrigger className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm">
                <SelectValue placeholder="Sélectionnez un sujet" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                <SelectItem value="informations-services">Informations sur nos services</SelectItem>
                <SelectItem value="tarifs">Questions sur les tarifs</SelectItem>
                <SelectItem value="support">Support technique</SelectItem>
                <SelectItem value="partenariat">Opportunités de partenariat</SelectItem>
                <SelectItem value="conseils">Demande de conseils</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage error={errors.subject} />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-primary font-medium">Votre message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              placeholder="Décrivez votre demande en détail..."
              rows={6}
              required
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            />
            <ErrorMessage error={errors.message} />
          </div>
        </div>

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
            onClick={handleNext}
            className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium transition-colors"
          >
            Envoyer la demande
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InformationRequestStep;
