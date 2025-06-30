import PricingCard from "./pricing-card";

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Votre site web d'artisan",
      price: 390,
      period: "",
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
      popular: true,
      buttonText: "Commander",
      buttonLink: "/#contact",
    },
  ];

  return (
    <section id="tarifs" className="relative min-h-screen flex items-center justify-center py-16 md:py-24 lg:py-36 overflow-hidden">
      {/* Background with subtle gradient - coral theme éclairci */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-500/40 via-coral-500/20 to-coral-500/50"></div>

      {/* SVG Background sophistiqué */}
      <div className="absolute inset-0 opacity-60">
        {/* Courbe élégante principale */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,200 Q300,100 600,150 T1200,200 L1200,0 L0,0 Z" 
            fill="url(#gradient1)" 
            opacity="0.6"
          />
          <path 
            d="M0,600 Q400,500 800,550 T1200,600 L1200,800 L0,800 Z" 
            fill="url(#gradient2)" 
            opacity="0.5"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#F6E6D7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#69AFC8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#69AFC8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#C9645A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Courbes décoratives secondaires */}
        <svg className="absolute top-1/4 right-0 w-2/3 h-1/2" viewBox="0 0 400 300" preserveAspectRatio="none">
          <path 
            d="M0,150 Q100,50 200,100 T400,150 L400,0 L0,0 Z" 
            fill="rgba(201, 100, 90, 0.3)" 
          />
        </svg>

        <svg className="absolute bottom-1/4 left-0 w-1/2 h-1/3" viewBox="0 0 300 200" preserveAspectRatio="none">
          <path 
            d="M0,100 Q75,25 150,75 T300,100 L300,200 L0,200 Z" 
            fill="rgba(105, 175, 200, 0.3)" 
          />
        </svg>

        {/* Lignes courbes flottantes */}
        <svg className="absolute top-1/3 left-1/4 w-96 h-96" viewBox="0 0 200 200">
          <path 
            d="M20,100 Q60,20 100,100 T180,100" 
            stroke="rgba(201, 100, 90, 0.6)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M10,120 Q50,40 90,120 T170,120" 
            stroke="rgba(105, 175, 200, 0.5)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>

        <svg className="absolute bottom-1/3 right-1/4 w-80 h-80" viewBox="0 0 200 200">
          <path 
            d="M180,100 Q140,20 100,100 T20,100" 
            stroke="rgba(246, 230, 215, 0.7)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <path 
            d="M190,80 Q150,0 110,80 T30,80" 
            stroke="rgba(201, 100, 90, 0.5)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>

      {/* Animated background elements - coral theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold text-center mb-8 animate-fade-in">
            <span className="font-display font-medium bg-coral-500 bg-clip-text text-transparent">
              Construisons votre
            </span>
            <span className="font-serif font-light italic text-primary ml-4">vitrine</span>
          </h1>
          <p className="text-xl text-primary/80 max-w-2xl mx-auto">
            Nous créons votre site, vos contenus et design optimisés pour Google et pour vos clients. 
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-1 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
