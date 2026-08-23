/**
 * White Paper Constants
 * Configuration for white papers, research papers, and technical documents
 */

export const CONTENT_WHITE_PAPER = {
  // White Paper Types
  TYPES: {
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    RESEARCH: 'research',
    INDUSTRY: 'industry',
    PRODUCT: 'product',
    SOLUTION: 'solution',
    COMPARISON: 'comparison',
    HOW_TO: 'how_to',
    CASE_STUDY: 'case_study',
    TREND: 'trend',
    FORECAST: 'forecast',
    CUSTOM: 'custom',
  } as const,

  // White Paper Statuses
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

  // White Paper Formats
  FORMATS: {
    PDF: 'pdf',
    DOCX: 'docx',
    HTML: 'html',
    MARKDOWN: 'markdown',
    TEXT: 'text',
    EPUB: 'epub',
    MOBI: 'mobi',
    CUSTOM: 'custom',
  } as const,

  // White Paper Industries
  INDUSTRIES: {
    TECHNOLOGY: 'technology',
    FINANCE: 'finance',
    HEALTHCARE: 'healthcare',
    EDUCATION: 'education',
    MANUFACTURING: 'manufacturing',
    RETAIL: 'retail',
    ECOMMERCE: 'ecommerce',
    LOGISTICS: 'logistics',
    ENERGY: 'energy',
    TELECOM: 'telecom',
    CONSULTING: 'consulting',
    CUSTOM: 'custom',
  } as const,

  // White Paper Levels
  LEVELS: {
    ENTRY: 'entry',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    MASTER: 'master',
  } as const,

  // White Paper Visibility
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

  // White Paper Sort Options
  SORT_OPTIONS: {
    TITLE_ASC: 'title_asc',
    TITLE_DESC: 'title_desc',
    DATE_ASC: 'date_asc',
    DATE_DESC: 'date_desc',
    VIEWS: 'views',
    DOWNLOADS: 'downloads',
    POPULAR: 'popular',
    RATING: 'rating',
    CUSTOM: 'custom',
  } as const,

  // White Paper Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'pdf',
    LEVEL: 'intermediate',
    VISIBILITY: 'public',
    SORT: 'date_desc',
    MAX_LENGTH: 20000,
    MIN_LENGTH: 1000,
  } as const,

  // White Paper Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 100000,
    MAX_AUTHORS: 10,
    MAX_REFERENCES: 100,
    MAX_IMAGES: 50,
    MAX_TABLES: 20,
    MIN_CONTENT_LENGTH: 500,
  } as const,
} as const;

// White Paper Types
export type ContentWhitePaperType =
  (typeof CONTENT_WHITE_PAPER.TYPES)[keyof typeof CONTENT_WHITE_PAPER.TYPES];

// White Paper Statuses
export type ContentWhitePaperStatus =
  (typeof CONTENT_WHITE_PAPER.STATUSES)[keyof typeof CONTENT_WHITE_PAPER.STATUSES];

// White Paper Formats
export type ContentWhitePaperFormat =
  (typeof CONTENT_WHITE_PAPER.FORMATS)[keyof typeof CONTENT_WHITE_PAPER.FORMATS];

// White Paper Industries
export type ContentWhitePaperIndustry =
  (typeof CONTENT_WHITE_PAPER.INDUSTRIES)[keyof typeof CONTENT_WHITE_PAPER.INDUSTRIES];

// White Paper Levels
export type ContentWhitePaperLevel =
  (typeof CONTENT_WHITE_PAPER.LEVELS)[keyof typeof CONTENT_WHITE_PAPER.LEVELS];

// White Paper Visibility
export type ContentWhitePaperVisibility =
  (typeof CONTENT_WHITE_PAPER.VISIBILITY)[keyof typeof CONTENT_WHITE_PAPER.VISIBILITY];

// White Paper Sort Options
export type ContentWhitePaperSortOption =
  (typeof CONTENT_WHITE_PAPER.SORT_OPTIONS)[keyof typeof CONTENT_WHITE_PAPER.SORT_OPTIONS];

// Utility Functions
export function contentWhitePaperGetTypeLabel(type: ContentWhitePaperType): string {
  const labels: Record<ContentWhitePaperType, string> = {
    [CONTENT_WHITE_PAPER.TYPES.TECHNICAL]: 'Technical White Paper',
    [CONTENT_WHITE_PAPER.TYPES.BUSINESS]: 'Business White Paper',
    [CONTENT_WHITE_PAPER.TYPES.RESEARCH]: 'Research White Paper',
    [CONTENT_WHITE_PAPER.TYPES.INDUSTRY]: 'Industry White Paper',
    [CONTENT_WHITE_PAPER.TYPES.PRODUCT]: 'Product White Paper',
    [CONTENT_WHITE_PAPER.TYPES.SOLUTION]: 'Solution White Paper',
    [CONTENT_WHITE_PAPER.TYPES.COMPARISON]: 'Comparison White Paper',
    [CONTENT_WHITE_PAPER.TYPES.HOW_TO]: 'How-To White Paper',
    [CONTENT_WHITE_PAPER.TYPES.CASE_STUDY]: 'Case Study White Paper',
    [CONTENT_WHITE_PAPER.TYPES.TREND]: 'Trend White Paper',
    [CONTENT_WHITE_PAPER.TYPES.FORECAST]: 'Forecast White Paper',
    [CONTENT_WHITE_PAPER.TYPES.CUSTOM]: 'Custom White Paper',
  };
  return labels[type] || 'Unknown White Paper Type';
}

export function contentWhitePaperGetStatusLabel(status: ContentWhitePaperStatus): string {
  const labels: Record<ContentWhitePaperStatus, string> = {
    [CONTENT_WHITE_PAPER.STATUSES.DRAFT]: 'Draft',
    [CONTENT_WHITE_PAPER.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_WHITE_PAPER.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_WHITE_PAPER.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_WHITE_PAPER.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_WHITE_PAPER.STATUSES.APPROVED]: 'Approved',
    [CONTENT_WHITE_PAPER.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_WHITE_PAPER.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_WHITE_PAPER.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_WHITE_PAPER.STATUSES.PRIVATE]: 'Private',
    [CONTENT_WHITE_PAPER.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_WHITE_PAPER.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_WHITE_PAPER.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_WHITE_PAPER.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentWhitePaperGetFormatLabel(format: ContentWhitePaperFormat): string {
  const labels: Record<ContentWhitePaperFormat, string> = {
    [CONTENT_WHITE_PAPER.FORMATS.PDF]: 'PDF Document',
    [CONTENT_WHITE_PAPER.FORMATS.DOCX]: 'Word Document',
    [CONTENT_WHITE_PAPER.FORMATS.HTML]: 'HTML Document',
    [CONTENT_WHITE_PAPER.FORMATS.MARKDOWN]: 'Markdown Document',
    [CONTENT_WHITE_PAPER.FORMATS.TEXT]: 'Text Document',
    [CONTENT_WHITE_PAPER.FORMATS.EPUB]: 'EPUB Document',
    [CONTENT_WHITE_PAPER.FORMATS.MOBI]: 'MOBI Document',
    [CONTENT_WHITE_PAPER.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentWhitePaperGetIndustryLabel(industry: ContentWhitePaperIndustry): string {
  const labels: Record<ContentWhitePaperIndustry, string> = {
    [CONTENT_WHITE_PAPER.INDUSTRIES.TECHNOLOGY]: 'Technology',
    [CONTENT_WHITE_PAPER.INDUSTRIES.FINANCE]: 'Finance',
    [CONTENT_WHITE_PAPER.INDUSTRIES.HEALTHCARE]: 'Healthcare',
    [CONTENT_WHITE_PAPER.INDUSTRIES.EDUCATION]: 'Education',
    [CONTENT_WHITE_PAPER.INDUSTRIES.MANUFACTURING]: 'Manufacturing',
    [CONTENT_WHITE_PAPER.INDUSTRIES.RETAIL]: 'Retail',
    [CONTENT_WHITE_PAPER.INDUSTRIES.ECOMMERCE]: 'E-commerce',
    [CONTENT_WHITE_PAPER.INDUSTRIES.LOGISTICS]: 'Logistics',
    [CONTENT_WHITE_PAPER.INDUSTRIES.ENERGY]: 'Energy',
    [CONTENT_WHITE_PAPER.INDUSTRIES.TELECOM]: 'Telecom',
    [CONTENT_WHITE_PAPER.INDUSTRIES.CONSULTING]: 'Consulting',
    [CONTENT_WHITE_PAPER.INDUSTRIES.CUSTOM]: 'Custom Industry',
  };
  return labels[industry] || 'Unknown Industry';
}

export function contentWhitePaperGetLevelLabel(level: ContentWhitePaperLevel): string {
  const labels: Record<ContentWhitePaperLevel, string> = {
    [CONTENT_WHITE_PAPER.LEVELS.ENTRY]: 'Entry Level',
    [CONTENT_WHITE_PAPER.LEVELS.INTERMEDIATE]: 'Intermediate Level',
    [CONTENT_WHITE_PAPER.LEVELS.ADVANCED]: 'Advanced Level',
    [CONTENT_WHITE_PAPER.LEVELS.EXPERT]: 'Expert Level',
    [CONTENT_WHITE_PAPER.LEVELS.MASTER]: 'Master Level',
  };
  return labels[level] || 'Unknown Level';
}

export function contentWhitePaperGetVisibilityLabel(
  visibility: ContentWhitePaperVisibility
): string {
  const labels: Record<ContentWhitePaperVisibility, string> = {
    [CONTENT_WHITE_PAPER.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_WHITE_PAPER.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_WHITE_PAPER.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_WHITE_PAPER.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_WHITE_PAPER.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_WHITE_PAPER.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_WHITE_PAPER.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_WHITE_PAPER.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentWhitePaperGetSortOptionLabel(sort: ContentWhitePaperSortOption): string {
  const labels: Record<ContentWhitePaperSortOption, string> = {
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.DOWNLOADS]: 'Most Downloaded',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.RATING]: 'Highest Rated',
    [CONTENT_WHITE_PAPER.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentWhitePaperIsPublished(status: ContentWhitePaperStatus): boolean {
  const publishedStatuses: ContentWhitePaperStatus[] = [
    CONTENT_WHITE_PAPER.STATUSES.PUBLISHED,
    CONTENT_WHITE_PAPER.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentWhitePaperIsEditable(status: ContentWhitePaperStatus): boolean {
  const editableStatuses: ContentWhitePaperStatus[] = [
    CONTENT_WHITE_PAPER.STATUSES.DRAFT,
    CONTENT_WHITE_PAPER.STATUSES.PENDING_REVIEW,
    CONTENT_WHITE_PAPER.STATUSES.IN_REVIEW,
    CONTENT_WHITE_PAPER.STATUSES.REVIEWED,
    CONTENT_WHITE_PAPER.STATUSES.PENDING_APPROVAL,
    CONTENT_WHITE_PAPER.STATUSES.REJECTED,
    CONTENT_WHITE_PAPER.STATUSES.PRIVATE,
    CONTENT_WHITE_PAPER.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentWhitePaperIsApproved(status: ContentWhitePaperStatus): boolean {
  const approvedStatuses: ContentWhitePaperStatus[] = [
    CONTENT_WHITE_PAPER.STATUSES.APPROVED,
    CONTENT_WHITE_PAPER.STATUSES.PUBLISHED,
    CONTENT_WHITE_PAPER.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentWhitePaperGetDefaultStatus(): ContentWhitePaperStatus {
  return CONTENT_WHITE_PAPER.DEFAULTS.STATUS as ContentWhitePaperStatus;
}

export function contentWhitePaperGetDefaultFormat(): ContentWhitePaperFormat {
  return CONTENT_WHITE_PAPER.DEFAULTS.FORMAT as ContentWhitePaperFormat;
}

export function contentWhitePaperGetDefaultLevel(): ContentWhitePaperLevel {
  return CONTENT_WHITE_PAPER.DEFAULTS.LEVEL as ContentWhitePaperLevel;
}

export function contentWhitePaperGetDefaultVisibility(): ContentWhitePaperVisibility {
  return CONTENT_WHITE_PAPER.DEFAULTS.VISIBILITY as ContentWhitePaperVisibility;
}

export function contentWhitePaperGetDefaultSort(): ContentWhitePaperSortOption {
  return CONTENT_WHITE_PAPER.DEFAULTS.SORT as ContentWhitePaperSortOption;
}

export function contentWhitePaperGetMaxTitleLength(): number {
  return CONTENT_WHITE_PAPER.LIMITS.MAX_TITLE_LENGTH;
}

export function contentWhitePaperGetMaxDescriptionLength(): number {
  return CONTENT_WHITE_PAPER.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentWhitePaperGetMaxContentLength(): number {
  return CONTENT_WHITE_PAPER.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentWhitePaperGetMinContentLength(): number {
  return CONTENT_WHITE_PAPER.LIMITS.MIN_CONTENT_LENGTH;
}

export function contentWhitePaperGetMaxAuthors(): number {
  return CONTENT_WHITE_PAPER.LIMITS.MAX_AUTHORS;
}

export function contentWhitePaperGetMaxReferences(): number {
  return CONTENT_WHITE_PAPER.LIMITS.MAX_REFERENCES;
}

export function contentWhitePaperIsValidType(type: string): type is ContentWhitePaperType {
  return Object.values(CONTENT_WHITE_PAPER.TYPES).includes(type as ContentWhitePaperType);
}

export function contentWhitePaperIsValidStatus(status: string): status is ContentWhitePaperStatus {
  return Object.values(CONTENT_WHITE_PAPER.STATUSES).includes(status as ContentWhitePaperStatus);
}

export function contentWhitePaperIsValidFormat(format: string): format is ContentWhitePaperFormat {
  return Object.values(CONTENT_WHITE_PAPER.FORMATS).includes(format as ContentWhitePaperFormat);
}

export function contentWhitePaperIsValidIndustry(
  industry: string
): industry is ContentWhitePaperIndustry {
  return Object.values(CONTENT_WHITE_PAPER.INDUSTRIES).includes(
    industry as ContentWhitePaperIndustry
  );
}

export function contentWhitePaperIsValidLevel(level: string): level is ContentWhitePaperLevel {
  return Object.values(CONTENT_WHITE_PAPER.LEVELS).includes(level as ContentWhitePaperLevel);
}
