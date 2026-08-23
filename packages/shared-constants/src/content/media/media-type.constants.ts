/**
 * Media Type Constants
 * Types and classifications of media
 */

export const CONTENT_MEDIA_TYPE = {
  // Media Categories
  CATEGORIES: {
    PHOTO: 'photo',
    ILLUSTRATION: 'illustration',
    GRAPHIC: 'graphic',
    SCREENSHOT: 'screenshot',
    VIDEO: 'video',
    ANIMATION: 'animation',
    AUDIO: 'audio',
    MUSIC: 'music',
    PODCAST: 'podcast',
    DOCUMENT: 'document',
    SPREADSHEET: 'spreadsheet',
    PRESENTATION: 'presentation',
    ARCHIVE: 'archive',
    OTHER: 'other',
  } as const,

  // Media Usage
  USAGE: {
    PROFILE: 'profile',
    COVER: 'cover',
    GALLERY: 'gallery',
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    BLOG: 'blog',
    PAGE: 'page',
    TESTIMONIAL: 'testimonial',
    REVIEW: 'review',
    ATTACHMENT: 'attachment',
    THUMBNAIL: 'thumbnail',
    ICON: 'icon',
    LOGO: 'logo',
    BACKGROUND: 'background',
    HEADER: 'header',
    FOOTER: 'footer',
    EMAIL: 'email',
    SOCIAL: 'social',
    ADVERTISING: 'advertising',
    CUSTOM: 'custom',
  } as const,

  // Media Source
  SOURCE: {
    UPLOAD: 'upload',
    URL: 'url',
    EXTERNAL: 'external',
    CDN: 'cdn',
    CLOUD: 'cloud',
    LOCAL: 'local',
    GENERATED: 'generated',
    CUSTOM: 'custom',
  } as const,

  // Media License
  LICENSE: {
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
    PUBLIC_DOMAIN: 'public_domain',
    PROPRIETARY: 'proprietary',
    CUSTOM: 'custom',
  } as const,

  // Media Quality
  QUALITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    PREMIUM: 'premium',
    ORIGINAL: 'original',
  } as const,
} as const;

// Media Categories
export type ContentMediaTypeCategory =
  (typeof CONTENT_MEDIA_TYPE.CATEGORIES)[keyof typeof CONTENT_MEDIA_TYPE.CATEGORIES];

// Media Usage
export type ContentMediaTypeUsage =
  (typeof CONTENT_MEDIA_TYPE.USAGE)[keyof typeof CONTENT_MEDIA_TYPE.USAGE];

// Media Source
export type ContentMediaTypeSource =
  (typeof CONTENT_MEDIA_TYPE.SOURCE)[keyof typeof CONTENT_MEDIA_TYPE.SOURCE];

// Media License
export type ContentMediaTypeLicense =
  (typeof CONTENT_MEDIA_TYPE.LICENSE)[keyof typeof CONTENT_MEDIA_TYPE.LICENSE];

// Media Quality
export type ContentMediaTypeQuality =
  (typeof CONTENT_MEDIA_TYPE.QUALITY)[keyof typeof CONTENT_MEDIA_TYPE.QUALITY];

// Utility Functions
export function contentMediaTypeGetCategoryLabel(category: ContentMediaTypeCategory): string {
  const labels: Record<ContentMediaTypeCategory, string> = {
    [CONTENT_MEDIA_TYPE.CATEGORIES.PHOTO]: 'Photo',
    [CONTENT_MEDIA_TYPE.CATEGORIES.ILLUSTRATION]: 'Illustration',
    [CONTENT_MEDIA_TYPE.CATEGORIES.GRAPHIC]: 'Graphic',
    [CONTENT_MEDIA_TYPE.CATEGORIES.SCREENSHOT]: 'Screenshot',
    [CONTENT_MEDIA_TYPE.CATEGORIES.VIDEO]: 'Video',
    [CONTENT_MEDIA_TYPE.CATEGORIES.ANIMATION]: 'Animation',
    [CONTENT_MEDIA_TYPE.CATEGORIES.AUDIO]: 'Audio',
    [CONTENT_MEDIA_TYPE.CATEGORIES.MUSIC]: 'Music',
    [CONTENT_MEDIA_TYPE.CATEGORIES.PODCAST]: 'Podcast',
    [CONTENT_MEDIA_TYPE.CATEGORIES.DOCUMENT]: 'Document',
    [CONTENT_MEDIA_TYPE.CATEGORIES.SPREADSHEET]: 'Spreadsheet',
    [CONTENT_MEDIA_TYPE.CATEGORIES.PRESENTATION]: 'Presentation',
    [CONTENT_MEDIA_TYPE.CATEGORIES.ARCHIVE]: 'Archive',
    [CONTENT_MEDIA_TYPE.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown Category';
}

export function contentMediaTypeGetUsageLabel(usage: ContentMediaTypeUsage): string {
  const labels: Record<ContentMediaTypeUsage, string> = {
    [CONTENT_MEDIA_TYPE.USAGE.PROFILE]: 'Profile',
    [CONTENT_MEDIA_TYPE.USAGE.COVER]: 'Cover',
    [CONTENT_MEDIA_TYPE.USAGE.GALLERY]: 'Gallery',
    [CONTENT_MEDIA_TYPE.USAGE.PRODUCT]: 'Product',
    [CONTENT_MEDIA_TYPE.USAGE.CATEGORY]: 'Category',
    [CONTENT_MEDIA_TYPE.USAGE.BRAND]: 'Brand',
    [CONTENT_MEDIA_TYPE.USAGE.BLOG]: 'Blog',
    [CONTENT_MEDIA_TYPE.USAGE.PAGE]: 'Page',
    [CONTENT_MEDIA_TYPE.USAGE.TESTIMONIAL]: 'Testimonial',
    [CONTENT_MEDIA_TYPE.USAGE.REVIEW]: 'Review',
    [CONTENT_MEDIA_TYPE.USAGE.ATTACHMENT]: 'Attachment',
    [CONTENT_MEDIA_TYPE.USAGE.THUMBNAIL]: 'Thumbnail',
    [CONTENT_MEDIA_TYPE.USAGE.ICON]: 'Icon',
    [CONTENT_MEDIA_TYPE.USAGE.LOGO]: 'Logo',
    [CONTENT_MEDIA_TYPE.USAGE.BACKGROUND]: 'Background',
    [CONTENT_MEDIA_TYPE.USAGE.HEADER]: 'Header',
    [CONTENT_MEDIA_TYPE.USAGE.FOOTER]: 'Footer',
    [CONTENT_MEDIA_TYPE.USAGE.EMAIL]: 'Email',
    [CONTENT_MEDIA_TYPE.USAGE.SOCIAL]: 'Social Media',
    [CONTENT_MEDIA_TYPE.USAGE.ADVERTISING]: 'Advertising',
    [CONTENT_MEDIA_TYPE.USAGE.CUSTOM]: 'Custom',
  };
  return labels[usage] || 'Unknown Usage';
}

export function contentMediaTypeGetSourceLabel(source: ContentMediaTypeSource): string {
  const labels: Record<ContentMediaTypeSource, string> = {
    [CONTENT_MEDIA_TYPE.SOURCE.UPLOAD]: 'Upload',
    [CONTENT_MEDIA_TYPE.SOURCE.URL]: 'URL',
    [CONTENT_MEDIA_TYPE.SOURCE.EXTERNAL]: 'External Source',
    [CONTENT_MEDIA_TYPE.SOURCE.CDN]: 'CDN',
    [CONTENT_MEDIA_TYPE.SOURCE.CLOUD]: 'Cloud Storage',
    [CONTENT_MEDIA_TYPE.SOURCE.LOCAL]: 'Local Storage',
    [CONTENT_MEDIA_TYPE.SOURCE.GENERATED]: 'Generated',
    [CONTENT_MEDIA_TYPE.SOURCE.CUSTOM]: 'Custom Source',
  };
  return labels[source] || 'Unknown Source';
}

export function contentMediaTypeGetLicenseLabel(license: ContentMediaTypeLicense): string {
  const labels: Record<ContentMediaTypeLicense, string> = {
    [CONTENT_MEDIA_TYPE.LICENSE.ALL_RIGHTS_RESERVED]: 'All Rights Reserved',
    [CONTENT_MEDIA_TYPE.LICENSE.CC_BY]: 'CC BY',
    [CONTENT_MEDIA_TYPE.LICENSE.CC_BY_SA]: 'CC BY-SA',
    [CONTENT_MEDIA_TYPE.LICENSE.CC_BY_ND]: 'CC BY-ND',
    [CONTENT_MEDIA_TYPE.LICENSE.CC_BY_NC]: 'CC BY-NC',
    [CONTENT_MEDIA_TYPE.LICENSE.CC_BY_NC_SA]: 'CC BY-NC-SA',
    [CONTENT_MEDIA_TYPE.LICENSE.CC_BY_NC_ND]: 'CC BY-NC-ND',
    [CONTENT_MEDIA_TYPE.LICENSE.CC0]: 'CC0 (Public Domain)',
    [CONTENT_MEDIA_TYPE.LICENSE.MIT]: 'MIT License',
    [CONTENT_MEDIA_TYPE.LICENSE.APACHE]: 'Apache License',
    [CONTENT_MEDIA_TYPE.LICENSE.GPL]: 'GPL License',
    [CONTENT_MEDIA_TYPE.LICENSE.PUBLIC_DOMAIN]: 'Public Domain',
    [CONTENT_MEDIA_TYPE.LICENSE.PROPRIETARY]: 'Proprietary',
    [CONTENT_MEDIA_TYPE.LICENSE.CUSTOM]: 'Custom License',
  };
  return labels[license] || 'Unknown License';
}

export function contentMediaTypeGetQualityLabel(quality: ContentMediaTypeQuality): string {
  const labels: Record<ContentMediaTypeQuality, string> = {
    [CONTENT_MEDIA_TYPE.QUALITY.LOW]: 'Low',
    [CONTENT_MEDIA_TYPE.QUALITY.MEDIUM]: 'Medium',
    [CONTENT_MEDIA_TYPE.QUALITY.HIGH]: 'High',
    [CONTENT_MEDIA_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_MEDIA_TYPE.QUALITY.ORIGINAL]: 'Original',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentMediaTypeIsValidCategory(
  category: string
): category is ContentMediaTypeCategory {
  return Object.values(CONTENT_MEDIA_TYPE.CATEGORIES).includes(
    category as ContentMediaTypeCategory
  );
}

export function contentMediaTypeIsValidUsage(usage: string): usage is ContentMediaTypeUsage {
  return Object.values(CONTENT_MEDIA_TYPE.USAGE).includes(usage as ContentMediaTypeUsage);
}
