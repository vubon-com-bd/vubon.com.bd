import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { SEARCH_TYPE } from '../platform/search/search-type.constants';
import { SEARCH_MATCH } from '../platform/search/search-match.constants';
import { SEARCH_BOOST } from '../platform/search/search-boost.constants';

export const AI_SEARCH = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEARCH_TYPE.TYPES,
    SEMANTIC: 'semantic',
    VECTOR: 'vector',
    HYBRID: 'hybrid',
    NEURAL: 'neural',
  },
  SEARCH_TYPE: { ...SEARCH_TYPE },
  SEARCH_MATCH: { ...SEARCH_MATCH },
  SEARCH_BOOST: { ...SEARCH_BOOST },
  SEMANTIC_SEARCH_MODELS: {
    BERT: 'bert',
    SBERT: 'sbert',
    MPNET: 'mpnet',
    INSTRUCTOR: 'instructor',
  },
  VECTOR_SEARCH_DIMENSIONS: {
    SMALL: 384,
    MEDIUM: 768,
    LARGE: 1024,
  },
  SEMANTIC_SIMILARITY_THRESHOLD: 0.7,
  MAX_SEMANTIC_RESULTS: 50,
  HYBRID_SEARCH_WEIGHTS: {
    KEYWORD: 0.4,
    SEMANTIC: 0.4,
    VECTOR: 0.2,
  },
} as const;
