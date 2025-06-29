
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormData, RequestType } from './contact-form';

interface ContactInfoStepProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  requestType: RequestType;
}

const ContactInfoStep = ({ formData, handleInputChange, requestType }: ContactInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Vos informations de contact
        </h2>
        <p className="text-gray-300">
          Ces informations nous permettront de vous recontacter
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-white">Prénom *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
            className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-white">Nom *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
            className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-white">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-white">Téléphone {requestType === 'quote' ? '*' : ''}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required={requestType === 'quote'}
            className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm"
          />
        </div>
      </div>

      {requestType === 'quote' && (
        <div>
          <Label htmlFor="company" className="text-white">Entreprise *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            required
            className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 backdrop-blur-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ContactInfoStep;
