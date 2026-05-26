/**
 * API Constants - Pure immutable API configuration
 * Enterprise Grade for vubon.com.bd
 * 
 * @module shared-constants/auth-constants/api.constants
 * 
 * RULES:
 * ✅ NO axios instances, API calls, fetch requests
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ NO direct process.env (use ENV_CONFIG for that)
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// API Versioning
// ============================================================
export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2',
  V3: 'v3',
  LATEST: 'v1',
} as const;

export type APIVersion = ValueOf<typeof API_VERSIONS>;

// ============================================================
// API Route Base Prefixes
// ============================================================
export const API_PREFIXES = {
  REST: '/api',
  GRAPHQL: '/graphql',
  WEBSOCKET: '/ws',
  WEBHOOK: '/webhook',
  HEALTH: '/health',
  METRICS: '/metrics',
  ADMIN: '/admin',
  PARTNER: '/partner',
} as const;

export type APIPrefix = ValueOf<typeof API_PREFIXES>;

// ============================================================
// Resource Names (Used for building routes - no hardcoding)
// ============================================================
export const API_RESOURCES = {
  AUTH: 'auth',
  USERS: 'users',
  PROFILE: 'profile',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  ORDERS: 'orders',
  CART: 'cart',
  WISHLIST: 'wishlist',
  CHECKOUT: 'checkout',
  PAYMENTS: 'payments',
  SHIPPING: 'shipping',
  REVIEWS: 'reviews',
  INVENTORY: 'inventory',
  COUPONS: 'coupons',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
  REPORTS: 'reports',
  EXPORTS: 'exports',
  IMPORTS: 'imports',
  BULK: 'bulk',
  WEBHOOKS: 'webhooks',
  SETTINGS: 'settings',
  STORE: 'store',
  VENDORS: 'vendors',
  REFUNDS: 'refunds',
  RETURNS: 'returns',
} as const;

export type APIResource = ValueOf<typeof API_RESOURCES>;

// ============================================================
// Environment Configuration (Safe wrapper for process.env)
// ============================================================
export const ENV_CONFIG = {
  NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

// ============================================================
// Full API Routes (Dynamic - no hardcoded strings)
// ============================================================
const REST_V1 = `${API_PREFIXES.REST}/${API_VERSIONS.V1}`;
const ADMIN_BASE = API_PREFIXES.ADMIN;
const WEBHOOK_BASE = API_PREFIXES.WEBHOOK;

export const API_ROUTES = {
  // Health & Monitoring
  HEALTH: API_PREFIXES.HEALTH,
  READINESS: `${API_PREFIXES.HEALTH}/readiness`,
  LIVENESS: `${API_PREFIXES.HEALTH}/liveness`,
  METRICS: API_PREFIXES.METRICS,

  // Auth Routes
  AUTH: REST_V1,
  AUTH_LOGIN: `${REST_V1}/login`,
  AUTH_LOGOUT: `${REST_V1}/logout`,
  AUTH_REGISTER: `${REST_V1}/register`,
  AUTH_REFRESH: `${REST_V1}/refresh`,
  AUTH_FORGOT_PASSWORD: `${REST_V1}/forgot-password`,
  AUTH_RESET_PASSWORD: `${REST_V1}/reset-password`,
  AUTH_VERIFY_EMAIL: `${REST_V1}/verify-email`,
  AUTH_SEND_OTP: `${REST_V1}/send-otp`,
  AUTH_VERIFY_OTP: `${REST_V1}/verify-otp`,

  // User Routes
  USERS: `${REST_V1}/${API_RESOURCES.USERS}`,
  USER_PROFILE: `${REST_V1}/${API_RESOURCES.USERS}/profile`,
  USER_ADDRESSES: `${REST_V1}/${API_RESOURCES.USERS}/addresses`,
  USER_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.USERS}/${id}`,

  // Product Routes
  PRODUCTS: `${REST_V1}/${API_RESOURCES.PRODUCTS}`,
  PRODUCT_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.PRODUCTS}/${id}`,
  PRODUCT_BY_SLUG: (slug: string) => `${REST_V1}/${API_RESOURCES.PRODUCTS}/slug/${slug}`,
  PRODUCT_RELATED: (id: string | number) => `${REST_V1}/${API_RESOURCES.PRODUCTS}/${id}/related`,
  PRODUCT_SEARCH: `${REST_V1}/${API_RESOURCES.PRODUCTS}/search`,
  PRODUCT_COMPARE: `${REST_V1}/${API_RESOURCES.PRODUCTS}/compare`,

  // Category Routes
  CATEGORIES: `${REST_V1}/${API_RESOURCES.CATEGORIES}`,
  CATEGORY_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.CATEGORIES}/${id}`,
  CATEGORY_BY_SLUG: (slug: string) => `${REST_V1}/${API_RESOURCES.CATEGORIES}/slug/${slug}`,
  CATEGORY_TREE: `${REST_V1}/${API_RESOURCES.CATEGORIES}/tree`,
  CATEGORY_PRODUCTS: (id: string | number) => `${REST_V1}/${API_RESOURCES.CATEGORIES}/${id}/products`,

  // Brand Routes
  BRANDS: `${REST_V1}/${API_RESOURCES.BRANDS}`,
  BRAND_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.BRANDS}/${id}`,

  // Cart Routes
  CART: `${REST_V1}/${API_RESOURCES.CART}`,
  CART_ITEMS: `${REST_V1}/${API_RESOURCES.CART}/items`,
  CART_ITEM_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.CART}/items/${id}`,
  CART_COUPON: `${REST_V1}/${API_RESOURCES.CART}/coupon`,
  CART_CLEAR: `${REST_V1}/${API_RESOURCES.CART}/clear`,

  // Wishlist Routes
  WISHLIST: `${REST_V1}/${API_RESOURCES.WISHLIST}`,
  WISHLIST_ADD: `${REST_V1}/${API_RESOURCES.WISHLIST}/add`,
  WISHLIST_REMOVE: (id: string | number) => `${REST_V1}/${API_RESOURCES.WISHLIST}/${id}`,

  // Checkout Routes
  CHECKOUT: `${REST_V1}/${API_RESOURCES.CHECKOUT}`,
  CHECKOUT_SHIPPING: `${REST_V1}/${API_RESOURCES.CHECKOUT}/shipping`,
  CHECKOUT_PAYMENT: `${REST_V1}/${API_RESOURCES.CHECKOUT}/payment`,
  CHECKOUT_CONFIRM: `${REST_V1}/${API_RESOURCES.CHECKOUT}/confirm`,

  // Order Routes
  ORDERS: `${REST_V1}/${API_RESOURCES.ORDERS}`,
  ORDER_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.ORDERS}/${id}`,
  ORDER_TRACKING: (id: string | number) => `${REST_V1}/${API_RESOURCES.ORDERS}/${id}/tracking`,
  ORDER_INVOICE: (id: string | number) => `${REST_V1}/${API_RESOURCES.ORDERS}/${id}/invoice`,
  ORDER_CANCEL: (id: string | number) => `${REST_V1}/${API_RESOURCES.ORDERS}/${id}/cancel`,

  // Payment Routes
  PAYMENTS: `${REST_V1}/${API_RESOURCES.PAYMENTS}`,
  PAYMENT_METHODS: `${REST_V1}/${API_RESOURCES.PAYMENTS}/methods`,
  PAYMENT_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.PAYMENTS}/${id}`,
  PAYMENT_VERIFY: (id: string | number) => `${REST_V1}/${API_RESOURCES.PAYMENTS}/${id}/verify`,
  PAYMENT_CALLBACK: `${REST_V1}/${API_RESOURCES.PAYMENTS}/callback`,

  // Shipping Routes
  SHIPPING: `${REST_V1}/${API_RESOURCES.SHIPPING}`,
  SHIPPING_COST: `${REST_V1}/${API_RESOURCES.SHIPPING}/cost`,
  SHIPPING_ZONES: `${REST_V1}/${API_RESOURCES.SHIPPING}/zones`,

  // Review Routes
  REVIEWS: `${REST_V1}/${API_RESOURCES.REVIEWS}`,
  REVIEW_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.REVIEWS}/${id}`,
  PRODUCT_REVIEWS: (productId: string | number) => `${REST_V1}/${API_RESOURCES.PRODUCTS}/${productId}/reviews`,

  // Inventory Routes
  INVENTORY: `${REST_V1}/${API_RESOURCES.INVENTORY}`,
  INVENTORY_STOCK: `${REST_V1}/${API_RESOURCES.INVENTORY}/stock`,
  INVENTORY_BY_PRODUCT: (productId: string | number) => `${REST_V1}/${API_RESOURCES.INVENTORY}/product/${productId}`,

  // Coupon Routes
  COUPONS: `${REST_V1}/${API_RESOURCES.COUPONS}`,
  COUPON_BY_CODE: (code: string) => `${REST_V1}/${API_RESOURCES.COUPONS}/code/${code}`,
  COUPON_VALIDATE: `${REST_V1}/${API_RESOURCES.COUPONS}/validate`,

  // Notification Routes
  NOTIFICATIONS: `${REST_V1}/${API_RESOURCES.NOTIFICATIONS}`,
  NOTIFICATION_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.NOTIFICATIONS}/${id}`,
  NOTIFICATION_MARK_READ: (id: string | number) => `${REST_V1}/${API_RESOURCES.NOTIFICATIONS}/${id}/read`,

  // Analytics Routes
  ANALYTICS: `${REST_V1}/${API_RESOURCES.ANALYTICS}`,
  ANALYTICS_SALES: `${REST_V1}/${API_RESOURCES.ANALYTICS}/sales`,
  ANALYTICS_VISITORS: `${REST_V1}/${API_RESOURCES.ANALYTICS}/visitors`,

  // Report Routes
  REPORTS: `${REST_V1}/${API_RESOURCES.REPORTS}`,
  REPORT_BY_TYPE: (type: string) => `${REST_V1}/${API_RESOURCES.REPORTS}/${type}`,

  // Export/Import Routes
  EXPORTS: `${REST_V1}/${API_RESOURCES.EXPORTS}`,
  EXPORT_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.EXPORTS}/${id}`,
  IMPORTS: `${REST_V1}/${API_RESOURCES.IMPORTS}`,
  IMPORT_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.IMPORTS}/${id}`,

  // Bulk Operations
  BULK: `${REST_V1}/${API_RESOURCES.BULK}`,
  BULK_PRODUCTS: `${REST_V1}/${API_RESOURCES.BULK}/products`,
  BULK_ORDERS: `${REST_V1}/${API_RESOURCES.BULK}/orders`,

  // Webhook Routes (Payment Gateways - Bangladesh)
  WEBHOOKS: WEBHOOK_BASE,
  WEBHOOK_SSLCOMMERZ: `${WEBHOOK_BASE}/sslcommerz`,
  WEBHOOK_STRIPE: `${WEBHOOK_BASE}/stripe`,
  WEBHOOK_NAGAD: `${WEBHOOK_BASE}/nagad`,
  WEBHOOK_BKASH: `${WEBHOOK_BASE}/bkash`,
  WEBHOOK_ROCKET: `${WEBHOOK_BASE}/rocket`,
  WEBHOOK_SHIPMENT: `${WEBHOOK_BASE}/shipment`,

  // Admin Routes
  ADMIN: ADMIN_BASE,
  ADMIN_DASHBOARD: `${ADMIN_BASE}/dashboard`,
  ADMIN_USERS: `${ADMIN_BASE}/users`,
  ADMIN_USER_BY_ID: (id: string | number) => `${ADMIN_BASE}/users/${id}`,
  ADMIN_PRODUCTS: `${ADMIN_BASE}/products`,
  ADMIN_PRODUCT_BY_ID: (id: string | number) => `${ADMIN_BASE}/products/${id}`,
  ADMIN_ORDERS: `${ADMIN_BASE}/orders`,
  ADMIN_ORDER_BY_ID: (id: string | number) => `${ADMIN_BASE}/orders/${id}`,
  ADMIN_SETTINGS: `${ADMIN_BASE}/settings`,

  // Vendor/Partner Routes (Multi-vendor e-commerce)
  VENDORS: `${REST_V1}/${API_RESOURCES.VENDORS}`,
  VENDOR_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.VENDORS}/${id}`,
  VENDOR_PRODUCTS: (vendorId: string | number) => `${REST_V1}/${API_RESOURCES.VENDORS}/${vendorId}/products`,
  VENDOR_ORDERS: (vendorId: string | number) => `${REST_V1}/${API_RESOURCES.VENDORS}/${vendorId}/orders`,
  VENDOR_REVENUE: (vendorId: string | number) => `${REST_V1}/${API_RESOURCES.VENDORS}/${vendorId}/revenue`,

  // Refund & Return Routes
  REFUNDS: `${REST_V1}/${API_RESOURCES.REFUNDS}`,
  REFUND_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.REFUNDS}/${id}`,
  RETURNS: `${REST_V1}/${API_RESOURCES.RETURNS}`,
  RETURN_BY_ID: (id: string | number) => `${REST_V1}/${API_RESOURCES.RETURNS}/${id}`,
} as const;

export type APIRoute = ValueOf<typeof API_ROUTES>;

// ============================================================
// Client Side Routes (SEO friendly - no /api prefix)
// ============================================================
export const CLIENT_ROUTES = {
  HOME: '/',
  PRODUCTS: `/${API_RESOURCES.PRODUCTS}`,
  PRODUCT_DETAILS: (slug: string) => `/${API_RESOURCES.PRODUCTS}/${slug}`,
  CATEGORIES: `/${API_RESOURCES.CATEGORIES}`,
  CATEGORY_DETAILS: (slug: string) => `/${API_RESOURCES.CATEGORIES}/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  ORDER_DETAILS: (id: string | number) => `/orders/${id}`,
  PROFILE: '/profile',
  WISHLIST: '/wishlist',
  SEARCH: '/search',
  OFFERS: '/offers',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
} as const;

export type ClientRoute = ValueOf<typeof CLIENT_ROUTES>;

// ============================================================
// Pagination Defaults
// ============================================================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
  MAX_LIMIT_ADMIN: 500,
  INFINITE_SCROLL_THRESHOLD: 3,
} as const;

export type PaginationConfig = typeof PAGINATION;

// ============================================================
// HTTP Header Names (Standard + Bangladesh e-commerce specific)
// ============================================================
export const API_HEADERS = {
  // Request tracing
  REQUEST_ID: 'x-request-id',
  CORRELATION_ID: 'x-correlation-id',
  TRACE_ID: 'x-trace-id',
  SPAN_ID: 'x-span-id',

  // Client info
  USER_AGENT: 'user-agent',
  ACCEPT: 'accept',
  CONTENT_TYPE: 'content-type',
  CONTENT_LENGTH: 'content-length',
  ORIGIN: 'origin',
  REFERER: 'referer',

  // Proxy/Forwarding
  FORWARDED_FOR: 'x-forwarded-for',
  FORWARDED_PROTO: 'x-forwarded-proto',
  REAL_IP: 'x-real-ip',
  COUNTRY_CODE: 'x-country-code',

  // API Versioning
  API_VERSION: 'x-api-version',

  // Rate limiting
  RATE_LIMIT_REMAINING: 'x-rate-limit-remaining',
  RATE_LIMIT_RESET: 'x-rate-limit-reset',
  RATE_LIMIT_LIMIT: 'x-rate-limit-limit',
  RATE_LIMIT_RETRY_AFTER: 'retry-after',

  // E-commerce specific (Bangladesh)
  CURRENCY: 'x-currency',
  LOCALE: 'x-locale',
  STORE_ID: 'x-store-id',
  VENDOR_ID: 'x-vendor-id',
  SESSION_ID: 'x-session-id',
  DEVICE_TYPE: 'x-device-type', // mobile, tablet, desktop

  // Security
  CSP: 'content-security-policy',
  HSTS: 'strict-transport-security',
  XSS_PROTECTION: 'x-xss-protection',
  CSRF_TOKEN: 'x-csrf-token',

  // Cache
  CACHE_CONTROL: 'cache-control',
  ETAG: 'etag',

  // CORS
  ACCESS_CONTROL_ALLOW_ORIGIN: 'access-control-allow-origin',
} as const;

export type APIHeader = ValueOf<typeof API_HEADERS>;

// ============================================================
// Query Parameter Names (SEO friendly)
// ============================================================
export const API_QUERY_PARAMS = {
  // Core pagination
  PAGE: 'page',
  LIMIT: 'limit',
  OFFSET: 'offset',

  // Sorting (simplified - no duplicates)
  SORT_BY: 'sort_by',
  SORT_ORDER: 'sort_order',

  // Search & Filter
  SEARCH: 'search',
  Q: 'q',
  QUERY: 'query',
  FILTER: 'filter',
  CATEGORY: 'category',
  CATEGORY_SLUG: 'category_slug',
  BRAND: 'brand',
  PRICE_MIN: 'price_min',
  PRICE_MAX: 'price_max',
  RATING: 'rating',
  IN_STOCK: 'in_stock',
  DISCOUNT: 'discount',

  // Response customization
  INCLUDE: 'include',
  FIELDS: 'fields',
  EMBED: 'embed',
  EXPAND: 'expand',

  // Date filtering
  FROM_DATE: 'from_date',
  TO_DATE: 'to_date',
  DATE_RANGE: 'date_range',

  // SEO & URL building
  SLUG: 'slug',
  REF: 'ref',
  UTM_SOURCE: 'utm_source',
  UTM_MEDIUM: 'utm_medium',
  UTM_CAMPAIGN: 'utm_campaign',
  UTM_TERM: 'utm_term',
  UTM_CONTENT: 'utm_content',
} as const;

export type APIQueryParam = ValueOf<typeof API_QUERY_PARAMS>;

// ============================================================
// Sort Order Values (clean - no duplicates)
// ============================================================
export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrder = ValueOf<typeof SORT_ORDERS>;

// ============================================================
// Sort Field Options (common sorting fields)
// ============================================================
export const SORT_FIELDS = {
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  NAME: 'name',
  PRICE: 'price',
  RATING: 'rating',
  SALES: 'sales',
  POPULARITY: 'popularity',
  NEWEST: 'newest',
} as const;

export type SortField = ValueOf<typeof SORT_FIELDS>;

// ============================================================
// Response Status Messages
// ============================================================
export const API_RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type APIResponseStatus = ValueOf<typeof API_RESPONSE_STATUS>;

// ============================================================
// API Error Codes (Enterprise standard)
// ============================================================
export const API_ERROR_CODES = {
  // Client errors (4xx)
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  CONFLICT: 'CONFLICT',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',

  // Business logic errors (E-commerce specific)
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  INVALID_COUPON: 'INVALID_COUPON',
  COUPON_EXPIRED: 'COUPON_EXPIRED',
  COUPON_USAGE_LIMIT: 'COUPON_USAGE_LIMIT',
  COUPON_MINIMUM_ORDER: 'COUPON_MINIMUM_ORDER',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  ORDER_CANNOT_CANCEL: 'ORDER_CANNOT_CANCEL',
  SHIPPING_NOT_AVAILABLE: 'SHIPPING_NOT_AVAILABLE',
  PRODUCT_NOT_AVAILABLE: 'PRODUCT_NOT_AVAILABLE',
  CART_EMPTY: 'CART_EMPTY',
  DUPLICATE_ORDER: 'DUPLICATE_ORDER',
  REFUND_NOT_ALLOWED: 'REFUND_NOT_ALLOWED',

  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  ACCOUNT_NOT_VERIFIED: 'ACCOUNT_NOT_VERIFIED',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  PHONE_ALREADY_EXISTS: 'PHONE_ALREADY_EXISTS',

  // Server errors (5xx)
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  CACHE_ERROR: 'CACHE_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',

  // Third-party errors
  PAYMENT_GATEWAY_ERROR: 'PAYMENT_GATEWAY_ERROR',
  SMS_GATEWAY_ERROR: 'SMS_GATEWAY_ERROR',
  EMAIL_GATEWAY_ERROR: 'EMAIL_GATEWAY_ERROR',
  SHIPPING_PARTNER_ERROR: 'SHIPPING_PARTNER_ERROR',
} as const;

export type APIErrorCode = ValueOf<typeof API_ERROR_CODES>;

// ============================================================
// API Rate Limit Keys
// ============================================================
export const API_RATE_LIMITS = {
  // Public endpoints
  PUBLIC_READ: 'public:read',
  PUBLIC_WRITE: 'public:write',
  
  // Auth endpoints
  AUTH_READ: 'auth:read',
  AUTH_WRITE: 'auth:write',
  LOGIN: 'auth:login',
  REGISTER: 'auth:register',
  RESET_PASSWORD: 'auth:reset_password',
  OTP_SEND: 'auth:otp_send',
  OTP_VERIFY: 'auth:otp_verify',
  
  // Admin endpoints
  ADMIN_READ: 'admin:read',
  ADMIN_WRITE: 'admin:write',
  
  // E-commerce specific
  CHECKOUT: 'checkout',
  PAYMENT: 'payment',
  SEARCH: 'search',
  ORDER_CREATE: 'order:create',
  REVIEW_CREATE: 'review:create',
} as const;

export type APIRateLimitKey = ValueOf<typeof API_RATE_LIMITS>;

// ============================================================
// Default Rate Limit Values (requests per timeframe)
// ============================================================
export const RATE_LIMIT_VALUES = {
  PUBLIC_READ: { points: 100, duration: 60 },     // 100 req/min
  PUBLIC_WRITE: { points: 50, duration: 60 },     // 50 req/min
  AUTH_READ: { points: 30, duration: 60 },        // 30 req/min
  AUTH_WRITE: { points: 10, duration: 60 },       // 10 req/min
  LOGIN: { points: 5, duration: 60 },             // 5 login attempts/min
  OTP_SEND: { points: 3, duration: 60 },          // 3 OTP requests/min
  CHECKOUT: { points: 10, duration: 60 },         // 10 checkouts/min
  PAYMENT: { points: 5, duration: 60 },           // 5 payment attempts/min
  SEARCH: { points: 30, duration: 60 },           // 30 searches/min
  ADMIN_READ: { points: 200, duration: 60 },      // 200 req/min for admin
  ADMIN_WRITE: { points: 100, duration: 60 },     // 100 req/min for admin
} as const;

// ============================================================
// Supported Currencies (Bangladesh focused)
// ============================================================
export const SUPPORTED_CURRENCIES = {
  BDT: 'BDT',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
} as const;

export type Currency = ValueOf<typeof SUPPORTED_CURRENCIES>;

// ============================================================
// Supported Locales
// ============================================================
export const SUPPORTED_LOCALES = {
  BN: 'bn-BD',  // Bengali (Bangladesh)
  EN: 'en-US',  // English (US)
} as const;

export type Locale = ValueOf<typeof SUPPORTED_LOCALES>;

// ============================================================
// HTTP Status Codes (for reference)
// ============================================================
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HTTPStatus = ValueOf<typeof HTTP_STATUS>;

// ============================================================
// Freeze everything for immutability (deep freeze)
// ============================================================
const deepFreeze = <T>(obj: T): ReadonlyDeep<T> => {
  Object.freeze(obj);
  if (obj === null || typeof obj !== 'object') return obj as ReadonlyDeep<T>;
  
  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  
  return obj as ReadonlyDeep<T>;
};

// Apply deep freeze to all exported objects
export const __ALL_CONSTANTS_FROZEN__ = deepFreeze({
  API_VERSIONS,
  API_PREFIXES,
  API_RESOURCES,
  ENV_CONFIG,
  API_ROUTES,
  CLIENT_ROUTES,
  PAGINATION,
  API_HEADERS,
  API_QUERY_PARAMS,
  SORT_ORDERS,
  SORT_FIELDS,
  API_RESPONSE_STATUS,
  API_ERROR_CODES,
  API_RATE_LIMITS,
  RATE_LIMIT_VALUES,
  SUPPORTED_CURRENCIES,
  SUPPORTED_LOCALES,
  HTTP_STATUS,
});
