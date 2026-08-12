/**
 * ডিফল্ট এম্বেডিং মডেল
 */
export const AI_EMBEDDING_DEFAULT_MODEL = 'text-embedding-ada-002' as const;

/**
 * ডিফল্ট ডাইমেনশন (৭৬৮)
 */
export const AI_EMBEDDING_DEFAULT_DIMENSION = 768 as const;

/**
 * ব্যাচ সাইজ (১০০)
 */
export const AI_EMBEDDING_BATCH_SIZE = 100 as const;

/**
 * ক্যাশ টাইম (২৪ ঘন্টা - মিলিসেকেন্ডে)
 */
export const AI_EMBEDDING_CACHE_TTL = 86400000 as const; // 24 hours

/**
 * এম্বেডিং মডেল এনাম
 */
export const AI_EMBEDDING_MODEL = {
  TEXT_EMBEDDING_ADA_002: 'text-embedding-ada-002',
  TEXT_EMBEDDING_3_SMALL: 'text-embedding-3-small',
  TEXT_EMBEDDING_3_LARGE: 'text-embedding-3-large',
  BERT_BASE: 'bert-base-uncased',
  BERT_LARGE: 'bert-large-uncased',
  SBERT_ALL_MPNET_BASE: 'sbert-all-mpnet-base-v2',
  SBERT_ALL_MINILM: 'sbert-all-MiniLM-L6-v2',
  COHERE_EMBED_ENGLISH: 'cohere-embed-english-v3',
  COHERE_EMBED_MULTILINGUAL: 'cohere-embed-multilingual-v3',
} as const;

/**
 * AI_EMBEDDING_MODEL থেকে টাইপ
 */
export type AIEmbeddingModelType = (typeof AI_EMBEDDING_MODEL)[keyof typeof AI_EMBEDDING_MODEL];

/**
 * এম্বেডিং মডেল লেবেল
 */
export const AI_EMBEDDING_MODEL_LABELS: Record<AIEmbeddingModelType, string> = {
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_ADA_002]: 'OpenAI Ada-002',
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_SMALL]: 'OpenAI Embedding-3 Small',
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_LARGE]: 'OpenAI Embedding-3 Large',
  [AI_EMBEDDING_MODEL.BERT_BASE]: 'BERT Base Uncased',
  [AI_EMBEDDING_MODEL.BERT_LARGE]: 'BERT Large Uncased',
  [AI_EMBEDDING_MODEL.SBERT_ALL_MPNET_BASE]: 'SBERT MPNet Base',
  [AI_EMBEDDING_MODEL.SBERT_ALL_MINILM]: 'SBERT MiniLM',
  [AI_EMBEDDING_MODEL.COHERE_EMBED_ENGLISH]: 'Cohere Embed English',
  [AI_EMBEDDING_MODEL.COHERE_EMBED_MULTILINGUAL]: 'Cohere Embed Multilingual',
} as const;

/**
 * এম্বেডিং মডেল ডাইমেনশন
 */
export const AI_EMBEDDING_MODEL_DIMENSIONS: Record<AIEmbeddingModelType, number> = {
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_ADA_002]: 1536,
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_SMALL]: 1536,
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_LARGE]: 3072,
  [AI_EMBEDDING_MODEL.BERT_BASE]: 768,
  [AI_EMBEDDING_MODEL.BERT_LARGE]: 1024,
  [AI_EMBEDDING_MODEL.SBERT_ALL_MPNET_BASE]: 768,
  [AI_EMBEDDING_MODEL.SBERT_ALL_MINILM]: 384,
  [AI_EMBEDDING_MODEL.COHERE_EMBED_ENGLISH]: 1024,
  [AI_EMBEDDING_MODEL.COHERE_EMBED_MULTILINGUAL]: 1024,
} as const;

/**
 * এম্বেডিং মডেল প্রোভাইডার
 */
export const AI_EMBEDDING_MODEL_PROVIDER: Record<AIEmbeddingModelType, string> = {
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_ADA_002]: 'OpenAI',
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_SMALL]: 'OpenAI',
  [AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_LARGE]: 'OpenAI',
  [AI_EMBEDDING_MODEL.BERT_BASE]: 'HuggingFace',
  [AI_EMBEDDING_MODEL.BERT_LARGE]: 'HuggingFace',
  [AI_EMBEDDING_MODEL.SBERT_ALL_MPNET_BASE]: 'SBERT',
  [AI_EMBEDDING_MODEL.SBERT_ALL_MINILM]: 'SBERT',
  [AI_EMBEDDING_MODEL.COHERE_EMBED_ENGLISH]: 'Cohere',
  [AI_EMBEDDING_MODEL.COHERE_EMBED_MULTILINGUAL]: 'Cohere',
} as const;

/**
 * এম্বেডিং টাইপ এনাম
 */
export const AI_EMBEDDING_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  MULTIMODAL: 'multimodal',
} as const;

/**
 * AI_EMBEDDING_TYPE থেকে টাইপ
 */
export type AIEmbeddingType = (typeof AI_EMBEDDING_TYPE)[keyof typeof AI_EMBEDDING_TYPE];

/**
 * এম্বেডিং টাইপ লেবেল
 */
export const AI_EMBEDDING_TYPE_LABELS: Record<AIEmbeddingType, string> = {
  [AI_EMBEDDING_TYPE.TEXT]: 'Text',
  [AI_EMBEDDING_TYPE.IMAGE]: 'Image',
  [AI_EMBEDDING_TYPE.AUDIO]: 'Audio',
  [AI_EMBEDDING_TYPE.VIDEO]: 'Video',
  [AI_EMBEDDING_TYPE.MULTIMODAL]: 'Multimodal',
} as const;

/**
 * এম্বেডিং কনফিগারেশন
 */
export interface AIEmbeddingConfig {
  model: AIEmbeddingModelType;
  dimension: number;
  batchSize: number;
  cacheTTL: number;
  type: AIEmbeddingType;
  normalize: boolean;
  truncate: boolean;
  maxTokens: number;
}

/**
 * এম্বেডিং ডিফল্ট কনফিগারেশন
 */
export const AI_EMBEDDING_DEFAULT_CONFIG: AIEmbeddingConfig = {
  model: AI_EMBEDDING_DEFAULT_MODEL as AIEmbeddingModelType,
  dimension: AI_EMBEDDING_DEFAULT_DIMENSION,
  batchSize: AI_EMBEDDING_BATCH_SIZE,
  cacheTTL: AI_EMBEDDING_CACHE_TTL,
  type: AI_EMBEDDING_TYPE.TEXT,
  normalize: true,
  truncate: true,
  maxTokens: 8191,
} as const;

/**
 * এম্বেডিং ফিল্টার
 */
export interface AIEmbeddingFilter {
  model?: AIEmbeddingModelType;
  type?: AIEmbeddingType;
  dimension?: number;
  minDimension?: number;
  maxDimension?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * এম্বেডিং রেসপন্স
 */
export interface AIEmbeddingResponse<T = number[]> {
  id: string;
  embedding: T;
  model: AIEmbeddingModelType;
  type: AIEmbeddingType;
  dimension: number;
  metadata: Record<string, unknown>;
  timestamp: Date;
}

/**
 * এম্বেডিং ব্যাচ রেসপন্স
 */
export interface AIEmbeddingBatchResponse<T = number[]> {
  embeddings: AIEmbeddingResponse<T>[];
  total: number;
  model: AIEmbeddingModelType;
  dimension: number;
  processingTime: number;
}

/**
 * এম্বেডিং মডেল ক্যাটাগরি
 */
export const AI_EMBEDDING_MODEL_CATEGORIES = {
  OPENAI: [
    AI_EMBEDDING_MODEL.TEXT_EMBEDDING_ADA_002,
    AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_SMALL,
    AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_LARGE,
  ] as const,
  HUGGINGFACE: [AI_EMBEDDING_MODEL.BERT_BASE, AI_EMBEDDING_MODEL.BERT_LARGE] as const,
  SBERT: [AI_EMBEDDING_MODEL.SBERT_ALL_MPNET_BASE, AI_EMBEDDING_MODEL.SBERT_ALL_MINILM] as const,
  COHERE: [
    AI_EMBEDDING_MODEL.COHERE_EMBED_ENGLISH,
    AI_EMBEDDING_MODEL.COHERE_EMBED_MULTILINGUAL,
  ] as const,
} as const;

/**
 * এম্বেডিং মডেল ক্যাটাগরি লেবেল
 */
export const AI_EMBEDDING_MODEL_CATEGORY_LABELS = {
  OPENAI: 'OpenAI',
  HUGGINGFACE: 'HuggingFace',
  SBERT: 'Sentence-BERT',
  COHERE: 'Cohere',
} as const;

/**
 * এম্বেডিং মডেল ডাইমেনশন গ্রুপ
 */
export const AI_EMBEDDING_DIMENSION_GROUPS = {
  SMALL: [AI_EMBEDDING_MODEL.SBERT_ALL_MINILM] as const,
  MEDIUM: [
    AI_EMBEDDING_MODEL.BERT_BASE,
    AI_EMBEDDING_MODEL.SBERT_ALL_MPNET_BASE,
    AI_EMBEDDING_MODEL.COHERE_EMBED_ENGLISH,
    AI_EMBEDDING_MODEL.COHERE_EMBED_MULTILINGUAL,
  ] as const,
  LARGE: [
    AI_EMBEDDING_MODEL.TEXT_EMBEDDING_ADA_002,
    AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_SMALL,
  ] as const,
  XLARGE: [AI_EMBEDDING_MODEL.BERT_LARGE, AI_EMBEDDING_MODEL.TEXT_EMBEDDING_3_LARGE] as const,
} as const;

/**
 * এম্বেডিং ডাইমেনশন গ্রুপ লেবেল
 */
export const AI_EMBEDDING_DIMENSION_GROUP_LABELS = {
  SMALL: 'Small (<512)',
  MEDIUM: 'Medium (512-1024)',
  LARGE: 'Large (1024-2048)',
  XLARGE: 'X-Large (>2048)',
} as const;
