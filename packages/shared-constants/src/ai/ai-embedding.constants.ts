export const AI_EMBEDDING_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  MULTIMODAL: 'multimodal',
  CODE: 'code',
} as const;

export const AI_EMBEDDING_MODEL = {
  TEXT_EMBEDDING_3_LARGE: 'text-embedding-3-large',
  TEXT_EMBEDDING_3_SMALL: 'text-embedding-3-small',
  TEXT_EMBEDDING_ADA_002: 'text-embedding-ada-002',
  COHERE_EMBED: 'embed-multilingual-v3.0',
  BGE_LARGE: 'bge-large-en-v1.5',
  E5_LARGE: 'e5-large-v2',
  MULTILINGUAL_E5: 'multilingual-e5-large',
} as const;

export const AI_EMBEDDING_DIMENSION = {
  DIM_384: 384,
  DIM_512: 512,
  DIM_768: 768,
  DIM_1024: 1024,
  DIM_1536: 1536,
  DIM_2048: 2048,
  DIM_3072: 3072,
  DIM_4096: 4096,
} as const;

export const AI_EMBEDDING = {
  TYPE: AI_EMBEDDING_TYPE,
  MODEL: AI_EMBEDDING_MODEL,
  DIMENSION: AI_EMBEDDING_DIMENSION,
  DEFAULT_DIMENSION: AI_EMBEDDING_DIMENSION.DIM_1536,
  MAX_BATCH_SIZE: 2048,
  MAX_INPUT_LENGTH: 8191,
  NORMALIZE: true,
  CACHE_ENABLED: true,
  CACHE_TTL_SECONDS: 86400,
} as const;

export type AiEmbeddingType = typeof AI_EMBEDDING;
