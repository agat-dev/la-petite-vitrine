
import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RequestType } from './types';

interface RequestTypeStepProps {
  requestType: RequestType;
  setRequestType: (type: RequestType) => void;
}

const RequestTypeStep = ({ requestType, setRequestType }: RequestTypeStepProps) => {
  return (
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
      
      {/* Reflection lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>
      
      <div className="relative z-10 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Quel est l'objet de votre demande ?
          </h2>
          <p className="text-white/70">
            Sélectionnez le type de demande pour personnaliser le formulaire
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Label htmlFor="requestType" className="text-lg text-white font-medium">Type de demande *</Label>
          <div>
            <Select value={requestType} onValueChange={(value: RequestType) => setRequestType(value)}>
              <SelectTrigger className="mt-2 h-12 text-base bg-white/40 border-white/30 text-white placeholder:text-white/40 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                <SelectItem value="information" className="text-base py-3">
                  <div>
                    <div className="font-medium">Demande d'information</div>
                    <div className="text-sm text-gray-600">Questions générales, support, etc.</div>
                  </div>
                </SelectItem>
                <SelectItem value="quote" className="text-base py-3">
                  <div>
                    <div className="font-medium">Commande</div>
                    <div className="text-sm text-gray-600">Projet et commande</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTypeStep;
