export const CACHE_TTL = {
  ONE_MINUTE: 60,
  FIVE_MINUTES: 300,
  FIFTEEN_MINUTES: 900,
  THIRTY_MINUTES: 1800,
  ONE_HOUR: 3600,
  SIX_HOURS: 21600,
  TWELVE_HOURS: 43200,
  ONE_DAY: 86400,
  SEVEN_DAYS: 604800,
  THIRTY_DAYS: 2592000,
} as const;

export const CACHE_PREFIX = {
  USER: 'user:',
  PRODUCT: 'product:',
  CART: 'cart:',
  ORDER: 'order:',
  SESSION: 'session:',
  TOKEN: 'token:',
  OTP: 'otp:',
  RATE_LIMIT: 'rate:',
  PERMISSION: 'perm:',
  CONFIG: 'config:',
} as const;

export const CACHE_STRATEGY = {
  WRITE_THROUGH: 'write_through',
  WRITE_BEHIND: 'write_behind',
  CACHE_ASIDE: 'cache_aside',
  READ_THROUGH: 'read_through',
} as const;

export const CACHE_EVICTION = {
  LRU: 'lru',
  LFU: 'lfu',
  FIFO: 'fifo',
  TTL: 'ttl',
} as const;

export const CACHE_LIMIT = {
  MAX_KEYS: 10000,
  MAX_MEMORY_MB: 512,
} as const;

export type CacheTtlType = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];
export type CachePrefixType = (typeof CACHE_PREFIX)[keyof typeof CACHE_PREFIX];
