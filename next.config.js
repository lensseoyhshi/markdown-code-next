// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:7860/:path*', // 代理到FastAPI后端
            },
        ];
    },
};

module.exports = nextConfig;
