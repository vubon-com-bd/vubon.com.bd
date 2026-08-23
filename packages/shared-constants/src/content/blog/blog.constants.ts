/**
 * Blog Constants
 * Configuration for blog posts, settings, and features
 */

export const CONTENT_BLOG = {
  // Blog Types
  TYPES: {
    STANDARD: 'standard',
    FEATURED: 'featured',
    EDITORS_PICK: 'editors_pick',
    STAFF_PICK: 'staff_pick',
    TRENDING: 'trending',
    POPULAR: 'popular',
    NEWS: 'news',
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    CASE_STUDY: 'case_study',
    OPINION: 'opinion',
    INTERVIEW: 'interview',
    REVIEW: 'review',
    COMPARISON: 'comparison',
    LIST: 'list',
    HOW_TO: 'how_to',
    CUSTOM: 'custom',
  } as const,

  // Blog Statuses
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

  // Blog Categories
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
    TRAVEL: 'travel',
    FOOD: 'food',
    FASHION: 'fashion',
    CULTURE: 'culture',
    ENVIRONMENT: 'environment',
    CUSTOM: 'custom',
  } as const,

  // Blog Tags
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

  // Blog Formats
  FORMATS: {
    STANDARD: 'standard',
    VIDEO: 'video',
    AUDIO: 'audio',
    GALLERY: 'gallery',
    LINK: 'link',
    QUOTE: 'quote',
    STATUS: 'status',
    ASIDE: 'aside',
    CHAT: 'chat',
    IMAGE: 'image',
    CUSTOM: 'custom',
  } as const,

  // Blog Visibility
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

  // Blog Comments
  COMMENTS: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    MODERATED: 'moderated',
    APPROVED_ONLY: 'approved_only',
    REGISTERED_ONLY: 'registered_only',
  } as const,

  // Blog Defaults
  DEFAULTS: {
    STATUS: 'draft',
    VISIBILITY: 'public',
    COMMENTS: 'enabled',
    FORMAT: 'standard',
    MAX_TAGS: 10,
    MAX_CATEGORIES: 3,
    EXCERPT_LENGTH: 200,
    READING_SPEED: 200, // words per minute
  } as const,

  // Blog Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_EXCERPT_LENGTH: 500,
    MAX_CONTENT_LENGTH: 1000000,
    MAX_TAGS: 20,
    MAX_CATEGORIES: 5,
    MAX_IMAGES: 50,
    MAX_ATTACHMENTS: 25,
    MAX_WORDS: 50000,
    MIN_WORDS: 50,
  } as const,

  // Blog Reading Time
  READING_TIME: {
    MIN: 1,
    MAX: 60,
    AVERAGE_SPEED: 200, // words per minute
  } as const,
} as const;

// Blog Types
export type ContentBlogType = (typeof CONTENT_BLOG.TYPES)[keyof typeof CONTENT_BLOG.TYPES];

// Blog Statuses
export type ContentBlogStatus = (typeof CONTENT_BLOG.STATUSES)[keyof typeof CONTENT_BLOG.STATUSES];

// Blog Categories
export type ContentBlogCategory =
  (typeof CONTENT_BLOG.CATEGORIES)[keyof typeof CONTENT_BLOG.CATEGORIES];

// Blog Tags
export type ContentBlogTag = (typeof CONTENT_BLOG.TAGS)[keyof typeof CONTENT_BLOG.TAGS];

// Blog Formats
export type ContentBlogFormat = (typeof CONTENT_BLOG.FORMATS)[keyof typeof CONTENT_BLOG.FORMATS];

// Blog Visibility
export type ContentBlogVisibility =
  (typeof CONTENT_BLOG.VISIBILITY)[keyof typeof CONTENT_BLOG.VISIBILITY];

// Blog Comments
export type ContentBlogComments =
  (typeof CONTENT_BLOG.COMMENTS)[keyof typeof CONTENT_BLOG.COMMENTS];

// Utility Functions
export function contentBlogGetTypeLabel(type: ContentBlogType): string {
  const labels: Record<ContentBlogType, string> = {
    [CONTENT_BLOG.TYPES.STANDARD]: 'Standard Post',
    [CONTENT_BLOG.TYPES.FEATURED]: 'Featured Post',
    [CONTENT_BLOG.TYPES.EDITORS_PICK]: "Editor's Pick",
    [CONTENT_BLOG.TYPES.STAFF_PICK]: 'Staff Pick',
    [CONTENT_BLOG.TYPES.TRENDING]: 'Trending Post',
    [CONTENT_BLOG.TYPES.POPULAR]: 'Popular Post',
    [CONTENT_BLOG.TYPES.NEWS]: 'News Post',
    [CONTENT_BLOG.TYPES.TUTORIAL]: 'Tutorial',
    [CONTENT_BLOG.TYPES.GUIDE]: 'Guide',
    [CONTENT_BLOG.TYPES.CASE_STUDY]: 'Case Study',
    [CONTENT_BLOG.TYPES.OPINION]: 'Opinion',
    [CONTENT_BLOG.TYPES.INTERVIEW]: 'Interview',
    [CONTENT_BLOG.TYPES.REVIEW]: 'Review',
    [CONTENT_BLOG.TYPES.COMPARISON]: 'Comparison',
    [CONTENT_BLOG.TYPES.LIST]: 'List Post',
    [CONTENT_BLOG.TYPES.HOW_TO]: 'How-To',
    [CONTENT_BLOG.TYPES.CUSTOM]: 'Custom Post',
  };
  return labels[type] || 'Unknown Blog Type';
}

export function contentBlogGetStatusLabel(status: ContentBlogStatus): string {
  const labels: Record<ContentBlogStatus, string> = {
    [CONTENT_BLOG.STATUSES.DRAFT]: 'Draft',
    [CONTENT_BLOG.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_BLOG.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_BLOG.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_BLOG.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_BLOG.STATUSES.APPROVED]: 'Approved',
    [CONTENT_BLOG.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_BLOG.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_BLOG.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_BLOG.STATUSES.PRIVATE]: 'Private',
    [CONTENT_BLOG.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_BLOG.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_BLOG.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_BLOG.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentBlogGetCategoryLabel(category: ContentBlogCategory): string {
  const labels: Record<ContentBlogCategory, string> = {
    [CONTENT_BLOG.CATEGORIES.TECHNOLOGY]: 'Technology',
    [CONTENT_BLOG.CATEGORIES.BUSINESS]: 'Business',
    [CONTENT_BLOG.CATEGORIES.ECOMMERCE]: 'E-commerce',
    [CONTENT_BLOG.CATEGORIES.MARKETING]: 'Marketing',
    [CONTENT_BLOG.CATEGORIES.DESIGN]: 'Design',
    [CONTENT_BLOG.CATEGORIES.DEVELOPMENT]: 'Development',
    [CONTENT_BLOG.CATEGORIES.PRODUCTIVITY]: 'Productivity',
    [CONTENT_BLOG.CATEGORIES.EDUCATION]: 'Education',
    [CONTENT_BLOG.CATEGORIES.HEALTH]: 'Health',
    [CONTENT_BLOG.CATEGORIES.LIFESTYLE]: 'Lifestyle',
    [CONTENT_BLOG.CATEGORIES.FINANCE]: 'Finance',
    [CONTENT_BLOG.CATEGORIES.SCIENCE]: 'Science',
    [CONTENT_BLOG.CATEGORIES.POLITICS]: 'Politics',
    [CONTENT_BLOG.CATEGORIES.SPORTS]: 'Sports',
    [CONTENT_BLOG.CATEGORIES.ENTERTAINMENT]: 'Entertainment',
    [CONTENT_BLOG.CATEGORIES.TRAVEL]: 'Travel',
    [CONTENT_BLOG.CATEGORIES.FOOD]: 'Food',
    [CONTENT_BLOG.CATEGORIES.FASHION]: 'Fashion',
    [CONTENT_BLOG.CATEGORIES.CULTURE]: 'Culture',
    [CONTENT_BLOG.CATEGORIES.ENVIRONMENT]: 'Environment',
    [CONTENT_BLOG.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function contentBlogGetTagLabel(tag: ContentBlogTag): string {
  const labels: Record<ContentBlogTag, string> = {
    [CONTENT_BLOG.TAGS.TRENDING]: 'Trending',
    [CONTENT_BLOG.TAGS.POPULAR]: 'Popular',
    [CONTENT_BLOG.TAGS.NEW]: 'New',
    [CONTENT_BLOG.TAGS.UPDATED]: 'Updated',
    [CONTENT_BLOG.TAGS.FEATURED]: 'Featured',
    [CONTENT_BLOG.TAGS.EDITORS_PICK]: "Editor's Pick",
    [CONTENT_BLOG.TAGS.STAFF_PICK]: 'Staff Pick',
    [CONTENT_BLOG.TAGS.RECOMMENDED]: 'Recommended',
    [CONTENT_BLOG.TAGS.SPONSORED]: 'Sponsored',
    [CONTENT_BLOG.TAGS.PROMOTED]: 'Promoted',
    [CONTENT_BLOG.TAGS.EXCLUSIVE]: 'Exclusive',
    [CONTENT_BLOG.TAGS.PREMIUM]: 'Premium',
    [CONTENT_BLOG.TAGS.FREE]: 'Free',
    [CONTENT_BLOG.TAGS.BETA]: 'Beta',
    [CONTENT_BLOG.TAGS.EXPERIMENTAL]: 'Experimental',
  };
  return labels[tag] || 'Unknown Tag';
}

export function contentBlogGetFormatLabel(format: ContentBlogFormat): string {
  const labels: Record<ContentBlogFormat, string> = {
    [CONTENT_BLOG.FORMATS.STANDARD]: 'Standard',
    [CONTENT_BLOG.FORMATS.VIDEO]: 'Video',
    [CONTENT_BLOG.FORMATS.AUDIO]: 'Audio',
    [CONTENT_BLOG.FORMATS.GALLERY]: 'Gallery',
    [CONTENT_BLOG.FORMATS.LINK]: 'Link',
    [CONTENT_BLOG.FORMATS.QUOTE]: 'Quote',
    [CONTENT_BLOG.FORMATS.STATUS]: 'Status',
    [CONTENT_BLOG.FORMATS.ASIDE]: 'Aside',
    [CONTENT_BLOG.FORMATS.CHAT]: 'Chat',
    [CONTENT_BLOG.FORMATS.IMAGE]: 'Image',
    [CONTENT_BLOG.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function contentBlogGetVisibilityLabel(visibility: ContentBlogVisibility): string {
  const labels: Record<ContentBlogVisibility, string> = {
    [CONTENT_BLOG.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_BLOG.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_BLOG.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_BLOG.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_BLOG.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_BLOG.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_BLOG.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_BLOG.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentBlogGetCommentsLabel(comments: ContentBlogComments): string {
  const labels: Record<ContentBlogComments, string> = {
    [CONTENT_BLOG.COMMENTS.ENABLED]: 'Enabled',
    [CONTENT_BLOG.COMMENTS.DISABLED]: 'Disabled',
    [CONTENT_BLOG.COMMENTS.MODERATED]: 'Moderated',
    [CONTENT_BLOG.COMMENTS.APPROVED_ONLY]: 'Approved Only',
    [CONTENT_BLOG.COMMENTS.REGISTERED_ONLY]: 'Registered Only',
  };
  return labels[comments] || 'Unknown Comments Setting';
}

export function contentBlogIsPublished(status: ContentBlogStatus): boolean {
  const publishedStatuses: ContentBlogStatus[] = [
    CONTENT_BLOG.STATUSES.PUBLISHED,
    CONTENT_BLOG.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentBlogIsEditable(status: ContentBlogStatus): boolean {
  const editableStatuses: ContentBlogStatus[] = [
    CONTENT_BLOG.STATUSES.DRAFT,
    CONTENT_BLOG.STATUSES.PENDING_REVIEW,
    CONTENT_BLOG.STATUSES.IN_REVIEW,
    CONTENT_BLOG.STATUSES.REVIEWED,
    CONTENT_BLOG.STATUSES.PENDING_APPROVAL,
    CONTENT_BLOG.STATUSES.REJECTED,
    CONTENT_BLOG.STATUSES.PRIVATE,
    CONTENT_BLOG.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentBlogCalculateReadingTime(wordCount: number): number {
  const speed = CONTENT_BLOG.DEFAULTS.READING_SPEED;
  const minutes = Math.ceil(wordCount / speed);
  return Math.max(CONTENT_BLOG.READING_TIME.MIN, Math.min(minutes, CONTENT_BLOG.READING_TIME.MAX));
}

export function contentBlogGetDefaultStatus(): ContentBlogStatus {
  return CONTENT_BLOG.DEFAULTS.STATUS as ContentBlogStatus;
}

export function contentBlogGetDefaultVisibility(): ContentBlogVisibility {
  return CONTENT_BLOG.DEFAULTS.VISIBILITY as ContentBlogVisibility;
}

export function contentBlogGetDefaultComments(): ContentBlogComments {
  return CONTENT_BLOG.DEFAULTS.COMMENTS as ContentBlogComments;
}

export function contentBlogGetDefaultFormat(): ContentBlogFormat {
  return CONTENT_BLOG.DEFAULTS.FORMAT as ContentBlogFormat;
}

export function contentBlogIsValidType(type: string): type is ContentBlogType {
  return Object.values(CONTENT_BLOG.TYPES).includes(type as ContentBlogType);
}

export function contentBlogIsValidStatus(status: string): status is ContentBlogStatus {
  return Object.values(CONTENT_BLOG.STATUSES).includes(status as ContentBlogStatus);
}

export function contentBlogIsValidCategory(category: string): category is ContentBlogCategory {
  return Object.values(CONTENT_BLOG.CATEGORIES).includes(category as ContentBlogCategory);
}

export function contentBlogIsValidTag(tag: string): tag is ContentBlogTag {
  return Object.values(CONTENT_BLOG.TAGS).includes(tag as ContentBlogTag);
}

export function contentBlogIsValidFormat(format: string): format is ContentBlogFormat {
  return Object.values(CONTENT_BLOG.FORMATS).includes(format as ContentBlogFormat);
}

export function contentBlogGetMaxTags(): number {
  return CONTENT_BLOG.DEFAULTS.MAX_TAGS;
}

export function contentBlogGetMaxCategories(): number {
  return CONTENT_BLOG.DEFAULTS.MAX_CATEGORIES;
}

export function contentBlogGetExcerptLength(): number {
  return CONTENT_BLOG.DEFAULTS.EXCERPT_LENGTH;
}
