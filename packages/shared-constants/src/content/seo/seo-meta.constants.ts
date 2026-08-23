/**
 * SEO Meta Constants
 * Configuration for meta tags and metadata
 */

export const CONTENT_SEO_META = {
  // Meta Tag Types
  TYPES: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    KEYWORDS: 'keywords',
    ROBOTS: 'robots',
    VIEWPORT: 'viewport',
    CHARSET: 'charset',
    AUTHOR: 'author',
    PUBLISHER: 'publisher',
    COPYRIGHT: 'copyright',
    LANGUAGE: 'language',
    GEO: 'geo',
    CANONICAL: 'canonical',
    ALTERNATE: 'alternate',
    OG: 'og',
    TWITTER: 'twitter',
    SCHEMA: 'schema',
    CUSTOM: 'custom',
  } as const,

  // Meta Property Types
  PROPERTIES: {
    OG_TITLE: 'og:title',
    OG_DESCRIPTION: 'og:description',
    OG_IMAGE: 'og:image',
    OG_URL: 'og:url',
    OG_TYPE: 'og:type',
    OG_SITE_NAME: 'og:site_name',
    OG_LOCALE: 'og:locale',
    OG_VIDEO: 'og:video',
    OG_AUDIO: 'og:audio',
    TWITTER_CARD: 'twitter:card',
    TWITTER_SITE: 'twitter:site',
    TWITTER_CREATOR: 'twitter:creator',
    TWITTER_TITLE: 'twitter:title',
    TWITTER_DESCRIPTION: 'twitter:description',
    TWITTER_IMAGE: 'twitter:image',
    FB_APP_ID: 'fb:app_id',
    FB_PAGE_ID: 'fb:page_id',
  } as const,

  // Meta Defaults
  DEFAULTS: {
    CHARSET: 'UTF-8',
    VIEWPORT: 'width=device-width, initial-scale=1.0',
    ROBOTS: 'index, follow',
    OG_TYPE: 'website',
    TWITTER_CARD: 'summary_large_image',
  } as const,

  // Meta Limits
  LIMITS: {
    MAX_TITLE: 60,
    MAX_DESCRIPTION: 160,
    MAX_KEYWORDS: 20,
    MAX_KEYWORD_LENGTH: 50,
    MAX_URL_LENGTH: 2048,
    MAX_IMAGE_URL: 500,
  } as const,
} as const;

// Meta Tag Types
export type ContentSEOMetaType =
  (typeof CONTENT_SEO_META.TYPES)[keyof typeof CONTENT_SEO_META.TYPES];

// Meta Property Types
export type ContentSEOMetaProperty =
  (typeof CONTENT_SEO_META.PROPERTIES)[keyof typeof CONTENT_SEO_META.PROPERTIES];

// Utility Functions
export function contentSeoMetaGetTypeLabel(type: ContentSEOMetaType): string {
  const labels: Record<ContentSEOMetaType, string> = {
    [CONTENT_SEO_META.TYPES.TITLE]: 'Title Tag',
    [CONTENT_SEO_META.TYPES.DESCRIPTION]: 'Meta Description',
    [CONTENT_SEO_META.TYPES.KEYWORDS]: 'Meta Keywords',
    [CONTENT_SEO_META.TYPES.ROBOTS]: 'Robots Meta',
    [CONTENT_SEO_META.TYPES.VIEWPORT]: 'Viewport Meta',
    [CONTENT_SEO_META.TYPES.CHARSET]: 'Charset Meta',
    [CONTENT_SEO_META.TYPES.AUTHOR]: 'Author Meta',
    [CONTENT_SEO_META.TYPES.PUBLISHER]: 'Publisher Meta',
    [CONTENT_SEO_META.TYPES.COPYRIGHT]: 'Copyright Meta',
    [CONTENT_SEO_META.TYPES.LANGUAGE]: 'Language Meta',
    [CONTENT_SEO_META.TYPES.GEO]: 'Geo Meta',
    [CONTENT_SEO_META.TYPES.CANONICAL]: 'Canonical Tag',
    [CONTENT_SEO_META.TYPES.ALTERNATE]: 'Alternate Tag',
    [CONTENT_SEO_META.TYPES.OG]: 'Open Graph Meta',
    [CONTENT_SEO_META.TYPES.TWITTER]: 'Twitter Card Meta',
    [CONTENT_SEO_META.TYPES.SCHEMA]: 'Schema Markup',
    [CONTENT_SEO_META.TYPES.CUSTOM]: 'Custom Meta',
  };
  return labels[type] || 'Unknown Meta Type';
}

export function contentSeoMetaGetPropertyLabel(property: ContentSEOMetaProperty): string {
  const labels: Record<ContentSEOMetaProperty, string> = {
    [CONTENT_SEO_META.PROPERTIES.OG_TITLE]: 'OG Title',
    [CONTENT_SEO_META.PROPERTIES.OG_DESCRIPTION]: 'OG Description',
    [CONTENT_SEO_META.PROPERTIES.OG_IMAGE]: 'OG Image',
    [CONTENT_SEO_META.PROPERTIES.OG_URL]: 'OG URL',
    [CONTENT_SEO_META.PROPERTIES.OG_TYPE]: 'OG Type',
    [CONTENT_SEO_META.PROPERTIES.OG_SITE_NAME]: 'OG Site Name',
    [CONTENT_SEO_META.PROPERTIES.OG_LOCALE]: 'OG Locale',
    [CONTENT_SEO_META.PROPERTIES.OG_VIDEO]: 'OG Video',
    [CONTENT_SEO_META.PROPERTIES.OG_AUDIO]: 'OG Audio',
    [CONTENT_SEO_META.PROPERTIES.TWITTER_CARD]: 'Twitter Card',
    [CONTENT_SEO_META.PROPERTIES.TWITTER_SITE]: 'Twitter Site',
    [CONTENT_SEO_META.PROPERTIES.TWITTER_CREATOR]: 'Twitter Creator',
    [CONTENT_SEO_META.PROPERTIES.TWITTER_TITLE]: 'Twitter Title',
    [CONTENT_SEO_META.PROPERTIES.TWITTER_DESCRIPTION]: 'Twitter Description',
    [CONTENT_SEO_META.PROPERTIES.TWITTER_IMAGE]: 'Twitter Image',
    [CONTENT_SEO_META.PROPERTIES.FB_APP_ID]: 'Facebook App ID',
    [CONTENT_SEO_META.PROPERTIES.FB_PAGE_ID]: 'Facebook Page ID',
  };
  return labels[property] || 'Unknown Property';
}

export function contentSeoMetaGetDefaultCharset(): string {
  return CONTENT_SEO_META.DEFAULTS.CHARSET;
}

export function contentSeoMetaGetDefaultViewport(): string {
  return CONTENT_SEO_META.DEFAULTS.VIEWPORT;
}

export function contentSeoMetaGetDefaultRobots(): string {
  return CONTENT_SEO_META.DEFAULTS.ROBOTS;
}

export function contentSeoMetaGetDefaultOGType(): string {
  return CONTENT_SEO_META.DEFAULTS.OG_TYPE;
}

export function contentSeoMetaGetDefaultTwitterCard(): string {
  return CONTENT_SEO_META.DEFAULTS.TWITTER_CARD;
}

export function contentSeoMetaGetMaxTitle(): number {
  return CONTENT_SEO_META.LIMITS.MAX_TITLE;
}

export function contentSeoMetaGetMaxDescription(): number {
  return CONTENT_SEO_META.LIMITS.MAX_DESCRIPTION;
}

export function contentSeoMetaIsValidType(type: string): type is ContentSEOMetaType {
  return Object.values(CONTENT_SEO_META.TYPES).includes(type as ContentSEOMetaType);
}

export function contentSeoMetaIsValidProperty(
  property: string
): property is ContentSEOMetaProperty {
  return Object.values(CONTENT_SEO_META.PROPERTIES).includes(property as ContentSEOMetaProperty);
}
