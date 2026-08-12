/**
 * SEO টুইটার কার্ড স্ট্যাটাস এনাম
 */
export const SEO_TWITTER_CARD_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UPDATING: 'updating',
} as const;

/**
 * SEO_TWITTER_CARD_STATUS থেকে টাইপ
 */
export type SEOTwitterCardStatus =
  (typeof SEO_TWITTER_CARD_STATUS)[keyof typeof SEO_TWITTER_CARD_STATUS];

/**
 * SEO টুইটার কার্ড স্ট্যাটাস লেবেল
 */
export const SEO_TWITTER_CARD_STATUS_LABELS: Record<SEOTwitterCardStatus, string> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: 'Draft',
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: 'Active',
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: 'Inactive',
  [SEO_TWITTER_CARD_STATUS.UPDATING]: 'Updating',
} as const;

/**
 * SEO টুইটার কার্ড স্ট্যাটাস বিবরণ
 */
export const SEO_TWITTER_CARD_STATUS_DESCRIPTIONS: Record<SEOTwitterCardStatus, string> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: 'Twitter Card is in draft mode, not yet published',
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: 'Twitter Card is active and being used on the site',
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: 'Twitter Card is inactive and not being used',
  [SEO_TWITTER_CARD_STATUS.UPDATING]: 'Twitter Card is currently being updated',
} as const;

/**
 * SEO টুইটার কার্ড স্ট্যাটাস আইকন
 */
export const SEO_TWITTER_CARD_STATUS_ICONS: Record<SEOTwitterCardStatus, string> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: '📝',
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: '✅',
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: '⏸️',
  [SEO_TWITTER_CARD_STATUS.UPDATING]: '🔄',
} as const;

/**
 * SEO টুইটার কার্ড স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_TWITTER_CARD_STATUS_COLORS: Record<SEOTwitterCardStatus, string> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: '#f59e0b', // Amber-500
  [SEO_TWITTER_CARD_STATUS.UPDATING]: '#3b82f6', // Blue-500
} as const;

/**
 * SEO টুইটার কার্ড স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_TWITTER_CARD_STATUS_TRANSITIONS: Record<
  SEOTwitterCardStatus,
  SEOTwitterCardStatus[]
> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: [
    SEO_TWITTER_CARD_STATUS.ACTIVE,
    SEO_TWITTER_CARD_STATUS.INACTIVE,
  ],
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: [
    SEO_TWITTER_CARD_STATUS.UPDATING,
    SEO_TWITTER_CARD_STATUS.INACTIVE,
  ],
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: [
    SEO_TWITTER_CARD_STATUS.ACTIVE,
    SEO_TWITTER_CARD_STATUS.DRAFT,
  ],
  [SEO_TWITTER_CARD_STATUS.UPDATING]: [
    SEO_TWITTER_CARD_STATUS.ACTIVE,
    SEO_TWITTER_CARD_STATUS.INACTIVE,
  ],
} as const;

/**
 * SEO টুইটার কার্ড স্ট্যাটাস কনফিগারেশন
 */
export interface SEOTwitterCardStatusConfig {
  status: SEOTwitterCardStatus;
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
 * SEO টুইটার কার্ড স্ট্যাটাস মেটাডেটা
 */
export const SEO_TWITTER_CARD_STATUS_METADATA: Record<
  SEOTwitterCardStatus,
  SEOTwitterCardStatusConfig
> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: {
    status: SEO_TWITTER_CARD_STATUS.DRAFT,
    label: SEO_TWITTER_CARD_STATUS_LABELS[SEO_TWITTER_CARD_STATUS.DRAFT],
    description: SEO_TWITTER_CARD_STATUS_DESCRIPTIONS[SEO_TWITTER_CARD_STATUS.DRAFT],
    icon: SEO_TWITTER_CARD_STATUS_ICONS[SEO_TWITTER_CARD_STATUS.DRAFT],
    color: SEO_TWITTER_CARD_STATUS_COLORS[SEO_TWITTER_CARD_STATUS.DRAFT],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 0,
  },
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: {
    status: SEO_TWITTER_CARD_STATUS.ACTIVE,
    label: SEO_TWITTER_CARD_STATUS_LABELS[SEO_TWITTER_CARD_STATUS.ACTIVE],
    description: SEO_TWITTER_CARD_STATUS_DESCRIPTIONS[SEO_TWITTER_CARD_STATUS.ACTIVE],
    icon: SEO_TWITTER_CARD_STATUS_ICONS[SEO_TWITTER_CARD_STATUS.ACTIVE],
    color: SEO_TWITTER_CARD_STATUS_COLORS[SEO_TWITTER_CARD_STATUS.ACTIVE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 1,
  },
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: {
    status: SEO_TWITTER_CARD_STATUS.INACTIVE,
    label: SEO_TWITTER_CARD_STATUS_LABELS[SEO_TWITTER_CARD_STATUS.INACTIVE],
    description: SEO_TWITTER_CARD_STATUS_DESCRIPTIONS[SEO_TWITTER_CARD_STATUS.INACTIVE],
    icon: SEO_TWITTER_CARD_STATUS_ICONS[SEO_TWITTER_CARD_STATUS.INACTIVE],
    color: SEO_TWITTER_CARD_STATUS_COLORS[SEO_TWITTER_CARD_STATUS.INACTIVE],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 2,
  },
  [SEO_TWITTER_CARD_STATUS.UPDATING]: {
    status: SEO_TWITTER_CARD_STATUS.UPDATING,
    label: SEO_TWITTER_CARD_STATUS_LABELS[SEO_TWITTER_CARD_STATUS.UPDATING],
    description: SEO_TWITTER_CARD_STATUS_DESCRIPTIONS[SEO_TWITTER_CARD_STATUS.UPDATING],
    icon: SEO_TWITTER_CARD_STATUS_ICONS[SEO_TWITTER_CARD_STATUS.UPDATING],
    color: SEO_TWITTER_CARD_STATUS_COLORS[SEO_TWITTER_CARD_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 3,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_TWITTER_CARD_TERMINAL_STATUSES = [SEO_TWITTER_CARD_STATUS.INACTIVE] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_TWITTER_CARD_SUCCESS_STATUSES = [SEO_TWITTER_CARD_STATUS.ACTIVE] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_TWITTER_CARD_ERROR_STATUSES = [] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_TWITTER_CARD_ACTIVE_STATUSES = [
  SEO_TWITTER_CARD_STATUS.ACTIVE,
  SEO_TWITTER_CARD_STATUS.UPDATING,
] as const;
