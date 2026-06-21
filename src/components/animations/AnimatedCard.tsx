'use client'

import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  href?: string
  className?: string
  delay?: number
}

export default function AnimatedCard({ children, href, className = '', delay = 0 }: AnimatedCardProps) {
  const CardWrapper = href ? motion.a : motion.div
  const cardProps = href ? { href } : {}

  return (
    <CardWrapper
      {...cardProps}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className={`bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all cursor-pointer group ${className}`}
    >
      {children}
    </CardWrapper>
  )
}