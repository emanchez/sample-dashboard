'use client'
import { useState, useCallback, useMemo } from 'react'
import { CalendarEvent } from '@/types'
import { formatDate } from '@/utils'

/**
 * Calendar Component
 * 
 * Displays upcoming events and calendar functionality
 * Features:
 * - Event list with categorization
 * - Add new events (placeholder functionality)
 * - Event status indicators
 * - Responsive design
 * - Date/time formatting
 */

const Calendar = () => {
  // Component state
  const [events, setEvents] = useState<CalendarEvent[]>([
    { 
      id: 1, 
      title: 'Team Meeting', 
      time: '10:00 AM', 
      day: 'Today',
      description: 'Weekly team sync meeting',
      category: 'meeting'
    },
    { 
      id: 2, 
      title: 'Code Review', 
      time: '2:30 PM', 
      day: 'Tomorrow',
      description: 'Review pull requests and code quality',
      category: 'work'
    },
    {
      id: 3,
      title: 'Lunch Break',
      time: '12:00 PM',
      day: 'Today',
      description: 'Lunch with the development team',
      category: 'personal'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    day: 'Today',
    description: '',
    category: 'work' as CalendarEvent['category']
  })

  /**
   * Gets appropriate styling for event categories
   */
  const getCategoryStyles = useCallback((category: CalendarEvent['category'] = 'other') => {
    const styles = {
      meeting: 'bg-blue-100 text-blue-800 border-blue-200',
      work: 'bg-green-100 text-green-800 border-green-200',
      personal: 'bg-purple-100 text-purple-800 border-purple-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return styles[category] || styles.other
  }, [])

  /**
   * Gets appropriate icon for event categories
   */
  const getCategoryIcon = useCallback((category: CalendarEvent['category'] = 'other') => {
    const icons = {
      meeting: '👥',
      work: '💼',
      personal: '🏠',
      other: '📅'
    }
    return icons[category] || icons.other
  }, [])

  /**
   * Sorts events by priority (today first, then by time)
   */
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      // Today's events come first
      if (a.day === 'Today' && b.day !== 'Today') return -1
      if (a.day !== 'Today' && b.day === 'Today') return 1
      
      // Then sort by time (simplified)
      return a.time.localeCompare(b.time)
    })
  }, [events])

  /**
   * Handles adding a new event
   */
  const handleAddEvent = useCallback(() => {
    if (!newEvent.title.trim() || !newEvent.time.trim()) return

    const event: CalendarEvent = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      title: newEvent.title.trim(),
      time: newEvent.time,
      day: newEvent.day,
      description: newEvent.description?.trim(),
      category: newEvent.category
    }

    setEvents(prev => [...prev, event])
    setNewEvent({
      title: '',
      time: '',
      day: 'Today',
      description: '',
      category: 'work'
    })
    setShowAddForm(false)

    console.log('[Calendar] Added new event:', event.title)
  }, [newEvent, events])

  /**
   * Handles removing an event
   */
  const handleRemoveEvent = useCallback((id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id))
    console.log('[Calendar] Removed event:', id)
  }, [])

  /**
   * Gets the count of today's events
   */
  const todayEventsCount = useMemo(() => {
    return events.filter(event => event.day === 'Today').length
  }, [events])

  return (
    <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
          {todayEventsCount > 0 && (
            <p className="text-xs text-gray-500">
              {todayEventsCount} event{todayEventsCount > 1 ? 's' : ''} today
            </p>
          )}
        </div>
        
        {/* Add event button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          aria-label={showAddForm ? 'Cancel adding event' : 'Add new event'}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Event'}
        </button>
      </div>

      {/* Add event form */}
      {showAddForm && (
        <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-2">
          <input
            type="text"
            placeholder="Event title"
            value={newEvent.title}
            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={50}
          />
          
          <div className="flex gap-2">
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
              className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              value={newEvent.day}
              onChange={(e) => setNewEvent(prev => ({ ...prev, day: e.target.value }))}
              className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="This Week">This Week</option>
            </select>
            
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent(prev => ({ 
                ...prev, 
                category: e.target.value as CalendarEvent['category']
              }))}
              className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="work">Work</option>
              <option value="meeting">Meeting</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            onClick={handleAddEvent}
            disabled={!newEvent.title.trim() || !newEvent.time}
            className="w-full p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add Event
          </button>
        </div>
      )}

      {/* Events list */}
      <div className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No upcoming events</p>
            <p className="text-xs">Click &quot;Add Event&quot; to create one</p>
          </div>
        ) : (
          sortedEvents.map(event => (
            <div key={event.id} className="flex items-start group">
              {/* Day/Category indicator */}
              <div className={`
                flex items-center gap-1 p-2 rounded mr-3 text-xs min-w-[4rem] text-center border
                ${getCategoryStyles(event.category)}
              `}>
                <span className="text-xs">{getCategoryIcon(event.category)}</span>
                <span className="font-medium">{event.day}</span>
              </div>
              
              {/* Event details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate" title={event.title}>
                      {event.title}
                    </p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-1" title={event.description}>
                        {event.description.length > 50 
                          ? `${event.description.substring(0, 50)}...`
                          : event.description
                        }
                      </p>
                    )}
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveEvent(event.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 ml-2 p-1 transition-all"
                    title="Remove event"
                    aria-label={`Remove ${event.title}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer with current date */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          {formatDate(new Date(), { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  )
}

export default Calendar