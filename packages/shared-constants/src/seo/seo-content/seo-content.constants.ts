/**
 * SEO Content Constants
 * Configuration for SEO content creation, optimization, and management
 */

export const SEO_CONTENT = {
  // Content Types
  TYPES: {
    BLOG: 'blog',
    PRODUCT: 'product',
    CATEGORY: 'category',
    LANDING: 'landing',
    ABOUT: 'about',
    CONTACT: 'contact',
    FAQ: 'faq',
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    CASE_STUDY: 'case_study',
    WHITE_PAPER: 'white_paper',
    EBOOK: 'ebook',
    VIDEO: 'video',
    INFOGRAPHIC: 'infographic',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    NEWS: 'news',
    PRESS_RELEASE: 'press_release',
    TESTIMONIAL: 'testimonial',
    REVIEW: 'review',
    COMPARISON: 'comparison',
    HOW_TO: 'how_to',
    CHECKLIST: 'checklist',
    TEMPLATE: 'template',
    GLOSSARY: 'glossary',
    INTERVIEW: 'interview',
    OPINION: 'opinion',
    RESEARCH: 'research',
    STATISTICS: 'statistics',
  } as const,

  // Content Status
  STATUS: {
    DRAFT: 'draft',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    APPROVED: 'approved',
    IN_PROGRESS: 'in_progress',
    PUBLISHED: 'published',
    UPDATED: 'updated',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    SCHEDULED: 'scheduled',
    PENDING: 'pending',
    REJECTED: 'rejected',
    ON_HOLD: 'on_hold',
  } as const,

  // Content Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Content Formats
  FORMATS: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    JSON: 'json',
    XML: 'xml',
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    VIDEO_MP4: 'video_mp4',
    VIDEO_WEBM: 'video_webm',
    AUDIO_MP3: 'audio_mp3',
    IMAGE_JPEG: 'image_jpeg',
    IMAGE_PNG: 'image_png',
    IMAGE_WEBP: 'image_webp',
    IMAGE_SVG: 'image_svg',
    INFOGRAPHIC: 'infographic',
    PRESENTATION: 'presentation',
    SPREADSHEET: 'spreadsheet',
  } as const,

  // Content Length Categories
  LENGTH_CATEGORIES: {
    SHORT: 'short', // < 300 words
    MEDIUM: 'medium', // 300-800 words
    LONG: 'long', // 800-1500 words
    EXTENDED: 'extended', // 1500-2500 words
    COMPREHENSIVE: 'comprehensive', // 2500+ words
  } as const,

  // Content Quality Levels
  QUALITY_LEVELS: {
    POOR: 'poor',
    AVERAGE: 'average',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    OUTSTANDING: 'outstanding',
  } as const,

  // Content Readability Levels
  READABILITY_LEVELS: {
    VERY_EASY: 'very_easy', // Grade 5 or lower
    EASY: 'easy', // Grade 6-8
    MODERATE: 'moderate', // Grade 9-11
    DIFFICULT: 'difficult', // Grade 12-14
    VERY_DIFFICULT: 'very_difficult', // Grade 15+
  } as const,

  // Content Tone
  TONES: {
    FORMAL: 'formal',
    INFORMAL: 'informal',
    PROFESSIONAL: 'professional',
    FRIENDLY: 'friendly',
    AUTHORITATIVE: 'authoritative',
    CONVERSATIONAL: 'conversational',
    PERSUASIVE: 'persuasive',
    EDUCATIONAL: 'educational',
    ENTERTAINING: 'entertaining',
    INSPIRATIONAL: 'inspirational',
    NEUTRAL: 'neutral',
    HUMOROUS: 'humorous',
    EMPATHETIC: 'empathetic',
    URGENT: 'urgent',
    ENTHUSIASTIC: 'enthusiastic',
  } as const,

  // Content Purpose
  PURPOSES: {
    INFORM: 'inform',
    EDUCATE: 'educate',
    ENTERTAIN: 'entertain',
    PERSUADE: 'persuade',
    CONVERT: 'convert',
    ENGAGE: 'engage',
    RETAIN: 'retain',
    BRAND: 'brand',
    SELL: 'sell',
    SUPPORT: 'support',
    INSPIRE: 'inspire',
    MOTIVATE: 'motivate',
  } as const,

  // Content Platforms
  PLATFORMS: {
    WEBSITE: 'website',
    BLOG: 'blog',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    NEWSLETTER: 'newsletter',
    YOUTUBE: 'youtube',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
    LMS: 'lms',
    APP: 'app',
    MARKETPLACE: 'marketplace',
    FORUM: 'forum',
    KNOWLEDGE_BASE: 'knowledge_base',
  } as const,

  // Content Distribution Channels
  DISTRIBUTION_CHANNELS: {
    ORGANIC: 'organic',
    SOCIAL: 'social',
    EMAIL: 'email',
    PAID: 'paid',
    SYNDICATION: 'syndication',
    INFLUENCER: 'influencer',
    PARTNER: 'partner',
    COMMUNITY: 'community',
    PR: 'pr',
    MEDIA: 'media',
  } as const,

  // Content Metrics
  METRICS: {
    WORD_COUNT: 'word_count',
    READ_TIME: 'read_time',
    SCORE: 'score',
    READABILITY: 'readability',
    KEYWORD_DENSITY: 'keyword_density',
    UNIQUE_WORDS: 'unique_words',
    SENTENCE_LENGTH: 'sentence_length',
    PARAGRAPH_LENGTH: 'paragraph_length',
    HEADINGS: 'headings',
    IMAGES: 'images',
    LINKS: 'links',
    EXTERNAL_LINKS: 'external_links',
    INTERNAL_LINKS: 'internal_links',
    BACKLINKS: 'backlinks',
    SHARES: 'shares',
    COMMENTS: 'comments',
    ENGAGEMENT: 'engagement',
  } as const,

  // Content Errors
  ERROR_TYPES: {
    MISSING_TITLE: 'missing_title',
    MISSING_DESCRIPTION: 'missing_description',
    MISSING_HEADINGS: 'missing_headings',
    MISSING_IMAGES: 'missing_images',
    MISSING_LINKS: 'missing_links',
    DUPLICATE_CONTENT: 'duplicate_content',
    THIN_CONTENT: 'thin_content',
    KEYWORD_STUFFING: 'keyword_stuffing',
    POOR_READABILITY: 'poor_readability',
    SPELLING_ERRORS: 'spelling_errors',
    GRAMMAR_ERRORS: 'grammar_errors',
    BROKEN_LINKS: 'broken_links',
    MISSING_ALT_TEXT: 'missing_alt_text',
    NO_META_TAGS: 'no_meta_tags',
    OUTDATED_CONTENT: 'outdated_content',
    FACTUAL_ERRORS: 'factual_errors',
    COPYRIGHT_ISSUES: 'copyright_issues',
    FORMATTING_ISSUES: 'formatting_issues',
  } as const,
} as const;

// Content Types
export type SEOContentType = (typeof SEO_CONTENT.TYPES)[keyof typeof SEO_CONTENT.TYPES];

// Content Status
export type SEOContentStatus = (typeof SEO_CONTENT.STATUS)[keyof typeof SEO_CONTENT.STATUS];

// Content Priority
export type SEOContentPriority = (typeof SEO_CONTENT.PRIORITY)[keyof typeof SEO_CONTENT.PRIORITY];

// Content Formats
export type SEOContentFormat = (typeof SEO_CONTENT.FORMATS)[keyof typeof SEO_CONTENT.FORMATS];

// Content Length Categories
export type SEOContentLengthCategory =
  (typeof SEO_CONTENT.LENGTH_CATEGORIES)[keyof typeof SEO_CONTENT.LENGTH_CATEGORIES];

// Content Quality Levels
export type SEOContentQualityLevel =
  (typeof SEO_CONTENT.QUALITY_LEVELS)[keyof typeof SEO_CONTENT.QUALITY_LEVELS];

// Content Readability Levels
export type SEOContentReadabilityLevel =
  (typeof SEO_CONTENT.READABILITY_LEVELS)[keyof typeof SEO_CONTENT.READABILITY_LEVELS];

// Content Tone
export type SEOContentTone = (typeof SEO_CONTENT.TONES)[keyof typeof SEO_CONTENT.TONES];

// Content Purpose
export type SEOContentPurpose = (typeof SEO_CONTENT.PURPOSES)[keyof typeof SEO_CONTENT.PURPOSES];

// Content Platforms
export type SEOContentPlatform = (typeof SEO_CONTENT.PLATFORMS)[keyof typeof SEO_CONTENT.PLATFORMS];

// Content Distribution Channels
export type SEOContentDistributionChannel =
  (typeof SEO_CONTENT.DISTRIBUTION_CHANNELS)[keyof typeof SEO_CONTENT.DISTRIBUTION_CHANNELS];

// Content Metrics
export type SEOContentMetric = (typeof SEO_CONTENT.METRICS)[keyof typeof SEO_CONTENT.METRICS];

// Content Errors
export type SEOContentErrorType =
  (typeof SEO_CONTENT.ERROR_TYPES)[keyof typeof SEO_CONTENT.ERROR_TYPES];

// Utility Functions
export function getSEOContentTypeLabel(type: SEOContentType): string {
  const labels: Record<SEOContentType, string> = {
    [SEO_CONTENT.TYPES.BLOG]: 'Blog Post',
    [SEO_CONTENT.TYPES.PRODUCT]: 'Product Content',
    [SEO_CONTENT.TYPES.CATEGORY]: 'Category Content',
    [SEO_CONTENT.TYPES.LANDING]: 'Landing Page',
    [SEO_CONTENT.TYPES.ABOUT]: 'About Page',
    [SEO_CONTENT.TYPES.CONTACT]: 'Contact Page',
    [SEO_CONTENT.TYPES.FAQ]: 'FAQ Page',
    [SEO_CONTENT.TYPES.GUIDE]: 'Guide',
    [SEO_CONTENT.TYPES.TUTORIAL]: 'Tutorial',
    [SEO_CONTENT.TYPES.CASE_STUDY]: 'Case Study',
    [SEO_CONTENT.TYPES.WHITE_PAPER]: 'White Paper',
    [SEO_CONTENT.TYPES.EBOOK]: 'E-Book',
    [SEO_CONTENT.TYPES.VIDEO]: 'Video Content',
    [SEO_CONTENT.TYPES.INFOGRAPHIC]: 'Infographic',
    [SEO_CONTENT.TYPES.PODCAST]: 'Podcast',
    [SEO_CONTENT.TYPES.WEBINAR]: 'Webinar',
    [SEO_CONTENT.TYPES.NEWS]: 'News Article',
    [SEO_CONTENT.TYPES.PRESS_RELEASE]: 'Press Release',
    [SEO_CONTENT.TYPES.TESTIMONIAL]: 'Testimonial',
    [SEO_CONTENT.TYPES.REVIEW]: 'Review',
    [SEO_CONTENT.TYPES.COMPARISON]: 'Comparison',
    [SEO_CONTENT.TYPES.HOW_TO]: 'How-To',
    [SEO_CONTENT.TYPES.CHECKLIST]: 'Checklist',
    [SEO_CONTENT.TYPES.TEMPLATE]: 'Template',
    [SEO_CONTENT.TYPES.GLOSSARY]: 'Glossary',
    [SEO_CONTENT.TYPES.INTERVIEW]: 'Interview',
    [SEO_CONTENT.TYPES.OPINION]: 'Opinion',
    [SEO_CONTENT.TYPES.RESEARCH]: 'Research',
    [SEO_CONTENT.TYPES.STATISTICS]: 'Statistics',
  };
  return labels[type] || 'Unknown Content Type';
}

export function getSEOContentStatusLabel(status: SEOContentStatus): string {
  const labels: Record<SEOContentStatus, string> = {
    [SEO_CONTENT.STATUS.DRAFT]: 'Draft',
    [SEO_CONTENT.STATUS.IN_REVIEW]: 'In Review',
    [SEO_CONTENT.STATUS.REVIEWED]: 'Reviewed',
    [SEO_CONTENT.STATUS.APPROVED]: 'Approved',
    [SEO_CONTENT.STATUS.IN_PROGRESS]: 'In Progress',
    [SEO_CONTENT.STATUS.PUBLISHED]: 'Published',
    [SEO_CONTENT.STATUS.UPDATED]: 'Updated',
    [SEO_CONTENT.STATUS.ARCHIVED]: 'Archived',
    [SEO_CONTENT.STATUS.DELETED]: 'Deleted',
    [SEO_CONTENT.STATUS.SCHEDULED]: 'Scheduled',
    [SEO_CONTENT.STATUS.PENDING]: 'Pending',
    [SEO_CONTENT.STATUS.REJECTED]: 'Rejected',
    [SEO_CONTENT.STATUS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOContentPriorityLabel(priority: SEOContentPriority): string {
  const labels: Record<SEOContentPriority, string> = {
    [SEO_CONTENT.PRIORITY.CRITICAL]: 'Critical',
    [SEO_CONTENT.PRIORITY.HIGH]: 'High',
    [SEO_CONTENT.PRIORITY.MEDIUM]: 'Medium',
    [SEO_CONTENT.PRIORITY.LOW]: 'Low',
    [SEO_CONTENT.PRIORITY.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOContentFormatLabel(format: SEOContentFormat): string {
  const labels: Record<SEOContentFormat, string> = {
    [SEO_CONTENT.FORMATS.TEXT]: 'Text',
    [SEO_CONTENT.FORMATS.HTML]: 'HTML',
    [SEO_CONTENT.FORMATS.MARKDOWN]: 'Markdown',
    [SEO_CONTENT.FORMATS.JSON]: 'JSON',
    [SEO_CONTENT.FORMATS.XML]: 'XML',
    [SEO_CONTENT.FORMATS.PDF]: 'PDF',
    [SEO_CONTENT.FORMATS.DOC]: 'DOC',
    [SEO_CONTENT.FORMATS.DOCX]: 'DOCX',
    [SEO_CONTENT.FORMATS.VIDEO_MP4]: 'MP4 Video',
    [SEO_CONTENT.FORMATS.VIDEO_WEBM]: 'WebM Video',
    [SEO_CONTENT.FORMATS.AUDIO_MP3]: 'MP3 Audio',
    [SEO_CONTENT.FORMATS.IMAGE_JPEG]: 'JPEG Image',
    [SEO_CONTENT.FORMATS.IMAGE_PNG]: 'PNG Image',
    [SEO_CONTENT.FORMATS.IMAGE_WEBP]: 'WebP Image',
    [SEO_CONTENT.FORMATS.IMAGE_SVG]: 'SVG Image',
    [SEO_CONTENT.FORMATS.INFOGRAPHIC]: 'Infographic',
    [SEO_CONTENT.FORMATS.PRESENTATION]: 'Presentation',
    [SEO_CONTENT.FORMATS.SPREADSHEET]: 'Spreadsheet',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOContentLengthCategory(wordCount: number): SEOContentLengthCategory {
  if (wordCount < 300) return SEO_CONTENT.LENGTH_CATEGORIES.SHORT;
  if (wordCount < 800) return SEO_CONTENT.LENGTH_CATEGORIES.MEDIUM;
  if (wordCount < 1500) return SEO_CONTENT.LENGTH_CATEGORIES.LONG;
  if (wordCount < 2500) return SEO_CONTENT.LENGTH_CATEGORIES.EXTENDED;
  return SEO_CONTENT.LENGTH_CATEGORIES.COMPREHENSIVE;
}

export function getSEOContentQualityLabel(level: SEOContentQualityLevel): string {
  const labels: Record<SEOContentQualityLevel, string> = {
    [SEO_CONTENT.QUALITY_LEVELS.POOR]: 'Poor',
    [SEO_CONTENT.QUALITY_LEVELS.AVERAGE]: 'Average',
    [SEO_CONTENT.QUALITY_LEVELS.GOOD]: 'Good',
    [SEO_CONTENT.QUALITY_LEVELS.EXCELLENT]: 'Excellent',
    [SEO_CONTENT.QUALITY_LEVELS.OUTSTANDING]: 'Outstanding',
  };
  return labels[level] || 'Unknown Quality';
}

export function getSEOContentToneLabel(tone: SEOContentTone): string {
  const labels: Record<SEOContentTone, string> = {
    [SEO_CONTENT.TONES.FORMAL]: 'Formal',
    [SEO_CONTENT.TONES.INFORMAL]: 'Informal',
    [SEO_CONTENT.TONES.PROFESSIONAL]: 'Professional',
    [SEO_CONTENT.TONES.FRIENDLY]: 'Friendly',
    [SEO_CONTENT.TONES.AUTHORITATIVE]: 'Authoritative',
    [SEO_CONTENT.TONES.CONVERSATIONAL]: 'Conversational',
    [SEO_CONTENT.TONES.PERSUASIVE]: 'Persuasive',
    [SEO_CONTENT.TONES.EDUCATIONAL]: 'Educational',
    [SEO_CONTENT.TONES.ENTERTAINING]: 'Entertaining',
    [SEO_CONTENT.TONES.INSPIRATIONAL]: 'Inspirational',
    [SEO_CONTENT.TONES.NEUTRAL]: 'Neutral',
    [SEO_CONTENT.TONES.HUMOROUS]: 'Humorous',
    [SEO_CONTENT.TONES.EMPATHETIC]: 'Empathetic',
    [SEO_CONTENT.TONES.URGENT]: 'Urgent',
    [SEO_CONTENT.TONES.ENTHUSIASTIC]: 'Enthusiastic',
  };
  return labels[tone] || 'Unknown Tone';
}

export function getSEOContentPurposeLabel(purpose: SEOContentPurpose): string {
  const labels: Record<SEOContentPurpose, string> = {
    [SEO_CONTENT.PURPOSES.INFORM]: 'Inform',
    [SEO_CONTENT.PURPOSES.EDUCATE]: 'Educate',
    [SEO_CONTENT.PURPOSES.ENTERTAIN]: 'Entertain',
    [SEO_CONTENT.PURPOSES.PERSUADE]: 'Persuade',
    [SEO_CONTENT.PURPOSES.CONVERT]: 'Convert',
    [SEO_CONTENT.PURPOSES.ENGAGE]: 'Engage',
    [SEO_CONTENT.PURPOSES.RETAIN]: 'Retain',
    [SEO_CONTENT.PURPOSES.BRAND]: 'Brand Building',
    [SEO_CONTENT.PURPOSES.SELL]: 'Sell',
    [SEO_CONTENT.PURPOSES.SUPPORT]: 'Support',
    [SEO_CONTENT.PURPOSES.INSPIRE]: 'Inspire',
    [SEO_CONTENT.PURPOSES.MOTIVATE]: 'Motivate',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function getSEOContentPlatformLabel(platform: SEOContentPlatform): string {
  const labels: Record<SEOContentPlatform, string> = {
    [SEO_CONTENT.PLATFORMS.WEBSITE]: 'Website',
    [SEO_CONTENT.PLATFORMS.BLOG]: 'Blog',
    [SEO_CONTENT.PLATFORMS.SOCIAL_MEDIA]: 'Social Media',
    [SEO_CONTENT.PLATFORMS.EMAIL]: 'Email',
    [SEO_CONTENT.PLATFORMS.NEWSLETTER]: 'Newsletter',
    [SEO_CONTENT.PLATFORMS.YOUTUBE]: 'YouTube',
    [SEO_CONTENT.PLATFORMS.PODCAST]: 'Podcast',
    [SEO_CONTENT.PLATFORMS.WEBINAR]: 'Webinar',
    [SEO_CONTENT.PLATFORMS.LMS]: 'LMS',
    [SEO_CONTENT.PLATFORMS.APP]: 'App',
    [SEO_CONTENT.PLATFORMS.MARKETPLACE]: 'Marketplace',
    [SEO_CONTENT.PLATFORMS.FORUM]: 'Forum',
    [SEO_CONTENT.PLATFORMS.KNOWLEDGE_BASE]: 'Knowledge Base',
  };
  return labels[platform] || 'Unknown Platform';
}

export function getSEOContentErrorLabel(errorType: SEOContentErrorType): string {
  const labels: Record<SEOContentErrorType, string> = {
    [SEO_CONTENT.ERROR_TYPES.MISSING_TITLE]: 'Missing Title',
    [SEO_CONTENT.ERROR_TYPES.MISSING_DESCRIPTION]: 'Missing Description',
    [SEO_CONTENT.ERROR_TYPES.MISSING_HEADINGS]: 'Missing Headings',
    [SEO_CONTENT.ERROR_TYPES.MISSING_IMAGES]: 'Missing Images',
    [SEO_CONTENT.ERROR_TYPES.MISSING_LINKS]: 'Missing Links',
    [SEO_CONTENT.ERROR_TYPES.DUPLICATE_CONTENT]: 'Duplicate Content',
    [SEO_CONTENT.ERROR_TYPES.THIN_CONTENT]: 'Thin Content',
    [SEO_CONTENT.ERROR_TYPES.KEYWORD_STUFFING]: 'Keyword Stuffing',
    [SEO_CONTENT.ERROR_TYPES.POOR_READABILITY]: 'Poor Readability',
    [SEO_CONTENT.ERROR_TYPES.SPELLING_ERRORS]: 'Spelling Errors',
    [SEO_CONTENT.ERROR_TYPES.GRAMMAR_ERRORS]: 'Grammar Errors',
    [SEO_CONTENT.ERROR_TYPES.BROKEN_LINKS]: 'Broken Links',
    [SEO_CONTENT.ERROR_TYPES.MISSING_ALT_TEXT]: 'Missing Alt Text',
    [SEO_CONTENT.ERROR_TYPES.NO_META_TAGS]: 'No Meta Tags',
    [SEO_CONTENT.ERROR_TYPES.OUTDATED_CONTENT]: 'Outdated Content',
    [SEO_CONTENT.ERROR_TYPES.FACTUAL_ERRORS]: 'Factual Errors',
    [SEO_CONTENT.ERROR_TYPES.COPYRIGHT_ISSUES]: 'Copyright Issues',
    [SEO_CONTENT.ERROR_TYPES.FORMATTING_ISSUES]: 'Formatting Issues',
  };
  return labels[errorType] || 'Unknown Error';
}

export function isContentPublished(status: SEOContentStatus): boolean {
  return status === SEO_CONTENT.STATUS.PUBLISHED || status === SEO_CONTENT.STATUS.UPDATED;
}

export function isContentActive(status: SEOContentStatus): boolean {
  const activeStatuses: SEOContentStatus[] = [
    SEO_CONTENT.STATUS.IN_PROGRESS,
    SEO_CONTENT.STATUS.IN_REVIEW,
    SEO_CONTENT.STATUS.REVIEWED,
    SEO_CONTENT.STATUS.APPROVED,
    SEO_CONTENT.STATUS.PUBLISHED,
    SEO_CONTENT.STATUS.UPDATED,
  ];
  return activeStatuses.includes(status);
}

export function getContentStatusColor(status: SEOContentStatus): string {
  const colors: Record<SEOContentStatus, string> = {
    [SEO_CONTENT.STATUS.DRAFT]: '#9E9E9E',
    [SEO_CONTENT.STATUS.IN_REVIEW]: '#FF9800',
    [SEO_CONTENT.STATUS.REVIEWED]: '#2196F3',
    [SEO_CONTENT.STATUS.APPROVED]: '#4CAF50',
    [SEO_CONTENT.STATUS.IN_PROGRESS]: '#00BCD4',
    [SEO_CONTENT.STATUS.PUBLISHED]: '#4CAF50',
    [SEO_CONTENT.STATUS.UPDATED]: '#8BC34A',
    [SEO_CONTENT.STATUS.ARCHIVED]: '#9E9E9E',
    [SEO_CONTENT.STATUS.DELETED]: '#F44336',
    [SEO_CONTENT.STATUS.SCHEDULED]: '#FFC107',
    [SEO_CONTENT.STATUS.PENDING]: '#FF9800',
    [SEO_CONTENT.STATUS.REJECTED]: '#F44336',
    [SEO_CONTENT.STATUS.ON_HOLD]: '#FF9800',
  };
  return colors[status] || '#9E9E9E';
}
