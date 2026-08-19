/**
 * Support Cache Constants
 * Contains all caching-related constants for support management
 */

export const SupportCache = {
  // Cache TTL (Time To Live) in seconds
  TTL: {
    TICKET_CACHE_TTL: 300, // 5 minutes
    FAQ_CACHE_TTL: 3600, // 1 hour
    KNOWLEDGE_BASE_CACHE_TTL: 7200, // 2 hours
    SESSION_CACHE_TTL: 1800, // 30 minutes
    CONFIG_CACHE_TTL: 3600, // 1 hour
    ANALYTICS_CACHE_TTL: 300, // 5 minutes
    REPORT_CACHE_TTL: 600, // 10 minutes
    USER_CACHE_TTL: 3600, // 1 hour
    TEAM_CACHE_TTL: 3600, // 1 hour
    SLA_CACHE_TTL: 300, // 5 minutes
  } as const,

  // Cache prefixes
  PREFIXES: {
    TICKET_PREFIX: 'ticket:',
    USER_PREFIX: 'user:',
    SESSION_PREFIX: 'session:',
    FAQ_PREFIX: 'faq:',
    KNOWLEDGE_BASE_PREFIX: 'knowledge:',
    CONFIG_PREFIX: 'config:',
    ANALYTICS_PREFIX: 'analytics:',
    REPORT_PREFIX: 'report:',
    TEAM_PREFIX: 'team:',
    SLA_PREFIX: 'sla:',
  } as const,

  // Maximum cache size (number of entries)
  MAX_SIZE: 10000,

  // Cache eviction policies
  EVICTION_POLICY: {
    LRU: 'lru', // Least Recently Used
    LFU: 'lfu', // Least Frequently Used
    FIFO: 'fifo', // First In First Out
    TTL: 'ttl', // Time To Live
  } as const,

  // Cache refresh interval in seconds
  REFRESH_INTERVAL: {
    TICKET: 60, // 1 minute
    FAQ: 300, // 5 minutes
    KNOWLEDGE_BASE: 600, // 10 minutes
    CONFIG: 300, // 5 minutes
    ANALYTICS: 60, // 1 minute
    REPORT: 120, // 2 minutes
  } as const,

  // Cache version
  VERSION: 'v1',

  // Cache strategies
  STRATEGIES: {
    CACHE_FIRST: 'cache_first',
    NETWORK_FIRST: 'network_first',
    CACHE_ONLY: 'cache_only',
    NETWORK_ONLY: 'network_only',
    STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
  } as const,

  // Cache invalidation events
  EVENTS: {
    CLEAR_TICKET: 'support:ticket:clear',
    CLEAR_FAQ: 'support:faq:clear',
    CLEAR_KNOWLEDGE_BASE: 'support:knowledge:clear',
    CLEAR_SESSION: 'support:session:clear',
    CLEAR_CONFIG: 'support:config:clear',
    CLEAR_ANALYTICS: 'support:analytics:clear',
    CLEAR_REPORT: 'support:report:clear',
    CLEAR_ALL: 'support:clear:all',
  } as const,

  // Redis configuration
  REDIS_CONFIG: {
    HOST: 'localhost',
    PORT: 6379,
    PASSWORD: '',
    DB: 0,
    KEY_PREFIX: 'support:',
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

// Cache key builder helper
export const SupportCacheKey = {
  ticket: (id: string): string => `${SupportCache.PREFIXES.TICKET_PREFIX}${id}`,
  user: (id: string): string => `${SupportCache.PREFIXES.USER_PREFIX}${id}`,
  session: (id: string): string => `${SupportCache.PREFIXES.SESSION_PREFIX}${id}`,
  faq: (id: string): string => `${SupportCache.PREFIXES.FAQ_PREFIX}${id}`,
  knowledgeBase: (id: string): string => `${SupportCache.PREFIXES.KNOWLEDGE_BASE_PREFIX}${id}`,
  config: (key: string): string => `${SupportCache.PREFIXES.CONFIG_PREFIX}${key}`,
  analytics: (id: string): string => `${SupportCache.PREFIXES.ANALYTICS_PREFIX}${id}`,
  report: (id: string): string => `${SupportCache.PREFIXES.REPORT_PREFIX}${id}`,
  team: (id: string): string => `${SupportCache.PREFIXES.TEAM_PREFIX}${id}`,
  sla: (id: string): string => `${SupportCache.PREFIXES.SLA_PREFIX}${id}`,
} as const;

// Cache TTL helper
export const SupportCacheTTL = {
  getTTL: (type: keyof typeof SupportCache.TTL): number => {
    return SupportCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },
} as const;

// Cache configuration helper
export const SupportCacheConfig = {
  getEvictionPolicy: (type: keyof typeof SupportCache.EVICTION_POLICY): string => {
    return SupportCache.EVICTION_POLICY[type];
  },
  getRefreshInterval: (type: keyof typeof SupportCache.REFRESH_INTERVAL): number => {
    return SupportCache.REFRESH_INTERVAL[type];
  },
  getMaxSize: (): number => {
    return SupportCache.MAX_SIZE;
  },
  getVersion: (): string => {
    return SupportCache.VERSION;
  },
} as const;
