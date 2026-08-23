/**
 * Editorial Constants
 * Editorial content configuration and settings
 */

export const DISCOVERY_EDITORIAL = {
  // Editorial Types
  TYPES: {
    ARTICLE: 'article',
    REVIEW: 'review',
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    CASE_STUDY: 'case_study',
    INTERVIEW: 'interview',
    NEWS: 'news',
    FEATURE: 'feature',
    OPINION: 'opinion',
    COLLECTION: 'collection',
    SPOTLIGHT: 'spotlight',
    CUSTOM: 'custom',
  } as const,

  // Editorial Categories
  CATEGORIES: {
    PRODUCT: 'product',
    LIFESTYLE: 'lifestyle',
    TECHNOLOGY: 'technology',
    FASHION: 'fashion',
    HEALTH: 'health',
    FOOD: 'food',
    TRAVEL: 'travel',
    FINANCE: 'finance',
    EDUCATION: 'education',
    ENTERTAINMENT: 'entertainment',
    SPORTS: 'sports',
    CUSTOM: 'custom',
  } as const,

  // Editorial Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    REVIEW: 'review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    SCHEDULED: 'scheduled',
    FEATURED: 'featured',
    PROMOTED: 'promoted',
  } as const,

  // Editorial Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'article',
    DEFAULT_CATEGORY: 'product',
    DEFAULT_STATUS: 'draft',
    DEFAULT_LIMIT: 10,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 50,
    MIN_ITEMS: 1,
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_FEATURED_COUNT: 3,
    MAX_FEATURED_COUNT: 10,
  } as const,

  // Editorial Limits
  LIMITS: {
    MAX_ITEMS: 50,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1,
    MAX_FEATURED_COUNT: 10,
    MIN_FEATURED_COUNT: 1,
  } as const,

  // Editorial Errors
  ERRORS: {
    PUBLISH_FAILED: 'publish_failed',
    UNPUBLISH_FAILED: 'unpublish_failed',
    INVALID_TYPE: 'invalid_type',
    INVALID_CATEGORY: 'invalid_category',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Editorial Types
export type DiscoveryEditorialType =
  (typeof DISCOVERY_EDITORIAL.TYPES)[keyof typeof DISCOVERY_EDITORIAL.TYPES];

// Editorial Categories
export type DiscoveryEditorialCategory =
  (typeof DISCOVERY_EDITORIAL.CATEGORIES)[keyof typeof DISCOVERY_EDITORIAL.CATEGORIES];

// Editorial Statuses
export type DiscoveryEditorialStatus =
  (typeof DISCOVERY_EDITORIAL.STATUSES)[keyof typeof DISCOVERY_EDITORIAL.STATUSES];

// Editorial Defaults
export type DiscoveryEditorialDefault =
  (typeof DISCOVERY_EDITORIAL.DEFAULTS)[keyof typeof DISCOVERY_EDITORIAL.DEFAULTS];

// Editorial Limits
export type DiscoveryEditorialLimit =
  (typeof DISCOVERY_EDITORIAL.LIMITS)[keyof typeof DISCOVERY_EDITORIAL.LIMITS];

// Editorial Errors
export type DiscoveryEditorialError =
  (typeof DISCOVERY_EDITORIAL.ERRORS)[keyof typeof DISCOVERY_EDITORIAL.ERRORS];

// Utility Functions
export function discoveryEditorialGetTypeLabel(type: DiscoveryEditorialType): string {
  const labels: Record<DiscoveryEditorialType, string> = {
    [DISCOVERY_EDITORIAL.TYPES.ARTICLE]: 'Article',
    [DISCOVERY_EDITORIAL.TYPES.REVIEW]: 'Review',
    [DISCOVERY_EDITORIAL.TYPES.GUIDE]: 'Guide',
    [DISCOVERY_EDITORIAL.TYPES.TUTORIAL]: 'Tutorial',
    [DISCOVERY_EDITORIAL.TYPES.CASE_STUDY]: 'Case Study',
    [DISCOVERY_EDITORIAL.TYPES.INTERVIEW]: 'Interview',
    [DISCOVERY_EDITORIAL.TYPES.NEWS]: 'News',
    [DISCOVERY_EDITORIAL.TYPES.FEATURE]: 'Feature',
    [DISCOVERY_EDITORIAL.TYPES.OPINION]: 'Opinion',
    [DISCOVERY_EDITORIAL.TYPES.COLLECTION]: 'Collection',
    [DISCOVERY_EDITORIAL.TYPES.SPOTLIGHT]: 'Spotlight',
    [DISCOVERY_EDITORIAL.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryEditorialGetCategoryLabel(category: DiscoveryEditorialCategory): string {
  const labels: Record<DiscoveryEditorialCategory, string> = {
    [DISCOVERY_EDITORIAL.CATEGORIES.PRODUCT]: 'Product',
    [DISCOVERY_EDITORIAL.CATEGORIES.LIFESTYLE]: 'Lifestyle',
    [DISCOVERY_EDITORIAL.CATEGORIES.TECHNOLOGY]: 'Technology',
    [DISCOVERY_EDITORIAL.CATEGORIES.FASHION]: 'Fashion',
    [DISCOVERY_EDITORIAL.CATEGORIES.HEALTH]: 'Health',
    [DISCOVERY_EDITORIAL.CATEGORIES.FOOD]: 'Food',
    [DISCOVERY_EDITORIAL.CATEGORIES.TRAVEL]: 'Travel',
    [DISCOVERY_EDITORIAL.CATEGORIES.FINANCE]: 'Finance',
    [DISCOVERY_EDITORIAL.CATEGORIES.EDUCATION]: 'Education',
    [DISCOVERY_EDITORIAL.CATEGORIES.ENTERTAINMENT]: 'Entertainment',
    [DISCOVERY_EDITORIAL.CATEGORIES.SPORTS]: 'Sports',
    [DISCOVERY_EDITORIAL.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function discoveryEditorialGetStatusLabel(status: DiscoveryEditorialStatus): string {
  const labels: Record<DiscoveryEditorialStatus, string> = {
    [DISCOVERY_EDITORIAL.STATUSES.DRAFT]: 'Draft',
    [DISCOVERY_EDITORIAL.STATUSES.PENDING]: 'Pending',
    [DISCOVERY_EDITORIAL.STATUSES.REVIEW]: 'Review',
    [DISCOVERY_EDITORIAL.STATUSES.APPROVED]: 'Approved',
    [DISCOVERY_EDITORIAL.STATUSES.REJECTED]: 'Rejected',
    [DISCOVERY_EDITORIAL.STATUSES.PUBLISHED]: 'Published',
    [DISCOVERY_EDITORIAL.STATUSES.ARCHIVED]: 'Archived',
    [DISCOVERY_EDITORIAL.STATUSES.SCHEDULED]: 'Scheduled',
    [DISCOVERY_EDITORIAL.STATUSES.FEATURED]: 'Featured',
    [DISCOVERY_EDITORIAL.STATUSES.PROMOTED]: 'Promoted',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryEditorialGetErrorLabel(error: DiscoveryEditorialError): string {
  const labels: Record<DiscoveryEditorialError, string> = {
    [DISCOVERY_EDITORIAL.ERRORS.PUBLISH_FAILED]: 'Publish Failed',
    [DISCOVERY_EDITORIAL.ERRORS.UNPUBLISH_FAILED]: 'Unpublish Failed',
    [DISCOVERY_EDITORIAL.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_EDITORIAL.ERRORS.INVALID_CATEGORY]: 'Invalid Category',
    [DISCOVERY_EDITORIAL.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_EDITORIAL.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryEditorialIsPublished(status: DiscoveryEditorialStatus): boolean {
  const publishedStatuses: DiscoveryEditorialStatus[] = [
    DISCOVERY_EDITORIAL.STATUSES.PUBLISHED,
    DISCOVERY_EDITORIAL.STATUSES.FEATURED,
    DISCOVERY_EDITORIAL.STATUSES.PROMOTED,
  ];
  return publishedStatuses.includes(status);
}

export function discoveryEditorialIsFeatured(status: DiscoveryEditorialStatus): boolean {
  return status === DISCOVERY_EDITORIAL.STATUSES.FEATURED;
}

export function discoveryEditorialIsApproved(status: DiscoveryEditorialStatus): boolean {
  const approvedStatuses: DiscoveryEditorialStatus[] = [
    DISCOVERY_EDITORIAL.STATUSES.APPROVED,
    DISCOVERY_EDITORIAL.STATUSES.PUBLISHED,
    DISCOVERY_EDITORIAL.STATUSES.FEATURED,
    DISCOVERY_EDITORIAL.STATUSES.PROMOTED,
  ];
  return approvedStatuses.includes(status);
}

export function discoveryEditorialGetDefaultLimit(): number {
  return DISCOVERY_EDITORIAL.DEFAULTS.DEFAULT_LIMIT;
}
