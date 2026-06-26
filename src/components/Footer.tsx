'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGithub, FaLinkedin, FaBriefcase, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  const pathname = usePathname()

  // Hide footer on dashboard pages
  if (pathname.startsWith('/dashboard')) {
    return null
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight mb-4">NEXUS</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Building the future through innovation and talent. We connect exceptional people with exceptional opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaEnvelope className="w-4 h-4 mt-0.5 text-gray-400" />
                <span className="text-gray-400 text-sm">careers@nexus.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaLinkedin className="w-4 h-4 mt-0.5 text-gray-400" />
                <a
                  href="https://www.linkedin.com/in/raphael-ngoy-a049a927b-a049a927b?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Raphael Ngoy
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FaBriefcase className="w-4 h-4 mt-0.5 text-gray-400" />
                <a
                  href="https://www.upwork.com/freelancers/~your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Upwork Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/Raphael-Ngoy/hr-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/raphael-ngoy-a049a927b-a049a927b?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.upwork.com/freelancers/~your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Portfolio"
              >
                <FaBriefcase className="w-5 h-5" />
              </a>
              <a
                href="mailto:your-email@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 NEXUS · v1.0.0
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed & Developed by Raphael Ngoy
              </p>
              <p className="text-gray-500 text-xs">
                Full-Stack Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}