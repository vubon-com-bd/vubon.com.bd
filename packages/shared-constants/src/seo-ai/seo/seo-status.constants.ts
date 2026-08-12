/**
 * SEO স্ট্যাটাস এনাম
 */
export const SEO_STATUS = {
  PLANNED: 'planned',
  IN_PROGRESS: 'in-progress',
  IMPLEMENTED: 'implemented',
  MONITORING: 'monitoring',
  OPTIMIZED: 'optimized',
  ISSUE_DETECTED: 'issue-detected',
  FAILED: 'failed',
} as const;

/**
 * SEO_STATUS থেকে টাইপ
 */
export type SEOStatus = (typeof SEO_STATUS)[keyof typeof SEO_STATUS];

/**
 * SEO স্ট্যাটাস লেবেল
 */
export const SEO_STATUS_LABELS: Record<SEOStatus, string> = {
  [SEO_STATUS.PLANNED]: 'Planned',
  [SEO_STATUS.IN_PROGRESS]: 'In Progress',
  [SEO_STATUS.IMPLEMENTED]: 'Implemented',
  [SEO_STATUS.MONITORING]: 'Monitoring',
  [SEO_STATUS.OPTIMIZED]: 'Optimized',
  [SEO_STATUS.ISSUE_DETECTED]: 'Issue Detected',
  [SEO_STATUS.FAILED]: 'Failed',
} as const;

/**
 * SEO স্ট্যাটাস বিবরণ
 */
export const SEO_STATUS_DESCRIPTIONS: Record<SEOStatus, string> = {
  [SEO_STATUS.PLANNED]: 'SEO strategy has been planned but not yet executed',
  [SEO_STATUS.IN_PROGRESS]: 'SEO implementation is currently in progress',
  [SEO_STATUS.IMPLEMENTED]: 'SEO changes have been implemented and are active',
  [SEO_STATUS.MONITORING]: 'SEO performance is being monitored and analyzed',
  [SEO_STATUS.OPTIMIZED]: 'SEO has been fully optimized and performing well',
  [SEO_STATUS.ISSUE_DETECTED]: 'Issues have been detected in SEO implementation',
  [SEO_STATUS.FAILED]: 'SEO implementation has failed or not meeting expectations',
} as const;

/**
 * SEO স্ট্যাটাস আইকন
 */
export const SEO_STATUS_ICONS: Record<SEOStatus, string> = {
  [SEO_STATUS.PLANNED]: '📋',
  [SEO_STATUS.IN_PROGRESS]: '🚧',
  [SEO_STATUS.IMPLEMENTED]: '✅',
  [SEO_STATUS.MONITORING]: '📊',
  [SEO_STATUS.OPTIMIZED]: '⭐',
  [SEO_STATUS.ISSUE_DETECTED]: '⚠️',
  [SEO_STATUS.FAILED]: '❌',
} as const;

/**
 * SEO স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_STATUS_COLORS: Record<SEOStatus, string> = {
  [SEO_STATUS.PLANNED]: '#94a3b8', // Slate-400
  [SEO_STATUS.IN_PROGRESS]: '#3b82f6', // Blue-500
  [SEO_STATUS.IMPLEMENTED]: '#22c55e', // Green-500
  [SEO_STATUS.MONITORING]: '#8b5cf6', // Violet-500
  [SEO_STATUS.OPTIMIZED]: '#22d3ee', // Cyan-400
  [SEO_STATUS.ISSUE_DETECTED]: '#f59e0b', // Amber-500
  [SEO_STATUS.FAILED]: '#dc2626', // Red-600
} as const;

/**
 * SEO স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_STATUS_TRANSITIONS: Record<SEOStatus, SEOStatus[]> = {
  [SEO_STATUS.PLANNED]: [SEO_STATUS.IN_PROGRESS, SEO_STATUS.FAILED],
  [SEO_STATUS.IN_PROGRESS]: [SEO_STATUS.IMPLEMENTED, SEO_STATUS.ISSUE_DETECTED, SEO_STATUS.FAILED],
  [SEO_STATUS.IMPLEMENTED]: [
    SEO_STATUS.MONITORING,
    SEO_STATUS.ISSUE_DETECTED,
    SEO_STATUS.OPTIMIZED,
  ],
  [SEO_STATUS.MONITORING]: [SEO_STATUS.OPTIMIZED, SEO_STATUS.ISSUE_DETECTED, SEO_STATUS.FAILED],
  [SEO_STATUS.OPTIMIZED]: [SEO_STATUS.MONITORING, SEO_STATUS.ISSUE_DETECTED],
  [SEO_STATUS.ISSUE_DETECTED]: [SEO_STATUS.IN_PROGRESS, SEO_STATUS.FAILED],
  [SEO_STATUS.FAILED]: [SEO_STATUS.PLANNED, SEO_STATUS.IN_PROGRESS],
} as const;

/**
 * SEO স্ট্যাটাস কনফিগারেশন
 */
export interface SEOStatusConfig {
  status: SEOStatus;
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
 * SEO স্ট্যাটাস মেটাডেটা
 */
export const SEO_STATUS_METADATA: Record<SEOStatus, SEOStatusConfig> = {
  [SEO_STATUS.PLANNED]: {
    status: SEO_STATUS.PLANNED,
    label: SEO_STATUS_LABELS[SEO_STATUS.PLANNED],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.PLANNED],
    icon: SEO_STATUS_ICONS[SEO_STATUS.PLANNED],
    color: SEO_STATUS_COLORS[SEO_STATUS.PLANNED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 0,
  },
  [SEO_STATUS.IN_PROGRESS]: {
    status: SEO_STATUS.IN_PROGRESS,
    label: SEO_STATUS_LABELS[SEO_STATUS.IN_PROGRESS],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.IN_PROGRESS],
    icon: SEO_STATUS_ICONS[SEO_STATUS.IN_PROGRESS],
    color: SEO_STATUS_COLORS[SEO_STATUS.IN_PROGRESS],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_STATUS.IMPLEMENTED]: {
    status: SEO_STATUS.IMPLEMENTED,
    label: SEO_STATUS_LABELS[SEO_STATUS.IMPLEMENTED],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.IMPLEMENTED],
    icon: SEO_STATUS_ICONS[SEO_STATUS.IMPLEMENTED],
    color: SEO_STATUS_COLORS[SEO_STATUS.IMPLEMENTED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_STATUS.MONITORING]: {
    status: SEO_STATUS.MONITORING,
    label: SEO_STATUS_LABELS[SEO_STATUS.MONITORING],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.MONITORING],
    icon: SEO_STATUS_ICONS[SEO_STATUS.MONITORING],
    color: SEO_STATUS_COLORS[SEO_STATUS.MONITORING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 3,
  },
  [SEO_STATUS.OPTIMIZED]: {
    status: SEO_STATUS.OPTIMIZED,
    label: SEO_STATUS_LABELS[SEO_STATUS.OPTIMIZED],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.OPTIMIZED],
    icon: SEO_STATUS_ICONS[SEO_STATUS.OPTIMIZED],
    color: SEO_STATUS_COLORS[SEO_STATUS.OPTIMIZED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 4,
  },
  [SEO_STATUS.ISSUE_DETECTED]: {
    status: SEO_STATUS.ISSUE_DETECTED,
    label: SEO_STATUS_LABELS[SEO_STATUS.ISSUE_DETECTED],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.ISSUE_DETECTED],
    icon: SEO_STATUS_ICONS[SEO_STATUS.ISSUE_DETECTED],
    color: SEO_STATUS_COLORS[SEO_STATUS.ISSUE_DETECTED],
    isTerminal: false,
    isError: true,
    isSuccess: false,
    isActive: true,
    order: 5,
  },
  [SEO_STATUS.FAILED]: {
    status: SEO_STATUS.FAILED,
    label: SEO_STATUS_LABELS[SEO_STATUS.FAILED],
    description: SEO_STATUS_DESCRIPTIONS[SEO_STATUS.FAILED],
    icon: SEO_STATUS_ICONS[SEO_STATUS.FAILED],
    color: SEO_STATUS_COLORS[SEO_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_TERMINAL_STATUSES = [SEO_STATUS.OPTIMIZED, SEO_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_SUCCESS_STATUSES = [SEO_STATUS.IMPLEMENTED, SEO_STATUS.OPTIMIZED] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_ERROR_STATUSES = [SEO_STATUS.ISSUE_DETECTED, SEO_STATUS.FAILED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_ACTIVE_STATUSES = [
  SEO_STATUS.IN_PROGRESS,
  SEO_STATUS.IMPLEMENTED,
  SEO_STATUS.MONITORING,
  SEO_STATUS.ISSUE_DETECTED,
] as const;
