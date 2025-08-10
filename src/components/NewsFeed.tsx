'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { NewsData, NewsResponse } from '@/types'
import { handleApiError, getTimeAgo, truncateText, sanitizeUrl } from '@/utils'
import { API_CONFIG, SAMPLE_DATA, TIME_CONFIG, ERROR_MESSAGES } from '@/constants'

/**
 * NewsFeed Component
 * 
 * Displays trending news articles with automatic refresh
 * Features:
 * - Fetches latest trending news
 * - Periodic data refresh
 * - Loading states and error handling
 * - Responsive design with article images
 * - External link handling with safety checks
 */

const NewsFeed = () => {
    // Component state
    const [newsArticle, setNewsArticle] = useState<NewsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
    const [imageError, setImageError] = useState(false)

    /**
     * Fetches trending news data from the API
     */
    const fetchNews = useCallback(async () => {
        try {
            console.log('[NewsFeed] Fetching trending articles')
            
            const response = await fetch(API_CONFIG.NEWS_ENDPOINT, {
                headers: {
                    'Accept': 'application/json',
                },
            })
        
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Network error' }))
                throw new Error(errorData.error || `HTTP ${response.status}`)
            }

            const data: NewsResponse = await response.json()
            
            // Validate response structure
            if (!data.news_results || !Array.isArray(data.news_results) || data.news_results.length === 0) {
                throw new Error('No news articles available')
            }

            // Get the first valid article
            const firstArticle = data.news_results[0]
            if (!firstArticle.highlight) {
                throw new Error('Invalid article data structure')
            }

            // Transform API response to component state
            const articleData: NewsData = {
                title: firstArticle.highlight.title || 'No title available',
                mediaurl: firstArticle.highlight.thumbnail || SAMPLE_DATA.NEWS.mediaurl,
                source: firstArticle.highlight.source?.name || 'Unknown Source',
                timestamp: firstArticle.highlight.date || 'Recently',
                articleUrl: sanitizeUrl(firstArticle.highlight.link) || undefined
            }

            setNewsArticle(articleData)
            setError(null)
            setLastUpdated(new Date())
            setImageError(false) // Reset image error state for new article
            
            console.log('[NewsFeed] News data updated successfully')

        } catch (err) {
            const errorMessage = handleApiError(err, ERROR_MESSAGES.NEWS_ERROR)
            console.error('[NewsFeed] News fetch error:', errorMessage)
            
            setError(errorMessage)
            
            // Set fallback data on error
            setNewsArticle({
                title: SAMPLE_DATA.NEWS.title,
                mediaurl: SAMPLE_DATA.NEWS.mediaurl,
                source: SAMPLE_DATA.NEWS.source,
                timestamp: SAMPLE_DATA.NEWS.timestamp
            })
            
        } finally {
            setLoading(false)
        }
    }, [])

    // Initialize news data on component mount
    useEffect(() => {
        fetchNews()
    }, [fetchNews])

    // Set up periodic refresh
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            if (newsArticle && !loading) {
                console.log('[NewsFeed] Refreshing news data')
                fetchNews()
            }
        }, TIME_CONFIG.NEWS_REFRESH_INTERVAL)

        return () => clearInterval(refreshInterval)
    }, [newsArticle, loading, fetchNews])

    /**
     * Manual refresh handler
     */
    const handleRefresh = useCallback(() => {
        if (!loading) {
            setLoading(true)
            fetchNews()
        }
    }, [loading, fetchNews])

    /**
     * Handles article click with safe external navigation
     */
    const handleArticleClick = useCallback((url?: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }, [])

    // Loading state component
    if (loading) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">Trending News</h3>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
                
                {/* Loading skeleton */}
                <div className="animate-pulse space-y-3">
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-700 text-lg">Trending News</h3>
                
                {/* Refresh button */}
                <button
                    onClick={handleRefresh}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded"
                    title="Refresh news"
                    aria-label="Refresh news"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            {/* Error message */}
            {error && (
                <div className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded border-l-4 border-red-200">
                    {error} (showing sample data)
                </div>
            )}
            
            {/* News article display */}
            {newsArticle && (
                <div className="space-y-3">
                    {/* Article image */}
                    <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden group">
                        {!imageError ? (
                            <Image
                                src={newsArticle.mediaurl}
                                alt={newsArticle.title}
                                fill
                                className="object-cover transition-transform duration-200 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                onError={() => {
                                    console.warn('[NewsFeed] Failed to load article image, showing fallback')
                                    setImageError(true)
                                }}
                            />
                        ) : (
                            // Fallback when image fails to load
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                                <div className="text-center">
                                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    <p className="text-xs text-gray-500">News Image</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Image overlay with source */}
                        {newsArticle.source && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                                {newsArticle.source}
                            </div>
                        )}
                    </div>
                    
                    {/* Article content */}
                    <div className="space-y-2">
                        {/* Article title */}
                        <h4 
                            className={`font-semibold text-gray-800 leading-tight ${
                                newsArticle.articleUrl ? 'cursor-pointer hover:text-blue-600 transition-colors' : ''
                            }`}
                            onClick={() => handleArticleClick(newsArticle.articleUrl)}
                            title={newsArticle.title}
                        >
                            {truncateText(newsArticle.title, 120)}
                        </h4>
                        
                        {/* Article metadata */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {getTimeAgo(newsArticle.timestamp || new Date().toISOString())}
                            </span>
                            
                            {/* Read more link */}
                            {newsArticle.articleUrl && (
                                <button
                                    onClick={() => handleArticleClick(newsArticle.articleUrl)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                    aria-label="Read full article"
                                >
                                    Read more →
                                </button>
                            )}
                        </div>
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

export default NewsFeed