import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_VECTOR } from './ai-vector.constants';

export const AI_SIMILARITY = {
  TYPES: {
    ...COMMON_TYPES,
    COSINE: 'cosine',
    EUCLIDEAN: 'euclidean',
    DOT_PRODUCT: 'dot_product',
    MANHATTAN: 'manhattan',
    JACCARD: 'jaccard',
    PEARSON: 'pearson',
  },
  AI_VECTOR: { ...AI_VECTOR },
  SIMILARITY_THRESHOLDS: {
    EXACT: 0.95,
    HIGH: 0.8,
    MEDIUM: 0.6,
    LOW: 0.4,
  },
  DEFAULT_SIMILARITY_METRIC: 'cosine',
  MAX_SIMILARITY_RESULTS: 100,
  MIN_SIMILARITY_SCORE: 0.3,
  SIMILARITY_CACHE_TTL_HOURS: 6,
} as const;
