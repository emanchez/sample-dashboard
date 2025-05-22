'use client'
import { useState, useEffect } from 'react'

const Clock = () => {
  const [time, setTime] = useState('--:-- --')
  const [date, setDate] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      
      // 12-hour format with AM/PM
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      })
      
      // Date format (e.g., "Monday, January 1")
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })

      setTime(timeString)
      setDate(dateString)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
      <h3 className="font-semibold text-gray-700 mb-3">Time</h3>
      {/* Digital Clock Display */}
      <div className="font-digital text-gray-800 text-5xl text-center tracking-wider">
        {time}
      </div>
      
      

    </div>
  )
}

export default Clock