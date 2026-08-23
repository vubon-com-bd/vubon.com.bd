/**
 * Search Relevance Constants
 * Relevance configurations for search
 */

export const SEARCH_RELEVANCE = {
  // Relevance Types
  TYPES: {
    TF_IDF: 'tf_idf',
    BM25: 'bm25',
    VECTOR: 'vector',
    SEMANTIC: 'semantic',
    HYBRID: 'hybrid',
    LEARNING: 'learning',
    CUSTOM: 'custom',
  } as const,

  // Relevance Factors
  FACTORS: {
    TERM_FREQUENCY: 'term_frequency',
    INVERSE_DOC_FREQUENCY: 'inverse_doc_frequency',
    FIELD_LENGTH: 'field_length',
    POSITION: 'position',
    DEFAULT: 'default',
  } as const,

  // Relevance Weights
  WEIGHTS: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    CONTENT: 'content',
    TAGS: 'tags',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    DEFAULT: 'default',
  } as const,

  // Relevance Weight Values
  WEIGHT_VALUES: {
    TITLE: 3.0,
    DESCRIPTION: 2.0,
    CONTENT: 1.0,
    TAGS: 1.5,
    CATEGORY: 2.5,
    BRAND: 2.0,
    VENDOR: 1.5,
    DEFAULT: 1.0,
  } as const,

  // Relevance Factor Values
  FACTOR_VALUES: {
    TERM_FREQUENCY: 0.4,
    INVERSE_DOC_FREQUENCY: 0.3,
    FIELD_LENGTH: 0.2,
    POSITION: 0.1,
    DEFAULT: 0.5,
  } as const,

  // Relevance Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'bm25',
    MIN_SCORE: 0.1,
    MAX_SCORE: 10.0,
    DEFAULT_BOOST: 1.0,
    MIN_SHOULD_MATCH: 0.75,
    OPERATOR: 'or',
    ZERO_TERMS_QUERY: 'none',
    FUZZY_EDIT_DISTANCE: 2,
    PREFIX_LENGTH: 0,
    MAX_EXPANSIONS: 50,
    MIN_GRAM: 3,
    MAX_GRAM: 4,
  } as const,

  // Relevance Limits
  LIMITS: {
    MIN_SCORE: 0.0,
    MAX_SCORE: 100.0,
    MIN_BOOST: 0.1,
    MAX_BOOST: 10.0,
    MAX_FUZZY_EDIT_DISTANCE: 5,
    MAX_EXPANSIONS: 100,
    MAX_GRAM: 10,
    MIN_GRAM: 2,
    MAX_FIELDS: 20,
  } as const,
} as const;

// Relevance Types
export type SearchRelevanceType =
  (typeof SEARCH_RELEVANCE.TYPES)[keyof typeof SEARCH_RELEVANCE.TYPES];

// Relevance Factors
export type SearchRelevanceFactor =
  (typeof SEARCH_RELEVANCE.FACTORS)[keyof typeof SEARCH_RELEVANCE.FACTORS];

// Relevance Weights
export type SearchRelevanceWeight =
  (typeof SEARCH_RELEVANCE.WEIGHTS)[keyof typeof SEARCH_RELEVANCE.WEIGHTS];

// Relevance Weight Values
export type SearchRelevanceWeightValue =
  (typeof SEARCH_RELEVANCE.WEIGHT_VALUES)[keyof typeof SEARCH_RELEVANCE.WEIGHT_VALUES];

// Relevance Factor Values
export type SearchRelevanceFactorValue =
  (typeof SEARCH_RELEVANCE.FACTOR_VALUES)[keyof typeof SEARCH_RELEVANCE.FACTOR_VALUES];

// Relevance Defaults
export type SearchRelevanceDefault =
  (typeof SEARCH_RELEVANCE.DEFAULTS)[keyof typeof SEARCH_RELEVANCE.DEFAULTS];

// Relevance Limits
export type SearchRelevanceLimit =
  (typeof SEARCH_RELEVANCE.LIMITS)[keyof typeof SEARCH_RELEVANCE.LIMITS];

// Utility Functions
export function searchRelevanceGetTypeLabel(type: SearchRelevanceType): string {
  const labels: Record<SearchRelevanceType, string> = {
    [SEARCH_RELEVANCE.TYPES.TF_IDF]: 'TF-IDF',
    [SEARCH_RELEVANCE.TYPES.BM25]: 'BM25',
    [SEARCH_RELEVANCE.TYPES.VECTOR]: 'Vector',
    [SEARCH_RELEVANCE.TYPES.SEMANTIC]: 'Semantic',
    [SEARCH_RELEVANCE.TYPES.HYBRID]: 'Hybrid',
    [SEARCH_RELEVANCE.TYPES.LEARNING]: 'Learning to Rank',
    [SEARCH_RELEVANCE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Relevance Type';
}

export function searchRelevanceGetFactorLabel(factor: SearchRelevanceFactor): string {
  const labels: Record<SearchRelevanceFactor, string> = {
    [SEARCH_RELEVANCE.FACTORS.TERM_FREQUENCY]: 'Term Frequency',
    [SEARCH_RELEVANCE.FACTORS.INVERSE_DOC_FREQUENCY]: 'Inverse Document Frequency',
    [SEARCH_RELEVANCE.FACTORS.FIELD_LENGTH]: 'Field Length',
    [SEARCH_RELEVANCE.FACTORS.POSITION]: 'Position',
    [SEARCH_RELEVANCE.FACTORS.DEFAULT]: 'Default',
  };
  return labels[factor] || 'Unknown Factor';
}

export function searchRelevanceGetWeightLabel(weight: SearchRelevanceWeight): string {
  const labels: Record<SearchRelevanceWeight, string> = {
    [SEARCH_RELEVANCE.WEIGHTS.TITLE]: 'Title',
    [SEARCH_RELEVANCE.WEIGHTS.DESCRIPTION]: 'Description',
    [SEARCH_RELEVANCE.WEIGHTS.CONTENT]: 'Content',
    [SEARCH_RELEVANCE.WEIGHTS.TAGS]: 'Tags',
    [SEARCH_RELEVANCE.WEIGHTS.CATEGORY]: 'Category',
    [SEARCH_RELEVANCE.WEIGHTS.BRAND]: 'Brand',
    [SEARCH_RELEVANCE.WEIGHTS.VENDOR]: 'Vendor',
    [SEARCH_RELEVANCE.WEIGHTS.DEFAULT]: 'Default',
  };
  return labels[weight] || 'Unknown Weight';
}

export function searchRelevanceGetWeightValue(weight: SearchRelevanceWeight): number {
  const values: Record<SearchRelevanceWeight, number> = {
    [SEARCH_RELEVANCE.WEIGHTS.TITLE]: SEARCH_RELEVANCE.WEIGHT_VALUES.TITLE,
    [SEARCH_RELEVANCE.WEIGHTS.DESCRIPTION]: SEARCH_RELEVANCE.WEIGHT_VALUES.DESCRIPTION,
    [SEARCH_RELEVANCE.WEIGHTS.CONTENT]: SEARCH_RELEVANCE.WEIGHT_VALUES.CONTENT,
    [SEARCH_RELEVANCE.WEIGHTS.TAGS]: SEARCH_RELEVANCE.WEIGHT_VALUES.TAGS,
    [SEARCH_RELEVANCE.WEIGHTS.CATEGORY]: SEARCH_RELEVANCE.WEIGHT_VALUES.CATEGORY,
    [SEARCH_RELEVANCE.WEIGHTS.BRAND]: SEARCH_RELEVANCE.WEIGHT_VALUES.BRAND,
    [SEARCH_RELEVANCE.WEIGHTS.VENDOR]: SEARCH_RELEVANCE.WEIGHT_VALUES.VENDOR,
    [SEARCH_RELEVANCE.WEIGHTS.DEFAULT]: SEARCH_RELEVANCE.WEIGHT_VALUES.DEFAULT,
  };
  return values[weight] || SEARCH_RELEVANCE.WEIGHT_VALUES.DEFAULT;
}

export function searchRelevanceGetFactorValue(factor: SearchRelevanceFactor): number {
  const values: Record<SearchRelevanceFactor, number> = {
    [SEARCH_RELEVANCE.FACTORS.TERM_FREQUENCY]: SEARCH_RELEVANCE.FACTOR_VALUES.TERM_FREQUENCY,
    [SEARCH_RELEVANCE.FACTORS.INVERSE_DOC_FREQUENCY]:
      SEARCH_RELEVANCE.FACTOR_VALUES.INVERSE_DOC_FREQUENCY,
    [SEARCH_RELEVANCE.FACTORS.FIELD_LENGTH]: SEARCH_RELEVANCE.FACTOR_VALUES.FIELD_LENGTH,
    [SEARCH_RELEVANCE.FACTORS.POSITION]: SEARCH_RELEVANCE.FACTOR_VALUES.POSITION,
    [SEARCH_RELEVANCE.FACTORS.DEFAULT]: SEARCH_RELEVANCE.FACTOR_VALUES.DEFAULT,
  };
  return values[factor] || SEARCH_RELEVANCE.FACTOR_VALUES.DEFAULT;
}

export function searchRelevanceIsBM25(type: SearchRelevanceType): boolean {
  return type === SEARCH_RELEVANCE.TYPES.BM25;
}

export function searchRelevanceIsTFIDF(type: SearchRelevanceType): boolean {
  return type === SEARCH_RELEVANCE.TYPES.TF_IDF;
}

export function searchRelevanceIsSemantic(type: SearchRelevanceType): boolean {
  return type === SEARCH_RELEVANCE.TYPES.SEMANTIC;
}

export function searchRelevanceIsHybrid(type: SearchRelevanceType): boolean {
  return type === SEARCH_RELEVANCE.TYPES.HYBRID;
}

export function searchRelevanceGetDefaultType(): SearchRelevanceType {
  return SEARCH_RELEVANCE.DEFAULTS.DEFAULT_TYPE;
}

export function searchRelevanceGetMinScore(): number {
  return SEARCH_RELEVANCE.DEFAULTS.MIN_SCORE;
}

export function searchRelevanceGetDefaultBoost(): number {
  return SEARCH_RELEVANCE.DEFAULTS.DEFAULT_BOOST;
}

export function searchRelevanceGetMinShouldMatch(): number {
  return SEARCH_RELEVANCE.DEFAULTS.MIN_SHOULD_MATCH;
}

export function searchRelevanceGetTitleWeight(): number {
  return SEARCH_RELEVANCE.WEIGHT_VALUES.TITLE;
}

export function searchRelevanceGetDescriptionWeight(): number {
  return SEARCH_RELEVANCE.WEIGHT_VALUES.DESCRIPTION;
}
