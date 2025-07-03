"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Démos",
      link: "#demos",
    },    
    {
      name: "Tarifs",
      link: "#tarifs",
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            <NavbarButton 
            href="#contact"
            className="rounded-full">Commander</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="px-4">
            <NavbarLogo />
            <motion.div
              animate={{ 
                rotate: isMobileMenuOpen ? 180 : 0,
                scale: isMobileMenuOpen ? 1.1 : 1
              }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </motion.div>
          </MobileNavHeader>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeInOut",
                  opacity: { duration: 0.2 }
                }}
                className="absolute left-0 right-0 top-16 z-40 overflow-hidden bg-white/20 backdrop-blur-lg border-t border-white/30 shadow-lg"
                style={{
                  width: '100vw',
                  marginLeft: 'calc(-50vw + 50%)'
                }}
              >
                <motion.div 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="container mx-auto px-6 py-8 space-y-6 max-w-md"
                >
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={`mobile-link-${idx}`}
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.2 + (idx * 0.1), 
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="block py-3 text-xl font-medium text-black hover:text-black/80 transition-colors border-b border-white/20 last:border-b-0"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.4, 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="pt-6 border-t border-white/30"
                  >
                    <NavbarButton
                      href="#contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full rounded-full text-lg py-3 bg-primary/90 backdrop-blur-sm border border-white/30 hover:bg-primary text-white shadow-lg"
                    >
                      Commander
                    </NavbarButton>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
