/**
 * SEO Twitter Card Constants
 * Configuration for Twitter Card meta tags and social sharing
 */

export const SEO_TWITTER_CARD = {
  // Card Types
  TYPES: {
    SUMMARY: 'summary',
    SUMMARY_LARGE_IMAGE: 'summary_large_image',
    APP: 'app',
    PLAYER: 'player',
    PRODUCT: 'product',
    GALLERY: 'gallery',
    PHOTO: 'photo',
    VIDEO: 'video',
    AUDIO: 'audio',
    ARTICLE: 'article',
    BLOG: 'blog',
    NEWS: 'news',
    EVENT: 'event',
    PLACE: 'place',
    PERSON: 'person',
    ORGANIZATION: 'organization',
  } as const,

  // Card Status
  STATUS: {
    PENDING: 'pending',
    GENERATED: 'generated',
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    PUBLISHED: 'published',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ERROR: 'error',
    ARCHIVED: 'archived',
  } as const,

  // Card Properties
  PROPERTIES: {
    // Basic
    CARD: 'twitter:card',
    SITE: 'twitter:site',
    SITE_ID: 'twitter:site:id',
    CREATOR: 'twitter:creator',
    CREATOR_ID: 'twitter:creator:id',
    TITLE: 'twitter:title',
    DESCRIPTION: 'twitter:description',
    URL: 'twitter:url',

    // Images
    IMAGE: 'twitter:image',
    IMAGE_ALT: 'twitter:image:alt',
    IMAGE_WIDTH: 'twitter:image:width',
    IMAGE_HEIGHT: 'twitter:image:height',

    // Player
    PLAYER: 'twitter:player',
    PLAYER_WIDTH: 'twitter:player:width',
    PLAYER_HEIGHT: 'twitter:player:height',
    PLAYER_STREAM: 'twitter:player:stream',
    PLAYER_STREAM_CONTENT_TYPE: 'twitter:player:stream:content_type',

    // App
    APP_ID_IPHONE: 'twitter:app:id:iphone',
    APP_ID_IPAD: 'twitter:app:id:ipad',
    APP_ID_GOOGLEPLAY: 'twitter:app:id:googleplay',
    APP_URL_IPHONE: 'twitter:app:url:iphone',
    APP_URL_IPAD: 'twitter:app:url:ipad',
    APP_URL_GOOGLEPLAY: 'twitter:app:url:googleplay',
    APP_NAME_IPHONE: 'twitter:app:name:iphone',
    APP_NAME_IPAD: 'twitter:app:name:ipad',
    APP_NAME_GOOGLEPLAY: 'twitter:app:name:googleplay',

    // Product
    PRODUCT_PRICE: 'twitter:product:price',
    PRODUCT_CURRENCY: 'twitter:product:currency',
    PRODUCT_BRAND: 'twitter:product:brand',
    PRODUCT_CATEGORY: 'twitter:product:category',
    PRODUCT_AVAILABILITY: 'twitter:product:availability',

    // Data
    DATA1: 'twitter:data1',
    DATA2: 'twitter:data2',
    LABEL1: 'twitter:label1',
    LABEL2: 'twitter:label2',
  } as const,

  // Card Image Sizes
  IMAGE_SIZES: {
    // Summary
    SUMMARY_WIDTH: 120,
    SUMMARY_HEIGHT: 120,

    // Summary Large Image
    SUMMARY_LARGE_WIDTH: 1200,
    SUMMARY_LARGE_HEIGHT: 628,
    SUMMARY_LARGE_MIN_WIDTH: 300,
    SUMMARY_LARGE_MIN_HEIGHT: 157,
    SUMMARY_LARGE_MAX_WIDTH: 4096,
    SUMMARY_LARGE_MAX_HEIGHT: 4096,
    SUMMARY_LARGE_ASPECT_RATIO: 1.91,
  } as const,

  // Card Validations
  VALIDATIONS: {
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // Card Platforms
  PLATFORMS: {
    TWITTER: 'twitter',
    X: 'x',
    TWITTER_APP: 'twitter_app',
    X_APP: 'x_app',
  } as const,

  // Card Errors
  ERROR_TYPES: {
    MISSING_CARD_TYPE: 'missing_card_type',
    MISSING_TITLE: 'missing_title',
    MISSING_DESCRIPTION: 'missing_description',
    MISSING_IMAGE: 'missing_image',
    MISSING_SITE: 'missing_site',
    IMAGE_TOO_SMALL: 'image_too_small',
    IMAGE_WRONG_RATIO: 'image_wrong_ratio',
    INVALID_URL: 'invalid_url',
    INVALID_PROPERTY: 'invalid_property',
    DUPLICATE_PROPERTY: 'duplicate_property',
    MISSING_APP_ID: 'missing_app_id',
    MISSING_PLAYER_URL: 'missing_player_url',
  } as const,

  // Card Metrics
  METRICS: {
    TOTAL_PROPERTIES: 'total_properties',
    VALID_PROPERTIES: 'valid_properties',
    INVALID_PROPERTIES: 'invalid_properties',
    WARNINGS: 'warnings',
    ERRORS: 'errors',
    VALIDITY_SCORE: 'validity_score',
    COMPLETENESS_SCORE: 'completeness_score',
  } as const,
} as const;

// Card Types
export type SEOTwitterCardType =
  (typeof SEO_TWITTER_CARD.TYPES)[keyof typeof SEO_TWITTER_CARD.TYPES];

// Card Status
export type SEOTwitterCardStatus =
  (typeof SEO_TWITTER_CARD.STATUS)[keyof typeof SEO_TWITTER_CARD.STATUS];

// Card Properties
export type SEOTwitterCardProperty =
  (typeof SEO_TWITTER_CARD.PROPERTIES)[keyof typeof SEO_TWITTER_CARD.PROPERTIES];

// Card Image Sizes
export type SEOTwitterCardImageSize =
  (typeof SEO_TWITTER_CARD.IMAGE_SIZES)[keyof typeof SEO_TWITTER_CARD.IMAGE_SIZES];

// Card Validations
export type SEOTwitterCardValidation =
  (typeof SEO_TWITTER_CARD.VALIDATIONS)[keyof typeof SEO_TWITTER_CARD.VALIDATIONS];

// Card Platforms
export type SEOTwitterCardPlatform =
  (typeof SEO_TWITTER_CARD.PLATFORMS)[keyof typeof SEO_TWITTER_CARD.PLATFORMS];

// Card Errors
export type SEOTwitterCardErrorType =
  (typeof SEO_TWITTER_CARD.ERROR_TYPES)[keyof typeof SEO_TWITTER_CARD.ERROR_TYPES];

// Card Metrics
export type SEOTwitterCardMetric =
  (typeof SEO_TWITTER_CARD.METRICS)[keyof typeof SEO_TWITTER_CARD.METRICS];

// Utility Functions
export function getSEOTwitterCardTypeLabel(type: SEOTwitterCardType): string {
  const labels: Record<SEOTwitterCardType, string> = {
    [SEO_TWITTER_CARD.TYPES.SUMMARY]: 'Summary Card',
    [SEO_TWITTER_CARD.TYPES.SUMMARY_LARGE_IMAGE]: 'Summary Card with Large Image',
    [SEO_TWITTER_CARD.TYPES.APP]: 'App Card',
    [SEO_TWITTER_CARD.TYPES.PLAYER]: 'Player Card',
    [SEO_TWITTER_CARD.TYPES.PRODUCT]: 'Product Card',
    [SEO_TWITTER_CARD.TYPES.GALLERY]: 'Gallery Card',
    [SEO_TWITTER_CARD.TYPES.PHOTO]: 'Photo Card',
    [SEO_TWITTER_CARD.TYPES.VIDEO]: 'Video Card',
    [SEO_TWITTER_CARD.TYPES.AUDIO]: 'Audio Card',
    [SEO_TWITTER_CARD.TYPES.ARTICLE]: 'Article Card',
    [SEO_TWITTER_CARD.TYPES.BLOG]: 'Blog Card',
    [SEO_TWITTER_CARD.TYPES.NEWS]: 'News Card',
    [SEO_TWITTER_CARD.TYPES.EVENT]: 'Event Card',
    [SEO_TWITTER_CARD.TYPES.PLACE]: 'Place Card',
    [SEO_TWITTER_CARD.TYPES.PERSON]: 'Person Card',
    [SEO_TWITTER_CARD.TYPES.ORGANIZATION]: 'Organization Card',
  };
  return labels[type] || 'Unknown Twitter Card Type';
}

export function getSEOTwitterCardStatusLabel(status: SEOTwitterCardStatus): string {
  const labels: Record<SEOTwitterCardStatus, string> = {
    [SEO_TWITTER_CARD.STATUS.PENDING]: 'Pending',
    [SEO_TWITTER_CARD.STATUS.GENERATED]: 'Generated',
    [SEO_TWITTER_CARD.STATUS.VALID]: 'Valid',
    [SEO_TWITTER_CARD.STATUS.INVALID]: 'Invalid',
    [SEO_TWITTER_CARD.STATUS.PARTIAL]: 'Partial',
    [SEO_TWITTER_CARD.STATUS.PUBLISHED]: 'Published',
    [SEO_TWITTER_CARD.STATUS.UPDATING]: 'Updating',
    [SEO_TWITTER_CARD.STATUS.OUTDATED]: 'Outdated',
    [SEO_TWITTER_CARD.STATUS.ERROR]: 'Error',
    [SEO_TWITTER_CARD.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOTwitterCardPropertyLabel(property: SEOTwitterCardProperty): string {
  const labels: Record<SEOTwitterCardProperty, string> = {
    // Basic
    [SEO_TWITTER_CARD.PROPERTIES.CARD]: 'Card Type',
    [SEO_TWITTER_CARD.PROPERTIES.SITE]: 'Site Account',
    [SEO_TWITTER_CARD.PROPERTIES.SITE_ID]: 'Site ID',
    [SEO_TWITTER_CARD.PROPERTIES.CREATOR]: 'Creator Account',
    [SEO_TWITTER_CARD.PROPERTIES.CREATOR_ID]: 'Creator ID',
    [SEO_TWITTER_CARD.PROPERTIES.TITLE]: 'Title',
    [SEO_TWITTER_CARD.PROPERTIES.DESCRIPTION]: 'Description',
    [SEO_TWITTER_CARD.PROPERTIES.URL]: 'URL',

    // Images
    [SEO_TWITTER_CARD.PROPERTIES.IMAGE]: 'Image',
    [SEO_TWITTER_CARD.PROPERTIES.IMAGE_ALT]: 'Image Alt Text',
    [SEO_TWITTER_CARD.PROPERTIES.IMAGE_WIDTH]: 'Image Width',
    [SEO_TWITTER_CARD.PROPERTIES.IMAGE_HEIGHT]: 'Image Height',

    // Player
    [SEO_TWITTER_CARD.PROPERTIES.PLAYER]: 'Player URL',
    [SEO_TWITTER_CARD.PROPERTIES.PLAYER_WIDTH]: 'Player Width',
    [SEO_TWITTER_CARD.PROPERTIES.PLAYER_HEIGHT]: 'Player Height',
    [SEO_TWITTER_CARD.PROPERTIES.PLAYER_STREAM]: 'Player Stream',
    [SEO_TWITTER_CARD.PROPERTIES.PLAYER_STREAM_CONTENT_TYPE]: 'Stream Content Type',

    // App
    [SEO_TWITTER_CARD.PROPERTIES.APP_ID_IPHONE]: 'iPhone App ID',
    [SEO_TWITTER_CARD.PROPERTIES.APP_ID_IPAD]: 'iPad App ID',
    [SEO_TWITTER_CARD.PROPERTIES.APP_ID_GOOGLEPLAY]: 'Google Play App ID',
    [SEO_TWITTER_CARD.PROPERTIES.APP_URL_IPHONE]: 'iPhone App URL',
    [SEO_TWITTER_CARD.PROPERTIES.APP_URL_IPAD]: 'iPad App URL',
    [SEO_TWITTER_CARD.PROPERTIES.APP_URL_GOOGLEPLAY]: 'Google Play App URL',
    [SEO_TWITTER_CARD.PROPERTIES.APP_NAME_IPHONE]: 'iPhone App Name',
    [SEO_TWITTER_CARD.PROPERTIES.APP_NAME_IPAD]: 'iPad App Name',
    [SEO_TWITTER_CARD.PROPERTIES.APP_NAME_GOOGLEPLAY]: 'Google Play App Name',

    // Product
    [SEO_TWITTER_CARD.PROPERTIES.PRODUCT_PRICE]: 'Product Price',
    [SEO_TWITTER_CARD.PROPERTIES.PRODUCT_CURRENCY]: 'Product Currency',
    [SEO_TWITTER_CARD.PROPERTIES.PRODUCT_BRAND]: 'Product Brand',
    [SEO_TWITTER_CARD.PROPERTIES.PRODUCT_CATEGORY]: 'Product Category',
    [SEO_TWITTER_CARD.PROPERTIES.PRODUCT_AVAILABILITY]: 'Product Availability',

    // Data
    [SEO_TWITTER_CARD.PROPERTIES.DATA1]: 'Data 1',
    [SEO_TWITTER_CARD.PROPERTIES.DATA2]: 'Data 2',
    [SEO_TWITTER_CARD.PROPERTIES.LABEL1]: 'Label 1',
    [SEO_TWITTER_CARD.PROPERTIES.LABEL2]: 'Label 2',
  };
  return labels[property] || 'Unknown Property';
}

export function getSEOTwitterCardPlatformLabel(platform: SEOTwitterCardPlatform): string {
  const labels: Record<SEOTwitterCardPlatform, string> = {
    [SEO_TWITTER_CARD.PLATFORMS.TWITTER]: 'Twitter',
    [SEO_TWITTER_CARD.PLATFORMS.X]: 'X',
    [SEO_TWITTER_CARD.PLATFORMS.TWITTER_APP]: 'Twitter App',
    [SEO_TWITTER_CARD.PLATFORMS.X_APP]: 'X App',
  };
  return labels[platform] || 'Unknown Platform';
}

export function getSEOTwitterCardErrorLabel(errorType: SEOTwitterCardErrorType): string {
  const labels: Record<SEOTwitterCardErrorType, string> = {
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_CARD_TYPE]: 'Missing Card Type',
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_TITLE]: 'Missing Title',
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_DESCRIPTION]: 'Missing Description',
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_IMAGE]: 'Missing Image',
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_SITE]: 'Missing Site Account',
    [SEO_TWITTER_CARD.ERROR_TYPES.IMAGE_TOO_SMALL]: 'Image Too Small',
    [SEO_TWITTER_CARD.ERROR_TYPES.IMAGE_WRONG_RATIO]: 'Wrong Image Aspect Ratio',
    [SEO_TWITTER_CARD.ERROR_TYPES.INVALID_URL]: 'Invalid URL',
    [SEO_TWITTER_CARD.ERROR_TYPES.INVALID_PROPERTY]: 'Invalid Property',
    [SEO_TWITTER_CARD.ERROR_TYPES.DUPLICATE_PROPERTY]: 'Duplicate Property',
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_APP_ID]: 'Missing App ID',
    [SEO_TWITTER_CARD.ERROR_TYPES.MISSING_PLAYER_URL]: 'Missing Player URL',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getTwitterCardStatusColor(status: SEOTwitterCardStatus): string {
  const colors: Record<SEOTwitterCardStatus, string> = {
    [SEO_TWITTER_CARD.STATUS.PENDING]: '#9E9E9E',
    [SEO_TWITTER_CARD.STATUS.GENERATED]: '#2196F3',
    [SEO_TWITTER_CARD.STATUS.VALID]: '#4CAF50',
    [SEO_TWITTER_CARD.STATUS.INVALID]: '#F44336',
    [SEO_TWITTER_CARD.STATUS.PARTIAL]: '#FF9800',
    [SEO_TWITTER_CARD.STATUS.PUBLISHED]: '#4CAF50',
    [SEO_TWITTER_CARD.STATUS.UPDATING]: '#FFC107',
    [SEO_TWITTER_CARD.STATUS.OUTDATED]: '#FF9800',
    [SEO_TWITTER_CARD.STATUS.ERROR]: '#D32F2F',
    [SEO_TWITTER_CARD.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isTwitterCardValid(status: SEOTwitterCardStatus): boolean {
  const validStatuses: SEOTwitterCardStatus[] = [
    SEO_TWITTER_CARD.STATUS.VALID,
    SEO_TWITTER_CARD.STATUS.PUBLISHED,
  ];
  return validStatuses.includes(status);
}

export function isTwitterCardActive(status: SEOTwitterCardStatus): boolean {
  const activeStatuses: SEOTwitterCardStatus[] = [
    SEO_TWITTER_CARD.STATUS.GENERATED,
    SEO_TWITTER_CARD.STATUS.VALID,
    SEO_TWITTER_CARD.STATUS.PUBLISHED,
    SEO_TWITTER_CARD.STATUS.UPDATING,
  ];
  return activeStatuses.includes(status);
}

export function getTwitterCardImageRecommendation(type: SEOTwitterCardType): string {
  if (type === SEO_TWITTER_CARD.TYPES.SUMMARY) {
    return `Recommended size: ${SEO_TWITTER_CARD.IMAGE_SIZES.SUMMARY_WIDTH}x${SEO_TWITTER_CARD.IMAGE_SIZES.SUMMARY_HEIGHT}px`;
  }
  if (type === SEO_TWITTER_CARD.TYPES.SUMMARY_LARGE_IMAGE) {
    return `Recommended size: ${SEO_TWITTER_CARD.IMAGE_SIZES.SUMMARY_LARGE_WIDTH}x${SEO_TWITTER_CARD.IMAGE_SIZES.SUMMARY_LARGE_HEIGHT}px (${SEO_TWITTER_CARD.IMAGE_SIZES.SUMMARY_LARGE_ASPECT_RATIO}:1 ratio)`;
  }
  return 'Refer to Twitter Card documentation for image size recommendations.';
}
