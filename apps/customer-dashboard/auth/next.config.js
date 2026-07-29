/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@vubon/shared-ui',
    '@vubon/auth-shared-auth',
    '@vubon/auth-shared-hooks',
    '@vubon/auth-shared-types',
    '@vubon/auth-shared-api',
  ],
};

export default nextConfig;
