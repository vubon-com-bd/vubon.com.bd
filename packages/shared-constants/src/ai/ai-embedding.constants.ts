import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_MODEL_PROVIDER } from './ai-model-provider.constants';

export const AI_EMBEDDING = {
  TYPES: {
    ...COMMON_TYPES,
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    MULTIMODAL: 'multimodal',
    HYBRID: 'hybrid',
  },
  AI_MODEL_PROVIDER: { ...AI_MODEL_PROVIDER },
  EMBEDDING_MODELS: {
    OPENAI: 'text-embedding-ada-002',
    GOOGLE: 'textembedding-gecko',
    COHERE: 'embed-english-v2.0',
    SENTENCE_TRANSFORMERS: 'all-MiniLM-L6-v2',
  },
  EMBEDDING_DIMENSIONS: {
    SMALL: 384,
    MEDIUM: 768,
    LARGE: 1024,
    XL: 1536,
  },
  MAX_BATCH_SIZE: 100,
  EMBEDDING_TIMEOUT_MS: 5000,
  CACHE_TTL_HOURS: 24,
} as const;
