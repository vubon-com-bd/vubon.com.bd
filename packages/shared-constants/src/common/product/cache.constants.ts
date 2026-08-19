/**
 * Product Cache Constants
 * Contains all caching-related constants for product management
 */

export const ProductCache = {
  // Cache types
  CACHE_TYPE: {
    REDIS: 'redis',
    MEMCACHED: 'memcached',
    IN_MEMORY: 'in_memory',
  } as const,

  // Default TTL (Time To Live) in seconds
  DEFAULT_TTL: {
    PRODUCT_LIST: 300, // 5 minutes
    PRODUCT_DETAIL: 600, // 10 minutes
    PRODUCT_CATEGORY: 1800, // 30 minutes
    PRODUCT_BRAND: 1800, // 30 minutes
    PRODUCT_SEARCH: 120, // 2 minutes
    PRODUCT_PRICE: 60, // 1 minute
    PRODUCT_STOCK: 30, // 30 seconds
    PRODUCT_REVIEW: 900, // 15 minutes
    PRODUCT_RELATED: 600, // 10 minutes
    PRODUCT_ATTRIBUTE: 1800, // 30 minutes
    PRODUCT_ANALYTICS: 3600, // 1 hour
    PRODUCT_COMPARISON: 300, // 5 minutes
    PRODUCT_COLLECTION: 600, // 10 minutes
  } as const,

  // Cache key prefixes
  KEY_PREFIX: {
    PRODUCT: 'product:',
    PRODUCT_LIST: 'product:list:',
    PRODUCT_DETAIL: 'product:detail:',
    PRODUCT_CATEGORY: 'product:category:',
    PRODUCT_BRAND: 'product:brand:',
    PRODUCT_SEARCH: 'product:search:',
    PRODUCT_PRICE: 'product:price:',
    PRODUCT_STOCK: 'product:stock:',
    PRODUCT_REVIEW: 'product:review:',
    PRODUCT_RELATED: 'product:related:',
    PRODUCT_ATTRIBUTE: 'product:attribute:',
    PRODUCT_ANALYTICS: 'product:analytics:',
    PRODUCT_COMPARISON: 'product:comparison:',
    PRODUCT_COLLECTION: 'product:collection:',
  } as const,

  // Cache events
  EVENTS: {
    CLEAR_PRODUCT_CACHE: 'product:cache:clear:single',
    CLEAR_PRODUCT_LIST: 'product:list:clear',
    CLEAR_PRODUCT_DETAIL: 'product:detail:clear',
    CLEAR_PRODUCT_CATEGORY: 'product:category:clear',
    CLEAR_PRODUCT_BRAND: 'product:brand:clear',
    CLEAR_PRODUCT_SEARCH: 'product:search:clear',
    CLEAR_PRODUCT_PRICE: 'product:price:clear',
    CLEAR_PRODUCT_STOCK: 'product:stock:clear',
    CLEAR_PRODUCT_REVIEW: 'product:review:clear',
    CLEAR_PRODUCT_RELATED: 'product:related:clear',
    CLEAR_PRODUCT_ATTRIBUTE: 'product:attribute:clear',
    CLEAR_PRODUCT_ANALYTICS: 'product:analytics:clear',
    CLEAR_PRODUCT_COMPARISON: 'product:comparison:clear',
    CLEAR_PRODUCT_COLLECTION: 'product:collection:clear',
    CLEAR_ALL_PRODUCT_CACHE: 'product:cache:clear:all',
  } as const,

  // Batch cache settings
  BATCH: {
    SIZE: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 100,
      XLARGE: 500,
    } as const,
    DEFAULT_SIZE: 50,
    MAX_SIZE: 1000,
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
    CACHE_FILTERS: true,
  } as const,

  // Cache strategies
  STRATEGIES: {
    CACHE_ASIDE: 'cache_aside',
    READ_THROUGH: 'read_through',
    WRITE_THROUGH: 'write_through',
    WRITE_BEHIND: 'write_behind',
    REFRESH_AHEAD: 'refresh_ahead',
  } as const,

  // Cache invalidation patterns
  INVALIDATION: {
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    MANUAL: 'manual',
    PATTERN_BASED: 'pattern_based',
    TTL_BASED: 'ttl_based',
  } as const,

  // Cache compression
  COMPRESSION: {
    ENABLED: true,
    THRESHOLD: 1024, // 1KB
    ALGORITHM: 'gzip' as const,
  } as const,
} as const;

// Cache key builder helper
export const ProductCacheKey = {
  product: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT}${id}`,
  productList: (params: Record<string, unknown>): string => {
    const query = new URLSearchParams(
      Object.entries(params).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>
      )
    ).toString();
    return `${ProductCache.KEY_PREFIX.PRODUCT_LIST}${query}`;
  },
  productDetail: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_DETAIL}${id}`,
  productCategory: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_CATEGORY}${id}`,
  productBrand: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_BRAND}${id}`,
  productSearch: (query: string): string =>
    `${ProductCache.KEY_PREFIX.PRODUCT_SEARCH}${encodeURIComponent(query)}`,
  productPrice: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_PRICE}${id}`,
  productStock: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_STOCK}${id}`,
  productReview: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_REVIEW}${id}`,
  productRelated: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_RELATED}${id}`,
  productAttribute: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_ATTRIBUTE}${id}`,
  productAnalytics: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_ANALYTICS}${id}`,
  productComparison: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_COMPARISON}${id}`,
  productCollection: (id: string): string => `${ProductCache.KEY_PREFIX.PRODUCT_COLLECTION}${id}`,
  allProducts: (): string => `${ProductCache.KEY_PREFIX.PRODUCT}*`,
  allProductLists: (): string => `${ProductCache.KEY_PREFIX.PRODUCT_LIST}*`,
  allProductDetails: (): string => `${ProductCache.KEY_PREFIX.PRODUCT_DETAIL}*`,
} as const;

// Cache TTL helper
export const ProductCacheTTL = {
  getTTL: (type: keyof typeof ProductCache.DEFAULT_TTL): number => {
    return ProductCache.DEFAULT_TTL[type];
  },
  setCustomTTL: (ttl: number): number => {
    return Math.max(1, Math.min(86400, ttl)); // Max 24 hours, min 1 second
  },
  getTTLSeconds: (minutes: number): number => {
    return minutes * 60;
  },
  getTTLMinutes: (seconds: number): number => {
    return Math.floor(seconds / 60);
  },
} as const;

// Cache stats helper
export const ProductCacheStats = {
  getKeySize: (key: string): number => {
    return Buffer.byteLength(key, 'utf8');
  },
  getValueSize: (value: unknown): number => {
    try {
      return Buffer.byteLength(JSON.stringify(value), 'utf8');
    } catch {
      return 0;
    }
  },
} as const;
