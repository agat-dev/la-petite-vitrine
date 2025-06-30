import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface RequestDetailsStepProps {
  formData: {
    projectType?: string;
    budget?: string;
    timeline?: string;
    description?: string;
    urgentProject?: boolean;
  };
  setFormData: (data: any) => void;
}

const RequestDetailsStep: React.FC<RequestDetailsStepProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
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
          Détails de votre demande
        </h2>
        <p className="text-primary/70">
          Aidez-nous à mieux comprendre votre projet
        </p>
      </div>

      <div className="space-y-6">
        {/* Type de projet */}
        <div>
          <Label htmlFor="projectType" className="text-primary">Type de projet *</Label>
          <Select 
            value={formData.projectType || ''} 
            onValueChange={(value) => handleInputChange('projectType', value)}
          >
            <SelectTrigger className="mt-2 bg-white/40 border-white/30 backdrop-blur-sm">
              <SelectValue placeholder="Sélectionnez le type de projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="site-vitrine">Site vitrine</SelectItem>
              <SelectItem value="e-commerce">E-commerce</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <Label htmlFor="budget" className="text-primary">Budget estimé *</Label>
          <Select 
            value={formData.budget || ''} 
            onValueChange={(value) => handleInputChange('budget', value)}
          >
            <SelectTrigger className="mt-2 bg-white/40 border-white/30 backdrop-blur-sm">
              <SelectValue placeholder="Sélectionnez votre budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moins-500">Moins de 500€</SelectItem>
              <SelectItem value="500-1000">500€ - 1000€</SelectItem>
              <SelectItem value="1000-2000">1000€ - 2000€</SelectItem>
              <SelectItem value="2000-5000">2000€ - 5000€</SelectItem>
              <SelectItem value="plus-5000">Plus de 5000€</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Délai */}
        <div>
          <Label htmlFor="timeline" className="text-primary">Délai souhaité *</Label>
          <Select 
            value={formData.timeline || ''} 
            onValueChange={(value) => handleInputChange('timeline', value)}
          >
            <SelectTrigger className="mt-2 bg-white/40 border-white/30 backdrop-blur-sm">
              <SelectValue placeholder="Sélectionnez le délai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgent (moins d'1 semaine)</SelectItem>
              <SelectItem value="1-2-semaines">1-2 semaines</SelectItem>
              <SelectItem value="1-mois">1 mois</SelectItem>
              <SelectItem value="2-3-mois">2-3 mois</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-primary">Description du projet</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Décrivez votre projet en détail..."
            className="mt-2 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
            rows={4}
          />
        </div>

        {/* Projet urgent */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgentProject"
            checked={formData.urgentProject || false}
            onCheckedChange={(checked) => handleInputChange('urgentProject', checked)}
            className="bg-white/40 border-white/30 backdrop-blur-sm"
          />
          <Label htmlFor="urgentProject" className="text-sm text-primary">
            Ce projet est urgent
          </Label>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestDetailsStep;