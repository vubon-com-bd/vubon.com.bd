/**
 * AI পার্সোনালাইজেশন টাইপ এনাম
 */
export const AI_PERSONALIZATION_TYPE = {
  USER_BASED: 'user-based',
  ITEM_BASED: 'item-based',
  CONTENT_BASED: 'content-based',
  HYBRID: 'hybrid',
  CONTEXTUAL: 'contextual',
  COLLABORATIVE: 'collaborative',
  DEMOGRAPHIC: 'demographic',
  BEHAVIORAL: 'behavioral',
} as const;

/**
 * AI_PERSONALIZATION_TYPE থেকে টাইপ
 */
export type AIPersonalizationType =
  (typeof AI_PERSONALIZATION_TYPE)[keyof typeof AI_PERSONALIZATION_TYPE];

/**
 * পার্সোনালাইজেশন টাইপ লেবেল
 */
export const AI_PERSONALIZATION_TYPE_LABELS: Record<AIPersonalizationType, string> = {
  [AI_PERSONALIZATION_TYPE.USER_BASED]: 'User Based',
  [AI_PERSONALIZATION_TYPE.ITEM_BASED]: 'Item Based',
  [AI_PERSONALIZATION_TYPE.CONTENT_BASED]: 'Content Based',
  [AI_PERSONALIZATION_TYPE.HYBRID]: 'Hybrid',
  [AI_PERSONALIZATION_TYPE.CONTEXTUAL]: 'Contextual',
  [AI_PERSONALIZATION_TYPE.COLLABORATIVE]: 'Collaborative',
  [AI_PERSONALIZATION_TYPE.DEMOGRAPHIC]: 'Demographic',
  [AI_PERSONALIZATION_TYPE.BEHAVIORAL]: 'Behavioral',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ বিবরণ
 */
export const AI_PERSONALIZATION_TYPE_DESCRIPTIONS: Record<AIPersonalizationType, string> = {
  [AI_PERSONALIZATION_TYPE.USER_BASED]:
    'Personalization based on individual user profiles and preferences',
  [AI_PERSONALIZATION_TYPE.ITEM_BASED]:
    'Personalization based on item characteristics and attributes',
  [AI_PERSONALIZATION_TYPE.CONTENT_BASED]:
    'Personalization based on content features and user-item interactions',
  [AI_PERSONALIZATION_TYPE.HYBRID]:
    'Combines multiple personalization approaches for better results',
  [AI_PERSONALIZATION_TYPE.CONTEXTUAL]:
    'Personalization based on contextual signals like time, location, device',
  [AI_PERSONALIZATION_TYPE.COLLABORATIVE]:
    'Personalization using collaborative filtering from user behaviors',
  [AI_PERSONALIZATION_TYPE.DEMOGRAPHIC]:
    'Personalization based on demographic information of users',
  [AI_PERSONALIZATION_TYPE.BEHAVIORAL]:
    'Personalization based on user behavior patterns and actions',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ আইকন
 */
export const AI_PERSONALIZATION_TYPE_ICONS: Record<AIPersonalizationType, string> = {
  [AI_PERSONALIZATION_TYPE.USER_BASED]: '👤',
  [AI_PERSONALIZATION_TYPE.ITEM_BASED]: '📦',
  [AI_PERSONALIZATION_TYPE.CONTENT_BASED]: '📄',
  [AI_PERSONALIZATION_TYPE.HYBRID]: '🔄',
  [AI_PERSONALIZATION_TYPE.CONTEXTUAL]: '🌐',
  [AI_PERSONALIZATION_TYPE.COLLABORATIVE]: '👥',
  [AI_PERSONALIZATION_TYPE.DEMOGRAPHIC]: '📊',
  [AI_PERSONALIZATION_TYPE.BEHAVIORAL]: '🎯',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_PERSONALIZATION_TYPE_COMPLEXITY: Record<AIPersonalizationType, number> = {
  [AI_PERSONALIZATION_TYPE.USER_BASED]: 3,
  [AI_PERSONALIZATION_TYPE.ITEM_BASED]: 2,
  [AI_PERSONALIZATION_TYPE.CONTENT_BASED]: 3,
  [AI_PERSONALIZATION_TYPE.HYBRID]: 5,
  [AI_PERSONALIZATION_TYPE.CONTEXTUAL]: 4,
  [AI_PERSONALIZATION_TYPE.COLLABORATIVE]: 4,
  [AI_PERSONALIZATION_TYPE.DEMOGRAPHIC]: 1,
  [AI_PERSONALIZATION_TYPE.BEHAVIORAL]: 3,
} as const;

/**
 * পার্সোনালাইজেশন টাইপ কনফিগারেশন
 */
export interface AIPersonalizationTypeConfig {
  type: AIPersonalizationType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  requiresUserData: boolean;
  requiresItemData: boolean;
  requiresContext: boolean;
  requiresTraining: boolean;
  isRealTime: boolean;
}

/**
 * পার্সোনালাইজেশন টাইপ মেটাডেটা
 */
export const AI_PERSONALIZATION_TYPE_METADATA: Record<
  AIPersonalizationType,
  AIPersonalizationTypeConfig
> = {
  [AI_PERSONALIZATION_TYPE.USER_BASED]: {
    type: AI_PERSONALIZATION_TYPE.USER_BASED,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.USER_BASED],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.USER_BASED],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.USER_BASED],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.USER_BASED],
    requiresUserData: true,
    requiresItemData: false,
    requiresContext: false,
    requiresTraining: false,
    isRealTime: true,
  },
  [AI_PERSONALIZATION_TYPE.ITEM_BASED]: {
    type: AI_PERSONALIZATION_TYPE.ITEM_BASED,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.ITEM_BASED],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.ITEM_BASED],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.ITEM_BASED],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.ITEM_BASED],
    requiresUserData: false,
    requiresItemData: true,
    requiresContext: false,
    requiresTraining: false,
    isRealTime: true,
  },
  [AI_PERSONALIZATION_TYPE.CONTENT_BASED]: {
    type: AI_PERSONALIZATION_TYPE.CONTENT_BASED,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.CONTENT_BASED],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.CONTENT_BASED],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.CONTENT_BASED],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.CONTENT_BASED],
    requiresUserData: true,
    requiresItemData: true,
    requiresContext: false,
    requiresTraining: false,
    isRealTime: true,
  },
  [AI_PERSONALIZATION_TYPE.HYBRID]: {
    type: AI_PERSONALIZATION_TYPE.HYBRID,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.HYBRID],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.HYBRID],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.HYBRID],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.HYBRID],
    requiresUserData: true,
    requiresItemData: true,
    requiresContext: false,
    requiresTraining: true,
    isRealTime: false,
  },
  [AI_PERSONALIZATION_TYPE.CONTEXTUAL]: {
    type: AI_PERSONALIZATION_TYPE.CONTEXTUAL,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.CONTEXTUAL],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.CONTEXTUAL],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.CONTEXTUAL],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.CONTEXTUAL],
    requiresUserData: true,
    requiresItemData: false,
    requiresContext: true,
    requiresTraining: false,
    isRealTime: true,
  },
  [AI_PERSONALIZATION_TYPE.COLLABORATIVE]: {
    type: AI_PERSONALIZATION_TYPE.COLLABORATIVE,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.COLLABORATIVE],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.COLLABORATIVE],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.COLLABORATIVE],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.COLLABORATIVE],
    requiresUserData: true,
    requiresItemData: false,
    requiresContext: false,
    requiresTraining: true,
    isRealTime: false,
  },
  [AI_PERSONALIZATION_TYPE.DEMOGRAPHIC]: {
    type: AI_PERSONALIZATION_TYPE.DEMOGRAPHIC,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.DEMOGRAPHIC],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.DEMOGRAPHIC],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.DEMOGRAPHIC],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.DEMOGRAPHIC],
    requiresUserData: true,
    requiresItemData: false,
    requiresContext: false,
    requiresTraining: false,
    isRealTime: true,
  },
  [AI_PERSONALIZATION_TYPE.BEHAVIORAL]: {
    type: AI_PERSONALIZATION_TYPE.BEHAVIORAL,
    label: AI_PERSONALIZATION_TYPE_LABELS[AI_PERSONALIZATION_TYPE.BEHAVIORAL],
    description: AI_PERSONALIZATION_TYPE_DESCRIPTIONS[AI_PERSONALIZATION_TYPE.BEHAVIORAL],
    icon: AI_PERSONALIZATION_TYPE_ICONS[AI_PERSONALIZATION_TYPE.BEHAVIORAL],
    complexity: AI_PERSONALIZATION_TYPE_COMPLEXITY[AI_PERSONALIZATION_TYPE.BEHAVIORAL],
    requiresUserData: true,
    requiresItemData: false,
    requiresContext: false,
    requiresTraining: false,
    isRealTime: true,
  },
} as const;

/**
 * পার্সোনালাইজেশন টাইপ গ্রুপ
 */
export const AI_PERSONALIZATION_TYPE_GROUPS = {
  USER_CENTRIC: [
    AI_PERSONALIZATION_TYPE.USER_BASED,
    AI_PERSONALIZATION_TYPE.DEMOGRAPHIC,
    AI_PERSONALIZATION_TYPE.BEHAVIORAL,
  ] as const,
  ITEM_CENTRIC: [
    AI_PERSONALIZATION_TYPE.ITEM_BASED,
    AI_PERSONALIZATION_TYPE.CONTENT_BASED,
  ] as const,
  ADVANCED: [AI_PERSONALIZATION_TYPE.HYBRID, AI_PERSONALIZATION_TYPE.COLLABORATIVE] as const,
  CONTEXT_CENTRIC: [AI_PERSONALIZATION_TYPE.CONTEXTUAL] as const,
} as const;

/**
 * পার্সোনালাইজেশন টাইপ গ্রুপ লেবেল
 */
export const AI_PERSONALIZATION_TYPE_GROUP_LABELS = {
  USER_CENTRIC: 'User Centric',
  ITEM_CENTRIC: 'Item Centric',
  ADVANCED: 'Advanced',
  CONTEXT_CENTRIC: 'Context Centric',
} as const;
