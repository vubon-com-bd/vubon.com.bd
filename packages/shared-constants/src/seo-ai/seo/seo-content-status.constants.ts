/**
 * SEO কন্টেন্ট স্ট্যাটাস এনাম
 */
export const SEO_CONTENT_STATUS = {
  DRAFT: 'draft',
  WRITING: 'writing',
  REVIEWING: 'reviewing',
  PUBLISHED: 'published',
  UPDATING: 'updating',
  ARCHIVED: 'archived',
  OPTIMIZED: 'optimized',
  NEEDS_IMPROVEMENT: 'needs-improvement',
} as const;

/**
 * SEO_CONTENT_STATUS থেকে টাইপ
 */
export type SEOContentStatus = (typeof SEO_CONTENT_STATUS)[keyof typeof SEO_CONTENT_STATUS];

/**
 * SEO কন্টেন্ট স্ট্যাটাস লেবেল
 */
export const SEO_CONTENT_STATUS_LABELS: Record<SEOContentStatus, string> = {
  [SEO_CONTENT_STATUS.DRAFT]: 'Draft',
  [SEO_CONTENT_STATUS.WRITING]: 'Writing',
  [SEO_CONTENT_STATUS.REVIEWING]: 'Reviewing',
  [SEO_CONTENT_STATUS.PUBLISHED]: 'Published',
  [SEO_CONTENT_STATUS.UPDATING]: 'Updating',
  [SEO_CONTENT_STATUS.ARCHIVED]: 'Archived',
  [SEO_CONTENT_STATUS.OPTIMIZED]: 'Optimized',
  [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT]: 'Needs Improvement',
} as const;

/**
 * SEO কন্টেন্ট স্ট্যাটাস বিবরণ
 */
export const SEO_CONTENT_STATUS_DESCRIPTIONS: Record<SEOContentStatus, string> = {
  [SEO_CONTENT_STATUS.DRAFT]: 'Content is in draft mode, not yet ready for review',
  [SEO_CONTENT_STATUS.WRITING]: 'Content is currently being written or created',
  [SEO_CONTENT_STATUS.REVIEWING]: 'Content is under review for quality and accuracy',
  [SEO_CONTENT_STATUS.PUBLISHED]: 'Content is published and live on the website',
  [SEO_CONTENT_STATUS.UPDATING]: 'Content is being updated or revised',
  [SEO_CONTENT_STATUS.ARCHIVED]: 'Content is archived and no longer actively used',
  [SEO_CONTENT_STATUS.OPTIMIZED]: 'Content has been fully optimized for SEO',
  [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT]: 'Content needs improvement for SEO or quality',
} as const;

/**
 * SEO কন্টেন্ট স্ট্যাটাস আইকন
 */
export const SEO_CONTENT_STATUS_ICONS: Record<SEOContentStatus, string> = {
  [SEO_CONTENT_STATUS.DRAFT]: '📝',
  [SEO_CONTENT_STATUS.WRITING]: '✍️',
  [SEO_CONTENT_STATUS.REVIEWING]: '👀',
  [SEO_CONTENT_STATUS.PUBLISHED]: '🚀',
  [SEO_CONTENT_STATUS.UPDATING]: '🔄',
  [SEO_CONTENT_STATUS.ARCHIVED]: '📦',
  [SEO_CONTENT_STATUS.OPTIMIZED]: '⭐',
  [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT]: '⚠️',
} as const;

/**
 * SEO কন্টেন্ট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_CONTENT_STATUS_COLORS: Record<SEOContentStatus, string> = {
  [SEO_CONTENT_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [SEO_CONTENT_STATUS.WRITING]: '#3b82f6', // Blue-500
  [SEO_CONTENT_STATUS.REVIEWING]: '#8b5cf6', // Violet-500
  [SEO_CONTENT_STATUS.PUBLISHED]: '#22c55e', // Green-500
  [SEO_CONTENT_STATUS.UPDATING]: '#f59e0b', // Amber-500
  [SEO_CONTENT_STATUS.ARCHIVED]: '#64748b', // Slate-500
  [SEO_CONTENT_STATUS.OPTIMIZED]: '#06b6d4', // Cyan-500
  [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT]: '#ef4444', // Red-500
} as const;

/**
 * SEO কন্টেন্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_CONTENT_STATUS_TRANSITIONS: Record<SEOContentStatus, SEOContentStatus[]> = {
  [SEO_CONTENT_STATUS.DRAFT]: [SEO_CONTENT_STATUS.WRITING, SEO_CONTENT_STATUS.ARCHIVED],
  [SEO_CONTENT_STATUS.WRITING]: [
    SEO_CONTENT_STATUS.REVIEWING,
    SEO_CONTENT_STATUS.DRAFT,
    SEO_CONTENT_STATUS.ARCHIVED,
  ],
  [SEO_CONTENT_STATUS.REVIEWING]: [
    SEO_CONTENT_STATUS.PUBLISHED,
    SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT,
    SEO_CONTENT_STATUS.DRAFT,
    SEO_CONTENT_STATUS.ARCHIVED,
  ],
  [SEO_CONTENT_STATUS.PUBLISHED]: [
    SEO_CONTENT_STATUS.UPDATING,
    SEO_CONTENT_STATUS.OPTIMIZED,
    SEO_CONTENT_STATUS.ARCHIVED,
  ],
  [SEO_CONTENT_STATUS.UPDATING]: [
    SEO_CONTENT_STATUS.PUBLISHED,
    SEO_CONTENT_STATUS.REVIEWING,
    SEO_CONTENT_STATUS.ARCHIVED,
  ],
  [SEO_CONTENT_STATUS.ARCHIVED]: [SEO_CONTENT_STATUS.DRAFT],
  [SEO_CONTENT_STATUS.OPTIMIZED]: [
    SEO_CONTENT_STATUS.PUBLISHED,
    SEO_CONTENT_STATUS.UPDATING,
    SEO_CONTENT_STATUS.ARCHIVED,
  ],
  [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT]: [
    SEO_CONTENT_STATUS.WRITING,
    SEO_CONTENT_STATUS.REVIEWING,
    SEO_CONTENT_STATUS.ARCHIVED,
  ],
} as const;

/**
 * SEO কন্টেন্ট স্ট্যাটাস কনফিগারেশন
 */
export interface SEOContentStatusConfig {
  status: SEOContentStatus;
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
 * SEO কন্টেন্ট স্ট্যাটাস মেটাডেটা
 */
export const SEO_CONTENT_STATUS_METADATA: Record<SEOContentStatus, SEOContentStatusConfig> = {
  [SEO_CONTENT_STATUS.DRAFT]: {
    status: SEO_CONTENT_STATUS.DRAFT,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.DRAFT],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.DRAFT],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.DRAFT],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.DRAFT],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 0,
  },
  [SEO_CONTENT_STATUS.WRITING]: {
    status: SEO_CONTENT_STATUS.WRITING,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.WRITING],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.WRITING],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.WRITING],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.WRITING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_CONTENT_STATUS.REVIEWING]: {
    status: SEO_CONTENT_STATUS.REVIEWING,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.REVIEWING],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.REVIEWING],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.REVIEWING],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.REVIEWING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 2,
  },
  [SEO_CONTENT_STATUS.PUBLISHED]: {
    status: SEO_CONTENT_STATUS.PUBLISHED,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.PUBLISHED],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.PUBLISHED],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.PUBLISHED],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.PUBLISHED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 3,
  },
  [SEO_CONTENT_STATUS.UPDATING]: {
    status: SEO_CONTENT_STATUS.UPDATING,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.UPDATING],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.UPDATING],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.UPDATING],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [SEO_CONTENT_STATUS.ARCHIVED]: {
    status: SEO_CONTENT_STATUS.ARCHIVED,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.ARCHIVED],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.ARCHIVED],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.ARCHIVED],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.ARCHIVED],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 5,
  },
  [SEO_CONTENT_STATUS.OPTIMIZED]: {
    status: SEO_CONTENT_STATUS.OPTIMIZED,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.OPTIMIZED],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.OPTIMIZED],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.OPTIMIZED],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.OPTIMIZED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 6,
  },
  [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT]: {
    status: SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT,
    label: SEO_CONTENT_STATUS_LABELS[SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT],
    description: SEO_CONTENT_STATUS_DESCRIPTIONS[SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT],
    icon: SEO_CONTENT_STATUS_ICONS[SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT],
    color: SEO_CONTENT_STATUS_COLORS[SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT],
    isTerminal: false,
    isError: true,
    isSuccess: false,
    isActive: true,
    order: 7,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_CONTENT_TERMINAL_STATUSES = [
  SEO_CONTENT_STATUS.ARCHIVED,
  SEO_CONTENT_STATUS.OPTIMIZED,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_CONTENT_SUCCESS_STATUSES = [
  SEO_CONTENT_STATUS.PUBLISHED,
  SEO_CONTENT_STATUS.OPTIMIZED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_CONTENT_ERROR_STATUSES = [SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_CONTENT_ACTIVE_STATUSES = [
  SEO_CONTENT_STATUS.WRITING,
  SEO_CONTENT_STATUS.REVIEWING,
  SEO_CONTENT_STATUS.PUBLISHED,
  SEO_CONTENT_STATUS.UPDATING,
  SEO_CONTENT_STATUS.NEEDS_IMPROVEMENT,
] as const;
