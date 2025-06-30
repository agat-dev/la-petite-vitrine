import React from 'react';

interface SummaryStepProps {
  formData: {
    requestType: string;
    contactInfo: {
      name: string;
      email: string;
    };
    projectDetails?: object;
    additionalInfo?: string;
  };
}

const SummaryStep: React.FC<SummaryStepProps> = ({ formData }) => {
  return (
    <div>
      <h2>Récapitulatif</h2>
      <p><strong>Type de demande:</strong> {formData.requestType}</p>
      <p><strong>Nom:</strong> {formData.contactInfo.name}</p>
      <p><strong>Email:</strong> {formData.contactInfo.email}</p>
      {formData.requestType === 'Commande' && (
        <div>
          <h3>Détails du projet:</h3>
          <p>{JSON.stringify(formData.projectDetails)}</p>
        </div>
      )}
      {formData.requestType === 'Contact' && (
        <div>
          <h3>Informations supplémentaires:</h3>
          <p>{formData.additionalInfo}</p>
        </div>
      )}
      <button>Commander</button>
    </div>
  );
};

export default SummaryStep;
