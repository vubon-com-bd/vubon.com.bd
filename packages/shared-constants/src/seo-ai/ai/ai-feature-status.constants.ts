/**
 * AI ফিচার স্ট্যাটাস এনাম
 */
export const AI_FEATURE_STATUS = {
  DEVELOPMENT: 'development',
  BETA: 'beta',
  ACTIVE: 'active',
  DEPRECATED: 'deprecated',
  REMOVED: 'removed',
  MAINTENANCE: 'maintenance',
  EXPERIMENTAL: 'experimental',
} as const;

/**
 * AI_FEATURE_STATUS থেকে টাইপ
 */
export type AIFeatureStatusType = (typeof AI_FEATURE_STATUS)[keyof typeof AI_FEATURE_STATUS];

/**
 * ফিচার স্ট্যাটাস লেবেল
 */
export const AI_FEATURE_STATUS_LABELS: Record<AIFeatureStatusType, string> = {
  [AI_FEATURE_STATUS.DEVELOPMENT]: 'Development',
  [AI_FEATURE_STATUS.BETA]: 'Beta',
  [AI_FEATURE_STATUS.ACTIVE]: 'Active',
  [AI_FEATURE_STATUS.DEPRECATED]: 'Deprecated',
  [AI_FEATURE_STATUS.REMOVED]: 'Removed',
  [AI_FEATURE_STATUS.MAINTENANCE]: 'Maintenance',
  [AI_FEATURE_STATUS.EXPERIMENTAL]: 'Experimental',
} as const;

/**
 * ফিচার স্ট্যাটাস বিবরণ
 */
export const AI_FEATURE_STATUS_DESCRIPTIONS: Record<AIFeatureStatusType, string> = {
  [AI_FEATURE_STATUS.DEVELOPMENT]: 'Feature is under active development and not yet ready for use',
  [AI_FEATURE_STATUS.BETA]: 'Feature is in beta testing and available for early adopters',
  [AI_FEATURE_STATUS.ACTIVE]: 'Feature is fully active and available for all users',
  [AI_FEATURE_STATUS.DEPRECATED]: 'Feature is deprecated and will be removed in future versions',
  [AI_FEATURE_STATUS.REMOVED]: 'Feature has been completely removed from the system',
  [AI_FEATURE_STATUS.MAINTENANCE]: 'Feature is under maintenance and temporarily unavailable',
  [AI_FEATURE_STATUS.EXPERIMENTAL]: 'Feature is experimental and may change or be removed',
} as const;

/**
 * ফিচার স্ট্যাটাস আইকন
 */
export const AI_FEATURE_STATUS_ICONS: Record<AIFeatureStatusType, string> = {
  [AI_FEATURE_STATUS.DEVELOPMENT]: '🛠️',
  [AI_FEATURE_STATUS.BETA]: '🧪',
  [AI_FEATURE_STATUS.ACTIVE]: '✅',
  [AI_FEATURE_STATUS.DEPRECATED]: '⚠️',
  [AI_FEATURE_STATUS.REMOVED]: '🗑️',
  [AI_FEATURE_STATUS.MAINTENANCE]: '🔧',
  [AI_FEATURE_STATUS.EXPERIMENTAL]: '🔬',
} as const;

/**
 * ফিচার স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_FEATURE_STATUS_COLORS: Record<AIFeatureStatusType, string> = {
  [AI_FEATURE_STATUS.DEVELOPMENT]: '#3b82f6', // Blue-500
  [AI_FEATURE_STATUS.BETA]: '#8b5cf6', // Violet-500
  [AI_FEATURE_STATUS.ACTIVE]: '#22c55e', // Green-500
  [AI_FEATURE_STATUS.DEPRECATED]: '#f59e0b', // Amber-500
  [AI_FEATURE_STATUS.REMOVED]: '#dc2626', // Red-600
  [AI_FEATURE_STATUS.MAINTENANCE]: '#64748b', // Slate-500
  [AI_FEATURE_STATUS.EXPERIMENTAL]: '#06b6d4', // Cyan-500
} as const;

/**
 * ফিচার স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_FEATURE_STATUS_TRANSITIONS: Record<AIFeatureStatusType, AIFeatureStatusType[]> = {
  [AI_FEATURE_STATUS.DEVELOPMENT]: [
    AI_FEATURE_STATUS.BETA,
    AI_FEATURE_STATUS.EXPERIMENTAL,
    AI_FEATURE_STATUS.REMOVED,
  ],
  [AI_FEATURE_STATUS.BETA]: [
    AI_FEATURE_STATUS.ACTIVE,
    AI_FEATURE_STATUS.DEPRECATED,
    AI_FEATURE_STATUS.MAINTENANCE,
    AI_FEATURE_STATUS.REMOVED,
  ],
  [AI_FEATURE_STATUS.ACTIVE]: [
    AI_FEATURE_STATUS.DEPRECATED,
    AI_FEATURE_STATUS.MAINTENANCE,
    AI_FEATURE_STATUS.REMOVED,
  ],
  [AI_FEATURE_STATUS.DEPRECATED]: [AI_FEATURE_STATUS.REMOVED, AI_FEATURE_STATUS.MAINTENANCE],
  [AI_FEATURE_STATUS.REMOVED]: [],
  [AI_FEATURE_STATUS.MAINTENANCE]: [
    AI_FEATURE_STATUS.ACTIVE,
    AI_FEATURE_STATUS.DEPRECATED,
    AI_FEATURE_STATUS.REMOVED,
  ],
  [AI_FEATURE_STATUS.EXPERIMENTAL]: [
    AI_FEATURE_STATUS.ACTIVE,
    AI_FEATURE_STATUS.BETA,
    AI_FEATURE_STATUS.DEPRECATED,
    AI_FEATURE_STATUS.REMOVED,
  ],
} as const;

/**
 * ফিচার স্ট্যাটাস কনফিগারেশন
 */
export interface AIFeatureStatusConfig {
  status: AIFeatureStatusType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isActive: boolean;
  isDeprecated: boolean;
  isRemoved: boolean;
  order: number;
}

/**
 * ফিচার স্ট্যাটাস মেটাডেটা
 */
export const AI_FEATURE_STATUS_METADATA: Record<AIFeatureStatusType, AIFeatureStatusConfig> = {
  [AI_FEATURE_STATUS.DEVELOPMENT]: {
    status: AI_FEATURE_STATUS.DEVELOPMENT,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.DEVELOPMENT],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.DEVELOPMENT],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.DEVELOPMENT],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.DEVELOPMENT],
    isTerminal: false,
    isActive: false,
    isDeprecated: false,
    isRemoved: false,
    order: 0,
  },
  [AI_FEATURE_STATUS.BETA]: {
    status: AI_FEATURE_STATUS.BETA,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.BETA],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.BETA],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.BETA],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.BETA],
    isTerminal: false,
    isActive: true,
    isDeprecated: false,
    isRemoved: false,
    order: 1,
  },
  [AI_FEATURE_STATUS.ACTIVE]: {
    status: AI_FEATURE_STATUS.ACTIVE,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.ACTIVE],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.ACTIVE],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.ACTIVE],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.ACTIVE],
    isTerminal: false,
    isActive: true,
    isDeprecated: false,
    isRemoved: false,
    order: 2,
  },
  [AI_FEATURE_STATUS.DEPRECATED]: {
    status: AI_FEATURE_STATUS.DEPRECATED,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.DEPRECATED],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.DEPRECATED],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.DEPRECATED],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.DEPRECATED],
    isTerminal: false,
    isActive: false,
    isDeprecated: true,
    isRemoved: false,
    order: 3,
  },
  [AI_FEATURE_STATUS.REMOVED]: {
    status: AI_FEATURE_STATUS.REMOVED,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.REMOVED],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.REMOVED],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.REMOVED],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.REMOVED],
    isTerminal: true,
    isActive: false,
    isDeprecated: false,
    isRemoved: true,
    order: 4,
  },
  [AI_FEATURE_STATUS.MAINTENANCE]: {
    status: AI_FEATURE_STATUS.MAINTENANCE,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.MAINTENANCE],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.MAINTENANCE],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.MAINTENANCE],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.MAINTENANCE],
    isTerminal: false,
    isActive: false,
    isDeprecated: false,
    isRemoved: false,
    order: 5,
  },
  [AI_FEATURE_STATUS.EXPERIMENTAL]: {
    status: AI_FEATURE_STATUS.EXPERIMENTAL,
    label: AI_FEATURE_STATUS_LABELS[AI_FEATURE_STATUS.EXPERIMENTAL],
    description: AI_FEATURE_STATUS_DESCRIPTIONS[AI_FEATURE_STATUS.EXPERIMENTAL],
    icon: AI_FEATURE_STATUS_ICONS[AI_FEATURE_STATUS.EXPERIMENTAL],
    color: AI_FEATURE_STATUS_COLORS[AI_FEATURE_STATUS.EXPERIMENTAL],
    isTerminal: false,
    isActive: true,
    isDeprecated: false,
    isRemoved: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_FEATURE_TERMINAL_STATUSES = [AI_FEATURE_STATUS.REMOVED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_FEATURE_ACTIVE_STATUSES = [
  AI_FEATURE_STATUS.BETA,
  AI_FEATURE_STATUS.ACTIVE,
  AI_FEATURE_STATUS.EXPERIMENTAL,
] as const;

/**
 * ডিপ্রিকেটেড স্ট্যাটাসের তালিকা
 */
export const AI_FEATURE_DEPRECATED_STATUSES = [AI_FEATURE_STATUS.DEPRECATED] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_FEATURE_INACTIVE_STATUSES = [
  AI_FEATURE_STATUS.DEVELOPMENT,
  AI_FEATURE_STATUS.DEPRECATED,
  AI_FEATURE_STATUS.REMOVED,
  AI_FEATURE_STATUS.MAINTENANCE,
] as const;

/**
 * ফিচার স্ট্যাটাস গ্রুপ
 */
export const AI_FEATURE_STATUS_GROUPS = {
  ACTIVE: [
    AI_FEATURE_STATUS.BETA,
    AI_FEATURE_STATUS.ACTIVE,
    AI_FEATURE_STATUS.EXPERIMENTAL,
  ] as const,
  INACTIVE: [AI_FEATURE_STATUS.DEVELOPMENT, AI_FEATURE_STATUS.MAINTENANCE] as const,
  END_OF_LIFE: [AI_FEATURE_STATUS.DEPRECATED, AI_FEATURE_STATUS.REMOVED] as const,
} as const;

/**
 * ফিচার স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_FEATURE_STATUS_GROUP_LABELS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  END_OF_LIFE: 'End of Life',
} as const;
