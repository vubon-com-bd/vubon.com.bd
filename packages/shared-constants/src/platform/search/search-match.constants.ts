export const SEARCH_MATCH_TYPE = {
  EXACT: 'exact',
  FUZZY: 'fuzzy',
  PHRASE: 'phrase',
  PREFIX: 'prefix',
  WILDCARD: 'wildcard',
  REGEXP: 'regexp',
  PARTIAL: 'partial',
  COMPLEMENT: 'complement',
} as const;

export const SEARCH_FUZZINESS = {
  OFF: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 'AUTO',
} as const;

export const SEARCH_MATCH = {
  MIN_TERM_LENGTH: 1,
  MAX_FUZZY_EXPANSIONS: 50,
  MAX_PHRASE_SLOP: 3,
  PREFIX_LENGTH: 3,
  MAX_WILDCARD_EXPANSIONS: 100,
  CASE_SENSITIVE: false,
  DIACRITICS_INSENSITIVE: true,
} as const;

export type SearchMatchTypeType = (typeof SEARCH_MATCH_TYPE)[keyof typeof SEARCH_MATCH_TYPE];
export type SearchFuzzinessType = (typeof SEARCH_FUZZINESS)[keyof typeof SEARCH_FUZZINESS];
