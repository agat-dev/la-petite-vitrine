
import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { RequestType } from './contact-form';

interface RequestTypeStepProps {
  requestType: RequestType;
  setRequestType: (type: RequestType) => void;
}

const RequestTypeStep = ({ requestType, setRequestType }: RequestTypeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Quel est l'objet de votre demande ?
        </h2>
        <p className="text-gray-300">
          Sélectionnez le type de demande pour personnaliser le formulaire
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Label htmlFor="requestType" className="text-lg text-white">Type de demande *</Label>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Select value={requestType} onValueChange={(value: RequestType) => setRequestType(value)}>
            <SelectTrigger className="mt-2 h-12 text-base bg-white/10 border-white/30 text-white backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-md">
              <SelectItem value="information" className="text-base py-3 text-white hover:bg-white/10">
                <div>
                  <div className="font-medium">Demande d'information</div>
                  <div className="text-sm text-gray-400">Questions générales, support, etc.</div>
                </div>
              </SelectItem>
              <SelectItem value="quote" className="text-base py-3 text-white hover:bg-white/10">
                <div>
                  <div className="font-medium">Demande de devis</div>
                  <div className="text-sm text-gray-400">Projet, commande, estimation</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestTypeStep;
