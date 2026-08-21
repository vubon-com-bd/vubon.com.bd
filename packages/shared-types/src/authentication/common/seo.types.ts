/**
 * Common SEO Types Module
 * Search Engine Optimization types for the e-commerce platform
 * Handles meta tags, structured data, sitemaps, and SEO metadata
 */

import { Timestamp, URL } from '../auth/core-primitives.types';

/**
 * SEO Metadata
 * Complete SEO metadata
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: URL;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: URL;
  ogType?: string;
  ogUrl?: URL;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: URL;
  twitterSite?: string;
  twitterCreator?: string;
  jsonLd?: StructuredData | StructuredData[];
  metaTags?: MetaTag[];
  alternateLanguages?: Record<string, URL>;
  hreflang?: Hreflang[];
  metadata?: Record<string, unknown>; // Additional metadata field
}

/**
 * Meta Tag
 * HTML meta tag
 */
export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
  charset?: string;
  httpEquiv?: string;
  media?: string;
}

/**
 * Structured Data
 * JSON-LD structured data
 */
export interface StructuredData {
  '@context': string;
  '@type': string;
  name?: string;
  description?: string;
  url?: URL;
  image?: URL | URL[];
  [key: string]: unknown;
}

/**
 * Hreflang
 * Hreflang attribute for alternate languages
 */
export interface Hreflang {
  lang: string;
  href: URL;
}

/**
 * Sitemap
 * Sitemap configuration
 */
export interface Sitemap {
  url: URL;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: Timestamp;
  images?: SitemapImage[];
  videos?: SitemapVideo[];
  news?: SitemapNews[];
}

/**
 * Sitemap Image
 * Image in sitemap
 */
export interface SitemapImage {
  url: URL;
  caption?: string;
  title?: string;
  license?: URL;
  geoLocation?: string;
}

/**
 * Sitemap Video
 * Video in sitemap
 */
export interface SitemapVideo {
  url: URL;
  title: string;
  description: string;
  contentLocation: URL;
  playerLocation: URL;
  thumbnail: URL;
  duration: number;
  expirationDate?: Timestamp;
  rating?: number;
  viewCount?: number;
  publicationDate?: Timestamp;
  familyFriendly?: boolean;
  restriction?: string;
}

/**
 * Sitemap News
 * News in sitemap
 */
export interface SitemapNews {
  publicationName: string;
  publicationLanguage: string;
  access: string;
  genres: string[];
  keywords: string[];
  stockTickers: string[];
  publicationDate: Timestamp;
  title: string;
}

/**
 * SEO Settings
 * SEO configuration settings
 */
export interface SEOSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  siteName: string;
  siteUrl: URL;
  twitterHandle?: string;
  facebookAppId?: string;
  ogImageDefault?: URL;
  enableStructuredData: boolean;
  enableSitemap: boolean;
  enableCanonical: boolean;
  enableHreflang: boolean;
  metaCharset: string;
  viewport: string;
  themeColor?: string;
  appleMobileWebAppCapable: boolean;
  appleMobileWebAppStatusBarStyle?: string;
  robots: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  yandexVerification?: string;
}

/**
 * SEO Update Request
 * Request to update SEO metadata
 */
export interface SEOUpdateRequest {
  resourceId: string;
  resourceType: string;
  metadata: Partial<SEOMetadata>;
  // Removed duplicate metadata property
}

/**
 * SEO Update Response
 * Response after SEO metadata update
 */
export interface SEOUpdateResponse {
  success: boolean;
  data?: {
    resourceId: string;
    resourceType: string;
    metadata: SEOMetadata;
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * SEO Constants
 * SEO-related constants
 */
export const SEO_DEFAULTS = {
  metaCharset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  defaultTitle: 'Vubon - E-Commerce Platform',
  defaultDescription: 'Shop online with Vubon - Your trusted e-commerce platform',
  defaultKeywords: ['e-commerce', 'online shopping', 'buy online', 'shop online'],
  siteName: 'Vubon',
  ogType: 'website',
  twitterCard: 'summary_large_image',
} as const;

export const SITEMAP_CHANGEFREQ = {
  ALWAYS: 'always',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
} as const;

/**
 * Default SEO Configuration
 */
export const DEFAULT_SEO_CONFIG = {
  enableStructuredData: true,
  enableSitemap: true,
  enableCanonical: true,
  enableHreflang: true,
  sitemapMaxEntries: 50000,
  sitemapCompression: true,
  cacheTTL: 3600, // 1 hour
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'bn'],
} as const;

/**
 * SEO Audit
 * SEO audit data
 */
export interface SEOAudit {
  url: URL;
  score: number;
  issues: SEOIssue[];
  suggestions: string[];
  metadata: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * SEO Issue
 * SEO issue details
 */
export interface SEOIssue {
  severity: 'error' | 'warning' | 'info';
  type: string;
  message: string;
  element?: string;
  suggestion?: string;
}

/**
 * SEO Response Builder
 * Helper for building SEO responses
 */
export interface SEOResponseBuilder {
  updateSuccess(response: SEOUpdateResponse): SEOUpdateResponse;
  getSuccess(metadata: SEOMetadata): { success: boolean; data: SEOMetadata };
  auditSuccess(audit: SEOAudit): { success: boolean; data: SEOAudit };
  error(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ): {
    success: false;
    error: { code: string; message: string; details?: Record<string, unknown> };
  };
}
