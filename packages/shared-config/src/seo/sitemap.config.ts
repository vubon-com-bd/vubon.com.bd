// packages/shared-config/src/seo/sitemap.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Sitemap Configuration Interfaces
// ============================================================================

/**
 * Sitemap configuration interface
 */
export interface SitemapConfig {
  /** Maximum URLs per sitemap file */
  maxUrlsPerSitemap: number;
  /** Maximum sitemap index files */
  maxSitemapIndexFiles: number;
  /** Base URL for sitemaps */
  baseUrl: string;
  /** Sitemap file name prefix */
  fileNamePrefix: string;
  /** Whether to generate sitemap index */
  generateSitemapIndex: boolean;
  /** Whether to compress sitemaps (gzip) */
  compressSitemaps: boolean;
  /** Default change frequency */
  defaultChangeFrequency: ChangeFrequency;
  /** Default priority */
  defaultPriority: number;
}

/**
 * Change frequency types for sitemap
 */
export type ChangeFrequency =
  'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

/**
 * Sitemap entry interface
 */
export interface SitemapEntry {
  /** URL of the page */
  url: string;
  /** Last modified date */
  lastModified?: Date;
  /** Change frequency */
  changeFrequency?: ChangeFrequency;
  /** Priority (0.0 - 1.0) */
  priority?: number;
  /** Additional data for specific sitemap types */
  images?: SitemapImage[];
  videos?: SitemapVideo[];
  news?: SitemapNews[];
  alternates?: SitemapAlternate[];
}

/**
 * Sitemap image interface
 */
export interface SitemapImage {
  /** Image URL */
  url: string;
  /** Image caption */
  caption?: string;
  /** Image title */
  title?: string;
  /** Image geolocation */
  geoLocation?: string;
  /** Image license */
  license?: string;
}

/**
 * Sitemap video interface
 */
export interface SitemapVideo {
  /** Video title */
  title: string;
  /** Video description */
  description: string;
  /** Video thumbnail URL */
  thumbnailUrl: string;
  /** Video content URL */
  contentUrl: string;
  /** Video player URL */
  playerUrl?: string;
  /** Video duration in seconds */
  duration?: number;
  /** Video publication date */
  publicationDate?: Date;
  /** Video rating */
  rating?: number;
  /** Video view count */
  viewCount?: number;
  /** Video tags */
  tags?: string[];
  /** Video category */
  category?: string;
  /** Video family friendly */
  familyFriendly?: boolean;
}

/**
 * Sitemap news interface
 */
export interface SitemapNews {
  /** News publication name */
  publicationName: string;
  /** News publication language */
  publicationLanguage: string;
  /** News publication date */
  publicationDate: Date;
  /** News title */
  title: string;
  /** News keywords */
  keywords?: string[];
  /** News stock tickers */
  stockTickers?: string[];
  /** News genres */
  genres?: string[];
  /** News access */
  access?: 'Subscription' | 'Registration' | 'Free';
}

/**
 * Sitemap alternate language interface
 */
export interface SitemapAlternate {
  /** URL of the alternate language version */
  url: string;
  /** Language code (e.g., 'en', 'bn') */
  hreflang: string;
}

/**
 * Sitemap index entry interface
 */
export interface SitemapIndexEntry {
  /** Sitemap file URL */
  url: string;
  /** Last modified date */
  lastModified?: Date;
}

// ============================================================================
// Sitemap Constants
// ============================================================================

/**
 * Maximum URLs per sitemap (50,000 as per sitemap protocol)
 */
export const MAX_URLS_PER_SITEMAP = 50000;

/**
 * Maximum sitemap index files (50,000 as per sitemap protocol)
 */
export const MAX_SITEMAP_INDEX_FILES = 50000;

/**
 * Default change frequency mapping for different page types
 */
export const DEFAULT_CHANGE_FREQUENCY: Record<string, ChangeFrequency> = {
  homepage: 'daily',
  product: 'weekly',
  category: 'weekly',
  blog: 'weekly',
  static: 'monthly',
  profile: 'monthly',
  search: 'never',
};

/**
 * Default priority mapping for different page types
 */
export const DEFAULT_PRIORITY: Record<string, number> = {
  homepage: 1.0,
  product: 0.8,
  category: 0.7,
  blog: 0.6,
  static: 0.5,
  profile: 0.4,
  search: 0.3,
};

// ============================================================================
// Sitemap Configuration Factory
// ============================================================================

/**
 * Creates sitemap configuration from environment
 * @param envConfig - The environment configuration
 * @returns Sitemap configuration
 */
export function createSitemapConfig(envConfig: EnvConfig = env): SitemapConfig {
  const { server } = envConfig;
  const baseUrl = server.API_URL || 'https://vubon.com';

  return {
    maxUrlsPerSitemap: MAX_URLS_PER_SITEMAP,
    maxSitemapIndexFiles: MAX_SITEMAP_INDEX_FILES,
    baseUrl,
    fileNamePrefix: 'sitemap',
    generateSitemapIndex: true,
    compressSitemaps: true,
    defaultChangeFrequency: 'weekly',
    defaultPriority: 0.5,
  };
}

// ============================================================================
// Sitemap Configuration Instance
// ============================================================================

/**
 * Sitemap configuration instance
 */
export const sitemapConfig: SitemapConfig = createSitemapConfig();

// ============================================================================
// Sitemap Helper Functions
// ============================================================================

/**
 * Gets the full URL for a path
 * @param path - The path to append to the base URL
 * @param config - The sitemap configuration (optional)
 * @returns The full URL
 *
 * @example
 * getFullUrl('/products') // 'https://vubon.com/products'
 */
export function getFullUrl(path: string, config: SitemapConfig = sitemapConfig): string {
  if (!path || typeof path !== 'string') {
    return config.baseUrl;
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Ensure baseUrl doesn't end with /
  const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl.slice(0, -1) : config.baseUrl;

  return `${baseUrl}${normalizedPath}`;
}

/**
 * Gets the change frequency for a specific page type
 * @param pageType - The type of page
 * @param defaultFrequency - Default frequency if page type not found (optional)
 * @returns The change frequency
 *
 * @example
 * getChangeFrequency('homepage') // 'daily'
 * getChangeFrequency('product') // 'weekly'
 */
export function getChangeFrequency(
  pageType: string,
  defaultFrequency?: ChangeFrequency
): ChangeFrequency {
  if (!pageType || typeof pageType !== 'string') {
    return defaultFrequency || sitemapConfig.defaultChangeFrequency;
  }

  const frequency = DEFAULT_CHANGE_FREQUENCY[pageType];
  if (frequency) {
    return frequency;
  }

  return defaultFrequency || sitemapConfig.defaultChangeFrequency;
}

/**
 * Gets the priority for a specific page type
 * @param pageType - The type of page
 * @param defaultPriority - Default priority if page type not found (optional)
 * @returns The priority (0.0 - 1.0)
 *
 * @example
 * getPriority('homepage') // 1.0
 * getPriority('product') // 0.8
 */
export function getPriority(pageType: string, defaultPriority?: number): number {
  if (!pageType || typeof pageType !== 'string') {
    return defaultPriority !== undefined ? defaultPriority : sitemapConfig.defaultPriority;
  }

  const priority = DEFAULT_PRIORITY[pageType];
  if (priority !== undefined) {
    return priority;
  }

  return defaultPriority !== undefined ? defaultPriority : sitemapConfig.defaultPriority;
}

/**
 * Creates a sitemap entry for a page
 * @param url - The URL of the page
 * @param options - Options for the sitemap entry
 * @returns Sitemap entry object
 *
 * @example
 * createSitemapEntry('/products/123', {
 *   lastModified: new Date(),
 *   changeFrequency: 'weekly',
 *   priority: 0.8
 * })
 */
export function createSitemapEntry(
  url: string,
  options: {
    lastModified?: Date;
    changeFrequency?: ChangeFrequency;
    priority?: number;
    images?: SitemapImage[];
    videos?: SitemapVideo[];
    news?: SitemapNews[];
    alternates?: SitemapAlternate[];
  } = {}
): SitemapEntry {
  return {
    url: getFullUrl(url),
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency || sitemapConfig.defaultChangeFrequency,
    priority:
      options.priority !== undefined
        ? Math.min(Math.max(options.priority, 0), 1)
        : sitemapConfig.defaultPriority,
    images: options.images,
    videos: options.videos,
    news: options.news,
    alternates: options.alternates,
  };
}

/**
 * Creates sitemap entries for a list of URLs
 * @param urls - Array of URLs or URL objects
 * @param defaultOptions - Default options for all entries
 * @returns Array of sitemap entries
 *
 * @example
 * createSitemapEntries(
 *   ['/products/1', '/products/2'],
 *   { changeFrequency: 'weekly', priority: 0.8 }
 * )
 */
export function createSitemapEntries(
  urls: Array<string | { url: string; options?: Partial<SitemapEntry> }>,
  defaultOptions: Partial<SitemapEntry> = {}
): SitemapEntry[] {
  return urls.map((item) => {
    if (typeof item === 'string') {
      return createSitemapEntry(item, {
        ...defaultOptions,
      });
    }

    return createSitemapEntry(item.url, {
      ...defaultOptions,
      ...item.options,
    });
  });
}

/**
 * Splits sitemap entries into multiple sitemap files
 * @param entries - The sitemap entries
 * @param maxUrls - Maximum URLs per sitemap (default: 50000)
 * @returns Array of sitemap entry arrays
 *
 * @example
 * const chunks = splitSitemapEntries(allEntries, 50000);
 * chunks.forEach((chunk, index) => {
 *   generateSitemapFile(chunk, `sitemap-${index}.xml`);
 * });
 */
export function splitSitemapEntries(
  entries: SitemapEntry[],
  maxUrls: number = sitemapConfig.maxUrlsPerSitemap
): SitemapEntry[][] {
  if (!entries || entries.length === 0) {
    return [];
  }

  const chunks: SitemapEntry[][] = [];

  for (let i = 0; i < entries.length; i += maxUrls) {
    chunks.push(entries.slice(i, i + maxUrls));
  }

  return chunks;
}

/**
 * Creates sitemap index entries
 * @param chunkCount - Number of sitemap files
 * @param baseUrl - Base URL for sitemap files
 * @param lastModified - Last modified date (optional)
 * @returns Array of sitemap index entries
 *
 * @example
 * const indexEntries = createSitemapIndexEntries(5);
 */
export function createSitemapIndexEntries(
  chunkCount: number,
  baseUrl: string = sitemapConfig.baseUrl,
  lastModified?: Date
): SitemapIndexEntry[] {
  const entries: SitemapIndexEntry[] = [];

  for (let i = 0; i < chunkCount; i++) {
    const url = `${baseUrl}/sitemap-${i + 1}.xml`;
    entries.push({
      url,
      lastModified: lastModified || new Date(),
    });
  }

  return entries;
}

/**
 * Creates sitemap entries for common page types
 * @param urls - Object with page types and their URLs
 * @param options - Common options for all entries
 * @returns Array of sitemap entries
 *
 * @example
 * createSitemapEntriesForTypes({
 *   homepage: ['/'],
 *   product: ['/products/1', '/products/2'],
 *   blog: ['/blog/post-1', '/blog/post-2']
 * })
 */
export function createSitemapEntriesForTypes(
  urls: Record<string, string[]>,
  options: Partial<SitemapEntry> = {}
): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const [pageType, pageUrls] of Object.entries(urls)) {
    const changeFrequency = getChangeFrequency(pageType);
    const priority = getPriority(pageType);

    for (const url of pageUrls) {
      entries.push(
        createSitemapEntry(url, {
          changeFrequency,
          priority,
          ...options,
        })
      );
    }
  }

  return entries;
}

/**
 * Validates a sitemap entry
 * @param entry - The sitemap entry to validate
 * @returns True if the entry is valid, false otherwise
 *
 * @example
 * const isValid = validateSitemapEntry(entry);
 */
export function validateSitemapEntry(entry: SitemapEntry): boolean {
  if (!entry || typeof entry !== 'object') {
    return false;
  }

  // Check URL
  if (!entry.url || typeof entry.url !== 'string') {
    return false;
  }

  try {
    new URL(entry.url);
  } catch {
    return false;
  }

  // Check priority
  if (entry.priority !== undefined) {
    if (typeof entry.priority !== 'number') {
      return false;
    }
    if (entry.priority < 0 || entry.priority > 1) {
      return false;
    }
  }

  // Check change frequency
  if (entry.changeFrequency) {
    const validFrequencies: ChangeFrequency[] = [
      'always',
      'hourly',
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'never',
    ];
    if (!validFrequencies.includes(entry.changeFrequency as ChangeFrequency)) {
      return false;
    }
  }

  return true;
}

/**
 * Validates multiple sitemap entries
 * @param entries - The sitemap entries to validate
 * @returns Array of valid entries
 *
 * @example
 * const validEntries = validateSitemapEntries(allEntries);
 */
export function validateSitemapEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return entries.filter((entry) => validateSitemapEntry(entry));
}

/**
 * Generates a sitemap XML string from entries
 * @param entries - The sitemap entries
 * @param urlSetAttributes - Additional attributes for the urlset tag
 * @returns XML string
 *
 * @example
 * const xml = generateSitemapXml(entries);
 */
export function generateSitemapXml(
  entries: SitemapEntry[],
  urlSetAttributes: Record<string, string> = {}
): string {
  const validEntries = validateSitemapEntries(entries);

  if (validEntries.length === 0) {
    return '';
  }

  // Build URL set attributes
  let attributes = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  const hasImages = validEntries.some((entry) => entry.images && entry.images.length > 0);
  const hasVideos = validEntries.some((entry) => entry.videos && entry.videos.length > 0);
  const hasNews = validEntries.some((entry) => entry.news && entry.news.length > 0);
  const hasAlternates = validEntries.some(
    (entry) => entry.alternates && entry.alternates.length > 0
  );

  if (hasImages) {
    attributes += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
  }

  if (hasVideos) {
    attributes += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"';
  }

  if (hasNews) {
    attributes += ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';
  }

  if (hasAlternates) {
    attributes += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
  }

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset ${attributes}>\n`;

  for (const entry of validEntries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;

    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified.toISOString()}</lastmod>\n`;
    }

    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }

    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }

    // Add images
    if (entry.images && entry.images.length > 0) {
      for (const image of entry.images) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(image.url)}</image:loc>\n`;
        if (image.caption) {
          xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>\n`;
        }
        if (image.title) {
          xml += `      <image:title>${escapeXml(image.title)}</image:title>\n`;
        }
        if (image.geoLocation) {
          xml += `      <image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>\n`;
        }
        if (image.license) {
          xml += `      <image:license>${escapeXml(image.license)}</image:license>\n`;
        }
        xml += `    </image:image>\n`;
      }
    }

    // Add videos
    if (entry.videos && entry.videos.length > 0) {
      for (const video of entry.videos) {
        xml += `    <video:video>\n`;
        xml += `      <video:title>${escapeXml(video.title)}</video:title>\n`;
        xml += `      <video:description>${escapeXml(video.description)}</video:description>\n`;
        xml += `      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>\n`;
        xml += `      <video:content_loc>${escapeXml(video.contentUrl)}</video:content_loc>\n`;
        if (video.playerUrl) {
          xml += `      <video:player_loc>${escapeXml(video.playerUrl)}</video:player_loc>\n`;
        }
        if (video.duration) {
          xml += `      <video:duration>${video.duration}</video:duration>\n`;
        }
        if (video.publicationDate) {
          xml += `      <video:publication_date>${video.publicationDate.toISOString()}</video:publication_date>\n`;
        }
        if (video.rating) {
          xml += `      <video:rating>${video.rating}</video:rating>\n`;
        }
        if (video.viewCount) {
          xml += `      <video:view_count>${video.viewCount}</video:view_count>\n`;
        }
        if (video.tags && video.tags.length > 0) {
          xml += `      <video:tag>${video.tags.join(', ')}</video:tag>\n`;
        }
        if (video.category) {
          xml += `      <video:category>${escapeXml(video.category)}</video:category>\n`;
        }
        if (video.familyFriendly !== undefined) {
          xml += `      <video:family_friendly>${video.familyFriendly ? 'yes' : 'no'}</video:family_friendly>\n`;
        }
        xml += `    </video:video>\n`;
      }
    }

    // Add news
    if (entry.news && entry.news.length > 0) {
      for (const news of entry.news) {
        xml += `    <news:news>\n`;
        xml += `      <news:publication>\n`;
        xml += `        <news:name>${escapeXml(news.publicationName)}</news:name>\n`;
        xml += `        <news:language>${escapeXml(news.publicationLanguage)}</news:language>\n`;
        xml += `      </news:publication>\n`;
        xml += `      <news:publication_date>${news.publicationDate.toISOString()}</news:publication_date>\n`;
        xml += `      <news:title>${escapeXml(news.title)}</news:title>\n`;
        if (news.keywords && news.keywords.length > 0) {
          xml += `      <news:keywords>${news.keywords.join(', ')}</news:keywords>\n`;
        }
        if (news.stockTickers && news.stockTickers.length > 0) {
          xml += `      <news:stock_tickers>${news.stockTickers.join(', ')}</news:stock_tickers>\n`;
        }
        if (news.genres && news.genres.length > 0) {
          xml += `      <news:genres>${news.genres.join(', ')}</news:genres>\n`;
        }
        if (news.access) {
          xml += `      <news:access>${news.access}</news:access>\n`;
        }
        xml += `    </news:news>\n`;
      }
    }

    // Add alternates
    if (entry.alternates && entry.alternates.length > 0) {
      for (const alternate of entry.alternates) {
        xml += `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.url)}" />\n`;
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return xml;
}

/**
 * Generates a sitemap index XML string
 * @param entries - The sitemap index entries
 * @returns XML string
 *
 * @example
 * const xml = generateSitemapIndexXml(indexEntries);
 */
export function generateSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  if (!entries || entries.length === 0) {
    return '';
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const entry of entries) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;
    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified.toISOString()}</lastmod>\n`;
    }
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>`;

  return xml;
}

/**
 * Escapes XML special characters
 * @param str - The string to escape
 * @returns Escaped string
 */
function escapeXml(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
