'use client'
import { useState } from 'react'

const Calendar = () => {
  const [events] = useState([
    { id: 1, title: 'Team Meeting', time: '10:00 AM', day: 'Today' },
    { id: 2, title: 'Code Review', time: '2:30 PM', day: 'Tomorrow' }
  ])

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 text-gray-800">
      <h3 className="font-semibold text-gray-800 mb-3">Upcoming Events</h3>
      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="flex items-start">
            <div className="bg-blue-100 text-blue-800 p-1 rounded mr-3 text-xs min-w-[3.5rem] text-center">
              {event.day}
            </div>
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-600">{event.time}</p>
            </div>
          </div>
        ))}
        <button className="text-blue-600 text-sm mt-2 hover:underline">
          + Add Event
        </button>
      </div>
    </div>
  )
}

export default Calendar