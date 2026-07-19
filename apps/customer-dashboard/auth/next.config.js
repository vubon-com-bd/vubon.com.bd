/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@vubon/auth-shared-api", "@vubon/auth-shared-auth"]
};

module.exports = nextConfig;
