/**
 * SEO & AI Regular Expression Constants
 * Contains all regex patterns for SEO and AI management
 */

export const SeoAiRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // URL validation pattern
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // Phone number pattern (Bangladesh)
  PHONE: /^(?:\+880|880|0)1[3-9]\d{8}$/,

  // Password validation pattern
  // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Slug pattern
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Alphanumeric pattern
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // HTML tag pattern
  HTML_TAG: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,

  // UUID pattern
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // SEO specific patterns
  SEO: {
    META_TITLE: /^.{10,60}$/,
    META_DESCRIPTION: /^.{50,160}$/,
    KEYWORD: /^[a-zA-Z0-9\s\-_]{1,50}$/,
    ALT_TEXT: /^[a-zA-Z0-9\s\-_.,!?()&]{1,125}$/,
    URL_SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    H1_TAG: /^.{10,70}$/,
    H2_TAG: /^.{10,70}$/,
  },

  // AI specific patterns
  AI: {
    MODEL_NAME: /^[a-zA-Z0-9_\-]{1,100}$/,
    PROMPT_TEMPLATE: /^[\s\S]{1,5000}$/,
    TRAINING_DATA: /^[\s\S]{1,100000}$/,
    TOKEN: /^[a-zA-Z0-9_\-]{1,255}$/,
  },

  // Content patterns
  CONTENT: {
    TITLE: /^[a-zA-Z0-9\s\-_.,!?()&]{1,200}$/,
    DESCRIPTION: /^[\s\S]{1,5000}$/,
    BODY: /^[\s\S]{1,100000}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
  },

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },

  // Special patterns
  SPECIAL: {
    HTML_TAG_GLOBAL: /<[^>]*>/g,
    WHITESPACE: /\s+/g,
    SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
  },
} as const;

// Helper function to test regex patterns
export const SeoAiRegexTester = {
  testEmail: (value: string): boolean => SeoAiRegex.EMAIL.test(value),
  testURL: (value: string): boolean => SeoAiRegex.URL.test(value),
  testPhone: (value: string): boolean => SeoAiRegex.PHONE.test(value),
  testPassword: (value: string): boolean => SeoAiRegex.PASSWORD.test(value),
  testSlug: (value: string): boolean => SeoAiRegex.SLUG.test(value),
  testAlphanumeric: (value: string): boolean => SeoAiRegex.ALPHANUMERIC.test(value),
  testUUID: (value: string): boolean => SeoAiRegex.UUID.test(value),
  testMetaTitle: (value: string): boolean => SeoAiRegex.SEO.META_TITLE.test(value),
  testMetaDescription: (value: string): boolean => SeoAiRegex.SEO.META_DESCRIPTION.test(value),
  testKeyword: (value: string): boolean => SeoAiRegex.SEO.KEYWORD.test(value),
  testAltText: (value: string): boolean => SeoAiRegex.SEO.ALT_TEXT.test(value),
  testH1Tag: (value: string): boolean => SeoAiRegex.SEO.H1_TAG.test(value),
  testModelName: (value: string): boolean => SeoAiRegex.AI.MODEL_NAME.test(value),
};
