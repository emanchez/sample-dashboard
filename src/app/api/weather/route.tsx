import { NextResponse } from 'next/server'
import { EXTERNAL_APIS, ERROR_MESSAGES, API_CONFIG } from '@/constants'
import type { WeatherResponse } from '@/types'

/**
 * Weather API Route Handler
 * 
 * Fetches current weather conditions using Google Weather API
 * Supports caching and proper error handling with fallback responses
 * 
 * Query Parameters:
 * - lat: Latitude coordinate (required)
 * - lng: Longitude coordinate (required)
 * 
 * Returns:
 * - WeatherResponse: Current weather data in imperial units
 * - Error: 400/500 status with error details
 */

// Simple in-memory cache for weather data (5 minutes TTL)
const weatherCache = new Map<string, { data: WeatherResponse; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Generates cache key from coordinates
 */
const getCacheKey = (lat: string, lng: string): string => {
  // Round coordinates to reduce cache fragmentation
  const roundedLat = Math.round(parseFloat(lat) * 100) / 100
  const roundedLng = Math.round(parseFloat(lng) * 100) / 100
  return `${roundedLat},${roundedLng}`
}

/**
 * Validates coordinate parameters
 */
const validateCoordinates = (lat: string | null, lng: string | null): boolean => {
  if (!lat || !lng) return false
  
  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)
  
  return !isNaN(latNum) && !isNaN(lngNum) && 
         latNum >= -90 && latNum <= 90 &&
         lngNum >= -180 && lngNum <= 180
}

export async function GET(request: Request) {
  try {
    console.log('[Weather API] Request received')
    
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    // Validate required parameters
    if (!validateCoordinates(lat, lng)) {
      console.error('[Weather API] Invalid coordinates:', { lat, lng })
      return NextResponse.json(
        { error: 'Invalid or missing location parameters' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = getCacheKey(lat!, lng!)
    const cached = weatherCache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      console.log('[Weather API] Returning cached data')
      return NextResponse.json(cached.data)
    }

    // Validate API key
    const API_KEY = process.env.GOOGLE_MAPS_APIKEY
    if (!API_KEY) {
      console.error('[Weather API] Missing API key')
      return NextResponse.json(
        { error: 'Weather service configuration error' },
        { status: 500 }
      )
    }

    // Construct API URL
    const apiUrl = `${EXTERNAL_APIS.GOOGLE_WEATHER}?key=${API_KEY}&location.latitude=${lat}&location.longitude=${lng}&unitsSystem=IMPERIAL`
    console.log('[Weather API] Calling Google Weather API')

    // Fetch with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT)

    const response = await fetch(apiUrl, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'MyDashboard/1.0'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      console.error('[Weather API] External API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      
      throw new Error(`Weather API returned ${response.status}: ${response.statusText}`)
    }

    const data: WeatherResponse = await response.json()
    console.log('[Weather API] Successfully fetched weather data')

    // Validate response structure
    if (!data.temperature || !data.weatherCondition) {
      throw new Error('Invalid weather data structure received')
    }

    // Cache the successful response
    weatherCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes browser cache
      }
    })
    
  } catch (error) {
    console.error('[Weather API] Error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Weather request timed out' },
          { status: 504 }
        )
      }
      
      return NextResponse.json(
        { 
          error: ERROR_MESSAGES.WEATHER_ERROR,
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.GENERIC_ERROR },
      { status: 500 }
    )
  }
}