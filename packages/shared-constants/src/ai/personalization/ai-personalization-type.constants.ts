/**
 * AI Personalization Type Constants
 * Types and classifications for personalization
 */

export const AI_PERSONALIZATION_TYPE = {
  // Personalization Categories
  CATEGORIES: {
    USER: 'user',
    BEHAVIORAL: 'behavioral',
    CONTEXTUAL: 'contextual',
    PREFERENCE: 'preference',
    DEMOGRAPHIC: 'demographic',
    PSYCHOGRAPHIC: 'psychographic',
    SOCIAL: 'social',
    DEVICE: 'device',
    LOCATION: 'location',
    TIME: 'time',
  } as const,

  // Personalization Sub-Types
  SUB_TYPES: {
    // User-Based
    USER_PROFILE: 'user_profile',
    USER_SEGMENT: 'user_segment',
    USER_GROUP: 'user_group',
    USER_JOURNEY: 'user_journey',

    // Behavioral
    BROWSE_HISTORY: 'browse_history',
    PURCHASE_HISTORY: 'purchase_history',
    SEARCH_HISTORY: 'search_history',
    VIEW_HISTORY: 'view_history',
    CART_HISTORY: 'cart_history',
    WISHLIST_HISTORY: 'wishlist_history',

    // Contextual
    TIME_CONTEXT: 'time_context',
    LOCATION_CONTEXT: 'location_context',
    DEVICE_CONTEXT: 'device_context',
    SEASON_CONTEXT: 'season_context',
    WEATHER_CONTEXT: 'weather_context',

    // Preferences
    CATEGORY_PREFERENCE: 'category_preference',
    BRAND_PREFERENCE: 'brand_preference',
    PRICE_PREFERENCE: 'price_preference',
    QUALITY_PREFERENCE: 'quality_preference',
    FEATURE_PREFERENCE: 'feature_preference',

    // Demographic
    AGE_GROUP: 'age_group',
    GENDER: 'gender',
    INCOME: 'income',
    EDUCATION: 'education',
    OCCUPATION: 'occupation',

    // Psychographic
    INTERESTS: 'interests',
    HOBBIES: 'hobbies',
    VALUES: 'values',
    LIFESTYLE: 'lifestyle',
    PERSONALITY: 'personality',

    // Social
    SOCIAL_MEDIA: 'social_media',
    FRIEND_ACTIVITY: 'friend_activity',
    COMMUNITY: 'community',
    INFLUENCER: 'influencer',
  } as const,

  // Personalization Sources
  SOURCES: {
    FIRST_PARTY: 'first_party',
    SECOND_PARTY: 'second_party',
    THIRD_PARTY: 'third_party',
    EXPLICIT: 'explicit',
    IMPLICIT: 'implicit',
    INFERRED: 'inferred',
    PREDICTED: 'predicted',
  } as const,

  // Personalization Modes
  MODES: {
    EXPLICIT: 'explicit',
    IMPLICIT: 'implicit',
    HYBRID: 'hybrid',
    ADAPTIVE: 'adaptive',
    PREDICTIVE: 'predictive',
    REACTIVE: 'reactive',
    PROACTIVE: 'proactive',
  } as const,

  // Personalization Levels
  LEVELS: {
    NONE: 0,
    BASIC: 1,
    STANDARD: 2,
    ADVANCED: 3,
    PREMIUM: 4,
    ULTIMATE: 5,
  } as const,
} as const;

// Personalization Categories
export type AIPersonalizationCategory =
  (typeof AI_PERSONALIZATION_TYPE.CATEGORIES)[keyof typeof AI_PERSONALIZATION_TYPE.CATEGORIES];

// Personalization Sub-Types
export type AIPersonalizationSubType =
  (typeof AI_PERSONALIZATION_TYPE.SUB_TYPES)[keyof typeof AI_PERSONALIZATION_TYPE.SUB_TYPES];

// Personalization Sources
export type AIPersonalizationSource =
  (typeof AI_PERSONALIZATION_TYPE.SOURCES)[keyof typeof AI_PERSONALIZATION_TYPE.SOURCES];

// Personalization Modes
export type AIPersonalizationMode =
  (typeof AI_PERSONALIZATION_TYPE.MODES)[keyof typeof AI_PERSONALIZATION_TYPE.MODES];

// Personalization Levels
export type AIPersonalizationLevel =
  (typeof AI_PERSONALIZATION_TYPE.LEVELS)[keyof typeof AI_PERSONALIZATION_TYPE.LEVELS];

// Utility Functions
export function getPersonalizationCategoryLabel(category: AIPersonalizationCategory): string {
  const labels: Record<AIPersonalizationCategory, string> = {
    [AI_PERSONALIZATION_TYPE.CATEGORIES.USER]: 'User',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.BEHAVIORAL]: 'Behavioral',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.CONTEXTUAL]: 'Contextual',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.PREFERENCE]: 'Preference',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.DEMOGRAPHIC]: 'Demographic',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.PSYCHOGRAPHIC]: 'Psychographic',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.DEVICE]: 'Device',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.LOCATION]: 'Location',
    [AI_PERSONALIZATION_TYPE.CATEGORIES.TIME]: 'Time',
  };
  return labels[category] || 'Unknown';
}

export function getPersonalizationSubTypeLabel(subType: AIPersonalizationSubType): string {
  const labels: Record<AIPersonalizationSubType, string> = {
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.USER_PROFILE]: 'User Profile',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.USER_SEGMENT]: 'User Segment',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.USER_GROUP]: 'User Group',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.USER_JOURNEY]: 'User Journey',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.BROWSE_HISTORY]: 'Browse History',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.PURCHASE_HISTORY]: 'Purchase History',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.SEARCH_HISTORY]: 'Search History',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.VIEW_HISTORY]: 'View History',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.CART_HISTORY]: 'Cart History',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.WISHLIST_HISTORY]: 'Wishlist History',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.TIME_CONTEXT]: 'Time Context',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.LOCATION_CONTEXT]: 'Location Context',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.DEVICE_CONTEXT]: 'Device Context',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.SEASON_CONTEXT]: 'Season Context',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.WEATHER_CONTEXT]: 'Weather Context',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.CATEGORY_PREFERENCE]: 'Category Preference',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.BRAND_PREFERENCE]: 'Brand Preference',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.PRICE_PREFERENCE]: 'Price Preference',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.QUALITY_PREFERENCE]: 'Quality Preference',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.FEATURE_PREFERENCE]: 'Feature Preference',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.AGE_GROUP]: 'Age Group',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.GENDER]: 'Gender',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.INCOME]: 'Income',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.EDUCATION]: 'Education',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.OCCUPATION]: 'Occupation',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.INTERESTS]: 'Interests',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.HOBBIES]: 'Hobbies',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.VALUES]: 'Values',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.LIFESTYLE]: 'Lifestyle',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.PERSONALITY]: 'Personality',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.SOCIAL_MEDIA]: 'Social Media',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.FRIEND_ACTIVITY]: 'Friend Activity',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.COMMUNITY]: 'Community',
    [AI_PERSONALIZATION_TYPE.SUB_TYPES.INFLUENCER]: 'Influencer',
  };
  return labels[subType] || 'Unknown';
}

export function getPersonalizationSourceLabel(source: AIPersonalizationSource): string {
  const labels: Record<AIPersonalizationSource, string> = {
    [AI_PERSONALIZATION_TYPE.SOURCES.FIRST_PARTY]: 'First Party',
    [AI_PERSONALIZATION_TYPE.SOURCES.SECOND_PARTY]: 'Second Party',
    [AI_PERSONALIZATION_TYPE.SOURCES.THIRD_PARTY]: 'Third Party',
    [AI_PERSONALIZATION_TYPE.SOURCES.EXPLICIT]: 'Explicit',
    [AI_PERSONALIZATION_TYPE.SOURCES.IMPLICIT]: 'Implicit',
    [AI_PERSONALIZATION_TYPE.SOURCES.INFERRED]: 'Inferred',
    [AI_PERSONALIZATION_TYPE.SOURCES.PREDICTED]: 'Predicted',
  };
  return labels[source] || 'Unknown';
}

export function getPersonalizationModeLabel(mode: AIPersonalizationMode): string {
  const labels: Record<AIPersonalizationMode, string> = {
    [AI_PERSONALIZATION_TYPE.MODES.EXPLICIT]: 'Explicit',
    [AI_PERSONALIZATION_TYPE.MODES.IMPLICIT]: 'Implicit',
    [AI_PERSONALIZATION_TYPE.MODES.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION_TYPE.MODES.ADAPTIVE]: 'Adaptive',
    [AI_PERSONALIZATION_TYPE.MODES.PREDICTIVE]: 'Predictive',
    [AI_PERSONALIZATION_TYPE.MODES.REACTIVE]: 'Reactive',
    [AI_PERSONALIZATION_TYPE.MODES.PROACTIVE]: 'Proactive',
  };
  return labels[mode] || 'Unknown';
}

export function getPersonalizationLevelLabel(level: AIPersonalizationLevel): string {
  const labels: Record<AIPersonalizationLevel, string> = {
    [AI_PERSONALIZATION_TYPE.LEVELS.NONE]: 'None',
    [AI_PERSONALIZATION_TYPE.LEVELS.BASIC]: 'Basic',
    [AI_PERSONALIZATION_TYPE.LEVELS.STANDARD]: 'Standard',
    [AI_PERSONALIZATION_TYPE.LEVELS.ADVANCED]: 'Advanced',
    [AI_PERSONALIZATION_TYPE.LEVELS.PREMIUM]: 'Premium',
    [AI_PERSONALIZATION_TYPE.LEVELS.ULTIMATE]: 'Ultimate',
  };
  return labels[level] || 'Unknown';
}
