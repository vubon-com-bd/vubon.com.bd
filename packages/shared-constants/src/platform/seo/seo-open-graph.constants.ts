export const SEO_OPEN_GRAPH_TYPE = {
  WEBSITE: 'website',
  ARTICLE: 'article',
  PRODUCT: 'product',
  PROFILE: 'profile',
  VIDEO_MOVIE: 'video.movie',
  VIDEO_EPISODE: 'video.episode',
  MUSIC_SONG: 'music.song',
  BOOK: 'book',
} as const;

export const SEO_OPEN_GRAPH = {
  TITLE_MAX_LENGTH: 60,
  DESCRIPTION_MAX_LENGTH: 200,
  IMAGE_WIDTH: 1200,
  IMAGE_HEIGHT: 630,
  IMAGE_MAX_SIZE_MB: 8,
  IMAGE_FORMAT: 'jpeg',
  LOCALE_DEFAULT: 'bn_BD',
  SITE_NAME_MAX_LENGTH: 100,
  URL_MAX_LENGTH: 2000,
} as const;

export type SeoOpenGraphTypeType = (typeof SEO_OPEN_GRAPH_TYPE)[keyof typeof SEO_OPEN_GRAPH_TYPE];
