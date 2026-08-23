/**
 * Search Stopword Constants
 * Stopword configurations for search
 */

export const SEARCH_STOPWORD = {
  // Stopword Types
  TYPES: {
    STANDARD: 'standard',
    CUSTOM: 'custom',
    LANGUAGE: 'language',
    DOMAIN: 'domain',
    CONTEXTUAL: 'contextual',
  } as const,

  // Stopword Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    ALL: 'all',
  } as const,

  // Stopword Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'standard',
    DEFAULT_LANGUAGE: 'en',
    MAX_STOPWORDS: 1000,
    CASE_SENSITIVE: false,
    REMOVE_DUPLICATES: true,
    AUTO_UPDATE: true,
    UPDATE_INTERVAL: 86400,
  } as const,

  // Stopword Limits
  LIMITS: {
    MAX_STOPWORDS: 1000,
    MIN_STOPWORD_LENGTH: 1,
    MAX_STOPWORD_LENGTH: 30,
    MAX_STOPWORDS_PER_LANGUAGE: 500,
    MIN_LANGUAGE_STOPWORDS: 10,
  } as const,

  // Common English Stopwords
  COMMON_EN: [
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'for',
    'nor',
    'on',
    'at',
    'to',
    'by',
    'in',
    'of',
    'with',
    'without',
    'via',
    'per',
    'as',
    'so',
    'yet',
    'if',
    'then',
    'else',
    'when',
    'where',
    'which',
    'who',
    'whom',
    'whose',
    'that',
    'this',
    'these',
    'those',
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'must',
    'shall',
  ] as const,
} as const;

// Stopword Types
export type SearchStopwordType = (typeof SEARCH_STOPWORD.TYPES)[keyof typeof SEARCH_STOPWORD.TYPES];

// Stopword Languages
export type SearchStopwordLanguage =
  (typeof SEARCH_STOPWORD.LANGUAGES)[keyof typeof SEARCH_STOPWORD.LANGUAGES];

// Stopword Defaults
export type SearchStopwordDefault =
  (typeof SEARCH_STOPWORD.DEFAULTS)[keyof typeof SEARCH_STOPWORD.DEFAULTS];

// Stopword Limits
export type SearchStopwordLimit =
  (typeof SEARCH_STOPWORD.LIMITS)[keyof typeof SEARCH_STOPWORD.LIMITS];

// Utility Functions
export function searchStopwordGetTypeLabel(type: SearchStopwordType): string {
  const labels: Record<SearchStopwordType, string> = {
    [SEARCH_STOPWORD.TYPES.STANDARD]: 'Standard',
    [SEARCH_STOPWORD.TYPES.CUSTOM]: 'Custom',
    [SEARCH_STOPWORD.TYPES.LANGUAGE]: 'Language',
    [SEARCH_STOPWORD.TYPES.DOMAIN]: 'Domain',
    [SEARCH_STOPWORD.TYPES.CONTEXTUAL]: 'Contextual',
  };
  return labels[type] || 'Unknown Stopword Type';
}

export function searchStopwordGetLanguageLabel(language: SearchStopwordLanguage): string {
  const labels: Record<SearchStopwordLanguage, string> = {
    [SEARCH_STOPWORD.LANGUAGES.EN]: 'English',
    [SEARCH_STOPWORD.LANGUAGES.BN]: 'Bengali',
    [SEARCH_STOPWORD.LANGUAGES.HI]: 'Hindi',
    [SEARCH_STOPWORD.LANGUAGES.AR]: 'Arabic',
    [SEARCH_STOPWORD.LANGUAGES.ES]: 'Spanish',
    [SEARCH_STOPWORD.LANGUAGES.FR]: 'French',
    [SEARCH_STOPWORD.LANGUAGES.DE]: 'German',
    [SEARCH_STOPWORD.LANGUAGES.ZH]: 'Chinese',
    [SEARCH_STOPWORD.LANGUAGES.JA]: 'Japanese',
    [SEARCH_STOPWORD.LANGUAGES.RU]: 'Russian',
    [SEARCH_STOPWORD.LANGUAGES.ALL]: 'All Languages',
  };
  return labels[language] || 'Unknown Language';
}

export function searchStopwordIsStandardType(type: SearchStopwordType): boolean {
  return type === SEARCH_STOPWORD.TYPES.STANDARD;
}

export function searchStopwordIsCustomType(type: SearchStopwordType): boolean {
  return type === SEARCH_STOPWORD.TYPES.CUSTOM;
}

export function searchStopwordIsLanguageType(type: SearchStopwordType): boolean {
  return type === SEARCH_STOPWORD.TYPES.LANGUAGE;
}

export function searchStopwordGetMaxStopwords(): number {
  return SEARCH_STOPWORD.DEFAULTS.MAX_STOPWORDS;
}

export function searchStopwordGetCommonEn(): readonly string[] {
  return SEARCH_STOPWORD.COMMON_EN;
}

export function searchStopwordIsCommonEn(word: string): boolean {
  return SEARCH_STOPWORD.COMMON_EN.includes(
    word.toLowerCase() as (typeof SEARCH_STOPWORD.COMMON_EN)[number]
  );
}

export function searchStopwordIsCaseSensitive(): boolean {
  return SEARCH_STOPWORD.DEFAULTS.CASE_SENSITIVE;
}

export function searchStopwordShouldRemoveDuplicates(): boolean {
  return SEARCH_STOPWORD.DEFAULTS.REMOVE_DUPLICATES;
}

export function searchStopwordShouldAutoUpdate(): boolean {
  return SEARCH_STOPWORD.DEFAULTS.AUTO_UPDATE;
}
