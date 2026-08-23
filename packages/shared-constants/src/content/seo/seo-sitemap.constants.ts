/**
 * SEO Sitemap Constants
 * Configuration for sitemaps and indexing
 */

export const CONTENT_SEO_SITEMAP = {
  // Sitemap Types
  TYPES: {
    XML: 'xml',
    XML_GZIPPED: 'xml_gzipped',
    HTML: 'html',
    TEXT: 'text',
    CUSTOM: 'custom',
  } as const,

  // Sitemap Priorities
  PRIORITIES: {
    VERY_LOW: 0.1,
    LOW: 0.3,
    MEDIUM: 0.5,
    HIGH: 0.7,
    VERY_HIGH: 0.9,
    MAXIMUM: 1.0,
  } as const,

  // Sitemap Frequencies
  FREQUENCIES: {
    ALWAYS: 'always',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    NEVER: 'never',
  } as const,

  // Sitemap Formats
  FORMATS: {
    STANDARD: 'standard',
    MOBILE: 'mobile',
    NEWS: 'news',
    VIDEO: 'video',
    IMAGE: 'image',
    CUSTOM: 'custom',
  } as const,

  // Sitemap Defaults
  DEFAULTS: {
    PRIORITY: 0.5,
    FREQUENCY: 'weekly',
    MAX_URLS: 50000,
    MAX_SIZE_MB: 50,
  } as const,

  // Sitemap Limits
  LIMITS: {
    MAX_URLS: 50000,
    MAX_SIZE_MB: 50,
    MAX_SITEMAP_INDEX: 500,
    MAX_URL_LENGTH: 2048,
  } as const,
} as const;

// Sitemap Types
export type ContentSEOSitemapType =
  (typeof CONTENT_SEO_SITEMAP.TYPES)[keyof typeof CONTENT_SEO_SITEMAP.TYPES];

// Sitemap Priorities
export type ContentSEOSitemapPriority =
  (typeof CONTENT_SEO_SITEMAP.PRIORITIES)[keyof typeof CONTENT_SEO_SITEMAP.PRIORITIES];

// Sitemap Frequencies
export type ContentSEOSitemapFrequency =
  (typeof CONTENT_SEO_SITEMAP.FREQUENCIES)[keyof typeof CONTENT_SEO_SITEMAP.FREQUENCIES];

// Sitemap Formats
export type ContentSEOSitemapFormat =
  (typeof CONTENT_SEO_SITEMAP.FORMATS)[keyof typeof CONTENT_SEO_SITEMAP.FORMATS];

// Utility Functions
export function contentSeoSitemapGetTypeLabel(type: ContentSEOSitemapType): string {
  const labels: Record<ContentSEOSitemapType, string> = {
    [CONTENT_SEO_SITEMAP.TYPES.XML]: 'XML Sitemap',
    [CONTENT_SEO_SITEMAP.TYPES.XML_GZIPPED]: 'GZipped XML Sitemap',
    [CONTENT_SEO_SITEMAP.TYPES.HTML]: 'HTML Sitemap',
    [CONTENT_SEO_SITEMAP.TYPES.TEXT]: 'Text Sitemap',
    [CONTENT_SEO_SITEMAP.TYPES.CUSTOM]: 'Custom Sitemap',
  };
  return labels[type] || 'Unknown Sitemap Type';
}

export function contentSeoSitemapGetPriorityLabel(priority: ContentSEOSitemapPriority): string {
  const labels: Record<ContentSEOSitemapPriority, string> = {
    [CONTENT_SEO_SITEMAP.PRIORITIES.VERY_LOW]: 'Very Low (0.1)',
    [CONTENT_SEO_SITEMAP.PRIORITIES.LOW]: 'Low (0.3)',
    [CONTENT_SEO_SITEMAP.PRIORITIES.MEDIUM]: 'Medium (0.5)',
    [CONTENT_SEO_SITEMAP.PRIORITIES.HIGH]: 'High (0.7)',
    [CONTENT_SEO_SITEMAP.PRIORITIES.VERY_HIGH]: 'Very High (0.9)',
    [CONTENT_SEO_SITEMAP.PRIORITIES.MAXIMUM]: 'Maximum (1.0)',
  };
  return labels[priority] || 'Unknown Priority';
}

export function contentSeoSitemapGetFrequencyLabel(frequency: ContentSEOSitemapFrequency): string {
  const labels: Record<ContentSEOSitemapFrequency, string> = {
    [CONTENT_SEO_SITEMAP.FREQUENCIES.ALWAYS]: 'Always',
    [CONTENT_SEO_SITEMAP.FREQUENCIES.HOURLY]: 'Hourly',
    [CONTENT_SEO_SITEMAP.FREQUENCIES.DAILY]: 'Daily',
    [CONTENT_SEO_SITEMAP.FREQUENCIES.WEEKLY]: 'Weekly',
    [CONTENT_SEO_SITEMAP.FREQUENCIES.MONTHLY]: 'Monthly',
    [CONTENT_SEO_SITEMAP.FREQUENCIES.YEARLY]: 'Yearly',
    [CONTENT_SEO_SITEMAP.FREQUENCIES.NEVER]: 'Never',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function contentSeoSitemapGetFormatLabel(format: ContentSEOSitemapFormat): string {
  const labels: Record<ContentSEOSitemapFormat, string> = {
    [CONTENT_SEO_SITEMAP.FORMATS.STANDARD]: 'Standard Sitemap',
    [CONTENT_SEO_SITEMAP.FORMATS.MOBILE]: 'Mobile Sitemap',
    [CONTENT_SEO_SITEMAP.FORMATS.NEWS]: 'News Sitemap',
    [CONTENT_SEO_SITEMAP.FORMATS.VIDEO]: 'Video Sitemap',
    [CONTENT_SEO_SITEMAP.FORMATS.IMAGE]: 'Image Sitemap',
    [CONTENT_SEO_SITEMAP.FORMATS.CUSTOM]: 'Custom Sitemap',
  };
  return labels[format] || 'Unknown Format';
}

export function contentSeoSitemapGetDefaultPriority(): ContentSEOSitemapPriority {
  return CONTENT_SEO_SITEMAP.DEFAULTS.PRIORITY as ContentSEOSitemapPriority;
}

export function contentSeoSitemapGetDefaultFrequency(): ContentSEOSitemapFrequency {
  return CONTENT_SEO_SITEMAP.DEFAULTS.FREQUENCY as ContentSEOSitemapFrequency;
}

export function contentSeoSitemapGetMaxUrls(): number {
  return CONTENT_SEO_SITEMAP.LIMITS.MAX_URLS;
}

export function contentSeoSitemapGetMaxSizeMB(): number {
  return CONTENT_SEO_SITEMAP.LIMITS.MAX_SIZE_MB;
}

export function contentSeoSitemapGetMaxIndex(): number {
  return CONTENT_SEO_SITEMAP.LIMITS.MAX_SITEMAP_INDEX;
}

export function contentSeoSitemapIsValidType(type: string): type is ContentSEOSitemapType {
  return Object.values(CONTENT_SEO_SITEMAP.TYPES).includes(type as ContentSEOSitemapType);
}

export function contentSeoSitemapIsValidPriority(
  priority: number
): priority is ContentSEOSitemapPriority {
  return Object.values(CONTENT_SEO_SITEMAP.PRIORITIES).includes(
    priority as ContentSEOSitemapPriority
  );
}
