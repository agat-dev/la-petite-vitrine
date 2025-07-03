"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function Hero171() {

  const gridImages = [
    { src: "/artisan-coiffeur.jpg", alt: "Artisan Coiffeur" },
    { src: "/artisan-batiment.jpg", alt: "Artisan du bâtiment" },  
    { src: "/artisan-paysagiste.jpg", alt: "Artisan plombier" },    
    { src: "/artisan-plombier.jpg", alt: "Artisan paysagiste" },
    { src: "/artisan-mobile.jpg", alt: "Artisan mobile" },
    { src: "/artisan-ebeniste.jpg", alt: "Artisan ébéniste" },

  ]

  function TimelineComponent() {
    const [visibleItems, setVisibleItems] = useState<number[]>([])
    const timelineRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    const timelineData = [
      {
        year: "",
        title: "Livré en 5 jours maximum",
        desc: "Born from innovation",
        color: "from-coral-500 to-coral-500/70",
      },
      {
        year: "",
        title: "Seulement 290€ pour un site vitrine",
        desc: "First thousand believers",
        color: "from-blue-500 to-blue-500/70",
      },
      
      {
        year: "",
        title: "Maintenance et mises à jour à 49€/an",
        desc: "AI-driven features launched",
        color: "from-coral-500 to-coral-500/70",
      },
      {
        year: "",
        title: "Spécialisé artisans & TPE",
        desc: "Series A breakthrough",
        color: "from-blue-500 to-blue-500/70",
      },
    ]

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.3, rootMargin: "-50px" },
      )

      itemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref)
      })

      return () => observer.disconnect()
    }, [])

    return (
      <div ref={timelineRef} className="relative">
        {/* Sophisticated Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px">
          <div 
            className="h-full w-full bg-gradient-to-b from-transparent via-gray-200 to-transparent transition-opacity duration-1000 ease-out"
            style={{
              opacity: visibleItems.length > 0 ? 1 : 0,
            }}
          ></div>
          <div
            className="absolute top-0 w-full bg-gradient-to-b from-coral-500/30 to-cream-100 transition-all duration-1000 ease-out"
            style={{
              height: `${(visibleItems.length / timelineData.length) * 100}%`,
              opacity: visibleItems.length > 0 ? 1 : 0,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            }}
          ></div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative transition-all duration-700 ease-out ${
                visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >


              {/* Content Card */}
              <div
                className={`ml-12 backdrop-blur-xl bg-white/25 border border-white/40 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{
                  backdropFilter: 'blur(25px) saturate(1.2)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white tracking-wider`}
                  >
                    {item.year}
                  </span>
                  <div className="w-8 h-px bg-gray-200"></div>
                </div>

                <h4 className="text-xl font-semibold text-gray-900 mb-1 tracking-tight">{item.title}</h4>

                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>

                {/* Subtle Accent */}
                <div className={`mt-4 w-12 h-0.5 bg-gradient-to-r ${item.color} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
      </div>
    )
  }

  return (
    <section className="relative min-h-screen py-16 md:py-24 lg:py-36 p-3 sm:px-4 lg:px-28 overflow-hidden">
      {/* Background with subtle gradient - matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-500 via-cream-500/30 to-cream-500"></div>

      {/* SVG Background sophistiqué - thème crème naturel */}
      <div className="absolute inset-0 opacity-35">
        {/* Motifs organiques ondulants */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path 
            d="M0,250 Q400,100 800,200 Q1000,250 1200,150 L1200,0 L0,0 Z" 
            fill="url(#atoutsGradient1)" 
            opacity="0.6"
          />
          <path 
            d="M0,550 Q200,400 500,500 Q800,600 1200,450 L1200,800 L0,800 Z" 
            fill="url(#atoutsGradient2)" 
            opacity="0.4"
          />
          <defs>
            <linearGradient id="atoutsGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F6E6D7" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#C9645A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F6E6D7" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="atoutsGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9645A" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#F6E6D7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C9645A" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Motifs en losange et triangulaires */}
        <svg className="absolute top-1/5 right-1/6 w-2/5 h-2/5" viewBox="0 0 350 300" preserveAspectRatio="none">
          <path 
            d="M0,150 L100,50 L200,150 L150,250 L50,200 Z" 
            fill="rgba(201, 100, 90, 0.25)" 
          />
          <path 
            d="M150,75 L250,25 L350,100 L300,200 L200,175 Z" 
            fill="rgba(246, 230, 215, 0.35)" 
          />
        </svg>

        {/* Courbes entrelacées */}
        <svg className="absolute bottom-1/5 left-1/8 w-1/3 h-1/3" viewBox="0 0 250 200" preserveAspectRatio="none">
          <path 
            d="M0,100 Q62,40 125,100 Q187,160 250,100 L250,200 L0,200 Z" 
            fill="rgba(246, 230, 215, 0.4)" 
          />
        </svg>

        {/* Lignes fluides interconnectées */}
        <svg className="absolute top-1/3 left-1/4 w-96 h-96" viewBox="0 0 200 200">
          <path 
            d="M30,60 Q80,10 130,60 Q180,110 150,160 Q100,190 50,140 Q20,90 30,60" 
            stroke="rgba(201, 100, 90, 0.5)" 
            strokeWidth="2.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <path 
            d="M20,100 Q70,50 120,100 Q170,150 140,180 Q90,160 40,120 Q10,80 20,100" 
            stroke="rgba(246, 230, 215, 0.6)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2.5s' }}
          />
        </svg>

        {/* Motifs en étoile */}
        <svg className="absolute bottom-1/3 right-1/5 w-80 h-80" viewBox="0 0 180 180">
          <path 
            d="M90,20 L100,70 L150,80 L110,110 L120,160 L90,140 L60,160 L70,110 L30,80 L80,70 Z" 
            stroke="rgba(246, 230, 215, 0.4)" 
            strokeWidth="1.5" 
            fill="rgba(201, 100, 90, 0.1)"
            className="animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </svg>
      </div>

      {/* Animated background elements - matching hero */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cream-100/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cream-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 md:max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 md:col-span-3 col-span-1">
            <div className="space-y-6 pl-2 sm:pl-4 lg:pl-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-brown-500">
                Les 5 
                <span className="text-transparent font-serif font-light italic bg-clip-text bg-gradient-to-r from-primary/80 to-primary">
                  {" "}
                  avantages
                </span>
              </h2>
              {/*}
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Create stunning websites and applications with our powerful tools and components. Join thousands of
                developers who trust our platform.
              </p>
              */}
            </div>

            {/* Action Buttons 
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started Free
              </Button>

              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Video player would be embedded here</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            */}

            {/* User Testimonials
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {testimonialAvatars.map((avatar, index) => (
                    <Avatar key={index} className="border-2 border-white">
                      <AvatarImage src={avatar.src || "/placeholder.svg"} alt={avatar.alt} />
                      <AvatarFallback>U{index + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Trusted by 10,000+ developers</span> worldwide
              </p>
            </div>
            */}

            {/* Stats 
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            */}

            {/* Sophisticated Timeline */}
            <div className="space-y-6 pt-8">
              <TimelineComponent />
            </div>
          </div>

          {/* Right Grid - Bento Layout */}
          <div className="relative col-span-2">
            <div className="grid grid-cols-6 grid-rows-4 gap-4 h-full min-h-[600px]">
              {/* Image 1 - 2 lignes/1 colonne (position: col 1, rows 1-2) */}
              <div className="relative overflow-hidden rounded-2xl col-span-1">
                <div className="absolute inset-0 bg-brown-500" />
              </div>

              {/* Image 2 - 5 colonnes/1 ligne (position: cols 2-6, row 1) */}
              <div className="h-max relative overflow-hidden rounded-2xl col-span-5 row-span-1">
                <Image
                  src={gridImages[1]?.src || "/placeholder.svg"}
                  alt={gridImages[1]?.alt || "Artisan"}
                  width={800}
                  height={300}
                  className="w-full h-full object-contain object-center-top hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Image 3 - 5 colonnes/1 ligne (position: cols 2-6, row 2) */}
              <div className="h-max w-full relative overflow-hidden rounded-2xl col-span-6 row-span-1">
                <Image
                  src={gridImages[2]?.src || "/placeholder.svg"}
                  alt={gridImages[2]?.alt || "Artisan"}
                  width={800}
                  height={300}
                  className="w-full h-full object-contain object-center-top hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Images 4 et 5 - Colonne de gauche combinée */}
              {/* Image 4 - 3 colonnes/1 ligne (position: cols 1-3, row 3) */}
              <div className="h-max relative overflow-hidden rounded-2xl col-span-5 row-span-1 bg-gray-100">
                <Image
                  src={gridImages[3]?.src || "/placeholder.svg"}
                  alt={gridImages[3]?.alt || "Artisan"}
                  width={500}
                  height={250}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Image 6 - 3 colonnes/2 lignes (position: cols 4-6, rows 3-4) */}
              <div className="relative overflow-hidden rounded-2xl col-span-1 row-span-2">
                <div className="absolute inset-0 bg-coral-500" />
              </div>

              {/* Image 5 - 3 colonnes/1 ligne (position: cols 1-3, row 4) */}
              <div className="h-max relative overflow-hidden rounded-2xl col-span-5 row-span-1 bg-gray-100">
                <Image
                  src={gridImages[5]?.src || "/placeholder.svg"}
                  alt={gridImages[5]?.alt || "Artisan"}
                  width={500}
                  height={250}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-coral-500/20 to-cream-100 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-cream-100 to-coral-500/20 rounded-full opacity-10 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  )
}
