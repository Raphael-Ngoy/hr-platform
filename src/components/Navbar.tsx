'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, LayoutDashboard, Users, Briefcase, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  // Public navigation links
  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/careers', label: 'Careers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/apply', label: 'Apply' },
  ]

  // Admin navigation links
  const adminLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/applicants', label: 'Applicants', icon: Users },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-gray-900 ${
      scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-black'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="text-2xl font-bold tracking-tight text-white">
            NEXUS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              /* Admin Navigation */
              <>
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              /* Public Navigation */
              <>
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  HR Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 relative z-50 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-64 bg-black border-l border-gray-800 shadow-xl z-40 md:hidden"
            >
              <div className="px-4 py-4 space-y-3 mt-20">
                {isAuthenticated ? (
                  /* Admin Mobile Navigation */
                  <>
                    {adminLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-base font-medium text-gray-300 hover:text-white flex items-center gap-2"
                        onClick={handleLinkClick}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => { signOut({ callbackUrl: '/' }); handleLinkClick() }}
                      className="w-full px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  /* Public Mobile Navigation */
                  <>
                    {publicLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-base font-medium text-gray-300 hover:text-white"
                        onClick={handleLinkClick}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/login"
                      className="block w-full px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-center"
                      onClick={handleLinkClick}
                    >
                      HR Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}