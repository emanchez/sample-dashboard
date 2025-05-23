'use client'
import { useState, useEffect } from 'react'

const DevAnalytics = () => {
  const [metrics, setMetrics] = useState({
    prsMerged: 0,
    bugsResolved: 0,
    tasksCompleted: 0,
    codeReviews: 0,
    linesAdded: 0,
    linesDeleted: 0
  })

  // Mock data simulation - replace with real API calls
  useEffect(() => {
    const simulateData = () => {
      setMetrics({
        prsMerged: Math.floor(Math.random() * 10),
        bugsResolved: Math.floor(Math.random() * 15),
        tasksCompleted: Math.floor(Math.random() * 20),
        codeReviews: Math.floor(Math.random() * 8),
        linesAdded: Math.floor(Math.random() * 1500),
        linesDeleted: Math.floor(Math.random() * 800)
      })
    }
    
    simulateData()
    const interval = setInterval(simulateData, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [])

  const productivityScore = Math.min(
    100,
    Math.round(
        (
            metrics.prsMerged * 5 + 
            metrics.bugsResolved * 3 + 
            metrics.tasksCompleted * 2 + 
            metrics.codeReviews +
            metrics.linesAdded / 50 +
            metrics.linesDeleted / 100
        ) / 2
    )
  )

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Dev Metrics</h3>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Productivity Score */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Productivity Score</span>
          <span>{productivityScore}/100</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              productivityScore > 80 ? 'bg-green-500' : 
              productivityScore > 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${productivityScore}%` }}
          />
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard 
          title="PRs Merged" 
          value={metrics.prsMerged} 
          icon="🔄" 
          trend="+2"
        />
        <MetricCard 
          title="Bugs Fixed" 
          value={metrics.bugsResolved} 
          icon="🐛" 
          trend="+5"
        />
        <MetricCard 
          title="Tasks Done" 
          value={metrics.tasksCompleted} 
          icon="✅" 
          trend="+3"
        />
        <MetricCard 
          title="Code Reviews" 
          value={metrics.codeReviews} 
          icon="👀" 
          trend="+1"
        />
        <MetricCard 
          title="Lines Added" 
          value={metrics.linesAdded.toLocaleString()} 
          icon="➕" 
          trend="+428"
        />
        <MetricCard 
          title="Lines Deleted" 
          value={metrics.linesDeleted.toLocaleString()} 
          icon="➖" 
          trend="+210"
        />
      </div>
    </div>
  )
}

// Reusable metric component
const MetricCard = ({ title, value, icon, trend }: { 
  title: string, 
  value: number | string, 
  icon: string, 
  trend: string 
}) => (
  <div className="p-3 bg-gray-50 rounded-lg">
    <div className="flex justify-between">
      <span className="text-gray-600 text-sm">{title}</span>
      <span>{icon}</span>
    </div>
    <div className="flex items-end mt-1">
      <span className="text-xl font-bold">{value}</span>
      <span className={`text-xs ml-2 ${
        trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend}
      </span>
    </div>
  </div>
)

export default DevAnalytics