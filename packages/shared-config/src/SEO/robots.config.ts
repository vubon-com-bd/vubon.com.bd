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

// Base URL
const APP_URL = env.APP_URL || 'https://vubon.com.bd';
// ✅ FIXED: Removed unused API_URL
// const API_URL = env.API_URL || 'https://api.vubon.com.bd';

// Dynamic paths to disallow (Bangladesh e-commerce specific)
const DISALLOW_PATHS = [
  '/api/',
  '/api/*',
  '/graphql',
  '/webhook',
  '/admin/',
  '/admin/*',
  '/dashboard',
  '/dashboard/*',
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
  '/checkout/',
  '/checkout/*',
  '/cart',
  '/cart/*',
  '/payment/',
  '/payment/*',
  '/order/*/invoice',
  '/order/*/confirm',
  '/account/*/edit',
  '/account/*/delete',
  '/account/*/change-password',
  '/profile',
  '/profile/*',
  '/search?*',
  '/filter?*',
  '/sort?*',
  '/page?*',
  '/*?*sort*',
  '/*?*filter*',
  '/*?*page*',
  '/*?*ref*',
  '/*?*utm_source*',
  '/*?*utm_medium*',
  '/*?*utm_campaign*',
  '/*?*utm_term*',
  '/*?*utm_content*',
  '/_next/',
  '/_next/*',
  '/static/',
  '/assets/',
  '/images/temp/',
  '/temp/',
  '/cache/',
  '/uploads/temp/',
  '/uploads/*/temp/',
  '/debug/',
  '/dev/',
  '/test/',
  '/staging/',
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
      enabled: false,
      disallow: ['/'],
      sitemaps: [],
    },
    staging: {
      enabled: true,
      disallow: ['/'],
      sitemaps: [] as string[],
    },
    production: {
      enabled: true,
      disallow: [] as string[],
      sitemaps: [
        `${APP_URL}/sitemap.xml`,
        `${APP_URL}/sitemap-products.xml`,
        `${APP_URL}/sitemap-categories.xml`,
        `${APP_URL}/sitemap-blog.xml`,
      ] as string[],
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
      crawlDelay: 1,
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
    maxSnippet: -1,
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
  const environment = env.NODE_ENV as 'development' | 'staging' | 'production';
  const envConfig = robotsTxtConfig.env[environment];
  
  if (envConfig) {
    // ✅ FIXED: Properly handle sitemaps property
    const sitemaps = 'sitemaps' in envConfig && Array.isArray(envConfig.sitemaps) 
      ? envConfig.sitemaps 
      : robotsTxtConfig.sitemaps;
    
    return {
      ...robotsTxtConfig,
      enabled: envConfig.enabled,
      disallow: envConfig.disallow,
      sitemaps,
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
