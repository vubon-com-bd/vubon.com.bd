export const SOCIAL_MEDIA_PLATFORM = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  PINTEREST: 'pinterest',
  SNAPCHAT: 'snapchat',
  THREADS: 'threads',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
} as const;

export const SOCIAL_MEDIA_POST_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  CAROUSEL: 'carousel',
  STORY: 'story',
  REEL: 'reel',
  LIVE: 'live',
  POLL: 'poll',
  EVENT: 'event',
  LINK: 'link',
} as const;

export const SOCIAL_MEDIA_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PUBLISHING: 'publishing',
  PUBLISHED: 'published',
  FAILED: 'failed',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
} as const;

export const SOCIAL_MEDIA = {
  PLATFORM: SOCIAL_MEDIA_PLATFORM,
  POST_TYPE: SOCIAL_MEDIA_POST_TYPE,
  STATUS: SOCIAL_MEDIA_STATUS,
  CAPTION_MAX_LENGTH: 2200,
  HASHTAG_MAX_COUNT: 30,
  MENTION_MAX_COUNT: 10,
  IMAGE_MAX_SIZE_MB: 8,
  VIDEO_MAX_SIZE_MB: 100,
  VIDEO_MAX_DURATION_SECONDS: 600,
  MAX_ACCOUNTS: 20,
  MAX_SCHEDULES_PER_DAY: 100,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 60,
  RETENTION_DAYS: 365,
} as const;

export type SocialMediaPlatformType =
  (typeof SOCIAL_MEDIA_PLATFORM)[keyof typeof SOCIAL_MEDIA_PLATFORM];
export type SocialMediaPostTypeType =
  (typeof SOCIAL_MEDIA_POST_TYPE)[keyof typeof SOCIAL_MEDIA_POST_TYPE];
export type SocialMediaStatusType = (typeof SOCIAL_MEDIA_STATUS)[keyof typeof SOCIAL_MEDIA_STATUS];
