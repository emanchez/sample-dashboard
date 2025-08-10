/**
 * Type definitions for the Sample Dashboard application
 * 
 * This file contains all TypeScript interfaces and types used across the application
 * to ensure type safety and better developer experience.
 */

// Weather API Response Types
export interface WeatherResponse {
  temperature: {
    degrees: number;
    unit: string;
  };
  weatherCondition: {
    description: {
      text: string;
    };
    iconBaseUri: string;
  };
  humidity?: number;
  windSpeed?: {
    value: number;
    unit: string;
  };
}

// Local Weather Data Interface
export interface WeatherData {
  temperature: number;
  condition: string;
  iconUrl?: string;
  humidity?: number;
  windSpeed?: number;
}

// News API Response Types
export interface NewsResponse {
  news_results: NewsResult[];
  search_metadata?: {
    google_news_url: string;
    total_results: number;
  };
}

export interface NewsResult {
  highlight: {
    title: string;
    thumbnail?: string;
    source: {
      name: string;
      icon?: string;
    };
    date: string;
    link: string;
  };
}

// Local News Data Interface
export interface NewsData {
  title: string;
  mediaurl: string;
  source?: string;
  timestamp?: string;
  articleUrl?: string;
}

// Calendar/Event Types
export interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  day: string;
  description?: string;
  category?: 'meeting' | 'personal' | 'work' | 'other';
}

// Analytics Data Types
export interface AnalyticsData {
  label: string;
  value: number;
  change?: number;
  period?: string;
}

// Quick Link Types
export interface QuickLink {
  id: number;
  name: string;
  url: string;
  icon?: string;
  description?: string;
}

// Generic API Error Interface
export interface ApiError {
  error: string;
  details?: string;
  statusCode?: number;
}

// Component Props Types
export interface GreetingBannerProps {
  userName: string;
  customMessage?: string;
}

// Geolocation Coordinates Interface
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Environment Variables Interface (for better type safety)
export interface EnvironmentVariables {
  MY_NAME?: string;
  GOOGLE_MAPS_APIKEY?: string;
  SERPAPI_API_KEY?: string;
  SAMPLE_LAT?: string;
  SAMPLE_LONG?: string;
}
