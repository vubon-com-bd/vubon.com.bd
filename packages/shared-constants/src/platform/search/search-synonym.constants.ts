export const SEARCH_SYNONYM_TYPE = {
  EQUIVALENT: 'equivalent',
  EXPLICIT: 'explicit',
  ONE_WAY: 'one_way',
  MULTI_WAY: 'multi_way',
  HYPERNYM: 'hypernym',
  HYPONYM: 'hyponym',
} as const;

export const SEARCH_SYNONYM = {
  MAX_SYNONYMS_PER_GROUP: 50,
  MAX_SYNONYM_GROUPS: 10000,
  MAX_TERM_LENGTH: 100,
  CASE_SENSITIVE: false,
  EXPAND: true,
  LANGUAGES: ['bn', 'en'],
  RETENTION_DAYS: 365,
} as const;

export type SearchSynonymTypeType = (typeof SEARCH_SYNONYM_TYPE)[keyof typeof SEARCH_SYNONYM_TYPE];
