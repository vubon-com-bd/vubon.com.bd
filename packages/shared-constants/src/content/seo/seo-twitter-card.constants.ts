/**
 * SEO Twitter Card Constants
 * Configuration for Twitter Card meta tags
 */

export const CONTENT_SEO_TWITTER_CARD = {
  // Twitter Card Types
  TYPES: {
    SUMMARY: 'summary',
    SUMMARY_LARGE_IMAGE: 'summary_large_image',
    APP: 'app',
    PLAYER: 'player',
    GALLERY: 'gallery',
    PRODUCT: 'product',
    PHOTO: 'photo',
    CUSTOM: 'custom',
  } as const,

  // Twitter Card Properties
  PROPERTIES: {
    CARD: 'twitter:card',
    SITE: 'twitter:site',
    CREATOR: 'twitter:creator',
    TITLE: 'twitter:title',
    DESCRIPTION: 'twitter:description',
    IMAGE: 'twitter:image',
    IMAGE_ALT: 'twitter:image:alt',
    URL: 'twitter:url',
    LABEL1: 'twitter:label1',
    DATA1: 'twitter:data1',
    LABEL2: 'twitter:label2',
    DATA2: 'twitter:data2',
    APP_ID: 'twitter:app:id',
    APP_NAME: 'twitter:app:name',
    APP_URL: 'twitter:app:url',
    PLAYER: 'twitter:player',
    PLAYER_WIDTH: 'twitter:player:width',
    PLAYER_HEIGHT: 'twitter:player:height',
    PLAYER_STREAM: 'twitter:player:stream',
  } as const,

  // Twitter Card Image Types
  IMAGE_TYPES: {
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
    WEBP: 'image/webp',
  } as const,

  // Twitter Card Defaults
  DEFAULTS: {
    CARD: 'summary_large_image',
    IMAGE_WIDTH: 1200,
    IMAGE_HEIGHT: 628,
  } as const,

  // Twitter Card Limits
  LIMITS: {
    MAX_TITLE: 70,
    MAX_DESCRIPTION: 200,
    MAX_SITE_NAME: 15,
    MAX_CREATOR_NAME: 15,
    MAX_IMAGE_SIZE_MB: 5,
  } as const,
} as const;

// Twitter Card Types
export type ContentSEOTwitterCardType =
  (typeof CONTENT_SEO_TWITTER_CARD.TYPES)[keyof typeof CONTENT_SEO_TWITTER_CARD.TYPES];

// Twitter Card Properties
export type ContentSEOTwitterCardProperty =
  (typeof CONTENT_SEO_TWITTER_CARD.PROPERTIES)[keyof typeof CONTENT_SEO_TWITTER_CARD.PROPERTIES];

// Twitter Card Image Types
export type ContentSEOTwitterCardImageType =
  (typeof CONTENT_SEO_TWITTER_CARD.IMAGE_TYPES)[keyof typeof CONTENT_SEO_TWITTER_CARD.IMAGE_TYPES];

// Utility Functions
export function contentSeoTwitterCardGetTypeLabel(type: ContentSEOTwitterCardType): string {
  const labels: Record<ContentSEOTwitterCardType, string> = {
    [CONTENT_SEO_TWITTER_CARD.TYPES.SUMMARY]: 'Summary Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.SUMMARY_LARGE_IMAGE]: 'Summary Large Image Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.APP]: 'App Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.PLAYER]: 'Player Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.GALLERY]: 'Gallery Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.PRODUCT]: 'Product Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.PHOTO]: 'Photo Card',
    [CONTENT_SEO_TWITTER_CARD.TYPES.CUSTOM]: 'Custom Card',
  };
  return labels[type] || 'Unknown Twitter Card Type';
}

export function contentSeoTwitterCardGetPropertyLabel(
  property: ContentSEOTwitterCardProperty
): string {
  const labels: Record<ContentSEOTwitterCardProperty, string> = {
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.CARD]: 'Twitter Card',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.SITE]: 'Twitter Site',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.CREATOR]: 'Twitter Creator',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.TITLE]: 'Twitter Title',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.DESCRIPTION]: 'Twitter Description',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.IMAGE]: 'Twitter Image',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.IMAGE_ALT]: 'Twitter Image Alt Text',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.URL]: 'Twitter URL',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.LABEL1]: 'Twitter Label 1',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.DATA1]: 'Twitter Data 1',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.LABEL2]: 'Twitter Label 2',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.DATA2]: 'Twitter Data 2',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.APP_ID]: 'Twitter App ID',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.APP_NAME]: 'Twitter App Name',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.APP_URL]: 'Twitter App URL',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.PLAYER]: 'Twitter Player URL',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.PLAYER_WIDTH]: 'Twitter Player Width',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.PLAYER_HEIGHT]: 'Twitter Player Height',
    [CONTENT_SEO_TWITTER_CARD.PROPERTIES.PLAYER_STREAM]: 'Twitter Player Stream',
  };
  return labels[property] || 'Unknown Property';
}

export function contentSeoTwitterCardGetImageTypeLabel(
  imageType: ContentSEOTwitterCardImageType
): string {
  const labels: Record<ContentSEOTwitterCardImageType, string> = {
    [CONTENT_SEO_TWITTER_CARD.IMAGE_TYPES.JPEG]: 'JPEG',
    [CONTENT_SEO_TWITTER_CARD.IMAGE_TYPES.PNG]: 'PNG',
    [CONTENT_SEO_TWITTER_CARD.IMAGE_TYPES.GIF]: 'GIF',
    [CONTENT_SEO_TWITTER_CARD.IMAGE_TYPES.WEBP]: 'WebP',
  };
  return labels[imageType] || 'Unknown Image Type';
}

export function contentSeoTwitterCardGetDefaultCard(): ContentSEOTwitterCardType {
  return CONTENT_SEO_TWITTER_CARD.DEFAULTS.CARD as ContentSEOTwitterCardType;
}

export function contentSeoTwitterCardGetDefaultImageWidth(): number {
  return CONTENT_SEO_TWITTER_CARD.DEFAULTS.IMAGE_WIDTH;
}

export function contentSeoTwitterCardGetDefaultImageHeight(): number {
  return CONTENT_SEO_TWITTER_CARD.DEFAULTS.IMAGE_HEIGHT;
}

export function contentSeoTwitterCardIsValidType(type: string): type is ContentSEOTwitterCardType {
  return Object.values(CONTENT_SEO_TWITTER_CARD.TYPES).includes(type as ContentSEOTwitterCardType);
}

export function contentSeoTwitterCardIsValidProperty(
  property: string
): property is ContentSEOTwitterCardProperty {
  return Object.values(CONTENT_SEO_TWITTER_CARD.PROPERTIES).includes(
    property as ContentSEOTwitterCardProperty
  );
}
