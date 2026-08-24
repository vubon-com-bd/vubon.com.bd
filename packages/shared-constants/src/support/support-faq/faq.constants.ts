/**
 * FAQ Constants
 * Configuration for frequently asked questions
 */

export const SUPPORT_FAQ = {
  // FAQ Types
  TYPES: {
    GENERAL: 'general',
    ACCOUNT: 'account',
    PAYMENT: 'payment',
    ORDER: 'order',
    SHIPPING: 'shipping',
    PRODUCT: 'product',
    TECHNICAL: 'technical',
    BILLING: 'billing',
    SECURITY: 'security',
    PRIVACY: 'privacy',
    LEGAL: 'legal',
  } as const,

  // FAQ Statuses
  STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    REVIEW: 'review',
    UPDATING: 'updating',
  } as const,

  // FAQ Priorities
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // FAQ Languages
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
  } as const,

  // FAQ Limits
  LIMITS: {
    MAX_QUESTION_LENGTH: 500,
    MAX_ANSWER_LENGTH: 5000,
    MAX_TAGS: 10,
    MAX_CATEGORIES: 5,
  } as const,

  // FAQ Formats
  FORMATS: {
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HTML: 'html',
  } as const,
} as const;

// FAQ Types
export type SupportFaqType = (typeof SUPPORT_FAQ.TYPES)[keyof typeof SUPPORT_FAQ.TYPES];

// FAQ Statuses
export type SupportFaqStatus = (typeof SUPPORT_FAQ.STATUS)[keyof typeof SUPPORT_FAQ.STATUS];

// FAQ Priorities
export type SupportFaqPriority = (typeof SUPPORT_FAQ.PRIORITY)[keyof typeof SUPPORT_FAQ.PRIORITY];

// FAQ Languages
export type SupportFaqLanguage = (typeof SUPPORT_FAQ.LANGUAGES)[keyof typeof SUPPORT_FAQ.LANGUAGES];

// FAQ Formats
export type SupportFaqFormat = (typeof SUPPORT_FAQ.FORMATS)[keyof typeof SUPPORT_FAQ.FORMATS];

// Utility Functions
export function supportFaqGetTypeLabel(type: SupportFaqType): string {
  const labels: Record<SupportFaqType, string> = {
    [SUPPORT_FAQ.TYPES.GENERAL]: 'General',
    [SUPPORT_FAQ.TYPES.ACCOUNT]: 'Account',
    [SUPPORT_FAQ.TYPES.PAYMENT]: 'Payment',
    [SUPPORT_FAQ.TYPES.ORDER]: 'Order',
    [SUPPORT_FAQ.TYPES.SHIPPING]: 'Shipping',
    [SUPPORT_FAQ.TYPES.PRODUCT]: 'Product',
    [SUPPORT_FAQ.TYPES.TECHNICAL]: 'Technical',
    [SUPPORT_FAQ.TYPES.BILLING]: 'Billing',
    [SUPPORT_FAQ.TYPES.SECURITY]: 'Security',
    [SUPPORT_FAQ.TYPES.PRIVACY]: 'Privacy',
    [SUPPORT_FAQ.TYPES.LEGAL]: 'Legal',
  };
  return labels[type] || 'Unknown';
}

export function supportFaqGetStatusLabel(status: SupportFaqStatus): string {
  const labels: Record<SupportFaqStatus, string> = {
    [SUPPORT_FAQ.STATUS.DRAFT]: 'Draft',
    [SUPPORT_FAQ.STATUS.PUBLISHED]: 'Published',
    [SUPPORT_FAQ.STATUS.ARCHIVED]: 'Archived',
    [SUPPORT_FAQ.STATUS.REVIEW]: 'In Review',
    [SUPPORT_FAQ.STATUS.UPDATING]: 'Updating',
  };
  return labels[status] || 'Unknown';
}

export function supportFaqGetPriorityLabel(priority: SupportFaqPriority): string {
  const labels: Record<SupportFaqPriority, string> = {
    [SUPPORT_FAQ.PRIORITY.HIGH]: 'High',
    [SUPPORT_FAQ.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_FAQ.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportFaqIsPublished(status: SupportFaqStatus): boolean {
  return status === SUPPORT_FAQ.STATUS.PUBLISHED;
}

export function supportFaqIsDraft(status: SupportFaqStatus): boolean {
  return status === SUPPORT_FAQ.STATUS.DRAFT || status === SUPPORT_FAQ.STATUS.REVIEW;
}

export function supportFaqGetFormatLabel(format: SupportFaqFormat): string {
  const labels: Record<SupportFaqFormat, string> = {
    [SUPPORT_FAQ.FORMATS.PLAIN]: 'Plain Text',
    [SUPPORT_FAQ.FORMATS.MARKDOWN]: 'Markdown',
    [SUPPORT_FAQ.FORMATS.HTML]: 'HTML',
  };
  return labels[format] || 'Unknown';
}
