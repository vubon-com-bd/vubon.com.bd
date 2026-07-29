/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@vubon/shared-ui',
    '@vubon/auth-shared-auth',
    '@vubon/auth-shared-hooks',
    '@vubon/auth-shared-types',
    '@vubon/auth-shared-api',
    '@vubon/auth-shared-utils',
    '@vubon/auth-shared-schemas',
    '@vubon/auth-shared-config',
    '@vubon/auth-shared-constants',
  ],
};

export default nextConfig;
