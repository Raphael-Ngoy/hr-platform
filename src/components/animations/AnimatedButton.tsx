'use client'

import { motion } from 'framer-motion'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary'
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '',
  variant = 'primary'
}: AnimatedButtonProps) {
  const baseStyles = 'px-6 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variantStyles = variant === 'primary' 
    ? 'bg-white text-black hover:bg-gray-200' 
    : 'border border-gray-700 text-gray-300 hover:border-white hover:text-white'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}