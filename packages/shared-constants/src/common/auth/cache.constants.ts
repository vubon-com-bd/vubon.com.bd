/**
 * @fileoverview Authentication Cache Constants
 * @description Contains all caching-related constants for authentication and authorization
 * @module AuthCache
 */

export const AuthCache = {
  TTL: {
    SHORT: 60,
    MEDIUM: 300,
    LONG: 3600,
    DAY: 86400,
    WEEK: 604800,
    SESSION: 3600,
    USER: 300,
    PERMISSION: 300,
    TOKEN: 300,
    OTP: 300,
    RATE_LIMIT: 60,
    REFRESH_TOKEN: 604800,
    VERIFICATION: 86400,
    RESET_PASSWORD: 3600,
  } as const,

  PREFIX: {
    USER: 'user:',
    SESSION: 'session:',
    TOKEN: 'token:',
    PERMISSION: 'perm:',
    ROLE: 'role:',
    OTP: 'otp:',
    RATE_LIMIT: 'rate:',
    REFRESH_TOKEN: 'refresh:',
    VERIFICATION: 'verify:',
    RESET_PASSWORD: 'reset:',
    CONFIG: 'config:',
    ANALYTICS: 'analytics:',
    API_RESPONSE: 'api:',
  } as const,

  MAX_ITEMS: 10000,
  DEFAULT_TTL: 300,

  STRATEGIES: {
    CACHE_FIRST: 'cache_first',
    NETWORK_FIRST: 'network_first',
    CACHE_ONLY: 'cache_only',
    NETWORK_ONLY: 'network_only',
    STALE_WHILE_REVALIDATE: 'stale_while_revalidate',
  } as const,

  EVICTION_POLICY: {
    LRU: 'lru',
    LFU: 'lfu',
    FIFO: 'fifo',
    TTL: 'ttl',
  } as const,

  EVENTS: {
    CLEAR_USER: 'auth:user:clear',
    CLEAR_SESSION: 'auth:session:clear',
    CLEAR_TOKEN: 'auth:token:clear',
    CLEAR_PERMISSION: 'auth:perm:clear',
    CLEAR_ROLE: 'auth:role:clear',
    CLEAR_OTP: 'auth:otp:clear',
    CLEAR_RATE_LIMIT: 'auth:rate:clear',
    CLEAR_USER_PERMISSIONS: 'auth:user:perms:clear',
    CLEAR_USER_ROLES: 'auth:user:roles:clear',
    CLEAR_USER_SESSIONS: 'auth:user:sessions:clear',
    CLEAR_ALL: 'auth:clear:all',
  } as const,

  REDIS_CONFIG: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: parseInt(process.env.REDIS_PORT || '6379'),
    PASSWORD: process.env.REDIS_PASSWORD || '',
    DB: parseInt(process.env.REDIS_DB || '0'),
    KEY_PREFIX: 'auth:',
    CONNECT_TIMEOUT: 10000,
    MAX_RETRIES_PER_REQUEST: 3,
    ENABLE_READY_CHECK: true,
    ENABLE_AUTO_PIPELINING: true,
    MAX_MEMORY: '1gb',
    EVICTION_POLICY: 'allkeys-lru',
    TLS: process.env.REDIS_TLS === 'true',
    SENTINEL: {
      ENABLED: process.env.REDIS_SENTINEL === 'true',
      MASTER_NAME: process.env.REDIS_SENTINEL_MASTER || 'mymaster',
      SENTINELS: [] as Array<{ host: string; port: number }>,
    },
    CLUSTER: {
      ENABLED: process.env.REDIS_CLUSTER === 'true',
      NODES: [] as Array<{ host: string; port: number }>,
    },
  } as const,

  BATCH: {
    SIZE: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 100,
    } as const,
    DEFAULT_SIZE: 50,
  } as const,

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

export type AuthCacheTTLType = keyof typeof AuthCache.TTL;
export type AuthCachePrefixType = keyof typeof AuthCache.PREFIX;
export type AuthCacheStrategyType = keyof typeof AuthCache.STRATEGIES;
export type AuthCacheEvictionType = keyof typeof AuthCache.EVICTION_POLICY;
export type AuthCacheEventType = keyof typeof AuthCache.EVENTS;
export type AuthCacheBatchSizeType = keyof typeof AuthCache.BATCH.SIZE;

export const AuthCacheKey = {
  user: (id: string): string => `${AuthCache.PREFIX.USER}${id}`,
  session: (id: string): string => `${AuthCache.PREFIX.SESSION}${id}`,
  token: (token: string): string => `${AuthCache.PREFIX.TOKEN}${token}`,
  permission: (id: string): string => `${AuthCache.PREFIX.PERMISSION}${id}`,
  role: (id: string): string => `${AuthCache.PREFIX.ROLE}${id}`,
  otp: (key: string): string => `${AuthCache.PREFIX.OTP}${key}`,
  rateLimit: (key: string): string => `${AuthCache.PREFIX.RATE_LIMIT}${key}`,
  refreshToken: (token: string): string => `${AuthCache.PREFIX.REFRESH_TOKEN}${token}`,
  verification: (token: string): string => `${AuthCache.PREFIX.VERIFICATION}${token}`,
  resetPassword: (token: string): string => `${AuthCache.PREFIX.RESET_PASSWORD}${token}`,
  config: (key: string): string => `${AuthCache.PREFIX.CONFIG}${key}`,
  analytics: (key: string): string => `${AuthCache.PREFIX.ANALYTICS}${key}`,
  apiResponse: (key: string): string => `${AuthCache.PREFIX.API_RESPONSE}${key}`,
  buildKey: (prefix: string, ...parts: string[]): string => {
    return `${prefix}${parts.join(':')}`;
  },
};

export const AuthCacheTTL = {
  getTTL: (type: AuthCacheTTLType): number => {
    return AuthCache.TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(604800, ttl));
  },
  getDefaultTTL: (): number => {
    return AuthCache.DEFAULT_TTL;
  },
};

export const AuthCacheConfig = {
  getPrefix: (type: AuthCachePrefixType): string => {
    return AuthCache.PREFIX[type];
  },
  getMaxItems: (): number => {
    return AuthCache.MAX_ITEMS;
  },
  getStrategy: (type: AuthCacheStrategyType): string => {
    return AuthCache.STRATEGIES[type];
  },
  getEvictionPolicy: (type: AuthCacheEvictionType): string => {
    return AuthCache.EVICTION_POLICY[type];
  },
  getRedisConfig: () => {
    return AuthCache.REDIS_CONFIG;
  },
  getBatchSize: (size: AuthCacheBatchSizeType = 'MEDIUM'): number => {
    return AuthCache.BATCH.SIZE[size] || AuthCache.BATCH.SIZE.MEDIUM;
  },
  getPaginationConfig: () => {
    return AuthCache.PAGINATION;
  },
};

export const AuthCacheEvent = {
  emit: (event: AuthCacheEventType, data?: Record<string, unknown>): void => {
    // Use a logging service instead of console in production
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug(`[AuthCache] Event: ${event}`, data);
    }
  },
  getEventName: (event: AuthCacheEventType): string => {
    return AuthCache.EVENTS[event];
  },
};
