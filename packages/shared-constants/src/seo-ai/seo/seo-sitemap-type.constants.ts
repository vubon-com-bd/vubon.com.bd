/**
 * SEO সাইটম্যাপ টাইপ এনাম
 */
export const SEO_SITEMAP_TYPE = {
  XML: 'xml',
  HTML: 'html',
  JSON: 'json',
  VIDEO: 'video',
  IMAGE: 'image',
  NEWS: 'news',
  MOBILE: 'mobile',
} as const;

/**
 * SEO_SITEMAP_TYPE থেকে টাইপ
 */
export type SEOSitemapType = (typeof SEO_SITEMAP_TYPE)[keyof typeof SEO_SITEMAP_TYPE];

/**
 * SEO সাইটম্যাপ টাইপ লেবেল
 */
export const SEO_SITEMAP_TYPE_LABELS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: 'XML Sitemap',
  [SEO_SITEMAP_TYPE.HTML]: 'HTML Sitemap',
  [SEO_SITEMAP_TYPE.JSON]: 'JSON Sitemap',
  [SEO_SITEMAP_TYPE.VIDEO]: 'Video Sitemap',
  [SEO_SITEMAP_TYPE.IMAGE]: 'Image Sitemap',
  [SEO_SITEMAP_TYPE.NEWS]: 'News Sitemap',
  [SEO_SITEMAP_TYPE.MOBILE]: 'Mobile Sitemap',
} as const;

/**
 * SEO সাইটম্যাপ টাইপ বিবরণ
 */
export const SEO_SITEMAP_TYPE_DESCRIPTIONS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: 'Standard XML sitemap for search engine crawlers',
  [SEO_SITEMAP_TYPE.HTML]: 'HTML sitemap for user navigation and accessibility',
  [SEO_SITEMAP_TYPE.JSON]: 'JSON format sitemap for modern web applications',
  [SEO_SITEMAP_TYPE.VIDEO]: 'Sitemap specifically for video content optimization',
  [SEO_SITEMAP_TYPE.IMAGE]: 'Sitemap specifically for image content optimization',
  [SEO_SITEMAP_TYPE.NEWS]: 'Sitemap for news content and timely articles',
  [SEO_SITEMAP_TYPE.MOBILE]: 'Sitemap for mobile-specific content and pages',
} as const;

/**
 * SEO সাইটম্যাপ টাইপ আইকন
 */
export const SEO_SITEMAP_TYPE_ICONS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: '📄',
  [SEO_SITEMAP_TYPE.HTML]: '🌐',
  [SEO_SITEMAP_TYPE.JSON]: '📋',
  [SEO_SITEMAP_TYPE.VIDEO]: '🎬',
  [SEO_SITEMAP_TYPE.IMAGE]: '🖼️',
  [SEO_SITEMAP_TYPE.NEWS]: '📰',
  [SEO_SITEMAP_TYPE.MOBILE]: '📱',
} as const;

/**
 * SEO সাইটম্যাপ টাইপ কালার (হেক্স কোড)
 */
export const SEO_SITEMAP_TYPE_COLORS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: '#3b82f6', // Blue-500
  [SEO_SITEMAP_TYPE.HTML]: '#22c55e', // Green-500
  [SEO_SITEMAP_TYPE.JSON]: '#f59e0b', // Amber-500
  [SEO_SITEMAP_TYPE.VIDEO]: '#ec4899', // Pink-500
  [SEO_SITEMAP_TYPE.IMAGE]: '#8b5cf6', // Violet-500
  [SEO_SITEMAP_TYPE.NEWS]: '#dc2626', // Red-600
  [SEO_SITEMAP_TYPE.MOBILE]: '#06b6d4', // Cyan-500
} as const;

/**
 * SEO সাইটম্যাপ টাইপ ফরম্যাট
 */
export const SEO_SITEMAP_TYPE_FORMAT: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: 'application/xml',
  [SEO_SITEMAP_TYPE.HTML]: 'text/html',
  [SEO_SITEMAP_TYPE.JSON]: 'application/json',
  [SEO_SITEMAP_TYPE.VIDEO]: 'application/xml',
  [SEO_SITEMAP_TYPE.IMAGE]: 'application/xml',
  [SEO_SITEMAP_TYPE.NEWS]: 'application/xml',
  [SEO_SITEMAP_TYPE.MOBILE]: 'application/xml',
} as const;

/**
 * SEO সাইটম্যাপ টাইপ এক্সটেনশন
 */
export const SEO_SITEMAP_TYPE_EXTENSION: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: '.xml',
  [SEO_SITEMAP_TYPE.HTML]: '.html',
  [SEO_SITEMAP_TYPE.JSON]: '.json',
  [SEO_SITEMAP_TYPE.VIDEO]: '.xml',
  [SEO_SITEMAP_TYPE.IMAGE]: '.xml',
  [SEO_SITEMAP_TYPE.NEWS]: '.xml',
  [SEO_SITEMAP_TYPE.MOBILE]: '.xml',
} as const;

/**
 * SEO সাইটম্যাপ টাইপ কনফিগারেশন
 */
export interface SEOSitemapTypeConfig {
  type: SEOSitemapType;
  label: string;
  description: string;
  icon: string;
  color: string;
  format: string;
  extension: string;
  maxUrls: number;
  maxSize: number; // MB
  isXMLBased: boolean;
  order: number;
}

/**
 * SEO সাইটম্যাপ টাইপ মেটাডেটা
 */
export const SEO_SITEMAP_TYPE_METADATA: Record<SEOSitemapType, SEOSitemapTypeConfig> = {
  [SEO_SITEMAP_TYPE.XML]: {
    type: SEO_SITEMAP_TYPE.XML,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.XML],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.XML],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.XML],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.XML],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.XML],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.XML],
    maxUrls: 50000,
    maxSize: 50,
    isXMLBased: true,
    order: 0,
  },
  [SEO_SITEMAP_TYPE.HTML]: {
    type: SEO_SITEMAP_TYPE.HTML,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.HTML],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.HTML],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.HTML],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.HTML],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.HTML],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.HTML],
    maxUrls: 1000,
    maxSize: 10,
    isXMLBased: false,
    order: 1,
  },
  [SEO_SITEMAP_TYPE.JSON]: {
    type: SEO_SITEMAP_TYPE.JSON,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.JSON],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.JSON],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.JSON],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.JSON],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.JSON],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.JSON],
    maxUrls: 50000,
    maxSize: 50,
    isXMLBased: false,
    order: 2,
  },
  [SEO_SITEMAP_TYPE.VIDEO]: {
    type: SEO_SITEMAP_TYPE.VIDEO,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.VIDEO],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.VIDEO],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.VIDEO],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.VIDEO],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.VIDEO],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.VIDEO],
    maxUrls: 50000,
    maxSize: 50,
    isXMLBased: true,
    order: 3,
  },
  [SEO_SITEMAP_TYPE.IMAGE]: {
    type: SEO_SITEMAP_TYPE.IMAGE,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.IMAGE],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.IMAGE],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.IMAGE],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.IMAGE],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.IMAGE],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.IMAGE],
    maxUrls: 50000,
    maxSize: 50,
    isXMLBased: true,
    order: 4,
  },
  [SEO_SITEMAP_TYPE.NEWS]: {
    type: SEO_SITEMAP_TYPE.NEWS,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.NEWS],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.NEWS],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.NEWS],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.NEWS],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.NEWS],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.NEWS],
    maxUrls: 50000,
    maxSize: 50,
    isXMLBased: true,
    order: 5,
  },
  [SEO_SITEMAP_TYPE.MOBILE]: {
    type: SEO_SITEMAP_TYPE.MOBILE,
    label: SEO_SITEMAP_TYPE_LABELS[SEO_SITEMAP_TYPE.MOBILE],
    description: SEO_SITEMAP_TYPE_DESCRIPTIONS[SEO_SITEMAP_TYPE.MOBILE],
    icon: SEO_SITEMAP_TYPE_ICONS[SEO_SITEMAP_TYPE.MOBILE],
    color: SEO_SITEMAP_TYPE_COLORS[SEO_SITEMAP_TYPE.MOBILE],
    format: SEO_SITEMAP_TYPE_FORMAT[SEO_SITEMAP_TYPE.MOBILE],
    extension: SEO_SITEMAP_TYPE_EXTENSION[SEO_SITEMAP_TYPE.MOBILE],
    maxUrls: 50000,
    maxSize: 50,
    isXMLBased: true,
    order: 6,
  },
} as const;

/**
 * SEO সাইটম্যাপ টাইপ গ্রুপ
 */
export const SEO_SITEMAP_TYPE_GROUPS = {
  STANDARD: [SEO_SITEMAP_TYPE.XML, SEO_SITEMAP_TYPE.HTML, SEO_SITEMAP_TYPE.JSON] as const,
  SPECIALIZED: [
    SEO_SITEMAP_TYPE.VIDEO,
    SEO_SITEMAP_TYPE.IMAGE,
    SEO_SITEMAP_TYPE.NEWS,
    SEO_SITEMAP_TYPE.MOBILE,
  ] as const,
} as const;

/**
 * SEO সাইটম্যাপ টাইপ গ্রুপ লেবেল
 */
export const SEO_SITEMAP_TYPE_GROUP_LABELS = {
  STANDARD: 'Standard Sitemaps',
  SPECIALIZED: 'Specialized Sitemaps',
} as const;

/**
 * SEO সাইটম্যাপ টাইপ গ্রুপ কালার
 */
export const SEO_SITEMAP_TYPE_GROUP_COLORS = {
  STANDARD: '#3b82f6',
  SPECIALIZED: '#8b5cf6',
} as const;
