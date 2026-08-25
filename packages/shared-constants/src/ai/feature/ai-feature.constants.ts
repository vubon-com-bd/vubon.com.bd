/**
 * AI Feature Constants
 * Configuration for AI features and capabilities
 */

// First define the TYPES separately
export const AI_FEATURE_TYPES = {
  // Core Features
  SMART_SEARCH: 'smart_search',
  RECOMMENDATION_ENGINE: 'recommendation_engine',
  PERSONALIZED_CONTENT: 'personalized_content',
  BEHAVIORAL_ANALYTICS: 'behavioral_analytics',
  PREDICTIVE_ANALYTICS: 'predictive_analytics',

  // Natural Language Features
  TEXT_CLASSIFICATION: 'text_classification',
  TEXT_GENERATION: 'text_generation',
  TEXT_SUMMARIZATION: 'text_summarization',
  SENTIMENT_ANALYSIS: 'sentiment_analysis',
  NAMED_ENTITY_RECOGNITION: 'named_entity_recognition',
  LANGUAGE_TRANSLATION: 'language_translation',
  QUESTION_ANSWERING: 'question_answering',

  // Vision Features
  IMAGE_CLASSIFICATION: 'image_classification',
  OBJECT_DETECTION: 'object_detection',
  IMAGE_SEGMENTATION: 'image_segmentation',
  FACE_RECOGNITION: 'face_recognition',
  OPTICAL_CHARACTER_RECOGNITION: 'optical_character_recognition',

  // Speech Features
  SPEECH_TO_TEXT: 'speech_to_text',
  TEXT_TO_SPEECH: 'text_to_speech',
  VOICE_RECOGNITION: 'voice_recognition',
  AUDIO_CLASSIFICATION: 'audio_classification',

  // Advanced Features
  CHATBOT: 'chatbot',
  VIRTUAL_ASSISTANT: 'virtual_assistant',
  AUTOMATED_REASONING: 'automated_reasoning',
  DECISION_MAKING: 'decision_making',
  ANOMALY_DETECTION: 'anomaly_detection',
  FRAUD_DETECTION: 'fraud_detection',
  PRICE_OPTIMIZATION: 'price_optimization',
  DEMAND_FORECASTING: 'demand_forecasting',
  INVENTORY_OPTIMIZATION: 'inventory_optimization',
  CUSTOMER_SEGMENTATION: 'customer_segmentation',
  CHURN_PREDICTION: 'churn_prediction',
  LIFETIME_VALUE_PREDICTION: 'lifetime_value_prediction',
} as const;

export type AIFeatureType = (typeof AI_FEATURE_TYPES)[keyof typeof AI_FEATURE_TYPES];

export const AI_FEATURE = {
  // Feature Categories
  CATEGORIES: {
    RECOMMENDATION: 'recommendation',
    PERSONALIZATION: 'personalization',
    SEARCH: 'search',
    ANALYTICS: 'analytics',
    RANKING: 'ranking',
    TRAINING: 'training',
    PREDICTION: 'prediction',
    CLASSIFICATION: 'classification',
    GENERATION: 'generation',
    TRANSLATION: 'translation',
    SUMMARIZATION: 'summarization',
    SENTIMENT: 'sentiment',
    VISION: 'vision',
    SPEECH: 'speech',
    NLP: 'nlp',
    CHATBOT: 'chatbot',
    AUTOMATION: 'automation',
    OPTIMIZATION: 'optimization',
    FORECASTING: 'forecasting',
    ANOMALY: 'anomaly',
  } as const,

  // Feature Types - using pre-defined types
  TYPES: AI_FEATURE_TYPES,

  // Feature Status
  STATUSES: {
    PENDING: 'pending',
    DEVELOPMENT: 'development',
    TESTING: 'testing',
    STAGING: 'staging',
    PRODUCTION: 'production',
    DEPRECATED: 'deprecated',
    RETIRED: 'retired',
    BETA: 'beta',
    EARLY_ACCESS: 'early_access',
    PUBLIC: 'public',
    PRIVATE: 'private',
  } as const,

  // Feature Levels
  LEVELS: {
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    CUSTOM: 'custom',
  } as const,

  // Feature Access
  ACCESS: {
    PUBLIC: 'public',
    AUTHENTICATED: 'authenticated',
    AUTHORIZED: 'authorized',
    ADMIN: 'admin',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    BETA: 'beta',
    INTERNAL: 'internal',
  } as const,

  // Feature Dependencies - using pre-defined types
  DEPENDENCIES: {
    [AI_FEATURE_TYPES.RECOMMENDATION_ENGINE]: [
      AI_FEATURE_TYPES.PERSONALIZED_CONTENT,
      AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS,
    ],
    [AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS]: [
      AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS,
      AI_FEATURE_TYPES.TEXT_CLASSIFICATION,
    ],
    [AI_FEATURE_TYPES.CHATBOT]: [
      AI_FEATURE_TYPES.TEXT_GENERATION,
      AI_FEATURE_TYPES.SENTIMENT_ANALYSIS,
      AI_FEATURE_TYPES.NAMED_ENTITY_RECOGNITION,
    ],
    [AI_FEATURE_TYPES.VIRTUAL_ASSISTANT]: [
      AI_FEATURE_TYPES.SPEECH_TO_TEXT,
      AI_FEATURE_TYPES.TEXT_TO_SPEECH,
      AI_FEATURE_TYPES.QUESTION_ANSWERING,
    ],
    [AI_FEATURE_TYPES.PRICE_OPTIMIZATION]: [
      AI_FEATURE_TYPES.DEMAND_FORECASTING,
      AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS,
    ],
    [AI_FEATURE_TYPES.FRAUD_DETECTION]: [
      AI_FEATURE_TYPES.ANOMALY_DETECTION,
      AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS,
    ],
    [AI_FEATURE_TYPES.SMART_SEARCH]: [
      AI_FEATURE_TYPES.TEXT_CLASSIFICATION,
      AI_FEATURE_TYPES.NAMED_ENTITY_RECOGNITION,
    ],
    [AI_FEATURE_TYPES.PERSONALIZED_CONTENT]: [
      AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS,
      AI_FEATURE_TYPES.TEXT_CLASSIFICATION,
    ],
    [AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.TEXT_GENERATION]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.TEXT_SUMMARIZATION]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.SENTIMENT_ANALYSIS]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.NAMED_ENTITY_RECOGNITION]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.LANGUAGE_TRANSLATION]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.QUESTION_ANSWERING]: [
      AI_FEATURE_TYPES.TEXT_CLASSIFICATION,
      AI_FEATURE_TYPES.NAMED_ENTITY_RECOGNITION,
    ],
    [AI_FEATURE_TYPES.IMAGE_CLASSIFICATION]: [],
    [AI_FEATURE_TYPES.OBJECT_DETECTION]: [AI_FEATURE_TYPES.IMAGE_CLASSIFICATION],
    [AI_FEATURE_TYPES.IMAGE_SEGMENTATION]: [AI_FEATURE_TYPES.IMAGE_CLASSIFICATION],
    [AI_FEATURE_TYPES.FACE_RECOGNITION]: [
      AI_FEATURE_TYPES.IMAGE_CLASSIFICATION,
      AI_FEATURE_TYPES.OBJECT_DETECTION,
    ],
    [AI_FEATURE_TYPES.OPTICAL_CHARACTER_RECOGNITION]: [AI_FEATURE_TYPES.IMAGE_CLASSIFICATION],
    [AI_FEATURE_TYPES.SPEECH_TO_TEXT]: [AI_FEATURE_TYPES.AUDIO_CLASSIFICATION],
    [AI_FEATURE_TYPES.TEXT_TO_SPEECH]: [AI_FEATURE_TYPES.TEXT_CLASSIFICATION],
    [AI_FEATURE_TYPES.VOICE_RECOGNITION]: [
      AI_FEATURE_TYPES.AUDIO_CLASSIFICATION,
      AI_FEATURE_TYPES.SPEECH_TO_TEXT,
    ],
    [AI_FEATURE_TYPES.AUDIO_CLASSIFICATION]: [],
    [AI_FEATURE_TYPES.TEXT_CLASSIFICATION]: [],
    [AI_FEATURE_TYPES.AUTOMATED_REASONING]: [AI_FEATURE_TYPES.DECISION_MAKING],
    [AI_FEATURE_TYPES.DECISION_MAKING]: [AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS],
    [AI_FEATURE_TYPES.ANOMALY_DETECTION]: [AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS],
    [AI_FEATURE_TYPES.DEMAND_FORECASTING]: [AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS],
    [AI_FEATURE_TYPES.INVENTORY_OPTIMIZATION]: [
      AI_FEATURE_TYPES.DEMAND_FORECASTING,
      AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS,
    ],
    [AI_FEATURE_TYPES.CUSTOMER_SEGMENTATION]: [AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS],
    [AI_FEATURE_TYPES.CHURN_PREDICTION]: [
      AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS,
      AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS,
    ],
    [AI_FEATURE_TYPES.LIFETIME_VALUE_PREDICTION]: [
      AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS,
      AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS,
    ],
  } as const,

  // Feature Limits
  LIMITS: {
    MAX_REQUESTS_PER_MINUTE: 100,
    MAX_REQUESTS_PER_DAY: 10000,
    MAX_REQUESTS_PER_USER: 1000,
    MAX_DATA_SIZE: 1024,
    MAX_CONCURRENT: 10,
    TIMEOUT: 30000,
  } as const,

  // Feature Metrics
  METRICS: {
    USAGE: 'usage',
    LATENCY: 'latency',
    ACCURACY: 'accuracy',
    RELIABILITY: 'reliability',
    SATISFACTION: 'satisfaction',
    ADOPTION: 'adoption',
    RETENTION: 'retention',
    IMPACT: 'impact',
    COST: 'cost',
    ROI: 'roi',
  } as const,
} as const;

export type AIFeatureCategory = (typeof AI_FEATURE.CATEGORIES)[keyof typeof AI_FEATURE.CATEGORIES];
export type AIFeatureStatus = (typeof AI_FEATURE.STATUSES)[keyof typeof AI_FEATURE.STATUSES];
export type AIFeatureLevel = (typeof AI_FEATURE.LEVELS)[keyof typeof AI_FEATURE.LEVELS];
export type AIFeatureAccess = (typeof AI_FEATURE.ACCESS)[keyof typeof AI_FEATURE.ACCESS];
export type AIFeatureLimit = (typeof AI_FEATURE.LIMITS)[keyof typeof AI_FEATURE.LIMITS];
export type AIFeatureMetric = (typeof AI_FEATURE.METRICS)[keyof typeof AI_FEATURE.METRICS];

export function getAiFeatureCategoryLabel(category: AIFeatureCategory): string {
  const labels: Record<AIFeatureCategory, string> = {
    [AI_FEATURE.CATEGORIES.RECOMMENDATION]: 'Recommendation',
    [AI_FEATURE.CATEGORIES.PERSONALIZATION]: 'Personalization',
    [AI_FEATURE.CATEGORIES.SEARCH]: 'Search',
    [AI_FEATURE.CATEGORIES.ANALYTICS]: 'Analytics',
    [AI_FEATURE.CATEGORIES.RANKING]: 'Ranking',
    [AI_FEATURE.CATEGORIES.TRAINING]: 'Training',
    [AI_FEATURE.CATEGORIES.PREDICTION]: 'Prediction',
    [AI_FEATURE.CATEGORIES.CLASSIFICATION]: 'Classification',
    [AI_FEATURE.CATEGORIES.GENERATION]: 'Generation',
    [AI_FEATURE.CATEGORIES.TRANSLATION]: 'Translation',
    [AI_FEATURE.CATEGORIES.SUMMARIZATION]: 'Summarization',
    [AI_FEATURE.CATEGORIES.SENTIMENT]: 'Sentiment',
    [AI_FEATURE.CATEGORIES.VISION]: 'Vision',
    [AI_FEATURE.CATEGORIES.SPEECH]: 'Speech',
    [AI_FEATURE.CATEGORIES.NLP]: 'NLP',
    [AI_FEATURE.CATEGORIES.CHATBOT]: 'Chatbot',
    [AI_FEATURE.CATEGORIES.AUTOMATION]: 'Automation',
    [AI_FEATURE.CATEGORIES.OPTIMIZATION]: 'Optimization',
    [AI_FEATURE.CATEGORIES.FORECASTING]: 'Forecasting',
    [AI_FEATURE.CATEGORIES.ANOMALY]: 'Anomaly',
  };
  return labels[category] || 'Unknown';
}

export function getAiFeatureTypeLabel(type: AIFeatureType): string {
  const labels: Record<AIFeatureType, string> = {
    [AI_FEATURE_TYPES.SMART_SEARCH]: 'Smart Search',
    [AI_FEATURE_TYPES.RECOMMENDATION_ENGINE]: 'Recommendation Engine',
    [AI_FEATURE_TYPES.PERSONALIZED_CONTENT]: 'Personalized Content',
    [AI_FEATURE_TYPES.BEHAVIORAL_ANALYTICS]: 'Behavioral Analytics',
    [AI_FEATURE_TYPES.PREDICTIVE_ANALYTICS]: 'Predictive Analytics',
    [AI_FEATURE_TYPES.TEXT_CLASSIFICATION]: 'Text Classification',
    [AI_FEATURE_TYPES.TEXT_GENERATION]: 'Text Generation',
    [AI_FEATURE_TYPES.TEXT_SUMMARIZATION]: 'Text Summarization',
    [AI_FEATURE_TYPES.SENTIMENT_ANALYSIS]: 'Sentiment Analysis',
    [AI_FEATURE_TYPES.NAMED_ENTITY_RECOGNITION]: 'Named Entity Recognition',
    [AI_FEATURE_TYPES.LANGUAGE_TRANSLATION]: 'Language Translation',
    [AI_FEATURE_TYPES.QUESTION_ANSWERING]: 'Question Answering',
    [AI_FEATURE_TYPES.IMAGE_CLASSIFICATION]: 'Image Classification',
    [AI_FEATURE_TYPES.OBJECT_DETECTION]: 'Object Detection',
    [AI_FEATURE_TYPES.IMAGE_SEGMENTATION]: 'Image Segmentation',
    [AI_FEATURE_TYPES.FACE_RECOGNITION]: 'Face Recognition',
    [AI_FEATURE_TYPES.OPTICAL_CHARACTER_RECOGNITION]: 'Optical Character Recognition',
    [AI_FEATURE_TYPES.SPEECH_TO_TEXT]: 'Speech to Text',
    [AI_FEATURE_TYPES.TEXT_TO_SPEECH]: 'Text to Speech',
    [AI_FEATURE_TYPES.VOICE_RECOGNITION]: 'Voice Recognition',
    [AI_FEATURE_TYPES.AUDIO_CLASSIFICATION]: 'Audio Classification',
    [AI_FEATURE_TYPES.CHATBOT]: 'Chatbot',
    [AI_FEATURE_TYPES.VIRTUAL_ASSISTANT]: 'Virtual Assistant',
    [AI_FEATURE_TYPES.AUTOMATED_REASONING]: 'Automated Reasoning',
    [AI_FEATURE_TYPES.DECISION_MAKING]: 'Decision Making',
    [AI_FEATURE_TYPES.ANOMALY_DETECTION]: 'Anomaly Detection',
    [AI_FEATURE_TYPES.FRAUD_DETECTION]: 'Fraud Detection',
    [AI_FEATURE_TYPES.PRICE_OPTIMIZATION]: 'Price Optimization',
    [AI_FEATURE_TYPES.DEMAND_FORECASTING]: 'Demand Forecasting',
    [AI_FEATURE_TYPES.INVENTORY_OPTIMIZATION]: 'Inventory Optimization',
    [AI_FEATURE_TYPES.CUSTOMER_SEGMENTATION]: 'Customer Segmentation',
    [AI_FEATURE_TYPES.CHURN_PREDICTION]: 'Churn Prediction',
    [AI_FEATURE_TYPES.LIFETIME_VALUE_PREDICTION]: 'Lifetime Value Prediction',
  };
  return labels[type] || 'Unknown';
}

export function getAiFeatureStatusLabel(status: AIFeatureStatus): string {
  const labels: Record<AIFeatureStatus, string> = {
    [AI_FEATURE.STATUSES.PENDING]: 'Pending',
    [AI_FEATURE.STATUSES.DEVELOPMENT]: 'Development',
    [AI_FEATURE.STATUSES.TESTING]: 'Testing',
    [AI_FEATURE.STATUSES.STAGING]: 'Staging',
    [AI_FEATURE.STATUSES.PRODUCTION]: 'Production',
    [AI_FEATURE.STATUSES.DEPRECATED]: 'Deprecated',
    [AI_FEATURE.STATUSES.RETIRED]: 'Retired',
    [AI_FEATURE.STATUSES.BETA]: 'Beta',
    [AI_FEATURE.STATUSES.EARLY_ACCESS]: 'Early Access',
    [AI_FEATURE.STATUSES.PUBLIC]: 'Public',
    [AI_FEATURE.STATUSES.PRIVATE]: 'Private',
  };
  return labels[status] || 'Unknown';
}

export function getAiFeatureLevelLabel(level: AIFeatureLevel): string {
  const labels: Record<AIFeatureLevel, string> = {
    [AI_FEATURE.LEVELS.BASIC]: 'Basic',
    [AI_FEATURE.LEVELS.STANDARD]: 'Standard',
    [AI_FEATURE.LEVELS.PREMIUM]: 'Premium',
    [AI_FEATURE.LEVELS.ENTERPRISE]: 'Enterprise',
    [AI_FEATURE.LEVELS.CUSTOM]: 'Custom',
  };
  return labels[level] || 'Unknown';
}

export function getAiFeatureAccessLabel(access: AIFeatureAccess): string {
  const labels: Record<AIFeatureAccess, string> = {
    [AI_FEATURE.ACCESS.PUBLIC]: 'Public',
    [AI_FEATURE.ACCESS.AUTHENTICATED]: 'Authenticated',
    [AI_FEATURE.ACCESS.AUTHORIZED]: 'Authorized',
    [AI_FEATURE.ACCESS.ADMIN]: 'Admin',
    [AI_FEATURE.ACCESS.PREMIUM]: 'Premium',
    [AI_FEATURE.ACCESS.ENTERPRISE]: 'Enterprise',
    [AI_FEATURE.ACCESS.BETA]: 'Beta',
    [AI_FEATURE.ACCESS.INTERNAL]: 'Internal',
  };
  return labels[access] || 'Unknown';
}

export function getAiFeatureDependencies(feature: AIFeatureType): AIFeatureType[] {
  const dependencies = AI_FEATURE.DEPENDENCIES as Record<AIFeatureType, readonly AIFeatureType[]>;
  return dependencies[feature] ? [...dependencies[feature]] : [];
}

export function getAiFeatureMetricLabel(metric: AIFeatureMetric): string {
  const labels: Record<AIFeatureMetric, string> = {
    [AI_FEATURE.METRICS.USAGE]: 'Usage',
    [AI_FEATURE.METRICS.LATENCY]: 'Latency',
    [AI_FEATURE.METRICS.ACCURACY]: 'Accuracy',
    [AI_FEATURE.METRICS.RELIABILITY]: 'Reliability',
    [AI_FEATURE.METRICS.SATISFACTION]: 'Satisfaction',
    [AI_FEATURE.METRICS.ADOPTION]: 'Adoption',
    [AI_FEATURE.METRICS.RETENTION]: 'Retention',
    [AI_FEATURE.METRICS.IMPACT]: 'Impact',
    [AI_FEATURE.METRICS.COST]: 'Cost',
    [AI_FEATURE.METRICS.ROI]: 'ROI',
  };
  return labels[metric] || 'Unknown';
}

export function isAiFeatureActive(status: AIFeatureStatus): boolean {
  const activeStatuses: AIFeatureStatus[] = [
    AI_FEATURE.STATUSES.PRODUCTION,
    AI_FEATURE.STATUSES.BETA,
    AI_FEATURE.STATUSES.EARLY_ACCESS,
    AI_FEATURE.STATUSES.PUBLIC,
    AI_FEATURE.STATUSES.STAGING,
  ];
  return activeStatuses.includes(status);
}

export function isAiFeatureAvailable(status: AIFeatureStatus): boolean {
  const availableStatuses: AIFeatureStatus[] = [
    AI_FEATURE.STATUSES.PRODUCTION,
    AI_FEATURE.STATUSES.BETA,
    AI_FEATURE.STATUSES.EARLY_ACCESS,
    AI_FEATURE.STATUSES.PUBLIC,
    AI_FEATURE.STATUSES.STAGING,
    AI_FEATURE.STATUSES.TESTING,
  ];
  return availableStatuses.includes(status);
}

export function isAiFeatureDeprecated(status: AIFeatureStatus): boolean {
  const deprecatedStatuses: AIFeatureStatus[] = [
    AI_FEATURE.STATUSES.DEPRECATED,
    AI_FEATURE.STATUSES.RETIRED,
  ];
  return deprecatedStatuses.includes(status);
}

export function getAiFeatureLevelPriority(level: AIFeatureLevel): number {
  const priorities: Record<AIFeatureLevel, number> = {
    [AI_FEATURE.LEVELS.BASIC]: 1,
    [AI_FEATURE.LEVELS.STANDARD]: 2,
    [AI_FEATURE.LEVELS.PREMIUM]: 3,
    [AI_FEATURE.LEVELS.ENTERPRISE]: 4,
    [AI_FEATURE.LEVELS.CUSTOM]: 5,
  };
  return priorities[level] || 0;
}

export function getAiFeatureAccessPriority(access: AIFeatureAccess): number {
  const priorities: Record<AIFeatureAccess, number> = {
    [AI_FEATURE.ACCESS.PUBLIC]: 1,
    [AI_FEATURE.ACCESS.AUTHENTICATED]: 2,
    [AI_FEATURE.ACCESS.AUTHORIZED]: 3,
    [AI_FEATURE.ACCESS.BETA]: 4,
    [AI_FEATURE.ACCESS.PREMIUM]: 5,
    [AI_FEATURE.ACCESS.ENTERPRISE]: 6,
    [AI_FEATURE.ACCESS.ADMIN]: 7,
    [AI_FEATURE.ACCESS.INTERNAL]: 8,
  };
  return priorities[access] || 0;
}
