/**
 * Search & Discovery Regular Expression Constants
 * Contains all regex patterns for search and discovery management
 */

export const SearchRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Mobile number pattern (Bangladesh)
  MOBILE: /^01[3-9]\d{8}$/,

  // URL validation pattern
  URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,

  // Bengali text pattern
  BENGALI: /^[\u0980-\u09FF\s]+$/,

  // Password validation pattern
  // At least 8 characters, at least one letter and one number
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,

  // Search specific patterns
  SEARCH: {
    QUERY: /^[a-zA-Z0-9\u0980-\u09FF\s\-_.,!?()&]{1,500}$/,
    FILTER: /^[a-zA-Z0-9_\-:]{1,100}$/,
    SORT: /^(asc|desc|ASC|DESC)$/,
  },

  // Discovery specific patterns
  DISCOVERY: {
    TAG: /^[a-zA-Z0-9\u0980-\u09FF_\-]{1,50}$/,
    CATEGORY: /^[a-zA-Z0-9\u0980-\u09FF\s\-_]{1,100}$/,
  },

  // Analytics patterns
  ANALYTICS: {
    EVENT_NAME: /^[a-zA-Z0-9_\-]{1,100}$/,
    PROPERTY_NAME: /^[a-zA-Z0-9_\-]{1,100}$/,
  },

  // ID patterns
  ID: {
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    NUMERIC: /^\d+$/,
  },

  // Text patterns
  TEXT: {
    WORD: /^[a-zA-Z0-9\u0980-\u09FF]+$/,
    SENTENCE: /^[a-zA-Z0-9\u0980-\u09FF\s\-_.,!?()&]{1,500}$/,
    PARAGRAPH: /^[\s\S]{1,5000}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
    PERCENTAGE: /^\d+(?:\.\d{1,2})?%$/,
  },

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    TIMESTAMP: /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },
} as const;

// Helper function to test regex patterns
export const SearchRegexTester = {
  testEmail: (value: string): boolean => SearchRegex.EMAIL.test(value),
  testMobile: (value: string): boolean => SearchRegex.MOBILE.test(value),
  testURL: (value: string): boolean => SearchRegex.URL.test(value),
  testBengali: (value: string): boolean => SearchRegex.BENGALI.test(value),
  testPassword: (value: string): boolean => SearchRegex.PASSWORD.test(value),
  testSearchQuery: (value: string): boolean => SearchRegex.SEARCH.QUERY.test(value),
  testUUID: (value: string): boolean => SearchRegex.ID.UUID.test(value),
  testTag: (value: string): boolean => SearchRegex.DISCOVERY.TAG.test(value),
};
