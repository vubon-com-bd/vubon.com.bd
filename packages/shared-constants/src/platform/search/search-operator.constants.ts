import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SEARCH_OPERATOR = {
  TYPES: {
    ...COMMON_TYPES,
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    NEAR: 'near',
    PHRASE: 'phrase',
    WILDCARD: 'wildcard',
    REGEX: 'regex',
    FUZZY: 'fuzzy',
  },
  OPERATOR_SYMBOLS: {
    AND: '+',
    OR: '|',
    NOT: '-',
    PHRASE: '"',
    WILDCARD: '*',
    FUZZY: '~',
  },
  DEFAULT_OPERATOR: 'or',
} as const;
