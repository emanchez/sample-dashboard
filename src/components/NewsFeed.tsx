'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NewsData {
    title: string
    mediaurl: string
    source?: string
    timestamp?: string  
    articleUrl?: string
}

const NewsFeed = () => {

    const [newsArticle, setNewsArticle] = useState<NewsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNews = async () => {
        try {

            console.log('Fetching trending article') // Debugging
            const response = await fetch(
                `/api/news`
            )
        
            console.log('News response status:', response.status) // Debugging

            if (!response.ok) {
                const errorData = await response.json()
                console.error('API error details:', errorData)
                throw new Error(errorData.error || 'Weather API request failed')
            }
            const data = await response.json()
            console.log('Article data:', data) // Debugging
            
            if (!data) {
                throw new Error('Invalid news data format')
            }

            setNewsArticle({
                title: data.news_results[0].highlight.title,
                mediaurl: data.news_results[0].highlight.thumbnail, // Use a placeholder or default image
                source: data.news_results[0].highlight.source.name,
                timestamp: data.news_results[0].highlight.date,
                articleUrl: data.news_results[0].highlight.link
            })

        } catch (err) {
            console.error('Full fetch error:', err)
            setError(err instanceof Error ? err.message : 'Unknown error')
            setNewsArticle({
                title: "Hurricane brewing near tri-state area, residents advised to prepare",
                mediaurl: "/media/hurricane.jpg", // Use a placeholder or default image
                source: "Weather Network",
                timestamp: "2 hours ago"
            })
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchNews()
    }, []) // Empty dependency array to run only once

    if (loading){

        return (
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-2">News</h3>
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
        <h3 className="font-semibold text-gray-700 mb-3 text-lg">Trending News</h3>
        {error && (
            <p className="text-red-500 text-sm mb-2">{error} (showing sample data)</p>
        )}
        
        {newsArticle && (
            <div className="space-y-3">
                {/* Image Container - with fallback */}
                <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                    {newsArticle.mediaurl ? (
                    <Image
                        // src={newsArticle.mediaurl.slice(0, newsArticle.mediaurl.indexOf("?"))}
                        src='/media/hurricane.jpg'
                        alt={newsArticle.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                    ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <span>No image available</span>
                    </div>
                    )}
                </div>

                {/* News Content */}
                <div>
                    <h4 className="font-medium text-gray-900 line-clamp-2">
                        {newsArticle.title}
                    </h4>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{newsArticle.source || "Unknown source"}</span>
                        <span>{newsArticle.timestamp || "Just now"}</span>
                    </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                    <a href={newsArticle.articleUrl}>Read Full Story</a>
                </button>
            </div>
        )}
    </div>
    )
}

export default NewsFeed