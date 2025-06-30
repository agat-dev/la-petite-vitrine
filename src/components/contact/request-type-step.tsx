
import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RequestType } from './contact-form';

interface RequestTypeStepProps {
  requestType: RequestType;
  setRequestType: (type: RequestType) => void;
}

const RequestTypeStep = ({ requestType, setRequestType }: RequestTypeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary/80 mb-4">
          Quel est l'objet de votre demande ?
        </h2>
        <p className="text-primary/70">
          Sélectionnez le type de demande pour personnaliser le formulaire
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Label htmlFor="requestType" className="text-lg text-primary">Type de demande *</Label>
        <div>
          <Select value={requestType} onValueChange={(value: RequestType) => setRequestType(value)}>
            <SelectTrigger className="mt-2 h-12 text-base bg-white/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="information" className="text-base py-3">
                <div>
                  <div className="font-medium">Demande d'information</div>
                  <div className="text-sm text-gray-500">Questions générales, support, etc.</div>
                </div>
              </SelectItem>
              <SelectItem value="quote" className="text-base py-3">
                <div>
                  <div className="font-medium">Commande</div>
                  <div className="text-sm text-gray-500">Projet et commande</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default RequestTypeStep;
