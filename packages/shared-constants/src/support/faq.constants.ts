export const FAQ_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  ARCHIVED: 'archived',
} as const;

export const FAQ_CATEGORY = {
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  ACCOUNT: 'account',
  PRODUCT: 'product',
  TECHNICAL: 'technical',
  GENERAL: 'general',
  OTHER: 'other',
} as const;

export const FAQ = {
  STATUS: FAQ_STATUS,
  CATEGORY: FAQ_CATEGORY,
  QUESTION_MIN_LENGTH: 10,
  QUESTION_MAX_LENGTH: 300,
  ANSWER_MIN_LENGTH: 20,
  ANSWER_MAX_LENGTH: 10000,
  MAX_TAGS: 10,
  MAX_CATEGORIES: 50,
  MAX_FAQ_PER_CATEGORY: 500,
  HELPFUL_THRESHOLD: 0.7,
  SORT_BY_HELPFUL: true,
  RETENTION_DAYS: 1825,
} as const;

export type FaqStatusType = (typeof FAQ_STATUS)[keyof typeof FAQ_STATUS];
export type FaqCategoryType = (typeof FAQ_CATEGORY)[keyof typeof FAQ_CATEGORY];
