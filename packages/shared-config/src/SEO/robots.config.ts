/**
 * Robots.txt Configuration - Crawler rules
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/seo/robots.config
 * 
 * RULES:
 * ✅ ONLY robots configuration - NO business logic
 * ✅ NO dynamic robots generation, runtime logic
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

// Base URLs
const APP_URL = env.APP_URL || 'https://vubon.com.bd';
const API_URL = env.API_URL || 'https://api.vubon.com.bd';

// Dynamic paths to disallow (Bangladesh e-commerce specific)
const DISALLOW_PATHS = [
  // API routes
  '/api/',
  '/api/*',
  '/graphql',
  '/webhook',
  
  // Admin routes
  '/admin/',
  '/admin/*',
  '/dashboard',
  '/dashboard/*',
  
  // Auth routes
  '/auth/',
  '/auth/*',
  '/login',
  '/logout',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/verify-phone',
  '/mfa',
  '/mfa/*',
  
  // Checkout & Payment
  '/checkout/',
  '/checkout/*',
  '/cart',
  '/cart/*',
  '/payment/',
  '/payment/*',
  '/order/*/invoice',
  '/order/*/confirm',
  
  // Account management
  '/account/*/edit',
  '/account/*/delete',
  '/account/*/change-password',
  '/profile',
  '/profile/*',
  
  // Dynamic pages
  '/search?*',
  '/filter?*',
  '/sort?*',
  '/page?*',
  
  // Query parameters (block all URLs with these params)
  '/*?*sort*',
  '/*?*filter*',
  '/*?*page*',
  '/*?*ref*',
  '/*?*utm_source*',
  '/*?*utm_medium*',
  '/*?*utm_campaign*',
  '/*?*utm_term*',
  '/*?*utm_content*',
  
  // Internal/system paths
  '/_next/',
  '/_next/*',
  '/static/',
  '/assets/',
  '/images/temp/',
  '/temp/',
  '/cache/',
  
  // File uploads
  '/uploads/temp/',
  '/uploads/*/temp/',
  
  // Debug/Dev paths
  '/debug/',
  '/dev/',
  '/test/',
  '/staging/',
  
  // Vendor/Seller paths (not for SEO)
  '/seller/',
  '/seller/*',
  '/vendor/',
  '/vendor/*',
  '/shop/*/admin',
  '/shop/*/dashboard',
];

// Allow paths (overrides disallow for specific patterns)
const ALLOW_PATHS = [
  '/',
  '/*',
  '/products/*',
  '/categories/*',
  '/brands/*',
  '/offers/*',
  '/flash-sale/*',
  '/blog/*',
  '/blog',
  '/about',
  '/contact',
  '/faq',
  '/terms',
  '/privacy',
  '/returns',
  '/shipping',
  '/sitemap.xml',
  '/sitemap-*.xml',
  '/robots.txt',
  '/opensearch.xml',
];

// ==================== Robots.txt Configuration ====================

export const robotsTxtConfig = Object.freeze({
  // Base configuration
  enabled: true,
  outputPath: 'public/robots.txt',
  
  // Whether to generate dynamically or use static file
  dynamicGeneration: false,
  
  // Environment-specific behavior
  env: {
    development: {
      enabled: false, // No robots.txt in development
      disallow: ['/'],
    },
    staging: {
      enabled: true,
      disallow: ['/'],
      sitemaps: [],
    },
    production: {
      enabled: true,
      disallow: [],
      sitemaps: [
        `${APP_URL}/sitemap.xml`,
        `${APP_URL}/sitemap-products.xml`,
        `${APP_URL}/sitemap-categories.xml`,
        `${APP_URL}/sitemap-blog.xml`,
      ],
    },
  },
  
  // Sitemap locations
  sitemaps: [
    `${APP_URL}/sitemap.xml`,
    `${APP_URL}/sitemap-index.xml`,
  ],
  
  // User agents and rules
  userAgents: [
    {
      name: '*',
      allow: ALLOW_PATHS,
      disallow: DISALLOW_PATHS,
      crawlDelay: 1, // seconds
    },
    {
      name: 'Googlebot',
      allow: ['/'],
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/checkout/',
        '/cart/',
      ],
      crawlDelay: 0.5,
    },
    {
      name: 'Googlebot-Image',
      allow: ['/images/', '/products/*/images', '/categories/*/images'],
      disallow: ['/admin/', '/api/', '/temp/'],
      crawlDelay: 0.5,
    },
    {
      name: 'Googlebot-Video',
      allow: ['/videos/', '/products/*/videos'],
      disallow: ['/admin/', '/api/'],
      crawlDelay: 0.5,
    },
    {
      name: 'Bingbot',
      allow: ['/'],
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/checkout/',
        '/cart/',
      ],
      crawlDelay: 1,
    },
    {
      name: 'DuckDuckBot',
      allow: ['/'],
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/checkout/',
        '/cart/',
      ],
      crawlDelay: 1,
    },
    {
      name: 'YandexBot',
      allow: ['/'],
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/checkout/',
        '/cart/',
      ],
      crawlDelay: 1,
    },
    {
      name: 'Baiduspider',
      allow: ['/'],
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/checkout/',
        '/cart/',
      ],
      crawlDelay: 2,
    },
  ],
  
  // Crawl delay by user agent
  crawlDelay: {
    '*': 1,
    'Googlebot': 0.5,
    'Bingbot': 1,
    'YandexBot': 1,
    'Baiduspider': 2,
  },
  
  // Host directive (for non-standard setups)
  host: APP_URL,
  
  // Clean-param directive (remove tracking parameters)
  cleanParams: [
    'ref',
    'source',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
    'msclkid',
    'mc_cid',
    'mc_eid',
    '_ga',
    '_gl',
    'session_id',
    'token',
  ],
  
  // Additional rules
  additionalRules: [
    `Host: ${APP_URL}`,
    `Sitemap: ${APP_URL}/sitemap.xml`,
    `Disallow: /api/`,
    `Disallow: /admin/`,
    `Disallow: /auth/`,
    `Disallow: /checkout/`,
    `Disallow: /cart/`,
    `Allow: /products/`,
    `Allow: /categories/`,
    `Allow: /brands/`,
    `Allow: /offers/`,
    `Crawl-delay: 1`,
  ],
} as const);

// ==================== Meta Robots Rules ====================

export const metaRobotsConfig = Object.freeze({
  default: {
    index: true,
    follow: true,
    archive: true,
    snippet: true,
    imageIndex: true,
    maxSnippet: -1, // No limit
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
  noIndex: {
    index: false,
    follow: true,
    archive: false,
    snippet: false,
    imageIndex: false,
  },
  noFollow: {
    index: true,
    follow: false,
  },
  noIndexNoFollow: {
    index: false,
    follow: false,
    archive: false,
    snippet: false,
    imageIndex: false,
  },
  // Bangladesh specific: prevent indexing of Bengali search results
  noIndexSearch: {
    index: false,
    follow: true,
    archive: false,
    snippet: false,
  },
} as const);

// ==================== Helper Functions ====================

/**
 * Get robots.txt config for current environment
 */
export const getRobotsTxtConfig = () => {
  const environment = env.NODE_ENV;
  const envConfig = robotsTxtConfig.env[environment as keyof typeof robotsTxtConfig.env];
  if (envConfig) {
    return {
      ...robotsTxtConfig,
      enabled: envConfig.enabled,
      disallow: envConfig.disallow,
      sitemaps: envConfig.sitemaps || robotsTxtConfig.sitemaps,
    };
  }
  return robotsTxtConfig;
};

/**
 * Get meta robots directive for a page
 */
export const getMetaRobots = (type: keyof typeof metaRobotsConfig): MetaRobots => {
  return metaRobotsConfig[type] || metaRobotsConfig.default;
};

// ==================== Type Exports ====================

export type RobotsTxtConfig = typeof robotsTxtConfig;
export type MetaRobotsConfig = typeof metaRobotsConfig;

export interface MetaRobots {
  index: boolean;
  follow: boolean;
  archive?: boolean;
  snippet?: boolean;
  imageIndex?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}
