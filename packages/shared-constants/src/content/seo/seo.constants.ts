/**
 * SEO Constants
 * Configuration for SEO, metadata, and search engine optimization
 */

export const CONTENT_SEO = {
  // SEO Types
  TYPES: {
    PAGE: 'page',
    BLOG: 'blog',
    PRODUCT: 'product',
    CATEGORY: 'category',
    COLLECTION: 'collection',
    BRAND: 'brand',
    ARTICLE: 'article',
    LANDING: 'landing',
    CUSTOM: 'custom',
  } as const,

  // SEO Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // SEO Priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // SEO Frequencies
  FREQUENCIES: {
    ALWAYS: 'always',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    NEVER: 'never',
  } as const,

  // SEO Scores
  SCORES: {
    POOR: 0,
    FAIR: 25,
    GOOD: 50,
    EXCELLENT: 75,
    PERFECT: 100,
  } as const,

  // SEO Defaults
  DEFAULTS: {
    PRIORITY: 'medium',
    FREQUENCY: 'weekly',
    SCORE: 'good',
    MAX_KEYWORDS: 10,
    MAX_META_DESCRIPTION: 160,
    MAX_TITLE: 60,
    MIN_WORDS: 300,
  } as const,

  // SEO Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 60,
    MAX_META_DESCRIPTION_LENGTH: 160,
    MAX_SLUG_LENGTH: 100,
    MAX_KEYWORDS: 20,
    MAX_KEYWORD_LENGTH: 50,
    MIN_WORDS: 100,
    MAX_WORDS: 10000,
  } as const,
} as const;

// SEO Types
export type ContentSEOType = (typeof CONTENT_SEO.TYPES)[keyof typeof CONTENT_SEO.TYPES];

// SEO Statuses
export type ContentSEOStatus = (typeof CONTENT_SEO.STATUSES)[keyof typeof CONTENT_SEO.STATUSES];

// SEO Priorities
export type ContentSEOPriority =
  (typeof CONTENT_SEO.PRIORITIES)[keyof typeof CONTENT_SEO.PRIORITIES];

// SEO Frequencies
export type ContentSEOFrequency =
  (typeof CONTENT_SEO.FREQUENCIES)[keyof typeof CONTENT_SEO.FREQUENCIES];

// SEO Scores
export type ContentSEOScore = (typeof CONTENT_SEO.SCORES)[keyof typeof CONTENT_SEO.SCORES];

// Utility Functions
export function contentSeoGetTypeLabel(type: ContentSEOType): string {
  const labels: Record<ContentSEOType, string> = {
    [CONTENT_SEO.TYPES.PAGE]: 'Page SEO',
    [CONTENT_SEO.TYPES.BLOG]: 'Blog SEO',
    [CONTENT_SEO.TYPES.PRODUCT]: 'Product SEO',
    [CONTENT_SEO.TYPES.CATEGORY]: 'Category SEO',
    [CONTENT_SEO.TYPES.COLLECTION]: 'Collection SEO',
    [CONTENT_SEO.TYPES.BRAND]: 'Brand SEO',
    [CONTENT_SEO.TYPES.ARTICLE]: 'Article SEO',
    [CONTENT_SEO.TYPES.LANDING]: 'Landing Page SEO',
    [CONTENT_SEO.TYPES.CUSTOM]: 'Custom SEO',
  };
  return labels[type] || 'Unknown SEO Type';
}

export function contentSeoGetStatusLabel(status: ContentSEOStatus): string {
  const labels: Record<ContentSEOStatus, string> = {
    [CONTENT_SEO.STATUSES.DRAFT]: 'Draft',
    [CONTENT_SEO.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_SEO.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_SEO.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_SEO.STATUSES.APPROVED]: 'Approved',
    [CONTENT_SEO.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_SEO.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_SEO.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_SEO.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentSeoGetPriorityLabel(priority: ContentSEOPriority): string {
  const labels: Record<ContentSEOPriority, string> = {
    [CONTENT_SEO.PRIORITIES.LOW]: 'Low Priority',
    [CONTENT_SEO.PRIORITIES.MEDIUM]: 'Medium Priority',
    [CONTENT_SEO.PRIORITIES.HIGH]: 'High Priority',
    [CONTENT_SEO.PRIORITIES.CRITICAL]: 'Critical Priority',
  };
  return labels[priority] || 'Unknown Priority';
}

export function contentSeoGetFrequencyLabel(frequency: ContentSEOFrequency): string {
  const labels: Record<ContentSEOFrequency, string> = {
    [CONTENT_SEO.FREQUENCIES.ALWAYS]: 'Always',
    [CONTENT_SEO.FREQUENCIES.HOURLY]: 'Hourly',
    [CONTENT_SEO.FREQUENCIES.DAILY]: 'Daily',
    [CONTENT_SEO.FREQUENCIES.WEEKLY]: 'Weekly',
    [CONTENT_SEO.FREQUENCIES.MONTHLY]: 'Monthly',
    [CONTENT_SEO.FREQUENCIES.YEARLY]: 'Yearly',
    [CONTENT_SEO.FREQUENCIES.NEVER]: 'Never',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function contentSeoGetScoreLabel(score: ContentSEOScore): string {
  const labels: Record<ContentSEOScore, string> = {
    [CONTENT_SEO.SCORES.POOR]: 'Poor',
    [CONTENT_SEO.SCORES.FAIR]: 'Fair',
    [CONTENT_SEO.SCORES.GOOD]: 'Good',
    [CONTENT_SEO.SCORES.EXCELLENT]: 'Excellent',
    [CONTENT_SEO.SCORES.PERFECT]: 'Perfect',
  };
  return labels[score] || 'Unknown Score';
}

export function contentSeoIsPublished(status: ContentSEOStatus): boolean {
  const publishedStatuses: ContentSEOStatus[] = [
    CONTENT_SEO.STATUSES.PUBLISHED,
    CONTENT_SEO.STATUSES.APPROVED,
  ];
  return publishedStatuses.includes(status);
}

export function contentSeoIsEditable(status: ContentSEOStatus): boolean {
  const editableStatuses: ContentSEOStatus[] = [
    CONTENT_SEO.STATUSES.DRAFT,
    CONTENT_SEO.STATUSES.PENDING_REVIEW,
    CONTENT_SEO.STATUSES.IN_REVIEW,
    CONTENT_SEO.STATUSES.REVIEWED,
    CONTENT_SEO.STATUSES.REJECTED,
  ];
  return editableStatuses.includes(status);
}

export function contentSeoGetDefaultPriority(): ContentSEOPriority {
  return CONTENT_SEO.DEFAULTS.PRIORITY as ContentSEOPriority;
}

export function contentSeoGetDefaultFrequency(): ContentSEOFrequency {
  return CONTENT_SEO.DEFAULTS.FREQUENCY as ContentSEOFrequency;
}

export function contentSeoGetMaxTitleLength(): number {
  return CONTENT_SEO.LIMITS.MAX_TITLE_LENGTH;
}

export function contentSeoGetMaxMetaDescriptionLength(): number {
  return CONTENT_SEO.LIMITS.MAX_META_DESCRIPTION_LENGTH;
}

export function contentSeoGetMaxKeywords(): number {
  return CONTENT_SEO.DEFAULTS.MAX_KEYWORDS;
}

export function contentSeoIsValidType(type: string): type is ContentSEOType {
  return Object.values(CONTENT_SEO.TYPES).includes(type as ContentSEOType);
}

export function contentSeoIsValidStatus(status: string): status is ContentSEOStatus {
  return Object.values(CONTENT_SEO.STATUSES).includes(status as ContentSEOStatus);
}

export function contentSeoIsValidPriority(priority: string): priority is ContentSEOPriority {
  return Object.values(CONTENT_SEO.PRIORITIES).includes(priority as ContentSEOPriority);
}

export function contentSeoIsValidFrequency(frequency: string): frequency is ContentSEOFrequency {
  return Object.values(CONTENT_SEO.FREQUENCIES).includes(frequency as ContentSEOFrequency);
}
