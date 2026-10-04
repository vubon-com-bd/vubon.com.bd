export const SEO_KEYWORD_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LONG_TAIL: 'long_tail',
  BRANDED: 'branded',
  NON_BRANDED: 'non_branded',
  LSI: 'lsi',
  NEGATIVE: 'negative',
} as const;

export const SEO_KEYWORD_DIFFICULTY = {
  VERY_EASY: 'very_easy',
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  VERY_HARD: 'very_hard',
} as const;

export const SEO_KEYWORD_INTENT = {
  INFORMATIONAL: 'informational',
  NAVIGATIONAL: 'navigational',
  COMMERCIAL: 'commercial',
  TRANSACTIONAL: 'transactional',
} as const;

export const SEO_KEYWORD = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 100,
  MAX_KEYWORDS_PER_PAGE: 10,
  MAX_DENSITY_PERCENT: 3,
  MIN_DENSITY_PERCENT: 0.5,
  SEARCH_VOLUME_MIN: 0,
  DIFFICULTY_MIN: 0,
  DIFFICULTY_MAX: 100,
} as const;

export type SeoKeywordTypeType = (typeof SEO_KEYWORD_TYPE)[keyof typeof SEO_KEYWORD_TYPE];
export type SeoKeywordDifficultyType =
  (typeof SEO_KEYWORD_DIFFICULTY)[keyof typeof SEO_KEYWORD_DIFFICULTY];
export type SeoKeywordIntentType = (typeof SEO_KEYWORD_INTENT)[keyof typeof SEO_KEYWORD_INTENT];
