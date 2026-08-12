/**
 * AI রেকমেন্ডেশন স্কোপ এনাম
 */
export const AI_RECOMMENDATION_SCOPE = {
  GLOBAL: 'global',
  CATEGORY: 'category',
  SUBCATEGORY: 'subcategory',
  USER: 'user',
  SESSION: 'session',
  PRODUCT: 'product',
  COLLECTION: 'collection',
  PERSONALIZED: 'personalized',
  CONTEXTUAL: 'contextual',
} as const;

/**
 * AI_RECOMMENDATION_SCOPE থেকে টাইপ
 */
export type AIRecommendationScope =
  (typeof AI_RECOMMENDATION_SCOPE)[keyof typeof AI_RECOMMENDATION_SCOPE];

/**
 * রেকমেন্ডেশন স্কোপ লেবেল
 */
export const AI_RECOMMENDATION_SCOPE_LABELS: Record<AIRecommendationScope, string> = {
  [AI_RECOMMENDATION_SCOPE.GLOBAL]: 'Global',
  [AI_RECOMMENDATION_SCOPE.CATEGORY]: 'Category',
  [AI_RECOMMENDATION_SCOPE.SUBCATEGORY]: 'Subcategory',
  [AI_RECOMMENDATION_SCOPE.USER]: 'User',
  [AI_RECOMMENDATION_SCOPE.SESSION]: 'Session',
  [AI_RECOMMENDATION_SCOPE.PRODUCT]: 'Product',
  [AI_RECOMMENDATION_SCOPE.COLLECTION]: 'Collection',
  [AI_RECOMMENDATION_SCOPE.PERSONALIZED]: 'Personalized',
  [AI_RECOMMENDATION_SCOPE.CONTEXTUAL]: 'Contextual',
} as const;

/**
 * রেকমেন্ডেশন স্কোপ বিবরণ
 */
export const AI_RECOMMENDATION_SCOPE_DESCRIPTIONS: Record<AIRecommendationScope, string> = {
  [AI_RECOMMENDATION_SCOPE.GLOBAL]:
    'Recommendations applicable to all users across the entire platform',
  [AI_RECOMMENDATION_SCOPE.CATEGORY]: 'Recommendations specific to a particular category of items',
  [AI_RECOMMENDATION_SCOPE.SUBCATEGORY]:
    'Recommendations specific to a subcategory within a category',
  [AI_RECOMMENDATION_SCOPE.USER]:
    'Recommendations tailored to individual user preferences and history',
  [AI_RECOMMENDATION_SCOPE.SESSION]:
    'Recommendations based on current user session behavior and context',
  [AI_RECOMMENDATION_SCOPE.PRODUCT]: 'Recommendations related to a specific product or item',
  [AI_RECOMMENDATION_SCOPE.COLLECTION]:
    'Recommendations curated as a collection or bundle of items',
  [AI_RECOMMENDATION_SCOPE.PERSONALIZED]: 'Highly personalized recommendations using ML models',
  [AI_RECOMMENDATION_SCOPE.CONTEXTUAL]:
    'Recommendations based on contextual signals like time, location, device',
} as const;

/**
 * রেকমেন্ডেশন স্কোপ আইকন
 */
export const AI_RECOMMENDATION_SCOPE_ICONS: Record<AIRecommendationScope, string> = {
  [AI_RECOMMENDATION_SCOPE.GLOBAL]: '🌍',
  [AI_RECOMMENDATION_SCOPE.CATEGORY]: '📂',
  [AI_RECOMMENDATION_SCOPE.SUBCATEGORY]: '📁',
  [AI_RECOMMENDATION_SCOPE.USER]: '👤',
  [AI_RECOMMENDATION_SCOPE.SESSION]: '🔄',
  [AI_RECOMMENDATION_SCOPE.PRODUCT]: '📦',
  [AI_RECOMMENDATION_SCOPE.COLLECTION]: '📚',
  [AI_RECOMMENDATION_SCOPE.PERSONALIZED]: '🎯',
  [AI_RECOMMENDATION_SCOPE.CONTEXTUAL]: '🌐',
} as const;

/**
 * রেকমেন্ডেশন স্কোপ লেভেল (সংখ্যাসূচক মান)
 */
export const AI_RECOMMENDATION_SCOPE_LEVEL: Record<AIRecommendationScope, number> = {
  [AI_RECOMMENDATION_SCOPE.GLOBAL]: 0,
  [AI_RECOMMENDATION_SCOPE.CATEGORY]: 1,
  [AI_RECOMMENDATION_SCOPE.SUBCATEGORY]: 2,
  [AI_RECOMMENDATION_SCOPE.COLLECTION]: 3,
  [AI_RECOMMENDATION_SCOPE.PRODUCT]: 4,
  [AI_RECOMMENDATION_SCOPE.SESSION]: 5,
  [AI_RECOMMENDATION_SCOPE.USER]: 6,
  [AI_RECOMMENDATION_SCOPE.CONTEXTUAL]: 7,
  [AI_RECOMMENDATION_SCOPE.PERSONALIZED]: 8,
} as const;

/**
 * রেকমেন্ডেশন স্কোপ কনফিগারেশন
 */
export interface AIRecommendationScopeConfig {
  scope: AIRecommendationScope;
  label: string;
  description: string;
  icon: string;
  level: number;
  requiresUserContext: boolean;
  requiresItemContext: boolean;
  requiresSessionContext: boolean;
  requiresTimeContext: boolean;
  isRealTime: boolean;
}

/**
 * রেকমেন্ডেশন স্কোপ মেটাডেটা
 */
export const AI_RECOMMENDATION_SCOPE_METADATA: Record<
  AIRecommendationScope,
  AIRecommendationScopeConfig
> = {
  [AI_RECOMMENDATION_SCOPE.GLOBAL]: {
    scope: AI_RECOMMENDATION_SCOPE.GLOBAL,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.GLOBAL],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.GLOBAL],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.GLOBAL],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.GLOBAL],
    requiresUserContext: false,
    requiresItemContext: false,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: false,
  },
  [AI_RECOMMENDATION_SCOPE.CATEGORY]: {
    scope: AI_RECOMMENDATION_SCOPE.CATEGORY,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.CATEGORY],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.CATEGORY],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.CATEGORY],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.CATEGORY],
    requiresUserContext: false,
    requiresItemContext: true,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: false,
  },
  [AI_RECOMMENDATION_SCOPE.SUBCATEGORY]: {
    scope: AI_RECOMMENDATION_SCOPE.SUBCATEGORY,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.SUBCATEGORY],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.SUBCATEGORY],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.SUBCATEGORY],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.SUBCATEGORY],
    requiresUserContext: false,
    requiresItemContext: true,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: false,
  },
  [AI_RECOMMENDATION_SCOPE.USER]: {
    scope: AI_RECOMMENDATION_SCOPE.USER,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.USER],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.USER],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.USER],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.USER],
    requiresUserContext: true,
    requiresItemContext: false,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: false,
  },
  [AI_RECOMMENDATION_SCOPE.SESSION]: {
    scope: AI_RECOMMENDATION_SCOPE.SESSION,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.SESSION],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.SESSION],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.SESSION],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.SESSION],
    requiresUserContext: true,
    requiresItemContext: false,
    requiresSessionContext: true,
    requiresTimeContext: true,
    isRealTime: true,
  },
  [AI_RECOMMENDATION_SCOPE.PRODUCT]: {
    scope: AI_RECOMMENDATION_SCOPE.PRODUCT,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.PRODUCT],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.PRODUCT],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.PRODUCT],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.PRODUCT],
    requiresUserContext: true,
    requiresItemContext: true,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: true,
  },
  [AI_RECOMMENDATION_SCOPE.COLLECTION]: {
    scope: AI_RECOMMENDATION_SCOPE.COLLECTION,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.COLLECTION],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.COLLECTION],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.COLLECTION],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.COLLECTION],
    requiresUserContext: false,
    requiresItemContext: true,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: false,
  },
  [AI_RECOMMENDATION_SCOPE.PERSONALIZED]: {
    scope: AI_RECOMMENDATION_SCOPE.PERSONALIZED,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.PERSONALIZED],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.PERSONALIZED],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.PERSONALIZED],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.PERSONALIZED],
    requiresUserContext: true,
    requiresItemContext: false,
    requiresSessionContext: false,
    requiresTimeContext: false,
    isRealTime: false,
  },
  [AI_RECOMMENDATION_SCOPE.CONTEXTUAL]: {
    scope: AI_RECOMMENDATION_SCOPE.CONTEXTUAL,
    label: AI_RECOMMENDATION_SCOPE_LABELS[AI_RECOMMENDATION_SCOPE.CONTEXTUAL],
    description: AI_RECOMMENDATION_SCOPE_DESCRIPTIONS[AI_RECOMMENDATION_SCOPE.CONTEXTUAL],
    icon: AI_RECOMMENDATION_SCOPE_ICONS[AI_RECOMMENDATION_SCOPE.CONTEXTUAL],
    level: AI_RECOMMENDATION_SCOPE_LEVEL[AI_RECOMMENDATION_SCOPE.CONTEXTUAL],
    requiresUserContext: true,
    requiresItemContext: false,
    requiresSessionContext: true,
    requiresTimeContext: true,
    isRealTime: true,
  },
} as const;

/**
 * রেকমেন্ডেশন স্কোপ গ্রুপ
 */
export const AI_RECOMMENDATION_SCOPE_GROUPS = {
  BROAD: [
    AI_RECOMMENDATION_SCOPE.GLOBAL,
    AI_RECOMMENDATION_SCOPE.CATEGORY,
    AI_RECOMMENDATION_SCOPE.SUBCATEGORY,
  ] as const,
  SPECIFIC: [AI_RECOMMENDATION_SCOPE.PRODUCT, AI_RECOMMENDATION_SCOPE.COLLECTION] as const,
  PERSONAL: [
    AI_RECOMMENDATION_SCOPE.USER,
    AI_RECOMMENDATION_SCOPE.SESSION,
    AI_RECOMMENDATION_SCOPE.PERSONALIZED,
  ] as const,
  DYNAMIC: [AI_RECOMMENDATION_SCOPE.CONTEXTUAL, AI_RECOMMENDATION_SCOPE.SESSION] as const,
} as const;

/**
 * রেকমেন্ডেশন স্কোপ গ্রুপ লেবেল
 */
export const AI_RECOMMENDATION_SCOPE_GROUP_LABELS = {
  BROAD: 'Broad',
  SPECIFIC: 'Specific',
  PERSONAL: 'Personal',
  DYNAMIC: 'Dynamic',
} as const;
