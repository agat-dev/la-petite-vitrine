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
        year: "2020",
        title: "Genesis",
        desc: "Born from innovation",
        color: "from-blue-400 to-blue-600",
      },
      {
        year: "2021",
        title: "Momentum",
        desc: "First thousand believers",
        color: "from-purple-400 to-purple-600",
      },
      {
        year: "2022",
        title: "Elevation",
        desc: "Series A breakthrough",
        color: "from-pink-400 to-pink-600",
      },
      {
        year: "2023",
        title: "Expansion",
        desc: "Global footprint established",
        color: "from-indigo-400 to-indigo-600",
      },
      {
        year: "2024",
        title: "Revolution",
        desc: "AI-powered future",
        color: "from-cyan-400 to-cyan-600",
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
          <div className="h-full w-full bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
          <div
            className="absolute top-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transition-all duration-1000 ease-out"
            style={{
              height: `${(visibleItems.length / timelineData.length) * 100}%`,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            }}
          ></div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`relative transition-all duration-700 ease-out ${
                visibleItems.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Sophisticated Dot */}

              {/* Content Card */}
              <div
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${
                  visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white tracking-wider`}
                  >
                    {item.year}
                  </span>
                  <div className="w-8 h-px bg-gray-200"></div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">{item.title}</h4>

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
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Build Amazing
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Digital Products
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Create stunning websites and applications with our powerful tools and components. Join thousands of
                developers who trust our platform.
              </p>
            </div>

            {/* Action Buttons */}
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

            {/* User Testimonials */}
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

            {/* Stats */}
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

            {/* Sophisticated Timeline */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
                <h3 className="text-lg font-medium text-gray-900 tracking-wide">Evolution</h3>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </div>

              <TimelineComponent />
            </div>
          </div>

          {/* Right Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
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
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-10 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  )
}
