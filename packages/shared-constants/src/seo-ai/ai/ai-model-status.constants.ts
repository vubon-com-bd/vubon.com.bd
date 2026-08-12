/**
 * AI মডেল স্ট্যাটাস এনাম
 */
export const AI_MODEL_STATUS = {
  DRAFT: 'draft',
  TRAINING: 'training',
  VALIDATING: 'validating',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
  FAILED: 'failed',
  ARCHIVED: 'archived',
} as const;

/**
 * AI_MODEL_STATUS থেকে টাইপ
 */
export type AIModelStatus = (typeof AI_MODEL_STATUS)[keyof typeof AI_MODEL_STATUS];

/**
 * AI মডেল স্ট্যাটাস ট্রানজিশন রুলস
 * প্রতিটি স্ট্যাটাস থেকে কোন স্ট্যাটাসে যাওয়া যায় তা নির্ধারণ করে
 */
export const AI_MODEL_STATUS_TRANSITIONS: Record<AIModelStatus, AIModelStatus[]> = {
  [AI_MODEL_STATUS.DRAFT]: [
    AI_MODEL_STATUS.TRAINING,
    AI_MODEL_STATUS.ARCHIVED,
    AI_MODEL_STATUS.INACTIVE,
  ],
  [AI_MODEL_STATUS.TRAINING]: [
    AI_MODEL_STATUS.VALIDATING,
    AI_MODEL_STATUS.FAILED,
    AI_MODEL_STATUS.INACTIVE,
  ],
  [AI_MODEL_STATUS.VALIDATING]: [
    AI_MODEL_STATUS.ACTIVE,
    AI_MODEL_STATUS.FAILED,
    AI_MODEL_STATUS.DRAFT,
    AI_MODEL_STATUS.INACTIVE,
  ],
  [AI_MODEL_STATUS.ACTIVE]: [
    AI_MODEL_STATUS.INACTIVE,
    AI_MODEL_STATUS.DEPRECATED,
    AI_MODEL_STATUS.ARCHIVED,
  ],
  [AI_MODEL_STATUS.INACTIVE]: [
    AI_MODEL_STATUS.ACTIVE,
    AI_MODEL_STATUS.ARCHIVED,
    AI_MODEL_STATUS.DRAFT,
  ],
  [AI_MODEL_STATUS.DEPRECATED]: [AI_MODEL_STATUS.ARCHIVED, AI_MODEL_STATUS.INACTIVE],
  [AI_MODEL_STATUS.FAILED]: [
    AI_MODEL_STATUS.DRAFT,
    AI_MODEL_STATUS.TRAINING,
    AI_MODEL_STATUS.ARCHIVED,
  ],
  [AI_MODEL_STATUS.ARCHIVED]: [AI_MODEL_STATUS.DRAFT, AI_MODEL_STATUS.INACTIVE],
} as const;

/**
 * AI মডেল স্ট্যাটাসের রঙ কোড
 */
export const AI_MODEL_STATUS_COLORS: Record<AIModelStatus, string> = {
  [AI_MODEL_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [AI_MODEL_STATUS.TRAINING]: '#3b82f6', // Blue-500
  [AI_MODEL_STATUS.VALIDATING]: '#8b5cf6', // Violet-500
  [AI_MODEL_STATUS.ACTIVE]: '#22c55e', // Green-500
  [AI_MODEL_STATUS.INACTIVE]: '#f59e0b', // Amber-500
  [AI_MODEL_STATUS.DEPRECATED]: '#ef4444', // Red-500
  [AI_MODEL_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_MODEL_STATUS.ARCHIVED]: '#64748b', // Slate-500
} as const;

/**
 * AI মডেল স্ট্যাটাসের লেবেল (মানব-পাঠযোগ্য নাম)
 */
export const AI_MODEL_STATUS_LABELS: Record<AIModelStatus, string> = {
  [AI_MODEL_STATUS.DRAFT]: 'Draft',
  [AI_MODEL_STATUS.TRAINING]: 'Training',
  [AI_MODEL_STATUS.VALIDATING]: 'Validating',
  [AI_MODEL_STATUS.ACTIVE]: 'Active',
  [AI_MODEL_STATUS.INACTIVE]: 'Inactive',
  [AI_MODEL_STATUS.DEPRECATED]: 'Deprecated',
  [AI_MODEL_STATUS.FAILED]: 'Failed',
  [AI_MODEL_STATUS.ARCHIVED]: 'Archived',
} as const;

/**
 * AI মডেল স্ট্যাটাসের বিবরণ
 */
export const AI_MODEL_STATUS_DESCRIPTIONS: Record<AIModelStatus, string> = {
  [AI_MODEL_STATUS.DRAFT]: 'Model is in draft state, not yet ready for training',
  [AI_MODEL_STATUS.TRAINING]: 'Model is currently being trained or fine-tuned',
  [AI_MODEL_STATUS.VALIDATING]: 'Model is being validated and tested for quality',
  [AI_MODEL_STATUS.ACTIVE]: 'Model is active and available for use in production',
  [AI_MODEL_STATUS.INACTIVE]: 'Model is temporarily inactive but can be reactivated',
  [AI_MODEL_STATUS.DEPRECATED]: 'Model is deprecated and should be replaced with newer version',
  [AI_MODEL_STATUS.FAILED]: 'Model training or validation has failed',
  [AI_MODEL_STATUS.ARCHIVED]: 'Model is archived and no longer in active use',
} as const;

/**
 * AI মডেল স্ট্যাটাসের আইকন (ইউনিকোড বা ইমোজি)
 */
export const AI_MODEL_STATUS_ICONS: Record<AIModelStatus, string> = {
  [AI_MODEL_STATUS.DRAFT]: '📝',
  [AI_MODEL_STATUS.TRAINING]: '🔬',
  [AI_MODEL_STATUS.VALIDATING]: '✅',
  [AI_MODEL_STATUS.ACTIVE]: '🚀',
  [AI_MODEL_STATUS.INACTIVE]: '⏸️',
  [AI_MODEL_STATUS.DEPRECATED]: '⚠️',
  [AI_MODEL_STATUS.FAILED]: '❌',
  [AI_MODEL_STATUS.ARCHIVED]: '📦',
} as const;

/**
 * AI মডেল স্ট্যাটাস কনফিগারেশন
 */
export interface AIModelStatusConfig {
  status: AIModelStatus;
  label: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  canTransitionTo: AIModelStatus[];
  order: number;
}

/**
 * AI মডেল স্ট্যাটাস মেটাডেটা
 */
export const AI_MODEL_STATUS_METADATA: Record<AIModelStatus, AIModelStatusConfig> = {
  [AI_MODEL_STATUS.DRAFT]: {
    status: AI_MODEL_STATUS.DRAFT,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.DRAFT],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.DRAFT],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.DRAFT],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.DRAFT],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.DRAFT],
    order: 0,
  },
  [AI_MODEL_STATUS.TRAINING]: {
    status: AI_MODEL_STATUS.TRAINING,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.TRAINING],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.TRAINING],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.TRAINING],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.TRAINING],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.TRAINING],
    order: 1,
  },
  [AI_MODEL_STATUS.VALIDATING]: {
    status: AI_MODEL_STATUS.VALIDATING,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.VALIDATING],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.VALIDATING],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.VALIDATING],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.VALIDATING],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.VALIDATING],
    order: 2,
  },
  [AI_MODEL_STATUS.ACTIVE]: {
    status: AI_MODEL_STATUS.ACTIVE,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.ACTIVE],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.ACTIVE],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.ACTIVE],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.ACTIVE],
    isActive: true,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.ACTIVE],
    order: 3,
  },
  [AI_MODEL_STATUS.INACTIVE]: {
    status: AI_MODEL_STATUS.INACTIVE,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.INACTIVE],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.INACTIVE],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.INACTIVE],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.INACTIVE],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.INACTIVE],
    order: 4,
  },
  [AI_MODEL_STATUS.DEPRECATED]: {
    status: AI_MODEL_STATUS.DEPRECATED,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.DEPRECATED],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.DEPRECATED],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.DEPRECATED],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.DEPRECATED],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.DEPRECATED],
    order: 5,
  },
  [AI_MODEL_STATUS.FAILED]: {
    status: AI_MODEL_STATUS.FAILED,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.FAILED],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.FAILED],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.FAILED],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.FAILED],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.FAILED],
    order: 6,
  },
  [AI_MODEL_STATUS.ARCHIVED]: {
    status: AI_MODEL_STATUS.ARCHIVED,
    label: AI_MODEL_STATUS_LABELS[AI_MODEL_STATUS.ARCHIVED],
    description: AI_MODEL_STATUS_DESCRIPTIONS[AI_MODEL_STATUS.ARCHIVED],
    color: AI_MODEL_STATUS_COLORS[AI_MODEL_STATUS.ARCHIVED],
    icon: AI_MODEL_STATUS_ICONS[AI_MODEL_STATUS.ARCHIVED],
    isActive: false,
    canTransitionTo: AI_MODEL_STATUS_TRANSITIONS[AI_MODEL_STATUS.ARCHIVED],
    order: 7,
  },
} as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_MODEL_ACTIVE_STATUSES = [AI_MODEL_STATUS.ACTIVE] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাস টাইপ
 */
export type AIModelActiveStatus = (typeof AI_MODEL_ACTIVE_STATUSES)[number];

/**
 * নন-অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_MODEL_INACTIVE_STATUSES = [
  AI_MODEL_STATUS.DRAFT,
  AI_MODEL_STATUS.TRAINING,
  AI_MODEL_STATUS.VALIDATING,
  AI_MODEL_STATUS.INACTIVE,
  AI_MODEL_STATUS.DEPRECATED,
  AI_MODEL_STATUS.FAILED,
  AI_MODEL_STATUS.ARCHIVED,
] as const;

/**
 * নন-অ্যাক্টিভ স্ট্যাটাস টাইপ
 */
export type AIModelInactiveStatus = (typeof AI_MODEL_INACTIVE_STATUSES)[number];

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা (যে স্ট্যাটাসে মডেল শেষ হতে পারে)
 */
export const AI_MODEL_TERMINAL_STATUSES = [
  AI_MODEL_STATUS.ACTIVE,
  AI_MODEL_STATUS.FAILED,
  AI_MODEL_STATUS.ARCHIVED,
] as const;

/**
 * টার্মিনাল স্ট্যাটাস টাইপ
 */
export type AIModelTerminalStatus = (typeof AI_MODEL_TERMINAL_STATUSES)[number];
