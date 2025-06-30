
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteRequestFormProps {
  onBack: () => void;
}

const QuoteRequestForm = ({ onBack }: QuoteRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    timeline: '',
    description: '',
    websiteService: false,
    maintenanceService: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande de devis soumise:', { formData });
    toast({
      title: "Demande de devis envoyée !",
      description: "Nous vous enverrons votre devis personnalisé sous 24h.",
    });
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      timeline: '',
      description: '',
      websiteService: false,
      maintenanceService: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au choix
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              Demande de devis
            </CardTitle>
            <p className="text-green-100 text-center">
              Fournissez-nous les détails de votre commande pour un devis personnalisé
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations personnelles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="company">Entreprise *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Services disponibles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services souhaités</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id="websiteService"
                      checked={formData.websiteService}
                      onCheckedChange={(checked) => handleInputChange('websiteService', !!checked)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="websiteService" className="text-base font-medium cursor-pointer">
                        Site web vitrine
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Site web professionnel vitrine - 390€
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id="maintenanceService"
                      checked={formData.maintenanceService}
                      onCheckedChange={(checked) => handleInputChange('maintenanceService', !!checked)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="maintenanceService" className="text-base font-medium cursor-pointer">
                        Maintenance mensuelle
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Service de maintenance et mises à jour - 10€/mois
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Délai souhaité */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Délai souhaité de réalisation</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="timeline-5days"
                      name="timeline"
                      value="5-days"
                      checked={formData.timeline === '5-days'}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <Label htmlFor="timeline-5days" className="cursor-pointer">
                      5 jours ouvrés
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="timeline-5-10days"
                      name="timeline"
                      value="5-10-days"
                      checked={formData.timeline === '5-10-days'}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <Label htmlFor="timeline-5-10days" className="cursor-pointer">
                      5 à 10 jours ouvrés
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="timeline-10-15days"
                      name="timeline"
                      value="10-15-days"
                      checked={formData.timeline === '10-15-days'}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <Label htmlFor="timeline-10-15days" className="cursor-pointer">
                      10 à 15 jours ouvrés
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="timeline-15plus"
                      name="timeline"
                      value="15plus-days"
                      checked={formData.timeline === '15plus-days'}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <Label htmlFor="timeline-15plus" className="cursor-pointer">
                      Plus de 15 jours ouvrés
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description détaillée du projet</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  placeholder="Décrivez votre projet, vos objectifs, contraintes particulières..."
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                variant="submit"
                className="w-full bg-primary hover:bg-primary text-white backdrop-blur-sm py-3"
              >
                Demander le devis
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteRequestForm;
