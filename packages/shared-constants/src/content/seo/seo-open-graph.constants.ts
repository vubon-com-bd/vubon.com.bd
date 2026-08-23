/**
 * SEO Open Graph Constants
 * Configuration for Open Graph meta tags
 */

export const CONTENT_SEO_OPEN_GRAPH = {
  // OG Types
  TYPES: {
    WEBSITE: 'website',
    ARTICLE: 'article',
    BLOG: 'blog',
    PRODUCT: 'product',
    BOOK: 'book',
    MOVIE: 'movie',
    VIDEO: 'video',
    AUDIO: 'audio',
    MUSIC: 'music',
    EVENT: 'event',
    PLACE: 'place',
    PROFILE: 'profile',
    CUSTOM: 'custom',
  } as const,

  // OG Properties
  PROPERTIES: {
    TITLE: 'og:title',
    DESCRIPTION: 'og:description',
    TYPE: 'og:type',
    URL: 'og:url',
    IMAGE: 'og:image',
    IMAGE_WIDTH: 'og:image:width',
    IMAGE_HEIGHT: 'og:image:height',
    IMAGE_ALT: 'og:image:alt',
    SITE_NAME: 'og:site_name',
    LOCALE: 'og:locale',
    LOCALE_ALTERNATE: 'og:locale:alternate',
    VIDEO: 'og:video',
    VIDEO_WIDTH: 'og:video:width',
    VIDEO_HEIGHT: 'og:video:height',
    AUDIO: 'og:audio',
    DETERMINER: 'og:determiner',
  } as const,

  // OG Image Types
  IMAGE_TYPES: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    WEBP: 'image/webp',
    SVG: 'image/svg+xml',
  } as const,

  // OG Defaults
  DEFAULTS: {
    TYPE: 'website',
    IMAGE_WIDTH: 1200,
    IMAGE_HEIGHT: 630,
    LOCALE: 'en_US',
  } as const,

  // OG Limits
  LIMITS: {
    MAX_TITLE: 95,
    MAX_DESCRIPTION: 300,
    MAX_SITE_NAME: 50,
    MAX_IMAGE_SIZE_MB: 5,
    MAX_VIDEO_SIZE_MB: 10,
  } as const,
} as const;

// OG Types
export type ContentSEOOGType =
  (typeof CONTENT_SEO_OPEN_GRAPH.TYPES)[keyof typeof CONTENT_SEO_OPEN_GRAPH.TYPES];

// OG Properties
export type ContentSEOOGProperty =
  (typeof CONTENT_SEO_OPEN_GRAPH.PROPERTIES)[keyof typeof CONTENT_SEO_OPEN_GRAPH.PROPERTIES];

// OG Image Types
export type ContentSEOOGImageType =
  (typeof CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES)[keyof typeof CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES];

// Utility Functions
export function contentSeoOpenGraphGetTypeLabel(type: ContentSEOOGType): string {
  const labels: Record<ContentSEOOGType, string> = {
    [CONTENT_SEO_OPEN_GRAPH.TYPES.WEBSITE]: 'Website',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.ARTICLE]: 'Article',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.BLOG]: 'Blog Post',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.PRODUCT]: 'Product',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.BOOK]: 'Book',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.MOVIE]: 'Movie',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.VIDEO]: 'Video',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.AUDIO]: 'Audio',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.MUSIC]: 'Music',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.EVENT]: 'Event',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.PLACE]: 'Place',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.PROFILE]: 'Profile',
    [CONTENT_SEO_OPEN_GRAPH.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown OG Type';
}

export function contentSeoOpenGraphGetPropertyLabel(property: ContentSEOOGProperty): string {
  const labels: Record<ContentSEOOGProperty, string> = {
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.TITLE]: 'OG Title',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.DESCRIPTION]: 'OG Description',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.TYPE]: 'OG Type',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.URL]: 'OG URL',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.IMAGE]: 'OG Image',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.IMAGE_WIDTH]: 'OG Image Width',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.IMAGE_HEIGHT]: 'OG Image Height',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.IMAGE_ALT]: 'OG Image Alt Text',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.SITE_NAME]: 'OG Site Name',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.LOCALE]: 'OG Locale',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.LOCALE_ALTERNATE]: 'OG Alternate Locale',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.VIDEO]: 'OG Video',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.VIDEO_WIDTH]: 'OG Video Width',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.VIDEO_HEIGHT]: 'OG Video Height',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.AUDIO]: 'OG Audio',
    [CONTENT_SEO_OPEN_GRAPH.PROPERTIES.DETERMINER]: 'OG Determiner',
  };
  return labels[property] || 'Unknown Property';
}

export function contentSeoOpenGraphGetImageTypeLabel(imageType: ContentSEOOGImageType): string {
  const labels: Record<ContentSEOOGImageType, string> = {
    [CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES.JPEG]: 'JPEG',
    [CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES.PNG]: 'PNG',
    [CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES.GIF]: 'GIF',
    [CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES.WEBP]: 'WebP',
    [CONTENT_SEO_OPEN_GRAPH.IMAGE_TYPES.SVG]: 'SVG',
  };
  return labels[imageType] || 'Unknown Image Type';
}

export function contentSeoOpenGraphGetDefaultType(): ContentSEOOGType {
  return CONTENT_SEO_OPEN_GRAPH.DEFAULTS.TYPE as ContentSEOOGType;
}

export function contentSeoOpenGraphGetDefaultLocale(): string {
  return CONTENT_SEO_OPEN_GRAPH.DEFAULTS.LOCALE;
}

export function contentSeoOpenGraphGetDefaultImageWidth(): number {
  return CONTENT_SEO_OPEN_GRAPH.DEFAULTS.IMAGE_WIDTH;
}

export function contentSeoOpenGraphGetDefaultImageHeight(): number {
  return CONTENT_SEO_OPEN_GRAPH.DEFAULTS.IMAGE_HEIGHT;
}

export function contentSeoOpenGraphIsValidType(type: string): type is ContentSEOOGType {
  return Object.values(CONTENT_SEO_OPEN_GRAPH.TYPES).includes(type as ContentSEOOGType);
}

export function contentSeoOpenGraphIsValidProperty(
  property: string
): property is ContentSEOOGProperty {
  return Object.values(CONTENT_SEO_OPEN_GRAPH.PROPERTIES).includes(
    property as ContentSEOOGProperty
  );
}
