/**
 * Testimonial Constants
 * Configuration for testimonials, reviews, and feedback
 */

export const CONTENT_TESTIMONIAL = {
  // Testimonial Types
  TYPES: {
    CUSTOMER: 'customer',
    CLIENT: 'client',
    PARTNER: 'partner',
    VENDOR: 'vendor',
    EMPLOYEE: 'employee',
    EXPERT: 'expert',
    INFLUENCER: 'influencer',
    USER: 'user',
    BUSINESS: 'business',
    CUSTOM: 'custom',
  } as const,

  // Testimonial Statuses
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

  // Testimonial Ratings
  RATINGS: {
    ONE_STAR: 1,
    TWO_STARS: 2,
    THREE_STARS: 3,
    FOUR_STARS: 4,
    FIVE_STARS: 5,
  } as const,

  // Testimonial Formats
  FORMATS: {
    TEXT: 'text',
    VIDEO: 'video',
    AUDIO: 'audio',
    IMAGE: 'image',
    RICH: 'rich',
    CUSTOM: 'custom',
  } as const,

  // Testimonial Sources
  SOURCES: {
    WEBSITE: 'website',
    EMAIL: 'email',
    SOCIAL: 'social',
    SURVEY: 'survey',
    INTERVIEW: 'interview',
    REVIEW: 'review',
    FEEDBACK: 'feedback',
    IMPORT: 'import',
    API: 'api',
    MANUAL: 'manual',
    CUSTOM: 'custom',
  } as const,

  // Testimonial Visibility
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

  // Testimonial Display
  DISPLAY: {
    CARD: 'card',
    SLIDER: 'slider',
    GRID: 'grid',
    LIST: 'list',
    FEATURED: 'featured',
    COMPACT: 'compact',
    CUSTOM: 'custom',
  } as const,

  // Testimonial Defaults
  DEFAULTS: {
    STATUS: 'draft',
    RATING: 5,
    FORMAT: 'text',
    SOURCE: 'website',
    VISIBILITY: 'public',
    DISPLAY: 'card',
    MAX_LENGTH: 500,
    PREVIEW_LENGTH: 100,
  } as const,

  // Testimonial Limits
  LIMITS: {
    MAX_NAME_LENGTH: 100,
    MAX_TITLE_LENGTH: 200,
    MAX_CONTENT_LENGTH: 2000,
    MAX_COMPANY_LENGTH: 100,
    MAX_POSITION_LENGTH: 100,
    MAX_IMAGE_SIZE_MB: 5,
    MAX_VIDEO_SIZE_MB: 50,
    MAX_AUDIO_SIZE_MB: 10,
  } as const,
} as const;

// Testimonial Types
export type ContentTestimonialType =
  (typeof CONTENT_TESTIMONIAL.TYPES)[keyof typeof CONTENT_TESTIMONIAL.TYPES];

// Testimonial Statuses
export type ContentTestimonialStatus =
  (typeof CONTENT_TESTIMONIAL.STATUSES)[keyof typeof CONTENT_TESTIMONIAL.STATUSES];

// Testimonial Ratings
export type ContentTestimonialRating =
  (typeof CONTENT_TESTIMONIAL.RATINGS)[keyof typeof CONTENT_TESTIMONIAL.RATINGS];

// Testimonial Formats
export type ContentTestimonialFormat =
  (typeof CONTENT_TESTIMONIAL.FORMATS)[keyof typeof CONTENT_TESTIMONIAL.FORMATS];

// Testimonial Sources
export type ContentTestimonialSource =
  (typeof CONTENT_TESTIMONIAL.SOURCES)[keyof typeof CONTENT_TESTIMONIAL.SOURCES];

// Testimonial Visibility
export type ContentTestimonialVisibility =
  (typeof CONTENT_TESTIMONIAL.VISIBILITY)[keyof typeof CONTENT_TESTIMONIAL.VISIBILITY];

// Testimonial Display
export type ContentTestimonialDisplay =
  (typeof CONTENT_TESTIMONIAL.DISPLAY)[keyof typeof CONTENT_TESTIMONIAL.DISPLAY];

// Utility Functions
export function contentTestimonialGetTypeLabel(type: ContentTestimonialType): string {
  const labels: Record<ContentTestimonialType, string> = {
    [CONTENT_TESTIMONIAL.TYPES.CUSTOMER]: 'Customer Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.CLIENT]: 'Client Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.PARTNER]: 'Partner Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.VENDOR]: 'Vendor Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.EMPLOYEE]: 'Employee Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.EXPERT]: 'Expert Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.INFLUENCER]: 'Influencer Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.USER]: 'User Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.BUSINESS]: 'Business Testimonial',
    [CONTENT_TESTIMONIAL.TYPES.CUSTOM]: 'Custom Testimonial',
  };
  return labels[type] || 'Unknown Testimonial Type';
}

export function contentTestimonialGetStatusLabel(status: ContentTestimonialStatus): string {
  const labels: Record<ContentTestimonialStatus, string> = {
    [CONTENT_TESTIMONIAL.STATUSES.DRAFT]: 'Draft',
    [CONTENT_TESTIMONIAL.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_TESTIMONIAL.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_TESTIMONIAL.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_TESTIMONIAL.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_TESTIMONIAL.STATUSES.APPROVED]: 'Approved',
    [CONTENT_TESTIMONIAL.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_TESTIMONIAL.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_TESTIMONIAL.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_TESTIMONIAL.STATUSES.PRIVATE]: 'Private',
    [CONTENT_TESTIMONIAL.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_TESTIMONIAL.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_TESTIMONIAL.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_TESTIMONIAL.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentTestimonialGetRatingLabel(rating: ContentTestimonialRating): string {
  const labels: Record<ContentTestimonialRating, string> = {
    [CONTENT_TESTIMONIAL.RATINGS.ONE_STAR]: '1 Star',
    [CONTENT_TESTIMONIAL.RATINGS.TWO_STARS]: '2 Stars',
    [CONTENT_TESTIMONIAL.RATINGS.THREE_STARS]: '3 Stars',
    [CONTENT_TESTIMONIAL.RATINGS.FOUR_STARS]: '4 Stars',
    [CONTENT_TESTIMONIAL.RATINGS.FIVE_STARS]: '5 Stars',
  };
  return labels[rating] || 'Unknown Rating';
}

export function contentTestimonialGetFormatLabel(format: ContentTestimonialFormat): string {
  const labels: Record<ContentTestimonialFormat, string> = {
    [CONTENT_TESTIMONIAL.FORMATS.TEXT]: 'Text',
    [CONTENT_TESTIMONIAL.FORMATS.VIDEO]: 'Video',
    [CONTENT_TESTIMONIAL.FORMATS.AUDIO]: 'Audio',
    [CONTENT_TESTIMONIAL.FORMATS.IMAGE]: 'Image',
    [CONTENT_TESTIMONIAL.FORMATS.RICH]: 'Rich Text',
    [CONTENT_TESTIMONIAL.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentTestimonialGetSourceLabel(source: ContentTestimonialSource): string {
  const labels: Record<ContentTestimonialSource, string> = {
    [CONTENT_TESTIMONIAL.SOURCES.WEBSITE]: 'Website',
    [CONTENT_TESTIMONIAL.SOURCES.EMAIL]: 'Email',
    [CONTENT_TESTIMONIAL.SOURCES.SOCIAL]: 'Social Media',
    [CONTENT_TESTIMONIAL.SOURCES.SURVEY]: 'Survey',
    [CONTENT_TESTIMONIAL.SOURCES.INTERVIEW]: 'Interview',
    [CONTENT_TESTIMONIAL.SOURCES.REVIEW]: 'Review',
    [CONTENT_TESTIMONIAL.SOURCES.FEEDBACK]: 'Feedback',
    [CONTENT_TESTIMONIAL.SOURCES.IMPORT]: 'Import',
    [CONTENT_TESTIMONIAL.SOURCES.API]: 'API',
    [CONTENT_TESTIMONIAL.SOURCES.MANUAL]: 'Manual',
    [CONTENT_TESTIMONIAL.SOURCES.CUSTOM]: 'Custom Source',
  };
  return labels[source] || 'Unknown Source';
}

export function contentTestimonialGetVisibilityLabel(
  visibility: ContentTestimonialVisibility
): string {
  const labels: Record<ContentTestimonialVisibility, string> = {
    [CONTENT_TESTIMONIAL.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_TESTIMONIAL.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_TESTIMONIAL.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_TESTIMONIAL.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_TESTIMONIAL.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_TESTIMONIAL.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_TESTIMONIAL.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_TESTIMONIAL.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentTestimonialGetDisplayLabel(display: ContentTestimonialDisplay): string {
  const labels: Record<ContentTestimonialDisplay, string> = {
    [CONTENT_TESTIMONIAL.DISPLAY.CARD]: 'Card',
    [CONTENT_TESTIMONIAL.DISPLAY.SLIDER]: 'Slider',
    [CONTENT_TESTIMONIAL.DISPLAY.GRID]: 'Grid',
    [CONTENT_TESTIMONIAL.DISPLAY.LIST]: 'List',
    [CONTENT_TESTIMONIAL.DISPLAY.FEATURED]: 'Featured',
    [CONTENT_TESTIMONIAL.DISPLAY.COMPACT]: 'Compact',
    [CONTENT_TESTIMONIAL.DISPLAY.CUSTOM]: 'Custom Display',
  };
  return labels[display] || 'Unknown Display';
}

export function contentTestimonialIsPublished(status: ContentTestimonialStatus): boolean {
  const publishedStatuses: ContentTestimonialStatus[] = [
    CONTENT_TESTIMONIAL.STATUSES.PUBLISHED,
    CONTENT_TESTIMONIAL.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentTestimonialIsEditable(status: ContentTestimonialStatus): boolean {
  const editableStatuses: ContentTestimonialStatus[] = [
    CONTENT_TESTIMONIAL.STATUSES.DRAFT,
    CONTENT_TESTIMONIAL.STATUSES.PENDING_REVIEW,
    CONTENT_TESTIMONIAL.STATUSES.IN_REVIEW,
    CONTENT_TESTIMONIAL.STATUSES.REVIEWED,
    CONTENT_TESTIMONIAL.STATUSES.PENDING_APPROVAL,
    CONTENT_TESTIMONIAL.STATUSES.REJECTED,
    CONTENT_TESTIMONIAL.STATUSES.PRIVATE,
    CONTENT_TESTIMONIAL.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentTestimonialIsApproved(status: ContentTestimonialStatus): boolean {
  const approvedStatuses: ContentTestimonialStatus[] = [
    CONTENT_TESTIMONIAL.STATUSES.APPROVED,
    CONTENT_TESTIMONIAL.STATUSES.PUBLISHED,
    CONTENT_TESTIMONIAL.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentTestimonialGetDefaultStatus(): ContentTestimonialStatus {
  return CONTENT_TESTIMONIAL.DEFAULTS.STATUS as ContentTestimonialStatus;
}

export function contentTestimonialGetDefaultRating(): ContentTestimonialRating {
  return CONTENT_TESTIMONIAL.DEFAULTS.RATING as ContentTestimonialRating;
}

export function contentTestimonialGetDefaultFormat(): ContentTestimonialFormat {
  return CONTENT_TESTIMONIAL.DEFAULTS.FORMAT as ContentTestimonialFormat;
}

export function contentTestimonialGetDefaultSource(): ContentTestimonialSource {
  return CONTENT_TESTIMONIAL.DEFAULTS.SOURCE as ContentTestimonialSource;
}

export function contentTestimonialGetDefaultVisibility(): ContentTestimonialVisibility {
  return CONTENT_TESTIMONIAL.DEFAULTS.VISIBILITY as ContentTestimonialVisibility;
}

export function contentTestimonialGetDefaultDisplay(): ContentTestimonialDisplay {
  return CONTENT_TESTIMONIAL.DEFAULTS.DISPLAY as ContentTestimonialDisplay;
}

export function contentTestimonialGetMaxContentLength(): number {
  return CONTENT_TESTIMONIAL.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentTestimonialGetMaxNameLength(): number {
  return CONTENT_TESTIMONIAL.LIMITS.MAX_NAME_LENGTH;
}

export function contentTestimonialGetMaxTitleLength(): number {
  return CONTENT_TESTIMONIAL.LIMITS.MAX_TITLE_LENGTH;
}

export function contentTestimonialIsValidType(type: string): type is ContentTestimonialType {
  return Object.values(CONTENT_TESTIMONIAL.TYPES).includes(type as ContentTestimonialType);
}

export function contentTestimonialIsValidStatus(
  status: string
): status is ContentTestimonialStatus {
  return Object.values(CONTENT_TESTIMONIAL.STATUSES).includes(status as ContentTestimonialStatus);
}

export function contentTestimonialIsValidRating(
  rating: number
): rating is ContentTestimonialRating {
  return Object.values(CONTENT_TESTIMONIAL.RATINGS).includes(rating as ContentTestimonialRating);
}

export function contentTestimonialIsValidFormat(
  format: string
): format is ContentTestimonialFormat {
  return Object.values(CONTENT_TESTIMONIAL.FORMATS).includes(format as ContentTestimonialFormat);
}

export function contentTestimonialIsValidSource(
  source: string
): source is ContentTestimonialSource {
  return Object.values(CONTENT_TESTIMONIAL.SOURCES).includes(source as ContentTestimonialSource);
}
