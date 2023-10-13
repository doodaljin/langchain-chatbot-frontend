/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      // here you can add the url's that you are planning 
     // to use inside your next/image.
      domains: ["oaidalleapiprodscus.blob.core.windows.net"],
    },
  };

module.exports = nextConfig
