/**
 * ডিফল্ট ফিচার স্ট্যাটাস
 */
export const AI_FEATURE_DEFAULT_STATUS = 'inactive' as const;

/**
 * নামের সর্বোচ্চ দৈর্ঘ্য (৫০ ক্যারেক্টার)
 */
export const AI_FEATURE_MAX_NAME_LENGTH = 50 as const;

/**
 * বিবরণের সর্বোচ্চ দৈর্ঘ্য (২০০ ক্যারেক্টার)
 */
export const AI_FEATURE_MAX_DESCRIPTION_LENGTH = 200 as const;

/**
 * ফিচার ফ্ল্যাগ প্রিফিক্স
 */
export const AI_FEATURE_FLAG_PREFIX = 'feature_' as const;

/**
 * ফিচার স্ট্যাটাস এনাম
 */
export const AI_FEATURE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BETA: 'beta',
  DEPRECATED: 'deprecated',
  EXPERIMENTAL: 'experimental',
  DISABLED: 'disabled',
} as const;

/**
 * AI_FEATURE_STATUS থেকে টাইপ
 */
export type AIFeatureStatus = (typeof AI_FEATURE_STATUS)[keyof typeof AI_FEATURE_STATUS];

/**
 * ফিচার স্ট্যাটাস লেবেল
 */
export const AI_FEATURE_STATUS_LABELS: Record<AIFeatureStatus, string> = {
  [AI_FEATURE_STATUS.ACTIVE]: 'Active',
  [AI_FEATURE_STATUS.INACTIVE]: 'Inactive',
  [AI_FEATURE_STATUS.BETA]: 'Beta',
  [AI_FEATURE_STATUS.DEPRECATED]: 'Deprecated',
  [AI_FEATURE_STATUS.EXPERIMENTAL]: 'Experimental',
  [AI_FEATURE_STATUS.DISABLED]: 'Disabled',
} as const;

/**
 * ফিচার স্ট্যাটাস বিবরণ
 */
export const AI_FEATURE_STATUS_DESCRIPTIONS: Record<AIFeatureStatus, string> = {
  [AI_FEATURE_STATUS.ACTIVE]: 'Feature is fully active and available for all users',
  [AI_FEATURE_STATUS.INACTIVE]: 'Feature is inactive but can be activated',
  [AI_FEATURE_STATUS.BETA]: 'Feature is in beta testing phase',
  [AI_FEATURE_STATUS.DEPRECATED]: 'Feature is deprecated and will be removed',
  [AI_FEATURE_STATUS.EXPERIMENTAL]: 'Feature is experimental and may change',
  [AI_FEATURE_STATUS.DISABLED]: 'Feature is permanently disabled',
} as const;

/**
 * ফিচার স্ট্যাটাস আইকন
 */
export const AI_FEATURE_STATUS_ICONS: Record<AIFeatureStatus, string> = {
  [AI_FEATURE_STATUS.ACTIVE]: '✅',
  [AI_FEATURE_STATUS.INACTIVE]: '⭕',
  [AI_FEATURE_STATUS.BETA]: '🧪',
  [AI_FEATURE_STATUS.DEPRECATED]: '⚠️',
  [AI_FEATURE_STATUS.EXPERIMENTAL]: '🔬',
  [AI_FEATURE_STATUS.DISABLED]: '🚫',
} as const;

/**
 * ফিচার স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_FEATURE_STATUS_COLORS: Record<AIFeatureStatus, string> = {
  [AI_FEATURE_STATUS.ACTIVE]: '#22c55e', // Green-500
  [AI_FEATURE_STATUS.INACTIVE]: '#94a3b8', // Slate-400
  [AI_FEATURE_STATUS.BETA]: '#8b5cf6', // Violet-500
  [AI_FEATURE_STATUS.DEPRECATED]: '#f59e0b', // Amber-500
  [AI_FEATURE_STATUS.EXPERIMENTAL]: '#06b6d4', // Cyan-500
  [AI_FEATURE_STATUS.DISABLED]: '#dc2626', // Red-600
} as const;

/**
 * ফিচার ক্যাটাগরি এনাম
 */
export const AI_FEATURE_CATEGORY = {
  AI_MODEL: 'ai-model',
  SEARCH: 'search',
  RECOMMENDATION: 'recommendation',
  PERSONALIZATION: 'personalization',
  RANKING: 'ranking',
  ANALYTICS: 'analytics',
  TRAINING: 'training',
  SEO: 'seo',
  CONTENT: 'content',
  AUTOMATION: 'automation',
} as const;

/**
 * AI_FEATURE_CATEGORY থেকে টাইপ
 */
export type AIFeatureCategory = (typeof AI_FEATURE_CATEGORY)[keyof typeof AI_FEATURE_CATEGORY];

/**
 * ফিচার ক্যাটাগরি লেবেল
 */
export const AI_FEATURE_CATEGORY_LABELS: Record<AIFeatureCategory, string> = {
  [AI_FEATURE_CATEGORY.AI_MODEL]: 'AI Model',
  [AI_FEATURE_CATEGORY.SEARCH]: 'Search',
  [AI_FEATURE_CATEGORY.RECOMMENDATION]: 'Recommendation',
  [AI_FEATURE_CATEGORY.PERSONALIZATION]: 'Personalization',
  [AI_FEATURE_CATEGORY.RANKING]: 'Ranking',
  [AI_FEATURE_CATEGORY.ANALYTICS]: 'Analytics',
  [AI_FEATURE_CATEGORY.TRAINING]: 'Training',
  [AI_FEATURE_CATEGORY.SEO]: 'SEO',
  [AI_FEATURE_CATEGORY.CONTENT]: 'Content',
  [AI_FEATURE_CATEGORY.AUTOMATION]: 'Automation',
} as const;

/**
 * ফিচার ক্যাটাগরি আইকন
 */
export const AI_FEATURE_CATEGORY_ICONS: Record<AIFeatureCategory, string> = {
  [AI_FEATURE_CATEGORY.AI_MODEL]: '🧠',
  [AI_FEATURE_CATEGORY.SEARCH]: '🔍',
  [AI_FEATURE_CATEGORY.RECOMMENDATION]: '💡',
  [AI_FEATURE_CATEGORY.PERSONALIZATION]: '👤',
  [AI_FEATURE_CATEGORY.RANKING]: '📊',
  [AI_FEATURE_CATEGORY.ANALYTICS]: '📈',
  [AI_FEATURE_CATEGORY.TRAINING]: '🎓',
  [AI_FEATURE_CATEGORY.SEO]: '🔎',
  [AI_FEATURE_CATEGORY.CONTENT]: '📝',
  [AI_FEATURE_CATEGORY.AUTOMATION]: '🤖',
} as const;

/**
 * ফিচার কনফিগারেশন
 */
export interface AIFeatureConfig {
  name: string;
  description: string;
  status: AIFeatureStatus;
  category: AIFeatureCategory;
  isEnabled: boolean;
  isPremium: boolean;
  requiresAuth: boolean;
  maxNameLength: number;
  maxDescriptionLength: number;
  flagPrefix: string;
}

/**
 * ফিচার ডিফল্ট কনফিগারেশন
 */
export const AI_FEATURE_DEFAULT_CONFIG: AIFeatureConfig = {
  name: '',
  description: '',
  status: AI_FEATURE_DEFAULT_STATUS as AIFeatureStatus,
  category: AI_FEATURE_CATEGORY.AI_MODEL,
  isEnabled: false,
  isPremium: false,
  requiresAuth: true,
  maxNameLength: AI_FEATURE_MAX_NAME_LENGTH,
  maxDescriptionLength: AI_FEATURE_MAX_DESCRIPTION_LENGTH,
  flagPrefix: AI_FEATURE_FLAG_PREFIX,
} as const;

/**
 * ফিচার ফিল্টার
 */
export interface AIFeatureFilter {
  status?: AIFeatureStatus;
  category?: AIFeatureCategory;
  isEnabled?: boolean;
  isPremium?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * ফিচার রেসপন্স
 */
export interface AIFeatureResponse<T = unknown> {
  features: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * ফিচার স্ট্যাটাস গ্রুপ
 */
export const AI_FEATURE_STATUS_GROUPS = {
  AVAILABLE: [AI_FEATURE_STATUS.ACTIVE, AI_FEATURE_STATUS.BETA] as const,
  UNAVAILABLE: [AI_FEATURE_STATUS.INACTIVE, AI_FEATURE_STATUS.DISABLED] as const,
  DEPRECATED: [AI_FEATURE_STATUS.DEPRECATED] as const,
  EXPERIMENTAL: [AI_FEATURE_STATUS.EXPERIMENTAL] as const,
} as const;

/**
 * ফিচার স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_FEATURE_STATUS_GROUP_LABELS = {
  AVAILABLE: 'Available',
  UNAVAILABLE: 'Unavailable',
  DEPRECATED: 'Deprecated',
  EXPERIMENTAL: 'Experimental',
} as const;

/**
 * ফিচার ক্যাটাগরি গ্রুপ
 */
export const AI_FEATURE_CATEGORY_GROUPS = {
  CORE: [AI_FEATURE_CATEGORY.AI_MODEL, AI_FEATURE_CATEGORY.SEARCH] as const,
  INTELLIGENCE: [
    AI_FEATURE_CATEGORY.RECOMMENDATION,
    AI_FEATURE_CATEGORY.PERSONALIZATION,
    AI_FEATURE_CATEGORY.RANKING,
  ] as const,
  OPERATIONS: [AI_FEATURE_CATEGORY.ANALYTICS, AI_FEATURE_CATEGORY.TRAINING] as const,
  CONTENT: [
    AI_FEATURE_CATEGORY.SEO,
    AI_FEATURE_CATEGORY.CONTENT,
    AI_FEATURE_CATEGORY.AUTOMATION,
  ] as const,
} as const;

/**
 * ফিচার ক্যাটাগরি গ্রুপ লেবেল
 */
export const AI_FEATURE_CATEGORY_GROUP_LABELS = {
  CORE: 'Core',
  INTELLIGENCE: 'Intelligence',
  OPERATIONS: 'Operations',
  CONTENT: 'Content',
} as const;
