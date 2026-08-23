/**
 * Case Study Constants
 * Configuration for case studies, success stories, and use cases
 */

export const CONTENT_CASE_STUDY = {
  // Case Study Types
  TYPES: {
    SUCCESS_STORY: 'success_story',
    USE_CASE: 'use_case',
    PROJECT: 'project',
    IMPLEMENTATION: 'implementation',
    TRANSFORMATION: 'transformation',
    INNOVATION: 'innovation',
    RESULT: 'result',
    TESTIMONIAL: 'testimonial',
    COMPARISON: 'comparison',
    CUSTOM: 'custom',
  } as const,

  // Case Study Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
  } as const,

  // Case Study Formats
  FORMATS: {
    FULL: 'full',
    SHORT: 'short',
    VIDEO: 'video',
    AUDIO: 'audio',
    SLIDES: 'slides',
    PDF: 'pdf',
    HTML: 'html',
    MARKDOWN: 'markdown',
    CUSTOM: 'custom',
  } as const,

  // Case Study Industries
  INDUSTRIES: {
    ECOMMERCE: 'ecommerce',
    RETAIL: 'retail',
    TECHNOLOGY: 'technology',
    FINANCE: 'finance',
    HEALTHCARE: 'healthcare',
    EDUCATION: 'education',
    MANUFACTURING: 'manufacturing',
    LOGISTICS: 'logistics',
    TRAVEL: 'travel',
    FOOD: 'food',
    FASHION: 'fashion',
    REAL_ESTATE: 'real_estate',
    CONSULTING: 'consulting',
    CUSTOM: 'custom',
  } as const,

  // Case Study Results
  RESULTS: {
    INCREASE_REVENUE: 'increase_revenue',
    REDUCE_COSTS: 'reduce_costs',
    IMPROVE_EFFICIENCY: 'improve_efficiency',
    ENHANCE_CUSTOMER_SATISFACTION: 'enhance_customer_satisfaction',
    GROW_MARKET_SHARE: 'grow_market_share',
    IMPROVE_QUALITY: 'improve_quality',
    REDUCE_TIME: 'reduce_time',
    INNOVATE: 'innovate',
    CUSTOM: 'custom',
  } as const,

  // Case Study Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
  } as const,

  // Case Study Sort Options
  SORT_OPTIONS: {
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    VIEWS: 'views',
    LIKES: 'likes',
    SHARES: 'shares',
    POPULAR: 'popular',
    CUSTOM: 'custom',
  } as const,

  // Case Study Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'full',
    VISIBILITY: 'public',
    SORT: 'date_desc',
    MAX_LENGTH: 10000,
    MIN_LENGTH: 500,
  } as const,

  // Case Study Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 50000,
    MAX_CLIENT_NAME_LENGTH: 100,
    MAX_COMPANY_NAME_LENGTH: 100,
    MAX_IMAGES: 20,
    MAX_VIDEOS: 5,
    MIN_CONTENT_LENGTH: 100,
  } as const,
} as const;

// Case Study Types
export type ContentCaseStudyType =
  (typeof CONTENT_CASE_STUDY.TYPES)[keyof typeof CONTENT_CASE_STUDY.TYPES];

// Case Study Statuses
export type ContentCaseStudyStatus =
  (typeof CONTENT_CASE_STUDY.STATUSES)[keyof typeof CONTENT_CASE_STUDY.STATUSES];

// Case Study Formats
export type ContentCaseStudyFormat =
  (typeof CONTENT_CASE_STUDY.FORMATS)[keyof typeof CONTENT_CASE_STUDY.FORMATS];

// Case Study Industries
export type ContentCaseStudyIndustry =
  (typeof CONTENT_CASE_STUDY.INDUSTRIES)[keyof typeof CONTENT_CASE_STUDY.INDUSTRIES];

// Case Study Results
export type ContentCaseStudyResult =
  (typeof CONTENT_CASE_STUDY.RESULTS)[keyof typeof CONTENT_CASE_STUDY.RESULTS];

// Case Study Visibility
export type ContentCaseStudyVisibility =
  (typeof CONTENT_CASE_STUDY.VISIBILITY)[keyof typeof CONTENT_CASE_STUDY.VISIBILITY];

// Case Study Sort Options
export type ContentCaseStudySortOption =
  (typeof CONTENT_CASE_STUDY.SORT_OPTIONS)[keyof typeof CONTENT_CASE_STUDY.SORT_OPTIONS];

// Utility Functions
export function contentCaseStudyGetTypeLabel(type: ContentCaseStudyType): string {
  const labels: Record<ContentCaseStudyType, string> = {
    [CONTENT_CASE_STUDY.TYPES.SUCCESS_STORY]: 'Success Story',
    [CONTENT_CASE_STUDY.TYPES.USE_CASE]: 'Use Case',
    [CONTENT_CASE_STUDY.TYPES.PROJECT]: 'Project Case Study',
    [CONTENT_CASE_STUDY.TYPES.IMPLEMENTATION]: 'Implementation Case Study',
    [CONTENT_CASE_STUDY.TYPES.TRANSFORMATION]: 'Transformation Case Study',
    [CONTENT_CASE_STUDY.TYPES.INNOVATION]: 'Innovation Case Study',
    [CONTENT_CASE_STUDY.TYPES.RESULT]: 'Results Case Study',
    [CONTENT_CASE_STUDY.TYPES.TESTIMONIAL]: 'Testimonial Case Study',
    [CONTENT_CASE_STUDY.TYPES.COMPARISON]: 'Comparison Case Study',
    [CONTENT_CASE_STUDY.TYPES.CUSTOM]: 'Custom Case Study',
  };
  return labels[type] || 'Unknown Case Study Type';
}

export function contentCaseStudyGetStatusLabel(status: ContentCaseStudyStatus): string {
  const labels: Record<ContentCaseStudyStatus, string> = {
    [CONTENT_CASE_STUDY.STATUSES.DRAFT]: 'Draft',
    [CONTENT_CASE_STUDY.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_CASE_STUDY.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_CASE_STUDY.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_CASE_STUDY.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_CASE_STUDY.STATUSES.APPROVED]: 'Approved',
    [CONTENT_CASE_STUDY.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_CASE_STUDY.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_CASE_STUDY.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_CASE_STUDY.STATUSES.PRIVATE]: 'Private',
    [CONTENT_CASE_STUDY.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_CASE_STUDY.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_CASE_STUDY.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_CASE_STUDY.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentCaseStudyGetFormatLabel(format: ContentCaseStudyFormat): string {
  const labels: Record<ContentCaseStudyFormat, string> = {
    [CONTENT_CASE_STUDY.FORMATS.FULL]: 'Full Case Study',
    [CONTENT_CASE_STUDY.FORMATS.SHORT]: 'Short Case Study',
    [CONTENT_CASE_STUDY.FORMATS.VIDEO]: 'Video Case Study',
    [CONTENT_CASE_STUDY.FORMATS.AUDIO]: 'Audio Case Study',
    [CONTENT_CASE_STUDY.FORMATS.SLIDES]: 'Slides Presentation',
    [CONTENT_CASE_STUDY.FORMATS.PDF]: 'PDF Case Study',
    [CONTENT_CASE_STUDY.FORMATS.HTML]: 'HTML Case Study',
    [CONTENT_CASE_STUDY.FORMATS.MARKDOWN]: 'Markdown Case Study',
    [CONTENT_CASE_STUDY.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentCaseStudyGetIndustryLabel(industry: ContentCaseStudyIndustry): string {
  const labels: Record<ContentCaseStudyIndustry, string> = {
    [CONTENT_CASE_STUDY.INDUSTRIES.ECOMMERCE]: 'E-commerce',
    [CONTENT_CASE_STUDY.INDUSTRIES.RETAIL]: 'Retail',
    [CONTENT_CASE_STUDY.INDUSTRIES.TECHNOLOGY]: 'Technology',
    [CONTENT_CASE_STUDY.INDUSTRIES.FINANCE]: 'Finance',
    [CONTENT_CASE_STUDY.INDUSTRIES.HEALTHCARE]: 'Healthcare',
    [CONTENT_CASE_STUDY.INDUSTRIES.EDUCATION]: 'Education',
    [CONTENT_CASE_STUDY.INDUSTRIES.MANUFACTURING]: 'Manufacturing',
    [CONTENT_CASE_STUDY.INDUSTRIES.LOGISTICS]: 'Logistics',
    [CONTENT_CASE_STUDY.INDUSTRIES.TRAVEL]: 'Travel',
    [CONTENT_CASE_STUDY.INDUSTRIES.FOOD]: 'Food',
    [CONTENT_CASE_STUDY.INDUSTRIES.FASHION]: 'Fashion',
    [CONTENT_CASE_STUDY.INDUSTRIES.REAL_ESTATE]: 'Real Estate',
    [CONTENT_CASE_STUDY.INDUSTRIES.CONSULTING]: 'Consulting',
    [CONTENT_CASE_STUDY.INDUSTRIES.CUSTOM]: 'Custom Industry',
  };
  return labels[industry] || 'Unknown Industry';
}

export function contentCaseStudyGetResultLabel(result: ContentCaseStudyResult): string {
  const labels: Record<ContentCaseStudyResult, string> = {
    [CONTENT_CASE_STUDY.RESULTS.INCREASE_REVENUE]: 'Revenue Increase',
    [CONTENT_CASE_STUDY.RESULTS.REDUCE_COSTS]: 'Cost Reduction',
    [CONTENT_CASE_STUDY.RESULTS.IMPROVE_EFFICIENCY]: 'Efficiency Improvement',
    [CONTENT_CASE_STUDY.RESULTS.ENHANCE_CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [CONTENT_CASE_STUDY.RESULTS.GROW_MARKET_SHARE]: 'Market Share Growth',
    [CONTENT_CASE_STUDY.RESULTS.IMPROVE_QUALITY]: 'Quality Improvement',
    [CONTENT_CASE_STUDY.RESULTS.REDUCE_TIME]: 'Time Reduction',
    [CONTENT_CASE_STUDY.RESULTS.INNOVATE]: 'Innovation',
    [CONTENT_CASE_STUDY.RESULTS.CUSTOM]: 'Custom Result',
  };
  return labels[result] || 'Unknown Result';
}

export function contentCaseStudyGetVisibilityLabel(visibility: ContentCaseStudyVisibility): string {
  const labels: Record<ContentCaseStudyVisibility, string> = {
    [CONTENT_CASE_STUDY.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_CASE_STUDY.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_CASE_STUDY.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_CASE_STUDY.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_CASE_STUDY.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_CASE_STUDY.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_CASE_STUDY.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_CASE_STUDY.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentCaseStudyGetSortOptionLabel(sort: ContentCaseStudySortOption): string {
  const labels: Record<ContentCaseStudySortOption, string> = {
    [CONTENT_CASE_STUDY.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.LIKES]: 'Most Liked',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.SHARES]: 'Most Shared',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_CASE_STUDY.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentCaseStudyIsPublished(status: ContentCaseStudyStatus): boolean {
  const publishedStatuses: ContentCaseStudyStatus[] = [
    CONTENT_CASE_STUDY.STATUSES.PUBLISHED,
    CONTENT_CASE_STUDY.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentCaseStudyIsEditable(status: ContentCaseStudyStatus): boolean {
  const editableStatuses: ContentCaseStudyStatus[] = [
    CONTENT_CASE_STUDY.STATUSES.DRAFT,
    CONTENT_CASE_STUDY.STATUSES.PENDING_REVIEW,
    CONTENT_CASE_STUDY.STATUSES.IN_REVIEW,
    CONTENT_CASE_STUDY.STATUSES.REVIEWED,
    CONTENT_CASE_STUDY.STATUSES.PENDING_APPROVAL,
    CONTENT_CASE_STUDY.STATUSES.REJECTED,
    CONTENT_CASE_STUDY.STATUSES.PRIVATE,
    CONTENT_CASE_STUDY.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentCaseStudyIsApproved(status: ContentCaseStudyStatus): boolean {
  const approvedStatuses: ContentCaseStudyStatus[] = [
    CONTENT_CASE_STUDY.STATUSES.APPROVED,
    CONTENT_CASE_STUDY.STATUSES.PUBLISHED,
    CONTENT_CASE_STUDY.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentCaseStudyGetDefaultStatus(): ContentCaseStudyStatus {
  return CONTENT_CASE_STUDY.DEFAULTS.STATUS as ContentCaseStudyStatus;
}

export function contentCaseStudyGetDefaultFormat(): ContentCaseStudyFormat {
  return CONTENT_CASE_STUDY.DEFAULTS.FORMAT as ContentCaseStudyFormat;
}

export function contentCaseStudyGetDefaultVisibility(): ContentCaseStudyVisibility {
  return CONTENT_CASE_STUDY.DEFAULTS.VISIBILITY as ContentCaseStudyVisibility;
}

export function contentCaseStudyGetDefaultSort(): ContentCaseStudySortOption {
  return CONTENT_CASE_STUDY.DEFAULTS.SORT as ContentCaseStudySortOption;
}

export function contentCaseStudyGetMaxTitleLength(): number {
  return CONTENT_CASE_STUDY.LIMITS.MAX_TITLE_LENGTH;
}

export function contentCaseStudyGetMaxDescriptionLength(): number {
  return CONTENT_CASE_STUDY.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentCaseStudyGetMaxContentLength(): number {
  return CONTENT_CASE_STUDY.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentCaseStudyGetMinContentLength(): number {
  return CONTENT_CASE_STUDY.LIMITS.MIN_CONTENT_LENGTH;
}

export function contentCaseStudyGetMaxImages(): number {
  return CONTENT_CASE_STUDY.LIMITS.MAX_IMAGES;
}

export function contentCaseStudyIsValidType(type: string): type is ContentCaseStudyType {
  return Object.values(CONTENT_CASE_STUDY.TYPES).includes(type as ContentCaseStudyType);
}

export function contentCaseStudyIsValidStatus(status: string): status is ContentCaseStudyStatus {
  return Object.values(CONTENT_CASE_STUDY.STATUSES).includes(status as ContentCaseStudyStatus);
}

export function contentCaseStudyIsValidFormat(format: string): format is ContentCaseStudyFormat {
  return Object.values(CONTENT_CASE_STUDY.FORMATS).includes(format as ContentCaseStudyFormat);
}

export function contentCaseStudyIsValidIndustry(
  industry: string
): industry is ContentCaseStudyIndustry {
  return Object.values(CONTENT_CASE_STUDY.INDUSTRIES).includes(
    industry as ContentCaseStudyIndustry
  );
}

export function contentCaseStudyIsValidResult(result: string): result is ContentCaseStudyResult {
  return Object.values(CONTENT_CASE_STUDY.RESULTS).includes(result as ContentCaseStudyResult);
}
