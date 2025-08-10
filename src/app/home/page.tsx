'use client'
import { useMemo } from 'react'
import Sidebar from "@/components/Sidebar"
import GreetingBanner from "@/components/GreetingBanner"
import WeatherCard from "@/components/WeatherCard"
import QuickLinks from "@/components/QuickLinks"
import NewsFeed from "@/components/NewsFeed"
import Footer from "@/components/Footer"
import Clock from "@/components/Clock"
import Calendar from "@/components/Calendar"
import Analytics from "@/components/Analytics"

/**
 * Home Dashboard Page
 * 
 * Main dashboard interface with responsive widget layout
 * Features:
 * - Responsive sidebar navigation
 * - Personalized greeting
 * - Weather and news widgets
 * - Calendar and productivity tools
 * - Two-column responsive layout
 * - Mobile-optimized design
 */

const Home = () => {
  // Get user name from environment or use default
  const userName = useMemo(() => {
    return process.env.MY_NAME?.split(' ')[0] || 'Developer'
  }, [])

  // Widget configuration for better maintainability
  const leftColumnWidgets = useMemo(() => [
    { component: WeatherCard, key: 'weather' },
    { component: Calendar, key: 'calendar' },
    { component: Analytics, key: 'analytics' },
    { component: QuickLinks, key: 'quicklinks' }
  ], [])

  const rightColumnWidgets = useMemo(() => [
    { component: Clock, key: 'clock' },
    { component: NewsFeed, key: 'news' }
  ], [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:flex-row">
      {/* Sidebar Navigation - Hidden on mobile, shown on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main 
        className="flex-1 lg:ml-64 p-4 lg:p-8"
        role="main"
        aria-label="Dashboard main content"
      >
        {/* Personalized Greeting */}
        <div className="mb-6 lg:mb-8">
          <GreetingBanner userName={userName} />
        </div>
        
        {/* Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column Widgets */}
          <div 
            className="space-y-6"
            role="region"
            aria-label="Primary dashboard widgets"
          >
            {leftColumnWidgets.map(({ component: Component, key }) => (
              <div key={key} className="widget-container">
                <Component />
              </div>
            ))}
          </div>
          
          {/* Right Column Widgets */}
          <div 
            className="space-y-6"
            role="region"
            aria-label="Secondary dashboard widgets"
          >
            {rightColumnWidgets.map(({ component: Component, key }) => (
              <div key={key} className="widget-container">
                <Component />
              </div>
            ))}
            
            {/* Recent Activity Widget - Placeholder for future functionality */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-gray-700 text-sm">
                    Dashboard loaded successfully
                  </p>
                  <span className="text-xs text-gray-500 ml-auto">
                    Just now
                  </span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700 text-sm">
                    Weather data updated
                  </p>
                  <span className="text-xs text-gray-500 ml-auto">
                    2 min ago
                  </span>
                </div>
                
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    More activity features coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance metrics - Only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Development Info</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• Widgets are rendered dynamically</p>
              <p>• API calls are cached for performance</p>
              <p>• All components are optimized for accessibility</p>
            </div>
          </div>
        )}
      </main>
      
      {/* Mobile Footer Navigation - Hidden on large screens */}
      <div className="lg:hidden bg-white border-t border-gray-200">
        <Footer />
      </div>
    </div>
  )
}

export default Home