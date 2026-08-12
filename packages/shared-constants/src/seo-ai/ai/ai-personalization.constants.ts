/**
 * ডিফল্ট সেগমেন্ট সাইজ
 */
export const AI_PERSONALIZATION_DEFAULT_SEGMENT_SIZE = 1000 as const;

/**
 * আপডেট ইন্টারভাল (ঘন্টায়)
 */
export const AI_PERSONALIZATION_UPDATE_INTERVAL = 24 as const; // 24 hours

/**
 * ন্যূনতম স্যাম্পল সংখ্যা
 */
export const AI_PERSONALIZATION_MIN_SAMPLES = 50 as const;

/**
 * সর্বোচ্চ সেগমেন্ট সংখ্যা
 */
export const AI_PERSONALIZATION_MAX_SEGMENTS = 100 as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি এনাম
 */
export const AI_PERSONALIZATION_STRATEGY = {
  RULE_BASED: 'rule-based',
  ML_BASED: 'ml-based',
  HYBRID: 'hybrid',
  CONTEXTUAL: 'contextual',
  COLLABORATIVE: 'collaborative',
  CONTENT_BASED: 'content-based',
} as const;

/**
 * AI_PERSONALIZATION_STRATEGY থেকে টাইপ
 */
export type AIPersonalizationStrategy =
  (typeof AI_PERSONALIZATION_STRATEGY)[keyof typeof AI_PERSONALIZATION_STRATEGY];

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি লেবেল
 */
export const AI_PERSONALIZATION_STRATEGY_LABELS: Record<AIPersonalizationStrategy, string> = {
  [AI_PERSONALIZATION_STRATEGY.RULE_BASED]: 'Rule Based',
  [AI_PERSONALIZATION_STRATEGY.ML_BASED]: 'ML Based',
  [AI_PERSONALIZATION_STRATEGY.HYBRID]: 'Hybrid',
  [AI_PERSONALIZATION_STRATEGY.CONTEXTUAL]: 'Contextual',
  [AI_PERSONALIZATION_STRATEGY.COLLABORATIVE]: 'Collaborative',
  [AI_PERSONALIZATION_STRATEGY.CONTENT_BASED]: 'Content Based',
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি বিবরণ
 */
export const AI_PERSONALIZATION_STRATEGY_DESCRIPTIONS: Record<AIPersonalizationStrategy, string> = {
  [AI_PERSONALIZATION_STRATEGY.RULE_BASED]:
    'Uses predefined rules and business logic for personalization',
  [AI_PERSONALIZATION_STRATEGY.ML_BASED]:
    'Uses machine learning models for advanced personalization',
  [AI_PERSONALIZATION_STRATEGY.HYBRID]: 'Combines rule-based and ML-based approaches',
  [AI_PERSONALIZATION_STRATEGY.CONTEXTUAL]:
    'Considers contextual signals like time, location, device',
  [AI_PERSONALIZATION_STRATEGY.COLLABORATIVE]:
    'Uses collaborative filtering based on user behavior',
  [AI_PERSONALIZATION_STRATEGY.CONTENT_BASED]: 'Uses content features for personalization',
} as const;

/**
 * পার্সোনালাইজেশন ডেটা টাইপ এনাম
 */
export const AI_PERSONALIZATION_DATA_TYPE = {
  USER_BEHAVIOR: 'user-behavior',
  USER_PREFERENCES: 'user-preferences',
  USER_DEMOGRAPHICS: 'user-demographics',
  USER_HISTORY: 'user-history',
  SESSION_DATA: 'session-data',
  CONTEXTUAL_DATA: 'contextual-data',
  FEEDBACK_DATA: 'feedback-data',
} as const;

/**
 * AI_PERSONALIZATION_DATA_TYPE থেকে টাইপ
 */
export type AIPersonalizationDataType =
  (typeof AI_PERSONALIZATION_DATA_TYPE)[keyof typeof AI_PERSONALIZATION_DATA_TYPE];

/**
 * পার্সোনালাইজেশন ডেটা টাইপ লেবেল
 */
export const AI_PERSONALIZATION_DATA_TYPE_LABELS: Record<AIPersonalizationDataType, string> = {
  [AI_PERSONALIZATION_DATA_TYPE.USER_BEHAVIOR]: 'User Behavior',
  [AI_PERSONALIZATION_DATA_TYPE.USER_PREFERENCES]: 'User Preferences',
  [AI_PERSONALIZATION_DATA_TYPE.USER_DEMOGRAPHICS]: 'User Demographics',
  [AI_PERSONALIZATION_DATA_TYPE.USER_HISTORY]: 'User History',
  [AI_PERSONALIZATION_DATA_TYPE.SESSION_DATA]: 'Session Data',
  [AI_PERSONALIZATION_DATA_TYPE.CONTEXTUAL_DATA]: 'Contextual Data',
  [AI_PERSONALIZATION_DATA_TYPE.FEEDBACK_DATA]: 'Feedback Data',
} as const;

/**
 * পার্সোনালাইজেশন কনফিগারেশন
 */
export interface AIPersonalizationConfig {
  segmentSize: number;
  updateInterval: number; // hours
  minSamples: number;
  maxSegments: number;
  strategy: AIPersonalizationStrategy;
  enableRealTime: boolean;
  enableBatchProcessing: boolean;
  enableFeedbackLoop: boolean;
}

/**
 * পার্সোনালাইজেশন ডিফল্ট কনফিগারেশন
 */
export const AI_PERSONALIZATION_DEFAULT_CONFIG: AIPersonalizationConfig = {
  segmentSize: AI_PERSONALIZATION_DEFAULT_SEGMENT_SIZE,
  updateInterval: AI_PERSONALIZATION_UPDATE_INTERVAL,
  minSamples: AI_PERSONALIZATION_MIN_SAMPLES,
  maxSegments: AI_PERSONALIZATION_MAX_SEGMENTS,
  strategy: AI_PERSONALIZATION_STRATEGY.HYBRID,
  enableRealTime: true,
  enableBatchProcessing: true,
  enableFeedbackLoop: true,
} as const;

/**
 * পার্সোনালাইজেশন ফিল্টার
 */
export interface AIPersonalizationFilter {
  strategy?: AIPersonalizationStrategy;
  dataTypes?: AIPersonalizationDataType[];
  segmentSize?: number;
  minSamples?: number;
  maxSegments?: number;
  startDate?: Date;
  endDate?: Date;
  userIds?: string[];
  sessionIds?: string[];
}

/**
 * পার্সোনালাইজেশন সেগমেন্ট
 */
export interface AIPersonalizationSegment {
  id: string;
  name: string;
  description?: string;
  size: number;
  criteria: Record<string, unknown>;
  strategy: AIPersonalizationStrategy;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

/**
 * পার্সোনালাইজেশন প্রোফাইল
 */
export interface AIPersonalizationProfile {
  userId: string;
  segments: AIPersonalizationSegment[];
  preferences: Record<string, unknown>;
  behavior: Record<string, unknown>;
  history: Record<string, unknown>;
  updatedAt: Date;
}

/**
 * পার্সোনালাইজেশন রেসপন্স
 */
export interface AIPersonalizationResponse {
  userId: string;
  segments: AIPersonalizationSegment[];
  recommendations: unknown[];
  metadata: {
    strategy: AIPersonalizationStrategy;
    processingTime: number;
    segmentCount: number;
    timestamp: Date;
  };
}

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি ক্যাটাগরি
 */
export const AI_PERSONALIZATION_STRATEGY_CATEGORIES = {
  TRADITIONAL: [
    AI_PERSONALIZATION_STRATEGY.RULE_BASED,
    AI_PERSONALIZATION_STRATEGY.CONTENT_BASED,
  ] as const,
  ADVANCED: [
    AI_PERSONALIZATION_STRATEGY.ML_BASED,
    AI_PERSONALIZATION_STRATEGY.COLLABORATIVE,
  ] as const,
  HYBRID: [AI_PERSONALIZATION_STRATEGY.HYBRID] as const,
  CONTEXTUAL: [AI_PERSONALIZATION_STRATEGY.CONTEXTUAL] as const,
} as const;

/**
 * পার্সোনালাইজেশন স্ট্র্যাটেজি ক্যাটাগরি লেবেল
 */
export const AI_PERSONALIZATION_STRATEGY_CATEGORY_LABELS = {
  TRADITIONAL: 'Traditional',
  ADVANCED: 'Advanced',
  HYBRID: 'Hybrid',
  CONTEXTUAL: 'Contextual',
} as const;

/**
 * পার্সোনালাইজেশন ডেটা টাইপ গ্রুপ
 */
export const AI_PERSONALIZATION_DATA_TYPE_GROUPS = {
  USER_CENTRIC: [
    AI_PERSONALIZATION_DATA_TYPE.USER_BEHAVIOR,
    AI_PERSONALIZATION_DATA_TYPE.USER_PREFERENCES,
    AI_PERSONALIZATION_DATA_TYPE.USER_DEMOGRAPHICS,
    AI_PERSONALIZATION_DATA_TYPE.USER_HISTORY,
  ] as const,
  SESSION_CENTRIC: [AI_PERSONALIZATION_DATA_TYPE.SESSION_DATA] as const,
  CONTEXT_CENTRIC: [AI_PERSONALIZATION_DATA_TYPE.CONTEXTUAL_DATA] as const,
  FEEDBACK_CENTRIC: [AI_PERSONALIZATION_DATA_TYPE.FEEDBACK_DATA] as const,
} as const;

/**
 * পার্সোনালাইজেশন ডেটা টাইপ গ্রুপ লেবেল
 */
export const AI_PERSONALIZATION_DATA_TYPE_GROUP_LABELS = {
  USER_CENTRIC: 'User Centric',
  SESSION_CENTRIC: 'Session Centric',
  CONTEXT_CENTRIC: 'Context Centric',
  FEEDBACK_CENTRIC: 'Feedback Centric',
} as const;
