/**
 * AI (Artificial Intelligence) Constants
 * Configuration for AI services, models, and features
 */

export const AI = {
  // AI Service Types
  SERVICE_TYPES: {
    RECOMMENDATION: 'recommendation',
    PERSONALIZATION: 'personalization',
    SEARCH: 'search',
    ANALYTICS: 'analytics',
    RANKING: 'ranking',
    FORECAST: 'forecast',
    INSIGHT: 'insight',
    CHATBOT: 'chatbot',
    NLP: 'nlp',
    VISION: 'vision',
    SPEECH: 'speech',
  } as const,

  // AI Providers
  PROVIDERS: {
    OPENAI: 'openai',
    GOOGLE: 'google',
    ANTHROPIC: 'anthropic',
    COHERE: 'cohere',
    HUGGINGFACE: 'huggingface',
    AZURE: 'azure',
    AWS: 'aws',
    DEEPSEEK: 'deepseek',
    GROQ: 'groq',
    MISTRAL: 'mistral',
    GEMINI: 'gemini',
    CLAUDE: 'claude',
    LLAMA: 'llama',
    BERT: 'bert',
  } as const,

  // AI Model Types
  MODEL_TYPES: {
    // Language Models
    GPT: 'gpt',
    CLAUDE: 'claude',
    LLAMA: 'llama',
    BERT: 'bert',
    T5: 't5',
    BLOOM: 'bloom',
    PALM: 'palm',
    GEMINI: 'gemini',
    MISTRAL: 'mistral',

    // Vision Models
    VISION: 'vision',
    CLIP: 'clip',
    DETR: 'detr',
    YOLO: 'yolo',

    // Recommendation Models
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    DEEP_LEARNING: 'deep_learning',

    // NLP Models
    NER: 'ner',
    SENTIMENT: 'sentiment',
    SUMMARIZATION: 'summarization',
    TRANSLATION: 'translation',
    QUESTION_ANSWERING: 'question_answering',
  } as const,

  // AI Model Status
  MODEL_STATUS: {
    PENDING: 'pending',
    TRAINING: 'training',
    VALIDATING: 'validating',
    DEPLOYED: 'deployed',
    UPDATING: 'updating',
    FAILED: 'failed',
    ARCHIVED: 'archived',
    RETIRED: 'retired',
  } as const,

  // AI Confidence Levels
  CONFIDENCE: {
    VERY_LOW: 0,
    LOW: 25,
    MEDIUM: 50,
    HIGH: 75,
    VERY_HIGH: 90,
    MAXIMUM: 100,
  } as const,

  // AI Error Types
  ERROR_TYPES: {
    MODEL_NOT_FOUND: 'model_not_found',
    MODEL_LOAD_ERROR: 'model_load_error',
    INFERENCE_ERROR: 'inference_error',
    TRAINING_ERROR: 'training_error',
    VALIDATION_ERROR: 'validation_error',
    DEPLOYMENT_ERROR: 'deployment_error',
    RESOURCE_LIMIT: 'resource_limit',
    TIMEOUT: 'timeout',
    RATE_LIMIT: 'rate_limit',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    INVALID_INPUT: 'invalid_input',
    INVALID_OUTPUT: 'invalid_output',
  } as const,

  // AI Endpoints
  ENDPOINTS: {
    // OpenAI
    OPENAI_CHAT: 'https://api.openai.com/v1/chat/completions',
    OPENAI_EMBEDDINGS: 'https://api.openai.com/v1/embeddings',
    OPENAI_IMAGES: 'https://api.openai.com/v1/images/generations',
    OPENAI_MODERATION: 'https://api.openai.com/v1/moderations',

    // Google
    GOOGLE_PALM: 'https://generativelanguage.googleapis.com/v1beta3/models',
    GOOGLE_GEMINI: 'https://generativelanguage.googleapis.com/v1beta/models',

    // Anthropic
    ANTHROPIC_MESSAGES: 'https://api.anthropic.com/v1/messages',

    // Cohere
    COHERE_GENERATE: 'https://api.cohere.ai/v1/generate',
    COHERE_EMBED: 'https://api.cohere.ai/v1/embed',

    // Hugging Face
    HUGGINGFACE_INFERENCE: 'https://api-inference.huggingface.co/models',
  } as const,

  // AI Feature Flags
  FEATURES: {
    RECOMMENDATIONS: 'ai_recommendations',
    PERSONALIZATION: 'ai_personalization',
    SMART_SEARCH: 'ai_smart_search',
    CHATBOT: 'ai_chatbot',
    SENTIMENT_ANALYSIS: 'ai_sentiment_analysis',
    PRICE_OPTIMIZATION: 'ai_price_optimization',
    DEMAND_FORECAST: 'ai_demand_forecast',
    FRAUD_DETECTION: 'ai_fraud_detection',
    PRODUCT_TAGGING: 'ai_product_tagging',
    CONTENT_GENERATION: 'ai_content_generation',
    IMAGE_RECOGNITION: 'ai_image_recognition',
    VOICE_ASSISTANT: 'ai_voice_assistant',
    TRANSLATION: 'ai_translation',
    SUMMARIZATION: 'ai_summarization',
    QA_SYSTEM: 'ai_qa_system',
  } as const,

  // AI Timeouts (in milliseconds)
  TIMEOUTS: {
    PREDICTION: 1000,
    TRAINING: 3600000,
    INFERENCE: 2000,
    BATCH_PROCESSING: 30000,
    MODEL_LOADING: 10000,
    DEPLOYMENT: 60000,
  } as const,

  // AI Batch Sizes
  BATCH_SIZES: {
    TRAINING: 32,
    INFERENCE: 64,
    PREDICTION: 128,
    EMBEDDING: 256,
    VALIDATION: 16,
  } as const,

  // AI Learning Rates
  LEARNING_RATES: {
    VERY_LOW: 0.00001,
    LOW: 0.0001,
    MEDIUM: 0.001,
    HIGH: 0.01,
    VERY_HIGH: 0.1,
  } as const,

  // AI Epochs
  EPOCHS: {
    MIN: 1,
    DEFAULT: 10,
    MAX: 100,
  } as const,
} as const;

// Service Types
export type AIServiceType = (typeof AI.SERVICE_TYPES)[keyof typeof AI.SERVICE_TYPES];

// Providers
export type AIProvider = (typeof AI.PROVIDERS)[keyof typeof AI.PROVIDERS];

// Model Types
export type AIModelType = (typeof AI.MODEL_TYPES)[keyof typeof AI.MODEL_TYPES];

// Model Status
export type AIModelStatus = (typeof AI.MODEL_STATUS)[keyof typeof AI.MODEL_STATUS];

// Confidence Levels
export type AIConfidence = (typeof AI.CONFIDENCE)[keyof typeof AI.CONFIDENCE];

// Error Types
export type AIErrorType = (typeof AI.ERROR_TYPES)[keyof typeof AI.ERROR_TYPES];

// Endpoints
export type AIEndpoint = (typeof AI.ENDPOINTS)[keyof typeof AI.ENDPOINTS];

// Features
export type AIFeature = (typeof AI.FEATURES)[keyof typeof AI.FEATURES];

// Timeouts
export type AITimeout = (typeof AI.TIMEOUTS)[keyof typeof AI.TIMEOUTS];

// Batch Sizes
export type AIBatchSize = (typeof AI.BATCH_SIZES)[keyof typeof AI.BATCH_SIZES];

// Learning Rates
export type AILearningRate = (typeof AI.LEARNING_RATES)[keyof typeof AI.LEARNING_RATES];

// Epochs
export type AIEpoch = (typeof AI.EPOCHS)[keyof typeof AI.EPOCHS];

// Utility Functions
export function getAIModelStatusLabel(status: AIModelStatus): string {
  const labels: Record<AIModelStatus, string> = {
    [AI.MODEL_STATUS.PENDING]: 'Pending',
    [AI.MODEL_STATUS.TRAINING]: 'Training',
    [AI.MODEL_STATUS.VALIDATING]: 'Validating',
    [AI.MODEL_STATUS.DEPLOYED]: 'Deployed',
    [AI.MODEL_STATUS.UPDATING]: 'Updating',
    [AI.MODEL_STATUS.FAILED]: 'Failed',
    [AI.MODEL_STATUS.ARCHIVED]: 'Archived',
    [AI.MODEL_STATUS.RETIRED]: 'Retired',
  };
  return labels[status] || 'Unknown';
}

export function getAIErrorLabel(errorType: AIErrorType): string {
  const labels: Record<AIErrorType, string> = {
    [AI.ERROR_TYPES.MODEL_NOT_FOUND]: 'Model Not Found',
    [AI.ERROR_TYPES.MODEL_LOAD_ERROR]: 'Model Load Error',
    [AI.ERROR_TYPES.INFERENCE_ERROR]: 'Inference Error',
    [AI.ERROR_TYPES.TRAINING_ERROR]: 'Training Error',
    [AI.ERROR_TYPES.VALIDATION_ERROR]: 'Validation Error',
    [AI.ERROR_TYPES.DEPLOYMENT_ERROR]: 'Deployment Error',
    [AI.ERROR_TYPES.RESOURCE_LIMIT]: 'Resource Limit Exceeded',
    [AI.ERROR_TYPES.TIMEOUT]: 'Timeout Error',
    [AI.ERROR_TYPES.RATE_LIMIT]: 'Rate Limit Exceeded',
    [AI.ERROR_TYPES.AUTHENTICATION]: 'Authentication Error',
    [AI.ERROR_TYPES.AUTHORIZATION]: 'Authorization Error',
    [AI.ERROR_TYPES.INVALID_INPUT]: 'Invalid Input',
    [AI.ERROR_TYPES.INVALID_OUTPUT]: 'Invalid Output',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getAIEndpoint(provider: AIProvider): string {
  const endpoints: Record<AIProvider, string> = {
    [AI.PROVIDERS.OPENAI]: AI.ENDPOINTS.OPENAI_CHAT,
    [AI.PROVIDERS.GOOGLE]: AI.ENDPOINTS.GOOGLE_GEMINI,
    [AI.PROVIDERS.ANTHROPIC]: AI.ENDPOINTS.ANTHROPIC_MESSAGES,
    [AI.PROVIDERS.COHERE]: AI.ENDPOINTS.COHERE_GENERATE,
    [AI.PROVIDERS.HUGGINGFACE]: AI.ENDPOINTS.HUGGINGFACE_INFERENCE,
    [AI.PROVIDERS.AZURE]: 'https://your-azure-endpoint.com',
    [AI.PROVIDERS.AWS]: 'https://your-aws-endpoint.com',
    [AI.PROVIDERS.DEEPSEEK]: 'https://api.deepseek.com/v1',
    [AI.PROVIDERS.GROQ]: 'https://api.groq.com/openai/v1',
    [AI.PROVIDERS.MISTRAL]: 'https://api.mistral.ai/v1',
    [AI.PROVIDERS.GEMINI]: AI.ENDPOINTS.GOOGLE_GEMINI,
    [AI.PROVIDERS.CLAUDE]: AI.ENDPOINTS.ANTHROPIC_MESSAGES,
    [AI.PROVIDERS.LLAMA]: 'https://your-llama-endpoint.com',
    [AI.PROVIDERS.BERT]: 'https://your-bert-endpoint.com',
  };
  return endpoints[provider] || '';
}

export function getAITimeout(operation: keyof typeof AI.TIMEOUTS): number {
  return AI.TIMEOUTS[operation] || AI.TIMEOUTS.INFERENCE;
}

export function getAIBatchSize(operation: keyof typeof AI.BATCH_SIZES): number {
  return AI.BATCH_SIZES[operation] || AI.BATCH_SIZES.INFERENCE;
}

export function isModelDeployed(status: AIModelStatus): boolean {
  return status === AI.MODEL_STATUS.DEPLOYED;
}

export function isModelActive(status: AIModelStatus): boolean {
  return (
    status === AI.MODEL_STATUS.DEPLOYED ||
    status === AI.MODEL_STATUS.TRAINING ||
    status === AI.MODEL_STATUS.UPDATING
  );
}

export function isModelFailed(status: AIModelStatus): boolean {
  return status === AI.MODEL_STATUS.FAILED;
}

export function getAIConfidenceLabel(confidence: number): string {
  if (confidence >= AI.CONFIDENCE.VERY_HIGH) return 'Very High';
  if (confidence >= AI.CONFIDENCE.HIGH) return 'High';
  if (confidence >= AI.CONFIDENCE.MEDIUM) return 'Medium';
  if (confidence >= AI.CONFIDENCE.LOW) return 'Low';
  return 'Very Low';
}

export function getDefaultLearningRate(modelType: AIModelType): number {
  const rates: Record<AIModelType, number> = {
    [AI.MODEL_TYPES.GPT]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.CLAUDE]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.LLAMA]: AI.LEARNING_RATES.HIGH,
    [AI.MODEL_TYPES.BERT]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.T5]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.BLOOM]: AI.LEARNING_RATES.LOW,
    [AI.MODEL_TYPES.PALM]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.GEMINI]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.MISTRAL]: AI.LEARNING_RATES.HIGH,
    [AI.MODEL_TYPES.VISION]: AI.LEARNING_RATES.LOW,
    [AI.MODEL_TYPES.CLIP]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.DETR]: AI.LEARNING_RATES.LOW,
    [AI.MODEL_TYPES.YOLO]: AI.LEARNING_RATES.HIGH,
    [AI.MODEL_TYPES.COLLABORATIVE]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.CONTENT_BASED]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.HYBRID]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.DEEP_LEARNING]: AI.LEARNING_RATES.LOW,
    [AI.MODEL_TYPES.NER]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.SENTIMENT]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.SUMMARIZATION]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.TRANSLATION]: AI.LEARNING_RATES.MEDIUM,
    [AI.MODEL_TYPES.QUESTION_ANSWERING]: AI.LEARNING_RATES.MEDIUM,
  };
  return rates[modelType] || AI.LEARNING_RATES.MEDIUM;
}
