/**
 * SEO অডিট স্ট্যাটাস এনাম
 */
export const SEO_AUDIT_STATUS = {
  SCHEDULED: 'scheduled',
  INITIATED: 'initiated',
  CRAWLING: 'crawling',
  ANALYZING: 'analyzing',
  GENERATING_REPORT: 'generating-report',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PARTIAL: 'partial',
} as const;

/**
 * SEO_AUDIT_STATUS থেকে টাইপ
 */
export type SEOAuditStatus = (typeof SEO_AUDIT_STATUS)[keyof typeof SEO_AUDIT_STATUS];

/**
 * SEO অডিট স্ট্যাটাস লেবেল
 */
export const SEO_AUDIT_STATUS_LABELS: Record<SEOAuditStatus, string> = {
  [SEO_AUDIT_STATUS.SCHEDULED]: 'Scheduled',
  [SEO_AUDIT_STATUS.INITIATED]: 'Initiated',
  [SEO_AUDIT_STATUS.CRAWLING]: 'Crawling',
  [SEO_AUDIT_STATUS.ANALYZING]: 'Analyzing',
  [SEO_AUDIT_STATUS.GENERATING_REPORT]: 'Generating Report',
  [SEO_AUDIT_STATUS.COMPLETED]: 'Completed',
  [SEO_AUDIT_STATUS.FAILED]: 'Failed',
  [SEO_AUDIT_STATUS.PARTIAL]: 'Partial',
} as const;

/**
 * SEO অডিট স্ট্যাটাস বিবরণ
 */
export const SEO_AUDIT_STATUS_DESCRIPTIONS: Record<SEOAuditStatus, string> = {
  [SEO_AUDIT_STATUS.SCHEDULED]: 'Audit is scheduled to run at a specific time',
  [SEO_AUDIT_STATUS.INITIATED]: 'Audit has been initiated and is starting',
  [SEO_AUDIT_STATUS.CRAWLING]: 'Audit is crawling pages and collecting data',
  [SEO_AUDIT_STATUS.ANALYZING]: 'Audit is analyzing collected data',
  [SEO_AUDIT_STATUS.GENERATING_REPORT]: 'Audit report is being generated',
  [SEO_AUDIT_STATUS.COMPLETED]: 'Audit has been completed successfully',
  [SEO_AUDIT_STATUS.FAILED]: 'Audit has failed due to an error',
  [SEO_AUDIT_STATUS.PARTIAL]: 'Audit completed partially with some issues',
} as const;

/**
 * SEO অডিট স্ট্যাটাস আইকন
 */
export const SEO_AUDIT_STATUS_ICONS: Record<SEOAuditStatus, string> = {
  [SEO_AUDIT_STATUS.SCHEDULED]: '📅',
  [SEO_AUDIT_STATUS.INITIATED]: '🚀',
  [SEO_AUDIT_STATUS.CRAWLING]: '🕷️',
  [SEO_AUDIT_STATUS.ANALYZING]: '🔬',
  [SEO_AUDIT_STATUS.GENERATING_REPORT]: '📊',
  [SEO_AUDIT_STATUS.COMPLETED]: '✅',
  [SEO_AUDIT_STATUS.FAILED]: '❌',
  [SEO_AUDIT_STATUS.PARTIAL]: '⚠️',
} as const;

/**
 * SEO অডিট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_AUDIT_STATUS_COLORS: Record<SEOAuditStatus, string> = {
  [SEO_AUDIT_STATUS.SCHEDULED]: '#94a3b8', // Slate-400
  [SEO_AUDIT_STATUS.INITIATED]: '#3b82f6', // Blue-500
  [SEO_AUDIT_STATUS.CRAWLING]: '#8b5cf6', // Violet-500
  [SEO_AUDIT_STATUS.ANALYZING]: '#f59e0b', // Amber-500
  [SEO_AUDIT_STATUS.GENERATING_REPORT]: '#06b6d4', // Cyan-500
  [SEO_AUDIT_STATUS.COMPLETED]: '#22c55e', // Green-500
  [SEO_AUDIT_STATUS.FAILED]: '#dc2626', // Red-600
  [SEO_AUDIT_STATUS.PARTIAL]: '#f97316', // Orange-500
} as const;

/**
 * SEO অডিট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_AUDIT_STATUS_TRANSITIONS: Record<SEOAuditStatus, SEOAuditStatus[]> = {
  [SEO_AUDIT_STATUS.SCHEDULED]: [SEO_AUDIT_STATUS.INITIATED, SEO_AUDIT_STATUS.FAILED],
  [SEO_AUDIT_STATUS.INITIATED]: [SEO_AUDIT_STATUS.CRAWLING, SEO_AUDIT_STATUS.FAILED],
  [SEO_AUDIT_STATUS.CRAWLING]: [
    SEO_AUDIT_STATUS.ANALYZING,
    SEO_AUDIT_STATUS.FAILED,
    SEO_AUDIT_STATUS.PARTIAL,
  ],
  [SEO_AUDIT_STATUS.ANALYZING]: [
    SEO_AUDIT_STATUS.GENERATING_REPORT,
    SEO_AUDIT_STATUS.FAILED,
    SEO_AUDIT_STATUS.PARTIAL,
  ],
  [SEO_AUDIT_STATUS.GENERATING_REPORT]: [
    SEO_AUDIT_STATUS.COMPLETED,
    SEO_AUDIT_STATUS.FAILED,
    SEO_AUDIT_STATUS.PARTIAL,
  ],
  [SEO_AUDIT_STATUS.PARTIAL]: [
    SEO_AUDIT_STATUS.COMPLETED,
    SEO_AUDIT_STATUS.FAILED,
    SEO_AUDIT_STATUS.ANALYZING,
  ],
  [SEO_AUDIT_STATUS.COMPLETED]: [],
  [SEO_AUDIT_STATUS.FAILED]: [SEO_AUDIT_STATUS.SCHEDULED, SEO_AUDIT_STATUS.INITIATED],
} as const;

/**
 * SEO অডিট স্ট্যাটাস কনফিগারেশন
 */
export interface SEOAuditStatusConfig {
  status: SEOAuditStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isError: boolean;
  isSuccess: boolean;
  isActive: boolean;
  progressValue: number;
  order: number;
}

/**
 * SEO অডিট স্ট্যাটাস মেটাডেটা
 */
export const SEO_AUDIT_STATUS_METADATA: Record<SEOAuditStatus, SEOAuditStatusConfig> = {
  [SEO_AUDIT_STATUS.SCHEDULED]: {
    status: SEO_AUDIT_STATUS.SCHEDULED,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.SCHEDULED],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.SCHEDULED],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.SCHEDULED],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.SCHEDULED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    progressValue: 0,
    order: 0,
  },
  [SEO_AUDIT_STATUS.INITIATED]: {
    status: SEO_AUDIT_STATUS.INITIATED,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.INITIATED],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.INITIATED],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.INITIATED],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.INITIATED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    progressValue: 10,
    order: 1,
  },
  [SEO_AUDIT_STATUS.CRAWLING]: {
    status: SEO_AUDIT_STATUS.CRAWLING,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.CRAWLING],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.CRAWLING],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.CRAWLING],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.CRAWLING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    progressValue: 30,
    order: 2,
  },
  [SEO_AUDIT_STATUS.ANALYZING]: {
    status: SEO_AUDIT_STATUS.ANALYZING,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.ANALYZING],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.ANALYZING],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.ANALYZING],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.ANALYZING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    progressValue: 50,
    order: 3,
  },
  [SEO_AUDIT_STATUS.GENERATING_REPORT]: {
    status: SEO_AUDIT_STATUS.GENERATING_REPORT,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.GENERATING_REPORT],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.GENERATING_REPORT],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.GENERATING_REPORT],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.GENERATING_REPORT],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    progressValue: 80,
    order: 4,
  },
  [SEO_AUDIT_STATUS.COMPLETED]: {
    status: SEO_AUDIT_STATUS.COMPLETED,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.COMPLETED],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.COMPLETED],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.COMPLETED],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.COMPLETED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    progressValue: 100,
    order: 5,
  },
  [SEO_AUDIT_STATUS.FAILED]: {
    status: SEO_AUDIT_STATUS.FAILED,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.FAILED],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.FAILED],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.FAILED],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    progressValue: 0,
    order: 6,
  },
  [SEO_AUDIT_STATUS.PARTIAL]: {
    status: SEO_AUDIT_STATUS.PARTIAL,
    label: SEO_AUDIT_STATUS_LABELS[SEO_AUDIT_STATUS.PARTIAL],
    description: SEO_AUDIT_STATUS_DESCRIPTIONS[SEO_AUDIT_STATUS.PARTIAL],
    icon: SEO_AUDIT_STATUS_ICONS[SEO_AUDIT_STATUS.PARTIAL],
    color: SEO_AUDIT_STATUS_COLORS[SEO_AUDIT_STATUS.PARTIAL],
    isTerminal: false,
    isError: true,
    isSuccess: false,
    isActive: true,
    progressValue: 50,
    order: 7,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_AUDIT_TERMINAL_STATUSES = [
  SEO_AUDIT_STATUS.COMPLETED,
  SEO_AUDIT_STATUS.FAILED,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_AUDIT_SUCCESS_STATUSES = [SEO_AUDIT_STATUS.COMPLETED] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_AUDIT_ERROR_STATUSES = [
  SEO_AUDIT_STATUS.FAILED,
  SEO_AUDIT_STATUS.PARTIAL,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_AUDIT_ACTIVE_STATUSES = [
  SEO_AUDIT_STATUS.INITIATED,
  SEO_AUDIT_STATUS.CRAWLING,
  SEO_AUDIT_STATUS.ANALYZING,
  SEO_AUDIT_STATUS.GENERATING_REPORT,
  SEO_AUDIT_STATUS.PARTIAL,
] as const;
