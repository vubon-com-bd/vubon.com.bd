export const AI_FEATURE = {
  RECOMMENDATION: 'recommendation',
  SEARCH_RANKING: 'search_ranking',
  PRODUCT_DESCRIPTION: 'product_description',
  CHATBOT: 'chatbot',
  SENTIMENT_ANALYSIS: 'sentiment_analysis',
  FRAUD_DETECTION: 'fraud_detection',
  DEMAND_FORECASTING: 'demand_forecasting',
  PRICE_OPTIMIZATION: 'price_optimization',
  CUSTOMER_SEGMENTATION: 'customer_segmentation',
  CHURN_PREDICTION: 'churn_prediction',
  IMAGE_TAGGING: 'image_tagging',
  CONTENT_MODERATION: 'content_moderation',
  TRANSLATION: 'translation',
  SUMMARIZATION: 'summarization',
  QUESTION_ANSWERING: 'question_answering',
  PERSONALIZATION: 'personalization',
  DYNAMIC_PRICING: 'dynamic_pricing',
  INVENTORY_OPTIMIZATION: 'inventory_optimization',
} as const;

export const AI_FEATURE_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  BETA: 'beta',
  ALPHA: 'alpha',
  DEPRECATED: 'deprecated',
} as const;

export const AI_FEATURE_TOGGLE = {
  recommendation: true,
  search_ranking: true,
  chatbot: true,
  sentiment_analysis: true,
  fraud_detection: false,
  demand_forecasting: true,
  price_optimization: false,
  personalization: true,
  content_moderation: true,
  image_tagging: false,
} as const;

export type AiFeatureType = (typeof AI_FEATURE)[keyof typeof AI_FEATURE];
export type AiFeatureStatusType = (typeof AI_FEATURE_STATUS)[keyof typeof AI_FEATURE_STATUS];
