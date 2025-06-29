
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, Send, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteRequestFormProps {
  onBack: () => void;
}

interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  specifications: string;
}

const QuoteRequestForm = ({ onBack }: QuoteRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    urgentProject: false
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, product: '', quantity: 1, specifications: '' }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addOrderItem = () => {
    const newId = Math.max(...orderItems.map(item => item.id)) + 1;
    setOrderItems([...orderItems, { id: newId, product: '', quantity: 1, specifications: '' }]);
  };

  const removeOrderItem = (id: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== id));
    }
  };

  const updateOrderItem = (id: number, field: keyof OrderItem, value: string | number) => {
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande de devis soumise:', { formData, orderItems });
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
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      urgentProject: false
    });
    setOrderItems([{ id: 1, product: '', quantity: 1, specifications: '' }]);
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

              {/* Détails du projet */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails du projet</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectType">Type de projet *</Label>
                    <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionnez le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Développement web</SelectItem>
                        <SelectItem value="mobile-app">Application mobile</SelectItem>
                        <SelectItem value="ecommerce">Site e-commerce</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget estimé</Label>
                    <Select onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionnez votre budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<5k">Moins de 5 000€</SelectItem>
                        <SelectItem value="5k-10k">5 000€ - 10 000€</SelectItem>
                        <SelectItem value="10k-25k">10 000€ - 25 000€</SelectItem>
                        <SelectItem value="25k-50k">25 000€ - 50 000€</SelectItem>
                        <SelectItem value=">50k">Plus de 50 000€</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="timeline">Délai souhaité</Label>
                  <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Quand souhaitez-vous commencer ?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">Dès que possible</SelectItem>
                      <SelectItem value="1month">Dans le mois</SelectItem>
                      <SelectItem value="3months">Dans les 3 mois</SelectItem>
                      <SelectItem value="6months">Dans les 6 mois</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Articles commandés */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Articles / Services</h3>
                  <Button 
                    type="button" 
                    onClick={addOrderItem}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>

                {orderItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">Article {index + 1}</h4>
                      {orderItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOrderItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <Label>Produit/Service *</Label>
                        <Input
                          value={item.product}
                          onChange={(e) => updateOrderItem(item.id, 'product', e.target.value)}
                          placeholder="Nom du produit ou service"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Quantité</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Label>Spécifications</Label>
                      <Textarea
                        value={item.specifications}
                        onChange={(e) => updateOrderItem(item.id, 'specifications', e.target.value)}
                        placeholder="Détails, options, personnalisations..."
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={formData.urgentProject}
                  onCheckedChange={(checked) => handleInputChange('urgentProject', !!checked)}
                />
                <Label htmlFor="urgent" className="text-sm">
                  Projet urgent (traitement prioritaire)
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              >
                <Send className="w-4 h-4 mr-2" />
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
