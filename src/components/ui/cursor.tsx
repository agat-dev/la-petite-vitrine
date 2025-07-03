"use client"

import { useState, useEffect, useRef } from "react"

export default function SmoothFollower() {
  const mousePosition = useRef({ x: 0, y: 0 })

  const dotPosition = useRef({ x: 0, y: 0 })
  const borderDotPosition = useRef({ x: 0, y: 0 })

  const [renderPos, setRenderPos] = useState({ dot: { x: 0, y: 0 }, border: { x: 0, y: 0 } })
  const [isHovering, setIsHovering] = useState(false)
  const [isOnSystemCursor, setIsOnSystemCursor] = useState(false)

  const DOT_SMOOTHNESS = 0.2
  const BORDER_DOT_SMOOTHNESS = 0.1

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const handleSystemCursorEnter = () => setIsOnSystemCursor(true)
    const handleSystemCursorLeave = () => setIsOnSystemCursor(false)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll("a, button, img")
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter)
        element.addEventListener("mouseleave", handleMouseLeave)
      })

      const systemCursorElements = document.querySelectorAll("input, textarea, select, [data-radix-select-trigger], [data-radix-select-content], [data-radix-select-item]")
      systemCursorElements.forEach((element) => {
        element.addEventListener("mouseenter", handleSystemCursorEnter)
        element.addEventListener("mouseleave", handleSystemCursorLeave)
      })
    }

    // Initial attachment
    attachListeners()

    // Observer pour les éléments ajoutés dynamiquement (comme les dropdowns)
    const observer = new MutationObserver(() => {
      attachListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Animation function for smooth movement
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS)
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS)

      borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS)
      borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS)

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
      })

      requestAnimationFrame(animate)
    }

    // Start animation loop
    const animationId = requestAnimationFrame(animate)

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)

      const allInteractiveElements = document.querySelectorAll("a, button, img")
      allInteractiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })

      const allSystemCursorElements = document.querySelectorAll("input, textarea, select, [data-radix-select-trigger], [data-radix-select-content], [data-radix-select-item]")
      allSystemCursorElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleSystemCursorEnter)
        element.removeEventListener("mouseleave", handleSystemCursorLeave)
      })

      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <>
      {/* Style global pour masquer le curseur par défaut */}
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        
        body * {
          cursor: none !important;
        }
        
        /* Exceptions pour les éléments système */
        body input, 
        body textarea,
        body select,
        body [role="listbox"],
        body [role="option"],
        body [role="combobox"],
        body [data-radix-select-trigger],
        body [data-radix-select-content],
        body [data-radix-select-item] {
          cursor: auto !important;
        }
        
        /* Curseur text pour les champs de saisie */
        body input[type="text"], 
        body input[type="email"], 
        body input[type="password"], 
        body input[type="search"], 
        body input[type="tel"],
        body textarea {
          cursor: text !important;
        }
        
        /* Scrollbars gardent leur curseur par défaut */
        ::-webkit-scrollbar {
          cursor: default !important;
        }
        
        /* Assurer la visibilité du curseur personnalisé */
        .custom-cursor {
          pointer-events: none !important;
          position: fixed !important;
          z-index: 99999 !important;
        }
      `}</style>
      
      <div className="custom-cursor pointer-events-none fixed inset-0 z-[99999]">
        {/* Curseur central */}
        <div
          className="absolute rounded-full bg-primary dark:bg-white"
          style={{
            width: "8px",
            height: "8px",
            transform: "translate(-50%, -50%)",
            left: `${renderPos.dot.x}px`,
            top: `${renderPos.dot.y}px`,
            opacity: isOnSystemCursor ? 0 : 1,
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
            zIndex: 999999,
            position: "absolute"
          }}
        />

        {/* Curseur de bordure */}
        <div
          className="absolute rounded-full border-2 border-primary dark:border-white"
          style={{
            width: isHovering ? "44px" : "28px",
            height: isHovering ? "44px" : "28px",
            transform: "translate(-50%, -50%)",
            left: `${renderPos.border.x}px`,
            top: `${renderPos.border.y}px`,
            opacity: isOnSystemCursor ? 0 : 1,
            transition: "width 0.3s, height 0.3s, opacity 0.2s ease",
            pointerEvents: "none",
            zIndex: 999998,
            position: "absolute"
          }}
        />
      </div>
    </>
  )
}
