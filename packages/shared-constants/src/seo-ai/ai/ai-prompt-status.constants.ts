/**
 * AI প্রম্পট স্ট্যাটাস এনাম
 */
export const AI_PROMPT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
  PENDING_REVIEW: 'pending-review',
  REJECTED: 'rejected',
  APPROVED: 'approved',
} as const;

/**
 * AI_PROMPT_STATUS থেকে টাইপ
 */
export type AIPromptStatusType = (typeof AI_PROMPT_STATUS)[keyof typeof AI_PROMPT_STATUS];

/**
 * প্রম্পট স্ট্যাটাস লেবেল
 */
export const AI_PROMPT_STATUS_LABELS: Record<AIPromptStatusType, string> = {
  [AI_PROMPT_STATUS.DRAFT]: 'Draft',
  [AI_PROMPT_STATUS.ACTIVE]: 'Active',
  [AI_PROMPT_STATUS.ARCHIVED]: 'Archived',
  [AI_PROMPT_STATUS.DEPRECATED]: 'Deprecated',
  [AI_PROMPT_STATUS.PENDING_REVIEW]: 'Pending Review',
  [AI_PROMPT_STATUS.REJECTED]: 'Rejected',
  [AI_PROMPT_STATUS.APPROVED]: 'Approved',
} as const;

/**
 * প্রম্পট স্ট্যাটাস বিবরণ
 */
export const AI_PROMPT_STATUS_DESCRIPTIONS: Record<AIPromptStatusType, string> = {
  [AI_PROMPT_STATUS.DRAFT]: 'Prompt is in draft state and not yet ready for use',
  [AI_PROMPT_STATUS.ACTIVE]: 'Prompt is active and available for use',
  [AI_PROMPT_STATUS.ARCHIVED]: 'Prompt has been archived and is no longer actively used',
  [AI_PROMPT_STATUS.DEPRECATED]: 'Prompt is deprecated and should be replaced',
  [AI_PROMPT_STATUS.PENDING_REVIEW]: 'Prompt is pending review and approval',
  [AI_PROMPT_STATUS.REJECTED]: 'Prompt has been rejected during review',
  [AI_PROMPT_STATUS.APPROVED]: 'Prompt has been approved for use',
} as const;

/**
 * প্রম্পট স্ট্যাটাস আইকন
 */
export const AI_PROMPT_STATUS_ICONS: Record<AIPromptStatusType, string> = {
  [AI_PROMPT_STATUS.DRAFT]: '📝',
  [AI_PROMPT_STATUS.ACTIVE]: '✅',
  [AI_PROMPT_STATUS.ARCHIVED]: '📦',
  [AI_PROMPT_STATUS.DEPRECATED]: '⚠️',
  [AI_PROMPT_STATUS.PENDING_REVIEW]: '⏳',
  [AI_PROMPT_STATUS.REJECTED]: '❌',
  [AI_PROMPT_STATUS.APPROVED]: '👍',
} as const;

/**
 * প্রম্পট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_PROMPT_STATUS_COLORS: Record<AIPromptStatusType, string> = {
  [AI_PROMPT_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [AI_PROMPT_STATUS.ACTIVE]: '#22c55e', // Green-500
  [AI_PROMPT_STATUS.ARCHIVED]: '#64748b', // Slate-500
  [AI_PROMPT_STATUS.DEPRECATED]: '#f59e0b', // Amber-500
  [AI_PROMPT_STATUS.PENDING_REVIEW]: '#3b82f6', // Blue-500
  [AI_PROMPT_STATUS.REJECTED]: '#dc2626', // Red-600
  [AI_PROMPT_STATUS.APPROVED]: '#8b5cf6', // Violet-500
} as const;

/**
 * প্রম্পট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_PROMPT_STATUS_TRANSITIONS: Record<AIPromptStatusType, AIPromptStatusType[]> = {
  [AI_PROMPT_STATUS.DRAFT]: [AI_PROMPT_STATUS.PENDING_REVIEW, AI_PROMPT_STATUS.ARCHIVED],
  [AI_PROMPT_STATUS.PENDING_REVIEW]: [
    AI_PROMPT_STATUS.APPROVED,
    AI_PROMPT_STATUS.REJECTED,
    AI_PROMPT_STATUS.DRAFT,
  ],
  [AI_PROMPT_STATUS.APPROVED]: [AI_PROMPT_STATUS.ACTIVE, AI_PROMPT_STATUS.ARCHIVED],
  [AI_PROMPT_STATUS.ACTIVE]: [AI_PROMPT_STATUS.DEPRECATED, AI_PROMPT_STATUS.ARCHIVED],
  [AI_PROMPT_STATUS.DEPRECATED]: [AI_PROMPT_STATUS.ARCHIVED, AI_PROMPT_STATUS.ACTIVE],
  [AI_PROMPT_STATUS.REJECTED]: [AI_PROMPT_STATUS.DRAFT, AI_PROMPT_STATUS.ARCHIVED],
  [AI_PROMPT_STATUS.ARCHIVED]: [AI_PROMPT_STATUS.DRAFT, AI_PROMPT_STATUS.ACTIVE],
} as const;

/**
 * প্রম্পট স্ট্যাটাস কনফিগারেশন
 */
export interface AIPromptStatusConfig {
  status: AIPromptStatusType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isActive: boolean;
  isEditable: boolean;
  isReviewable: boolean;
  order: number;
}

/**
 * প্রম্পট স্ট্যাটাস মেটাডেটা
 */
export const AI_PROMPT_STATUS_METADATA: Record<AIPromptStatusType, AIPromptStatusConfig> = {
  [AI_PROMPT_STATUS.DRAFT]: {
    status: AI_PROMPT_STATUS.DRAFT,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.DRAFT],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.DRAFT],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.DRAFT],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.DRAFT],
    isTerminal: false,
    isActive: false,
    isEditable: true,
    isReviewable: true,
    order: 0,
  },
  [AI_PROMPT_STATUS.PENDING_REVIEW]: {
    status: AI_PROMPT_STATUS.PENDING_REVIEW,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.PENDING_REVIEW],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.PENDING_REVIEW],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.PENDING_REVIEW],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.PENDING_REVIEW],
    isTerminal: false,
    isActive: false,
    isEditable: false,
    isReviewable: true,
    order: 1,
  },
  [AI_PROMPT_STATUS.APPROVED]: {
    status: AI_PROMPT_STATUS.APPROVED,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.APPROVED],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.APPROVED],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.APPROVED],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.APPROVED],
    isTerminal: false,
    isActive: false,
    isEditable: false,
    isReviewable: false,
    order: 2,
  },
  [AI_PROMPT_STATUS.ACTIVE]: {
    status: AI_PROMPT_STATUS.ACTIVE,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.ACTIVE],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.ACTIVE],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.ACTIVE],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.ACTIVE],
    isTerminal: false,
    isActive: true,
    isEditable: false,
    isReviewable: false,
    order: 3,
  },
  [AI_PROMPT_STATUS.DEPRECATED]: {
    status: AI_PROMPT_STATUS.DEPRECATED,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.DEPRECATED],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.DEPRECATED],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.DEPRECATED],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.DEPRECATED],
    isTerminal: false,
    isActive: false,
    isEditable: false,
    isReviewable: false,
    order: 4,
  },
  [AI_PROMPT_STATUS.REJECTED]: {
    status: AI_PROMPT_STATUS.REJECTED,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.REJECTED],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.REJECTED],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.REJECTED],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.REJECTED],
    isTerminal: true,
    isActive: false,
    isEditable: false,
    isReviewable: false,
    order: 5,
  },
  [AI_PROMPT_STATUS.ARCHIVED]: {
    status: AI_PROMPT_STATUS.ARCHIVED,
    label: AI_PROMPT_STATUS_LABELS[AI_PROMPT_STATUS.ARCHIVED],
    description: AI_PROMPT_STATUS_DESCRIPTIONS[AI_PROMPT_STATUS.ARCHIVED],
    icon: AI_PROMPT_STATUS_ICONS[AI_PROMPT_STATUS.ARCHIVED],
    color: AI_PROMPT_STATUS_COLORS[AI_PROMPT_STATUS.ARCHIVED],
    isTerminal: true,
    isActive: false,
    isEditable: false,
    isReviewable: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_PROMPT_TERMINAL_STATUSES = [
  AI_PROMPT_STATUS.REJECTED,
  AI_PROMPT_STATUS.ARCHIVED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_PROMPT_ACTIVE_STATUSES = [
  AI_PROMPT_STATUS.ACTIVE,
  AI_PROMPT_STATUS.APPROVED,
] as const;

/**
 * রিভিউ স্ট্যাটাসের তালিকা
 */
export const AI_PROMPT_REVIEW_STATUSES = [
  AI_PROMPT_STATUS.PENDING_REVIEW,
  AI_PROMPT_STATUS.APPROVED,
  AI_PROMPT_STATUS.REJECTED,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_PROMPT_INACTIVE_STATUSES = [
  AI_PROMPT_STATUS.DRAFT,
  AI_PROMPT_STATUS.DEPRECATED,
  AI_PROMPT_STATUS.REJECTED,
  AI_PROMPT_STATUS.ARCHIVED,
] as const;

/**
 * প্রম্পট স্ট্যাটাস গ্রুপ
 */
export const AI_PROMPT_STATUS_GROUPS = {
  EDITABLE: [AI_PROMPT_STATUS.DRAFT] as const,
  REVIEW: [
    AI_PROMPT_STATUS.PENDING_REVIEW,
    AI_PROMPT_STATUS.APPROVED,
    AI_PROMPT_STATUS.REJECTED,
  ] as const,
  AVAILABLE: [AI_PROMPT_STATUS.ACTIVE] as const,
  END_OF_LIFE: [AI_PROMPT_STATUS.DEPRECATED, AI_PROMPT_STATUS.ARCHIVED] as const,
} as const;

/**
 * প্রম্পট স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_PROMPT_STATUS_GROUP_LABELS = {
  EDITABLE: 'Editable',
  REVIEW: 'Review',
  AVAILABLE: 'Available',
  END_OF_LIFE: 'End of Life',
} as const;
