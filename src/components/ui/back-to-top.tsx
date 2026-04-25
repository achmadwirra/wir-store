'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gray-900/90 text-gray-300 shadow-lg backdrop-blur-sm transition-colors hover:border-amber-500/30 hover:bg-gray-800 hover:text-amber-400 lg:bottom-8"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
