'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface WeatherData {
  temperature: number
  condition: string
  iconUrl?: string
}

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async (lat: number, lng: number) => {
    try {
      console.log('Fetching weather for:', lat, lng) // Debugging
      
      const response = await fetch(
        `/api/weather?lat=${lat}&lng=${lng}`
      )
      
      console.log('Weather response status:', response.status) // Debugging
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error details:', errorData)
        throw new Error(errorData.error || 'Weather API request failed')
      }

      const data = await response.json()
      console.log('Weather data:', data) // Debugging
      
      if (!data) {
        throw new Error('Invalid weather data format')
      }

      setWeather({
        temperature: Math.round(data.temperature.degrees),
        condition: data.weatherCondition.description.text,
        iconUrl: `${data.weatherCondition.iconBaseUri}.svg`
      })
    } catch (err) {
      console.error('Full fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setWeather({
        temperature: 22,
        condition: 'Partly cloudy'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(
            position.coords.latitude, 
            position.coords.longitude
          )
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to New York coordinates
          fetchWeather(40.7684, -73.9686)
        },
        { timeout: 5000 }
      )
    }

    getLocation()
  }, [])

  // ... rest of your component remains the same ...


  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-2">Weather</h3>
        <div className="animate-pulse flex items-center gap-2">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-3">Current Weather</h3>
      
      {error && (
        <p className="text-red-500 text-sm mb-2">{error} (showing sample data)</p>
      )}

      {weather && (
        <div className="flex items-center gap-4">
          {weather.iconUrl && (
            <Image
              src={weather.iconUrl}
              alt={weather.condition}
              width={48}
              height={48}
              className="object-contain"
            />
          )}
          
          <div>
            <p className="text-2xl font-bold text-gray-800">{weather.temperature}°F</p>
            <p className="text-gray-600 capitalize">{weather.condition}</p>
            
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherCard