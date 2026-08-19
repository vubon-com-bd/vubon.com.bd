/**
 * Notification Cache Constants
 * Contains all caching-related constants for notification management
 */

export const NotificationCache = {
  // Cache TTL (Time To Live) in seconds
  TTL: {
    DEFAULT: 3600, // 1 hour
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 86400, // 24 hours
    NEVER: 0, // Never expire
    TEMPLATE: 7200, // 2 hours
    PREFERENCE: 3600, // 1 hour
    SETTINGS: 1800, // 30 minutes
    NOTIFICATION: 300, // 5 minutes
    BROADCAST: 600, // 10 minutes
    DIGEST: 300, // 5 minutes
    SCHEDULE: 300, // 5 minutes
    RULE: 600, // 10 minutes
    DEVICE: 3600, // 1 hour
    ANALYTICS: 1800, // 30 minutes
    REPORT: 3600, // 1 hour
  } as const,

  // Cache key prefixes
  KEY_PREFIXES: {
    NOTIFICATION: 'notification:',
    TEMPLATE: 'template:',
    PREFERENCE: 'preference:',
    SETTINGS: 'settings:',
    CHANNEL: 'channel:',
    DEVICE: 'device:',
    TOKEN: 'token:',
    RATE_LIMIT: 'ratelimit:',
    SESSION: 'session:',
    BROADCAST: 'broadcast:',
    DIGEST: 'digest:',
    SCHEDULE: 'schedule:',
    RULE: 'rule:',
    ANALYTICS: 'analytics:',
    REPORT: 'report:',
  } as const,

  // Cache strategies
  STRATEGIES: {
    CACHE_FIRST: 'cache_first',
    NETWORK_FIRST: 'network_first',
    CACHE_ONLY: 'cache_only',
    NETWORK_ONLY: 'network_only',
    STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
    REFRESH_AHEAD: 'refresh_ahead',
  } as const,

  // Cache invalidation rules
  INVALIDATION_RULES: {
    ON_NOTIFICATION_SEND: ['notification', 'rate_limit', 'analytics'],
    ON_TEMPLATE_UPDATE: ['template', 'notification'],
    ON_PREFERENCE_UPDATE: ['preference', 'settings'],
    ON_SETTINGS_UPDATE: ['settings', 'preference'],
    ON_DEVICE_REGISTER: ['device', 'token', 'notification'],
    ON_CHANNEL_UPDATE: ['channel', 'notification'],
    ON_BROADCAST_SEND: ['broadcast', 'notification', 'analytics'],
    ON_DIGEST_SEND: ['digest', 'notification', 'analytics'],
    ON_SCHEDULE_UPDATE: ['schedule', 'notification'],
    ON_RULE_UPDATE: ['rule', 'notification'],
    ON_ANALYTICS_UPDATE: ['analytics', 'report'],
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_NOTIFICATION: 'notification:cache:clear',
    CLEAR_TEMPLATE: 'notification:template:clear',
    CLEAR_PREFERENCE: 'notification:preference:clear',
    CLEAR_SETTINGS: 'notification:settings:clear',
    CLEAR_CHANNEL: 'notification:channel:clear',
    CLEAR_DEVICE: 'notification:device:clear',
    CLEAR_TOKEN: 'notification:token:clear',
    CLEAR_BROADCAST: 'notification:broadcast:clear',
    CLEAR_DIGEST: 'notification:digest:clear',
    CLEAR_SCHEDULE: 'notification:schedule:clear',
    CLEAR_RULE: 'notification:rule:clear',
    CLEAR_ANALYTICS: 'notification:analytics:clear',
    CLEAR_REPORT: 'notification:report:clear',
    CLEAR_ALL: 'notification:clear:all',
  } as const,

  // Maximum cache size (number of entries)
  MAX_SIZE: 10000,

  // Cache eviction policies
  EVICTION_POLICIES: {
    LRU: 'lru', // Least Recently Used
    LFU: 'lfu', // Least Frequently Used
    FIFO: 'fifo', // First In First Out
    TTL: 'ttl', // Time To Live
  } as const,

  // Cache refresh interval in seconds
  REFRESH_INTERVAL: {
    TEMPLATE: 600, // 10 minutes
    PREFERENCE: 300, // 5 minutes
    SETTINGS: 300, // 5 minutes
    CHANNEL: 600, // 10 minutes
    NOTIFICATION: 180, // 3 minutes
    BROADCAST: 300, // 5 minutes
    DIGEST: 180, // 3 minutes
    SCHEDULE: 180, // 3 minutes
    RULE: 300, // 5 minutes
    DEVICE: 600, // 10 minutes
    ANALYTICS: 600, // 10 minutes
  } as const,

  // Cache version
  VERSION: 'v1',

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'notification:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '1gb',
    EVICTION_POLICY: 'allkeys-lru',
  } as const,

  // Batch settings
  BATCH: {
    SIZE: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 100,
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
} as const;

// Types for cache configuration
export type NotificationCacheTTL = typeof NotificationCache.TTL;
export type NotificationCacheKeyPrefixes = typeof NotificationCache.KEY_PREFIXES;
export type NotificationCacheStrategy =
  (typeof NotificationCache.STRATEGIES)[keyof typeof NotificationCache.STRATEGIES];
export type NotificationCacheEvictionPolicy =
  (typeof NotificationCache.EVICTION_POLICIES)[keyof typeof NotificationCache.EVICTION_POLICIES];
export type NotificationCacheEvent =
  (typeof NotificationCache.EVENTS)[keyof typeof NotificationCache.EVENTS];

// Batch size type
export type NotificationBatchSize = keyof typeof NotificationCache.BATCH.SIZE;

// Cache key prefix type for type safety
export type NotificationCacheKeyPrefix =
  (typeof NotificationCache.KEY_PREFIXES)[keyof typeof NotificationCache.KEY_PREFIXES];

// Cache key builder helper
export const NotificationCacheKey = {
  notification: (id: string): string => `${NotificationCache.KEY_PREFIXES.NOTIFICATION}${id}`,
  template: (id: string): string => `${NotificationCache.KEY_PREFIXES.TEMPLATE}${id}`,
  preference: (userId: string): string => `${NotificationCache.KEY_PREFIXES.PREFERENCE}${userId}`,
  settings: (userId: string): string => `${NotificationCache.KEY_PREFIXES.SETTINGS}${userId}`,
  channel: (name: string): string => `${NotificationCache.KEY_PREFIXES.CHANNEL}${name}`,
  device: (id: string): string => `${NotificationCache.KEY_PREFIXES.DEVICE}${id}`,
  token: (token: string): string => `${NotificationCache.KEY_PREFIXES.TOKEN}${token}`,
  rateLimit: (key: string): string => `${NotificationCache.KEY_PREFIXES.RATE_LIMIT}${key}`,
  session: (id: string): string => `${NotificationCache.KEY_PREFIXES.SESSION}${id}`,
  broadcast: (id: string): string => `${NotificationCache.KEY_PREFIXES.BROADCAST}${id}`,
  digest: (id: string): string => `${NotificationCache.KEY_PREFIXES.DIGEST}${id}`,
  schedule: (id: string): string => `${NotificationCache.KEY_PREFIXES.SCHEDULE}${id}`,
  rule: (id: string): string => `${NotificationCache.KEY_PREFIXES.RULE}${id}`,
  analytics: (id: string): string => `${NotificationCache.KEY_PREFIXES.ANALYTICS}${id}`,
  report: (id: string): string => `${NotificationCache.KEY_PREFIXES.REPORT}${id}`,
  list: (type: string, page: number): string => `${type}:list:${page}`,
  count: (type: string): string => `${type}:count`,
} as const;

// Cache TTL helper
export const NotificationCacheTTL = {
  getTTL: (type: keyof typeof NotificationCache.TTL): number => {
    return NotificationCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(604800, ttl)); // Max 7 days, min 1 second
  },
  getExpiryTimestamp: (ttl: number): number => {
    return Date.now() + ttl * 1000;
  },
  isExpired: (timestamp: number): boolean => {
    return Date.now() > timestamp;
  },
} as const;

// Cache configuration helper
export const NotificationCacheConfig = {
  getEvictionPolicy: (type: keyof typeof NotificationCache.EVICTION_POLICIES): string => {
    return NotificationCache.EVICTION_POLICIES[type];
  },
  getRefreshInterval: (type: keyof typeof NotificationCache.REFRESH_INTERVAL): number => {
    return NotificationCache.REFRESH_INTERVAL[type];
  },
  getMaxSize: (): number => {
    return NotificationCache.MAX_SIZE;
  },
  getVersion: (): string => {
    return NotificationCache.VERSION;
  },
  getBatchSize: (size?: NotificationBatchSize): number => {
    if (!size) return NotificationCache.BATCH.DEFAULT_SIZE;
    return NotificationCache.BATCH.SIZE[size] || NotificationCache.BATCH.DEFAULT_SIZE;
  },
  getPaginationSize: (): number => {
    return NotificationCache.PAGINATION.SIZE.DEFAULT;
  },
  getRedisConfig: () => {
    return NotificationCache.REDIS_CONFIG;
  },
} as const;

// Cache invalidation helper
export const NotificationCacheInvalidation = {
  getRules: (event: keyof typeof NotificationCache.INVALIDATION_RULES): readonly string[] => {
    return NotificationCache.INVALIDATION_RULES[event] || [];
  },
  getEvents: (): readonly string[] => {
    return Object.values(NotificationCache.EVENTS);
  },
  getEventForKey: (key: string): string | null => {
    const prefix = key.split(':')[0];
    const eventMap: Record<string, string> = {
      notification: NotificationCache.EVENTS.CLEAR_NOTIFICATION,
      template: NotificationCache.EVENTS.CLEAR_TEMPLATE,
      preference: NotificationCache.EVENTS.CLEAR_PREFERENCE,
      settings: NotificationCache.EVENTS.CLEAR_SETTINGS,
      channel: NotificationCache.EVENTS.CLEAR_CHANNEL,
      device: NotificationCache.EVENTS.CLEAR_DEVICE,
      token: NotificationCache.EVENTS.CLEAR_TOKEN,
      broadcast: NotificationCache.EVENTS.CLEAR_BROADCAST,
      digest: NotificationCache.EVENTS.CLEAR_DIGEST,
      schedule: NotificationCache.EVENTS.CLEAR_SCHEDULE,
      rule: NotificationCache.EVENTS.CLEAR_RULE,
      analytics: NotificationCache.EVENTS.CLEAR_ANALYTICS,
      report: NotificationCache.EVENTS.CLEAR_REPORT,
    };
    return eventMap[prefix] || null;
  },
} as const;

// Cache health check helper
export const NotificationCacheHealth = {
  checkTTL: (ttl: number): boolean => {
    return ttl >= 0 && ttl <= 604800;
  },
  checkKeyPrefix: (prefix: string): prefix is NotificationCacheKeyPrefix => {
    const validPrefixes = Object.values(NotificationCache.KEY_PREFIXES) as readonly string[];
    return validPrefixes.includes(prefix);
  },
  checkStrategy: (strategy: string): strategy is NotificationCacheStrategy => {
    const validStrategies = Object.values(NotificationCache.STRATEGIES) as readonly string[];
    return validStrategies.includes(strategy);
  },
} as const;
