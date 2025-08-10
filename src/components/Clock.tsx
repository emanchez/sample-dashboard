'use client'
import { useState, useEffect, useCallback } from 'react'
import { formatTime, formatDate } from '@/utils'
import { TIME_CONFIG } from '@/constants'

/**
 * Clock Component
 * 
 * Displays current time and date with automatic updates
 * Features:
 * - Real-time clock with seconds
 * - 12-hour format with AM/PM
 * - Current date display
 * - Custom digital font styling
 * - Automatic cleanup of intervals
 */

const Clock = () => {
  // Component state
  const [time, setTime] = useState('--:-- --')
  const [date, setDate] = useState('')
  const [is24Hour, setIs24Hour] = useState(false)

  /**
   * Updates the clock display with current time and date
   */
  const updateClock = useCallback(() => {
    const now = new Date()
    
    // Format time based on user preference
    const timeString = is24Hour 
      ? now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      : formatTime(now, true)
    
    // Format date (e.g., "Monday, January 1")
    const dateString = formatDate(now, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })

    setTime(timeString)
    setDate(dateString)
  }, [is24Hour])

  /**
   * Toggles between 12-hour and 24-hour format
   */
  const toggleTimeFormat = useCallback(() => {
    setIs24Hour(prev => !prev)
  }, [])

  // Initialize and set up clock updates
  useEffect(() => {
    // Update immediately on mount
    updateClock()
    
    // Set up interval for regular updates
    const interval = setInterval(updateClock, TIME_CONFIG.CLOCK_UPDATE_INTERVAL)
    
    // Cleanup interval on unmount
    return () => {
      clearInterval(interval)
    }
  }, [updateClock])

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">Current Time</h3>
        
        {/* Time format toggle */}
        <button
          onClick={toggleTimeFormat}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          title={`Switch to ${is24Hour ? '12' : '24'}-hour format`}
          aria-label={`Switch to ${is24Hour ? '12' : '24'}-hour format`}
        >
          {is24Hour ? '12H' : '24H'}
        </button>
      </div>
      
      {/* Digital Clock Display */}
      <div className="text-center space-y-2">
        {/* Time display */}
        <div 
          className="font-digital text-gray-800 text-4xl sm:text-5xl tracking-wider select-none"
          role="timer"
          aria-live="polite"
          aria-label={`Current time is ${time}`}
        >
          {time}
        </div>
        
        {/* Date display */}
        <div 
          className="text-gray-600 text-base font-medium"
          aria-label={`Today is ${date}`}
        >
          {date}
        </div>
        
        {/* Timezone indicator */}
        <div className="text-xs text-gray-400 mt-2">
          {Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => {
            // Copy current time to clipboard
            navigator.clipboard?.writeText(time).then(() => {
              console.log('[Clock] Time copied to clipboard')
            }).catch(() => {
              console.warn('[Clock] Failed to copy time to clipboard')
            })
          }}
          className="text-xs px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          title="Copy current time"
          aria-label="Copy current time to clipboard"
        >
          📋 Copy Time
        </button>
      </div>
    </div>
  )
}

export default Clock