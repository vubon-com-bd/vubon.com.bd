/**
 * সর্বোচ্চ URL সংখ্যা (৫০০০০)
 */
export const SEO_SITEMAP_MAX_URLS = 50000 as const;

/**
 * সর্বোচ্চ সাইজ (৫০MB)
 */
export const SEO_SITEMAP_MAX_SIZE = 50 as const; // 50 MB

/**
 * ডিফল্ট চেঞ্জ ফ্রিকোয়েন্সি
 */
export const SEO_SITEMAP_DEFAULT_CHANGE_FREQ = 'weekly' as const;

/**
 * সাইটম্যাপ চেঞ্জ ফ্রিকোয়েন্সি এনাম
 */
export const SEO_SITEMAP_CHANGE_FREQ = {
  ALWAYS: 'always',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
} as const;

/**
 * SEO_SITEMAP_CHANGE_FREQ থেকে টাইপ
 */
export type SEOSitemapChangeFreq =
  (typeof SEO_SITEMAP_CHANGE_FREQ)[keyof typeof SEO_SITEMAP_CHANGE_FREQ];

/**
 * সাইটম্যাপ চেঞ্জ ফ্রিকোয়েন্সি লেবেল
 */
export const SEO_SITEMAP_CHANGE_FREQ_LABELS: Record<SEOSitemapChangeFreq, string> = {
  [SEO_SITEMAP_CHANGE_FREQ.ALWAYS]: 'Always',
  [SEO_SITEMAP_CHANGE_FREQ.HOURLY]: 'Hourly',
  [SEO_SITEMAP_CHANGE_FREQ.DAILY]: 'Daily',
  [SEO_SITEMAP_CHANGE_FREQ.WEEKLY]: 'Weekly',
  [SEO_SITEMAP_CHANGE_FREQ.MONTHLY]: 'Monthly',
  [SEO_SITEMAP_CHANGE_FREQ.YEARLY]: 'Yearly',
  [SEO_SITEMAP_CHANGE_FREQ.NEVER]: 'Never',
} as const;

/**
 * সাইটম্যাপ চেঞ্জ ফ্রিকোয়েন্সি প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_SITEMAP_CHANGE_FREQ_PRIORITY: Record<SEOSitemapChangeFreq, number> = {
  [SEO_SITEMAP_CHANGE_FREQ.ALWAYS]: 1,
  [SEO_SITEMAP_CHANGE_FREQ.HOURLY]: 2,
  [SEO_SITEMAP_CHANGE_FREQ.DAILY]: 3,
  [SEO_SITEMAP_CHANGE_FREQ.WEEKLY]: 4,
  [SEO_SITEMAP_CHANGE_FREQ.MONTHLY]: 5,
  [SEO_SITEMAP_CHANGE_FREQ.YEARLY]: 6,
  [SEO_SITEMAP_CHANGE_FREQ.NEVER]: 7,
} as const;

/**
 * সাইটম্যাপ টাইপ এনাম
 */
export const SEO_SITEMAP_TYPE = {
  XML: 'xml',
  HTML: 'html',
  XML_INDEX: 'xml-index',
  XML_IMAGE: 'xml-image',
  XML_VIDEO: 'xml-video',
  XML_NEWS: 'xml-news',
} as const;

/**
 * SEO_SITEMAP_TYPE থেকে টাইপ
 */
export type SEOSitemapType = (typeof SEO_SITEMAP_TYPE)[keyof typeof SEO_SITEMAP_TYPE];

/**
 * সাইটম্যাপ টাইপ লেবেল
 */
export const SEO_SITEMAP_TYPE_LABELS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: 'XML Sitemap',
  [SEO_SITEMAP_TYPE.HTML]: 'HTML Sitemap',
  [SEO_SITEMAP_TYPE.XML_INDEX]: 'XML Index Sitemap',
  [SEO_SITEMAP_TYPE.XML_IMAGE]: 'XML Image Sitemap',
  [SEO_SITEMAP_TYPE.XML_VIDEO]: 'XML Video Sitemap',
  [SEO_SITEMAP_TYPE.XML_NEWS]: 'XML News Sitemap',
} as const;

/**
 * সাইটম্যাপ টাইপ বিবরণ
 */
export const SEO_SITEMAP_TYPE_DESCRIPTIONS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: 'Standard XML sitemap for search engines',
  [SEO_SITEMAP_TYPE.HTML]: 'HTML sitemap for user navigation',
  [SEO_SITEMAP_TYPE.XML_INDEX]: 'Index sitemap pointing to multiple sitemap files',
  [SEO_SITEMAP_TYPE.XML_IMAGE]: 'Sitemap specifically for image content',
  [SEO_SITEMAP_TYPE.XML_VIDEO]: 'Sitemap specifically for video content',
  [SEO_SITEMAP_TYPE.XML_NEWS]: 'Sitemap specifically for news content',
} as const;

/**
 * সাইটম্যাপ টাইপ আইকন
 */
export const SEO_SITEMAP_TYPE_ICONS: Record<SEOSitemapType, string> = {
  [SEO_SITEMAP_TYPE.XML]: '📄',
  [SEO_SITEMAP_TYPE.HTML]: '🌐',
  [SEO_SITEMAP_TYPE.XML_INDEX]: '📑',
  [SEO_SITEMAP_TYPE.XML_IMAGE]: '🖼️',
  [SEO_SITEMAP_TYPE.XML_VIDEO]: '🎬',
  [SEO_SITEMAP_TYPE.XML_NEWS]: '📰',
} as const;

/**
 * সাইটম্যাপ স্ট্যাটাস এনাম
 */
export const SEO_SITEMAP_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  GENERATED: 'generated',
  SUBMITTED: 'submitted',
  INDEXED: 'indexed',
  FAILED: 'failed',
  UPDATED: 'updated',
} as const;

/**
 * SEO_SITEMAP_STATUS থেকে টাইপ
 */
export type SEOSitemapStatus = (typeof SEO_SITEMAP_STATUS)[keyof typeof SEO_SITEMAP_STATUS];

/**
 * সাইটম্যাপ স্ট্যাটাস লেবেল
 */
export const SEO_SITEMAP_STATUS_LABELS: Record<SEOSitemapStatus, string> = {
  [SEO_SITEMAP_STATUS.PENDING]: 'Pending',
  [SEO_SITEMAP_STATUS.GENERATING]: 'Generating',
  [SEO_SITEMAP_STATUS.GENERATED]: 'Generated',
  [SEO_SITEMAP_STATUS.SUBMITTED]: 'Submitted',
  [SEO_SITEMAP_STATUS.INDEXED]: 'Indexed',
  [SEO_SITEMAP_STATUS.FAILED]: 'Failed',
  [SEO_SITEMAP_STATUS.UPDATED]: 'Updated',
} as const;

/**
 * সাইটম্যাপ স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_SITEMAP_STATUS_COLORS: Record<SEOSitemapStatus, string> = {
  [SEO_SITEMAP_STATUS.PENDING]: '#94a3b8', // Slate-400
  [SEO_SITEMAP_STATUS.GENERATING]: '#3b82f6', // Blue-500
  [SEO_SITEMAP_STATUS.GENERATED]: '#22c55e', // Green-500
  [SEO_SITEMAP_STATUS.SUBMITTED]: '#8b5cf6', // Violet-500
  [SEO_SITEMAP_STATUS.INDEXED]: '#06b6d4', // Cyan-500
  [SEO_SITEMAP_STATUS.FAILED]: '#dc2626', // Red-600
  [SEO_SITEMAP_STATUS.UPDATED]: '#f59e0b', // Amber-500
} as const;

/**
 * সাইটম্যাপ প্রায়োরিটি (০.০ - ১.০)
 */
export const SEO_SITEMAP_PRIORITY = {
  DEFAULT: 0.5,
  HIGHEST: 1.0,
  HIGH: 0.8,
  MEDIUM: 0.5,
  LOW: 0.3,
  LOWEST: 0.0,
} as const;

/**
 * SEO_SITEMAP_PRIORITY থেকে টাইপ
 */
export type SEOSitemapPriority = (typeof SEO_SITEMAP_PRIORITY)[keyof typeof SEO_SITEMAP_PRIORITY];

/**
 * সাইটম্যাপ কনফিগারেশন
 */
export interface SEOSitemapConfig {
  maxUrls: number;
  maxSize: number; // MB
  defaultChangeFreq: SEOSitemapChangeFreq;
  type: SEOSitemapType;
  includeImages: boolean;
  includeVideos: boolean;
  includeNews: boolean;
  compress: boolean;
}

/**
 * সাইটম্যাপ ডিফল্ট কনফিগারেশন
 */
export const SEO_SITEMAP_DEFAULT_CONFIG: SEOSitemapConfig = {
  maxUrls: SEO_SITEMAP_MAX_URLS,
  maxSize: SEO_SITEMAP_MAX_SIZE,
  defaultChangeFreq: SEO_SITEMAP_DEFAULT_CHANGE_FREQ as SEOSitemapChangeFreq,
  type: SEO_SITEMAP_TYPE.XML,
  includeImages: false,
  includeVideos: false,
  includeNews: false,
  compress: false,
} as const;

/**
 * সাইটম্যাপ এন্ট্রি
 */
export interface SEOSitemapEntry {
  url: string;
  lastModified?: Date;
  changeFreq?: SEOSitemapChangeFreq;
  priority?: number;
  images?: Array<{
    url: string;
    title?: string;
    caption?: string;
  }>;
  videos?: Array<{
    url: string;
    title: string;
    description?: string;
    thumbnail?: string;
  }>;
  news?: {
    publication: string;
    title: string;
    publicationDate: Date;
  };
}

/**
 * সাইটম্যাপ ডেটা
 */
export interface SEOSitemapData {
  id: string;
  url: string;
  type: SEOSitemapType;
  status: SEOSitemapStatus;
  entries: SEOSitemapEntry[];
  entryCount: number;
  size: number; // KB
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  indexedAt?: Date;
}

/**
 * সাইটম্যাপ ফিল্টার
 */
export interface SEOSitemapFilter {
  type?: SEOSitemapType;
  status?: SEOSitemapStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

/**
 * সাইটম্যাপ রেসপন্স
 */
export interface SEOSitemapResponse {
  data: SEOSitemapData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
