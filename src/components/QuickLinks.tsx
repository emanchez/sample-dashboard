'use client'
import { useState, useCallback, useMemo } from 'react'
import { QuickLink } from '@/types'
import { sanitizeUrl } from '@/utils'
import { DEFAULT_QUICK_LINKS } from '@/constants'

/**
 * QuickLinks Component
 * 
 * Customizable quick access links widget
 * Features:
 * - Predefined useful links
 * - Custom link management
 * - Safe URL handling
 * - Responsive grid layout
 * - Icon support with fallbacks
 * - Add/remove functionality
 */

const QuickLinks = () => {
  // Component state
  const [links, setLinks] = useState<QuickLink[]>([...DEFAULT_QUICK_LINKS])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLink, setNewLink] = useState({
    name: '',
    url: '',
    icon: '🔗',
    description: ''
  })

  /**
   * Handles opening a link safely
   */
  const handleLinkClick = useCallback((url: string) => {
    const safeUrl = sanitizeUrl(url)
    if (safeUrl) {
      window.open(safeUrl, '_blank', 'noopener,noreferrer')
    } else {
      console.warn('[QuickLinks] Invalid URL:', url)
    }
  }, [])

  /**
   * Handles adding a new quick link
   */
  const handleAddLink = useCallback(() => {
    if (!newLink.name.trim() || !newLink.url.trim()) return

    const safeUrl = sanitizeUrl(newLink.url.trim())
    if (!safeUrl) {
      alert('Please enter a valid URL (starting with http:// or https://)')
      return
    }

    const link: QuickLink = {
      id: Math.max(...links.map(l => l.id), 0) + 1,
      name: newLink.name.trim(),
      url: safeUrl,
      icon: newLink.icon.trim() || '🔗',
      description: newLink.description.trim() || undefined
    }

    setLinks(prev => [...prev, link])
    setNewLink({ name: '', url: '', icon: '🔗', description: '' })
    setShowAddForm(false)

    console.log('[QuickLinks] Added new link:', link.name)
  }, [newLink, links])

  /**
   * Handles removing a quick link
   */
  const handleRemoveLink = useCallback((id: number) => {
    setLinks(prev => prev.filter(link => link.id !== id))
    console.log('[QuickLinks] Removed link:', id)
  }, [])

  /**
   * Gets the domain name from a URL for display
   */
  const getDomain = useCallback((url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }, [])

  // Memoized popular link suggestions
  const linkSuggestions = useMemo(() => [
    { name: 'Gmail', icon: '📧', url: 'https://gmail.com' },
    { name: 'Calendar', icon: '�', url: 'https://calendar.google.com' },
    { name: 'Notion', icon: '📝', url: 'https://notion.so' },
    { name: 'YouTube', icon: '🎥', url: 'https://youtube.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  ], [])

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-700">Quick Links</h3>
          <p className="text-xs text-gray-500 mt-1">
            {links.length} link{links.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        
        {/* Add link button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          aria-label={showAddForm ? 'Cancel adding link' : 'Add new link'}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Link'}
        </button>
      </div>

      {/* Add link form */}
      {showAddForm && (
        <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
          <div className="grid grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="Icon (emoji)"
              value={newLink.icon}
              onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value }))}
              className="p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              maxLength={2}
            />
            <input
              type="text"
              placeholder="Link name"
              value={newLink.name}
              onChange={(e) => setNewLink(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={30}
            />
          </div>
          
          <input
            type="url"
            placeholder="https://example.com"
            value={newLink.url}
            onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Description (optional)"
            value={newLink.description}
            onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={50}
          />

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">Quick add:</span>
            {linkSuggestions.map((suggestion) => (
              <button
                key={suggestion.name}
                onClick={() => setNewLink({
                  name: suggestion.name,
                  url: suggestion.url,
                  icon: suggestion.icon,
                  description: ''
                })}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                {suggestion.icon} {suggestion.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddLink}
            disabled={!newLink.name.trim() || !newLink.url.trim()}
            className="w-full p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add Link
          </button>
        </div>
      )}

      {/* Links grid */}
      <div className="space-y-2">
        {links.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <p>No quick links yet</p>
            <p className="text-xs">Click &quot;Add Link&quot; to create one</p>
          </div>
        ) : (
          links.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              {/* Link icon */}
              <span className="text-xl flex-shrink-0" title={link.name}>
                {link.icon}
              </span>
              
              {/* Link info */}
              <div 
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleLinkClick(link.url)}
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800 truncate">
                    {link.name}
                  </p>
                  <svg className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 truncate" title={link.url}>
                    {getDomain(link.url)}
                  </p>
                  {link.description && (
                    <p className="text-xs text-gray-400 ml-2 truncate" title={link.description}>
                      {link.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveLink(link.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 transition-all"
                title="Remove link"
                aria-label={`Remove ${link.name}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default QuickLinks