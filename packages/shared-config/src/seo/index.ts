/**
 * SEO Configurations - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-config/seo/index
 *
 * @description
 * Central export point for all SEO configurations.
 * Provides type-safe access to robots.txt, SEO metadata, and sitemap settings.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Robots.txt Configuration (robots.config.ts)
// ============================================================
export {
  // Configuration
  robotsTxtConfig,
  metaRobotsConfig,

  // Helper Functions
  getRobotsTxtConfig,
  getMetaRobots,

  // Constants
  DISALLOW_PATHS,
  ALLOW_PATHS,
} from './robots.config';

export type {
  RobotsTxtConfig,
  MetaRobotsConfig,
  MetaRobots,
} from './robots.config';

// ============================================================
// SEO Configuration (seo.config.ts)
// ============================================================
export {
  // Configuration
  seoConfig,
  robotsConfig,

  // Helper Functions
  getTitle,
  getOpenGraphConfig,
} from './seo.config';

export type {
  SEOConfig,
  RobotsConfig,
  OpenGraphConfig,
  TwitterConfig,
  JsonLdConfig,
} from './seo.config';

// ============================================================
// Sitemap Configuration (sitemap.config.ts)
// ============================================================
export {
  // Configuration
  sitemapConfig,

  // Helper Functions
  getChangeFrequency,
  getPriority,
  getFullUrl,
} from './sitemap.config';

export type {
  SitemapConfig,
  ChangeFrequency,
} from './sitemap.config';

// ============================================================
// Cross-SEO Utility Types & Functions
// ============================================================

import { env } from '../env/env.validation';
import { seoConfig, robotsConfig } from './seo.config';
import { robotsTxtConfig, metaRobotsConfig } from './robots.config';
import { sitemapConfig } from './sitemap.config';

/**
 * All SEO configuration names
 */
export type SEOConfigName = 'seo' | 'robots' | 'sitemap' | 'meta-robots';

/**
 * Get all SEO configurations for the current environment
 * Returns a consolidated SEO config object
 */
export const getSEOConfig = () => {
  const environment = env.NODE_ENV as 'development' | 'staging' | 'production';

  return {
    seo: seoConfig,
    robots: {
      ...robotsTxtConfig,
      env: robotsTxtConfig.env[environment] || robotsTxtConfig.env.production,
    },
    metaRobots: metaRobotsConfig,
    sitemap: sitemapConfig,
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development',
    isStaging: environment === 'staging',
  };
};

/**
 * Type for consolidated SEO configuration
 */
export type SEOFullConfig = ReturnType<typeof getSEOConfig>;

/**
 * Check if SEO is properly configured for production
 * Returns true if all required SEO features are enabled
 */
export const isSEOProductionReady = (): boolean => {
  const config = getSEOConfig();

  // Check robots: should be enabled in production
  const robotsEnabled = config.robots.enabled;

  // Check sitemap: should be enabled
  const sitemapEnabled = config.sitemap.enabled;

  // Check SEO: should have title and description
  const hasTitle = !!config.seo.defaultTitle;
  const hasDescription = !!config.seo.defaultDescription;

  return robotsEnabled && sitemapEnabled && hasTitle && hasDescription;
};

/**
 * Get SEO readiness status with details
 */
export const getSEOReadinessStatus = () => {
  const config = getSEOConfig();

  return {
    isReady: isSEOProductionReady(),
    checks: {
      robots: {
        passed: config.robots.enabled,
        details: `Robots enabled: ${config.robots.enabled}`,
      },
      sitemap: {
        passed: config.sitemap.enabled,
        details: `Sitemap enabled: ${config.sitemap.enabled}`,
      },
      title: {
        passed: !!config.seo.defaultTitle,
        details: `Default title: ${config.seo.defaultTitle}`,
      },
      description: {
        passed: !!config.seo.defaultDescription,
        details: `Default description: ${config.seo.defaultDescription.substring(0, 100)}...`,
      },
      openGraph: {
        passed: !!config.seo.openGraph.defaultImage,
        details: `OG Image: ${config.seo.openGraph.defaultImage}`,
      },
      jsonLd: {
        passed: !!config.seo.jsonLd.organization,
        details: `JSON-LD Organization: ${!!config.seo.jsonLd.organization}`,
      },
    },
    environment: config.environment,
  };
};

export type SEOReadinessStatus = ReturnType<typeof getSEOReadinessStatus>;

/**
 * Get all sitemap URLs for the current environment
 */
export const getSitemapUrls = (): string[] => {
  const config = getSEOConfig();
  const baseUrl = config.seo.siteUrl;

  const sitemaps: string[] = [];

  // Main sitemap
  if (config.sitemap.enabled) {
    sitemaps.push(`${baseUrl}/sitemap.xml`);
    sitemaps.push(`${baseUrl}/sitemap-index.xml`);
  }

  // Additional sitemaps
  if (config.sitemap.videoSitemap.enabled) {
    sitemaps.push(`${baseUrl}/video-sitemap.xml`);
  }
  if (config.sitemap.imageSitemap.enabled) {
    sitemaps.push(`${baseUrl}/image-sitemap.xml`);
  }
  if (config.sitemap.newsSitemap.enabled) {
    sitemaps.push(`${baseUrl}/news-sitemap.xml`);
  }
  if (config.sitemap.mobileSitemap.enabled) {
    sitemaps.push(`${baseUrl}/mobile-sitemap.xml`);
  }

  return sitemaps;
};

/**
 * Get the default meta robots directive for a page type
 */
export const getDefaultMetaRobots = (pageType: 'home' | 'product' | 'category' | 'blog' | 'static' | 'auth'): MetaRobots => {
  const config = getSEOConfig();

  switch (pageType) {
    case 'home':
      return config.metaRobots.default;
    case 'product':
      return config.metaRobots.default;
    case 'category':
      return config.metaRobots.default;
    case 'blog':
      return config.metaRobots.default;
    case 'static':
      return config.metaRobots.default;
    case 'auth':
      return config.metaRobots.noIndex;
    default:
      return config.metaRobots.default;
  }
};

/**
 * Check if a path should be excluded from sitemap
 */
export const isExcludedFromSitemap = (path: string): boolean => {
  const config = getSEOConfig();

  for (const excludePattern of config.sitemap.excludePaths) {
    if (excludePattern.endsWith('*')) {
      const pattern = excludePattern.slice(0, -1);
      if (path.startsWith(pattern)) {
        return true;
      }
    } else if (path === excludePattern) {
      return true;
    }
  }

  return false;
};

/**
 * Check if a path should have noindex meta tag
 */
export const shouldNoIndex = (path: string): boolean => {
  const config = getSEOConfig();

  for (const noIndexPath of config.seo.noIndexPaths) {
    if (noIndexPath.endsWith('*')) {
      const pattern = noIndexPath.slice(0, -1);
      if (path.startsWith(pattern)) {
        return true;
      }
    } else if (path === noIndexPath) {
      return true;
    }
  }

  return false;
};

/**
 * Generate canonical URL for a path
 * Removes query parameters and normalizes
 */
export const getCanonicalUrl = (path: string, queryParams?: Record<string, string>): string => {
  const config = getSEOConfig();
  const baseUrl = config.seo.siteUrl;

  // Normalize path
  let normalizedPath = path;
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`;
  }

  // Remove query parameters if configured
  const url = new URL(`${baseUrl}${normalizedPath}`);

  if (queryParams) {
    const removeParams = config.seo.removeQueryParams || [];
    for (const param of removeParams) {
      url.searchParams.delete(param);
    }
  }

  // Remove trailing slash if configured
  let finalUrl = url.toString();
  if (!config.seo.trailingSlash && finalUrl.endsWith('/') && finalUrl.length > 1) {
    finalUrl = finalUrl.slice(0, -1);
  }

  return finalUrl;
};
