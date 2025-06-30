import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

const PricingCard = ({ plan, index }: PricingCardProps) => {
  return (
    <div
      className={`h-max relative group transition-all duration-700 hover:scale-[1.02] ${
        index === 1 ? "md:-translate-y-8" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-coral-500/60 text-primary px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Pack complet
          </div>
        </div>
      )}

      {/* Glass card */}
      <div
        className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 h-full transition-all duration-700 group-hover:bg-white/12 group-hover:border-white/25 group-hover:shadow-2xl ${
          plan.popular
            ? "shadow-2xl shadow-coral-500/20 ring-2 ring-coral-500/20"
            : "shadow-xl shadow-black/20"
        }`}
      >
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-coral-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative z-10">
          {/* Plan name */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2 transition-colors duration-500 group-hover:text-primary/80">
              {plan.name}
            </h3>
            <p className="text-primary/70 text-sm">{plan.description}</p>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center">
              <span className="text-primary/70 ml-2">{plan.period}</span>
              <span className="text-5xl font-bold text-primary transition-colors duration-500 group-hover:text-primary/80">
                {plan.price}€
              </span>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-coral-500 mt-0.5 flex-shrink-0 transition-colors duration-500 group-hover:text-coral-400" />
                <span className="text-primary/80 transition-colors duration-500 group-hover:text-primary/90">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button
            className={`w-full py-6 text-lg font-semibold transition-all duration-500 ${
              plan.popular
                ? "bg-gradient-to-r from-coral-500/80 to-coral-500 hover:from-coral-500/60 hover:to-coral-500/80 text-white shadow-lg hover:shadow-coral-500/20"
                : "hover:bg-primary/80"
            }`}
          >
            {plan.buttonText}
          </Button>
        </div>

        <p className="pt-4 text-primary/70">Puis 9€ par mois : Hébergement, Nom de domaine et maintenance</p>

        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    </div>
  );
};

export default PricingCard;
