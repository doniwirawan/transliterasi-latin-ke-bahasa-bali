/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static export for PWA compatibility
    output: 'export',
    trailingSlash: true,

    // Disable image optimization for static export
    images: {
        unoptimized: true
    },

    // PWA configuration
    async headers() {
        return [
            {
                source: '/site.webmanifest',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json',
                    },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript',
                    },
                    {
                        key: 'Service-Worker-Allowed',
                        value: '/',
                    },
                ],
            },
        ];
    },

    // Ensure proper PWA caching
    async rewrites() {
        return [
            {
                source: '/manifest.json',
                destination: '/site.webmanifest',
            },
        ];
    },
}

export default nextConfig