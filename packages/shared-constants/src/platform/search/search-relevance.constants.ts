import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_RELEVANCE = {
  TYPES: {
    ...COMMON_TYPES,
    TEXT: 'text',
    SEMANTIC: 'semantic',
    VECTOR: 'vector',
    HYBRID: 'hybrid',
    PERSONALIZED: 'personalized',
  },
  RELEVANCE_SCORES: {
    EXCELLENT: 0.9,
    GOOD: 0.7,
    AVERAGE: 0.5,
    POOR: 0.3,
    NONE: 0.0,
  },
  RELEVANCE_WEIGHTS: {
    TITLE: 0.4,
    DESCRIPTION: 0.25,
    CONTENT: 0.15,
    CATEGORY: 0.1,
    TAGS: 0.05,
    OTHER: 0.05,
  },
  SEMANTIC_MODEL: 'bert-base-uncased',
  VECTOR_DIMENSION: 768,
  MIN_RELEVANCE_SCORE: 0.3,
} as const;
