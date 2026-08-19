/**
 * Content & Marketing Cache Constants
 * Contains all caching-related constants for content and marketing management
 */

export const ContentMarketingCache = {
  // Cache TTL (Time To Live) in seconds
  TTL: {
    CONTENT: 1800, // 30 minutes
    CONTENT_LIST: 300, // 5 minutes
    CONTENT_DETAIL: 1800, // 30 minutes
    CONTENT_CATEGORY: 3600, // 1 hour
    CONTENT_TAG: 3600, // 1 hour

    BLOG: 1800, // 30 minutes
    BLOG_LIST: 300, // 5 minutes
    BLOG_DETAIL: 1800, // 30 minutes
    BLOG_CATEGORY: 3600, // 1 hour
    BLOG_TAG: 3600, // 1 hour

    PAGE: 3600, // 1 hour
    PAGE_LIST: 600, // 10 minutes
    PAGE_DETAIL: 3600, // 1 hour

    SEO: 86400, // 24 hours
    SEO_META: 86400, // 24 hours
    SEO_SCHEMA: 86400, // 24 hours
    SEO_SITEMAP: 3600, // 1 hour
    SEO_ROBOTS: 86400, // 24 hours

    MEDIA: 3600, // 1 hour
    MEDIA_LIST: 300, // 5 minutes
    MEDIA_DETAIL: 3600, // 1 hour
    MEDIA_THUMBNAIL: 604800, // 7 days

    CAMPAIGN: 300, // 5 minutes
    CAMPAIGN_LIST: 60, // 1 minute
    CAMPAIGN_DETAIL: 300, // 5 minutes
    CAMPAIGN_ANALYTICS: 60, // 1 minute

    PROMOTION: 300, // 5 minutes
    PROMOTION_LIST: 60, // 1 minute
    PROMOTION_DETAIL: 300, // 5 minutes

    AFFILIATE: 600, // 10 minutes
    AFFILIATE_LIST: 300, // 5 minutes
    AFFILIATE_DETAIL: 600, // 10 minutes
    AFFILIATE_COMMISSION: 300, // 5 minutes
    AFFILIATE_PAYOUT: 300, // 5 minutes

    REFERRAL: 600, // 10 minutes
    REFERRAL_LIST: 300, // 5 minutes
    REFERRAL_DETAIL: 600, // 10 minutes
    REFERRAL_REWARD: 300, // 5 minutes

    LOYALTY: 600, // 10 minutes
    LOYALTY_LIST: 300, // 5 minutes
    LOYALTY_DETAIL: 600, // 10 minutes
    LOYALTY_TIER: 3600, // 1 hour
    LOYALTY_REWARD: 3600, // 1 hour

    EMAIL_MARKETING: 300, // 5 minutes
    EMAIL_MARKETING_LIST: 60, // 1 minute
    EMAIL_MARKETING_DETAIL: 300, // 5 minutes
    EMAIL_TEMPLATE: 3600, // 1 hour

    SMS_MARKETING: 300, // 5 minutes
    SMS_MARKETING_LIST: 60, // 1 minute
    SMS_MARKETING_DETAIL: 300, // 5 minutes
    SMS_TEMPLATE: 3600, // 1 hour

    SOCIAL_MEDIA: 300, // 5 minutes
    SOCIAL_MEDIA_LIST: 60, // 1 minute
    SOCIAL_MEDIA_DETAIL: 300, // 5 minutes

    LEAD_GENERATION: 300, // 5 minutes
    LEAD_GENERATION_LIST: 60, // 1 minute
    LEAD_GENERATION_DETAIL: 300, // 5 minutes
    LEAD: 300, // 5 minutes
    LEAD_LIST: 60, // 1 minute

    ANALYTICS: 60, // 1 minute
    ANALYTICS_REPORT: 300, // 5 minutes
    ANALYTICS_DASHBOARD: 60, // 1 minute

    NOTIFICATION: 300, // 5 minutes
    NOTIFICATION_LIST: 60, // 1 minute
    NOTIFICATION_DETAIL: 300, // 5 minutes

    TEMPLATE: 3600, // 1 hour
    TEMPLATE_LIST: 600, // 10 minutes
    TEMPLATE_DETAIL: 3600, // 1 hour

    PREFERENCE: 600, // 10 minutes
    PREFERENCE_LIST: 300, // 5 minutes
    PREFERENCE_DETAIL: 600, // 10 minutes

    SEGMENT: 600, // 10 minutes
    SEGMENT_LIST: 300, // 5 minutes
    SEGMENT_DETAIL: 600, // 10 minutes
  } as const,

  // Cache prefixes
  PREFIXES: {
    CONTENT: 'content:',
    BLOG: 'blog:',
    PAGE: 'page:',
    SEO: 'seo:',
    MEDIA: 'media:',
    CAMPAIGN: 'campaign:',
    PROMOTION: 'promotion:',
    AFFILIATE: 'affiliate:',
    REFERRAL: 'referral:',
    LOYALTY: 'loyalty:',
    EMAIL: 'email:',
    SMS: 'sms:',
    SOCIAL: 'social:',
    LEAD: 'lead:',
    ANALYTICS: 'analytics:',
    NOTIFICATION: 'notification:',
    TEMPLATE: 'template:',
    PREFERENCE: 'pref:',
    SEGMENT: 'segment:',
  } as const,

  // Default cache TTL in seconds
  DEFAULT_CACHE_TTL: 300,

  // Cache key separator
  KEY_SEPARATOR: ':',

  // Cache strategies
  STRATEGIES: {
    CACHE_FIRST: 'cache_first',
    NETWORK_FIRST: 'network_first',
    CACHE_ONLY: 'cache_only',
    NETWORK_ONLY: 'network_only',
    STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
  } as const,

  // Cache eviction policies
  EVICTION_POLICY: {
    LRU: 'lru',
    LFU: 'lfu',
    FIFO: 'fifo',
    TTL: 'ttl',
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_CONTENT: 'content:cache:clear',
    CLEAR_BLOG: 'blog:cache:clear',
    CLEAR_PAGE: 'page:cache:clear',
    CLEAR_SEO: 'seo:cache:clear',
    CLEAR_MEDIA: 'media:cache:clear',
    CLEAR_CAMPAIGN: 'campaign:cache:clear',
    CLEAR_PROMOTION: 'promotion:cache:clear',
    CLEAR_AFFILIATE: 'affiliate:cache:clear',
    CLEAR_REFERRAL: 'referral:cache:clear',
    CLEAR_LOYALTY: 'loyalty:cache:clear',
    CLEAR_EMAIL: 'email:cache:clear',
    CLEAR_SMS: 'sms:cache:clear',
    CLEAR_SOCIAL: 'social:cache:clear',
    CLEAR_LEAD: 'lead:cache:clear',
    CLEAR_ANALYTICS: 'analytics:cache:clear',
    CLEAR_NOTIFICATION: 'notification:cache:clear',
    CLEAR_TEMPLATE: 'template:cache:clear',
    CLEAR_PREFERENCE: 'preference:cache:clear',
    CLEAR_SEGMENT: 'segment:cache:clear',
    CLEAR_ALL: 'content:cache:clear:all',
  } as const,

  // Batch settings
  BATCH: {
    SIZE: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 100,
      EXTRA_LARGE: 500,
    } as const,
    DEFAULT_SIZE: 50,
  } as const,

  // Pagination cache settings
  PAGINATION: {
    SIZE: {
      MIN: 1,
      MAX: 100,
      DEFAULT: 20,
    } as const,
    CACHE_PAGE: true,
    CACHE_TOTAL: true,
  } as const,

  // Redis configuration (should be loaded from env)
  REDIS_CONFIG: {
    KEY_PREFIX: 'content:marketing:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '1gb',
    EVICTION_POLICY: 'allkeys-lru',
  } as const,
} as const;

// Cache key builder helper
export const ContentMarketingCacheKey = {
  content: (id: string): string => `${ContentMarketingCache.PREFIXES.CONTENT}${id}`,
  blog: (id: string): string => `${ContentMarketingCache.PREFIXES.BLOG}${id}`,
  page: (id: string): string => `${ContentMarketingCache.PREFIXES.PAGE}${id}`,
  seo: (id: string): string => `${ContentMarketingCache.PREFIXES.SEO}${id}`,
  media: (id: string): string => `${ContentMarketingCache.PREFIXES.MEDIA}${id}`,
  campaign: (id: string): string => `${ContentMarketingCache.PREFIXES.CAMPAIGN}${id}`,
  promotion: (id: string): string => `${ContentMarketingCache.PREFIXES.PROMOTION}${id}`,
  affiliate: (id: string): string => `${ContentMarketingCache.PREFIXES.AFFILIATE}${id}`,
  referral: (id: string): string => `${ContentMarketingCache.PREFIXES.REFERRAL}${id}`,
  loyalty: (id: string): string => `${ContentMarketingCache.PREFIXES.LOYALTY}${id}`,
  email: (id: string): string => `${ContentMarketingCache.PREFIXES.EMAIL}${id}`,
  sms: (id: string): string => `${ContentMarketingCache.PREFIXES.SMS}${id}`,
  social: (id: string): string => `${ContentMarketingCache.PREFIXES.SOCIAL}${id}`,
  lead: (id: string): string => `${ContentMarketingCache.PREFIXES.LEAD}${id}`,
  analytics: (id: string): string => `${ContentMarketingCache.PREFIXES.ANALYTICS}${id}`,
  notification: (id: string): string => `${ContentMarketingCache.PREFIXES.NOTIFICATION}${id}`,
  template: (id: string): string => `${ContentMarketingCache.PREFIXES.TEMPLATE}${id}`,
  preference: (userId: string): string => `${ContentMarketingCache.PREFIXES.PREFERENCE}${userId}`,
  segment: (id: string): string => `${ContentMarketingCache.PREFIXES.SEGMENT}${id}`,

  buildKey: (prefix: string, ...parts: string[]): string => {
    return `${prefix}${parts.join(ContentMarketingCache.KEY_SEPARATOR)}`;
  },

  buildListKey: (prefix: string, filters: Record<string, unknown>): string => {
    const sortedKeys = Object.keys(filters).sort();
    const filterString = sortedKeys
      .filter((key) => filters[key] !== undefined && filters[key] !== null)
      .map((key) => `${key}=${String(filters[key])}`)
      .join(':');
    return `${prefix}list${filterString ? `:${filterString}` : ''}`;
  },
} as const;

// Cache TTL helper
export const ContentMarketingCacheTTL = {
  getTTL: (type: keyof typeof ContentMarketingCache.TTL): number => {
    return ContentMarketingCache.TTL[type];
  },

  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },

  getDefaultTTL: (): number => {
    return ContentMarketingCache.DEFAULT_CACHE_TTL;
  },

  getTTLForContentType: (contentType: string): number => {
    const ttlMap: Record<string, keyof typeof ContentMarketingCache.TTL> = {
      blog: 'BLOG',
      page: 'PAGE',
      media: 'MEDIA',
      campaign: 'CAMPAIGN',
      promotion: 'PROMOTION',
      seo: 'SEO',
    };
    const key = ttlMap[contentType] || 'CONTENT';
    return ContentMarketingCache.TTL[key as keyof typeof ContentMarketingCache.TTL];
  },
} as const;

// Cache configuration helper
export const ContentMarketingCacheConfig = {
  getPrefix: (type: keyof typeof ContentMarketingCache.PREFIXES): string => {
    return ContentMarketingCache.PREFIXES[type];
  },

  getSeparator: (): string => {
    return ContentMarketingCache.KEY_SEPARATOR;
  },

  getEvictionPolicy: (type: keyof typeof ContentMarketingCache.EVICTION_POLICY): string => {
    return ContentMarketingCache.EVICTION_POLICY[type];
  },

  getStrategy: (type: keyof typeof ContentMarketingCache.STRATEGIES): string => {
    return ContentMarketingCache.STRATEGIES[type];
  },

  getBatchSize: (size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE' = 'MEDIUM'): number => {
    return ContentMarketingCache.BATCH.SIZE[size] || ContentMarketingCache.BATCH.DEFAULT_SIZE;
  },

  getPaginationSize: (): number => {
    return ContentMarketingCache.PAGINATION.SIZE.DEFAULT;
  },

  getMaxPaginationSize: (): number => {
    return ContentMarketingCache.PAGINATION.SIZE.MAX;
  },
} as const;
