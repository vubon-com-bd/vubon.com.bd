/**
 * Guide Constants
 * Configuration for guides, tutorials, and how-to content
 */

export const CONTENT_GUIDE = {
  // Guide Types
  TYPES: {
    STEP_BY_STEP: 'step_by_step',
    TUTORIAL: 'tutorial',
    HOW_TO: 'how_to',
    REFERENCE: 'reference',
    USER_GUIDE: 'user_guide',
    ADMIN_GUIDE: 'admin_guide',
    DEVELOPER_GUIDE: 'developer_guide',
    QUICK_START: 'quick_start',
    ADVANCED: 'advanced',
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    EXPERT: 'expert',
    CUSTOM: 'custom',
  } as const,

  // Guide Statuses
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

  // Guide Formats
  FORMATS: {
    TEXT: 'text',
    VIDEO: 'video',
    INTERACTIVE: 'interactive',
    PDF: 'pdf',
    DOC: 'doc',
    HTML: 'html',
    MARKDOWN: 'markdown',
    SLIDES: 'slides',
    CUSTOM: 'custom',
  } as const,

  // Guide Levels
  LEVELS: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    MASTER: 'master',
  } as const,

  // Guide Visibility
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

  // Guide Sort Options
  SORT_OPTIONS: {
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    POPULAR: 'popular',
    RATING: 'rating',
    VIEWS: 'views',
    CUSTOM: 'custom',
  } as const,

  // Guide Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'text',
    LEVEL: 'basic',
    VISIBILITY: 'public',
    SORT: 'date_desc',
    MAX_LENGTH: 10000,
    STEPS_PER_GUIDE: 20,
  } as const,

  // Guide Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 50000,
    MAX_STEPS: 50,
    MIN_STEPS: 1,
    MAX_IMAGES_PER_STEP: 5,
    MAX_VIDEOS_PER_GUIDE: 10,
  } as const,
} as const;

// Guide Types
export type ContentGuideType = (typeof CONTENT_GUIDE.TYPES)[keyof typeof CONTENT_GUIDE.TYPES];

// Guide Statuses
export type ContentGuideStatus =
  (typeof CONTENT_GUIDE.STATUSES)[keyof typeof CONTENT_GUIDE.STATUSES];

// Guide Formats
export type ContentGuideFormat = (typeof CONTENT_GUIDE.FORMATS)[keyof typeof CONTENT_GUIDE.FORMATS];

// Guide Levels
export type ContentGuideLevel = (typeof CONTENT_GUIDE.LEVELS)[keyof typeof CONTENT_GUIDE.LEVELS];

// Guide Visibility
export type ContentGuideVisibility =
  (typeof CONTENT_GUIDE.VISIBILITY)[keyof typeof CONTENT_GUIDE.VISIBILITY];

// Guide Sort Options
export type ContentGuideSortOption =
  (typeof CONTENT_GUIDE.SORT_OPTIONS)[keyof typeof CONTENT_GUIDE.SORT_OPTIONS];

// Utility Functions
export function contentGuideGetTypeLabel(type: ContentGuideType): string {
  const labels: Record<ContentGuideType, string> = {
    [CONTENT_GUIDE.TYPES.STEP_BY_STEP]: 'Step-by-Step Guide',
    [CONTENT_GUIDE.TYPES.TUTORIAL]: 'Tutorial',
    [CONTENT_GUIDE.TYPES.HOW_TO]: 'How-To Guide',
    [CONTENT_GUIDE.TYPES.REFERENCE]: 'Reference Guide',
    [CONTENT_GUIDE.TYPES.USER_GUIDE]: 'User Guide',
    [CONTENT_GUIDE.TYPES.ADMIN_GUIDE]: 'Admin Guide',
    [CONTENT_GUIDE.TYPES.DEVELOPER_GUIDE]: 'Developer Guide',
    [CONTENT_GUIDE.TYPES.QUICK_START]: 'Quick Start Guide',
    [CONTENT_GUIDE.TYPES.ADVANCED]: 'Advanced Guide',
    [CONTENT_GUIDE.TYPES.BEGINNER]: 'Beginner Guide',
    [CONTENT_GUIDE.TYPES.INTERMEDIATE]: 'Intermediate Guide',
    [CONTENT_GUIDE.TYPES.EXPERT]: 'Expert Guide',
    [CONTENT_GUIDE.TYPES.CUSTOM]: 'Custom Guide',
  };
  return labels[type] || 'Unknown Guide Type';
}

export function contentGuideGetStatusLabel(status: ContentGuideStatus): string {
  const labels: Record<ContentGuideStatus, string> = {
    [CONTENT_GUIDE.STATUSES.DRAFT]: 'Draft',
    [CONTENT_GUIDE.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_GUIDE.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_GUIDE.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_GUIDE.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_GUIDE.STATUSES.APPROVED]: 'Approved',
    [CONTENT_GUIDE.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_GUIDE.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_GUIDE.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_GUIDE.STATUSES.PRIVATE]: 'Private',
    [CONTENT_GUIDE.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_GUIDE.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_GUIDE.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_GUIDE.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentGuideGetFormatLabel(format: ContentGuideFormat): string {
  const labels: Record<ContentGuideFormat, string> = {
    [CONTENT_GUIDE.FORMATS.TEXT]: 'Text Guide',
    [CONTENT_GUIDE.FORMATS.VIDEO]: 'Video Guide',
    [CONTENT_GUIDE.FORMATS.INTERACTIVE]: 'Interactive Guide',
    [CONTENT_GUIDE.FORMATS.PDF]: 'PDF Guide',
    [CONTENT_GUIDE.FORMATS.DOC]: 'DOC Guide',
    [CONTENT_GUIDE.FORMATS.HTML]: 'HTML Guide',
    [CONTENT_GUIDE.FORMATS.MARKDOWN]: 'Markdown Guide',
    [CONTENT_GUIDE.FORMATS.SLIDES]: 'Slides Guide',
    [CONTENT_GUIDE.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentGuideGetLevelLabel(level: ContentGuideLevel): string {
  const labels: Record<ContentGuideLevel, string> = {
    [CONTENT_GUIDE.LEVELS.BASIC]: 'Basic',
    [CONTENT_GUIDE.LEVELS.INTERMEDIATE]: 'Intermediate',
    [CONTENT_GUIDE.LEVELS.ADVANCED]: 'Advanced',
    [CONTENT_GUIDE.LEVELS.EXPERT]: 'Expert',
    [CONTENT_GUIDE.LEVELS.MASTER]: 'Master',
  };
  return labels[level] || 'Unknown Level';
}

export function contentGuideGetVisibilityLabel(visibility: ContentGuideVisibility): string {
  const labels: Record<ContentGuideVisibility, string> = {
    [CONTENT_GUIDE.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_GUIDE.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_GUIDE.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_GUIDE.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_GUIDE.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_GUIDE.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_GUIDE.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_GUIDE.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentGuideGetSortOptionLabel(sort: ContentGuideSortOption): string {
  const labels: Record<ContentGuideSortOption, string> = {
    [CONTENT_GUIDE.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_GUIDE.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_GUIDE.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_GUIDE.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_GUIDE.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_GUIDE.SORT_OPTIONS.RATING]: 'Highest Rated',
    [CONTENT_GUIDE.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_GUIDE.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentGuideIsPublished(status: ContentGuideStatus): boolean {
  const publishedStatuses: ContentGuideStatus[] = [
    CONTENT_GUIDE.STATUSES.PUBLISHED,
    CONTENT_GUIDE.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentGuideIsEditable(status: ContentGuideStatus): boolean {
  const editableStatuses: ContentGuideStatus[] = [
    CONTENT_GUIDE.STATUSES.DRAFT,
    CONTENT_GUIDE.STATUSES.PENDING_REVIEW,
    CONTENT_GUIDE.STATUSES.IN_REVIEW,
    CONTENT_GUIDE.STATUSES.REVIEWED,
    CONTENT_GUIDE.STATUSES.PENDING_APPROVAL,
    CONTENT_GUIDE.STATUSES.REJECTED,
    CONTENT_GUIDE.STATUSES.PRIVATE,
    CONTENT_GUIDE.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentGuideIsApproved(status: ContentGuideStatus): boolean {
  const approvedStatuses: ContentGuideStatus[] = [
    CONTENT_GUIDE.STATUSES.APPROVED,
    CONTENT_GUIDE.STATUSES.PUBLISHED,
    CONTENT_GUIDE.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentGuideGetDefaultStatus(): ContentGuideStatus {
  return CONTENT_GUIDE.DEFAULTS.STATUS as ContentGuideStatus;
}

export function contentGuideGetDefaultFormat(): ContentGuideFormat {
  return CONTENT_GUIDE.DEFAULTS.FORMAT as ContentGuideFormat;
}

export function contentGuideGetDefaultLevel(): ContentGuideLevel {
  return CONTENT_GUIDE.DEFAULTS.LEVEL as ContentGuideLevel;
}

export function contentGuideGetDefaultVisibility(): ContentGuideVisibility {
  return CONTENT_GUIDE.DEFAULTS.VISIBILITY as ContentGuideVisibility;
}

export function contentGuideGetDefaultSort(): ContentGuideSortOption {
  return CONTENT_GUIDE.DEFAULTS.SORT as ContentGuideSortOption;
}

export function contentGuideGetMaxTitleLength(): number {
  return CONTENT_GUIDE.LIMITS.MAX_TITLE_LENGTH;
}

export function contentGuideGetMaxDescriptionLength(): number {
  return CONTENT_GUIDE.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentGuideGetMaxContentLength(): number {
  return CONTENT_GUIDE.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentGuideGetMaxSteps(): number {
  return CONTENT_GUIDE.LIMITS.MAX_STEPS;
}

export function contentGuideGetMinSteps(): number {
  return CONTENT_GUIDE.LIMITS.MIN_STEPS;
}

export function contentGuideIsValidType(type: string): type is ContentGuideType {
  return Object.values(CONTENT_GUIDE.TYPES).includes(type as ContentGuideType);
}

export function contentGuideIsValidStatus(status: string): status is ContentGuideStatus {
  return Object.values(CONTENT_GUIDE.STATUSES).includes(status as ContentGuideStatus);
}

export function contentGuideIsValidFormat(format: string): format is ContentGuideFormat {
  return Object.values(CONTENT_GUIDE.FORMATS).includes(format as ContentGuideFormat);
}

export function contentGuideIsValidLevel(level: string): level is ContentGuideLevel {
  return Object.values(CONTENT_GUIDE.LEVELS).includes(level as ContentGuideLevel);
}
