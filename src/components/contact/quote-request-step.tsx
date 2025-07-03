import React from 'react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { MultiStepFormData } from './types';

interface QuoteRequestStepProps {
  formData: MultiStepFormData;
  setFormData: (data: MultiStepFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const QuoteRequestStep = ({ formData, setFormData, onNext, onBack }: QuoteRequestStepProps) => {
  const handleInputChange = (field: keyof MultiStepFormData, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.projectType && formData.budget && formData.timeline && formData.description) {
      onNext();
    }
  };

  const isFormValid = formData.projectType && formData.budget && formData.timeline && formData.description;

  return (
    <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 lg:p-12">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
      
      {/* Reflection lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Demande de devis
          </h2>
          <p className="text-primary/70">
            Décrivez-nous votre projet pour que nous puissions vous proposer un devis personnalisé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="projectType" className="text-primary font-medium">Type de projet *</Label>
            <Select onValueChange={(value) => handleInputChange('projectType', value)} value={formData.projectType}>
              <SelectTrigger className="mt-1 bg-white/40 border-white/30 text-primary backdrop-blur-sm">
                <SelectValue placeholder="Sélectionnez le type de projet" className="placeholder:text-primary/40" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-white/30">
                <SelectItem value="site-vitrine">Site vitrine</SelectItem>
                <SelectItem value="boutique-en-ligne">Boutique en ligne</SelectItem>
                <SelectItem value="application-web">Application web</SelectItem>
                <SelectItem value="redesign">Refonte de site</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="budget" className="text-primary font-medium">Budget estimé *</Label>
            <Select onValueChange={(value) => handleInputChange('budget', value)} value={formData.budget}>
              <SelectTrigger className="mt-1 bg-white/40 border-white/30 text-primary backdrop-blur-sm">
                <SelectValue placeholder="Sélectionnez votre budget" className="placeholder:text-primary/40" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-white/30">
                <SelectItem value="moins-1000">Moins de 1 000€</SelectItem>
                <SelectItem value="1000-3000">1 000€ - 3 000€</SelectItem>
                <SelectItem value="3000-5000">3 000€ - 5 000€</SelectItem>
                <SelectItem value="5000-10000">5 000€ - 10 000€</SelectItem>
                <SelectItem value="plus-10000">Plus de 10 000€</SelectItem>
                <SelectItem value="a-discuter">À discuter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeline" className="text-primary font-medium">Délai souhaité *</Label>
            <Select onValueChange={(value) => handleInputChange('timeline', value)} value={formData.timeline}>
              <SelectTrigger className="mt-1 bg-white/40 border-white/30 text-primary backdrop-blur-sm">
                <SelectValue placeholder="Sélectionnez le délai" className="placeholder:text-primary/40" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-white/30">
                <SelectItem value="urgent">Urgent (moins d&apos;1 mois)</SelectItem>
                <SelectItem value="1-2-mois">1-2 mois</SelectItem>
                <SelectItem value="2-3-mois">2-3 mois</SelectItem>
                <SelectItem value="3-6-mois">3-6 mois</SelectItem>
                <SelectItem value="plus-6-mois">Plus de 6 mois</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-primary font-medium">Description du projet *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez votre projet en détail..."
              rows={5}
              required
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm resize-none"
            />
          </div>

          <div className="flex items-center space-x-3 p-4 bg-white/20 rounded-xl border border-white/30">
            <Checkbox
              id="urgentProject"
              checked={formData.urgentProject}
              onCheckedChange={(checked: boolean) => handleInputChange('urgentProject', checked)}
              className="data-[state=checked]:bg-white/80"
            />
            <Label htmlFor="urgentProject" className="text-primary font-medium cursor-pointer">
              Projet urgent
            </Label>
          </div>

          <div>
            <Label htmlFor="additionalInfo" className="text-primary font-medium">Informations complémentaires</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              placeholder="Ajoutez des détails supplémentaires si nécessaire..."
              rows={3}
              className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm resize-none"
            />
          </div>

          <div className="flex justify-between pt-6 border-t border-white/20">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="bg-white/20 border-white/30 text-primary hover:bg-white/30 backdrop-blur-sm rounded-full"
            >
              Précédent
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="bg-white/80 text-primary hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm font-medium rounded-full"
            >
              Continuer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestStep;
