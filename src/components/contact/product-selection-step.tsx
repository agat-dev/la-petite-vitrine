import React from 'react';
import { Check } from 'lucide-react';
import { MultiStepFormData } from './types';

interface ProductSelectionStepProps {
  formData: MultiStepFormData;
  setFormData: (data: MultiStepFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProductSelectionStep = ({ formData, setFormData, onNext, onBack }: ProductSelectionStepProps) => {
  const productInfo = {
    name: "Votre site web d'artisan",
    price: 390,
    description: "Toutes les fonctionnalités personnalisées",
    features: [
      "Site web d'une page",
      "Identité visuelle",
      "Contenu optimisé premium",
      "Section Services",
      "Section Avis clients",
      "Section A propos",
      "Section FAQ",
      "Formulaire de contact",
      "Hébergement 1 an",
      "Nom de domaine 1 an",
      "Maintenance 1 an",
    ],
  };

  const handleProductSelection = () => {
    // Mettre à jour les données du formulaire avec les informations du produit
    setFormData({
      ...formData,
      projectType: 'site-vitrine',
      budget: '390€',
      timeline: '2-3-mois',
      description: `Commande du produit: ${productInfo.name} - ${productInfo.description}`
    });
    onNext();
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl p-8 lg:p-12 shadow-2xl">
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
      
      {/* Reflection lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Votre produit sélectionné
          </h2>
          <p className="text-primary/70 text-lg">
            Découvrez tout ce qui est inclus dans votre commande
          </p>
        </div>

        {/* Fiche produit */}
        <div className="max-w-2xl mx-auto">
          <div className="relative backdrop-blur-sm bg-white/40 border border-white/50 rounded-3xl p-8 lg:p-10 overflow-hidden group">
            {/* Enhanced inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 via-white/30 to-transparent"></div>
            
            {/* Badge populaire */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-coral-500 to-coral-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                ⭐ Recommandé
              </div>
            </div>
            
            <div className="relative z-10 pt-6">
              {/* En-tête du produit */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {productInfo.name}
                </h3>
                <p className="text-primary/80 mb-6">
                  {productInfo.description}
                </p>
                
                {/* Prix */}
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-bold text-coral-500">
                    {productInfo.price}€
                  </span>
                  <span className="text-primary/60 ml-2">HT</span>
                </div>
              </div>

              {/* Liste des fonctionnalités */}
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-primary mb-4 text-center">
                  ✨ Tout ce qui est inclus
                </h4>
                <div className="grid gap-3">
                  {productInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-white/20 rounded-xl border border-white/30 backdrop-blur-sm"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-primary font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="bg-coral-500/10 border border-coral-500/30 rounded-xl p-6 mb-8">
                <div className="text-center">
                  <h5 className="text-coral-500 font-semibold mb-2">
                    💡 Coût de maintenance
                  </h5>
                  <p className="text-primary/80 text-sm">
                    Puis <strong>9€ par mois</strong> : Hébergement, Nom de domaine et maintenance
                  </p>
                </div>
              </div>

              {/* Garanties */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/20 rounded-xl border border-white/30">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-primary font-medium text-sm">Livraison rapide</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-xl border border-white/30">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-primary font-medium text-sm">Design sur mesure</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-xl border border-white/30">
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="text-primary font-medium text-sm">Garantie 1 an</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t border-white/20">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-primary/70 hover:text-primary transition-colors backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl"
          >
            Retour
          </button>
          <button
            type="button"
            onClick={handleProductSelection}
            className="px-8 py-3 bg-coral-500 hover:bg-coral-500/80 text-white rounded-xl font-medium transition-colors shadow-lg"
          >
            Continuer avec ce produit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionStep;
