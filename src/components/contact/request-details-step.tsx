
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { FormData, RequestType, OrderItem } from './contact-form';

interface RequestDetailsStepProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  requestType: RequestType;
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  showOrderItems?: boolean;
}

const RequestDetailsStep = ({ 
  formData, 
  handleInputChange, 
  requestType, 
  orderItems, 
  setOrderItems,
  showOrderItems = false 
}: RequestDetailsStepProps) => {
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

  if (requestType === 'information') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Votre demande d'information
          </h2>
        </div>

        <div>
          <Label htmlFor="subject">Sujet *</Label>
          <Select onValueChange={(value) => handleInputChange('subject', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="produits">Informations sur les produits</SelectItem>
              <SelectItem value="services">Informations sur les services</SelectItem>
              <SelectItem value="tarifs">Questions sur les tarifs</SelectItem>
              <SelectItem value="support">Support technique</SelectItem>
              <SelectItem value="partenariat">Opportunités de partenariat</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
            rows={5}
            placeholder="Décrivez votre demande d'information..."
            className="mt-1"
          />
        </div>
      </div>
    );
  }

  if (showOrderItems) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Articles / Services demandés
          </h2>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Articles</h3>
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
          <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Détails de votre projet
        </h2>
      </div>

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

      <div>
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
  );
};

export default RequestDetailsStep;
