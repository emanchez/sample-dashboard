import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'i.guim.co.uk',
      'maps.gstatic.com',
      'weather.visualcrossing.com',
      'cdn.weatherapi.com',
      // News image domains
      'assets1.cbsnewsstatic.com',
      'assets2.cbsnewsstatic.com',
      'assets3.cbsnewsstatic.com',
      'cdn.cnn.com',
      'ichef.bbci.co.uk',
      'static01.nyt.com',
      'www.washingtonpost.com',
      'media.npr.org',
      'cdn.abcnews.com',
      'cdn.nbcnews.com',
      'fox6now.com',
      'www.reuters.com',
      'cdn.vox-cdn.com',
      'img.huffingtonpost.com',
      'cdn.theatlantic.com',
      'assets.bwbx.io',
      // Generic image hosting
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
  },
};


module.exports = nextConfig

export default nextConfig;
