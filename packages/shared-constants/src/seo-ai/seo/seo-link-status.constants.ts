/**
 * SEO লিংক স্ট্যাটাস এনাম
 */
export const SEO_LINK_STATUS = {
  ACTIVE: 'active',
  BROKEN: 'broken',
  MOVED: 'moved',
  PENDING: 'pending',
  REMOVED: 'removed',
  CHECKING: 'checking',
  PAUSED: 'paused',
} as const;

/**
 * SEO_LINK_STATUS থেকে টাইপ
 */
export type SEOLinkStatus = (typeof SEO_LINK_STATUS)[keyof typeof SEO_LINK_STATUS];

/**
 * SEO লিংক স্ট্যাটাস লেবেল
 */
export const SEO_LINK_STATUS_LABELS: Record<SEOLinkStatus, string> = {
  [SEO_LINK_STATUS.ACTIVE]: 'Active',
  [SEO_LINK_STATUS.BROKEN]: 'Broken',
  [SEO_LINK_STATUS.MOVED]: 'Moved',
  [SEO_LINK_STATUS.PENDING]: 'Pending',
  [SEO_LINK_STATUS.REMOVED]: 'Removed',
  [SEO_LINK_STATUS.CHECKING]: 'Checking',
  [SEO_LINK_STATUS.PAUSED]: 'Paused',
} as const;

/**
 * SEO লিংক স্ট্যাটাস বিবরণ
 */
export const SEO_LINK_STATUS_DESCRIPTIONS: Record<SEOLinkStatus, string> = {
  [SEO_LINK_STATUS.ACTIVE]: 'Link is active and working properly',
  [SEO_LINK_STATUS.BROKEN]: 'Link is broken or returning an error',
  [SEO_LINK_STATUS.MOVED]: 'Link has been moved or redirected',
  [SEO_LINK_STATUS.PENDING]: 'Link is pending verification or approval',
  [SEO_LINK_STATUS.REMOVED]: 'Link has been removed or deleted',
  [SEO_LINK_STATUS.CHECKING]: 'Link is currently being checked for validity',
  [SEO_LINK_STATUS.PAUSED]: 'Link is temporarily paused or deactivated',
} as const;

/**
 * SEO লিংক স্ট্যাটাস আইকন
 */
export const SEO_LINK_STATUS_ICONS: Record<SEOLinkStatus, string> = {
  [SEO_LINK_STATUS.ACTIVE]: '✅',
  [SEO_LINK_STATUS.BROKEN]: '❌',
  [SEO_LINK_STATUS.MOVED]: '🔄',
  [SEO_LINK_STATUS.PENDING]: '⏳',
  [SEO_LINK_STATUS.REMOVED]: '🗑️',
  [SEO_LINK_STATUS.CHECKING]: '🔍',
  [SEO_LINK_STATUS.PAUSED]: '⏸️',
} as const;

/**
 * SEO লিংক স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_LINK_STATUS_COLORS: Record<SEOLinkStatus, string> = {
  [SEO_LINK_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_LINK_STATUS.BROKEN]: '#dc2626', // Red-600
  [SEO_LINK_STATUS.MOVED]: '#f59e0b', // Amber-500
  [SEO_LINK_STATUS.PENDING]: '#3b82f6', // Blue-500
  [SEO_LINK_STATUS.REMOVED]: '#64748b', // Slate-500
  [SEO_LINK_STATUS.CHECKING]: '#8b5cf6', // Violet-500
  [SEO_LINK_STATUS.PAUSED]: '#94a3b8', // Slate-400
} as const;

/**
 * SEO লিংক স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_LINK_STATUS_TRANSITIONS: Record<SEOLinkStatus, SEOLinkStatus[]> = {
  [SEO_LINK_STATUS.PENDING]: [SEO_LINK_STATUS.CHECKING, SEO_LINK_STATUS.REMOVED],
  [SEO_LINK_STATUS.CHECKING]: [
    SEO_LINK_STATUS.ACTIVE,
    SEO_LINK_STATUS.BROKEN,
    SEO_LINK_STATUS.MOVED,
    SEO_LINK_STATUS.PAUSED,
  ],
  [SEO_LINK_STATUS.ACTIVE]: [
    SEO_LINK_STATUS.BROKEN,
    SEO_LINK_STATUS.MOVED,
    SEO_LINK_STATUS.REMOVED,
    SEO_LINK_STATUS.PAUSED,
  ],
  [SEO_LINK_STATUS.BROKEN]: [SEO_LINK_STATUS.CHECKING, SEO_LINK_STATUS.REMOVED],
  [SEO_LINK_STATUS.MOVED]: [SEO_LINK_STATUS.ACTIVE, SEO_LINK_STATUS.REMOVED],
  [SEO_LINK_STATUS.PAUSED]: [
    SEO_LINK_STATUS.ACTIVE,
    SEO_LINK_STATUS.REMOVED,
    SEO_LINK_STATUS.CHECKING,
  ],
  [SEO_LINK_STATUS.REMOVED]: [SEO_LINK_STATUS.PENDING],
} as const;

/**
 * SEO লিংক স্ট্যাটাস কনফিগারেশন
 */
export interface SEOLinkStatusConfig {
  status: SEOLinkStatus;
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
 * SEO লিংক স্ট্যাটাস মেটাডেটা
 */
export const SEO_LINK_STATUS_METADATA: Record<SEOLinkStatus, SEOLinkStatusConfig> = {
  [SEO_LINK_STATUS.PENDING]: {
    status: SEO_LINK_STATUS.PENDING,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.PENDING],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.PENDING],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.PENDING],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.PENDING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [SEO_LINK_STATUS.CHECKING]: {
    status: SEO_LINK_STATUS.CHECKING,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.CHECKING],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.CHECKING],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.CHECKING],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.CHECKING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_LINK_STATUS.ACTIVE]: {
    status: SEO_LINK_STATUS.ACTIVE,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.ACTIVE],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.ACTIVE],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.ACTIVE],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.ACTIVE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_LINK_STATUS.BROKEN]: {
    status: SEO_LINK_STATUS.BROKEN,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.BROKEN],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.BROKEN],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.BROKEN],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.BROKEN],
    isTerminal: false,
    isError: true,
    isSuccess: false,
    isActive: true,
    order: 3,
  },
  [SEO_LINK_STATUS.MOVED]: {
    status: SEO_LINK_STATUS.MOVED,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.MOVED],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.MOVED],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.MOVED],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.MOVED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [SEO_LINK_STATUS.PAUSED]: {
    status: SEO_LINK_STATUS.PAUSED,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.PAUSED],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.PAUSED],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.PAUSED],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.PAUSED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 5,
  },
  [SEO_LINK_STATUS.REMOVED]: {
    status: SEO_LINK_STATUS.REMOVED,
    label: SEO_LINK_STATUS_LABELS[SEO_LINK_STATUS.REMOVED],
    description: SEO_LINK_STATUS_DESCRIPTIONS[SEO_LINK_STATUS.REMOVED],
    icon: SEO_LINK_STATUS_ICONS[SEO_LINK_STATUS.REMOVED],
    color: SEO_LINK_STATUS_COLORS[SEO_LINK_STATUS.REMOVED],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_LINK_TERMINAL_STATUSES = [SEO_LINK_STATUS.REMOVED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_LINK_SUCCESS_STATUSES = [SEO_LINK_STATUS.ACTIVE] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_LINK_ERROR_STATUSES = [SEO_LINK_STATUS.BROKEN] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_LINK_ACTIVE_STATUSES = [
  SEO_LINK_STATUS.PENDING,
  SEO_LINK_STATUS.CHECKING,
  SEO_LINK_STATUS.ACTIVE,
  SEO_LINK_STATUS.BROKEN,
  SEO_LINK_STATUS.MOVED,
] as const;
