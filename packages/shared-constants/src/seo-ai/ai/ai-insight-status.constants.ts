/**
 * AI ইনসাইট স্ট্যাটাস এনাম
 */
export const AI_INSIGHT_STATUS = {
  DISCOVERED: 'discovered',
  ANALYZING: 'analyzing',
  VALIDATED: 'validated',
  DISMISSED: 'dismissed',
  ACTIONED: 'actioned',
  ARCHIVED: 'archived',
  PENDING: 'pending',
} as const;

/**
 * AI_INSIGHT_STATUS থেকে টাইপ
 */
export type AIInsightStatusType = (typeof AI_INSIGHT_STATUS)[keyof typeof AI_INSIGHT_STATUS];

/**
 * ইনসাইট স্ট্যাটাস লেবেল
 */
export const AI_INSIGHT_STATUS_LABELS: Record<AIInsightStatusType, string> = {
  [AI_INSIGHT_STATUS.DISCOVERED]: 'Discovered',
  [AI_INSIGHT_STATUS.ANALYZING]: 'Analyzing',
  [AI_INSIGHT_STATUS.VALIDATED]: 'Validated',
  [AI_INSIGHT_STATUS.DISMISSED]: 'Dismissed',
  [AI_INSIGHT_STATUS.ACTIONED]: 'Actioned',
  [AI_INSIGHT_STATUS.ARCHIVED]: 'Archived',
  [AI_INSIGHT_STATUS.PENDING]: 'Pending',
} as const;

/**
 * ইনসাইট স্ট্যাটাস বিবরণ
 */
export const AI_INSIGHT_STATUS_DESCRIPTIONS: Record<AIInsightStatusType, string> = {
  [AI_INSIGHT_STATUS.DISCOVERED]: 'Insight has been discovered and is ready for analysis',
  [AI_INSIGHT_STATUS.ANALYZING]: 'Insight is being analyzed and evaluated',
  [AI_INSIGHT_STATUS.VALIDATED]: 'Insight has been validated and confirmed',
  [AI_INSIGHT_STATUS.DISMISSED]: 'Insight has been dismissed as not relevant',
  [AI_INSIGHT_STATUS.ACTIONED]: 'Insight has been acted upon',
  [AI_INSIGHT_STATUS.ARCHIVED]: 'Insight has been archived for historical reference',
  [AI_INSIGHT_STATUS.PENDING]: 'Insight is pending review or decision',
} as const;

/**
 * ইনসাইট স্ট্যাটাস আইকন
 */
export const AI_INSIGHT_STATUS_ICONS: Record<AIInsightStatusType, string> = {
  [AI_INSIGHT_STATUS.DISCOVERED]: '💎',
  [AI_INSIGHT_STATUS.ANALYZING]: '🔬',
  [AI_INSIGHT_STATUS.VALIDATED]: '✅',
  [AI_INSIGHT_STATUS.DISMISSED]: '👎',
  [AI_INSIGHT_STATUS.ACTIONED]: '🚀',
  [AI_INSIGHT_STATUS.ARCHIVED]: '📦',
  [AI_INSIGHT_STATUS.PENDING]: '⏳',
} as const;

/**
 * ইনসাইট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_INSIGHT_STATUS_COLORS: Record<AIInsightStatusType, string> = {
  [AI_INSIGHT_STATUS.DISCOVERED]: '#8b5cf6', // Violet-500
  [AI_INSIGHT_STATUS.ANALYZING]: '#3b82f6', // Blue-500
  [AI_INSIGHT_STATUS.VALIDATED]: '#22c55e', // Green-500
  [AI_INSIGHT_STATUS.DISMISSED]: '#94a3b8', // Slate-400
  [AI_INSIGHT_STATUS.ACTIONED]: '#f59e0b', // Amber-500
  [AI_INSIGHT_STATUS.ARCHIVED]: '#64748b', // Slate-500
  [AI_INSIGHT_STATUS.PENDING]: '#f97316', // Orange-500
} as const;

/**
 * ইনসাইট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_INSIGHT_STATUS_TRANSITIONS: Record<AIInsightStatusType, AIInsightStatusType[]> = {
  [AI_INSIGHT_STATUS.DISCOVERED]: [
    AI_INSIGHT_STATUS.ANALYZING,
    AI_INSIGHT_STATUS.DISMISSED,
    AI_INSIGHT_STATUS.ARCHIVED,
  ],
  [AI_INSIGHT_STATUS.ANALYZING]: [
    AI_INSIGHT_STATUS.VALIDATED,
    AI_INSIGHT_STATUS.DISMISSED,
    AI_INSIGHT_STATUS.ARCHIVED,
  ],
  [AI_INSIGHT_STATUS.VALIDATED]: [
    AI_INSIGHT_STATUS.PENDING,
    AI_INSIGHT_STATUS.ACTIONED,
    AI_INSIGHT_STATUS.ARCHIVED,
    AI_INSIGHT_STATUS.DISMISSED,
  ],
  [AI_INSIGHT_STATUS.DISMISSED]: [AI_INSIGHT_STATUS.ARCHIVED, AI_INSIGHT_STATUS.ACTIONED],
  [AI_INSIGHT_STATUS.ACTIONED]: [AI_INSIGHT_STATUS.ARCHIVED, AI_INSIGHT_STATUS.VALIDATED],
  [AI_INSIGHT_STATUS.ARCHIVED]: [AI_INSIGHT_STATUS.ACTIONED],
  [AI_INSIGHT_STATUS.PENDING]: [
    AI_INSIGHT_STATUS.VALIDATED,
    AI_INSIGHT_STATUS.ACTIONED,
    AI_INSIGHT_STATUS.DISMISSED,
    AI_INSIGHT_STATUS.ARCHIVED,
  ],
} as const;

/**
 * ইনসাইট স্ট্যাটাস কনফিগারেশন
 */
export interface AIInsightStatusConfig {
  status: AIInsightStatusType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isActive: boolean;
  isActionable: boolean;
  isReviewable: boolean;
  order: number;
}

/**
 * ইনসাইট স্ট্যাটাস মেটাডেটা
 */
export const AI_INSIGHT_STATUS_METADATA: Record<AIInsightStatusType, AIInsightStatusConfig> = {
  [AI_INSIGHT_STATUS.DISCOVERED]: {
    status: AI_INSIGHT_STATUS.DISCOVERED,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.DISCOVERED],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.DISCOVERED],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.DISCOVERED],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.DISCOVERED],
    isTerminal: false,
    isActive: true,
    isActionable: false,
    isReviewable: false,
    order: 0,
  },
  [AI_INSIGHT_STATUS.ANALYZING]: {
    status: AI_INSIGHT_STATUS.ANALYZING,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.ANALYZING],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.ANALYZING],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.ANALYZING],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.ANALYZING],
    isTerminal: false,
    isActive: true,
    isActionable: false,
    isReviewable: false,
    order: 1,
  },
  [AI_INSIGHT_STATUS.VALIDATED]: {
    status: AI_INSIGHT_STATUS.VALIDATED,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.VALIDATED],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.VALIDATED],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.VALIDATED],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.VALIDATED],
    isTerminal: false,
    isActive: true,
    isActionable: true,
    isReviewable: true,
    order: 2,
  },
  [AI_INSIGHT_STATUS.DISMISSED]: {
    status: AI_INSIGHT_STATUS.DISMISSED,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.DISMISSED],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.DISMISSED],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.DISMISSED],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.DISMISSED],
    isTerminal: true,
    isActive: false,
    isActionable: false,
    isReviewable: false,
    order: 3,
  },
  [AI_INSIGHT_STATUS.ACTIONED]: {
    status: AI_INSIGHT_STATUS.ACTIONED,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.ACTIONED],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.ACTIONED],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.ACTIONED],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.ACTIONED],
    isTerminal: false,
    isActive: true,
    isActionable: false,
    isReviewable: false,
    order: 4,
  },
  [AI_INSIGHT_STATUS.ARCHIVED]: {
    status: AI_INSIGHT_STATUS.ARCHIVED,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.ARCHIVED],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.ARCHIVED],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.ARCHIVED],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.ARCHIVED],
    isTerminal: true,
    isActive: false,
    isActionable: false,
    isReviewable: false,
    order: 5,
  },
  [AI_INSIGHT_STATUS.PENDING]: {
    status: AI_INSIGHT_STATUS.PENDING,
    label: AI_INSIGHT_STATUS_LABELS[AI_INSIGHT_STATUS.PENDING],
    description: AI_INSIGHT_STATUS_DESCRIPTIONS[AI_INSIGHT_STATUS.PENDING],
    icon: AI_INSIGHT_STATUS_ICONS[AI_INSIGHT_STATUS.PENDING],
    color: AI_INSIGHT_STATUS_COLORS[AI_INSIGHT_STATUS.PENDING],
    isTerminal: false,
    isActive: false,
    isActionable: false,
    isReviewable: true,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_INSIGHT_TERMINAL_STATUSES = [
  AI_INSIGHT_STATUS.DISMISSED,
  AI_INSIGHT_STATUS.ARCHIVED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_INSIGHT_ACTIVE_STATUSES = [
  AI_INSIGHT_STATUS.DISCOVERED,
  AI_INSIGHT_STATUS.ANALYZING,
  AI_INSIGHT_STATUS.VALIDATED,
  AI_INSIGHT_STATUS.ACTIONED,
] as const;

/**
 * রিভিউ স্ট্যাটাসের তালিকা
 */
export const AI_INSIGHT_REVIEW_STATUSES = [
  AI_INSIGHT_STATUS.VALIDATED,
  AI_INSIGHT_STATUS.PENDING,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_INSIGHT_INACTIVE_STATUSES = [
  AI_INSIGHT_STATUS.DISMISSED,
  AI_INSIGHT_STATUS.ARCHIVED,
  AI_INSIGHT_STATUS.PENDING,
] as const;

/**
 * ইনসাইট স্ট্যাটাস গ্রুপ
 */
export const AI_INSIGHT_STATUS_GROUPS = {
  ACTIVE: [
    AI_INSIGHT_STATUS.DISCOVERED,
    AI_INSIGHT_STATUS.ANALYZING,
    AI_INSIGHT_STATUS.VALIDATED,
    AI_INSIGHT_STATUS.ACTIONED,
  ] as const,
  REVIEW: [AI_INSIGHT_STATUS.PENDING] as const,
  TERMINAL: [AI_INSIGHT_STATUS.DISMISSED, AI_INSIGHT_STATUS.ARCHIVED] as const,
} as const;

/**
 * ইনসাইট স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_INSIGHT_STATUS_GROUP_LABELS = {
  ACTIVE: 'Active',
  REVIEW: 'Review',
  TERMINAL: 'Terminal',
} as const;
