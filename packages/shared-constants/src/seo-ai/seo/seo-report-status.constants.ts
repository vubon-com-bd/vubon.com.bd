/**
 * SEO রিপোর্ট স্ট্যাটাস এনাম
 */
export const SEO_REPORT_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SENT: 'sent',
  SCHEDULED: 'scheduled',
  DRAFT: 'draft',
} as const;

/**
 * SEO_REPORT_STATUS থেকে টাইপ
 */
export type SEOReportStatus = (typeof SEO_REPORT_STATUS)[keyof typeof SEO_REPORT_STATUS];

/**
 * SEO রিপোর্ট স্ট্যাটাস লেবেল
 */
export const SEO_REPORT_STATUS_LABELS: Record<SEOReportStatus, string> = {
  [SEO_REPORT_STATUS.PENDING]: 'Pending',
  [SEO_REPORT_STATUS.GENERATING]: 'Generating',
  [SEO_REPORT_STATUS.COMPLETED]: 'Completed',
  [SEO_REPORT_STATUS.FAILED]: 'Failed',
  [SEO_REPORT_STATUS.SENT]: 'Sent',
  [SEO_REPORT_STATUS.SCHEDULED]: 'Scheduled',
  [SEO_REPORT_STATUS.DRAFT]: 'Draft',
} as const;

/**
 * SEO রিপোর্ট স্ট্যাটাস বিবরণ
 */
export const SEO_REPORT_STATUS_DESCRIPTIONS: Record<SEOReportStatus, string> = {
  [SEO_REPORT_STATUS.PENDING]: 'Report is waiting to be processed',
  [SEO_REPORT_STATUS.GENERATING]: 'Report is currently being generated',
  [SEO_REPORT_STATUS.COMPLETED]: 'Report has been completed successfully',
  [SEO_REPORT_STATUS.FAILED]: 'Report generation has failed',
  [SEO_REPORT_STATUS.SENT]: 'Report has been sent to recipients',
  [SEO_REPORT_STATUS.SCHEDULED]: 'Report is scheduled for future generation',
  [SEO_REPORT_STATUS.DRAFT]: 'Report is in draft mode, not finalized',
} as const;

/**
 * SEO রিপোর্ট স্ট্যাটাস আইকন
 */
export const SEO_REPORT_STATUS_ICONS: Record<SEOReportStatus, string> = {
  [SEO_REPORT_STATUS.PENDING]: '⏳',
  [SEO_REPORT_STATUS.GENERATING]: '🔄',
  [SEO_REPORT_STATUS.COMPLETED]: '✅',
  [SEO_REPORT_STATUS.FAILED]: '❌',
  [SEO_REPORT_STATUS.SENT]: '📤',
  [SEO_REPORT_STATUS.SCHEDULED]: '📅',
  [SEO_REPORT_STATUS.DRAFT]: '📝',
} as const;

/**
 * SEO রিপোর্ট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_REPORT_STATUS_COLORS: Record<SEOReportStatus, string> = {
  [SEO_REPORT_STATUS.PENDING]: '#94a3b8', // Slate-400
  [SEO_REPORT_STATUS.GENERATING]: '#3b82f6', // Blue-500
  [SEO_REPORT_STATUS.COMPLETED]: '#22c55e', // Green-500
  [SEO_REPORT_STATUS.FAILED]: '#dc2626', // Red-600
  [SEO_REPORT_STATUS.SENT]: '#8b5cf6', // Violet-500
  [SEO_REPORT_STATUS.SCHEDULED]: '#f59e0b', // Amber-500
  [SEO_REPORT_STATUS.DRAFT]: '#94a3b8', // Slate-400
} as const;

/**
 * SEO রিপোর্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_REPORT_STATUS_TRANSITIONS: Record<SEOReportStatus, SEOReportStatus[]> = {
  [SEO_REPORT_STATUS.DRAFT]: [SEO_REPORT_STATUS.PENDING, SEO_REPORT_STATUS.SCHEDULED],
  [SEO_REPORT_STATUS.SCHEDULED]: [SEO_REPORT_STATUS.PENDING, SEO_REPORT_STATUS.DRAFT],
  [SEO_REPORT_STATUS.PENDING]: [SEO_REPORT_STATUS.GENERATING, SEO_REPORT_STATUS.FAILED],
  [SEO_REPORT_STATUS.GENERATING]: [SEO_REPORT_STATUS.COMPLETED, SEO_REPORT_STATUS.FAILED],
  [SEO_REPORT_STATUS.COMPLETED]: [SEO_REPORT_STATUS.SENT, SEO_REPORT_STATUS.DRAFT],
  [SEO_REPORT_STATUS.SENT]: [SEO_REPORT_STATUS.DRAFT],
  [SEO_REPORT_STATUS.FAILED]: [SEO_REPORT_STATUS.PENDING, SEO_REPORT_STATUS.DRAFT],
} as const;

/**
 * SEO রিপোর্ট স্ট্যাটাস কনফিগারেশন
 */
export interface SEOReportStatusConfig {
  status: SEOReportStatus;
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
 * SEO রিপোর্ট স্ট্যাটাস মেটাডেটা
 */
export const SEO_REPORT_STATUS_METADATA: Record<SEOReportStatus, SEOReportStatusConfig> = {
  [SEO_REPORT_STATUS.DRAFT]: {
    status: SEO_REPORT_STATUS.DRAFT,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.DRAFT],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.DRAFT],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.DRAFT],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.DRAFT],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 0,
  },
  [SEO_REPORT_STATUS.SCHEDULED]: {
    status: SEO_REPORT_STATUS.SCHEDULED,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.SCHEDULED],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.SCHEDULED],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.SCHEDULED],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.SCHEDULED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 1,
  },
  [SEO_REPORT_STATUS.PENDING]: {
    status: SEO_REPORT_STATUS.PENDING,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.PENDING],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.PENDING],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.PENDING],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.PENDING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 2,
  },
  [SEO_REPORT_STATUS.GENERATING]: {
    status: SEO_REPORT_STATUS.GENERATING,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.GENERATING],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.GENERATING],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.GENERATING],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.GENERATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 3,
  },
  [SEO_REPORT_STATUS.COMPLETED]: {
    status: SEO_REPORT_STATUS.COMPLETED,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.COMPLETED],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.COMPLETED],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.COMPLETED],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.COMPLETED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 4,
  },
  [SEO_REPORT_STATUS.SENT]: {
    status: SEO_REPORT_STATUS.SENT,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.SENT],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.SENT],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.SENT],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.SENT],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 5,
  },
  [SEO_REPORT_STATUS.FAILED]: {
    status: SEO_REPORT_STATUS.FAILED,
    label: SEO_REPORT_STATUS_LABELS[SEO_REPORT_STATUS.FAILED],
    description: SEO_REPORT_STATUS_DESCRIPTIONS[SEO_REPORT_STATUS.FAILED],
    icon: SEO_REPORT_STATUS_ICONS[SEO_REPORT_STATUS.FAILED],
    color: SEO_REPORT_STATUS_COLORS[SEO_REPORT_STATUS.FAILED],
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
export const SEO_REPORT_TERMINAL_STATUSES = [
  SEO_REPORT_STATUS.SENT,
  SEO_REPORT_STATUS.FAILED,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_REPORT_SUCCESS_STATUSES = [
  SEO_REPORT_STATUS.COMPLETED,
  SEO_REPORT_STATUS.SENT,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_REPORT_ERROR_STATUSES = [SEO_REPORT_STATUS.FAILED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_REPORT_ACTIVE_STATUSES = [
  SEO_REPORT_STATUS.PENDING,
  SEO_REPORT_STATUS.GENERATING,
  SEO_REPORT_STATUS.COMPLETED,
] as const;
