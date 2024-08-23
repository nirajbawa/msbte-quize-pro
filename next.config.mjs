/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com', 'ui-avatars.com'],
    },
};

export default nextConfig;
