'use client'

interface GreetingBannerProps {
  userName?: string
}

const GreetingBanner = ({ userName }: GreetingBannerProps) => { 
    const time = new Date().getHours()
  const greeting = 
    time < 12 ? "Good morning" : 
    time < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="bg-gray-800  p-6 rounded-xl text-white shadow-lg">
      <h1 className="text-3xl font-bold">
        {greeting}, {userName || "Guest"}!
      </h1>
      <p className="text-lg opacity-90">
        {new Date().toLocaleDateString("en-US", { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </div>
  )
}

export default GreetingBanner