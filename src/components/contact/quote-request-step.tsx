import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

interface QuoteRequestStepProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const QuoteRequestStep = ({ formData, setFormData, onNext, onBack }: QuoteRequestStepProps) => {
  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    // Validation basique
    if (!formData.projectType || !formData.budget) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
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
          Demande de devis
        </h2>
        <p className="text-primary/70">
          Décrivez votre projet pour que nous puissions vous proposer un devis personnalisé
        </p>
      </div>

      <div className="space-y-6">
        {/* Type de projet */}
        <div>
          <Label htmlFor="projectType" className="text-primary">Type de projet *</Label>
          <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez le type de projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="site-vitrine">Site vitrine</SelectItem>
              <SelectItem value="site-ecommerce">Site e-commerce</SelectItem>
              <SelectItem value="application-web">Application web</SelectItem>
              <SelectItem value="refonte">Refonte de site existant</SelectItem>
              <SelectItem value="maintenance">Maintenance de site</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <Label htmlFor="budget" className="text-primary">Budget estimé *</Label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez votre budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moins-500">Moins de 500€</SelectItem>
              <SelectItem value="500-1000">500€ - 1000€</SelectItem>
              <SelectItem value="1000-2500">1000€ - 2500€</SelectItem>
              <SelectItem value="2500-5000">2500€ - 5000€</SelectItem>
              <SelectItem value="plus-5000">Plus de 5000€</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeline */}
        <div>
          <Label htmlFor="timeline" className="text-primary">Timeline souhaitée</Label>
          <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Quand souhaitez-vous commencer ?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediatement">Immédiatement</SelectItem>
              <SelectItem value="1-mois">Dans le mois</SelectItem>
              <SelectItem value="1-3-mois">1 à 3 mois</SelectItem>
              <SelectItem value="3-6-mois">3 à 6 mois</SelectItem>
              <SelectItem value="plus-6-mois">Plus de 6 mois</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description du projet */}
        <div>
          <Label htmlFor="description" className="text-primary">Description du projet</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Décrivez votre projet en détail..."
            rows={4}
            className="mt-1"
          />
        </div>

        {/* Projet urgent */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgentProject"
            checked={formData.urgentProject}
            onCheckedChange={(checked) => handleInputChange('urgentProject', checked)}
          />
          <Label htmlFor="urgentProject" className="text-primary">
            C'est un projet urgent
          </Label>
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
          Suivant
        </Button>
      </div>
    </motion.div>
  );
};

export default QuoteRequestStep;
