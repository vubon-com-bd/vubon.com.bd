/**
 * Social Media Platform Constants
 * Platform definitions and configurations for social media marketing
 */

export const MARKETINGSOCIAL_PLATFORM = {
  // Platforms
  PLATFORMS: {
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    PINTEREST: 'pinterest',
    SNAPCHAT: 'snapchat',
    REDDIT: 'reddit',
    TUMBLR: 'tumblr',
    THREADS: 'threads',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    DISCORD: 'discord',
    MEDIUM: 'medium',
    QUORA: 'quora',
    WECHAT: 'wechat',
    LINE: 'line',
    VIBER: 'viber',
    MESSENGER: 'messenger',
    CLUBHOUSE: 'clubhouse',
    BEHANCE: 'behance',
    DRIBBBLE: 'dribbble',
    GITHUB: 'github',
    STACK_OVERFLOW: 'stack_overflow',
  } as const,

  // Platform Categories
  CATEGORIES: {
    SOCIAL_NETWORKING: 'social_networking',
    VIDEO: 'video',
    PHOTO: 'photo',
    MICROBLOG: 'microblog',
    PROFESSIONAL: 'professional',
    NEWS: 'news',
    FORUM: 'forum',
    MESSAGING: 'messaging',
    CREATIVE: 'creative',
    DEVELOPER: 'developer',
  } as const,

  // Platform Features
  FEATURES: {
    POST: 'post',
    STORY: 'story',
    REEL: 'reel',
    SHORT: 'short',
    LIVE: 'live',
    VIDEO: 'video',
    IMAGE: 'image',
    CAROUSEL: 'carousel',
    POLL: 'poll',
    QUIZ: 'quiz',
    SURVEY: 'survey',
    LINK: 'link',
    PRODUCT_TAG: 'product_tag',
    SHOPPING: 'shopping',
    EVENT: 'event',
    GROUP: 'group',
    PAGE: 'page',
    PROFILE: 'profile',
    MESSAGING: 'messaging',
    STICKER: 'sticker',
    GIF: 'gif',
    HASHTAG: 'hashtag',
    MENTION: 'mention',
    SHARE: 'share',
    COMMENT: 'comment',
    LIKE: 'like',
    SAVE: 'save',
    FOLLOW: 'follow',
    ANALYTICS: 'analytics',
    ADVERTISING: 'advertising',
    API: 'api',
  } as const,

  // Platform Character Limits
  CHAR_LIMITS: {
    FACEBOOK: 63206,
    INSTAGRAM: 2200,
    TWITTER: 280,
    LINKEDIN: 3000,
    YOUTUBE: 5000,
    TIKTOK: 2200,
    PINTEREST: 500,
    SNAPCHAT: 80,
    REDDIT: 40000,
    TUMBLR: 1000,
    THREADS: 500,
    WHATSAPP: 65536,
    TELEGRAM: 4096,
    DISCORD: 2000,
    MEDIUM: 100000,
    QUORA: 10000,
  } as const,

  // Platform Image Sizes
  IMAGE_SIZES: {
    FACEBOOK: {
      post: { width: 1200, height: 630 },
      story: { width: 1080, height: 1920 },
      profile: { width: 180, height: 180 },
      cover: { width: 820, height: 312 },
    },
    INSTAGRAM: {
      post: { width: 1080, height: 1080 },
      story: { width: 1080, height: 1920 },
      profile: { width: 320, height: 320 },
      reel: { width: 1080, height: 1920 },
    },
    TWITTER: {
      post: { width: 1200, height: 675 },
      profile: { width: 400, height: 400 },
      cover: { width: 1500, height: 500 },
    },
    LINKEDIN: {
      post: { width: 1200, height: 627 },
      profile: { width: 400, height: 400 },
      cover: { width: 1584, height: 396 },
    },
    YOUTUBE: {
      thumbnail: { width: 1280, height: 720 },
      profile: { width: 800, height: 800 },
      cover: { width: 2560, height: 1440 },
    },
    TIKTOK: {
      post: { width: 1080, height: 1920 },
      profile: { width: 200, height: 200 },
    },
    PINTEREST: {
      pin: { width: 1000, height: 1500 },
      profile: { width: 165, height: 165 },
    },
    SNAPCHAT: {
      story: { width: 1080, height: 1920 },
    },
    REDDIT: {
      post: { width: 1200, height: 600 },
      profile: { width: 256, height: 256 },
    },
  } as const,

  // Platform Video Specifications
  VIDEO_SPECS: {
    FACEBOOK: {
      maxDuration: 240, // minutes
      maxSize: 10000, // MB
      aspectRatio: [1.91, 1, 0.7],
      formats: ['mp4', 'mov'],
    },
    INSTAGRAM: {
      maxDuration: 15, // minutes for feed, 90s for reels
      maxSize: 100, // MB
      aspectRatio: [1.91, 1, 0.7],
      formats: ['mp4', 'mov'],
    },
    TWITTER: {
      maxDuration: 2.4, // minutes
      maxSize: 512, // MB
      aspectRatio: [1.91, 1, 0.7],
      formats: ['mp4', 'mov'],
    },
    YOUTUBE: {
      maxDuration: 720, // minutes (12 hours)
      maxSize: 128000, // MB (128GB)
      aspectRatio: [1.78, 1, 0.56],
      formats: ['mp4', 'mov', 'avi'],
    },
    TIKTOK: {
      maxDuration: 10, // minutes
      maxSize: 287, // MB
      aspectRatio: [0.56, 1, 1.78],
      formats: ['mp4', 'mov'],
    },
    LINKEDIN: {
      maxDuration: 10, // minutes
      maxSize: 5000, // MB
      aspectRatio: [1.78, 1, 0.56],
      formats: ['mp4', 'mov'],
    },
    SNAPCHAT: {
      maxDuration: 1, // minute
      maxSize: 32, // MB
      aspectRatio: [0.56, 1],
      formats: ['mp4', 'mov'],
    },
  } as const,

  // Platform Audience Demographics (percentage)
  DEMOGRAPHICS: {
    FACEBOOK: {
      age_18_24: 20,
      age_25_34: 30,
      age_35_44: 25,
      age_45_54: 15,
      age_55_plus: 10,
      male: 45,
      female: 55,
    },
    INSTAGRAM: {
      age_18_24: 30,
      age_25_34: 35,
      age_35_44: 20,
      age_45_54: 10,
      age_55_plus: 5,
      male: 48,
      female: 52,
    },
    TWITTER: {
      age_18_24: 25,
      age_25_34: 35,
      age_35_44: 20,
      age_45_54: 12,
      age_55_plus: 8,
      male: 60,
      female: 40,
    },
    LINKEDIN: {
      age_18_24: 10,
      age_25_34: 30,
      age_35_44: 30,
      age_45_54: 20,
      age_55_plus: 10,
      male: 55,
      female: 45,
    },
    YOUTUBE: {
      age_18_24: 25,
      age_25_34: 30,
      age_35_44: 20,
      age_45_54: 15,
      age_55_plus: 10,
      male: 55,
      female: 45,
    },
    TIKTOK: {
      age_18_24: 40,
      age_25_34: 30,
      age_35_44: 15,
      age_45_54: 10,
      age_55_plus: 5,
      male: 45,
      female: 55,
    },
    PINTEREST: {
      age_18_24: 20,
      age_25_34: 35,
      age_35_44: 25,
      age_45_54: 15,
      age_55_plus: 5,
      male: 15,
      female: 85,
    },
  } as const,

  // Platform Defaults
  DEFAULTS: {
    DEFAULT_PLATFORM: 'facebook',
    DEFAULT_CATEGORY: 'social_networking',
    DEFAULT_HASHTAG_LIMIT: 10,
    DEFAULT_IMAGE_QUALITY: 80,
    DEFAULT_VIDEO_QUALITY: '720p',
  } as const,
} as const;

// Platforms
export type MarketingSocialPlatform =
  (typeof MARKETINGSOCIAL_PLATFORM.PLATFORMS)[keyof typeof MARKETINGSOCIAL_PLATFORM.PLATFORMS];

// Platform Categories
export type MarketingSocialPlatformCategory =
  (typeof MARKETINGSOCIAL_PLATFORM.CATEGORIES)[keyof typeof MARKETINGSOCIAL_PLATFORM.CATEGORIES];

// Platform Features
export type MarketingSocialPlatformFeature =
  (typeof MARKETINGSOCIAL_PLATFORM.FEATURES)[keyof typeof MARKETINGSOCIAL_PLATFORM.FEATURES];

// Platform Character Limits
export type MarketingSocialCharLimit =
  (typeof MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS)[keyof typeof MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS];

// Platform Image Sizes
export type MarketingSocialImageSize =
  (typeof MARKETINGSOCIAL_PLATFORM.IMAGE_SIZES)[keyof typeof MARKETINGSOCIAL_PLATFORM.IMAGE_SIZES];

// Platform Video Specs
export type MarketingSocialVideoSpec =
  (typeof MARKETINGSOCIAL_PLATFORM.VIDEO_SPECS)[keyof typeof MARKETINGSOCIAL_PLATFORM.VIDEO_SPECS];

// Platform Demographics
export type MarketingSocialDemographics =
  (typeof MARKETINGSOCIAL_PLATFORM.DEMOGRAPHICS)[keyof typeof MARKETINGSOCIAL_PLATFORM.DEMOGRAPHICS];

// Utility Functions
export function marketingsocialGetPlatformLabel(platform: MarketingSocialPlatform): string {
  const labels: Record<MarketingSocialPlatform, string> = {
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.FACEBOOK]: 'Facebook',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.INSTAGRAM]: 'Instagram',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TWITTER]: 'Twitter/X',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.LINKEDIN]: 'LinkedIn',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.YOUTUBE]: 'YouTube',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TIKTOK]: 'TikTok',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.PINTEREST]: 'Pinterest',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.SNAPCHAT]: 'Snapchat',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.REDDIT]: 'Reddit',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TUMBLR]: 'Tumblr',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.THREADS]: 'Threads',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.WHATSAPP]: 'WhatsApp',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TELEGRAM]: 'Telegram',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.DISCORD]: 'Discord',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.MEDIUM]: 'Medium',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.QUORA]: 'Quora',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.WECHAT]: 'WeChat',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.LINE]: 'Line',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.VIBER]: 'Viber',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.MESSENGER]: 'Messenger',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.CLUBHOUSE]: 'Clubhouse',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.BEHANCE]: 'Behance',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.DRIBBBLE]: 'Dribbble',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.GITHUB]: 'GitHub',
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.STACK_OVERFLOW]: 'Stack Overflow',
  };
  return labels[platform] || 'Unknown Platform';
}

export function marketingsocialGetPlatformCategory(
  platform: MarketingSocialPlatform
): MarketingSocialPlatformCategory {
  const categories: Record<MarketingSocialPlatform, MarketingSocialPlatformCategory> = {
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.FACEBOOK]:
      MARKETINGSOCIAL_PLATFORM.CATEGORIES.SOCIAL_NETWORKING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.INSTAGRAM]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.PHOTO,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TWITTER]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MICROBLOG,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.LINKEDIN]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.PROFESSIONAL,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.YOUTUBE]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.VIDEO,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TIKTOK]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.VIDEO,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.PINTEREST]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.PHOTO,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.SNAPCHAT]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.PHOTO,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.REDDIT]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.FORUM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TUMBLR]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MICROBLOG,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.THREADS]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MICROBLOG,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.WHATSAPP]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MESSAGING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TELEGRAM]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MESSAGING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.DISCORD]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MESSAGING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.MEDIUM]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.NEWS,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.QUORA]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.FORUM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.WECHAT]:
      MARKETINGSOCIAL_PLATFORM.CATEGORIES.SOCIAL_NETWORKING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.LINE]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MESSAGING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.VIBER]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MESSAGING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.MESSENGER]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.MESSAGING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.CLUBHOUSE]:
      MARKETINGSOCIAL_PLATFORM.CATEGORIES.SOCIAL_NETWORKING,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.BEHANCE]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.CREATIVE,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.DRIBBBLE]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.CREATIVE,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.GITHUB]: MARKETINGSOCIAL_PLATFORM.CATEGORIES.DEVELOPER,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.STACK_OVERFLOW]:
      MARKETINGSOCIAL_PLATFORM.CATEGORIES.DEVELOPER,
  };
  return categories[platform] || MARKETINGSOCIAL_PLATFORM.CATEGORIES.SOCIAL_NETWORKING;
}

export function marketingsocialGetPlatformCharLimit(platform: MarketingSocialPlatform): number {
  const limits: Record<MarketingSocialPlatform, number> = {
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.FACEBOOK]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.FACEBOOK,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.INSTAGRAM]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.INSTAGRAM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TWITTER]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.TWITTER,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.LINKEDIN]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.LINKEDIN,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.YOUTUBE]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.YOUTUBE,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TIKTOK]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.TIKTOK,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.PINTEREST]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.PINTEREST,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.SNAPCHAT]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.SNAPCHAT,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.REDDIT]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.REDDIT,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TUMBLR]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.TUMBLR,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.THREADS]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.THREADS,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.WHATSAPP]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.WHATSAPP,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.TELEGRAM]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.TELEGRAM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.DISCORD]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.DISCORD,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.MEDIUM]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.MEDIUM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.QUORA]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.QUORA,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.WECHAT]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.WHATSAPP,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.LINE]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.WHATSAPP,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.VIBER]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.WHATSAPP,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.MESSENGER]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.WHATSAPP,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.CLUBHOUSE]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.TWITTER,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.BEHANCE]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.MEDIUM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.DRIBBBLE]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.MEDIUM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.GITHUB]: MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.MEDIUM,
    [MARKETINGSOCIAL_PLATFORM.PLATFORMS.STACK_OVERFLOW]:
      MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.MEDIUM,
  };
  return limits[platform] || MARKETINGSOCIAL_PLATFORM.CHAR_LIMITS.FACEBOOK;
}

export function marketingsocialGetPlatformImageSize(
  platform: MarketingSocialPlatform,
  type: string
): { width: number; height: number } | null {
  const platformSizes =
    MARKETINGSOCIAL_PLATFORM.IMAGE_SIZES[
      platform as keyof typeof MARKETINGSOCIAL_PLATFORM.IMAGE_SIZES
    ];
  if (platformSizes && platformSizes[type as keyof typeof platformSizes]) {
    return platformSizes[type as keyof typeof platformSizes];
  }
  return null;
}

export function marketingsocialGetPlatformVideoSpec(
  platform: MarketingSocialPlatform
): MarketingSocialVideoSpec | null {
  const spec =
    MARKETINGSOCIAL_PLATFORM.VIDEO_SPECS[
      platform as keyof typeof MARKETINGSOCIAL_PLATFORM.VIDEO_SPECS
    ];
  return spec || null;
}

export function marketingsocialIsVideoPlatform(platform: MarketingSocialPlatform): boolean {
  const videoPlatforms: MarketingSocialPlatform[] = [
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.YOUTUBE,
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.TIKTOK,
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.INSTAGRAM,
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.FACEBOOK,
  ];
  return videoPlatforms.includes(platform);
}

export function marketingsocialIsPhotoPlatform(platform: MarketingSocialPlatform): boolean {
  const photoPlatforms: MarketingSocialPlatform[] = [
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.INSTAGRAM,
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.PINTEREST,
    MARKETINGSOCIAL_PLATFORM.PLATFORMS.SNAPCHAT,
  ];
  return photoPlatforms.includes(platform);
}

export function marketingsocialGetDefaultPlatform(): MarketingSocialPlatform {
  return MARKETINGSOCIAL_PLATFORM.DEFAULTS.DEFAULT_PLATFORM;
}
