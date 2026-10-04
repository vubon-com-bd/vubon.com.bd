export const SEO_CONTENT_TYPE = {
  PAGE: 'page',
  BLOG: 'blog',
  PRODUCT: 'product',
  CATEGORY: 'category',
  LANDING: 'landing',
  FAQ: 'faq',
  GUIDE: 'guide',
} as const;

export const SEO_CONTENT = {
  TITLE_MIN_LENGTH: 30,
  TITLE_MAX_LENGTH: 60,
  DESCRIPTION_MIN_LENGTH: 120,
  DESCRIPTION_MAX_LENGTH: 160,
  HEADING_MIN_LENGTH: 20,
  HEADING_MAX_LENGTH: 70,
  SLUG_MAX_LENGTH: 75,
  MIN_WORD_COUNT: 300,
  MAX_WORD_COUNT: 10000,
  MIN_READABILITY_SCORE: 60,
  MAX_KEYWORD_DENSITY: 3,
} as const;

export const SEO_META_TAG = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  KEYWORDS: 'keywords',
  ROBOTS: 'robots',
  CANONICAL: 'canonical',
  VIEWPORT: 'viewport',
  AUTHOR: 'author',
  LANGUAGE: 'language',
} as const;

export type SeoContentTypeType = (typeof SEO_CONTENT_TYPE)[keyof typeof SEO_CONTENT_TYPE];
