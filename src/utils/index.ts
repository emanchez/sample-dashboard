/**
 * Utility functions for the Sample Dashboard application
 * 
 * This module contains reusable utility functions that can be used
 * across different components and modules to reduce code duplication
 * and improve maintainability.
 */

import { Coordinates } from '@/types';

/**
 * Formats a date object to a human-readable string
 * @param date - The date to format
 * @param options - Intl.DateTimeFormatOptions for customizing the output
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options || defaultOptions);
};

/**
 * Formats time to 12-hour format with AM/PM
 * @param date - The date object containing the time
 * @param includeSeconds - Whether to include seconds in the output
 * @returns Formatted time string
 */
export const formatTime = (date: Date, includeSeconds: boolean = true): string => {
  return date.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' })
  });
};

/**
 * Calculates time difference in a human-readable format
 * @param timestamp - The timestamp to compare against current time
 * @returns Human-readable time difference (e.g., "2 hours ago")
 */
export const getTimeAgo = (timestamp: string | Date): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now.getTime() - past.getTime();
  
  const minutes = Math.floor(diffInMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
  return 'Just now';
};

/**
 * Validates and sanitizes URL strings
 * @param url - The URL to validate
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:' 
      ? url 
      : null;
  } catch {
    return null;
  }
};

/**
 * Handles API errors with consistent error messages
 * @param error - The error object or message
 * @param fallbackMessage - Default message if error is not descriptive
 * @returns Formatted error message
 */
export const handleApiError = (
  error: unknown, 
  fallbackMessage: string = 'An unexpected error occurred'
): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return fallbackMessage;
};

/**
 * Gets user's geolocation with fallback coordinates
 * @param fallbackCoords - Default coordinates to use if geolocation fails
 * @returns Promise resolving to coordinates
 */
export const getGeolocation = (
  fallbackCoords: Coordinates = { latitude: 40.7684, longitude: -73.9686 }
): Promise<Coordinates> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(fallbackCoords);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        // On error, use fallback coordinates
        resolve(fallbackCoords);
      },
      { 
        timeout: 5000,
        enableHighAccuracy: true 
      }
    );
  });
};

/**
 * Debounces a function call to prevent excessive API calls
 * @param func - The function to debounce
 * @param wait - The delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Truncates text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Creates a delay for a specified number of milliseconds
 * @param ms - Number of milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
