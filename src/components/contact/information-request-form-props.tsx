"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface InformationRequestFormProps {
  onBack?: () => void;
}

const InformationRequestForm = ({ onBack }: InformationRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande d\'information soumise:', formData);
    toast({
      title: "Demande envoyée !",
      description: "Nous vous recontacterons sous 24h.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary/80 mb-4">
          Demande d'information
        </h2>
        <p className="text-primary/70">
          Décrivez votre demande et nous vous recontacterons rapidement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations personnelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-primary">Prénom *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-primary">Nom *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-primary">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-primary">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
        </div>

        <div>
          <Label htmlFor="company" className="text-primary">Entreprise</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
        </div>

        <div>
          <Label htmlFor="subject" className="text-primary">Sujet de votre demande *</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Ex: Question sur vos services, demande de renseignements..."
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            required
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-primary">Votre message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Décrivez votre demande en détail..."
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            rows={5}
            required
          />
        </div>

        <div className="flex justify-between pt-6">
          {onBack && (
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="bg-white/20 border-white/30 text-primary hover:bg-white/30"
            >
              Retour
            </Button>
          )}
          <Button
            type="submit"
            className="bg-coral-500 hover:bg-coral-500/80 text-white ml-auto"
          >
            Envoyer la demande
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default InformationRequestForm;