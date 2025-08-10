'use client'
import { useState, useEffect, useMemo } from 'react'
import { formatDate } from '@/utils'
import { GreetingBannerProps } from '@/types'

/**
 * GreetingBanner Component
 * 
 * Personalized greeting banner with time-based messages
 * Features:
 * - Time-based greeting (morning, afternoon, evening)
 * - Personalized user name
 * - Current date display
 * - Responsive design
 * - Dynamic background gradients
 */

const GreetingBanner = ({ userName, customMessage }: GreetingBannerProps) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  // Update time every minute for accurate greetings
  useEffect(() => {
    // Set initial time after hydration
    setCurrentTime(new Date())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Generate time-based greeting
  const greeting = useMemo(() => {
    if (!currentTime) return "Hello"
    const hour = currentTime.getHours()
    
    if (hour < 5) return "Good night"
    if (hour < 12) return "Good morning" 
    if (hour < 17) return "Good afternoon"
    if (hour < 21) return "Good evening"
    return "Good night"
  }, [currentTime])

  // Generate appropriate emoji for time of day
  const greetingEmoji = useMemo(() => {
    if (!currentTime) return "👋"
    const hour = currentTime.getHours()
    
    if (hour < 5) return "🌙"
    if (hour < 12) return "☀️"
    if (hour < 17) return "🌤️"
    if (hour < 21) return "🌅"
    return "🌙"
  }, [currentTime])

  // Format current date
  const formattedDate = useMemo(() => {
    if (!currentTime) return ""
    return formatDate(currentTime, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [currentTime])

  // Generate dynamic background gradient based on time
  const backgroundGradient = useMemo(() => {
    if (!currentTime) return "from-blue-500 via-purple-500 to-pink-500"
    const hour = currentTime.getHours()
    
    if (hour < 6) return "from-indigo-900 via-purple-900 to-pink-900" // Night
    if (hour < 12) return "from-orange-400 via-pink-500 to-red-500" // Morning
    if (hour < 17) return "from-blue-400 via-cyan-500 to-teal-500" // Afternoon
    if (hour < 20) return "from-purple-500 via-pink-500 to-red-500" // Evening
    return "from-indigo-800 via-purple-800 to-pink-800" // Night
  }, [currentTime])

  // Don't render until currentTime is set (prevents hydration issues)
  if (!currentTime) {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div className="animate-pulse bg-white/20 h-8 w-48 rounded mb-2"></div>
            <div className="animate-pulse bg-white/20 h-5 w-32 rounded"></div>
          </div>
          <div className="text-right">
            <div className="animate-pulse bg-white/20 h-6 w-24 rounded mb-1"></div>
            <div className="animate-pulse bg-white/20 h-4 w-20 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`
        bg-gradient-to-r ${backgroundGradient}
        p-6 lg:p-8 rounded-xl text-white shadow-lg
        relative overflow-hidden
        transform transition-all duration-500 hover:scale-[1.02]
      `}
      role="banner"
      aria-label="Welcome greeting"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Main greeting */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl" role="img" aria-label={`${greeting} emoji`}>
            {greetingEmoji}
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
            {greeting}, {userName || "Guest"}!
          </h1>
        </div>
        
        {/* Custom message or date */}
        <p className="text-base lg:text-lg opacity-90 font-medium">
          {customMessage || formattedDate}
        </p>
        
        {/* Additional context based on time */}
        <p className="text-sm opacity-75 mt-2">
          {(() => {
            if (!currentTime) return "Welcome to your dashboard"
            const hour = currentTime.getHours()
            if (hour < 6) return "Hope you're having a peaceful night"
            if (hour < 12) return "Ready to start your day?"
            if (hour < 17) return "Hope you're having a productive day"
            if (hour < 20) return "How was your day?"
            return "Time to wind down and relax"
          })()}
        </p>
        
        {/* Quick stats */}
        <div className="flex items-center gap-6 mt-4 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {currentTime?.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
              }) || '--:--'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Week {currentTime ? Math.ceil(currentTime.getDate() / 7) : '--'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreetingBanner