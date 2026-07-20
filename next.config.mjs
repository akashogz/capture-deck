/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['playwright-core', '@sparticuz/chromium'],
  outputFileTracingIncludes: {
    '/api/capture': ['./node_modules/playwright-core/**'],
  },
}

export default nextConfig