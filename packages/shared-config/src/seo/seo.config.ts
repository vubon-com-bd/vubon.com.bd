// packages/shared-config/src/seo/seo.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// SEO Configuration Interfaces
// ============================================================================

/**
 * SEO configuration interface
 */
export interface SeoConfig {
  /** Site name */
  siteName: string;
  /** Site URL */
  siteUrl: string;
  /** Site description */
  description: string;
  /** Site keywords */
  keywords: string[];
  /** Default title */
  defaultTitle: string;
  /** Default image URL */
  defaultImage: string;
  /** Theme color */
  themeColor: string;
  /** Twitter handle */
  twitterHandle?: string;
  /** Facebook app ID */
  facebookAppId?: string;
  /** Google Analytics ID */
  googleAnalyticsId?: string;
  /** Google Tag Manager ID */
  googleTagManagerId?: string;
}

/**
 * Open Graph configuration interface
 */
export interface OpenGraphConfig {
  /** Site name */
  siteName: string;
  /** Default title */
  title: string;
  /** Default description */
  description: string;
  /** Default image URL */
  image: string;
  /** Image width */
  imageWidth: number;
  /** Image height */
  imageHeight: number;
  /** Locale */
  locale: string;
  /** Type */
  type: 'website' | 'article' | 'product' | 'profile' | 'book';
}

/**
 * Robots configuration interface
 */
export interface RobotsConfig {
  /** Whether to allow indexing */
  index: boolean;
  /** Whether to allow following links */
  follow: boolean;
  /** Whether to allow image indexing */
  imageIndex: boolean;
  /** Whether to allow archive/caching */
  archive: boolean;
  /** Whether to allow snippet in search results */
  snippet: boolean;
  /** Whether to allow ODP/ODP listing */
  odp: boolean;
  /** Whether to allow translation */
  translate: boolean;
  /** Max snippet length in characters */
  maxSnippet: number;
  /** Max image preview size */
  maxImagePreview: 'none' | 'standard' | 'large';
  /** Max video preview seconds */
  maxVideoPreview: number;
  /** Whether to allow site links search box */
  siteLinksSearchBox: boolean;
}

/**
 * JSON-LD configuration interface
 */
export interface JsonLdConfig {
  /** Organization name */
  organizationName: string;
  /** Organization URL */
  organizationUrl: string;
  /** Organization logo URL */
  organizationLogo: string;
  /** Contact email */
  contactEmail?: string;
  /** Contact phone */
  contactPhone?: string;
  /** Social media URLs */
  socialUrls: string[];
  /** Address */
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

// ============================================================================
// SEO Constants
// ============================================================================

/**
 * Default SEO configuration
 */
export const DEFAULT_SEO_CONFIG: SeoConfig = {
  siteName: 'Vubon',
  siteUrl: 'https://vubon.com',
  description: 'Vubon - Your trusted platform for secure and seamless experiences',
  keywords: ['vubon', 'platform', 'secure', 'reliable', 'ecommerce', 'bd'],
  defaultTitle: 'Vubon - Secure & Seamless Platform',
  defaultImage: 'https://vubon.com/images/og-image.jpg',
  themeColor: '#1a56db',
  twitterHandle: '@vubon',
};

/**
 * Default Open Graph configuration
 */
export const DEFAULT_OPEN_GRAPH_CONFIG: OpenGraphConfig = {
  siteName: 'Vubon',
  title: 'Vubon - Secure & Seamless Platform',
  description: 'Vubon - Your trusted platform for secure and seamless experiences',
  image: 'https://vubon.com/images/og-image.jpg',
  imageWidth: 1200,
  imageHeight: 630,
  locale: 'en_US',
  type: 'website',
};

/**
 * Default robots configuration
 */
export const DEFAULT_ROBOTS_CONFIG: RobotsConfig = {
  index: true,
  follow: true,
  imageIndex: true,
  archive: true,
  snippet: true,
  odp: true,
  translate: true,
  maxSnippet: 160,
  maxImagePreview: 'large',
  maxVideoPreview: 60,
  siteLinksSearchBox: true,
};

// ============================================================================
// SEO Configuration Factory
// ============================================================================

/**
 * Creates SEO configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns SEO configuration object
 */
export function createSeoConfig(envConfig: EnvConfig = env): SeoConfig {
  const { server } = envConfig;

  // Build site URL from environment
  const siteUrl = server.API_URL || DEFAULT_SEO_CONFIG.siteUrl;

  // Get app name from environment
  const siteName = server.APP_NAME || DEFAULT_SEO_CONFIG.siteName;

  return {
    siteName,
    siteUrl,
    description: DEFAULT_SEO_CONFIG.description,
    keywords: [...DEFAULT_SEO_CONFIG.keywords],
    defaultTitle: `${siteName} - ${DEFAULT_SEO_CONFIG.defaultTitle}`,
    defaultImage: DEFAULT_SEO_CONFIG.defaultImage,
    themeColor: DEFAULT_SEO_CONFIG.themeColor,
    twitterHandle: DEFAULT_SEO_CONFIG.twitterHandle,
  };
}

/**
 * Creates Open Graph configuration
 * @param config - The SEO configuration (optional)
 * @returns Open Graph configuration object
 */
export function createOpenGraphConfig(config: SeoConfig = seoConfig): OpenGraphConfig {
  const locale = 'en_US';

  return {
    siteName: config.siteName,
    title: config.defaultTitle,
    description: config.description,
    image: config.defaultImage,
    imageWidth: DEFAULT_OPEN_GRAPH_CONFIG.imageWidth,
    imageHeight: DEFAULT_OPEN_GRAPH_CONFIG.imageHeight,
    locale,
    type: 'website',
  };
}

/**
 * Creates robots configuration
 * @param envConfig - The environment configuration (optional)
 * @returns Robots configuration object
 */
export function createRobotsConfig(envConfig: EnvConfig = env): RobotsConfig {
  const { server } = envConfig;
  const isProduction = server.NODE_ENV === 'production';

  // In production, allow indexing; in other environments, disallow
  return {
    ...DEFAULT_ROBOTS_CONFIG,
    index: isProduction,
    follow: isProduction,
    imageIndex: isProduction,
    archive: isProduction,
  };
}

/**
 * Creates JSON-LD configuration
 * @param config - The SEO configuration (optional)
 * @returns JSON-LD configuration object
 */
export function createJsonLdConfig(config: SeoConfig = seoConfig): JsonLdConfig {
  return {
    organizationName: config.siteName,
    organizationUrl: config.siteUrl,
    organizationLogo: config.defaultImage,
    socialUrls: [],
  };
}

// ============================================================================
// SEO Configuration Instance
// ============================================================================

/**
 * SEO configuration instance
 */
export const seoConfig: SeoConfig = createSeoConfig();

/**
 * Open Graph configuration instance
 */
export const openGraphConfig: OpenGraphConfig = createOpenGraphConfig();

/**
 * Robots configuration instance
 */
export const robotsConfig: RobotsConfig = createRobotsConfig();

/**
 * JSON-LD configuration instance
 */
export const jsonLdConfig: JsonLdConfig = createJsonLdConfig();

// ============================================================================
// SEO Helper Functions
// ============================================================================

/**
 * Gets the title for a specific page
 * @param title - The page-specific title
 * @param siteName - Whether to include the site name (default: true)
 * @param separator - The separator between title and site name (default: ' - ')
 * @returns The complete title
 *
 * @example
 * getTitle('Home') // 'Home - Vubon'
 * getTitle('About Us', false) // 'About Us'
 */
export function getTitle(
  title: string,
  siteName: boolean = true,
  separator: string = ' - '
): string {
  if (!title || typeof title !== 'string') {
    return seoConfig.defaultTitle;
  }

  if (!siteName) {
    return title;
  }

  return `${title}${separator}${seoConfig.siteName}`;
}

/**
 * Gets the Open Graph configuration
 * @param options - Options to override the default Open Graph config
 * @returns Open Graph configuration object
 *
 * @example
 * getOpenGraphConfig({
 *   title: 'Product Page',
 *   description: 'This is a product page',
 *   image: 'https://example.com/product-image.jpg'
 * })
 */
export function getOpenGraphConfig(options: Partial<OpenGraphConfig> = {}): OpenGraphConfig {
  return {
    siteName: options.siteName || openGraphConfig.siteName,
    title: options.title || openGraphConfig.title,
    description: options.description || openGraphConfig.description,
    image: options.image || openGraphConfig.image,
    imageWidth: options.imageWidth || openGraphConfig.imageWidth,
    imageHeight: options.imageHeight || openGraphConfig.imageHeight,
    locale: options.locale || openGraphConfig.locale,
    type: options.type || openGraphConfig.type,
  };
}

/**
 * Gets the robots meta tag string
 * @param config - The robots configuration (optional)
 * @returns The robots meta tag value
 *
 * @example
 * getRobotsTag() // 'index, follow'
 * getRobotsTag({ index: false, follow: false }) // 'noindex, nofollow'
 */
export function getRobotsTag(config: RobotsConfig = robotsConfig): string {
  const directives: string[] = [];

  if (config.index) {
    directives.push('index');
  } else {
    directives.push('noindex');
  }

  if (config.follow) {
    directives.push('follow');
  } else {
    directives.push('nofollow');
  }

  if (!config.imageIndex) {
    directives.push('noimageindex');
  }

  if (!config.archive) {
    directives.push('noarchive');
  }

  if (!config.snippet) {
    directives.push('nosnippet');
  }

  if (!config.odp) {
    directives.push('noodp');
  }

  if (!config.translate) {
    directives.push('notranslate');
  }

  if (config.maxSnippet > 0) {
    directives.push(`max-snippet:${config.maxSnippet}`);
  }

  if (config.maxImagePreview !== 'large') {
    directives.push(`max-image-preview:${config.maxImagePreview}`);
  }

  if (config.maxVideoPreview > 0) {
    directives.push(`max-video-preview:${config.maxVideoPreview}`);
  }

  if (config.siteLinksSearchBox) {
    directives.push('sitelinkssearchbox');
  }

  return directives.join(', ');
}

/**
 * Generates JSON-LD structured data for Organization
 * @param config - The JSON-LD configuration (optional)
 * @returns Organization structured data object
 *
 * @example
 * getOrganizationJsonLd()
 */
export function getOrganizationJsonLd(
  config: JsonLdConfig = jsonLdConfig
): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.organizationName,
    url: config.organizationUrl,
    logo: config.organizationLogo,
  };

  if (config.contactEmail) {
    jsonLd.email = config.contactEmail;
  }

  if (config.contactPhone) {
    jsonLd.telephone = config.contactPhone;
  }

  if (config.socialUrls && config.socialUrls.length > 0) {
    jsonLd.sameAs = config.socialUrls;
  }

  if (config.address) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      ...config.address,
    };
  }

  return jsonLd;
}

/**
 * Generates JSON-LD structured data for WebSite
 * @param config - The SEO configuration (optional)
 * @returns WebSite structured data object
 *
 * @example
 * getWebSiteJsonLd()
 */
export function getWebSiteJsonLd(config: SeoConfig = seoConfig): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: config.siteUrl,
    description: config.description,
  };
}

/**
 * Generates JSON-LD structured data for BreadcrumbList
 * @param items - Array of breadcrumb items
 * @returns BreadcrumbList structured data object
 *
 * @example
 * getBreadcrumbJsonLd([
 *   { name: 'Home', url: '/' },
 *   { name: 'Products', url: '/products' }
 * ])
 */
export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates a complete meta tags object for a page
 * @param options - Options for the meta tags
 * @param options.title - Page title
 * @param options.description - Page description
 * @param options.image - Page image URL
 * @param options.keywords - Page keywords
 * @param options.canonical - Canonical URL
 * @param options.robots - Robots configuration
 * @param options.openGraph - Open Graph configuration
 * @returns Meta tags object
 *
 * @example
 * getMetaTags({
 *   title: 'Product Page',
 *   description: 'This is a product page',
 *   image: 'https://example.com/image.jpg'
 * })
 */
export function getMetaTags(options: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonical?: string;
  robots?: Partial<RobotsConfig>;
  openGraph?: Partial<OpenGraphConfig>;
}): Record<string, string | null> {
  const ogConfig = getOpenGraphConfig({
    title: options.title || seoConfig.defaultTitle,
    description: options.description || seoConfig.description,
    image: options.image || seoConfig.defaultImage,
    ...options.openGraph,
  });

  const robots = getRobotsTag({
    ...robotsConfig,
    ...options.robots,
  });

  const meta: Record<string, string | null> = {
    // Basic meta tags
    title: getTitle(options.title || seoConfig.defaultTitle),
    description: options.description || seoConfig.description,
    keywords: options.keywords?.join(', ') || seoConfig.keywords.join(', '),
    robots,

    // Open Graph tags
    'og:title': ogConfig.title,
    'og:description': ogConfig.description,
    'og:image': ogConfig.image,
    'og:image:width': String(ogConfig.imageWidth),
    'og:image:height': String(ogConfig.imageHeight),
    'og:url': options.canonical || seoConfig.siteUrl,
    'og:site_name': ogConfig.siteName,
    'og:type': ogConfig.type,
    'og:locale': ogConfig.locale,

    // Twitter Card tags
    'twitter:card': 'summary_large_image',
    'twitter:title': ogConfig.title,
    'twitter:description': ogConfig.description,
    'twitter:image': ogConfig.image,
  };

  // Add Twitter handle if available
  if (seoConfig.twitterHandle) {
    meta['twitter:site'] = seoConfig.twitterHandle;
    meta['twitter:creator'] = seoConfig.twitterHandle;
  }

  // Add canonical URL
  if (options.canonical) {
    meta.canonical = options.canonical;
  }

  // Add theme color
  meta['theme-color'] = seoConfig.themeColor;

  return meta;
}
