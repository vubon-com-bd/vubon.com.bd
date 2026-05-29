/**
 * SEO Configuration - Metadata defaults and SEO rules
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/seo/seo.config
 * 
 * RULES:
 * ✅ ONLY SEO configuration - NO business logic
 * ✅ NO dynamic SEO generation, meta tag rendering
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

// Base URL
const APP_URL = env.APP_URL || 'https://vubon.com.bd';

// ==================== Site Metadata ====================

export const seoConfig = Object.freeze({
  // Site defaults
  siteName: 'Vubon',
  siteNameBn: 'ভুবন', // Bangladesh specific
  siteUrl: APP_URL,
  siteEmail: 'info@vubon.com.bd',
  sitePhone: '+880123456789',
  
  // Title defaults
  defaultTitle: 'Vubon - বাংলাদেশের শীর্ষস্থানীয় ই-কমার্স প্ল্যাটফর্ম',
  defaultTitleBn: 'ভুবন - বাংলাদেশের শীর্ষস্থানীয় ই-কমার্স প্ল্যাটফর্ম',
  titleTemplate: '%s | Vubon',
  titleTemplateBn: '%s | ভুবন',
  
  // Description defaults
  defaultDescription: 'Vubon - Bangladesh\'s most trusted e-commerce platform. Shop electronics, fashion, home goods, and more with secure payments and fast delivery.',
  defaultDescriptionBn: 'ভুবন - বাংলাদেশের সবচেয়ে বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। নিরাপদ পেমেন্ট এবং দ্রুত ডেলিভারিতে ইলেকট্রনিক্স, ফ্যাশন, হোম গুডস এবং আরও অনেক কিছু কেনাকাটা করুন।',
  descriptionMaxLength: 160,
  
  // Keywords
  defaultKeywords: [
    'ecommerce',
    'bangladesh',
    'online shopping',
    'vubon',
    'bd shop',
    'electronics',
    'fashion',
    'home goods',
    'online store',
    'বাংলাদেশ',
    'অনলাইন শপিং',
    'ইলেকট্রনিক্স',
    'ফ্যাশন',
  ],
  
  // Author information
  author: 'Vubon E-commerce',
  copyright: `© ${new Date().getFullYear()} Vubon. All rights reserved.`,
  
  // ==================== Open Graph Defaults ====================
  openGraph: {
    type: 'website',
    siteName: 'Vubon',
    siteNameBn: 'ভুবন',
    locale: 'en_US',
    alternateLocales: ['bn_BD'],
    defaultImage: `${APP_URL}/images/og-default.jpg`,
    defaultImageBn: `${APP_URL}/images/og-default-bn.jpg`,
    defaultImageWidth: 1200,
    defaultImageHeight: 630,
    defaultImageAlt: 'Vubon - Premier E-commerce Platform in Bangladesh',
    defaultImageAltBn: 'ভুবন - বাংলাদেশের শীর্ষস্থানীয় ই-커머স প্ল্যাটফর্ম',
  },
  
  // ==================== Twitter Card Defaults ====================
  twitter: {
    card: 'summary_large_image',
    site: '@vubon',
    creator: '@vubon',
    siteId: '1234567890',
    creatorId: '1234567890',
    defaultImage: `${APP_URL}/images/twitter-card.jpg`,
    defaultImageAlt: 'Vubon - Shop with confidence',
  },
  
  // ==================== Canonical Rules ====================
  canonicalUrl: true,
  trailingSlash: false,
  removeQueryParams: [
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
    '_ga',
    'session_id',
    'token',
  ],
  
  // ==================== Indexing Rules ====================
  noIndexPaths: [
    '/auth/*',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
    '/auth/verify-phone',
    '/account/*/edit',
    '/account/*/change-password',
    '/account/*/delete',
    '/checkout/*',
    '/cart',
    '/cart/*',
    '/payment/*',
    '/order/*/confirm',
    '/order/*/invoice',
    '/search?*',
    '/filter?*',
    '/api/*',
    '/admin/*',
    '/dashboard/*',
    '/seller/*/admin',
    '/vendor/*/dashboard',
    '/debug/*',
    '/dev/*',
    '/test/*',
    '/staging/*',
    '/*?*page=*',
    '/*?*sort=*',
    '/*?*filter=*',
  ],
  
  // ==================== Sitemap Rules ====================
  includeInSitemap: true,
  sitemapChangeFreq: {
    homepage: 'daily',
    product: 'weekly',
    category: 'weekly',
    blog: 'daily',
    static: 'monthly',
  },
  sitemapPriority: {
    homepage: 1.0,
    product: 0.8,
    category: 0.7,
    blog: 0.6,
    static: 0.5,
  },
  excludePaths: [
    '/auth/*',
    '/api/*',
    '/admin/*',
    '/checkout/*',
    '/cart',
    '/account/*/edit',
    '/404',
    '/500',
    '/_error',
    '/_next/*',
  ],
  
  // ==================== Additional Meta Tags ====================
  additionalMeta: {
    // Format detection
    'format-detection': 'telephone=no, email=no, address=no',
    
    // Viewport
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
    
    // Theme
    'theme-color': '#4f46e5',
    'color-scheme': 'light dark',
    
    // Mobile
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Vubon',
    
    // Microsoft
    'msapplication-TileColor': '#4f46e5',
    'msapplication-config': '/browserconfig.xml',
    
    // PWA
    'application-name': 'Vubon',
    'mobile-web-app-capable': 'yes',
  },
  
  // ==================== Link Tags ====================
  additionalLinks: [
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'search', href: '/opensearch.xml', type: 'application/opensearchdescription+xml', title: 'Vubon Search' },
  ],
  
  // ==================== Language Alternatives ====================
  alternateLanguages: {
    en: `${APP_URL}/en`,
    bn: `${APP_URL}/bn`,
  },
  
  // ==================== Verification ====================
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.BING_SITE_VERIFICATION || '',
    yandex: process.env.YANDEX_VERIFICATION || '',
    pinterest: process.env.PINTEREST_VERIFICATION || '',
  },
  
  // ==================== JSON-LD Defaults ====================
  jsonLd: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Vubon',
      url: APP_URL,
      logo: `${APP_URL}/logo.png`,
      sameAs: [
        'https://facebook.com/vubon',
        'https://twitter.com/vubon',
        'https://instagram.com/vubon',
        'https://linkedin.com/company/vubon',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+880123456789',
        contactType: 'customer service',
        areaServed: 'BD',
        availableLanguage: ['English', 'Bengali'],
      },
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Vubon',
      url: APP_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${APP_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  },
} as const);

// ==================== Robots Defaults ====================

export const robotsConfig = Object.freeze({
  defaultRobots: ['index', 'follow', 'max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1'],
  noIndexRobots: ['noindex', 'nofollow'],
  noFollowRobots: ['index', 'nofollow'],
  noArchiveRobots: ['noarchive'],
  noSnippetRobots: ['nosnippet'],
  
  maxSnippetLength: 160,
  maxImagePreview: 'large',
  maxVideoPreview: -1,
  
  crawlDelay: 1,
  cleanParam: 'ref,utm_source,utm_medium,utm_campaign,utm_term,utm_content',
} as const);

// ==================== Helper Functions ====================

/**
 * Get title with template
 */
export const getTitle = (title: string, locale?: 'en' | 'bn'): string => {
  const template = locale === 'bn' ? seoConfig.titleTemplateBn : seoConfig.titleTemplate;
  return template.replace('%s', title);
};

/**
 * Get Open Graph config for specific page type
 */
export const getOpenGraphConfig = (type: 'website' | 'article' | 'product' = 'website') => {
  return {
    ...seoConfig.openGraph,
    type,
  };
};

// ==================== Type Exports ====================

export type SEOConfig = typeof seoConfig;
export type RobotsConfig = typeof robotsConfig;
export type OpenGraphConfig = typeof seoConfig.openGraph;
export type TwitterConfig = typeof seoConfig.twitter;
export type JsonLdConfig = typeof seoConfig.jsonLd;
