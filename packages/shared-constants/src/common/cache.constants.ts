/**
 * Cache Constants
 * Configuration for caching strategies and TTL (Time To Live)
 */

export const CACHE = {
  // Standard TTLs (in seconds)
  TTL: {
    // Short-lived (seconds)
    SECOND: 1,
    SECONDS_5: 5,
    SECONDS_10: 10,
    SECONDS_30: 30,

    // Minute-based
    MINUTE: 60,
    MINUTES_5: 300,
    MINUTES_10: 600,
    MINUTES_15: 900,
    MINUTES_30: 1800,

    // Hour-based
    HOUR: 3600,
    HOURS_2: 7200,
    HOURS_6: 21600,
    HOURS_12: 43200,

    // Day-based
    DAY: 86400,
    DAYS_2: 172800,
    DAYS_7: 604800,
    DAYS_30: 2592000,

    // Month-based
    MONTH: 2592000,
    MONTHS_3: 7776000,
    MONTHS_6: 15552000,

    // Year-based
    YEAR: 31536000,
  },

  // Cache keys
  KEYS: {
    // Auth
    AUTH_SESSION: 'auth:session',
    AUTH_TOKEN: 'auth:token',
    AUTH_USER: 'auth:user',
    AUTH_PERMISSION: 'auth:permission',

    // User
    USER_PROFILE: 'user:profile',
    USER_SETTINGS: 'user:settings',
    USER_PREFERENCES: 'user:preferences',
    USER_ADDRESS: 'user:address',

    // Product
    PRODUCT_LIST: 'product:list',
    PRODUCT_DETAIL: 'product:detail',
    PRODUCT_CATEGORY: 'product:category',
    PRODUCT_SEARCH: 'product:search',
    PRODUCT_REVIEWS: 'product:reviews',

    // Cart
    CART: 'cart',
    CART_ITEMS: 'cart:items',

    // Order
    ORDER: 'order',
    ORDER_HISTORY: 'order:history',

    // Admin
    ADMIN_SESSION: 'admin:session',
    ADMIN_ACTIVITY: 'admin:activity',

    // AI
    AI_RECOMMENDATION: 'ai:recommendation',
    AI_SEARCH: 'ai:search',
    AI_PERSONALIZATION: 'ai:personalization',

    // SEO
    SEO_META: 'seo:meta',
    SEO_SITEMAP: 'seo:sitemap',
    SEO_RANKING: 'seo:ranking',

    // Analytics
    ANALYTICS_DAILY: 'analytics:daily',
    ANALYTICS_WEEKLY: 'analytics:weekly',
    ANALYTICS_MONTHLY: 'analytics:monthly',

    // Config
    CONFIG: 'config',
    SETTINGS: 'settings',
    FEATURES: 'features',

    // Cache control
    CACHE_VERSION: 'cache:version',
    CACHE_FLUSH: 'cache:flush',
  },

  // Cache control headers
  HEADERS: {
    NO_CACHE: 'no-cache',
    NO_STORE: 'no-store',
    MUST_REVALIDATE: 'must-revalidate',
    PUBLIC: 'public',
    PRIVATE: 'private',
    PROXY_REVALIDATE: 'proxy-revalidate',
  },

  // Cache policies
  POLICIES: {
    // Static assets (1 year)
    STATIC: {
      maxAge: 31536000,
      staleWhileRevalidate: 86400,
    },

    // API responses (5 minutes)
    API: {
      maxAge: 300,
      staleWhileRevalidate: 60,
    },

    // User sessions (1 hour)
    SESSION: {
      maxAge: 3600,
      staleWhileRevalidate: 300,
    },

    // Real-time data (30 seconds)
    REALTIME: {
      maxAge: 30,
      staleWhileRevalidate: 5,
    },

    // User-specific data (15 minutes)
    USER_DATA: {
      maxAge: 900,
      staleWhileRevalidate: 60,
    },

    // Public data (1 hour)
    PUBLIC_DATA: {
      maxAge: 3600,
      staleWhileRevalidate: 300,
    },

    // Search results (10 minutes)
    SEARCH: {
      maxAge: 600,
      staleWhileRevalidate: 60,
    },

    // Product listings (15 minutes)
    PRODUCT_LISTING: {
      maxAge: 900,
      staleWhileRevalidate: 120,
    },
  },
} as const;

export type CacheTTL = (typeof CACHE.TTL)[keyof typeof CACHE.TTL];
export type CacheKey = (typeof CACHE.KEYS)[keyof typeof CACHE.KEYS];
export type CachePolicy = (typeof CACHE.POLICIES)[keyof typeof CACHE.POLICIES];

export function getCacheTTL(ttl: keyof typeof CACHE.TTL): number {
  return CACHE.TTL[ttl];
}

export function buildCacheKey(prefix: string, ...parts: string[]): string {
  return [prefix, ...parts].join(':');
}

export function getCachePolicy(name: keyof typeof CACHE.POLICIES): CachePolicy {
  return CACHE.POLICIES[name];
}

export function getCacheControlHeader(policy: CachePolicy): string {
  return `max-age=${policy.maxAge}, stale-while-revalidate=${policy.staleWhileRevalidate}`;
}

export function generateETag(data: unknown): string {
  const jsonString = JSON.stringify(data);
  return `"${Buffer.from(jsonString).toString('base64').slice(0, 16)}"`;
}

export function shouldBypassCache(ttl: number, lastUpdated: Date): boolean {
  const age = (Date.now() - lastUpdated.getTime()) / 1000;
  return age > ttl;
}

export function getCacheTTLFromRefreshInterval(refreshIntervalMinutes: number): number {
  return refreshIntervalMinutes * 60;
}

export function getCacheKeyForUser(userId: string, resource: string): string {
  return buildCacheKey(resource, userId);
}

export function getCacheKeyForPaginatedList(resource: string, page: number, limit: number): string {
  return buildCacheKey(resource, `${page}`, `${limit}`);
}

export function getCacheKeyWithFilters(
  resource: string,
  filters: Record<string, string | number | boolean>
): string {
  const filterString = Object.entries(filters)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join(':');

  return buildCacheKey(resource, filterString);
}
