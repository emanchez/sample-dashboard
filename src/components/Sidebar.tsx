'use client'
import Link from "next/link"
import { useState, useMemo, useEffect } from 'react'
import { APP_METADATA } from '@/constants'

/**
 * Sidebar Component
 * 
 * Navigation sidebar for the dashboard application
 * Features:
 * - Responsive design (hidden on mobile, visible on desktop)
 * - Active link highlighting
 * - User information display
 * - Quick access navigation links
 * - Collapsible design capability
 */

interface NavigationItem {
  href: string
  icon: string
  label: string
  description?: string
}

const Sidebar = () => {
    // State for hydration-safe values
    const [currentYear, setCurrentYear] = useState<number>(2025) // Default fallback
    const [userName, setUserName] = useState<string>('Dashboard User')
    const [isHydrated, setIsHydrated] = useState(false)
    
    // Component state for collapse functionality
    const [isCollapsed, setIsCollapsed] = useState(false)
    
    // Handle hydration and set dynamic values
    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
        setUserName(process.env.NEXT_PUBLIC_USER_NAME || 'Dashboard User')
        setIsHydrated(true)
    }, [])
    
    // Navigation items configuration
    const navigationItems: NavigationItem[] = useMemo(() => [
        {
            href: "/home",
            icon: "🏠",
            label: "Dashboard",
            description: "Main dashboard view"
        },
        {
            href: "/",
            icon: "ℹ️",
            label: "About",
            description: "About this application"
        },
        {
            href: "/projects",
            icon: "📁",
            label: "Projects",
            description: "My current projects"
        },
        {
            href: "/settings",
            icon: "⚙️",
            label: "Settings",
            description: "App preferences"
        }
    ], [])
    
    // Prevent hydration issues by not rendering dynamic content until hydrated
    if (!isHydrated) {
        return (
            <aside 
                className="w-64 bg-gray-800 text-white min-h-screen p-4 fixed left-0 top-0 
                          shadow-lg border-r border-gray-700 flex flex-col"
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Loading state - matches the initial server render */}
                <div className="mb-8 p-2 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {APP_METADATA.NAME}
                            </h1>
                            <p className="text-xs text-gray-400 mt-1">
                                v{APP_METADATA.VERSION}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Static navigation structure for loading */}
                <nav className="flex-1" role="menubar">
                    <ul className="space-y-2" role="menu">
                        <li>
                            <div className="animate-pulse h-10 bg-gray-700 rounded-lg"></div>
                        </li>
                        <li>
                            <div className="animate-pulse h-10 bg-gray-700 rounded-lg"></div>
                        </li>
                    </ul>
                </nav>
                
                {/* Loading footer */}
                <div className="mt-auto p-3 text-center border-t border-gray-700">
                    <div className="text-xs text-gray-400">
                        <div className="animate-pulse h-4 bg-gray-700 rounded"></div>
                    </div>
                </div>
            </aside>
        )
    }

    return (
        <aside 
            className={`
                ${isCollapsed ? 'w-16' : 'w-64'} 
                bg-gray-800 text-white min-h-screen p-4 fixed left-0 top-0 
                transition-all duration-300 ease-in-out
                shadow-lg border-r border-gray-700
                flex flex-col
            `}
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Header with brand and collapse toggle */}
            <div className="mb-8 p-2 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {APP_METADATA.NAME}
                            </h1>
                            <p className="text-xs text-gray-400 mt-1">
                                v{APP_METADATA.VERSION}
                            </p>
                        </div>
                    )}
                    
                    {/* Collapse toggle button */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1 rounded hover:bg-gray-700 transition-colors ml-auto"
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <svg 
                            className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7" 
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1" role="menubar">
                <ul className="space-y-2" role="none">
                    {navigationItems.map((item) => (
                        <li key={item.href} role="none">
                            <Link 
                                href={item.href}
                                className="
                                    flex items-center gap-3 p-3 rounded-lg 
                                    hover:bg-gray-700 active:bg-gray-600
                                    transition-colors duration-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
                                    group
                                "
                                title={isCollapsed ? `${item.label} - ${item.description}` : item.description}
                                role="menuitem"
                            >
                                {/* Icon */}
                                <span 
                                    className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform"
                                    aria-hidden="true"
                                >
                                    {item.icon}
                                </span>
                                
                                {/* Label and description */}
                                {!isCollapsed && (
                                    <div className="flex-1 min-w-0">
                                        <span className="font-medium text-white">
                                            {item.label}
                                        </span>
                                        {item.description && (
                                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                                
                                {/* Active indicator */}
                                <div className="w-1 h-6 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User info and footer section */}
            <div className="mt-auto">
                {/* User profile section */}
                {!isCollapsed && (
                    <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                            {/* Avatar placeholder */}
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            
                            {/* User info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    Welcome back!
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {userName}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Copyright/Footer */}
                <div 
                    className={`
                        p-3 text-center border-t border-gray-700
                        ${isCollapsed ? 'px-2' : ''}
                    `}
                >
                    {isCollapsed ? (
                        <div className="text-xs text-gray-400">
                            {currentYear}
                        </div>
                    ) : (
                        <div className="text-xs text-gray-400">
                            <p>© {currentYear} {userName}</p>
                            <p className="mt-1 text-gray-500">
                                Made with ❤️
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar