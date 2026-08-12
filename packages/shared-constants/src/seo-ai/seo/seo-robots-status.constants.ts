/**
 * SEO রোবটস স্ট্যাটাস এনাম
 */
export const SEO_ROBOTS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UPDATING: 'updating',
  ERROR: 'error',
} as const;

/**
 * SEO_ROBOTS_STATUS থেকে টাইপ
 */
export type SEORobotsStatus = (typeof SEO_ROBOTS_STATUS)[keyof typeof SEO_ROBOTS_STATUS];

/**
 * SEO রোবটস স্ট্যাটাস লেবেল
 */
export const SEO_ROBOTS_STATUS_LABELS: Record<SEORobotsStatus, string> = {
  [SEO_ROBOTS_STATUS.ACTIVE]: 'Active',
  [SEO_ROBOTS_STATUS.INACTIVE]: 'Inactive',
  [SEO_ROBOTS_STATUS.UPDATING]: 'Updating',
  [SEO_ROBOTS_STATUS.ERROR]: 'Error',
} as const;

/**
 * SEO রোবটস স্ট্যাটাস বিবরণ
 */
export const SEO_ROBOTS_STATUS_DESCRIPTIONS: Record<SEORobotsStatus, string> = {
  [SEO_ROBOTS_STATUS.ACTIVE]: 'Robots.txt is active and being used by crawlers',
  [SEO_ROBOTS_STATUS.INACTIVE]: 'Robots.txt is inactive or disabled',
  [SEO_ROBOTS_STATUS.UPDATING]: 'Robots.txt is currently being updated',
  [SEO_ROBOTS_STATUS.ERROR]: 'Error occurred with robots.txt configuration',
} as const;

/**
 * SEO রোবটস স্ট্যাটাস আইকন
 */
export const SEO_ROBOTS_STATUS_ICONS: Record<SEORobotsStatus, string> = {
  [SEO_ROBOTS_STATUS.ACTIVE]: '✅',
  [SEO_ROBOTS_STATUS.INACTIVE]: '⏸️',
  [SEO_ROBOTS_STATUS.UPDATING]: '🔄',
  [SEO_ROBOTS_STATUS.ERROR]: '❌',
} as const;

/**
 * SEO রোবটস স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_ROBOTS_STATUS_COLORS: Record<SEORobotsStatus, string> = {
  [SEO_ROBOTS_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_ROBOTS_STATUS.INACTIVE]: '#94a3b8', // Slate-400
  [SEO_ROBOTS_STATUS.UPDATING]: '#3b82f6', // Blue-500
  [SEO_ROBOTS_STATUS.ERROR]: '#dc2626', // Red-600
} as const;

/**
 * SEO রোবটস স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_ROBOTS_STATUS_TRANSITIONS: Record<SEORobotsStatus, SEORobotsStatus[]> = {
  [SEO_ROBOTS_STATUS.ACTIVE]: [
    SEO_ROBOTS_STATUS.UPDATING,
    SEO_ROBOTS_STATUS.INACTIVE,
    SEO_ROBOTS_STATUS.ERROR,
  ],
  [SEO_ROBOTS_STATUS.INACTIVE]: [SEO_ROBOTS_STATUS.ACTIVE, SEO_ROBOTS_STATUS.UPDATING],
  [SEO_ROBOTS_STATUS.UPDATING]: [SEO_ROBOTS_STATUS.ACTIVE, SEO_ROBOTS_STATUS.ERROR],
  [SEO_ROBOTS_STATUS.ERROR]: [
    SEO_ROBOTS_STATUS.ACTIVE,
    SEO_ROBOTS_STATUS.UPDATING,
    SEO_ROBOTS_STATUS.INACTIVE,
  ],
} as const;

/**
 * SEO রোবটস স্ট্যাটাস কনফিগারেশন
 */
export interface SEORobotsStatusConfig {
  status: SEORobotsStatus;
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
 * SEO রোবটস স্ট্যাটাস মেটাডেটা
 */
export const SEO_ROBOTS_STATUS_METADATA: Record<SEORobotsStatus, SEORobotsStatusConfig> = {
  [SEO_ROBOTS_STATUS.ACTIVE]: {
    status: SEO_ROBOTS_STATUS.ACTIVE,
    label: SEO_ROBOTS_STATUS_LABELS[SEO_ROBOTS_STATUS.ACTIVE],
    description: SEO_ROBOTS_STATUS_DESCRIPTIONS[SEO_ROBOTS_STATUS.ACTIVE],
    icon: SEO_ROBOTS_STATUS_ICONS[SEO_ROBOTS_STATUS.ACTIVE],
    color: SEO_ROBOTS_STATUS_COLORS[SEO_ROBOTS_STATUS.ACTIVE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 0,
  },
  [SEO_ROBOTS_STATUS.INACTIVE]: {
    status: SEO_ROBOTS_STATUS.INACTIVE,
    label: SEO_ROBOTS_STATUS_LABELS[SEO_ROBOTS_STATUS.INACTIVE],
    description: SEO_ROBOTS_STATUS_DESCRIPTIONS[SEO_ROBOTS_STATUS.INACTIVE],
    icon: SEO_ROBOTS_STATUS_ICONS[SEO_ROBOTS_STATUS.INACTIVE],
    color: SEO_ROBOTS_STATUS_COLORS[SEO_ROBOTS_STATUS.INACTIVE],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 1,
  },
  [SEO_ROBOTS_STATUS.UPDATING]: {
    status: SEO_ROBOTS_STATUS.UPDATING,
    label: SEO_ROBOTS_STATUS_LABELS[SEO_ROBOTS_STATUS.UPDATING],
    description: SEO_ROBOTS_STATUS_DESCRIPTIONS[SEO_ROBOTS_STATUS.UPDATING],
    icon: SEO_ROBOTS_STATUS_ICONS[SEO_ROBOTS_STATUS.UPDATING],
    color: SEO_ROBOTS_STATUS_COLORS[SEO_ROBOTS_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 2,
  },
  [SEO_ROBOTS_STATUS.ERROR]: {
    status: SEO_ROBOTS_STATUS.ERROR,
    label: SEO_ROBOTS_STATUS_LABELS[SEO_ROBOTS_STATUS.ERROR],
    description: SEO_ROBOTS_STATUS_DESCRIPTIONS[SEO_ROBOTS_STATUS.ERROR],
    icon: SEO_ROBOTS_STATUS_ICONS[SEO_ROBOTS_STATUS.ERROR],
    color: SEO_ROBOTS_STATUS_COLORS[SEO_ROBOTS_STATUS.ERROR],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 3,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_ROBOTS_TERMINAL_STATUSES = [
  SEO_ROBOTS_STATUS.INACTIVE,
  SEO_ROBOTS_STATUS.ERROR,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_ROBOTS_SUCCESS_STATUSES = [SEO_ROBOTS_STATUS.ACTIVE] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_ROBOTS_ERROR_STATUSES = [SEO_ROBOTS_STATUS.ERROR] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_ROBOTS_ACTIVE_STATUSES = [
  SEO_ROBOTS_STATUS.ACTIVE,
  SEO_ROBOTS_STATUS.UPDATING,
] as const;
