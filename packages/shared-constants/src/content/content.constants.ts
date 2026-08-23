/**
 * Content Constants
 * Configuration for content management, types, and settings
 */

export const CONTENT = {
  // Content Types
  TYPES: {
    BLOG: 'blog',
    PAGE: 'page',
    ARTICLE: 'article',
    NEWS: 'news',
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    CASE_STUDY: 'case_study',
    WHITE_PAPER: 'white_paper',
    EBOOK: 'ebook',
    VIDEO: 'video',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    PRESENTATION: 'presentation',
    DOCUMENTATION: 'documentation',
    HELP: 'help',
    FAQ: 'faq',
    TESTIMONIAL: 'testimonial',
    REVIEW: 'review',
    ANNOUNCEMENT: 'announcement',
    NEWSLETTER: 'newsletter',
    SOCIAL_POST: 'social_post',
    PRODUCT_DESCRIPTION: 'product_description',
    CATEGORY_DESCRIPTION: 'category_description',
    LANDING_PAGE: 'landing_page',
    ABOUT: 'about',
    CONTACT: 'contact',
    CUSTOM: 'custom',
  } as const,

  // Content Statuses
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

  // Content Categories
  CATEGORIES: {
    TECHNOLOGY: 'technology',
    BUSINESS: 'business',
    ECOMMERCE: 'ecommerce',
    MARKETING: 'marketing',
    DESIGN: 'design',
    DEVELOPMENT: 'development',
    PRODUCTIVITY: 'productivity',
    EDUCATION: 'education',
    HEALTH: 'health',
    LIFESTYLE: 'lifestyle',
    FINANCE: 'finance',
    SCIENCE: 'science',
    POLITICS: 'politics',
    SPORTS: 'sports',
    ENTERTAINMENT: 'entertainment',
    CUSTOM: 'custom',
  } as const,

  // Content Tags
  TAGS: {
    TRENDING: 'trending',
    POPULAR: 'popular',
    NEW: 'new',
    UPDATED: 'updated',
    FEATURED: 'featured',
    EDITORS_PICK: 'editors_pick',
    STAFF_PICK: 'staff_pick',
    RECOMMENDED: 'recommended',
    SPONSORED: 'sponsored',
    PROMOTED: 'promoted',
    EXCLUSIVE: 'exclusive',
    PREMIUM: 'premium',
    FREE: 'free',
    BETA: 'beta',
    EXPERIMENTAL: 'experimental',
  } as const,

  // Content Formats
  FORMATS: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    RICH_TEXT: 'rich_text',
    PLAIN_TEXT: 'plain_text',
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    XLS: 'xls',
    XLSX: 'xlsx',
    PPT: 'ppt',
    PPTX: 'pptx',
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    YAML: 'yaml',
    TOML: 'toml',
  } as const,

  // Content Languages
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

  // Content Licenses
  LICENSES: {
    ALL_RIGHTS_RESERVED: 'all_rights_reserved',
    CC_BY: 'cc_by',
    CC_BY_SA: 'cc_by_sa',
    CC_BY_ND: 'cc_by_nd',
    CC_BY_NC: 'cc_by_nc',
    CC_BY_NC_SA: 'cc_by_nc_sa',
    CC_BY_NC_ND: 'cc_by_nc_nd',
    CC0: 'cc0',
    MIT: 'mit',
    APACHE: 'apache',
    GPL: 'gpl',
    BSD: 'bsd',
    PUBLIC_DOMAIN: 'public_domain',
    PROPRIETARY: 'proprietary',
    CUSTOM: 'custom',
  } as const,

  // Content Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
    DRAFT: 'draft',
  } as const,

  // Content Access
  ACCESS: {
    PUBLIC: 'public',
    RESTRICTED: 'restricted',
    CONFIDENTIAL: 'confidential',
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    PARTNER: 'partner',
    CUSTOM: 'custom',
  } as const,

  // Content Defaults
  DEFAULTS: {
    LANGUAGE: 'en',
    FORMAT: 'markdown',
    VISIBILITY: 'public',
    STATUS: 'draft',
    MAX_TAGS: 10,
    MAX_CATEGORIES: 5,
    MAX_AUTHORS: 5,
    MAX_IMAGES: 20,
    MAX_ATTACHMENTS: 10,
    MAX_WORDS: 10000,
    MIN_WORDS: 100,
  } as const,

  // Content Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONTENT_LENGTH: 1000000,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 10,
    MAX_AUTHORS: 10,
    MAX_IMAGES: 50,
    MAX_ATTACHMENTS: 25,
    MAX_WORDS: 50000,
    MIN_WORDS: 50,
  } as const,
} as const;

// Content Types
export type ContentType = (typeof CONTENT.TYPES)[keyof typeof CONTENT.TYPES];

// Content Statuses
export type ContentStatus = (typeof CONTENT.STATUSES)[keyof typeof CONTENT.STATUSES];

// Content Categories
export type ContentCategory = (typeof CONTENT.CATEGORIES)[keyof typeof CONTENT.CATEGORIES];

// Content Tags
export type ContentTag = (typeof CONTENT.TAGS)[keyof typeof CONTENT.TAGS];

// Content Formats
export type ContentFormat = (typeof CONTENT.FORMATS)[keyof typeof CONTENT.FORMATS];

// Content Languages
export type ContentLanguage = (typeof CONTENT.LANGUAGES)[keyof typeof CONTENT.LANGUAGES];

// Content Licenses
export type ContentLicense = (typeof CONTENT.LICENSES)[keyof typeof CONTENT.LICENSES];

// Content Visibility
export type ContentVisibility = (typeof CONTENT.VISIBILITY)[keyof typeof CONTENT.VISIBILITY];

// Content Access
export type ContentAccess = (typeof CONTENT.ACCESS)[keyof typeof CONTENT.ACCESS];

// Utility Functions
export function contentGetTypeLabel(type: ContentType): string {
  const labels: Record<ContentType, string> = {
    [CONTENT.TYPES.BLOG]: 'Blog Post',
    [CONTENT.TYPES.PAGE]: 'Page',
    [CONTENT.TYPES.ARTICLE]: 'Article',
    [CONTENT.TYPES.NEWS]: 'News',
    [CONTENT.TYPES.TUTORIAL]: 'Tutorial',
    [CONTENT.TYPES.GUIDE]: 'Guide',
    [CONTENT.TYPES.CASE_STUDY]: 'Case Study',
    [CONTENT.TYPES.WHITE_PAPER]: 'White Paper',
    [CONTENT.TYPES.EBOOK]: 'E-Book',
    [CONTENT.TYPES.VIDEO]: 'Video',
    [CONTENT.TYPES.PODCAST]: 'Podcast',
    [CONTENT.TYPES.WEBINAR]: 'Webinar',
    [CONTENT.TYPES.PRESENTATION]: 'Presentation',
    [CONTENT.TYPES.DOCUMENTATION]: 'Documentation',
    [CONTENT.TYPES.HELP]: 'Help Article',
    [CONTENT.TYPES.FAQ]: 'FAQ',
    [CONTENT.TYPES.TESTIMONIAL]: 'Testimonial',
    [CONTENT.TYPES.REVIEW]: 'Review',
    [CONTENT.TYPES.ANNOUNCEMENT]: 'Announcement',
    [CONTENT.TYPES.NEWSLETTER]: 'Newsletter',
    [CONTENT.TYPES.SOCIAL_POST]: 'Social Post',
    [CONTENT.TYPES.PRODUCT_DESCRIPTION]: 'Product Description',
    [CONTENT.TYPES.CATEGORY_DESCRIPTION]: 'Category Description',
    [CONTENT.TYPES.LANDING_PAGE]: 'Landing Page',
    [CONTENT.TYPES.ABOUT]: 'About Page',
    [CONTENT.TYPES.CONTACT]: 'Contact Page',
    [CONTENT.TYPES.CUSTOM]: 'Custom Content',
  };
  return labels[type] || 'Unknown Content Type';
}

export function contentGetStatusLabel(status: ContentStatus): string {
  const labels: Record<ContentStatus, string> = {
    [CONTENT.STATUSES.DRAFT]: 'Draft',
    [CONTENT.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT.STATUSES.APPROVED]: 'Approved',
    [CONTENT.STATUSES.REJECTED]: 'Rejected',
    [CONTENT.STATUSES.PUBLISHED]: 'Published',
    [CONTENT.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT.STATUSES.PRIVATE]: 'Private',
    [CONTENT.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentGetCategoryLabel(category: ContentCategory): string {
  const labels: Record<ContentCategory, string> = {
    [CONTENT.CATEGORIES.TECHNOLOGY]: 'Technology',
    [CONTENT.CATEGORIES.BUSINESS]: 'Business',
    [CONTENT.CATEGORIES.ECOMMERCE]: 'E-commerce',
    [CONTENT.CATEGORIES.MARKETING]: 'Marketing',
    [CONTENT.CATEGORIES.DESIGN]: 'Design',
    [CONTENT.CATEGORIES.DEVELOPMENT]: 'Development',
    [CONTENT.CATEGORIES.PRODUCTIVITY]: 'Productivity',
    [CONTENT.CATEGORIES.EDUCATION]: 'Education',
    [CONTENT.CATEGORIES.HEALTH]: 'Health',
    [CONTENT.CATEGORIES.LIFESTYLE]: 'Lifestyle',
    [CONTENT.CATEGORIES.FINANCE]: 'Finance',
    [CONTENT.CATEGORIES.SCIENCE]: 'Science',
    [CONTENT.CATEGORIES.POLITICS]: 'Politics',
    [CONTENT.CATEGORIES.SPORTS]: 'Sports',
    [CONTENT.CATEGORIES.ENTERTAINMENT]: 'Entertainment',
    [CONTENT.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function contentGetTagLabel(tag: ContentTag): string {
  const labels: Record<ContentTag, string> = {
    [CONTENT.TAGS.TRENDING]: 'Trending',
    [CONTENT.TAGS.POPULAR]: 'Popular',
    [CONTENT.TAGS.NEW]: 'New',
    [CONTENT.TAGS.UPDATED]: 'Updated',
    [CONTENT.TAGS.FEATURED]: 'Featured',
    [CONTENT.TAGS.EDITORS_PICK]: "Editor's Pick",
    [CONTENT.TAGS.STAFF_PICK]: 'Staff Pick',
    [CONTENT.TAGS.RECOMMENDED]: 'Recommended',
    [CONTENT.TAGS.SPONSORED]: 'Sponsored',
    [CONTENT.TAGS.PROMOTED]: 'Promoted',
    [CONTENT.TAGS.EXCLUSIVE]: 'Exclusive',
    [CONTENT.TAGS.PREMIUM]: 'Premium',
    [CONTENT.TAGS.FREE]: 'Free',
    [CONTENT.TAGS.BETA]: 'Beta',
    [CONTENT.TAGS.EXPERIMENTAL]: 'Experimental',
  };
  return labels[tag] || 'Unknown Tag';
}

export function contentGetFormatLabel(format: ContentFormat): string {
  const labels: Record<ContentFormat, string> = {
    [CONTENT.FORMATS.TEXT]: 'Text',
    [CONTENT.FORMATS.HTML]: 'HTML',
    [CONTENT.FORMATS.MARKDOWN]: 'Markdown',
    [CONTENT.FORMATS.RICH_TEXT]: 'Rich Text',
    [CONTENT.FORMATS.PLAIN_TEXT]: 'Plain Text',
    [CONTENT.FORMATS.PDF]: 'PDF',
    [CONTENT.FORMATS.DOC]: 'DOC',
    [CONTENT.FORMATS.DOCX]: 'DOCX',
    [CONTENT.FORMATS.XLS]: 'XLS',
    [CONTENT.FORMATS.XLSX]: 'XLSX',
    [CONTENT.FORMATS.PPT]: 'PPT',
    [CONTENT.FORMATS.PPTX]: 'PPTX',
    [CONTENT.FORMATS.CSV]: 'CSV',
    [CONTENT.FORMATS.JSON]: 'JSON',
    [CONTENT.FORMATS.XML]: 'XML',
    [CONTENT.FORMATS.YAML]: 'YAML',
    [CONTENT.FORMATS.TOML]: 'TOML',
  };
  return labels[format] || 'Unknown Format';
}

export function contentGetLanguageLabel(language: ContentLanguage): string {
  const labels: Record<ContentLanguage, string> = {
    [CONTENT.LANGUAGES.EN]: 'English',
    [CONTENT.LANGUAGES.BN]: 'Bengali',
    [CONTENT.LANGUAGES.HI]: 'Hindi',
    [CONTENT.LANGUAGES.AR]: 'Arabic',
    [CONTENT.LANGUAGES.ES]: 'Spanish',
    [CONTENT.LANGUAGES.FR]: 'French',
    [CONTENT.LANGUAGES.DE]: 'German',
    [CONTENT.LANGUAGES.ZH]: 'Chinese',
    [CONTENT.LANGUAGES.JA]: 'Japanese',
    [CONTENT.LANGUAGES.RU]: 'Russian',
    [CONTENT.LANGUAGES.PT]: 'Portuguese',
    [CONTENT.LANGUAGES.IT]: 'Italian',
    [CONTENT.LANGUAGES.KO]: 'Korean',
    [CONTENT.LANGUAGES.VI]: 'Vietnamese',
    [CONTENT.LANGUAGES.TH]: 'Thai',
    [CONTENT.LANGUAGES.UR]: 'Urdu',
  };
  return labels[language] || 'Unknown Language';
}

export function contentGetLicenseLabel(license: ContentLicense): string {
  const labels: Record<ContentLicense, string> = {
    [CONTENT.LICENSES.ALL_RIGHTS_RESERVED]: 'All Rights Reserved',
    [CONTENT.LICENSES.CC_BY]: 'CC BY',
    [CONTENT.LICENSES.CC_BY_SA]: 'CC BY-SA',
    [CONTENT.LICENSES.CC_BY_ND]: 'CC BY-ND',
    [CONTENT.LICENSES.CC_BY_NC]: 'CC BY-NC',
    [CONTENT.LICENSES.CC_BY_NC_SA]: 'CC BY-NC-SA',
    [CONTENT.LICENSES.CC_BY_NC_ND]: 'CC BY-NC-ND',
    [CONTENT.LICENSES.CC0]: 'CC0 (Public Domain)',
    [CONTENT.LICENSES.MIT]: 'MIT License',
    [CONTENT.LICENSES.APACHE]: 'Apache License',
    [CONTENT.LICENSES.GPL]: 'GPL License',
    [CONTENT.LICENSES.BSD]: 'BSD License',
    [CONTENT.LICENSES.PUBLIC_DOMAIN]: 'Public Domain',
    [CONTENT.LICENSES.PROPRIETARY]: 'Proprietary',
    [CONTENT.LICENSES.CUSTOM]: 'Custom License',
  };
  return labels[license] || 'Unknown License';
}

export function contentGetVisibilityLabel(visibility: ContentVisibility): string {
  const labels: Record<ContentVisibility, string> = {
    [CONTENT.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT.VISIBILITY.TEAM_ONLY]: 'Team Only',
    [CONTENT.VISIBILITY.DRAFT]: 'Draft',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentIsPublished(status: ContentStatus): boolean {
  const publishedStatuses: ContentStatus[] = [
    CONTENT.STATUSES.PUBLISHED,
    CONTENT.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentIsEditable(status: ContentStatus): boolean {
  const editableStatuses: ContentStatus[] = [
    CONTENT.STATUSES.DRAFT,
    CONTENT.STATUSES.PENDING_REVIEW,
    CONTENT.STATUSES.IN_REVIEW,
    CONTENT.STATUSES.REVIEWED,
    CONTENT.STATUSES.PENDING_APPROVAL,
    CONTENT.STATUSES.REJECTED,
    CONTENT.STATUSES.PRIVATE,
    CONTENT.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentIsValidType(type: string): type is ContentType {
  return Object.values(CONTENT.TYPES).includes(type as ContentType);
}

export function contentIsValidStatus(status: string): status is ContentStatus {
  return Object.values(CONTENT.STATUSES).includes(status as ContentStatus);
}

export function contentIsValidCategory(category: string): category is ContentCategory {
  return Object.values(CONTENT.CATEGORIES).includes(category as ContentCategory);
}

export function contentIsValidTag(tag: string): tag is ContentTag {
  return Object.values(CONTENT.TAGS).includes(tag as ContentTag);
}

export function contentIsValidFormat(format: string): format is ContentFormat {
  return Object.values(CONTENT.FORMATS).includes(format as ContentFormat);
}

export function contentIsValidLanguage(language: string): language is ContentLanguage {
  return Object.values(CONTENT.LANGUAGES).includes(language as ContentLanguage);
}

export function contentIsValidLicense(license: string): license is ContentLicense {
  return Object.values(CONTENT.LICENSES).includes(license as ContentLicense);
}

export function contentGetDefaultLanguage(): ContentLanguage {
  return CONTENT.DEFAULTS.LANGUAGE as ContentLanguage;
}

export function contentGetDefaultFormat(): ContentFormat {
  return CONTENT.DEFAULTS.FORMAT as ContentFormat;
}

export function contentGetDefaultVisibility(): ContentVisibility {
  return CONTENT.DEFAULTS.VISIBILITY as ContentVisibility;
}

export function contentGetDefaultStatus(): ContentStatus {
  return CONTENT.DEFAULTS.STATUS as ContentStatus;
}

export function contentGetMaxTags(): number {
  return CONTENT.DEFAULTS.MAX_TAGS;
}

export function contentGetMaxCategories(): number {
  return CONTENT.DEFAULTS.MAX_CATEGORIES;
}

export function contentGetMaxWords(): number {
  return CONTENT.DEFAULTS.MAX_WORDS;
}

export function contentGetMinWords(): number {
  return CONTENT.DEFAULTS.MIN_WORDS;
}
