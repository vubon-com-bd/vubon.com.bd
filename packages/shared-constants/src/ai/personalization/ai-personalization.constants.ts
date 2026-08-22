/**
 * AI Personalization Constants
 * Configuration for AI personalization systems and features
 */

export const AI_PERSONALIZATION = {
  // Personalization Types
  TYPES: {
    USER_PROFILE: 'user_profile',
    BEHAVIORAL: 'behavioral',
    CONTEXTUAL: 'contextual',
    COLLABORATIVE: 'collaborative',
    HYBRID: 'hybrid',
    REAL_TIME: 'real_time',
    BATCH: 'batch',
    RULE_BASED: 'rule_based',
    ML_BASED: 'ml_based',
    DEEP_LEARNING: 'deep_learning',
    REINFORCEMENT: 'reinforcement',
  } as const,

  // Personalization Status
  STATUSES: {
    PENDING: 'pending',
    INITIALIZING: 'initializing',
    PROCESSING: 'processing',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
    PERSONALIZED: 'personalized',
    CACHED: 'cached',
  } as const,

  // Personalization Scopes
  SCOPES: {
    GLOBAL: 'global',
    USER: 'user',
    SESSION: 'session',
    DEVICE: 'device',
    LOCATION: 'location',
    TIME: 'time',
    CATEGORY: 'category',
    BRAND: 'brand',
    PRODUCT: 'product',
    SEARCH: 'search',
    BROWSE: 'browse',
    CART: 'cart',
    CHECKOUT: 'checkout',
    WISHLIST: 'wishlist',
    EMAIL: 'email',
    PUSH: 'push',
    SMS: 'sms',
    WEB: 'web',
    APP: 'app',
  } as const,

  // Personalization Strategies
  STRATEGIES: {
    CONTENT_BASED: 'content_based',
    COLLABORATIVE_FILTERING: 'collaborative_filtering',
    HYBRID: 'hybrid',
    CONTEXT_AWARE: 'context_aware',
    TIME_AWARE: 'time_aware',
    LOCATION_AWARE: 'location_aware',
    DEVICE_AWARE: 'device_aware',
    SOCIAL_AWARE: 'social_aware',
    DEMOGRAPHIC: 'demographic',
    BEHAVIORAL: 'behavioral',
    SEQUENTIAL: 'sequential',
    REINFORCEMENT_LEARNING: 'reinforcement_learning',
    BANDIT: 'bandit',
    EXPLORE_EXPLOIT: 'explore_exploit',
    ACTIVE_LEARNING: 'active_learning',
    ONLINE_LEARNING: 'online_learning',
  } as const,

  // Personalization Parameters
  PARAMETERS: {
    USER_ID: 'user_id',
    SESSION_ID: 'session_id',
    DEVICE_ID: 'device_id',
    IP_ADDRESS: 'ip_address',
    LOCATION: 'location',
    TIMEZONE: 'timezone',
    LANGUAGE: 'language',
    CURRENCY: 'currency',
    AGE: 'age',
    GENDER: 'gender',
    OCCUPATION: 'occupation',
    INTERESTS: 'interests',
    PREFERENCES: 'preferences',
    BEHAVIOR: 'behavior',
    HISTORY: 'history',
    CONTEXT: 'context',
    INTENT: 'intent',
    SENTIMENT: 'sentiment',
    ENGAGEMENT: 'engagement',
  } as const,

  // Personalization Weights
  WEIGHTS: {
    USER_PROFILE: 0.3,
    BEHAVIORAL: 0.25,
    CONTEXTUAL: 0.2,
    COLLABORATIVE: 0.15,
    SOCIAL: 0.1,
  } as const,

  // Personalization Limits
  LIMITS: {
    MAX_ATTRIBUTES: 50,
    MAX_SEGMENTS: 100,
    MAX_RULES: 200,
    MAX_STRATEGIES: 10,
    CACHE_SIZE: 10000,
    BATCH_SIZE: 100,
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Personalization Confidence
  CONFIDENCE: {
    VERY_LOW: 0,
    LOW: 25,
    MEDIUM: 50,
    HIGH: 75,
    VERY_HIGH: 90,
    MAXIMUM: 100,
  } as const,

  // Personalization Events
  EVENTS: {
    VIEW: 'view',
    CLICK: 'click',
    HOVER: 'hover',
    SCROLL: 'scroll',
    SEARCH: 'search',
    ADD_TO_CART: 'add_to_cart',
    REMOVE_FROM_CART: 'remove_from_cart',
    PURCHASE: 'purchase',
    WISHLIST: 'wishlist',
    SHARE: 'share',
    RATE: 'rate',
    REVIEW: 'review',
    COMPARE: 'compare',
    FILTER: 'filter',
    SORT: 'sort',
    PAGE_VIEW: 'page_view',
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',
  } as const,

  // Personalization Metrics
  METRICS: {
    RELEVANCE: 'relevance',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    SATISFACTION: 'satisfaction',
    LOYALTY: 'loyalty',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    ROI: 'roi',
    LIFETIME_VALUE: 'lifetime_value',
    CHURN_RATE: 'churn_rate',
    CLICK_THROUGH: 'click_through',
    BOUNCE_RATE: 'bounce_rate',
    TIME_ON_SITE: 'time_on_site',
    PAGES_PER_SESSION: 'pages_per_session',
  } as const,
} as const;

// Personalization Types
export type AIPersonalizationType =
  (typeof AI_PERSONALIZATION.TYPES)[keyof typeof AI_PERSONALIZATION.TYPES];

// Personalization Status
export type AIPersonalizationStatus =
  (typeof AI_PERSONALIZATION.STATUSES)[keyof typeof AI_PERSONALIZATION.STATUSES];

// Personalization Scopes
export type AIPersonalizationScope =
  (typeof AI_PERSONALIZATION.SCOPES)[keyof typeof AI_PERSONALIZATION.SCOPES];

// Personalization Strategies
export type AIPersonalizationStrategy =
  (typeof AI_PERSONALIZATION.STRATEGIES)[keyof typeof AI_PERSONALIZATION.STRATEGIES];

// Personalization Parameters
export type AIPersonalizationParameter =
  (typeof AI_PERSONALIZATION.PARAMETERS)[keyof typeof AI_PERSONALIZATION.PARAMETERS];

// Personalization Weights
export type AIPersonalizationWeight =
  (typeof AI_PERSONALIZATION.WEIGHTS)[keyof typeof AI_PERSONALIZATION.WEIGHTS];

// Personalization Limits
export type AIPersonalizationLimit =
  (typeof AI_PERSONALIZATION.LIMITS)[keyof typeof AI_PERSONALIZATION.LIMITS];

// Personalization Confidence
export type AIPersonalizationConfidence =
  (typeof AI_PERSONALIZATION.CONFIDENCE)[keyof typeof AI_PERSONALIZATION.CONFIDENCE];

// Personalization Events
export type AIPersonalizationEvent =
  (typeof AI_PERSONALIZATION.EVENTS)[keyof typeof AI_PERSONALIZATION.EVENTS];

// Personalization Metrics
export type AIPersonalizationMetric =
  (typeof AI_PERSONALIZATION.METRICS)[keyof typeof AI_PERSONALIZATION.METRICS];

// Utility Functions
export function getPersonalizationTypeLabel(type: AIPersonalizationType): string {
  const labels: Record<AIPersonalizationType, string> = {
    [AI_PERSONALIZATION.TYPES.USER_PROFILE]: 'User Profile',
    [AI_PERSONALIZATION.TYPES.BEHAVIORAL]: 'Behavioral',
    [AI_PERSONALIZATION.TYPES.CONTEXTUAL]: 'Contextual',
    [AI_PERSONALIZATION.TYPES.COLLABORATIVE]: 'Collaborative',
    [AI_PERSONALIZATION.TYPES.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION.TYPES.REAL_TIME]: 'Real Time',
    [AI_PERSONALIZATION.TYPES.BATCH]: 'Batch',
    [AI_PERSONALIZATION.TYPES.RULE_BASED]: 'Rule Based',
    [AI_PERSONALIZATION.TYPES.ML_BASED]: 'ML Based',
    [AI_PERSONALIZATION.TYPES.DEEP_LEARNING]: 'Deep Learning',
    [AI_PERSONALIZATION.TYPES.REINFORCEMENT]: 'Reinforcement',
  };
  return labels[type] || 'Unknown';
}

export function getPersonalizationStatusLabel(status: AIPersonalizationStatus): string {
  const labels: Record<AIPersonalizationStatus, string> = {
    [AI_PERSONALIZATION.STATUSES.PENDING]: 'Pending',
    [AI_PERSONALIZATION.STATUSES.INITIALIZING]: 'Initializing',
    [AI_PERSONALIZATION.STATUSES.PROCESSING]: 'Processing',
    [AI_PERSONALIZATION.STATUSES.GENERATING]: 'Generating',
    [AI_PERSONALIZATION.STATUSES.COMPLETED]: 'Completed',
    [AI_PERSONALIZATION.STATUSES.DELIVERED]: 'Delivered',
    [AI_PERSONALIZATION.STATUSES.FAILED]: 'Failed',
    [AI_PERSONALIZATION.STATUSES.EXPIRED]: 'Expired',
    [AI_PERSONALIZATION.STATUSES.ARCHIVED]: 'Archived',
    [AI_PERSONALIZATION.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_PERSONALIZATION.STATUSES.PERSONALIZED]: 'Personalized',
    [AI_PERSONALIZATION.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getPersonalizationScopeLabel(scope: AIPersonalizationScope): string {
  const labels: Record<AIPersonalizationScope, string> = {
    [AI_PERSONALIZATION.SCOPES.GLOBAL]: 'Global',
    [AI_PERSONALIZATION.SCOPES.USER]: 'User',
    [AI_PERSONALIZATION.SCOPES.SESSION]: 'Session',
    [AI_PERSONALIZATION.SCOPES.DEVICE]: 'Device',
    [AI_PERSONALIZATION.SCOPES.LOCATION]: 'Location',
    [AI_PERSONALIZATION.SCOPES.TIME]: 'Time',
    [AI_PERSONALIZATION.SCOPES.CATEGORY]: 'Category',
    [AI_PERSONALIZATION.SCOPES.BRAND]: 'Brand',
    [AI_PERSONALIZATION.SCOPES.PRODUCT]: 'Product',
    [AI_PERSONALIZATION.SCOPES.SEARCH]: 'Search',
    [AI_PERSONALIZATION.SCOPES.BROWSE]: 'Browse',
    [AI_PERSONALIZATION.SCOPES.CART]: 'Cart',
    [AI_PERSONALIZATION.SCOPES.CHECKOUT]: 'Checkout',
    [AI_PERSONALIZATION.SCOPES.WISHLIST]: 'Wishlist',
    [AI_PERSONALIZATION.SCOPES.EMAIL]: 'Email',
    [AI_PERSONALIZATION.SCOPES.PUSH]: 'Push',
    [AI_PERSONALIZATION.SCOPES.SMS]: 'SMS',
    [AI_PERSONALIZATION.SCOPES.WEB]: 'Web',
    [AI_PERSONALIZATION.SCOPES.APP]: 'App',
  };
  return labels[scope] || 'Unknown';
}

export function getPersonalizationStrategyLabel(strategy: AIPersonalizationStrategy): string {
  const labels: Record<AIPersonalizationStrategy, string> = {
    [AI_PERSONALIZATION.STRATEGIES.CONTENT_BASED]: 'Content Based',
    [AI_PERSONALIZATION.STRATEGIES.COLLABORATIVE_FILTERING]: 'Collaborative Filtering',
    [AI_PERSONALIZATION.STRATEGIES.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION.STRATEGIES.CONTEXT_AWARE]: 'Context Aware',
    [AI_PERSONALIZATION.STRATEGIES.TIME_AWARE]: 'Time Aware',
    [AI_PERSONALIZATION.STRATEGIES.LOCATION_AWARE]: 'Location Aware',
    [AI_PERSONALIZATION.STRATEGIES.DEVICE_AWARE]: 'Device Aware',
    [AI_PERSONALIZATION.STRATEGIES.SOCIAL_AWARE]: 'Social Aware',
    [AI_PERSONALIZATION.STRATEGIES.DEMOGRAPHIC]: 'Demographic',
    [AI_PERSONALIZATION.STRATEGIES.BEHAVIORAL]: 'Behavioral',
    [AI_PERSONALIZATION.STRATEGIES.SEQUENTIAL]: 'Sequential',
    [AI_PERSONALIZATION.STRATEGIES.REINFORCEMENT_LEARNING]: 'Reinforcement Learning',
    [AI_PERSONALIZATION.STRATEGIES.BANDIT]: 'Bandit',
    [AI_PERSONALIZATION.STRATEGIES.EXPLORE_EXPLOIT]: 'Explore Exploit',
    [AI_PERSONALIZATION.STRATEGIES.ACTIVE_LEARNING]: 'Active Learning',
    [AI_PERSONALIZATION.STRATEGIES.ONLINE_LEARNING]: 'Online Learning',
  };
  return labels[strategy] || 'Unknown';
}

export function getPersonalizationEventLabel(event: AIPersonalizationEvent): string {
  const labels: Record<AIPersonalizationEvent, string> = {
    [AI_PERSONALIZATION.EVENTS.VIEW]: 'View',
    [AI_PERSONALIZATION.EVENTS.CLICK]: 'Click',
    [AI_PERSONALIZATION.EVENTS.HOVER]: 'Hover',
    [AI_PERSONALIZATION.EVENTS.SCROLL]: 'Scroll',
    [AI_PERSONALIZATION.EVENTS.SEARCH]: 'Search',
    [AI_PERSONALIZATION.EVENTS.ADD_TO_CART]: 'Add to Cart',
    [AI_PERSONALIZATION.EVENTS.REMOVE_FROM_CART]: 'Remove from Cart',
    [AI_PERSONALIZATION.EVENTS.PURCHASE]: 'Purchase',
    [AI_PERSONALIZATION.EVENTS.WISHLIST]: 'Wishlist',
    [AI_PERSONALIZATION.EVENTS.SHARE]: 'Share',
    [AI_PERSONALIZATION.EVENTS.RATE]: 'Rate',
    [AI_PERSONALIZATION.EVENTS.REVIEW]: 'Review',
    [AI_PERSONALIZATION.EVENTS.COMPARE]: 'Compare',
    [AI_PERSONALIZATION.EVENTS.FILTER]: 'Filter',
    [AI_PERSONALIZATION.EVENTS.SORT]: 'Sort',
    [AI_PERSONALIZATION.EVENTS.PAGE_VIEW]: 'Page View',
    [AI_PERSONALIZATION.EVENTS.SESSION_START]: 'Session Start',
    [AI_PERSONALIZATION.EVENTS.SESSION_END]: 'Session End',
  };
  return labels[event] || 'Unknown';
}

export function getPersonalizationMetricLabel(metric: AIPersonalizationMetric): string {
  const labels: Record<AIPersonalizationMetric, string> = {
    [AI_PERSONALIZATION.METRICS.RELEVANCE]: 'Relevance',
    [AI_PERSONALIZATION.METRICS.ENGAGEMENT]: 'Engagement',
    [AI_PERSONALIZATION.METRICS.CONVERSION]: 'Conversion',
    [AI_PERSONALIZATION.METRICS.RETENTION]: 'Retention',
    [AI_PERSONALIZATION.METRICS.SATISFACTION]: 'Satisfaction',
    [AI_PERSONALIZATION.METRICS.LOYALTY]: 'Loyalty',
    [AI_PERSONALIZATION.METRICS.REVENUE]: 'Revenue',
    [AI_PERSONALIZATION.METRICS.PROFIT]: 'Profit',
    [AI_PERSONALIZATION.METRICS.ROI]: 'ROI',
    [AI_PERSONALIZATION.METRICS.LIFETIME_VALUE]: 'Lifetime Value',
    [AI_PERSONALIZATION.METRICS.CHURN_RATE]: 'Churn Rate',
    [AI_PERSONALIZATION.METRICS.CLICK_THROUGH]: 'Click Through',
    [AI_PERSONALIZATION.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [AI_PERSONALIZATION.METRICS.TIME_ON_SITE]: 'Time on Site',
    [AI_PERSONALIZATION.METRICS.PAGES_PER_SESSION]: 'Pages per Session',
  };
  return labels[metric] || 'Unknown';
}

export function isPersonalizationActive(status: AIPersonalizationStatus): boolean {
  const activeStatuses: AIPersonalizationStatus[] = [
    AI_PERSONALIZATION.STATUSES.PENDING,
    AI_PERSONALIZATION.STATUSES.INITIALIZING,
    AI_PERSONALIZATION.STATUSES.PROCESSING,
    AI_PERSONALIZATION.STATUSES.GENERATING,
    AI_PERSONALIZATION.STATUSES.OPTIMIZED,
    AI_PERSONALIZATION.STATUSES.PERSONALIZED,
  ];
  return activeStatuses.includes(status);
}

export function isPersonalizationComplete(status: AIPersonalizationStatus): boolean {
  const completeStatuses: AIPersonalizationStatus[] = [
    AI_PERSONALIZATION.STATUSES.COMPLETED,
    AI_PERSONALIZATION.STATUSES.DELIVERED,
    AI_PERSONALIZATION.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function isPersonalizationFailed(status: AIPersonalizationStatus): boolean {
  return status === AI_PERSONALIZATION.STATUSES.FAILED;
}

export function getPersonalizationWeight(strategy: AIPersonalizationStrategy): number {
  const weights: Record<AIPersonalizationStrategy, number> = {
    [AI_PERSONALIZATION.STRATEGIES.CONTENT_BASED]: AI_PERSONALIZATION.WEIGHTS.USER_PROFILE,
    [AI_PERSONALIZATION.STRATEGIES.COLLABORATIVE_FILTERING]:
      AI_PERSONALIZATION.WEIGHTS.COLLABORATIVE,
    [AI_PERSONALIZATION.STRATEGIES.HYBRID]: AI_PERSONALIZATION.WEIGHTS.USER_PROFILE,
    [AI_PERSONALIZATION.STRATEGIES.CONTEXT_AWARE]: AI_PERSONALIZATION.WEIGHTS.CONTEXTUAL,
    [AI_PERSONALIZATION.STRATEGIES.TIME_AWARE]: AI_PERSONALIZATION.WEIGHTS.CONTEXTUAL,
    [AI_PERSONALIZATION.STRATEGIES.LOCATION_AWARE]: AI_PERSONALIZATION.WEIGHTS.CONTEXTUAL,
    [AI_PERSONALIZATION.STRATEGIES.DEVICE_AWARE]: AI_PERSONALIZATION.WEIGHTS.CONTEXTUAL,
    [AI_PERSONALIZATION.STRATEGIES.SOCIAL_AWARE]: AI_PERSONALIZATION.WEIGHTS.SOCIAL,
    [AI_PERSONALIZATION.STRATEGIES.DEMOGRAPHIC]: AI_PERSONALIZATION.WEIGHTS.USER_PROFILE,
    [AI_PERSONALIZATION.STRATEGIES.BEHAVIORAL]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
    [AI_PERSONALIZATION.STRATEGIES.SEQUENTIAL]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
    [AI_PERSONALIZATION.STRATEGIES.REINFORCEMENT_LEARNING]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
    [AI_PERSONALIZATION.STRATEGIES.BANDIT]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
    [AI_PERSONALIZATION.STRATEGIES.EXPLORE_EXPLOIT]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
    [AI_PERSONALIZATION.STRATEGIES.ACTIVE_LEARNING]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
    [AI_PERSONALIZATION.STRATEGIES.ONLINE_LEARNING]: AI_PERSONALIZATION.WEIGHTS.BEHAVIORAL,
  };
  return weights[strategy] || AI_PERSONALIZATION.WEIGHTS.USER_PROFILE;
}
