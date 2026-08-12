/**
 * SEO রোবটস টাইপ এনাম
 */
export const SEO_ROBOTS_TYPE = {
  ALLOW: 'allow',
  DISALLOW: 'disallow',
  CRAWL_DELAY: 'crawl-delay',
  SITEMAP: 'sitemap',
} as const;

/**
 * SEO_ROBOTS_TYPE থেকে টাইপ
 */
export type SEORobotsType = (typeof SEO_ROBOTS_TYPE)[keyof typeof SEO_ROBOTS_TYPE];

/**
 * SEO রোবটস টাইপ লেবেল
 */
export const SEO_ROBOTS_TYPE_LABELS: Record<SEORobotsType, string> = {
  [SEO_ROBOTS_TYPE.ALLOW]: 'Allow',
  [SEO_ROBOTS_TYPE.DISALLOW]: 'Disallow',
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: 'Crawl Delay',
  [SEO_ROBOTS_TYPE.SITEMAP]: 'Sitemap',
} as const;

/**
 * SEO রোবটস টাইপ বিবরণ
 */
export const SEO_ROBOTS_TYPE_DESCRIPTIONS: Record<SEORobotsType, string> = {
  [SEO_ROBOTS_TYPE.ALLOW]: 'Allows crawlers to access specified paths',
  [SEO_ROBOTS_TYPE.DISALLOW]: 'Prevents crawlers from accessing specified paths',
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: 'Specifies delay between crawler requests in seconds',
  [SEO_ROBOTS_TYPE.SITEMAP]: 'Specifies the location of the sitemap file',
} as const;

/**
 * SEO রোবটস টাইপ আইকন
 */
export const SEO_ROBOTS_TYPE_ICONS: Record<SEORobotsType, string> = {
  [SEO_ROBOTS_TYPE.ALLOW]: '✅',
  [SEO_ROBOTS_TYPE.DISALLOW]: '🚫',
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: '⏱️',
  [SEO_ROBOTS_TYPE.SITEMAP]: '📄',
} as const;

/**
 * SEO রোবটস টাইপ কালার (হেক্স কোড)
 */
export const SEO_ROBOTS_TYPE_COLORS: Record<SEORobotsType, string> = {
  [SEO_ROBOTS_TYPE.ALLOW]: '#22c55e', // Green-500
  [SEO_ROBOTS_TYPE.DISALLOW]: '#dc2626', // Red-600
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: '#f59e0b', // Amber-500
  [SEO_ROBOTS_TYPE.SITEMAP]: '#3b82f6', // Blue-500
} as const;

/**
 * SEO রোবটস টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_ROBOTS_TYPE_PRIORITY: Record<SEORobotsType, number> = {
  [SEO_ROBOTS_TYPE.ALLOW]: 2,
  [SEO_ROBOTS_TYPE.DISALLOW]: 1,
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: 3,
  [SEO_ROBOTS_TYPE.SITEMAP]: 4,
} as const;

/**
 * SEO রোবটস টাইপ ক্যাটাগরি
 */
export const SEO_ROBOTS_TYPE_CATEGORY = {
  ACCESS: 'access',
  PERFORMANCE: 'performance',
  REFERENCE: 'reference',
} as const;

/**
 * SEO_ROBOTS_TYPE_CATEGORY থেকে টাইপ
 */
export type SEORobotsTypeCategory =
  (typeof SEO_ROBOTS_TYPE_CATEGORY)[keyof typeof SEO_ROBOTS_TYPE_CATEGORY];

/**
 * SEO রোবটস টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_ROBOTS_TYPE_CATEGORY_LABELS: Record<SEORobotsTypeCategory, string> = {
  [SEO_ROBOTS_TYPE_CATEGORY.ACCESS]: 'Access Control',
  [SEO_ROBOTS_TYPE_CATEGORY.PERFORMANCE]: 'Performance Control',
  [SEO_ROBOTS_TYPE_CATEGORY.REFERENCE]: 'Reference',
} as const;

/**
 * SEO রোবটস টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_ROBOTS_TYPE_CATEGORY_MAP: Record<SEORobotsType, SEORobotsTypeCategory> = {
  [SEO_ROBOTS_TYPE.ALLOW]: SEO_ROBOTS_TYPE_CATEGORY.ACCESS,
  [SEO_ROBOTS_TYPE.DISALLOW]: SEO_ROBOTS_TYPE_CATEGORY.ACCESS,
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: SEO_ROBOTS_TYPE_CATEGORY.PERFORMANCE,
  [SEO_ROBOTS_TYPE.SITEMAP]: SEO_ROBOTS_TYPE_CATEGORY.REFERENCE,
} as const;

/**
 * SEO রোবটস টাইপ কনফিগারেশন
 */
export interface SEORobotsTypeConfig {
  type: SEORobotsType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  category: SEORobotsTypeCategory;
  requiresValue: boolean;
  multipleAllowed: boolean;
  order: number;
}

/**
 * SEO রোবটস টাইপ মেটাডেটা
 */
export const SEO_ROBOTS_TYPE_METADATA: Record<SEORobotsType, SEORobotsTypeConfig> = {
  [SEO_ROBOTS_TYPE.ALLOW]: {
    type: SEO_ROBOTS_TYPE.ALLOW,
    label: SEO_ROBOTS_TYPE_LABELS[SEO_ROBOTS_TYPE.ALLOW],
    description: SEO_ROBOTS_TYPE_DESCRIPTIONS[SEO_ROBOTS_TYPE.ALLOW],
    icon: SEO_ROBOTS_TYPE_ICONS[SEO_ROBOTS_TYPE.ALLOW],
    color: SEO_ROBOTS_TYPE_COLORS[SEO_ROBOTS_TYPE.ALLOW],
    priority: SEO_ROBOTS_TYPE_PRIORITY[SEO_ROBOTS_TYPE.ALLOW],
    category: SEO_ROBOTS_TYPE_CATEGORY_MAP[SEO_ROBOTS_TYPE.ALLOW],
    requiresValue: true,
    multipleAllowed: true,
    order: 0,
  },
  [SEO_ROBOTS_TYPE.DISALLOW]: {
    type: SEO_ROBOTS_TYPE.DISALLOW,
    label: SEO_ROBOTS_TYPE_LABELS[SEO_ROBOTS_TYPE.DISALLOW],
    description: SEO_ROBOTS_TYPE_DESCRIPTIONS[SEO_ROBOTS_TYPE.DISALLOW],
    icon: SEO_ROBOTS_TYPE_ICONS[SEO_ROBOTS_TYPE.DISALLOW],
    color: SEO_ROBOTS_TYPE_COLORS[SEO_ROBOTS_TYPE.DISALLOW],
    priority: SEO_ROBOTS_TYPE_PRIORITY[SEO_ROBOTS_TYPE.DISALLOW],
    category: SEO_ROBOTS_TYPE_CATEGORY_MAP[SEO_ROBOTS_TYPE.DISALLOW],
    requiresValue: true,
    multipleAllowed: true,
    order: 1,
  },
  [SEO_ROBOTS_TYPE.CRAWL_DELAY]: {
    type: SEO_ROBOTS_TYPE.CRAWL_DELAY,
    label: SEO_ROBOTS_TYPE_LABELS[SEO_ROBOTS_TYPE.CRAWL_DELAY],
    description: SEO_ROBOTS_TYPE_DESCRIPTIONS[SEO_ROBOTS_TYPE.CRAWL_DELAY],
    icon: SEO_ROBOTS_TYPE_ICONS[SEO_ROBOTS_TYPE.CRAWL_DELAY],
    color: SEO_ROBOTS_TYPE_COLORS[SEO_ROBOTS_TYPE.CRAWL_DELAY],
    priority: SEO_ROBOTS_TYPE_PRIORITY[SEO_ROBOTS_TYPE.CRAWL_DELAY],
    category: SEO_ROBOTS_TYPE_CATEGORY_MAP[SEO_ROBOTS_TYPE.CRAWL_DELAY],
    requiresValue: true,
    multipleAllowed: false,
    order: 2,
  },
  [SEO_ROBOTS_TYPE.SITEMAP]: {
    type: SEO_ROBOTS_TYPE.SITEMAP,
    label: SEO_ROBOTS_TYPE_LABELS[SEO_ROBOTS_TYPE.SITEMAP],
    description: SEO_ROBOTS_TYPE_DESCRIPTIONS[SEO_ROBOTS_TYPE.SITEMAP],
    icon: SEO_ROBOTS_TYPE_ICONS[SEO_ROBOTS_TYPE.SITEMAP],
    color: SEO_ROBOTS_TYPE_COLORS[SEO_ROBOTS_TYPE.SITEMAP],
    priority: SEO_ROBOTS_TYPE_PRIORITY[SEO_ROBOTS_TYPE.SITEMAP],
    category: SEO_ROBOTS_TYPE_CATEGORY_MAP[SEO_ROBOTS_TYPE.SITEMAP],
    requiresValue: true,
    multipleAllowed: true,
    order: 3,
  },
} as const;

/**
 * SEO রোবটস টাইপ গ্রুপ
 */
export const SEO_ROBOTS_TYPE_GROUPS = {
  ACCESS: [SEO_ROBOTS_TYPE.ALLOW, SEO_ROBOTS_TYPE.DISALLOW] as const,
  PERFORMANCE: [SEO_ROBOTS_TYPE.CRAWL_DELAY] as const,
  REFERENCE: [SEO_ROBOTS_TYPE.SITEMAP] as const,
} as const;

/**
 * SEO রোবটস টাইপ গ্রুপ লেবেল
 */
export const SEO_ROBOTS_TYPE_GROUP_LABELS = {
  ACCESS: 'Access Control',
  PERFORMANCE: 'Performance',
  REFERENCE: 'Reference',
} as const;

/**
 * SEO রোবটস টাইপ গ্রুপ কালার
 */
export const SEO_ROBOTS_TYPE_GROUP_COLORS = {
  ACCESS: '#22c55e',
  PERFORMANCE: '#f59e0b',
  REFERENCE: '#3b82f6',
} as const;
