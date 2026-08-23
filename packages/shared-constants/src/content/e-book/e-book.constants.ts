/**
 * E-Book Constants
 * Configuration for e-books, digital publications, and electronic books
 */

export const CONTENT_E_BOOK = {
  // E-Book Types
  TYPES: {
    GUIDE: 'guide',
    MANUAL: 'manual',
    TEXTBOOK: 'textbook',
    REFERENCE: 'reference',
    FICTION: 'fiction',
    NON_FICTION: 'non_fiction',
    BUSINESS: 'business',
    TECHNOLOGY: 'technology',
    EDUCATION: 'education',
    SELF_HELP: 'self_help',
    BIOGRAPHY: 'biography',
    HISTORY: 'history',
    SCIENCE: 'science',
    CUSTOM: 'custom',
  } as const,

  // E-Book Statuses
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

  // E-Book Formats
  FORMATS: {
    PDF: 'pdf',
    EPUB: 'epub',
    MOBI: 'mobi',
    AZW3: 'azw3',
    HTML: 'html',
    MARKDOWN: 'markdown',
    TEXT: 'text',
    DOCX: 'docx',
    ODT: 'odt',
    CUSTOM: 'custom',
  } as const,

  // E-Book Genres
  GENRES: {
    // Fiction
    MYSTERY: 'mystery',
    THRILLER: 'thriller',
    ROMANCE: 'romance',
    SCI_FI: 'sci_fi',
    FANTASY: 'fantasy',
    HORROR: 'horror',
    HISTORICAL_FICTION: 'historical_fiction',

    // Non-Fiction
    BUSINESS: 'business',
    TECHNOLOGY: 'technology',
    EDUCATION: 'education',
    SCIENCE: 'science',
    HEALTH: 'health',
    PSYCHOLOGY: 'psychology',
    PHILOSOPHY: 'philosophy',
    SELF_IMPROVEMENT: 'self_improvement',

    // Other
    BIOGRAPHY: 'biography',
    AUTOBIOGRAPHY: 'autobiography',
    TRAVEL: 'travel',
    COOKBOOK: 'cookbook',
    ART: 'art',
    PHOTOGRAPHY: 'photography',
    MUSIC: 'music',
    CUSTOM: 'custom',
  } as const,

  // E-Book Languages
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
    PT: 'pt',
    IT: 'it',
    KO: 'ko',
    VI: 'vi',
    TH: 'th',
    UR: 'ur',
  } as const,

  // E-Book Visibility
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

  // E-Book Sort Options
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

  // E-Book Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'pdf',
    VISIBILITY: 'public',
    SORT: 'date_desc',
    MAX_LENGTH: 50000,
    MIN_LENGTH: 1000,
    MAX_PAGES: 500,
    MIN_PAGES: 10,
  } as const,

  // E-Book Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 200000,
    MAX_AUTHORS: 5,
    MAX_PAGES: 1000,
    MIN_PAGES: 5,
    MAX_CHAPTERS: 50,
    MAX_IMAGES: 100,
    MAX_TABLES: 50,
  } as const,
} as const;

// E-Book Types
export type ContentEBookType = (typeof CONTENT_E_BOOK.TYPES)[keyof typeof CONTENT_E_BOOK.TYPES];

// E-Book Statuses
export type ContentEBookStatus =
  (typeof CONTENT_E_BOOK.STATUSES)[keyof typeof CONTENT_E_BOOK.STATUSES];

// E-Book Formats
export type ContentEBookFormat =
  (typeof CONTENT_E_BOOK.FORMATS)[keyof typeof CONTENT_E_BOOK.FORMATS];

// E-Book Genres
export type ContentEBookGenre = (typeof CONTENT_E_BOOK.GENRES)[keyof typeof CONTENT_E_BOOK.GENRES];

// E-Book Languages
export type ContentEBookLanguage =
  (typeof CONTENT_E_BOOK.LANGUAGES)[keyof typeof CONTENT_E_BOOK.LANGUAGES];

// E-Book Visibility
export type ContentEBookVisibility =
  (typeof CONTENT_E_BOOK.VISIBILITY)[keyof typeof CONTENT_E_BOOK.VISIBILITY];

// E-Book Sort Options
export type ContentEBookSortOption =
  (typeof CONTENT_E_BOOK.SORT_OPTIONS)[keyof typeof CONTENT_E_BOOK.SORT_OPTIONS];

// Utility Functions
export function contentEBookGetTypeLabel(type: ContentEBookType): string {
  const labels: Record<ContentEBookType, string> = {
    [CONTENT_E_BOOK.TYPES.GUIDE]: 'Guide E-Book',
    [CONTENT_E_BOOK.TYPES.MANUAL]: 'Manual E-Book',
    [CONTENT_E_BOOK.TYPES.TEXTBOOK]: 'Textbook E-Book',
    [CONTENT_E_BOOK.TYPES.REFERENCE]: 'Reference E-Book',
    [CONTENT_E_BOOK.TYPES.FICTION]: 'Fiction E-Book',
    [CONTENT_E_BOOK.TYPES.NON_FICTION]: 'Non-Fiction E-Book',
    [CONTENT_E_BOOK.TYPES.BUSINESS]: 'Business E-Book',
    [CONTENT_E_BOOK.TYPES.TECHNOLOGY]: 'Technology E-Book',
    [CONTENT_E_BOOK.TYPES.EDUCATION]: 'Education E-Book',
    [CONTENT_E_BOOK.TYPES.SELF_HELP]: 'Self-Help E-Book',
    [CONTENT_E_BOOK.TYPES.BIOGRAPHY]: 'Biography E-Book',
    [CONTENT_E_BOOK.TYPES.HISTORY]: 'History E-Book',
    [CONTENT_E_BOOK.TYPES.SCIENCE]: 'Science E-Book',
    [CONTENT_E_BOOK.TYPES.CUSTOM]: 'Custom E-Book',
  };
  return labels[type] || 'Unknown E-Book Type';
}

export function contentEBookGetStatusLabel(status: ContentEBookStatus): string {
  const labels: Record<ContentEBookStatus, string> = {
    [CONTENT_E_BOOK.STATUSES.DRAFT]: 'Draft',
    [CONTENT_E_BOOK.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_E_BOOK.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_E_BOOK.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_E_BOOK.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_E_BOOK.STATUSES.APPROVED]: 'Approved',
    [CONTENT_E_BOOK.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_E_BOOK.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_E_BOOK.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_E_BOOK.STATUSES.PRIVATE]: 'Private',
    [CONTENT_E_BOOK.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_E_BOOK.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_E_BOOK.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_E_BOOK.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentEBookGetFormatLabel(format: ContentEBookFormat): string {
  const labels: Record<ContentEBookFormat, string> = {
    [CONTENT_E_BOOK.FORMATS.PDF]: 'PDF E-Book',
    [CONTENT_E_BOOK.FORMATS.EPUB]: 'EPUB E-Book',
    [CONTENT_E_BOOK.FORMATS.MOBI]: 'MOBI E-Book',
    [CONTENT_E_BOOK.FORMATS.AZW3]: 'AZW3 E-Book',
    [CONTENT_E_BOOK.FORMATS.HTML]: 'HTML E-Book',
    [CONTENT_E_BOOK.FORMATS.MARKDOWN]: 'Markdown E-Book',
    [CONTENT_E_BOOK.FORMATS.TEXT]: 'Text E-Book',
    [CONTENT_E_BOOK.FORMATS.DOCX]: 'DOCX E-Book',
    [CONTENT_E_BOOK.FORMATS.ODT]: 'ODT E-Book',
    [CONTENT_E_BOOK.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentEBookGetGenreLabel(genre: ContentEBookGenre): string {
  const labels: Record<ContentEBookGenre, string> = {
    // Fiction
    [CONTENT_E_BOOK.GENRES.MYSTERY]: 'Mystery',
    [CONTENT_E_BOOK.GENRES.THRILLER]: 'Thriller',
    [CONTENT_E_BOOK.GENRES.ROMANCE]: 'Romance',
    [CONTENT_E_BOOK.GENRES.SCI_FI]: 'Science Fiction',
    [CONTENT_E_BOOK.GENRES.FANTASY]: 'Fantasy',
    [CONTENT_E_BOOK.GENRES.HORROR]: 'Horror',
    [CONTENT_E_BOOK.GENRES.HISTORICAL_FICTION]: 'Historical Fiction',

    // Non-Fiction
    [CONTENT_E_BOOK.GENRES.BUSINESS]: 'Business',
    [CONTENT_E_BOOK.GENRES.TECHNOLOGY]: 'Technology',
    [CONTENT_E_BOOK.GENRES.EDUCATION]: 'Education',
    [CONTENT_E_BOOK.GENRES.SCIENCE]: 'Science',
    [CONTENT_E_BOOK.GENRES.HEALTH]: 'Health',
    [CONTENT_E_BOOK.GENRES.PSYCHOLOGY]: 'Psychology',
    [CONTENT_E_BOOK.GENRES.PHILOSOPHY]: 'Philosophy',
    [CONTENT_E_BOOK.GENRES.SELF_IMPROVEMENT]: 'Self-Improvement',

    // Other
    [CONTENT_E_BOOK.GENRES.BIOGRAPHY]: 'Biography',
    [CONTENT_E_BOOK.GENRES.AUTOBIOGRAPHY]: 'Autobiography',
    [CONTENT_E_BOOK.GENRES.TRAVEL]: 'Travel',
    [CONTENT_E_BOOK.GENRES.COOKBOOK]: 'Cookbook',
    [CONTENT_E_BOOK.GENRES.ART]: 'Art',
    [CONTENT_E_BOOK.GENRES.PHOTOGRAPHY]: 'Photography',
    [CONTENT_E_BOOK.GENRES.MUSIC]: 'Music',
    [CONTENT_E_BOOK.GENRES.CUSTOM]: 'Custom Genre',
  };
  return labels[genre] || 'Unknown Genre';
}

export function contentEBookGetLanguageLabel(language: ContentEBookLanguage): string {
  const labels: Record<ContentEBookLanguage, string> = {
    [CONTENT_E_BOOK.LANGUAGES.EN]: 'English',
    [CONTENT_E_BOOK.LANGUAGES.BN]: 'Bengali',
    [CONTENT_E_BOOK.LANGUAGES.HI]: 'Hindi',
    [CONTENT_E_BOOK.LANGUAGES.AR]: 'Arabic',
    [CONTENT_E_BOOK.LANGUAGES.ES]: 'Spanish',
    [CONTENT_E_BOOK.LANGUAGES.FR]: 'French',
    [CONTENT_E_BOOK.LANGUAGES.DE]: 'German',
    [CONTENT_E_BOOK.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_E_BOOK.LANGUAGES.JA]: 'Japanese',
    [CONTENT_E_BOOK.LANGUAGES.RU]: 'Russian',
    [CONTENT_E_BOOK.LANGUAGES.PT]: 'Portuguese',
    [CONTENT_E_BOOK.LANGUAGES.IT]: 'Italian',
    [CONTENT_E_BOOK.LANGUAGES.KO]: 'Korean',
    [CONTENT_E_BOOK.LANGUAGES.VI]: 'Vietnamese',
    [CONTENT_E_BOOK.LANGUAGES.TH]: 'Thai',
    [CONTENT_E_BOOK.LANGUAGES.UR]: 'Urdu',
  };
  return labels[language] || 'Unknown Language';
}

export function contentEBookGetVisibilityLabel(visibility: ContentEBookVisibility): string {
  const labels: Record<ContentEBookVisibility, string> = {
    [CONTENT_E_BOOK.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_E_BOOK.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_E_BOOK.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_E_BOOK.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_E_BOOK.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_E_BOOK.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_E_BOOK.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_E_BOOK.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentEBookGetSortOptionLabel(sort: ContentEBookSortOption): string {
  const labels: Record<ContentEBookSortOption, string> = {
    [CONTENT_E_BOOK.SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
    [CONTENT_E_BOOK.SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
    [CONTENT_E_BOOK.SORT_OPTIONS.DATE_ASC]: 'Oldest First',
    [CONTENT_E_BOOK.SORT_OPTIONS.DATE_DESC]: 'Newest First',
    [CONTENT_E_BOOK.SORT_OPTIONS.VIEWS]: 'Most Viewed',
    [CONTENT_E_BOOK.SORT_OPTIONS.DOWNLOADS]: 'Most Downloaded',
    [CONTENT_E_BOOK.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_E_BOOK.SORT_OPTIONS.RATING]: 'Highest Rated',
    [CONTENT_E_BOOK.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentEBookIsPublished(status: ContentEBookStatus): boolean {
  const publishedStatuses: ContentEBookStatus[] = [
    CONTENT_E_BOOK.STATUSES.PUBLISHED,
    CONTENT_E_BOOK.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentEBookIsEditable(status: ContentEBookStatus): boolean {
  const editableStatuses: ContentEBookStatus[] = [
    CONTENT_E_BOOK.STATUSES.DRAFT,
    CONTENT_E_BOOK.STATUSES.PENDING_REVIEW,
    CONTENT_E_BOOK.STATUSES.IN_REVIEW,
    CONTENT_E_BOOK.STATUSES.REVIEWED,
    CONTENT_E_BOOK.STATUSES.PENDING_APPROVAL,
    CONTENT_E_BOOK.STATUSES.REJECTED,
    CONTENT_E_BOOK.STATUSES.PRIVATE,
    CONTENT_E_BOOK.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentEBookIsApproved(status: ContentEBookStatus): boolean {
  const approvedStatuses: ContentEBookStatus[] = [
    CONTENT_E_BOOK.STATUSES.APPROVED,
    CONTENT_E_BOOK.STATUSES.PUBLISHED,
    CONTENT_E_BOOK.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentEBookGetDefaultStatus(): ContentEBookStatus {
  return CONTENT_E_BOOK.DEFAULTS.STATUS as ContentEBookStatus;
}

export function contentEBookGetDefaultFormat(): ContentEBookFormat {
  return CONTENT_E_BOOK.DEFAULTS.FORMAT as ContentEBookFormat;
}

export function contentEBookGetDefaultVisibility(): ContentEBookVisibility {
  return CONTENT_E_BOOK.DEFAULTS.VISIBILITY as ContentEBookVisibility;
}

export function contentEBookGetDefaultSort(): ContentEBookSortOption {
  return CONTENT_E_BOOK.DEFAULTS.SORT as ContentEBookSortOption;
}

export function contentEBookGetMaxTitleLength(): number {
  return CONTENT_E_BOOK.LIMITS.MAX_TITLE_LENGTH;
}

export function contentEBookGetMaxDescriptionLength(): number {
  return CONTENT_E_BOOK.LIMITS.MAX_DESCRIPTION_LENGTH;
}

export function contentEBookGetMaxContentLength(): number {
  return CONTENT_E_BOOK.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentEBookGetMaxPages(): number {
  return CONTENT_E_BOOK.LIMITS.MAX_PAGES;
}

export function contentEBookGetMinPages(): number {
  return CONTENT_E_BOOK.LIMITS.MIN_PAGES;
}

export function contentEBookGetMaxAuthors(): number {
  return CONTENT_E_BOOK.LIMITS.MAX_AUTHORS;
}

export function contentEBookIsValidType(type: string): type is ContentEBookType {
  return Object.values(CONTENT_E_BOOK.TYPES).includes(type as ContentEBookType);
}

export function contentEBookIsValidStatus(status: string): status is ContentEBookStatus {
  return Object.values(CONTENT_E_BOOK.STATUSES).includes(status as ContentEBookStatus);
}

export function contentEBookIsValidFormat(format: string): format is ContentEBookFormat {
  return Object.values(CONTENT_E_BOOK.FORMATS).includes(format as ContentEBookFormat);
}

export function contentEBookIsValidGenre(genre: string): genre is ContentEBookGenre {
  return Object.values(CONTENT_E_BOOK.GENRES).includes(genre as ContentEBookGenre);
}

export function contentEBookIsValidLanguage(language: string): language is ContentEBookLanguage {
  return Object.values(CONTENT_E_BOOK.LANGUAGES).includes(language as ContentEBookLanguage);
}
