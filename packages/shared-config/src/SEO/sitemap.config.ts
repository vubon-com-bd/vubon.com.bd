/**
 * Sitemap Configuration - Sitemap generation rules
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/seo/sitemap.config
 * 
 * RULES:
 * ✅ ONLY sitemap configuration - NO business logic
 * ✅ NO filesystem crawling, dynamic generation logic
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

// Base URL
const APP_URL = env.APP_URL || 'https://vubon.com.bd';

// ==================== Sitemap Configuration ====================

export const sitemapConfig = Object.freeze({
  // Base configuration
  enabled: true,
  outputPath: 'public/sitemap.xml',
  indexPath: 'public/sitemap-index.xml',
  
  // Sitemap index splitting
  maxUrlsPerSitemap: 50000,
  maxSitemapSizeBytes: 50 * 1024 * 1024, // 50MB
  
  // ==================== Change Frequencies ====================
  defaultChangeFreq: 'monthly' as const,
  changeFreqByType: {
    homepage: 'daily' as const,
    product: 'weekly' as const,
    category: 'weekly' as const,
    brand: 'weekly' as const,
    blog: 'daily' as const,
    offers: 'daily' as const,
    flashSale: 'hourly' as const,
    static: 'monthly' as const,
    tag: 'weekly' as const,
    search: 'never' as const,
  },
  
  // ==================== Priorities (0.0 - 1.0) ====================
  defaultPriority: 0.5,
  prioritiesByType: {
    homepage: 1.0,
    product: 0.8,
    category: 0.7,
    brand: 0.7,
    blog: 0.6,
    offers: 0.7,
    flashSale: 0.9,
    static: 0.5,
    tag: 0.4,
    search: 0.1,
  },
  
  // ==================== Last Modified ====================
  includeLastModified: true,
  lastModifiedStrategy: 'database' as const, // 'git', 'file', 'database', 'api'
  
  // ==================== Dynamic Routes ====================
  dynamicRoutes: [
    // Products
    '/products/:id',
    '/products/:slug',
    '/products/:slug/reviews',
    
    // Categories
    '/categories/:slug',
    '/categories/:slug/products',
    '/categories/:slug/filter',
    
    // Brands
    '/brands/:slug',
    '/brands/:slug/products',
    
    // Blog
    '/blog/:slug',
    '/blog/category/:slug',
    '/blog/tag/:slug',
    
    // Offers
    '/offers/:id',
    '/offers/:slug',
    '/flash-sale/:id',
    '/flash-sale/:slug',
  ],
  
  // ==================== Static Routes ====================
  staticRoutes: [
    '/',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/faq',
    '/shipping',
    '/returns',
    '/blog',
    '/sitemap',
    '/offers',
    '/flash-sale',
    '/new-arrivals',
    '/bestsellers',
    '/trending',
    '/brands',
    '/stores',
  ],
  
  // ==================== Alternative Languages ====================
  alternateLanguages: {
    enabled: true,
    defaultLanguage: 'en',
    languages: ['en', 'bn'],
    languageUrls: {
      en: APP_URL,
      bn: `${APP_URL}/bn`,
    },
  },
  
  // ==================== Additional Sitemap Types ====================
  
  // Video Sitemap
  videoSitemap: {
    enabled: true,
    outputPath: 'public/video-sitemap.xml',
    maxUrls: 1000,
    fields: [
      'thumbnail_loc',
      'title',
      'description',
      'content_loc',
      'player_loc',
      'duration',
      'expiration_date',
      'rating',
      'view_count',
      'publication_date',
      'family_friendly',
      'restriction',
      'gallery_loc',
      'price',
      'requires_subscription',
      'uploader',
      'live',
    ],
  },
  
  // Image Sitemap
  imageSitemap: {
    enabled: true,
    outputPath: 'public/image-sitemap.xml',
    maxUrls: 1000,
    fields: [
      'loc',
      'caption',
      'geo_location',
      'title',
      'license',
    ],
  },
  
  // News Sitemap (Google News)
  newsSitemap: {
    enabled: false,
    outputPath: 'public/news-sitemap.xml',
    publicationName: 'Vubon',
    publicationNameBn: 'ভুবন',
    publicationLanguage: 'en',
    publicationLanguageBn: 'bn',
    genres: ['PressRelease', 'Blog', 'UserGenerated'],
    access: 'Subscription' as const, // 'Subscription' | 'Registration'
    stockTickers: [],
  },
  
  // Mobile Sitemap
  mobileSitemap: {
    enabled: false,
    outputPath: 'public/mobile-sitemap.xml',
  },
  
  // Code Search Sitemap (for developers)
  codeSitemap: {
    enabled: false,
    outputPath: 'public/code-sitemap.xml',
  },
  
  // Geo Sitemap (for location-based content)
  geoSitemap: {
    enabled: false,
    outputPath: 'public/geo-sitemap.xml',
    geoFormats: ['kml', 'georss'],
  },
  
  // ==================== Exclusion Rules ====================
  excludePaths: [
    '/auth/*',
    '/api/*',
    '/admin/*',
    '/dashboard/*',
    '/checkout/*',
    '/cart',
    '/account/*/edit',
    '/account/*/delete',
    '/order/*/invoice',
    '/order/*/confirm',
    '/payment/*',
    '/seller/*/admin',
    '/vendor/*/dashboard',
    '/404',
    '/500',
    '/_error',
    '/_next/*',
    '/debug/*',
    '/dev/*',
    '/test/*',
    '/staging/*',
  ],
  
  // ==================== Additional Rules ====================
  additionalRules: {
    // Remove query parameters from URLs
    removeQueryParams: true,
    
    // Normalize URLs
    normalizeUrls: true,
    
    // Ensure trailing slash consistency
    trailingSlash: false,
    
    // Lowercase URLs
    lowercaseUrls: true,
  },
} as const);

// ==================== Helper Functions ====================

/**
 * Get change frequency for a page type
 */
export const getChangeFrequency = (type: keyof typeof sitemapConfig.changeFreqByType): string => {
  return sitemapConfig.changeFreqByType[type] || sitemapConfig.defaultChangeFreq;
};

/**
 * Get priority for a page type
 */
export const getPriority = (type: keyof typeof sitemapConfig.prioritiesByType): number => {
  return sitemapConfig.prioritiesByType[type] || sitemapConfig.defaultPriority;
};

/**
 * Get full URL for a path
 */
export const getFullUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${APP_URL}${normalizedPath}`;
};

// ==================== Type Exports ====================

export type SitemapConfig = typeof sitemapConfig;
export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
