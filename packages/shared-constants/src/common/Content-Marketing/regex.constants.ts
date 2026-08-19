/**
 * Content & Marketing Regular Expression Constants
 * Contains all regex patterns for content and marketing management
 */

export const ContentMarketingRegex = {
  // Email validation pattern
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // URL validation pattern
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,

  // Phone number pattern (Bangladesh)
  PHONE: /^(?:\+?88)?01[3-9]\d{8}$/,

  // UUID validation pattern
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // IP Address pattern
  IP: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,

  // Push token pattern
  PUSH_TOKEN: /^[a-zA-Z0-9\-_]{1,255}$/,

  // Template variable pattern
  TEMPLATE_VARIABLE: /{{(\w+)}}/g,

  // Content specific patterns
  CONTENT: {
    TITLE: /^[a-zA-Z0-9\s\-_.,!?()&]{1,200}$/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    DESCRIPTION: /^[\s\S]{1,5000}$/,
    TAG: /^[a-zA-Z0-9_\-]{1,50}$/,
    CATEGORY: /^[a-zA-Z0-9\s\-_]{1,100}$/,
    EXCERPT: /^[\s\S]{1,500}$/,
    BODY: /^[\s\S]{1,1000000}$/,
  },

  // Campaign specific patterns
  CAMPAIGN: {
    NAME: /^[a-zA-Z0-9\s\-_.,!?()&]{1,100}$/,
    CODE: /^[A-Z0-9]{6,12}$/,
    BUDGET: /^\d+(?:\.\d{1,2})?$/,
    DESCRIPTION: /^[\s\S]{1,1000}$/,
  },

  // Promotion specific patterns
  PROMOTION: {
    CODE: /^[A-Z0-9]{4,20}$/,
    DISCOUNT: /^\d+(?:\.\d{1,2})?$/,
    NAME: /^[a-zA-Z0-9\s\-_.,!?()&]{1,200}$/,
  },

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
    DD_MM_YYYY: /^\d{2}-\d{2}-\d{4}$/,
    MM_DD_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
    PERCENTAGE: /^\d+(?:\.\d{1,2})?%$/,
    PRICE: /^\d+(?:\.\d{2})?$/,
  },

  // HTML and text patterns
  HTML: {
    TAG: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,
    ATTRIBUTE: /^[a-zA-Z-]+="[^"]*"$/,
    SCRIPT: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    STYLE: /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    HTML_TAG: /<[^>]+>/g,
  },

  // Social media patterns
  SOCIAL: {
    HASHTAG: /^#[a-zA-Z0-9_]+$/,
    MENTION: /^@[a-zA-Z0-9_]+$/,
    HASHTAG_EXTRACT: /#[a-zA-Z0-9_]+/g,
    MENTION_EXTRACT: /@[a-zA-Z0-9_]+/g,
  },

  // Analytics patterns
  ANALYTICS: {
    EVENT: /^[a-zA-Z0-9_\-]{1,100}$/,
    PROPERTY: /^[a-zA-Z0-9_\-]{1,100}$/,
    VALUE: /^[a-zA-Z0-9_\-.\s]{1,255}$/,
  },

  // SEO patterns
  SEO: {
    META_TITLE: /^[\s\S]{1,70}$/,
    META_DESCRIPTION: /^[\s\S]{1,320}$/,
    KEYWORDS: /^[a-zA-Z0-9,\s\-_]{1,255}$/,
    CANONICAL_URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  },

  // Media patterns
  MEDIA: {
    FILENAME: /^[a-zA-Z0-9\-_\.]{1,255}$/,
    MIME_TYPE: /^[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/,
    IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i,
    VIDEO_EXTENSION: /\.(mp4|webm|ogg|mov|avi|mkv|flv)$/i,
    DOCUMENT_EXTENSION: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv)$/i,
  },

  // Color patterns
  COLOR: {
    HEX: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    RGB: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
    RGBA: /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/,
  },
} as const;

// Helper function to test regex patterns
export const ContentMarketingRegexTester = {
  testEmail: (value: string): boolean => ContentMarketingRegex.EMAIL.test(value),
  testURL: (value: string): boolean => ContentMarketingRegex.URL.test(value),
  testBangladeshPhone: (value: string): boolean => ContentMarketingRegex.PHONE.test(value),
  testUUID: (value: string): boolean => ContentMarketingRegex.UUID.test(value),
  testIP: (value: string): boolean => ContentMarketingRegex.IP.test(value),
  testPushToken: (value: string): boolean => ContentMarketingRegex.PUSH_TOKEN.test(value),
  testTemplateVariable: (value: string): RegExpMatchArray | null =>
    value.match(ContentMarketingRegex.TEMPLATE_VARIABLE),

  // Content tests
  testContentTitle: (value: string): boolean => ContentMarketingRegex.CONTENT.TITLE.test(value),
  testContentSlug: (value: string): boolean => ContentMarketingRegex.CONTENT.SLUG.test(value),
  testContentTag: (value: string): boolean => ContentMarketingRegex.CONTENT.TAG.test(value),
  testContentCategory: (value: string): boolean =>
    ContentMarketingRegex.CONTENT.CATEGORY.test(value),

  // Campaign tests
  testCampaignName: (value: string): boolean => ContentMarketingRegex.CAMPAIGN.NAME.test(value),
  testCampaignCode: (value: string): boolean => ContentMarketingRegex.CAMPAIGN.CODE.test(value),
  testCampaignBudget: (value: string): boolean => ContentMarketingRegex.CAMPAIGN.BUDGET.test(value),

  // Promotion tests
  testPromotionCode: (value: string): boolean => ContentMarketingRegex.PROMOTION.CODE.test(value),
  testPromotionDiscount: (value: string): boolean =>
    ContentMarketingRegex.PROMOTION.DISCOUNT.test(value),

  // Social media tests
  testHashtag: (value: string): boolean => ContentMarketingRegex.SOCIAL.HASHTAG.test(value),
  testMention: (value: string): boolean => ContentMarketingRegex.SOCIAL.MENTION.test(value),
  extractHashtags: (value: string): string[] =>
    value.match(ContentMarketingRegex.SOCIAL.HASHTAG_EXTRACT) || [],
  extractMentions: (value: string): string[] =>
    value.match(ContentMarketingRegex.SOCIAL.MENTION_EXTRACT) || [],

  // SEO tests
  testMetaTitle: (value: string): boolean => ContentMarketingRegex.SEO.META_TITLE.test(value),
  testMetaDescription: (value: string): boolean =>
    ContentMarketingRegex.SEO.META_DESCRIPTION.test(value),
  testCanonicalUrl: (value: string): boolean => ContentMarketingRegex.SEO.CANONICAL_URL.test(value),

  // Media tests
  testImageExtension: (value: string): boolean =>
    ContentMarketingRegex.MEDIA.IMAGE_EXTENSION.test(value),
  testVideoExtension: (value: string): boolean =>
    ContentMarketingRegex.MEDIA.VIDEO_EXTENSION.test(value),
  testDocumentExtension: (value: string): boolean =>
    ContentMarketingRegex.MEDIA.DOCUMENT_EXTENSION.test(value),

  // Color tests
  testHexColor: (value: string): boolean => ContentMarketingRegex.COLOR.HEX.test(value),
  testRgbColor: (value: string): boolean => ContentMarketingRegex.COLOR.RGB.test(value),
  testRgbaColor: (value: string): boolean => ContentMarketingRegex.COLOR.RGBA.test(value),

  // Numeric tests
  testPositiveInteger: (value: string): boolean =>
    ContentMarketingRegex.NUMERIC.POSITIVE_INTEGER.test(value),
  testNonNegativeInteger: (value: string): boolean =>
    ContentMarketingRegex.NUMERIC.NON_NEGATIVE_INTEGER.test(value),
  testDecimal: (value: string): boolean => ContentMarketingRegex.NUMERIC.DECIMAL.test(value),
  testPercentage: (value: string): boolean => ContentMarketingRegex.NUMERIC.PERCENTAGE.test(value),
  testPrice: (value: string): boolean => ContentMarketingRegex.NUMERIC.PRICE.test(value),

  // Date tests
  testDateYYYYMMDD: (value: string): boolean => ContentMarketingRegex.DATE.YYYY_MM_DD.test(value),
  testDateISO8601: (value: string): boolean => ContentMarketingRegex.DATE.ISO8601.test(value),
};
