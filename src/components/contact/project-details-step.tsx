'use client';

import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

import { ProjectDetails } from './types';

interface ProjectDetailsStepProps {
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

// Liste des villes françaises avec codes postaux (échantillon)
const FRENCH_CITIES = [
  { city: 'Paris', postalCode: '75001' },
  { city: 'Lyon', postalCode: '69001' },
  { city: 'Marseille', postalCode: '13001' },
  { city: 'Toulouse', postalCode: '31000' },
  { city: 'Nice', postalCode: '06000' },
  { city: 'Nantes', postalCode: '44000' },
  { city: 'Strasbourg', postalCode: '67000' },
  { city: 'Montpellier', postalCode: '34000' },
  { city: 'Bordeaux', postalCode: '33000' },
  { city: 'Lille', postalCode: '59000' },
  { city: 'Rennes', postalCode: '35000' },
  { city: 'Reims', postalCode: '51100' },
  { city: 'Le Havre', postalCode: '76600' },
  { city: 'Saint-Étienne', postalCode: '42000' },
  { city: 'Toulon', postalCode: '83000' },
  { city: 'Grenoble', postalCode: '38000' },
  { city: 'Dijon', postalCode: '21000' },
  { city: 'Angers', postalCode: '49000' },
  { city: 'Nîmes', postalCode: '30000' },
  { city: 'Villeurbanne', postalCode: '69100' },
];

const ARTISAN_TYPES = [
  'Plombier',
  'Électricien',
  'Maçon',
  'Menuisier',
  'Peintre',
  'Carreleur',
  'Couvreur',
  'Chauffagiste',
  'Serrurier',
  'Vitrier',
  'Jardinier-Paysagiste',
  'Architecte',
  'Décorateur d\'intérieur',
  'Autre'
];

export const ProjectDetailsStep = ({ projectDetails, setProjectDetails, onNext, onBack }: ProjectDetailsStepProps) => {
  const [filteredCities, setFilteredCities] = useState<typeof FRENCH_CITIES>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const handleInputChange = (field: keyof ProjectDetails, value: any) => {
    setProjectDetails({ ...projectDetails, [field]: value });
  };

  const handleSectionChange = (section: keyof ProjectDetails['sections'], checked: boolean) => {
    setProjectDetails({
      ...projectDetails,
      sections: { ...projectDetails.sections, [section]: checked }
    });
  };

  const handleCitySearch = (value: string) => {
    handleInputChange('city', value);
    if (value.length > 1) {
      const filtered = FRENCH_CITIES.filter(item =>
        item.city.toLowerCase().includes(value.toLowerCase()) ||
        item.postalCode.includes(value)
      );
      setFilteredCities(filtered);
      setShowCitySuggestions(true);
    } else {
      setShowCitySuggestions(false);
    }
  };

  const selectCity = (city: string, postalCode: string) => {
    handleInputChange('city', city);
    handleInputChange('postalCode', postalCode);
    setShowCitySuggestions(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`Le fichier ${file.name} n'est pas d'un type autorisé.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB max
        alert(`Le fichier ${file.name} est trop volumineux (max 10MB).`);
        return false;
      }
      return true;
    });

    if (projectDetails.uploadedFiles.length + validFiles.length > 3) {
      alert('Vous ne pouvez télécharger que 3 fichiers maximum.');
      return;
    }

    handleInputChange('uploadedFiles', [...projectDetails.uploadedFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = projectDetails.uploadedFiles.filter((_: File, i: number) => i !== index);
    handleInputChange('uploadedFiles', newFiles);
  };

  const handleNext = () => {
    if (!projectDetails.artisanType || !projectDetails.location || !projectDetails.city) {
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
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary/80 mb-4">
          Informations détaillées sur votre projet
        </h2>
        <p className="text-primary/70">
          Aidez-nous à mieux comprendre vos besoins spécifiques
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Type d'artisan */}
        <div>
          <Label htmlFor="artisanType" className="text-primary">Type d'artisan *</Label>
          <Select value={projectDetails.artisanType} onValueChange={(value) => handleInputChange('artisanType', value)}>
            <SelectTrigger className="mt-1 bg-white/40 border-white/30 text-primary backdrop-blur-sm">
              <SelectValue placeholder="Sélectionnez votre métier" />
            </SelectTrigger>
            <SelectContent>
              {ARTISAN_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Zone d'intervention */}
        <div>
          <Label htmlFor="location" className="text-primary">Zone d'intervention *</Label>
          <Input
            id="location"
            value={projectDetails.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Ex: Paris et banlieue, Département 13..."
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
        </div>

        {/* Adresse de l'entreprise */}
        <div>
          <Label htmlFor="companyAddress" className="text-primary">Adresse de l'entreprise</Label>
          <Input
            id="companyAddress"
            value={projectDetails.companyAddress}
            onChange={(e) => handleInputChange('companyAddress', e.target.value)}
            placeholder="Adresse complète"
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
        </div>

        {/* Ville avec suggestions */}
        <div className="relative">
          <Label htmlFor="city" className="text-primary">Ville *</Label>
          <Input
            id="city"
            value={projectDetails.city}
            onChange={(e) => handleCitySearch(e.target.value)}
            placeholder="Tapez le nom de votre ville"
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
          {showCitySuggestions && filteredCities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredCities.slice(0, 5).map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 flex justify-between"
                  onClick={() => selectCity(item.city, item.postalCode)}
                >
                  <span>{item.city}</span>
                  <span className="text-gray-500">{item.postalCode}</span>
                </button>
              ))}
            </div>
          )}
          {projectDetails.postalCode && (
            <p className="text-sm text-gray-600 mt-1">Code postal: {projectDetails.postalCode}</p>
          )}
        </div>
      </div>

      {/* Services proposés */}
      <div>
        <Label htmlFor="servicesOffered" className="text-primary">Services proposés</Label>
        <Textarea
          id="servicesOffered"
          value={projectDetails.servicesOffered}
          onChange={(e) => handleInputChange('servicesOffered', e.target.value)}
          placeholder="Décrivez les services que vous proposez..."
          className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Spécificité */}
        <div>
          <Label htmlFor="specialty" className="text-primary">Votre spécificité</Label>
          <Input
            id="specialty"
            value={projectDetails.specialty}
            onChange={(e) => handleInputChange('specialty', e.target.value)}
            placeholder="Ce qui vous distingue..."
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
        </div>

        {/* Type de clients ciblés */}
        <div>
          <Label htmlFor="targetClients" className="text-primary">Type de clients ciblés</Label>
          <Input
            id="targetClients"
            value={projectDetails.targetClients}
            onChange={(e) => handleInputChange('targetClients', e.target.value)}
            placeholder="Particuliers, entreprises, collectivités..."
            className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Ton du contenu */}
      <div>
        <Label htmlFor="contentTone" className="text-primary">Ton du contenu souhaité</Label>
        <Textarea
          id="contentTone"
          value={projectDetails.contentTone}
          onChange={(e) => handleInputChange('contentTone', e.target.value)}
          placeholder="Décrivez le style et le ton que vous souhaitez pour votre site (professionnel, convivial, moderne, traditionnel...)"
          className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          rows={3}
        />
      </div>

      {/* Upload de fichiers */}
      <div>
        <Label className="text-primary">Fichiers à joindre (3 max)</Label>
        <div className="mt-1 border-2 border-dashed border-white/30 rounded-lg p-6 bg-white/40 backdrop-blur-sm">
          <input
            type="file"
            id="fileUpload"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            disabled={projectDetails.uploadedFiles.length >= 3}
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <div className="text-center">
              <Upload className="w-8 h-8 mx-auto text-primary/60 mb-2" />
              <p className="text-sm text-primary/70">
                Cliquez pour ajouter des fichiers
              </p>
              <p className="text-xs text-primary/50 mt-1">
                PDF, Images, Word (max 10MB chacun)
              </p>
            </div>
          </label>
        </div>

        {/* Fichiers uploadés */}
        {projectDetails.uploadedFiles.length > 0 && (
          <div className="mt-2 space-y-2">
            {projectDetails.uploadedFiles.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-2 rounded border border-white/30">
                <span className="text-sm text-primary">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sections à inclure */}
      <div>
        <Label className="text-primary">Sections à inclure sur le site</Label>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { key: 'about', label: 'À propos' },
            { key: 'services', label: 'Services' },
            { key: 'portfolio', label: 'Réalisations' },
            { key: 'practicalInfo', label: 'Infos pratiques' },
            { key: 'contactForm', label: 'Formulaire de contact' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={projectDetails.sections[key as keyof ProjectDetails['sections']]}
                onCheckedChange={(checked) => 
                  handleSectionChange(key as keyof ProjectDetails['sections'], checked as boolean)
                }
                className="bg-white/40 border-white/30 backdrop-blur-sm data-[state=checked]:bg-blue-500/70 data-[state=checked]:border-blue-500/10"
              />
              <Label htmlFor={key} className="text-sm text-primary">{label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Autres informations */}
      <div>
        <Label htmlFor="additionalInfo" className="text-primary">Autres informations utiles</Label>
        <Textarea
          id="additionalInfo"
          value={projectDetails.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          placeholder="Toute information complémentaire qui pourrait nous aider..."
          className="mt-1 bg-white/40 border-white/30 text-primary placeholder:text-primary/40 backdrop-blur-sm"
          rows={4}
        />
      </div>
    </motion.div>
  );
};

export default ProjectDetailsStep;
