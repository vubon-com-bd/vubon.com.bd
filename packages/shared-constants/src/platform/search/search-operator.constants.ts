export const SEARCH_OPERATOR = {
  AND: 'and',
  OR: 'or',
  NOT: 'not',
  MUST: 'must',
  MUST_NOT: 'must_not',
  SHOULD: 'should',
  FILTER: 'filter',
} as const;

export const SEARCH_BOOLEAN = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  PLUS: '+',
  MINUS: '-',
} as const;

export const SEARCH_WILDCARD = {
  ANY_CHARS: '*',
  SINGLE_CHAR: '?',
  FUZZY: '~',
  PHRASE: '"',
  GROUP_OPEN: '(',
  GROUP_CLOSE: ')',
} as const;

export type SearchOperatorType = (typeof SEARCH_OPERATOR)[keyof typeof SEARCH_OPERATOR];
export type SearchBooleanType = (typeof SEARCH_BOOLEAN)[keyof typeof SEARCH_BOOLEAN];
