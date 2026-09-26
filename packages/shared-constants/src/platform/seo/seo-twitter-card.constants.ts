export const SEO_TWITTER_CARD_TYPE = {
  SUMMARY: 'summary',
  SUMMARY_LARGE_IMAGE: 'summary_large_image',
  APP: 'app',
  PLAYER: 'player',
} as const;

export const SEO_TWITTER_CARD = {
  TITLE_MAX_LENGTH: 70,
  DESCRIPTION_MAX_LENGTH: 200,
  IMAGE_WIDTH: 1200,
  IMAGE_HEIGHT: 600,
  IMAGE_MAX_SIZE_MB: 5,
  DEFAULT_TYPE: SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE,
  SITE_HANDLE: '@vubon',
  CREATOR_HANDLE: '@vubon',
} as const;

export type SeoTwitterCardTypeType =
  (typeof SEO_TWITTER_CARD_TYPE)[keyof typeof SEO_TWITTER_CARD_TYPE];
