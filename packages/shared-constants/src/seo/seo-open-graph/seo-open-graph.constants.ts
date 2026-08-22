/**
 * SEO Open Graph Constants
 * Configuration for Open Graph meta tags and social media sharing
 */

export const SEO_OPEN_GRAPH = {
  // OG Types
  TYPES: {
    WEBSITE: 'website',
    ARTICLE: 'article',
    BOOK: 'book',
    PROFILE: 'profile',
    MUSIC: 'music',
    VIDEO: 'video',
    PRODUCT: 'product',
    RESTAURANT: 'restaurant',
    PLACE: 'place',
    EVENT: 'event',
    GAME: 'game',
    MOVIE: 'movie',
    TV_SHOW: 'tv_show',
    SONG: 'song',
    ALBUM: 'album',
    PLAYLIST: 'playlist',
    RADIO: 'radio',
    FOOD: 'food',
    DRINK: 'drink',
  } as const,

  // OG Status
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

  // OG Properties
  PROPERTIES: {
    // Basic
    TITLE: 'og:title',
    DESCRIPTION: 'og:description',
    TYPE: 'og:type',
    URL: 'og:url',
    IMAGE: 'og:image',
    SITE_NAME: 'og:site_name',
    LOCALE: 'og:locale',
    DETERMINER: 'og:determiner',

    // Images
    IMAGE_URL: 'og:image:url',
    IMAGE_SECURE_URL: 'og:image:secure_url',
    IMAGE_TYPE: 'og:image:type',
    IMAGE_WIDTH: 'og:image:width',
    IMAGE_HEIGHT: 'og:image:height',
    IMAGE_ALT: 'og:image:alt',

    // Videos
    VIDEO_URL: 'og:video:url',
    VIDEO_SECURE_URL: 'og:video:secure_url',
    VIDEO_TYPE: 'og:video:type',
    VIDEO_WIDTH: 'og:video:width',
    VIDEO_HEIGHT: 'og:video:height',

    // Audio
    AUDIO_URL: 'og:audio:url',
    AUDIO_SECURE_URL: 'og:audio:secure_url',
    AUDIO_TYPE: 'og:audio:type',

    // Article
    ARTICLE_PUBLISHED: 'article:published_time',
    ARTICLE_MODIFIED: 'article:modified_time',
    ARTICLE_EXPIRATION: 'article:expiration_time',
    ARTICLE_AUTHOR: 'article:author',
    ARTICLE_SECTION: 'article:section',
    ARTICLE_TAG: 'article:tag',

    // Book
    BOOK_AUTHOR: 'book:author',
    BOOK_ISBN: 'book:isbn',
    BOOK_RELEASE_DATE: 'book:release_date',
    BOOK_TAG: 'book:tag',

    // Profile
    PROFILE_FIRST_NAME: 'profile:first_name',
    PROFILE_LAST_NAME: 'profile:last_name',
    PROFILE_USERNAME: 'profile:username',
    PROFILE_GENDER: 'profile:gender',

    // Music
    MUSIC_DURATION: 'music:duration',
    MUSIC_ALBUM: 'music:album',
    MUSIC_ALBUM_DISC: 'music:album:disc',
    MUSIC_ALBUM_TRACK: 'music:album:track',
    MUSIC_MUSICIAN: 'music:musician',
    MUSIC_RELEASE_DATE: 'music:release_date',

    // Product
    PRODUCT_AVAILABILITY: 'product:availability',
    PRODUCT_CONDITION: 'product:condition',
    PRODUCT_PRICE: 'product:price',
    PRODUCT_CURRENCY: 'product:price:currency',
    PRODUCT_RETURN: 'product:return',
    PRODUCT_CATEGORY: 'product:category',
    PRODUCT_BRAND: 'product:brand',
    PRODUCT_COLOR: 'product:color',
    PRODUCT_SIZE: 'product:size',
    PRODUCT_MATERIAL: 'product:material',
    PRODUCT_GENDER: 'product:gender',
    PRODUCT_AGE_GROUP: 'product:age_group',

    // Restaurant
    RESTAURANT_PRICE_RANGE: 'restaurant:price_range',
    RESTAURANT_CUISINE: 'restaurant:cuisine',
    RESTAURANT_PHONE: 'restaurant:phone',
    RESTAURANT_ADDRESS: 'restaurant:address',
    RESTAURANT_WEBSITE: 'restaurant:website',
    RESTAURANT_HOURS: 'restaurant:hours',

    // Place
    PLACE_LATITUDE: 'place:latitude',
    PLACE_LONGITUDE: 'place:longitude',
    PLACE_ADDRESS: 'place:address',
    PLACE_PHONE: 'place:phone',
    PLACE_WEBSITE: 'place:website',

    // Event
    EVENT_START: 'event:start_time',
    EVENT_END: 'event:end_time',
    EVENT_LOCATION: 'event:location',
    EVENT_ORGANIZER: 'event:organizer',
    EVENT_TICKET_URL: 'event:ticket_url',
    EVENT_WEBSITE: 'event:website',
  } as const,

  // OG Image Sizes
  IMAGE_SIZES: {
    MIN_WIDTH: 200,
    MAX_WIDTH: 1200,
    MIN_HEIGHT: 200,
    MAX_HEIGHT: 630,
    RECOMMENDED_WIDTH: 1200,
    RECOMMENDED_HEIGHT: 630,
    ASPECT_RATIO: 1.91,
  } as const,

  // OG Validations
  VALIDATIONS: {
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // OG Platforms
  PLATFORMS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    PINTEREST: 'pinterest',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    SLACK: 'slack',
    DISCORD: 'discord',
    REDDIT: 'reddit',
    TUMBLR: 'tumblr',
    VIBER: 'viber',
    LINE: 'line',
  } as const,

  // OG Errors
  ERROR_TYPES: {
    MISSING_TITLE: 'missing_title',
    MISSING_DESCRIPTION: 'missing_description',
    MISSING_IMAGE: 'missing_image',
    MISSING_URL: 'missing_url',
    MISSING_TYPE: 'missing_type',
    IMAGE_TOO_SMALL: 'image_too_small',
    IMAGE_WRONG_RATIO: 'image_wrong_ratio',
    INVALID_URL: 'invalid_url',
    INVALID_PROPERTY: 'invalid_property',
    DUPLICATE_PROPERTY: 'duplicate_property',
  } as const,

  // OG Metrics
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

// OG Types
export type SEOOpenGraphType = (typeof SEO_OPEN_GRAPH.TYPES)[keyof typeof SEO_OPEN_GRAPH.TYPES];

// OG Status
export type SEOOpenGraphStatus = (typeof SEO_OPEN_GRAPH.STATUS)[keyof typeof SEO_OPEN_GRAPH.STATUS];

// OG Properties
export type SEOOpenGraphProperty =
  (typeof SEO_OPEN_GRAPH.PROPERTIES)[keyof typeof SEO_OPEN_GRAPH.PROPERTIES];

// OG Image Sizes
export type SEOOpenGraphImageSize =
  (typeof SEO_OPEN_GRAPH.IMAGE_SIZES)[keyof typeof SEO_OPEN_GRAPH.IMAGE_SIZES];

// OG Validations
export type SEOOpenGraphValidation =
  (typeof SEO_OPEN_GRAPH.VALIDATIONS)[keyof typeof SEO_OPEN_GRAPH.VALIDATIONS];

// OG Platforms
export type SEOOpenGraphPlatform =
  (typeof SEO_OPEN_GRAPH.PLATFORMS)[keyof typeof SEO_OPEN_GRAPH.PLATFORMS];

// OG Errors
export type SEOOpenGraphErrorType =
  (typeof SEO_OPEN_GRAPH.ERROR_TYPES)[keyof typeof SEO_OPEN_GRAPH.ERROR_TYPES];

// OG Metrics
export type SEOOpenGraphMetric =
  (typeof SEO_OPEN_GRAPH.METRICS)[keyof typeof SEO_OPEN_GRAPH.METRICS];

// Utility Functions
export function getSEOOpenGraphTypeLabel(type: SEOOpenGraphType): string {
  const labels: Record<SEOOpenGraphType, string> = {
    [SEO_OPEN_GRAPH.TYPES.WEBSITE]: 'Website',
    [SEO_OPEN_GRAPH.TYPES.ARTICLE]: 'Article',
    [SEO_OPEN_GRAPH.TYPES.BOOK]: 'Book',
    [SEO_OPEN_GRAPH.TYPES.PROFILE]: 'Profile',
    [SEO_OPEN_GRAPH.TYPES.MUSIC]: 'Music',
    [SEO_OPEN_GRAPH.TYPES.VIDEO]: 'Video',
    [SEO_OPEN_GRAPH.TYPES.PRODUCT]: 'Product',
    [SEO_OPEN_GRAPH.TYPES.RESTAURANT]: 'Restaurant',
    [SEO_OPEN_GRAPH.TYPES.PLACE]: 'Place',
    [SEO_OPEN_GRAPH.TYPES.EVENT]: 'Event',
    [SEO_OPEN_GRAPH.TYPES.GAME]: 'Game',
    [SEO_OPEN_GRAPH.TYPES.MOVIE]: 'Movie',
    [SEO_OPEN_GRAPH.TYPES.TV_SHOW]: 'TV Show',
    [SEO_OPEN_GRAPH.TYPES.SONG]: 'Song',
    [SEO_OPEN_GRAPH.TYPES.ALBUM]: 'Album',
    [SEO_OPEN_GRAPH.TYPES.PLAYLIST]: 'Playlist',
    [SEO_OPEN_GRAPH.TYPES.RADIO]: 'Radio',
    [SEO_OPEN_GRAPH.TYPES.FOOD]: 'Food',
    [SEO_OPEN_GRAPH.TYPES.DRINK]: 'Drink',
  };
  return labels[type] || 'Unknown OG Type';
}

export function getSEOOpenGraphStatusLabel(status: SEOOpenGraphStatus): string {
  const labels: Record<SEOOpenGraphStatus, string> = {
    [SEO_OPEN_GRAPH.STATUS.PENDING]: 'Pending',
    [SEO_OPEN_GRAPH.STATUS.GENERATED]: 'Generated',
    [SEO_OPEN_GRAPH.STATUS.VALID]: 'Valid',
    [SEO_OPEN_GRAPH.STATUS.INVALID]: 'Invalid',
    [SEO_OPEN_GRAPH.STATUS.PARTIAL]: 'Partial',
    [SEO_OPEN_GRAPH.STATUS.PUBLISHED]: 'Published',
    [SEO_OPEN_GRAPH.STATUS.UPDATING]: 'Updating',
    [SEO_OPEN_GRAPH.STATUS.OUTDATED]: 'Outdated',
    [SEO_OPEN_GRAPH.STATUS.ERROR]: 'Error',
    [SEO_OPEN_GRAPH.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOOpenGraphPropertyLabel(property: SEOOpenGraphProperty): string {
  const labels: Record<SEOOpenGraphProperty, string> = {
    // Basic
    [SEO_OPEN_GRAPH.PROPERTIES.TITLE]: 'Title',
    [SEO_OPEN_GRAPH.PROPERTIES.DESCRIPTION]: 'Description',
    [SEO_OPEN_GRAPH.PROPERTIES.TYPE]: 'Type',
    [SEO_OPEN_GRAPH.PROPERTIES.URL]: 'URL',
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE]: 'Image',
    [SEO_OPEN_GRAPH.PROPERTIES.SITE_NAME]: 'Site Name',
    [SEO_OPEN_GRAPH.PROPERTIES.LOCALE]: 'Locale',
    [SEO_OPEN_GRAPH.PROPERTIES.DETERMINER]: 'Determiner',

    // Images
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE_URL]: 'Image URL',
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE_SECURE_URL]: 'Image Secure URL',
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE_TYPE]: 'Image Type',
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE_WIDTH]: 'Image Width',
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE_HEIGHT]: 'Image Height',
    [SEO_OPEN_GRAPH.PROPERTIES.IMAGE_ALT]: 'Image Alt Text',

    // Videos
    [SEO_OPEN_GRAPH.PROPERTIES.VIDEO_URL]: 'Video URL',
    [SEO_OPEN_GRAPH.PROPERTIES.VIDEO_SECURE_URL]: 'Video Secure URL',
    [SEO_OPEN_GRAPH.PROPERTIES.VIDEO_TYPE]: 'Video Type',
    [SEO_OPEN_GRAPH.PROPERTIES.VIDEO_WIDTH]: 'Video Width',
    [SEO_OPEN_GRAPH.PROPERTIES.VIDEO_HEIGHT]: 'Video Height',

    // Audio
    [SEO_OPEN_GRAPH.PROPERTIES.AUDIO_URL]: 'Audio URL',
    [SEO_OPEN_GRAPH.PROPERTIES.AUDIO_SECURE_URL]: 'Audio Secure URL',
    [SEO_OPEN_GRAPH.PROPERTIES.AUDIO_TYPE]: 'Audio Type',

    // Article
    [SEO_OPEN_GRAPH.PROPERTIES.ARTICLE_PUBLISHED]: 'Published Time',
    [SEO_OPEN_GRAPH.PROPERTIES.ARTICLE_MODIFIED]: 'Modified Time',
    [SEO_OPEN_GRAPH.PROPERTIES.ARTICLE_EXPIRATION]: 'Expiration Time',
    [SEO_OPEN_GRAPH.PROPERTIES.ARTICLE_AUTHOR]: 'Author',
    [SEO_OPEN_GRAPH.PROPERTIES.ARTICLE_SECTION]: 'Section',
    [SEO_OPEN_GRAPH.PROPERTIES.ARTICLE_TAG]: 'Tag',

    // Book
    [SEO_OPEN_GRAPH.PROPERTIES.BOOK_AUTHOR]: 'Book Author',
    [SEO_OPEN_GRAPH.PROPERTIES.BOOK_ISBN]: 'ISBN',
    [SEO_OPEN_GRAPH.PROPERTIES.BOOK_RELEASE_DATE]: 'Release Date',
    [SEO_OPEN_GRAPH.PROPERTIES.BOOK_TAG]: 'Book Tag',

    // Profile
    [SEO_OPEN_GRAPH.PROPERTIES.PROFILE_FIRST_NAME]: 'First Name',
    [SEO_OPEN_GRAPH.PROPERTIES.PROFILE_LAST_NAME]: 'Last Name',
    [SEO_OPEN_GRAPH.PROPERTIES.PROFILE_USERNAME]: 'Username',
    [SEO_OPEN_GRAPH.PROPERTIES.PROFILE_GENDER]: 'Gender',

    // Music
    [SEO_OPEN_GRAPH.PROPERTIES.MUSIC_DURATION]: 'Duration',
    [SEO_OPEN_GRAPH.PROPERTIES.MUSIC_ALBUM]: 'Album',
    [SEO_OPEN_GRAPH.PROPERTIES.MUSIC_ALBUM_DISC]: 'Disc',
    [SEO_OPEN_GRAPH.PROPERTIES.MUSIC_ALBUM_TRACK]: 'Track',
    [SEO_OPEN_GRAPH.PROPERTIES.MUSIC_MUSICIAN]: 'Musician',
    [SEO_OPEN_GRAPH.PROPERTIES.MUSIC_RELEASE_DATE]: 'Release Date',

    // Product
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_AVAILABILITY]: 'Availability',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_CONDITION]: 'Condition',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_PRICE]: 'Price',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_CURRENCY]: 'Currency',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_RETURN]: 'Return Policy',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_CATEGORY]: 'Category',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_BRAND]: 'Brand',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_COLOR]: 'Color',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_SIZE]: 'Size',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_MATERIAL]: 'Material',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_GENDER]: 'Gender',
    [SEO_OPEN_GRAPH.PROPERTIES.PRODUCT_AGE_GROUP]: 'Age Group',

    // Restaurant
    [SEO_OPEN_GRAPH.PROPERTIES.RESTAURANT_PRICE_RANGE]: 'Price Range',
    [SEO_OPEN_GRAPH.PROPERTIES.RESTAURANT_CUISINE]: 'Cuisine',
    [SEO_OPEN_GRAPH.PROPERTIES.RESTAURANT_PHONE]: 'Phone',
    [SEO_OPEN_GRAPH.PROPERTIES.RESTAURANT_ADDRESS]: 'Address',
    [SEO_OPEN_GRAPH.PROPERTIES.RESTAURANT_WEBSITE]: 'Website',
    [SEO_OPEN_GRAPH.PROPERTIES.RESTAURANT_HOURS]: 'Hours',

    // Place
    [SEO_OPEN_GRAPH.PROPERTIES.PLACE_LATITUDE]: 'Latitude',
    [SEO_OPEN_GRAPH.PROPERTIES.PLACE_LONGITUDE]: 'Longitude',
    [SEO_OPEN_GRAPH.PROPERTIES.PLACE_ADDRESS]: 'Address',
    [SEO_OPEN_GRAPH.PROPERTIES.PLACE_PHONE]: 'Phone',
    [SEO_OPEN_GRAPH.PROPERTIES.PLACE_WEBSITE]: 'Website',

    // Event
    [SEO_OPEN_GRAPH.PROPERTIES.EVENT_START]: 'Start Time',
    [SEO_OPEN_GRAPH.PROPERTIES.EVENT_END]: 'End Time',
    [SEO_OPEN_GRAPH.PROPERTIES.EVENT_LOCATION]: 'Location',
    [SEO_OPEN_GRAPH.PROPERTIES.EVENT_ORGANIZER]: 'Organizer',
    [SEO_OPEN_GRAPH.PROPERTIES.EVENT_TICKET_URL]: 'Ticket URL',
    [SEO_OPEN_GRAPH.PROPERTIES.EVENT_WEBSITE]: 'Event Website',
  };
  return labels[property] || 'Unknown Property';
}

export function getSEOOpenGraphPlatformLabel(platform: SEOOpenGraphPlatform): string {
  const labels: Record<SEOOpenGraphPlatform, string> = {
    [SEO_OPEN_GRAPH.PLATFORMS.FACEBOOK]: 'Facebook',
    [SEO_OPEN_GRAPH.PLATFORMS.TWITTER]: 'Twitter',
    [SEO_OPEN_GRAPH.PLATFORMS.LINKEDIN]: 'LinkedIn',
    [SEO_OPEN_GRAPH.PLATFORMS.PINTEREST]: 'Pinterest',
    [SEO_OPEN_GRAPH.PLATFORMS.WHATSAPP]: 'WhatsApp',
    [SEO_OPEN_GRAPH.PLATFORMS.TELEGRAM]: 'Telegram',
    [SEO_OPEN_GRAPH.PLATFORMS.SLACK]: 'Slack',
    [SEO_OPEN_GRAPH.PLATFORMS.DISCORD]: 'Discord',
    [SEO_OPEN_GRAPH.PLATFORMS.REDDIT]: 'Reddit',
    [SEO_OPEN_GRAPH.PLATFORMS.TUMBLR]: 'Tumblr',
    [SEO_OPEN_GRAPH.PLATFORMS.VIBER]: 'Viber',
    [SEO_OPEN_GRAPH.PLATFORMS.LINE]: 'Line',
  };
  return labels[platform] || 'Unknown Platform';
}

export function getSEOOpenGraphErrorLabel(errorType: SEOOpenGraphErrorType): string {
  const labels: Record<SEOOpenGraphErrorType, string> = {
    [SEO_OPEN_GRAPH.ERROR_TYPES.MISSING_TITLE]: 'Missing Title',
    [SEO_OPEN_GRAPH.ERROR_TYPES.MISSING_DESCRIPTION]: 'Missing Description',
    [SEO_OPEN_GRAPH.ERROR_TYPES.MISSING_IMAGE]: 'Missing Image',
    [SEO_OPEN_GRAPH.ERROR_TYPES.MISSING_URL]: 'Missing URL',
    [SEO_OPEN_GRAPH.ERROR_TYPES.MISSING_TYPE]: 'Missing Type',
    [SEO_OPEN_GRAPH.ERROR_TYPES.IMAGE_TOO_SMALL]: 'Image Too Small',
    [SEO_OPEN_GRAPH.ERROR_TYPES.IMAGE_WRONG_RATIO]: 'Wrong Image Aspect Ratio',
    [SEO_OPEN_GRAPH.ERROR_TYPES.INVALID_URL]: 'Invalid URL',
    [SEO_OPEN_GRAPH.ERROR_TYPES.INVALID_PROPERTY]: 'Invalid Property',
    [SEO_OPEN_GRAPH.ERROR_TYPES.DUPLICATE_PROPERTY]: 'Duplicate Property',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getOGStatusColor(status: SEOOpenGraphStatus): string {
  const colors: Record<SEOOpenGraphStatus, string> = {
    [SEO_OPEN_GRAPH.STATUS.PENDING]: '#9E9E9E',
    [SEO_OPEN_GRAPH.STATUS.GENERATED]: '#2196F3',
    [SEO_OPEN_GRAPH.STATUS.VALID]: '#4CAF50',
    [SEO_OPEN_GRAPH.STATUS.INVALID]: '#F44336',
    [SEO_OPEN_GRAPH.STATUS.PARTIAL]: '#FF9800',
    [SEO_OPEN_GRAPH.STATUS.PUBLISHED]: '#4CAF50',
    [SEO_OPEN_GRAPH.STATUS.UPDATING]: '#FFC107',
    [SEO_OPEN_GRAPH.STATUS.OUTDATED]: '#FF9800',
    [SEO_OPEN_GRAPH.STATUS.ERROR]: '#D32F2F',
    [SEO_OPEN_GRAPH.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isOGValid(status: SEOOpenGraphStatus): boolean {
  const validStatuses: SEOOpenGraphStatus[] = [
    SEO_OPEN_GRAPH.STATUS.VALID,
    SEO_OPEN_GRAPH.STATUS.PUBLISHED,
  ];
  return validStatuses.includes(status);
}

export function isOGActive(status: SEOOpenGraphStatus): boolean {
  const activeStatuses: SEOOpenGraphStatus[] = [
    SEO_OPEN_GRAPH.STATUS.GENERATED,
    SEO_OPEN_GRAPH.STATUS.VALID,
    SEO_OPEN_GRAPH.STATUS.PUBLISHED,
    SEO_OPEN_GRAPH.STATUS.UPDATING,
  ];
  return activeStatuses.includes(status);
}

export function getOGImageRecommendation(): string {
  return `Recommended size: ${SEO_OPEN_GRAPH.IMAGE_SIZES.RECOMMENDED_WIDTH}x${SEO_OPEN_GRAPH.IMAGE_SIZES.RECOMMENDED_HEIGHT}px (${SEO_OPEN_GRAPH.IMAGE_SIZES.ASPECT_RATIO}:1 ratio)`;
}
