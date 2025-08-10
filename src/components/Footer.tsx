'use client'
import Link from "next/link"
import { useMemo, useState, useEffect } from 'react'
import { APP_METADATA } from '@/constants'

/**
 * Footer Component
 * 
 * Mobile-optimized footer navigation and information
 * Features:
 * - Responsive design (primarily for mobile)
 * - Quick access navigation
 * - Social media links
 * - Copyright and build information
 * - Accessible navigation structure
 */

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025)
  const [userName, setUserName] = useState('Dashboard User')
  const [lastUpdated, setLastUpdated] = useState('')
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    setUserName(process.env.NEXT_PUBLIC_USER_NAME || 'Dashboard User')
    setLastUpdated(new Date().toLocaleDateString())
  }, [])

  // Navigation links configuration
  const navigationLinks = useMemo(() => [
    { href: '/home', label: 'Dashboard', icon: '🏠' },
    { href: '/', label: 'About', icon: 'ℹ️' },
    { href: '/projects', label: 'Projects', icon: '💼' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ], [])

  // Social/Contact links
  const socialLinks = useMemo(() => [
    { 
      href: 'https://github.com', 
      label: 'GitHub', 
      icon: '🐱',
      ariaLabel: 'Visit GitHub profile'
    },
    { 
      href: 'https://linkedin.com', 
      label: 'LinkedIn', 
      icon: '💼',
      ariaLabel: 'Visit LinkedIn profile'
    },
    { 
      href: 'mailto:contact@example.com', 
      label: 'Email', 
      icon: '✉️',
      ariaLabel: 'Send email'
    }
  ], [])

  return (
    <footer 
      className="w-full bg-gray-800 text-white py-6 border-t border-gray-700"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        {/* Mobile-first Navigation */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-center text-gray-300">
            Quick Navigation
          </h3>
          <nav 
            className="grid grid-cols-4 gap-2"
            role="navigation"
            aria-label="Footer navigation"
          >
            {navigationLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label={`Go to ${link.label}`}
              >
                <span className="text-lg mb-1" role="img" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="text-xs text-gray-300">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-4" />

        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-4">
          {/* Branding */}
          <div className="text-center">
            <Link 
              href="/home" 
              className="text-lg font-bold hover:text-blue-400 transition-colors"
            >
              {APP_METADATA.NAME}
            </Link>
            <p className="text-xs text-gray-400 mt-1">
              v{APP_METADATA.VERSION} • {APP_METADATA.DESCRIPTION}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map(social => (
              <a
                key={social.href}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                aria-label={social.ariaLabel}
              >
                <span className="text-lg" role="img" aria-hidden="true">
                  {social.icon}
                </span>
                <span className="text-sm hidden sm:inline">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright and Build Info */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>
              © {currentYear} {userName}. All rights reserved.
            </p>
            <p>
              Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
            </p>
            
            {/* Development info */}
            {process.env.NODE_ENV === 'development' && (
              <p className="text-yellow-400 bg-yellow-900 bg-opacity-20 px-2 py-1 rounded">
                🚧 Development Mode
              </p>
            )}
          </div>
        </div>

        {/* App Status Indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Status: Online</span>
            <span className="mx-2">•</span>
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer