'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { WeatherData, WeatherResponse } from '@/types'
import { getGeolocation, handleApiError } from '@/utils'
import { API_CONFIG, SAMPLE_DATA, TIME_CONFIG, ERROR_MESSAGES } from '@/constants'

/**
 * WeatherCard Component
 * 
 * Displays current weather conditions with automatic location detection
 * Features:
 * - Automatic geolocation with fallback coordinates
 * - Periodic weather data refresh
 * - Loading states and error handling
 * - Responsive design with weather icons
 */

const WeatherCard = () => {
  // Component state
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  /**
   * Fetches weather data from the API
   * @param lat - Latitude coordinate
   * @param lng - Longitude coordinate
   */
  const fetchWeather = useCallback(async (lat: number, lng: number) => {
    try {
      console.log('[WeatherCard] Fetching weather for coordinates:', { lat, lng })
      
      const response = await fetch(
        `${API_CONFIG.WEATHER_ENDPOINT}?lat=${lat}&lng=${lng}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data: WeatherResponse = await response.json()
      
      // Validate response structure
      if (!data.temperature?.degrees || !data.weatherCondition?.description?.text) {
        throw new Error('Invalid weather data received')
      }

      // Transform API response to component state
      const weatherData: WeatherData = {
        temperature: Math.round(data.temperature.degrees),
        condition: data.weatherCondition.description.text,
        iconUrl: data.weatherCondition.iconBaseUri 
          ? `${data.weatherCondition.iconBaseUri}.svg` 
          : undefined,
        humidity: data.humidity,
        windSpeed: data.windSpeed?.value
      }

      setWeather(weatherData)
      setError(null)
      setLastUpdated(new Date())
      
      console.log('[WeatherCard] Weather data updated successfully')
      
    } catch (err) {
      const errorMessage = handleApiError(err, ERROR_MESSAGES.WEATHER_ERROR)
      console.error('[WeatherCard] Weather fetch error:', errorMessage)
      
      setError(errorMessage)
      
      // Set fallback data on error
      setWeather({
        temperature: SAMPLE_DATA.WEATHER.temperature,
        condition: SAMPLE_DATA.WEATHER.condition,
        iconUrl: SAMPLE_DATA.WEATHER.iconUrl
      })
      
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Gets user location and fetches weather data
   */
  const initializeWeather = useCallback(async () => {
    try {
      const coordinates = await getGeolocation()
      await fetchWeather(coordinates.latitude, coordinates.longitude)
    } catch (err) {
      console.error('[WeatherCard] Initialization error:', err)
      setError(handleApiError(err, ERROR_MESSAGES.GEOLOCATION_ERROR))
      setLoading(false)
    }
  }, [fetchWeather])

  // Initialize weather data on component mount
  useEffect(() => {
    initializeWeather()
  }, [initializeWeather])

  // Set up periodic refresh
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (weather && !loading) {
        console.log('[WeatherCard] Refreshing weather data')
        initializeWeather()
      }
    }, TIME_CONFIG.WEATHER_REFRESH_INTERVAL)

    return () => clearInterval(refreshInterval)
  }, [weather, loading, initializeWeather])

  /**
   * Manual refresh handler
   */
  const handleRefresh = useCallback(() => {
    if (!loading) {
      setLoading(true)
      initializeWeather()
    }
  }, [loading, initializeWeather])

  // Loading state component
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">Weather</h3>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
        
        {/* Loading skeleton */}
        <div className="animate-pulse flex items-center gap-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1">
            <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700">Current Weather</h3>
        
        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded"
          title="Refresh weather data"
          aria-label="Refresh weather"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm mb-2 p-2 bg-red-50 rounded border-l-4 border-red-200">
          {error} (showing sample data)
        </div>
      )}

      {/* Weather data display */}
      {weather && (
        <div className="flex items-center gap-4">
          {/* Weather icon */}
          <div className="flex-shrink-0">
            {weather.iconUrl ? (
              <Image
                src={weather.iconUrl}
                alt={weather.condition}
                width={48}
                height={48}
                className="object-contain"
                priority
                onError={(e) => {
                  console.warn('[WeatherCard] Failed to load weather icon')
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                🌤️
              </div>
            )}
          </div>
          
          {/* Weather info */}
          <div className="flex-1 min-w-0">
            <p className="text-2xl font-bold text-gray-800 mb-1">
              {weather.temperature}°F
            </p>
            <p className="text-gray-600 capitalize truncate" title={weather.condition}>
              {weather.condition}
            </p>
            
            {/* Additional weather details */}
            {(weather.humidity || weather.windSpeed) && (
              <div className="flex gap-3 mt-2 text-xs text-gray-500">
                {weather.humidity && (
                  <span title="Humidity">💧 {weather.humidity}%</span>
                )}
                {weather.windSpeed && (
                  <span title="Wind Speed">💨 {weather.windSpeed} mph</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Last updated timestamp */}
      {lastUpdated && (
        <div className="text-xs text-gray-400 mt-3 text-right">
          Updated: {lastUpdated.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          })}
        </div>
      )}
    </div>
  )
}

export default WeatherCard