/**
 * AI Embedding Constants
 * Configuration for AI embeddings and vector representations
 */

// First define the MODELS separately
export const AI_EMBEDDING_MODELS = {
  // Text Embedding Models
  OPENAI_ADA_002: 'text-embedding-ada-002',
  OPENAI_EMBEDDING_3_SMALL: 'text-embedding-3-small',
  OPENAI_EMBEDDING_3_LARGE: 'text-embedding-3-large',
  BERT_BASE: 'bert-base-uncased',
  BERT_LARGE: 'bert-large-uncased',
  SBERT: 'all-MiniLM-L6-v2',
  MPNET: 'all-mpnet-base-v2',
  COHERE_EMBED: 'cohere-embed-english-v3',
  COHERE_EMBED_MULTILINGUAL: 'cohere-embed-multilingual-v3',
  GOOGLE_GEMMA: 'gemini-embedding-001',
  GOOGLE_GEMMA_2: 'gemini-embedding-002',

  // Image Embedding Models
  CLIP_VIT_B32: 'clip-ViT-B-32',
  CLIP_VIT_B16: 'clip-ViT-B-16',
  RESNET_50: 'resnet-50',
  RESNET_101: 'resnet-101',
  EFFICIENTNET: 'efficientnet-b7',

  // Audio Embedding Models
  WAV2VEC_2: 'wav2vec-2',
  HUBERT: 'hubert-base',
  CLAP: 'clap',

  // Multimodal Embedding Models
  CLIP: 'clip',
  ALIGN: 'align',
  FLORENCE: 'florence',
  OWL_VIT: 'owl-vit',
} as const;

export type AIEmbeddingModel = (typeof AI_EMBEDDING_MODELS)[keyof typeof AI_EMBEDDING_MODELS];

// Define dimensions using the models
export const AI_EMBEDDING_DIMENSIONS = {
  [AI_EMBEDDING_MODELS.OPENAI_ADA_002]: 1536,
  [AI_EMBEDDING_MODELS.OPENAI_EMBEDDING_3_SMALL]: 1536,
  [AI_EMBEDDING_MODELS.OPENAI_EMBEDDING_3_LARGE]: 3072,
  [AI_EMBEDDING_MODELS.BERT_BASE]: 768,
  [AI_EMBEDDING_MODELS.BERT_LARGE]: 1024,
  [AI_EMBEDDING_MODELS.SBERT]: 384,
  [AI_EMBEDDING_MODELS.MPNET]: 768,
  [AI_EMBEDDING_MODELS.COHERE_EMBED]: 1024,
  [AI_EMBEDDING_MODELS.COHERE_EMBED_MULTILINGUAL]: 1024,
  [AI_EMBEDDING_MODELS.GOOGLE_GEMMA]: 768,
  [AI_EMBEDDING_MODELS.GOOGLE_GEMMA_2]: 768,
  [AI_EMBEDDING_MODELS.CLIP_VIT_B32]: 512,
  [AI_EMBEDDING_MODELS.CLIP_VIT_B16]: 768,
  [AI_EMBEDDING_MODELS.RESNET_50]: 2048,
  [AI_EMBEDDING_MODELS.RESNET_101]: 2048,
  [AI_EMBEDDING_MODELS.EFFICIENTNET]: 1280,
  [AI_EMBEDDING_MODELS.WAV2VEC_2]: 768,
  [AI_EMBEDDING_MODELS.HUBERT]: 768,
  [AI_EMBEDDING_MODELS.CLAP]: 512,
  [AI_EMBEDDING_MODELS.CLIP]: 512,
  [AI_EMBEDDING_MODELS.ALIGN]: 768,
  [AI_EMBEDDING_MODELS.FLORENCE]: 1024,
  [AI_EMBEDDING_MODELS.OWL_VIT]: 768,
} as const;

export type AIEmbeddingDimension =
  (typeof AI_EMBEDDING_DIMENSIONS)[keyof typeof AI_EMBEDDING_DIMENSIONS];

export const AI_EMBEDDING = {
  // Embedding Types
  TYPES: {
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    MULTIMODAL: 'multimodal',
    DOCUMENT: 'document',
    SENTENCE: 'sentence',
    WORD: 'word',
    TOKEN: 'token',
    CODE: 'code',
    GRAPH: 'graph',
    USER: 'user',
    PRODUCT: 'product',
    CATEGORY: 'category',
  } as const,

  // Embedding Status
  STATUSES: {
    PENDING: 'pending',
    GENERATING: 'generating',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CACHED: 'cached',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
  } as const,

  // Embedding Models - using pre-defined models
  MODELS: AI_EMBEDDING_MODELS,

  // Embedding Dimensions - using pre-defined dimensions
  DIMENSIONS: AI_EMBEDDING_DIMENSIONS,

  // Embedding Providers
  PROVIDERS: {
    OPENAI: 'openai',
    COHERE: 'cohere',
    GOOGLE: 'google',
    HUGGINGFACE: 'huggingface',
    SENTENCE_TRANSFORMERS: 'sentence_transformers',
    TENSORFLOW: 'tensorflow',
    PYTORCH: 'pytorch',
    CUSTOM: 'custom',
  } as const,

  // Embedding Formats
  FORMATS: {
    FLOAT32: 'float32',
    FLOAT16: 'float16',
    INT8: 'int8',
    BINARY: 'binary',
    QUANTIZED: 'quantized',
  } as const,

  // Embedding Limits
  LIMITS: {
    MAX_BATCH_SIZE: 100,
    MAX_TEXT_LENGTH: 8192,
    MAX_IMAGE_SIZE: 2048,
    MAX_AUDIO_LENGTH: 30,
    MAX_VIDEO_LENGTH: 60,
    DEFAULT_BATCH_SIZE: 10,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
  } as const,

  // Embedding Metrics
  METRICS: {
    COSINE_SIMILARITY: 'cosine_similarity',
    EUCLIDEAN_DISTANCE: 'euclidean_distance',
    DOT_PRODUCT: 'dot_product',
    MANHATTAN_DISTANCE: 'manhattan_distance',
    JACCARD_SIMILARITY: 'jaccard_similarity',
    PEARSON_CORRELATION: 'pearson_correlation',
    SPEARMAN_CORRELATION: 'spearman_correlation',
  } as const,

  // Embedding Normalization
  NORMALIZATION: {
    L2: 'l2',
    L1: 'l1',
    NONE: 'none',
    UNIT: 'unit',
    STANDARD: 'standard',
  } as const,

  // Embedding Cache
  CACHE: {
    TTL: 86400,
    MAX_SIZE: 1000000,
    STORAGE: 'memory',
    ENABLED: true,
  } as const,
} as const;

// Embedding Types
export type AIEmbeddingType = (typeof AI_EMBEDDING.TYPES)[keyof typeof AI_EMBEDDING.TYPES];

// Embedding Status
export type AIEmbeddingStatus = (typeof AI_EMBEDDING.STATUSES)[keyof typeof AI_EMBEDDING.STATUSES];

// Embedding Providers
export type AIEmbeddingProvider =
  (typeof AI_EMBEDDING.PROVIDERS)[keyof typeof AI_EMBEDDING.PROVIDERS];

// Embedding Formats
export type AIEmbeddingFormat = (typeof AI_EMBEDDING.FORMATS)[keyof typeof AI_EMBEDDING.FORMATS];

// Embedding Limits
export type AIEmbeddingLimit = (typeof AI_EMBEDDING.LIMITS)[keyof typeof AI_EMBEDDING.LIMITS];

// Embedding Metrics
export type AIEmbeddingMetric = (typeof AI_EMBEDDING.METRICS)[keyof typeof AI_EMBEDDING.METRICS];

// Embedding Normalization
export type AIEmbeddingNormalization =
  (typeof AI_EMBEDDING.NORMALIZATION)[keyof typeof AI_EMBEDDING.NORMALIZATION];

// Utility Functions
export function getEmbeddingTypeLabel(type: AIEmbeddingType): string {
  const labels: Record<AIEmbeddingType, string> = {
    [AI_EMBEDDING.TYPES.TEXT]: 'Text',
    [AI_EMBEDDING.TYPES.IMAGE]: 'Image',
    [AI_EMBEDDING.TYPES.AUDIO]: 'Audio',
    [AI_EMBEDDING.TYPES.VIDEO]: 'Video',
    [AI_EMBEDDING.TYPES.MULTIMODAL]: 'Multimodal',
    [AI_EMBEDDING.TYPES.DOCUMENT]: 'Document',
    [AI_EMBEDDING.TYPES.SENTENCE]: 'Sentence',
    [AI_EMBEDDING.TYPES.WORD]: 'Word',
    [AI_EMBEDDING.TYPES.TOKEN]: 'Token',
    [AI_EMBEDDING.TYPES.CODE]: 'Code',
    [AI_EMBEDDING.TYPES.GRAPH]: 'Graph',
    [AI_EMBEDDING.TYPES.USER]: 'User',
    [AI_EMBEDDING.TYPES.PRODUCT]: 'Product',
    [AI_EMBEDDING.TYPES.CATEGORY]: 'Category',
  };
  return labels[type] || 'Unknown';
}

export function getEmbeddingStatusLabel(status: AIEmbeddingStatus): string {
  const labels: Record<AIEmbeddingStatus, string> = {
    [AI_EMBEDDING.STATUSES.PENDING]: 'Pending',
    [AI_EMBEDDING.STATUSES.GENERATING]: 'Generating',
    [AI_EMBEDDING.STATUSES.PROCESSING]: 'Processing',
    [AI_EMBEDDING.STATUSES.COMPLETED]: 'Completed',
    [AI_EMBEDDING.STATUSES.CACHED]: 'Cached',
    [AI_EMBEDDING.STATUSES.FAILED]: 'Failed',
    [AI_EMBEDDING.STATUSES.EXPIRED]: 'Expired',
    [AI_EMBEDDING.STATUSES.ARCHIVED]: 'Archived',
    [AI_EMBEDDING.STATUSES.OPTIMIZED]: 'Optimized',
  };
  return labels[status] || 'Unknown';
}

export function getEmbeddingModelLabel(model: AIEmbeddingModel): string {
  const labels: Record<AIEmbeddingModel, string> = {
    [AI_EMBEDDING_MODELS.OPENAI_ADA_002]: 'OpenAI Ada 002',
    [AI_EMBEDDING_MODELS.OPENAI_EMBEDDING_3_SMALL]: 'OpenAI Embedding 3 Small',
    [AI_EMBEDDING_MODELS.OPENAI_EMBEDDING_3_LARGE]: 'OpenAI Embedding 3 Large',
    [AI_EMBEDDING_MODELS.BERT_BASE]: 'BERT Base',
    [AI_EMBEDDING_MODELS.BERT_LARGE]: 'BERT Large',
    [AI_EMBEDDING_MODELS.SBERT]: 'SBERT',
    [AI_EMBEDDING_MODELS.MPNET]: 'MPNet',
    [AI_EMBEDDING_MODELS.COHERE_EMBED]: 'Cohere Embed',
    [AI_EMBEDDING_MODELS.COHERE_EMBED_MULTILINGUAL]: 'Cohere Embed Multilingual',
    [AI_EMBEDDING_MODELS.GOOGLE_GEMMA]: 'Google Gemma',
    [AI_EMBEDDING_MODELS.GOOGLE_GEMMA_2]: 'Google Gemma 2',
    [AI_EMBEDDING_MODELS.CLIP_VIT_B32]: 'CLIP ViT B32',
    [AI_EMBEDDING_MODELS.CLIP_VIT_B16]: 'CLIP ViT B16',
    [AI_EMBEDDING_MODELS.RESNET_50]: 'ResNet 50',
    [AI_EMBEDDING_MODELS.RESNET_101]: 'ResNet 101',
    [AI_EMBEDDING_MODELS.EFFICIENTNET]: 'EfficientNet',
    [AI_EMBEDDING_MODELS.WAV2VEC_2]: 'Wav2Vec 2.0',
    [AI_EMBEDDING_MODELS.HUBERT]: 'HuBERT',
    [AI_EMBEDDING_MODELS.CLAP]: 'CLAP',
    [AI_EMBEDDING_MODELS.CLIP]: 'CLIP',
    [AI_EMBEDDING_MODELS.ALIGN]: 'ALIGN',
    [AI_EMBEDDING_MODELS.FLORENCE]: 'Florence',
    [AI_EMBEDDING_MODELS.OWL_VIT]: 'OWL ViT',
  };
  return labels[model] || 'Unknown';
}

export function getEmbeddingProviderLabel(provider: AIEmbeddingProvider): string {
  const labels: Record<AIEmbeddingProvider, string> = {
    [AI_EMBEDDING.PROVIDERS.OPENAI]: 'OpenAI',
    [AI_EMBEDDING.PROVIDERS.COHERE]: 'Cohere',
    [AI_EMBEDDING.PROVIDERS.GOOGLE]: 'Google',
    [AI_EMBEDDING.PROVIDERS.HUGGINGFACE]: 'Hugging Face',
    [AI_EMBEDDING.PROVIDERS.SENTENCE_TRANSFORMERS]: 'Sentence Transformers',
    [AI_EMBEDDING.PROVIDERS.TENSORFLOW]: 'TensorFlow',
    [AI_EMBEDDING.PROVIDERS.PYTORCH]: 'PyTorch',
    [AI_EMBEDDING.PROVIDERS.CUSTOM]: 'Custom',
  };
  return labels[provider] || 'Unknown';
}

export function getEmbeddingFormatLabel(format: AIEmbeddingFormat): string {
  const labels: Record<AIEmbeddingFormat, string> = {
    [AI_EMBEDDING.FORMATS.FLOAT32]: 'Float32',
    [AI_EMBEDDING.FORMATS.FLOAT16]: 'Float16',
    [AI_EMBEDDING.FORMATS.INT8]: 'Int8',
    [AI_EMBEDDING.FORMATS.BINARY]: 'Binary',
    [AI_EMBEDDING.FORMATS.QUANTIZED]: 'Quantized',
  };
  return labels[format] || 'Unknown';
}

export function getEmbeddingMetricLabel(metric: AIEmbeddingMetric): string {
  const labels: Record<AIEmbeddingMetric, string> = {
    [AI_EMBEDDING.METRICS.COSINE_SIMILARITY]: 'Cosine Similarity',
    [AI_EMBEDDING.METRICS.EUCLIDEAN_DISTANCE]: 'Euclidean Distance',
    [AI_EMBEDDING.METRICS.DOT_PRODUCT]: 'Dot Product',
    [AI_EMBEDDING.METRICS.MANHATTAN_DISTANCE]: 'Manhattan Distance',
    [AI_EMBEDDING.METRICS.JACCARD_SIMILARITY]: 'Jaccard Similarity',
    [AI_EMBEDDING.METRICS.PEARSON_CORRELATION]: 'Pearson Correlation',
    [AI_EMBEDDING.METRICS.SPEARMAN_CORRELATION]: 'Spearman Correlation',
  };
  return labels[metric] || 'Unknown';
}

export function getEmbeddingNormalizationLabel(normalization: AIEmbeddingNormalization): string {
  const labels: Record<AIEmbeddingNormalization, string> = {
    [AI_EMBEDDING.NORMALIZATION.L2]: 'L2 Normalization',
    [AI_EMBEDDING.NORMALIZATION.L1]: 'L1 Normalization',
    [AI_EMBEDDING.NORMALIZATION.NONE]: 'None',
    [AI_EMBEDDING.NORMALIZATION.UNIT]: 'Unit Normalization',
    [AI_EMBEDDING.NORMALIZATION.STANDARD]: 'Standard Normalization',
  };
  return labels[normalization] || 'Unknown';
}

export function getEmbeddingDimension(model: AIEmbeddingModel): number {
  return AI_EMBEDDING_DIMENSIONS[model] || 0;
}

export function getEmbeddingProvider(model: AIEmbeddingModel): AIEmbeddingProvider {
  const providers: Record<AIEmbeddingModel, AIEmbeddingProvider> = {
    [AI_EMBEDDING_MODELS.OPENAI_ADA_002]: AI_EMBEDDING.PROVIDERS.OPENAI,
    [AI_EMBEDDING_MODELS.OPENAI_EMBEDDING_3_SMALL]: AI_EMBEDDING.PROVIDERS.OPENAI,
    [AI_EMBEDDING_MODELS.OPENAI_EMBEDDING_3_LARGE]: AI_EMBEDDING.PROVIDERS.OPENAI,
    [AI_EMBEDDING_MODELS.BERT_BASE]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.BERT_LARGE]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.SBERT]: AI_EMBEDDING.PROVIDERS.SENTENCE_TRANSFORMERS,
    [AI_EMBEDDING_MODELS.MPNET]: AI_EMBEDDING.PROVIDERS.SENTENCE_TRANSFORMERS,
    [AI_EMBEDDING_MODELS.COHERE_EMBED]: AI_EMBEDDING.PROVIDERS.COHERE,
    [AI_EMBEDDING_MODELS.COHERE_EMBED_MULTILINGUAL]: AI_EMBEDDING.PROVIDERS.COHERE,
    [AI_EMBEDDING_MODELS.GOOGLE_GEMMA]: AI_EMBEDDING.PROVIDERS.GOOGLE,
    [AI_EMBEDDING_MODELS.GOOGLE_GEMMA_2]: AI_EMBEDDING.PROVIDERS.GOOGLE,
    [AI_EMBEDDING_MODELS.CLIP_VIT_B32]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.CLIP_VIT_B16]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.RESNET_50]: AI_EMBEDDING.PROVIDERS.TENSORFLOW,
    [AI_EMBEDDING_MODELS.RESNET_101]: AI_EMBEDDING.PROVIDERS.TENSORFLOW,
    [AI_EMBEDDING_MODELS.EFFICIENTNET]: AI_EMBEDDING.PROVIDERS.TENSORFLOW,
    [AI_EMBEDDING_MODELS.WAV2VEC_2]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.HUBERT]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.CLAP]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.CLIP]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
    [AI_EMBEDDING_MODELS.ALIGN]: AI_EMBEDDING.PROVIDERS.GOOGLE,
    [AI_EMBEDDING_MODELS.FLORENCE]: AI_EMBEDDING.PROVIDERS.CUSTOM,
    [AI_EMBEDDING_MODELS.OWL_VIT]: AI_EMBEDDING.PROVIDERS.HUGGINGFACE,
  };
  return providers[model] || AI_EMBEDDING.PROVIDERS.CUSTOM;
}

export function isEmbeddingActive(status: AIEmbeddingStatus): boolean {
  const activeStatuses: AIEmbeddingStatus[] = [
    AI_EMBEDDING.STATUSES.COMPLETED,
    AI_EMBEDDING.STATUSES.CACHED,
    AI_EMBEDDING.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isEmbeddingGenerating(status: AIEmbeddingStatus): boolean {
  const generatingStatuses: AIEmbeddingStatus[] = [
    AI_EMBEDDING.STATUSES.PENDING,
    AI_EMBEDDING.STATUSES.GENERATING,
    AI_EMBEDDING.STATUSES.PROCESSING,
  ];
  return generatingStatuses.includes(status);
}

export function isEmbeddingFailed(status: AIEmbeddingStatus): boolean {
  const failedStatuses: AIEmbeddingStatus[] = [
    AI_EMBEDDING.STATUSES.FAILED,
    AI_EMBEDDING.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function getDefaultEmbeddingModel(): AIEmbeddingModel {
  return AI_EMBEDDING_MODELS.SBERT;
}

export function getDefaultBatchSize(): number {
  return AI_EMBEDDING.LIMITS.DEFAULT_BATCH_SIZE;
}

export function getMaxBatchSize(): number {
  return AI_EMBEDDING.LIMITS.MAX_BATCH_SIZE;
}

export function calculateCosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function calculateEuclideanDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return Math.sqrt(sum);
}

export function calculateDotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}
