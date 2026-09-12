import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_SYNONYM = {
  TYPES: {
    ...COMMON_TYPES,
    EQUIVALENT: 'equivalent',
    EXPLICIT: 'explicit',
    ALIAS: 'alias',
    ACROSS: 'across',
  },
  SYNONYM_WEIGHTS: {
    EXACT_MATCH: 1.0,
    SYNONYM: 0.8,
    BROAD: 0.6,
    RELATED: 0.4,
  },
  MAX_SYNONYMS_PER_TERM: 20,
  SYNONYM_CACHE_TTL_HOURS: 24,
} as const;
