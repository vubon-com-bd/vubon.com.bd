/**
 * AI এরর কোড এনাম
 */
export const AI_ERROR_CODE = {
  MODEL_NOT_FOUND: 'MODEL_NOT_FOUND',
  MODEL_TRAINING_FAILED: 'MODEL_TRAINING_FAILED',
  RECOMMENDATION_GENERATION_FAILED: 'RECOMMENDATION_GENERATION_FAILED',
  EMBEDDING_FAILED: 'EMBEDDING_FAILED',
  VECTOR_SEARCH_FAILED: 'VECTOR_SEARCH_FAILED',
  CLUSTERING_FAILED: 'CLUSTERING_FAILED',
  FORECAST_FAILED: 'FORECAST_FAILED',
  INSIGHT_GENERATION_FAILED: 'INSIGHT_GENERATION_FAILED',
} as const;

/**
 * AI_ERROR_CODE থেকে টাইপ
 */
export type AIErrorCodeType = (typeof AI_ERROR_CODE)[keyof typeof AI_ERROR_CODE];

/**
 * AI এরর মেসেজ
 */
export const AI_ERROR_MESSAGE: Record<AIErrorCodeType, string> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: 'The requested AI model could not be found',
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: 'Model training process has failed',
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: 'Failed to generate recommendations',
  [AI_ERROR_CODE.EMBEDDING_FAILED]: 'Failed to generate embeddings',
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: 'Vector search operation failed',
  [AI_ERROR_CODE.CLUSTERING_FAILED]: 'Clustering operation failed',
  [AI_ERROR_CODE.FORECAST_FAILED]: 'Forecast generation failed',
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: 'Failed to generate insights',
} as const;

/**
 * AI এরর HTTP স্ট্যাটাস কোড
 */
export const AI_ERROR_HTTP_STATUS: Record<AIErrorCodeType, number> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: 404,
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: 500,
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: 500,
  [AI_ERROR_CODE.EMBEDDING_FAILED]: 500,
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: 500,
  [AI_ERROR_CODE.CLUSTERING_FAILED]: 500,
  [AI_ERROR_CODE.FORECAST_FAILED]: 500,
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: 500,
} as const;

/**
 * AI এরর সিভারিটি
 */
export const AI_ERROR_SEVERITY: Record<AIErrorCodeType, 'critical' | 'high' | 'medium' | 'low'> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: 'high',
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: 'critical',
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: 'medium',
  [AI_ERROR_CODE.EMBEDDING_FAILED]: 'medium',
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: 'medium',
  [AI_ERROR_CODE.CLUSTERING_FAILED]: 'medium',
  [AI_ERROR_CODE.FORECAST_FAILED]: 'medium',
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: 'medium',
} as const;

/**
 * AI এরর ক্যাটাগরি
 */
export const AI_ERROR_CATEGORY: Record<
  AIErrorCodeType,
  | 'model'
  | 'training'
  | 'recommendation'
  | 'embedding'
  | 'vector'
  | 'clustering'
  | 'forecast'
  | 'insight'
> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: 'model',
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: 'training',
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: 'recommendation',
  [AI_ERROR_CODE.EMBEDDING_FAILED]: 'embedding',
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: 'vector',
  [AI_ERROR_CODE.CLUSTERING_FAILED]: 'clustering',
  [AI_ERROR_CODE.FORECAST_FAILED]: 'forecast',
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: 'insight',
} as const;

/**
 * AI এরর রিট্রাইযোগ্য কিনা
 */
export const AI_ERROR_RETRYABLE: Record<AIErrorCodeType, boolean> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: false,
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: true,
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: true,
  [AI_ERROR_CODE.EMBEDDING_FAILED]: true,
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: true,
  [AI_ERROR_CODE.CLUSTERING_FAILED]: true,
  [AI_ERROR_CODE.FORECAST_FAILED]: true,
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: true,
} as const;

/**
 * AI এরর কনফিগারেশন
 */
export interface AIErrorConfig {
  code: AIErrorCodeType;
  message: string;
  httpStatus: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category:
    | 'model'
    | 'training'
    | 'recommendation'
    | 'embedding'
    | 'vector'
    | 'clustering'
    | 'forecast'
    | 'insight';
  retryable: boolean;
  userFriendlyMessage: string;
  actionRequired: string;
}

/**
 * AI এরর কনফিগারেশন মেটাডেটা
 */
export const AI_ERROR_CONFIG_METADATA: Record<AIErrorCodeType, AIErrorConfig> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: {
    code: AI_ERROR_CODE.MODEL_NOT_FOUND,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.MODEL_NOT_FOUND],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.MODEL_NOT_FOUND],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.MODEL_NOT_FOUND],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.MODEL_NOT_FOUND],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.MODEL_NOT_FOUND],
    userFriendlyMessage: 'The AI model you are looking for is not available',
    actionRequired: 'Verify the model ID and ensure the model exists',
  },
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: {
    code: AI_ERROR_CODE.MODEL_TRAINING_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.MODEL_TRAINING_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.MODEL_TRAINING_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.MODEL_TRAINING_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.MODEL_TRAINING_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.MODEL_TRAINING_FAILED],
    userFriendlyMessage: 'Model training encountered an error',
    actionRequired: 'Check training data and parameters, then retry',
  },
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: {
    code: AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED],
    userFriendlyMessage: 'Unable to generate recommendations at this time',
    actionRequired: 'Check input data and try again later',
  },
  [AI_ERROR_CODE.EMBEDDING_FAILED]: {
    code: AI_ERROR_CODE.EMBEDDING_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.EMBEDDING_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.EMBEDDING_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.EMBEDDING_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.EMBEDDING_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.EMBEDDING_FAILED],
    userFriendlyMessage: 'Failed to create embeddings for your content',
    actionRequired: 'Validate input format and retry',
  },
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: {
    code: AI_ERROR_CODE.VECTOR_SEARCH_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.VECTOR_SEARCH_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.VECTOR_SEARCH_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.VECTOR_SEARCH_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.VECTOR_SEARCH_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.VECTOR_SEARCH_FAILED],
    userFriendlyMessage: 'Vector search operation could not be completed',
    actionRequired: 'Check vector index and query parameters',
  },
  [AI_ERROR_CODE.CLUSTERING_FAILED]: {
    code: AI_ERROR_CODE.CLUSTERING_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.CLUSTERING_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.CLUSTERING_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.CLUSTERING_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.CLUSTERING_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.CLUSTERING_FAILED],
    userFriendlyMessage: 'Clustering operation encountered an error',
    actionRequired: 'Check input data and clustering parameters',
  },
  [AI_ERROR_CODE.FORECAST_FAILED]: {
    code: AI_ERROR_CODE.FORECAST_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.FORECAST_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.FORECAST_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.FORECAST_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.FORECAST_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.FORECAST_FAILED],
    userFriendlyMessage: 'Unable to generate forecast at this time',
    actionRequired: 'Ensure sufficient data points and retry',
  },
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: {
    code: AI_ERROR_CODE.INSIGHT_GENERATION_FAILED,
    message: AI_ERROR_MESSAGE[AI_ERROR_CODE.INSIGHT_GENERATION_FAILED],
    httpStatus: AI_ERROR_HTTP_STATUS[AI_ERROR_CODE.INSIGHT_GENERATION_FAILED],
    severity: AI_ERROR_SEVERITY[AI_ERROR_CODE.INSIGHT_GENERATION_FAILED],
    category: AI_ERROR_CATEGORY[AI_ERROR_CODE.INSIGHT_GENERATION_FAILED],
    retryable: AI_ERROR_RETRYABLE[AI_ERROR_CODE.INSIGHT_GENERATION_FAILED],
    userFriendlyMessage: 'Failed to generate insights from your data',
    actionRequired: 'Check data quality and analysis parameters',
  },
} as const;

/**
 * AI এরর গ্রুপ
 */
export const AI_ERROR_GROUPS = {
  MODEL: [AI_ERROR_CODE.MODEL_NOT_FOUND] as const,
  TRAINING: [AI_ERROR_CODE.MODEL_TRAINING_FAILED] as const,
  RECOMMENDATION: [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED] as const,
  EMBEDDING: [AI_ERROR_CODE.EMBEDDING_FAILED] as const,
  VECTOR: [AI_ERROR_CODE.VECTOR_SEARCH_FAILED] as const,
  CLUSTERING: [AI_ERROR_CODE.CLUSTERING_FAILED] as const,
  FORECAST: [AI_ERROR_CODE.FORECAST_FAILED] as const,
  INSIGHT: [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED] as const,
} as const;

/**
 * AI এরর গ্রুপ লেবেল
 */
export const AI_ERROR_GROUP_LABELS = {
  MODEL: 'Model',
  TRAINING: 'Training',
  RECOMMENDATION: 'Recommendation',
  EMBEDDING: 'Embedding',
  VECTOR: 'Vector',
  CLUSTERING: 'Clustering',
  FORECAST: 'Forecast',
  INSIGHT: 'Insight',
} as const;

/**
 * AI এরর রিট্রাই কনফিগারেশন
 */
export const AI_ERROR_RETRY_CONFIG: Record<
  AIErrorCodeType,
  { maxRetries: number; delay: number; backoffMultiplier: number }
> = {
  [AI_ERROR_CODE.MODEL_NOT_FOUND]: { maxRetries: 0, delay: 0, backoffMultiplier: 1 },
  [AI_ERROR_CODE.MODEL_TRAINING_FAILED]: { maxRetries: 3, delay: 1000, backoffMultiplier: 2 },
  [AI_ERROR_CODE.RECOMMENDATION_GENERATION_FAILED]: {
    maxRetries: 3,
    delay: 500,
    backoffMultiplier: 1.5,
  },
  [AI_ERROR_CODE.EMBEDDING_FAILED]: { maxRetries: 3, delay: 500, backoffMultiplier: 1.5 },
  [AI_ERROR_CODE.VECTOR_SEARCH_FAILED]: { maxRetries: 3, delay: 500, backoffMultiplier: 1.5 },
  [AI_ERROR_CODE.CLUSTERING_FAILED]: { maxRetries: 3, delay: 1000, backoffMultiplier: 2 },
  [AI_ERROR_CODE.FORECAST_FAILED]: { maxRetries: 3, delay: 1000, backoffMultiplier: 2 },
  [AI_ERROR_CODE.INSIGHT_GENERATION_FAILED]: { maxRetries: 3, delay: 1000, backoffMultiplier: 2 },
} as const;
