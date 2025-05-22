'use client'
import Sidebar from "@/components/Sidebar"
import GreetingBanner from "@/components/GreetingBanner"
import WeatherCard from "@/components/WeatherCard"
import TodoList from "@/components/TodoList"
import QuickLinks from "@/components/QuickLinks"
import NewsFeed from "@/components/NewsFeed"
import Footer from "@/components/Footer"
import Clock from "@/components/Clock"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:flex-row">
      {/* Sidebar - Hidden on mobile, shown on lg+ screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <GreetingBanner userName="Developer" />
        
        {/* Two-column widget layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 lg:mt-8">
          {/* Left Column */}
          <div className="space-y-6">
            <WeatherCard />
            <TodoList />
            <QuickLinks />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <Clock />
            <NewsFeed />
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
              <p className="text-gray-600">Your activity will appear here</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer - Shown on mobile, hidden on lg+ screens */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  )
}

export default Home