/**
 * Application constants and configuration
 * 
 * This file contains all the constant values used throughout the application
 * including API endpoints, default values, timeouts, and other configuration.
 */

// Default coordinates (New York City) as fallback
export const DEFAULT_COORDINATES = {
  latitude: 40.7684,
  longitude: -73.9686
} as const;

// API Configuration
export const API_CONFIG = {
  WEATHER_ENDPOINT: '/api/weather',
  NEWS_ENDPOINT: '/api/news',
  REQUEST_TIMEOUT: 5000, // 5 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// External API URLs
export const EXTERNAL_APIS = {
  GOOGLE_WEATHER: 'https://weather.googleapis.com/v1/currentConditions:lookup',
  SERPAPI: 'https://serpapi.com/search',
} as const;

// Time and Date Configuration
export const TIME_CONFIG = {
  CLOCK_UPDATE_INTERVAL: 1000, // 1 second
  WEATHER_REFRESH_INTERVAL: 300000, // 5 minutes
  NEWS_REFRESH_INTERVAL: 600000, // 10 minutes
} as const;

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 256, // pixels
  MOBILE_BREAKPOINT: 1024, // pixels
  ANIMATION_DURATION: 200, // milliseconds
} as const;

// Default Sample Data (used as fallbacks)
export const SAMPLE_DATA = {
  WEATHER: {
    temperature: 22,
    condition: 'Partly cloudy',
    iconUrl: '/icons/partly-cloudy.svg'
  },
  NEWS: {
    title: 'Hurricane brewing near tri-state area, residents advised to prepare',
    mediaurl: '/media/hurricane.jpg',
    source: 'Weather Network',
    timestamp: '2 hours ago'
  },
  EVENTS: [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', day: 'Today' },
    { id: 2, title: 'Code Review', time: '2:30 PM', day: 'Tomorrow' }
  ]
} as const;

// Quick Links Default Configuration
export const DEFAULT_QUICK_LINKS = [
  {
    id: 1,
    name: 'Gmail',
    url: 'https://gmail.com',
    icon: '📧',
    description: 'Email service'
  },
  {
    id: 2,
    name: 'Calendar',
    url: 'https://calendar.google.com',
    icon: '📅',
    description: 'Google Calendar'
  },
  {
    id: 3,
    name: 'Drive',
    url: 'https://drive.google.com',
    icon: '💾',
    description: 'Google Drive'
  },
  {
    id: 4,
    name: 'GitHub',
    url: 'https://github.com',
    icon: '🐱',
    description: 'Code repository'
  }
] as const;

// Application Metadata
export const APP_METADATA = {
  NAME: 'MyDashboard',
  VERSION: '1.0.0',
  DESCRIPTION: 'Personal dashboard with weather, news, and productivity widgets',
  AUTHOR: 'Dashboard Team'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  API_ERROR: 'Service temporarily unavailable. Please try again later.',
  GEOLOCATION_ERROR: 'Unable to access location. Using default location.',
  WEATHER_ERROR: 'Failed to fetch weather data',
  NEWS_ERROR: 'Failed to fetch news data',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully',
  LOCATION_FOUND: 'Location detected successfully',
  REFRESH_COMPLETE: 'Content refreshed'
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#3B82F6', // Blue
    SECONDARY: '#10B981', // Green
    ACCENT: '#F59E0B', // Amber
    ERROR: '#EF4444', // Red
    WARNING: '#F59E0B', // Amber
    SUCCESS: '#10B981', // Green
  }
} as const;
