import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'i.guim.co.uk',
      'maps.gstatic.com',
      'weather.visualcrossing.com',
      'cdn.weatherapi.com' // Add any other weather icon domains you need
    ],
  },
};


module.exports = nextConfig

export default nextConfig;
