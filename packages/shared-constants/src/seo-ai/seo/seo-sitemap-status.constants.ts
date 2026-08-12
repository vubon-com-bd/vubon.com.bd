/**
 * SEO সাইটম্যাপ স্ট্যাটাস এনাম
 */
export const SEO_SITEMAP_STATUS = {
  GENERATING: 'generating',
  GENERATED: 'generated',
  SUBMITTED: 'submitted',
  INDEXED: 'indexed',
  ERROR: 'error',
  UPDATING: 'updating',
} as const;

/**
 * SEO_SITEMAP_STATUS থেকে টাইপ
 */
export type SEOSitemapStatus = (typeof SEO_SITEMAP_STATUS)[keyof typeof SEO_SITEMAP_STATUS];

/**
 * SEO সাইটম্যাপ স্ট্যাটাস লেবেল
 */
export const SEO_SITEMAP_STATUS_LABELS: Record<SEOSitemapStatus, string> = {
  [SEO_SITEMAP_STATUS.GENERATING]: 'Generating',
  [SEO_SITEMAP_STATUS.GENERATED]: 'Generated',
  [SEO_SITEMAP_STATUS.SUBMITTED]: 'Submitted',
  [SEO_SITEMAP_STATUS.INDEXED]: 'Indexed',
  [SEO_SITEMAP_STATUS.ERROR]: 'Error',
  [SEO_SITEMAP_STATUS.UPDATING]: 'Updating',
} as const;

/**
 * SEO সাইটম্যাপ স্ট্যাটাস বিবরণ
 */
export const SEO_SITEMAP_STATUS_DESCRIPTIONS: Record<SEOSitemapStatus, string> = {
  [SEO_SITEMAP_STATUS.GENERATING]: 'Sitemap is currently being generated',
  [SEO_SITEMAP_STATUS.GENERATED]: 'Sitemap has been successfully generated',
  [SEO_SITEMAP_STATUS.SUBMITTED]: 'Sitemap has been submitted to search engines',
  [SEO_SITEMAP_STATUS.INDEXED]: 'Sitemap has been indexed by search engines',
  [SEO_SITEMAP_STATUS.ERROR]: 'Error occurred during sitemap generation or submission',
  [SEO_SITEMAP_STATUS.UPDATING]: 'Sitemap is being updated with new content',
} as const;

/**
 * SEO সাইটম্যাপ স্ট্যাটাস আইকন
 */
export const SEO_SITEMAP_STATUS_ICONS: Record<SEOSitemapStatus, string> = {
  [SEO_SITEMAP_STATUS.GENERATING]: '🔄',
  [SEO_SITEMAP_STATUS.GENERATED]: '✅',
  [SEO_SITEMAP_STATUS.SUBMITTED]: '📤',
  [SEO_SITEMAP_STATUS.INDEXED]: '📥',
  [SEO_SITEMAP_STATUS.ERROR]: '❌',
  [SEO_SITEMAP_STATUS.UPDATING]: '📝',
} as const;

/**
 * SEO সাইটম্যাপ স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_SITEMAP_STATUS_COLORS: Record<SEOSitemapStatus, string> = {
  [SEO_SITEMAP_STATUS.GENERATING]: '#3b82f6', // Blue-500
  [SEO_SITEMAP_STATUS.GENERATED]: '#22c55e', // Green-500
  [SEO_SITEMAP_STATUS.SUBMITTED]: '#8b5cf6', // Violet-500
  [SEO_SITEMAP_STATUS.INDEXED]: '#06b6d4', // Cyan-500
  [SEO_SITEMAP_STATUS.ERROR]: '#dc2626', // Red-600
  [SEO_SITEMAP_STATUS.UPDATING]: '#f59e0b', // Amber-500
} as const;

/**
 * SEO সাইটম্যাপ স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_SITEMAP_STATUS_TRANSITIONS: Record<SEOSitemapStatus, SEOSitemapStatus[]> = {
  [SEO_SITEMAP_STATUS.GENERATING]: [SEO_SITEMAP_STATUS.GENERATED, SEO_SITEMAP_STATUS.ERROR],
  [SEO_SITEMAP_STATUS.GENERATED]: [
    SEO_SITEMAP_STATUS.SUBMITTED,
    SEO_SITEMAP_STATUS.ERROR,
    SEO_SITEMAP_STATUS.UPDATING,
  ],
  [SEO_SITEMAP_STATUS.SUBMITTED]: [
    SEO_SITEMAP_STATUS.INDEXED,
    SEO_SITEMAP_STATUS.ERROR,
    SEO_SITEMAP_STATUS.UPDATING,
  ],
  [SEO_SITEMAP_STATUS.INDEXED]: [SEO_SITEMAP_STATUS.UPDATING, SEO_SITEMAP_STATUS.ERROR],
  [SEO_SITEMAP_STATUS.ERROR]: [SEO_SITEMAP_STATUS.GENERATING, SEO_SITEMAP_STATUS.UPDATING],
  [SEO_SITEMAP_STATUS.UPDATING]: [SEO_SITEMAP_STATUS.GENERATED, SEO_SITEMAP_STATUS.ERROR],
} as const;

/**
 * SEO সাইটম্যাপ স্ট্যাটাস কনফিগারেশন
 */
export interface SEOSitemapStatusConfig {
  status: SEOSitemapStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isError: boolean;
  isSuccess: boolean;
  isActive: boolean;
  order: number;
}

/**
 * SEO সাইটম্যাপ স্ট্যাটাস মেটাডেটা
 */
export const SEO_SITEMAP_STATUS_METADATA: Record<SEOSitemapStatus, SEOSitemapStatusConfig> = {
  [SEO_SITEMAP_STATUS.GENERATING]: {
    status: SEO_SITEMAP_STATUS.GENERATING,
    label: SEO_SITEMAP_STATUS_LABELS[SEO_SITEMAP_STATUS.GENERATING],
    description: SEO_SITEMAP_STATUS_DESCRIPTIONS[SEO_SITEMAP_STATUS.GENERATING],
    icon: SEO_SITEMAP_STATUS_ICONS[SEO_SITEMAP_STATUS.GENERATING],
    color: SEO_SITEMAP_STATUS_COLORS[SEO_SITEMAP_STATUS.GENERATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [SEO_SITEMAP_STATUS.GENERATED]: {
    status: SEO_SITEMAP_STATUS.GENERATED,
    label: SEO_SITEMAP_STATUS_LABELS[SEO_SITEMAP_STATUS.GENERATED],
    description: SEO_SITEMAP_STATUS_DESCRIPTIONS[SEO_SITEMAP_STATUS.GENERATED],
    icon: SEO_SITEMAP_STATUS_ICONS[SEO_SITEMAP_STATUS.GENERATED],
    color: SEO_SITEMAP_STATUS_COLORS[SEO_SITEMAP_STATUS.GENERATED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 1,
  },
  [SEO_SITEMAP_STATUS.SUBMITTED]: {
    status: SEO_SITEMAP_STATUS.SUBMITTED,
    label: SEO_SITEMAP_STATUS_LABELS[SEO_SITEMAP_STATUS.SUBMITTED],
    description: SEO_SITEMAP_STATUS_DESCRIPTIONS[SEO_SITEMAP_STATUS.SUBMITTED],
    icon: SEO_SITEMAP_STATUS_ICONS[SEO_SITEMAP_STATUS.SUBMITTED],
    color: SEO_SITEMAP_STATUS_COLORS[SEO_SITEMAP_STATUS.SUBMITTED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_SITEMAP_STATUS.INDEXED]: {
    status: SEO_SITEMAP_STATUS.INDEXED,
    label: SEO_SITEMAP_STATUS_LABELS[SEO_SITEMAP_STATUS.INDEXED],
    description: SEO_SITEMAP_STATUS_DESCRIPTIONS[SEO_SITEMAP_STATUS.INDEXED],
    icon: SEO_SITEMAP_STATUS_ICONS[SEO_SITEMAP_STATUS.INDEXED],
    color: SEO_SITEMAP_STATUS_COLORS[SEO_SITEMAP_STATUS.INDEXED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 3,
  },
  [SEO_SITEMAP_STATUS.ERROR]: {
    status: SEO_SITEMAP_STATUS.ERROR,
    label: SEO_SITEMAP_STATUS_LABELS[SEO_SITEMAP_STATUS.ERROR],
    description: SEO_SITEMAP_STATUS_DESCRIPTIONS[SEO_SITEMAP_STATUS.ERROR],
    icon: SEO_SITEMAP_STATUS_ICONS[SEO_SITEMAP_STATUS.ERROR],
    color: SEO_SITEMAP_STATUS_COLORS[SEO_SITEMAP_STATUS.ERROR],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 4,
  },
  [SEO_SITEMAP_STATUS.UPDATING]: {
    status: SEO_SITEMAP_STATUS.UPDATING,
    label: SEO_SITEMAP_STATUS_LABELS[SEO_SITEMAP_STATUS.UPDATING],
    description: SEO_SITEMAP_STATUS_DESCRIPTIONS[SEO_SITEMAP_STATUS.UPDATING],
    icon: SEO_SITEMAP_STATUS_ICONS[SEO_SITEMAP_STATUS.UPDATING],
    color: SEO_SITEMAP_STATUS_COLORS[SEO_SITEMAP_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 5,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_SITEMAP_TERMINAL_STATUSES = [
  SEO_SITEMAP_STATUS.INDEXED,
  SEO_SITEMAP_STATUS.ERROR,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_SITEMAP_SUCCESS_STATUSES = [
  SEO_SITEMAP_STATUS.GENERATED,
  SEO_SITEMAP_STATUS.SUBMITTED,
  SEO_SITEMAP_STATUS.INDEXED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_SITEMAP_ERROR_STATUSES = [SEO_SITEMAP_STATUS.ERROR] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_SITEMAP_ACTIVE_STATUSES = [
  SEO_SITEMAP_STATUS.GENERATING,
  SEO_SITEMAP_STATUS.GENERATED,
  SEO_SITEMAP_STATUS.SUBMITTED,
  SEO_SITEMAP_STATUS.UPDATING,
] as const;
