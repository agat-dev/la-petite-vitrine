import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

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

  const handleNext = () => {
    if (!subject || !message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setFormData({ additionalInfo: `${subject}: ${message}` });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 bg-white p-8 rounded-lg shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary/80 mb-4">
          Votre demande d&apos;information
        </h2>
        <p className="text-primary/70">
          Décrivez votre demande et nous vous répondrons rapidement
        </p>
      </div>

      <div className="space-y-6">
        {/* Sujet */}
        <div>
          <Label htmlFor="subject" className="text-primary">Sujet de votre demande *</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="informations-services">Informations sur nos services</SelectItem>
              <SelectItem value="tarifs">Questions sur les tarifs</SelectItem>
              <SelectItem value="support">Support technique</SelectItem>
              <SelectItem value="partenariat">Opportunités de partenariat</SelectItem>
              <SelectItem value="conseils">Demande de conseils</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-primary">Votre message *</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre demande en détail..."
            rows={6}
            className="mt-1"
          />
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Retour
        </Button>
        <Button
          type="button"
          onClick={handleNext}
        >
          Envoyer la demande
        </Button>
      </div>
    </motion.div>
  );
};

export default InformationRequestStep;
