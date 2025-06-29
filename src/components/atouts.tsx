"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { Play, Star, Users, TrendingUp, Award } from "lucide-react"
import Image from "next/image"

export default function Hero171() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Award, value: "50+", label: "Awards Won" },
  ]

  const testimonialAvatars = [
    { src: "/professional-woman-diverse.png", alt: "User 1" },
    { src: "/professional-man.png", alt: "User 2" },
    { src: "/professional-person.png", alt: "User 3" },
    { src: "/professional-woman-2.png", alt: "User 4" },
  ]

  const gridImages = [
    { src: "/modern-abstract-design.png", alt: "Design 1" },
    { src: "/colorful-geometric-pattern.png", alt: "Design 2" },
    { src: "/minimalist-vector-art.png", alt: "Design 3" },
    { src: "/abstract-geometric-illustration.png", alt: "Design 4" },
    { src: "/abstract-digital-art.png", alt: "Design 5" },
    { src: "/modern-graphics.png", alt: "Design 6" },
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
    <section className="relative min-h-screen py-12 px-8 sm:px-4 lg:px-28 overflow-hidden">
      {/* Background with subtle gradient - matching hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-500/80 via-cream-500/30 to-cream-500/70"></div>

      {/* Animated background elements - matching hero */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cream-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-coral-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 md:col-span-2 col-span-1">
            <div className="space-y-6 pl-2 sm:pl-4 lg:pl-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-coral-500">
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

          {/* Right Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-4">
              {gridImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl ${
                    index === 0 ? "row-span-2" : ""
                  } ${index === 3 ? "col-span-2" : ""}`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ))}
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
