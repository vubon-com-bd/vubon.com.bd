import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_MATCH = {
  TYPES: {
    ...COMMON_TYPES,
    EXACT: 'exact',
    PREFIX: 'prefix',
    SUFFIX: 'suffix',
    CONTAINS: 'contains',
    FUZZY: 'fuzzy',
    WILDCARD: 'wildcard',
    REGEX: 'regex',
    SYNONYM: 'synonym',
    STEMMED: 'stemmed',
  },
  MATCH_PRIORITIES: {
    EXACT: 10,
    PREFIX: 8,
    CONTAINS: 6,
    FUZZY: 4,
    STEMMED: 3,
    SYNONYM: 2,
    WILDCARD: 1,
  },
  MIN_FUZZY_SIMILARITY: 0.7,
  MAX_FUZZY_EDIT_DISTANCE: 2,
} as const;
