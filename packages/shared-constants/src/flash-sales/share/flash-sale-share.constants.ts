/**
 * Flash Sale Share Constants
 * Configuration for flash sale sharing and social media
 */

export const FLASH_SALE_SHARE = {
  // Share Types
  TYPES: {
    SOCIAL: 'social',
    EMAIL: 'email',
    SMS: 'sms',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    LINK: 'link',
    QR_CODE: 'qr_code',
    EMBED: 'embed',
    WIDGET: 'widget',
    CUSTOM: 'custom',
  },

  // Social Platforms
  PLATFORMS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    PINTEREST: 'pinterest',
    TIKTOK: 'tiktok',
    SNAPCHAT: 'snapchat',
    REDDIT: 'reddit',
    TELEGRAM: 'telegram',
    WHATSAPP: 'whatsapp',
    VIBER: 'viber',
    MESSENGER: 'messenger',
    WECHAT: 'wechat',
    LINE: 'line',
  },

  // Share Categories
  CATEGORIES: {
    PRODUCT: 'product',
    DEAL: 'deal',
    FLASH_SALE: 'flash_sale',
    BUNDLE: 'bundle',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    WISHLIST: 'wishlist',
    REFERRAL: 'referral',
  },

  // Share Content
  CONTENT: {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    LINK: 'link',
    STORY: 'story',
    REEL: 'reel',
    POST: 'post',
    MESSAGE: 'message',
    EMAIL: 'email',
    QR_CODE: 'qr_code',
  },

  // Share Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    FRIENDS: 'friends',
    PRIVATE: 'private',
    CUSTOM: 'custom',
  },

  // Share Analytics
  ANALYTICS: {
    VIEWS: 'views',
    CLICKS: 'clicks',
    SHARES: 'shares',
    REPOSTS: 'reposts',
    LIKES: 'likes',
    COMMENTS: 'comments',
    REACTIONS: 'reactions',
    CONVERSIONS: 'conversions',
    REVENUE: 'revenue',
  },

  // Share Defaults
  DEFAULTS: {
    MAX_SHARES_PER_DAY: 10,
    MAX_SHARES_PER_USER: 50,
    MESSAGE_LENGTH: 500,
    IMAGE_SIZE_MB: 5,
    VIDEO_SIZE_MB: 50,
    QR_CODE_SIZE: 200,
    EXPIRY_DAYS: 7,
    TRACKING_ENABLED: true,
    ANALYTICS_ENABLED: true,
  },

  // Share Limits
  LIMITS: {
    MAX_SHARES_PER_DAY: 100,
    MAX_SHARES_PER_USER: 500,
    MAX_MESSAGE_LENGTH: 2000,
    MAX_IMAGE_SIZE_MB: 10,
    MAX_VIDEO_SIZE_MB: 100,
    MAX_QR_CODE_SIZE: 500,
    MAX_EXPIRY_DAYS: 30,
    MAX_TRACKING_EVENTS: 10000,
  },

  // Share Validation
  VALIDATION: {
    MIN_MESSAGE_LENGTH: 1,
    MAX_MESSAGE_LENGTH: 2000,
    MIN_SHARE_TEXT: 3,
    MAX_SHARE_TEXT: 500,
    MIN_QR_CODE_SIZE: 50,
    MAX_QR_CODE_SIZE: 500,
  },
} as const;

// Share Types
export type FlashSaleShareType =
  (typeof FLASH_SALE_SHARE.TYPES)[keyof typeof FLASH_SALE_SHARE.TYPES];

// Social Platforms
export type FlashSaleSharePlatform =
  (typeof FLASH_SALE_SHARE.PLATFORMS)[keyof typeof FLASH_SALE_SHARE.PLATFORMS];

// Share Categories
export type FlashSaleShareCategory =
  (typeof FLASH_SALE_SHARE.CATEGORIES)[keyof typeof FLASH_SALE_SHARE.CATEGORIES];

// Share Content
export type FlashSaleShareContent =
  (typeof FLASH_SALE_SHARE.CONTENT)[keyof typeof FLASH_SALE_SHARE.CONTENT];

// Share Visibility
export type FlashSaleShareVisibility =
  (typeof FLASH_SALE_SHARE.VISIBILITY)[keyof typeof FLASH_SALE_SHARE.VISIBILITY];

// Share Analytics
export type FlashSaleShareAnalytic =
  (typeof FLASH_SALE_SHARE.ANALYTICS)[keyof typeof FLASH_SALE_SHARE.ANALYTICS];

// Utility Functions
export function flashsalesShareGetTypeLabel(type: FlashSaleShareType): string {
  const labels: Record<FlashSaleShareType, string> = {
    [FLASH_SALE_SHARE.TYPES.SOCIAL]: 'Social Media Share',
    [FLASH_SALE_SHARE.TYPES.EMAIL]: 'Email Share',
    [FLASH_SALE_SHARE.TYPES.SMS]: 'SMS Share',
    [FLASH_SALE_SHARE.TYPES.WHATSAPP]: 'WhatsApp Share',
    [FLASH_SALE_SHARE.TYPES.TELEGRAM]: 'Telegram Share',
    [FLASH_SALE_SHARE.TYPES.LINK]: 'Link Share',
    [FLASH_SALE_SHARE.TYPES.QR_CODE]: 'QR Code Share',
    [FLASH_SALE_SHARE.TYPES.EMBED]: 'Embed Share',
    [FLASH_SALE_SHARE.TYPES.WIDGET]: 'Widget Share',
    [FLASH_SALE_SHARE.TYPES.CUSTOM]: 'Custom Share',
  };
  return labels[type] || 'Unknown Share Type';
}

export function flashsalesShareGetPlatformLabel(platform: FlashSaleSharePlatform): string {
  const labels: Record<FlashSaleSharePlatform, string> = {
    [FLASH_SALE_SHARE.PLATFORMS.FACEBOOK]: 'Facebook',
    [FLASH_SALE_SHARE.PLATFORMS.TWITTER]: 'Twitter',
    [FLASH_SALE_SHARE.PLATFORMS.INSTAGRAM]: 'Instagram',
    [FLASH_SALE_SHARE.PLATFORMS.LINKEDIN]: 'LinkedIn',
    [FLASH_SALE_SHARE.PLATFORMS.YOUTUBE]: 'YouTube',
    [FLASH_SALE_SHARE.PLATFORMS.PINTEREST]: 'Pinterest',
    [FLASH_SALE_SHARE.PLATFORMS.TIKTOK]: 'TikTok',
    [FLASH_SALE_SHARE.PLATFORMS.SNAPCHAT]: 'Snapchat',
    [FLASH_SALE_SHARE.PLATFORMS.REDDIT]: 'Reddit',
    [FLASH_SALE_SHARE.PLATFORMS.TELEGRAM]: 'Telegram',
    [FLASH_SALE_SHARE.PLATFORMS.WHATSAPP]: 'WhatsApp',
    [FLASH_SALE_SHARE.PLATFORMS.VIBER]: 'Viber',
    [FLASH_SALE_SHARE.PLATFORMS.MESSENGER]: 'Messenger',
    [FLASH_SALE_SHARE.PLATFORMS.WECHAT]: 'WeChat',
    [FLASH_SALE_SHARE.PLATFORMS.LINE]: 'Line',
  };
  return labels[platform] || 'Unknown Platform';
}

export function flashsalesShareGetCategoryLabel(category: FlashSaleShareCategory): string {
  const labels: Record<FlashSaleShareCategory, string> = {
    [FLASH_SALE_SHARE.CATEGORIES.PRODUCT]: 'Product Share',
    [FLASH_SALE_SHARE.CATEGORIES.DEAL]: 'Deal Share',
    [FLASH_SALE_SHARE.CATEGORIES.FLASH_SALE]: 'Flash Sale Share',
    [FLASH_SALE_SHARE.CATEGORIES.BUNDLE]: 'Bundle Share',
    [FLASH_SALE_SHARE.CATEGORIES.COUPON]: 'Coupon Share',
    [FLASH_SALE_SHARE.CATEGORIES.VOUCHER]: 'Voucher Share',
    [FLASH_SALE_SHARE.CATEGORIES.WISHLIST]: 'Wishlist Share',
    [FLASH_SALE_SHARE.CATEGORIES.REFERRAL]: 'Referral Share',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesShareGetContentLabel(content: FlashSaleShareContent): string {
  const labels: Record<FlashSaleShareContent, string> = {
    [FLASH_SALE_SHARE.CONTENT.TEXT]: 'Text Content',
    [FLASH_SALE_SHARE.CONTENT.IMAGE]: 'Image Content',
    [FLASH_SALE_SHARE.CONTENT.VIDEO]: 'Video Content',
    [FLASH_SALE_SHARE.CONTENT.LINK]: 'Link Content',
    [FLASH_SALE_SHARE.CONTENT.STORY]: 'Story Content',
    [FLASH_SALE_SHARE.CONTENT.REEL]: 'Reel Content',
    [FLASH_SALE_SHARE.CONTENT.POST]: 'Post Content',
    [FLASH_SALE_SHARE.CONTENT.MESSAGE]: 'Message Content',
    [FLASH_SALE_SHARE.CONTENT.EMAIL]: 'Email Content',
    [FLASH_SALE_SHARE.CONTENT.QR_CODE]: 'QR Code Content',
  };
  return labels[content] || 'Unknown Content';
}

export function flashsalesShareGetVisibilityLabel(visibility: FlashSaleShareVisibility): string {
  const labels: Record<FlashSaleShareVisibility, string> = {
    [FLASH_SALE_SHARE.VISIBILITY.PUBLIC]: 'Public',
    [FLASH_SALE_SHARE.VISIBILITY.FRIENDS]: 'Friends Only',
    [FLASH_SALE_SHARE.VISIBILITY.PRIVATE]: 'Private',
    [FLASH_SALE_SHARE.VISIBILITY.CUSTOM]: 'Custom Visibility',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function flashsalesShareGetAnalyticLabel(analytic: FlashSaleShareAnalytic): string {
  const labels: Record<FlashSaleShareAnalytic, string> = {
    [FLASH_SALE_SHARE.ANALYTICS.VIEWS]: 'Views',
    [FLASH_SALE_SHARE.ANALYTICS.CLICKS]: 'Clicks',
    [FLASH_SALE_SHARE.ANALYTICS.SHARES]: 'Shares',
    [FLASH_SALE_SHARE.ANALYTICS.REPOSTS]: 'Reposts',
    [FLASH_SALE_SHARE.ANALYTICS.LIKES]: 'Likes',
    [FLASH_SALE_SHARE.ANALYTICS.COMMENTS]: 'Comments',
    [FLASH_SALE_SHARE.ANALYTICS.REACTIONS]: 'Reactions',
    [FLASH_SALE_SHARE.ANALYTICS.CONVERSIONS]: 'Conversions',
    [FLASH_SALE_SHARE.ANALYTICS.REVENUE]: 'Revenue',
  };
  return labels[analytic] || 'Unknown Analytic';
}

export function flashsalesShareIsValidType(type: string): type is FlashSaleShareType {
  return Object.values(FLASH_SALE_SHARE.TYPES).includes(type as FlashSaleShareType);
}

export function flashsalesShareIsValidPlatform(
  platform: string
): platform is FlashSaleSharePlatform {
  return Object.values(FLASH_SALE_SHARE.PLATFORMS).includes(platform as FlashSaleSharePlatform);
}

export function flashsalesShareIsValidCategory(
  category: string
): category is FlashSaleShareCategory {
  return Object.values(FLASH_SALE_SHARE.CATEGORIES).includes(category as FlashSaleShareCategory);
}

export function flashsalesShareIsValidContent(content: string): content is FlashSaleShareContent {
  return Object.values(FLASH_SALE_SHARE.CONTENT).includes(content as FlashSaleShareContent);
}

export function flashsalesShareIsSocialPlatform(platform: FlashSaleSharePlatform): boolean {
  const socialPlatforms: FlashSaleSharePlatform[] = [
    FLASH_SALE_SHARE.PLATFORMS.FACEBOOK,
    FLASH_SALE_SHARE.PLATFORMS.TWITTER,
    FLASH_SALE_SHARE.PLATFORMS.INSTAGRAM,
    FLASH_SALE_SHARE.PLATFORMS.LINKEDIN,
    FLASH_SALE_SHARE.PLATFORMS.YOUTUBE,
    FLASH_SALE_SHARE.PLATFORMS.PINTEREST,
    FLASH_SALE_SHARE.PLATFORMS.TIKTOK,
    FLASH_SALE_SHARE.PLATFORMS.SNAPCHAT,
    FLASH_SALE_SHARE.PLATFORMS.REDDIT,
  ];
  return socialPlatforms.includes(platform);
}

export function flashsalesShareIsMessagingPlatform(platform: FlashSaleSharePlatform): boolean {
  const messagingPlatforms: FlashSaleSharePlatform[] = [
    FLASH_SALE_SHARE.PLATFORMS.WHATSAPP,
    FLASH_SALE_SHARE.PLATFORMS.TELEGRAM,
    FLASH_SALE_SHARE.PLATFORMS.VIBER,
    FLASH_SALE_SHARE.PLATFORMS.MESSENGER,
    FLASH_SALE_SHARE.PLATFORMS.WECHAT,
    FLASH_SALE_SHARE.PLATFORMS.LINE,
  ];
  return messagingPlatforms.includes(platform);
}

export function flashsalesShareGetDefaultMaxSharesPerDay(): number {
  return FLASH_SALE_SHARE.DEFAULTS.MAX_SHARES_PER_DAY;
}

export function flashsalesShareGetDefaultMaxSharesPerUser(): number {
  return FLASH_SALE_SHARE.DEFAULTS.MAX_SHARES_PER_USER;
}

export function flashsalesShareGetDefaultExpiryDays(): number {
  return FLASH_SALE_SHARE.DEFAULTS.EXPIRY_DAYS;
}

export function flashsalesShareGetMaxSharesPerDay(): number {
  return FLASH_SALE_SHARE.LIMITS.MAX_SHARES_PER_DAY;
}

export function flashsalesShareGetMaxSharesPerUser(): number {
  return FLASH_SALE_SHARE.LIMITS.MAX_SHARES_PER_USER;
}

export function flashsalesShareGetMaxMessageLength(): number {
  return FLASH_SALE_SHARE.LIMITS.MAX_MESSAGE_LENGTH;
}

export function flashsalesShareGetMaxImageSizeMB(): number {
  return FLASH_SALE_SHARE.LIMITS.MAX_IMAGE_SIZE_MB;
}

export function flashsalesShareGetMaxVideoSizeMB(): number {
  return FLASH_SALE_SHARE.LIMITS.MAX_VIDEO_SIZE_MB;
}
