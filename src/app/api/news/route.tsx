import { NextResponse } from "next/server"
import { EXTERNAL_APIS, ERROR_MESSAGES, API_CONFIG } from '@/constants'
import type { NewsResponse } from '@/types'

/**
 * News API Route Handler
 * 
 * Fetches trending news articles using SerpAPI Google News
 * Supports caching and proper error handling with fallback responses
 * 
 * Query Parameters:
 * - None required (fetches trending US news in English)
 * 
 * Returns:
 * - NewsResponse: Array of trending news articles
 * - Error: 400/500 status with error details
 */

// Simple in-memory cache for news data (10 minutes TTL)
const newsCache = new Map<string, { data: NewsResponse; timestamp: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes in milliseconds

/**
 * Generates cache key for news data
 */
const getCacheKey = (): string => {
  // Cache key based on current hour to refresh hourly
  const hour = new Date().getHours()
  return `news_${hour}`
}

export async function GET() {
    try {
        console.log('[News API] Request received')
        
        // Check cache first
        const cacheKey = getCacheKey()
        const cached = newsCache.get(cacheKey)
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
            console.log('[News API] Returning cached data')
            return NextResponse.json(cached.data)
        }

        // Validate API key
        const API_KEY = process.env.SERPAPI_API_KEY
        if (!API_KEY) {
            console.error('[News API] Missing API key')
            return NextResponse.json(
                { error: 'News service configuration error' },
                { status: 500 }
            )
        }

        // Construct API URL with better parameters
        const apiUrl = `${EXTERNAL_APIS.SERPAPI}?engine=google_news&gl=us&hl=en&num=10&api_key=${API_KEY}`
        console.log('[News API] Calling SerpAPI')

        // Fetch with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT)

        const response = await fetch(apiUrl, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'MyDashboard/1.0',
                'Accept': 'application/json'
            }
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error')
            console.error('[News API] External API error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            })
            
            throw new Error(`News API returned ${response.status}: ${response.statusText}`)
        }

        const data: NewsResponse = await response.json()
        console.log('[News API] Successfully fetched news data')

        // Validate response structure
        if (!data.news_results || !Array.isArray(data.news_results)) {
            throw new Error('Invalid news data structure received')
        }

        // Filter out articles without essential data
        const validArticles = data.news_results.filter(article => 
            article.highlight?.title && 
            article.highlight?.source?.name &&
            article.highlight?.link
        )

        const processedData: NewsResponse = {
            ...data,
            news_results: validArticles
        }

        // Cache the successful response
        newsCache.set(cacheKey, {
            data: processedData,
            timestamp: Date.now()
        })

        return NextResponse.json(processedData, {
            headers: {
                'Cache-Control': 'public, max-age=600', // 10 minutes browser cache
            }
        })
        
    } catch (error) {
        console.error('[News API] Error:', error)
        
        // Handle specific error types
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return NextResponse.json(
                    { error: 'News request timed out' },
                    { status: 504 }
                )
            }
            
            return NextResponse.json(
                { 
                    error: ERROR_MESSAGES.NEWS_ERROR,
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