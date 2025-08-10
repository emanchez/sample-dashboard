import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_METADATA } from "@/constants";

/**
 * Font Configuration
 * Using Google Fonts with CSS variables for consistent typography
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  weight: ["300", "400", "500", "600", "700"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"]
});

/**
 * Application Metadata
 * SEO-optimized metadata for better discoverability
 */
export const metadata: Metadata = {
  title: {
    default: APP_METADATA.NAME,
    template: `%s | ${APP_METADATA.NAME}`,
  },
  description: APP_METADATA.DESCRIPTION,
  keywords: [
    "dashboard",
    "personal dashboard",
    "weather",
    "news",
    "productivity",
    "calendar",
    "widgets",
  ],
  authors: [{ name: APP_METADATA.AUTHOR }],
  creator: APP_METADATA.AUTHOR,
  applicationName: APP_METADATA.NAME,
  generator: "Next.js",
  
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    title: APP_METADATA.NAME,
    description: APP_METADATA.DESCRIPTION,
    siteName: APP_METADATA.NAME,
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: APP_METADATA.NAME,
    description: APP_METADATA.DESCRIPTION,
  },
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Additional metadata
  category: "productivity",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

/**
 * Root Layout Component
 * 
 * Provides the base HTML structure and global styles
 * Features:
 * - Font optimization with CSS variables
 * - Proper accessibility attributes
 * - Performance optimizations
 * - SEO-friendly structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning // Suppress hydration warnings for client-specific content
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Viewport and theme configuration */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3B82F6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1E40AF" media="(prefers-color-scheme: dark)" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//weather.googleapis.com" />
        <link rel="dns-prefetch" href="//serpapi.com" />
      </head>
      
      <body
        className={`
          antialiased 
          font-sans 
          bg-gray-50 
          text-gray-900 
          min-h-screen
          selection:bg-blue-200 
          selection:text-blue-900
        `}
        suppressHydrationWarning
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
            bg-blue-600 text-white px-4 py-2 rounded-md z-50
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          Skip to main content
        </a>
        
        {/* Main application content */}
        <div id="main-content" role="main">
          {children}
        </div>
        
        {/* Global error boundary and performance monitoring could go here */}
        <div id="portal-root" /> {/* Portal root for modals, tooltips, etc. */}
      </body>
    </html>
  );
}
