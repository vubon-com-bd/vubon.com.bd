/**
 * Search Synonym Constants
 * Synonym configurations for search
 */

export const SEARCH_SYNONYM = {
  // Synonym Types
  TYPES: {
    EQUIVALENT: 'equivalent',
    EXPLICIT: 'explicit',
    ONE_WAY: 'one_way',
    MULTI_WAY: 'multi_way',
    CONTEXTUAL: 'contextual',
    CUSTOM: 'custom',
  } as const,

  // Synonym Formats
  FORMATS: {
    SOLR: 'solr',
    WORDNET: 'wordnet',
    CSV: 'csv',
    JSON: 'json',
    CUSTOM: 'custom',
  } as const,

  // Synonym Scopes
  SCOPES: {
    GLOBAL: 'global',
    INDEX: 'index',
    FIELD: 'field',
    QUERY: 'query',
    CUSTOM: 'custom',
  } as const,

  // Synonym Relations
  RELATIONS: {
    SYNONYM: 'synonym',
    HYPERNYM: 'hypernym',
    HYPONYM: 'hyponym',
    RELATED: 'related',
    ANTONYM: 'antonym',
    CUSTOM: 'custom',
  } as const,

  // Synonym Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'equivalent',
    DEFAULT_FORMAT: 'solr',
    DEFAULT_SCOPE: 'global',
    DEFAULT_RELATION: 'synonym',
    MAX_SYNONYMS: 100,
    MAX_SYNONYM_GROUP: 20,
    MAX_CHARACTERS: 100,
    CASE_SENSITIVE: false,
    EXPAND: true,
  } as const,

  // Synonym Limits
  LIMITS: {
    MAX_SYNONYMS: 100,
    MAX_SYNONYM_GROUP: 20,
    MAX_CHARACTERS: 100,
    MAX_TERMS: 50,
    MAX_GROUPS: 1000,
    MIN_TERM_LENGTH: 2,
    MAX_TERM_LENGTH: 50,
  } as const,
} as const;

// Synonym Types
export type SearchSynonymType = (typeof SEARCH_SYNONYM.TYPES)[keyof typeof SEARCH_SYNONYM.TYPES];

// Synonym Formats
export type SearchSynonymFormat =
  (typeof SEARCH_SYNONYM.FORMATS)[keyof typeof SEARCH_SYNONYM.FORMATS];

// Synonym Scopes
export type SearchSynonymScope = (typeof SEARCH_SYNONYM.SCOPES)[keyof typeof SEARCH_SYNONYM.SCOPES];

// Synonym Relations
export type SearchSynonymRelation =
  (typeof SEARCH_SYNONYM.RELATIONS)[keyof typeof SEARCH_SYNONYM.RELATIONS];

// Synonym Defaults
export type SearchSynonymDefault =
  (typeof SEARCH_SYNONYM.DEFAULTS)[keyof typeof SEARCH_SYNONYM.DEFAULTS];

// Synonym Limits
export type SearchSynonymLimit = (typeof SEARCH_SYNONYM.LIMITS)[keyof typeof SEARCH_SYNONYM.LIMITS];

// Utility Functions
export function searchSynonymGetTypeLabel(type: SearchSynonymType): string {
  const labels: Record<SearchSynonymType, string> = {
    [SEARCH_SYNONYM.TYPES.EQUIVALENT]: 'Equivalent',
    [SEARCH_SYNONYM.TYPES.EXPLICIT]: 'Explicit',
    [SEARCH_SYNONYM.TYPES.ONE_WAY]: 'One-Way',
    [SEARCH_SYNONYM.TYPES.MULTI_WAY]: 'Multi-Way',
    [SEARCH_SYNONYM.TYPES.CONTEXTUAL]: 'Contextual',
    [SEARCH_SYNONYM.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Synonym Type';
}

export function searchSynonymGetFormatLabel(format: SearchSynonymFormat): string {
  const labels: Record<SearchSynonymFormat, string> = {
    [SEARCH_SYNONYM.FORMATS.SOLR]: 'Solr',
    [SEARCH_SYNONYM.FORMATS.WORDNET]: 'WordNet',
    [SEARCH_SYNONYM.FORMATS.CSV]: 'CSV',
    [SEARCH_SYNONYM.FORMATS.JSON]: 'JSON',
    [SEARCH_SYNONYM.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function searchSynonymGetScopeLabel(scope: SearchSynonymScope): string {
  const labels: Record<SearchSynonymScope, string> = {
    [SEARCH_SYNONYM.SCOPES.GLOBAL]: 'Global',
    [SEARCH_SYNONYM.SCOPES.INDEX]: 'Index',
    [SEARCH_SYNONYM.SCOPES.FIELD]: 'Field',
    [SEARCH_SYNONYM.SCOPES.QUERY]: 'Query',
    [SEARCH_SYNONYM.SCOPES.CUSTOM]: 'Custom',
  };
  return labels[scope] || 'Unknown Scope';
}

export function searchSynonymGetRelationLabel(relation: SearchSynonymRelation): string {
  const labels: Record<SearchSynonymRelation, string> = {
    [SEARCH_SYNONYM.RELATIONS.SYNONYM]: 'Synonym',
    [SEARCH_SYNONYM.RELATIONS.HYPERNYM]: 'Hypernym',
    [SEARCH_SYNONYM.RELATIONS.HYPONYM]: 'Hyponym',
    [SEARCH_SYNONYM.RELATIONS.RELATED]: 'Related',
    [SEARCH_SYNONYM.RELATIONS.ANTONYM]: 'Antonym',
    [SEARCH_SYNONYM.RELATIONS.CUSTOM]: 'Custom',
  };
  return labels[relation] || 'Unknown Relation';
}

export function searchSynonymIsEquivalentType(type: SearchSynonymType): boolean {
  return type === SEARCH_SYNONYM.TYPES.EQUIVALENT;
}

export function searchSynonymIsOneWayType(type: SearchSynonymType): boolean {
  return type === SEARCH_SYNONYM.TYPES.ONE_WAY;
}

export function searchSynonymIsMultiWayType(type: SearchSynonymType): boolean {
  return type === SEARCH_SYNONYM.TYPES.MULTI_WAY;
}

export function searchSynonymIsContextualType(type: SearchSynonymType): boolean {
  return type === SEARCH_SYNONYM.TYPES.CONTEXTUAL;
}

export function searchSynonymGetMaxSynonyms(): number {
  return SEARCH_SYNONYM.DEFAULTS.MAX_SYNONYMS;
}

export function searchSynonymGetMaxSynonymGroup(): number {
  return SEARCH_SYNONYM.DEFAULTS.MAX_SYNONYM_GROUP;
}

export function searchSynonymIsCaseSensitive(): boolean {
  return SEARCH_SYNONYM.DEFAULTS.CASE_SENSITIVE;
}

export function searchSynonymShouldExpand(): boolean {
  return SEARCH_SYNONYM.DEFAULTS.EXPAND;
}
