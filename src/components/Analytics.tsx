'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'

/**
 * Analytics Component
 * 
 * Developer productivity metrics dashboard
 * Features:
 * - Real-time productivity scoring
 * - Multiple metric categories
 * - Trend indicators
 * - Color-coded performance levels
 * - Responsive grid layout
 * - Automatic data refresh
 */

interface DevMetrics {
  prsMerged: number
  bugsResolved: number
  tasksCompleted: number
  codeReviews: number
  linesAdded: number
  linesDeleted: number
  commitsToday: number
  testsWritten: number
}

interface MetricCardProps {
  title: string
  value: number | string
  icon: string
  trend: string
  description?: string
  category?: 'productivity' | 'quality' | 'collaboration'
}

const Analytics = () => {
  // Component state
  const [metrics, setMetrics] = useState<DevMetrics>({
    prsMerged: 0,
    bugsResolved: 0,
    tasksCompleted: 0,
    codeReviews: 0,
    linesAdded: 0,
    linesDeleted: 0,
    commitsToday: 0,
    testsWritten: 0
  })

  const [refreshTime, setRefreshTime] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Simulates fetching analytics data
   * In a real app, this would call actual APIs (GitHub, JIRA, etc.)
   */
  const fetchMetrics = useCallback(async () => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate realistic mock data
    setMetrics({
      prsMerged: Math.floor(Math.random() * 12) + 3,
      bugsResolved: Math.floor(Math.random() * 18) + 5,
      tasksCompleted: Math.floor(Math.random() * 25) + 8,
      codeReviews: Math.floor(Math.random() * 10) + 2,
      linesAdded: Math.floor(Math.random() * 2000) + 500,
      linesDeleted: Math.floor(Math.random() * 1200) + 200,
      commitsToday: Math.floor(Math.random() * 8) + 1,
      testsWritten: Math.floor(Math.random() * 15) + 3
    })
    
    setRefreshTime(new Date())
    setIsLoading(false)
    console.log('[Analytics] Metrics updated')
  }, [])

  // Initialize and set up periodic refresh
  useEffect(() => {
    fetchMetrics()
    
    const interval = setInterval(fetchMetrics, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [fetchMetrics])

  /**
   * Calculates productivity score based on weighted metrics
   */
  const productivityScore = useMemo(() => {
    const score = Math.min(
      100,
      Math.round(
        (
          metrics.prsMerged * 8 + 
          metrics.bugsResolved * 5 + 
          metrics.tasksCompleted * 3 + 
          metrics.codeReviews * 4 +
          metrics.commitsToday * 6 +
          metrics.testsWritten * 4 +
          (metrics.linesAdded / 100) +
          (metrics.linesDeleted / 200)
        ) / 4
      )
    )
    return Math.max(0, score)
  }, [metrics])

  /**
   * Gets performance level and styling based on score
   */
  const performanceLevel = useMemo(() => {
    if (productivityScore >= 85) return { level: 'Excellent', color: 'bg-green-500', textColor: 'text-green-700' }
    if (productivityScore >= 70) return { level: 'Good', color: 'bg-blue-500', textColor: 'text-blue-700' }
    if (productivityScore >= 50) return { level: 'Average', color: 'bg-yellow-500', textColor: 'text-yellow-700' }
    return { level: 'Needs Improvement', color: 'bg-red-500', textColor: 'text-red-700' }
  }, [productivityScore])

  /**
   * Manual refresh handler
   */
  const handleRefresh = useCallback(() => {
    if (!isLoading) {
      fetchMetrics()
    }
  }, [isLoading, fetchMetrics])

  // Metric cards configuration
  const metricCards: MetricCardProps[] = useMemo(() => [
    { 
      title: "PRs Merged", 
      value: metrics.prsMerged, 
      icon: "🔄", 
      trend: "+2 this week",
      description: "Pull requests successfully merged",
      category: "productivity"
    },
    { 
      title: "Bugs Fixed", 
      value: metrics.bugsResolved, 
      icon: "🐛", 
      trend: "+5 this week",
      description: "Issues resolved and closed",
      category: "quality"
    },
    { 
      title: "Tasks Done", 
      value: metrics.tasksCompleted, 
      icon: "✅", 
      trend: "+8 this week",
      description: "Completed tasks and stories",
      category: "productivity"
    },
    { 
      title: "Code Reviews", 
      value: metrics.codeReviews, 
      icon: "👀", 
      trend: "+3 this week",
      description: "Code reviews completed",
      category: "collaboration"
    },
    { 
      title: "Commits Today", 
      value: metrics.commitsToday, 
      icon: "💾", 
      trend: `${metrics.commitsToday} today`,
      description: "Git commits made today",
      category: "productivity"
    },
    { 
      title: "Tests Written", 
      value: metrics.testsWritten, 
      icon: "🧪", 
      trend: "+4 this week",
      description: "Unit and integration tests",
      category: "quality"
    },
    { 
      title: "Lines Added", 
      value: metrics.linesAdded.toLocaleString(), 
      icon: "➕", 
      trend: "+1.2K this week",
      description: "New lines of code",
      category: "productivity"
    },
    { 
      title: "Lines Cleaned", 
      value: metrics.linesDeleted.toLocaleString(), 
      icon: "🧹", 
      trend: "+800 this week",
      description: "Refactored or removed code",
      category: "quality"
    }
  ], [metrics])

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Dev Analytics</h3>
          <p className="text-xs text-gray-500">
            Last updated: {refreshTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded disabled:opacity-50"
          title="Refresh metrics"
          aria-label="Refresh analytics data"
        >
          <svg 
            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Productivity Score */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Productivity Score</span>
          <div className="text-right">
            <span className="font-bold text-lg">{productivityScore}</span>
            <span className="text-gray-500">/100</span>
          </div>
        </div>
        
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${performanceLevel.color}`}
            style={{ width: `${productivityScore}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${performanceLevel.textColor}`}>
            {performanceLevel.level}
          </span>
          <span className="text-xs text-gray-500">
            Based on this week&apos;s activity
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metricCards.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} index={index} />
        ))}
      </div>
    </div>
  )
}

/**
 * Individual Metric Card Component
 */
const MetricCard = ({ title, value, icon, trend, description, category, index = 0 }: MetricCardProps & { index?: number }) => {
  // Get category-specific styling
  const categoryStyle = useMemo(() => {
    switch (category) {
      case 'productivity':
        return 'bg-blue-50 border-blue-100'
      case 'quality':
        return 'bg-green-50 border-green-100'
      case 'collaboration':
        return 'bg-purple-50 border-purple-100'
      default:
        return 'bg-gray-50 border-gray-100'
    }
  }, [category])

  return (
    <div 
      className={`
        p-3 rounded-lg border transition-all duration-200 hover:shadow-md group
        ${categoryStyle}
        animate-fade-in-up
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      title={description}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-600 text-xs font-medium leading-tight">
          {title}
        </span>
        <span className="text-lg group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold text-gray-800">
          {value}
        </span>
        <span className="text-xs text-gray-500 text-right leading-tight">
          {trend}
        </span>
      </div>
    </div>
  )
}

export default Analytics