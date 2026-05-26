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
 * ✅ NO process.env
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// API Versioning
// ============================================================
export const API_VERSIONS = Object.freeze({
  V1: 'v1',
  V2: 'v2',
  V3: 'v3',
  LATEST: 'v1',
} as const);

// ============================================================
// API Route Base Prefixes
// ============================================================
export const API_PREFIXES = Object.freeze({
  REST: '/api',
  GRAPHQL: '/graphql',
  WEBSOCKET: '/ws',
  WEBHOOK: '/webhook',
  HEALTH: '/health',
  METRICS: '/metrics',
  ADMIN: '/admin',
  PARTNER: '/partner',
} as const);

// ============================================================
// Resource Names (Used for building routes - no hardcoding)
// ============================================================
export const API_RESOURCES = Object.freeze({
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
} as const);

// ============================================================
// Full API Routes (Dynamic - no hardcoded strings)
// ============================================================
const REST_V1 = `${API_PREFIXES.REST}/${API_VERSIONS.V1}`;

export const API_ROUTES = Object.freeze({
  // Health & Monitoring
  HEALTH: `${API_PREFIXES.HEALTH}`,
  READINESS: `${API_PREFIXES.HEALTH}/readiness`,
  LIVENESS: `${API_PREFIXES.HEALTH}/liveness`,
  METRICS: `${API_PREFIXES.METRICS}`,
  
  // Auth Routes
  AUTH: `${REST_V1}/${API_RESOURCES.AUTH}`,
  AUTH_LOGIN: `${REST_V1}/${API_RESOURCES.AUTH}/login`,
  AUTH_LOGOUT: `${REST_V1}/${API_RESOURCES.AUTH}/logout`,
  AUTH_REGISTER: `${REST_V1}/${API_RESOURCES.AUTH}/register`,
  AUTH_REFRESH: `${REST_V1}/${API_RESOURCES.AUTH}/refresh`,
  AUTH_FORGOT_PASSWORD: `${REST_V1}/${API_RESOURCES.AUTH}/forgot-password`,
  AUTH_RESET_PASSWORD: `${REST_V1}/${API_RESOURCES.AUTH}/reset-password`,
  AUTH_VERIFY_EMAIL: `${REST_V1}/${API_RESOURCES.AUTH}/verify-email`,
  AUTH_SEND_OTP: `${REST_V1}/${API_RESOURCES.AUTH}/send-otp`,
  AUTH_VERIFY_OTP: `${REST_V1}/${API_RESOURCES.AUTH}/verify-otp`,
  
  // User Routes
  USERS: `${REST_V1}/${API_RESOURCES.USERS}`,
  USER_PROFILE: `${REST_V1}/${API_RESOURCES.USERS}/${API_RESOURCES.PROFILE}`,
  USER_ADDRESSES: `${REST_V1}/${API_RESOURCES.USERS}/addresses`,
  
  // Product Routes
  PRODUCTS: `${REST_V1}/${API_RESOURCES.PRODUCTS}`,
  PRODUCT_BY_SLUG: `${REST_V1}/${API_RESOURCES.PRODUCTS}/slug`,
  PRODUCT_RELATED: `${REST_V1}/${API_RESOURCES.PRODUCTS}/related`,
  PRODUCT_SEARCH: `${REST_V1}/${API_RESOURCES.PRODUCTS}/search`,
  PRODUCT_COMPARE: `${REST_V1}/${API_RESOURCES.PRODUCTS}/compare`,
  
  // Category Routes
  CATEGORIES: `${REST_V1}/${API_RESOURCES.CATEGORIES}`,
  CATEGORY_TREE: `${REST_V1}/${API_RESOURCES.CATEGORIES}/tree`,
  CATEGORY_PRODUCTS: `${REST_V1}/${API_RESOURCES.CATEGORIES}/products`,
  
  // Brand Routes
  BRANDS: `${REST_V1}/${API_RESOURCES.BRANDS}`,
  
  // Cart Routes (E-commerce critical)
  CART: `${REST_V1}/${API_RESOURCES.CART}`,
  CART_ITEMS: `${REST_V1}/${API_RESOURCES.CART}/items`,
  CART_COUPON: `${REST_V1}/${API_RESOURCES.CART}/coupon`,
  
  // Wishlist Routes
  WISHLIST: `${REST_V1}/${API_RESOURCES.WISHLIST}`,
  
  // Checkout Routes
  CHECKOUT: `${REST_V1}/${API_RESOURCES.CHECKOUT}`,
  CHECKOUT_SHIPPING: `${REST_V1}/${API_RESOURCES.CHECKOUT}/shipping`,
  CHECKOUT_PAYMENT: `${REST_V1}/${API_RESOURCES.CHECKOUT}/payment`,
  CHECKOUT_CONFIRM: `${REST_V1}/${API_RESOURCES.CHECKOUT}/confirm`,
  
  // Order Routes
  ORDERS: `${REST_V1}/${API_RESOURCES.ORDERS}`,
  ORDER_TRACKING: `${REST_V1}/${API_RESOURCES.ORDERS}/tracking`,
  ORDER_INVOICE: `${REST_V1}/${API_RESOURCES.ORDERS}/invoice`,
  ORDER_CANCEL: `${REST_V1}/${API_RESOURCES.ORDERS}/cancel`,
  
  // Payment Routes
  PAYMENTS: `${REST_V1}/${API_RESOURCES.PAYMENTS}`,
  PAYMENT_METHODS: `${REST_V1}/${API_RESOURCES.PAYMENTS}/methods`,
  PAYMENT_VERIFY: `${REST_V1}/${API_RESOURCES.PAYMENTS}/verify`,
  PAYMENT_CALLBACK: `${REST_V1}/${API_RESOURCES.PAYMENTS}/callback`,
  
  // Shipping Routes
  SHIPPING: `${REST_V1}/${API_RESOURCES.SHIPPING}`,
  SHIPPING_COST: `${REST_V1}/${API_RESOURCES.SHIPPING}/cost`,
  SHIPPING_ZONES: `${REST_V1}/${API_RESOURCES.SHIPPING}/zones`,
  
  // Review Routes
  REVIEWS: `${REST_V1}/${API_RESOURCES.REVIEWS}`,
  
  // Inventory Routes
  INVENTORY: `${REST_V1}/${API_RESOURCES.INVENTORY}`,
  INVENTORY_STOCK: `${REST_V1}/${API_RESOURCES.INVENTORY}/stock`,
  
  // Coupon Routes
  COUPONS: `${REST_V1}/${API_RESOURCES.COUPONS}`,
  COUPON_VALIDATE: `${REST_V1}/${API_RESOURCES.COUPONS}/validate`,
  
  // Notification Routes
  NOTIFICATIONS: `${REST_V1}/${API_RESOURCES.NOTIFICATIONS}`,
  
  // Analytics Routes
  ANALYTICS: `${REST_V1}/${API_RESOURCES.ANALYTICS}`,
  ANALYTICS_SALES: `${REST_V1}/${API_RESOURCES.ANALYTICS}/sales`,
  ANALYTICS_VISITORS: `${REST_V1}/${API_RESOURCES.ANALYTICS}/visitors`,
  
  // Report Routes
  REPORTS: `${REST_V1}/${API_RESOURCES.REPORTS}`,
  
  // Export/Import Routes
  EXPORTS: `${REST_V1}/${API_RESOURCES.EXPORTS}`,
  IMPORTS: `${REST_V1}/${API_RESOURCES.IMPORTS}`,
  
  // Bulk Operations
  BULK: `${REST_V1}/${API_RESOURCES.BULK}`,
  BULK_PRODUCTS: `${REST_V1}/${API_RESOURCES.BULK}/${API_RESOURCES.PRODUCTS}`,
  BULK_ORDERS: `${REST_V1}/${API_RESOURCES.BULK}/${API_RESOURCES.ORDERS}`,
  
  // Webhook Routes
  WEBHOOKS: `${API_PREFIXES.WEBHOOK}`,
  WEBHOOK_SSLCOMMERZ: `${API_PREFIXES.WEBHOOK}/sslcommerz`,
  WEBHOOK_STRIPE: `${API_PREFIXES.WEBHOOK}/stripe`,
  WEBHOOK_NAGAD: `${API_PREFIXES.WEBHOOK}/nagad`,
  WEBHOOK_BKASH: `${API_PREFIXES.WEBHOOK}/bkash`,
  WEBHOOK_SHIPMENT: `${API_PREFIXES.WEBHOOK}/shipment`,
  
  // Admin Routes
  ADMIN: `${API_PREFIXES.ADMIN}`,
  ADMIN_DASHBOARD: `${API_PREFIXES.ADMIN}/dashboard`,
  ADMIN_USERS: `${API_PREFIXES.ADMIN}/${API_RESOURCES.USERS}`,
  ADMIN_PRODUCTS: `${API_PREFIXES.ADMIN}/${API_RESOURCES.PRODUCTS}`,
  ADMIN_ORDERS: `${API_PREFIXES.ADMIN}/${API_RESOURCES.ORDERS}`,
  ADMIN_SETTINGS: `${API_PREFIXES.ADMIN}/${API_RESOURCES.SETTINGS}`,
  
  // Vendor/Partner Routes (For multi-vendor e-commerce)
  VENDORS: `${REST_V1}/${API_RESOURCES.VENDORS}`,
  VENDOR_PRODUCTS: `${REST_V1}/${API_RESOURCES.VENDORS}/products`,
  VENDOR_ORDERS: `${REST_V1}/${API_RESOURCES.VENDORS}/orders`,
  VENDOR_REVENUE: `${REST_V1}/${API_RESOURCES.VENDORS}/revenue`,
  
  // Refund & Return Routes
  REFUNDS: `${REST_V1}/${API_RESOURCES.REFUNDS}`,
  RETURNS: `${REST_V1}/${API_RESOURCES.RETURNS}`,
  
  // Store Front (SEO friendly - no /api prefix for direct access)
  STORE_HOME: '/',
  STORE_PRODUCTS: `/${API_RESOURCES.PRODUCTS}`,
  STORE_CATEGORIES: `/${API_RESOURCES.CATEGORIES}`,
  STORE_SEARCH: '/search',
  STORE_OFFERS: '/offers',
} as const);

// ============================================================
// Pagination Defaults
// ============================================================
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
  MAX_LIMIT_ADMIN: 500,
  
  // SEO: For infinite scroll vs pagination
  INFINITE_SCROLL_THRESHOLD: 3,
} as const);

// ============================================================
// HTTP Header Names (Standard + Custom for Bangladesh e-commerce)
// ============================================================
export const API_HEADERS = Object.freeze({
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
  
  // E-commerce specific
  CURRENCY: 'x-currency',
  LOCALE: 'x-locale',
  STORE_ID: 'x-store-id',
  VENDOR_ID: 'x-vendor-id',
  SESSION_ID: 'x-session-id',
  
  // Security
  CSP: 'content-security-policy',
  HSTS: 'strict-transport-security',
  XSS_PROTECTION: 'x-xss-protection',
  
  // Cache
  CACHE_CONTROL: 'cache-control',
  ETAG: 'etag',
  
  // CORS
  ACCESS_CONTROL_ALLOW_ORIGIN: 'access-control-allow-origin',
} as const);

// ============================================================
// Query Parameter Names (SEO friendly)
// ============================================================
export const API_QUERY_PARAMS = Object.freeze({
  // Core pagination
  PAGE: 'page',
  LIMIT: 'limit',
  OFFSET: 'offset',
  
  // Sorting
  SORT_BY: 'sort_by',
  SORT_ORDER: 'sort_order',
  SORT_DIRECTION: 'direction',
  
  // Search & Filter
  SEARCH: 'search',
  Q: 'q', // Short form for search (SEO)
  QUERY: 'query',
  FILTER: 'filter',
  CATEGORY: 'category',
  CATEGORY_SLUG: 'category_slug',
  BRAND: 'brand',
  PRICE_MIN: 'price_min',
  PRICE_MAX: 'price_max',
  RATING: 'rating',
  
  // Response customization
  INCLUDE: 'include',
  FIELDS: 'fields',
  EMBED: 'embed',
  
  // SEO & URL building
  SLUG: 'slug',
  REF: 'ref',
  UTM_SOURCE: 'utm_source',
  UTM_MEDIUM: 'utm_medium',
  UTM_CAMPAIGN: 'utm_campaign',
  UTM_TERM: 'utm_term',
  UTM_CONTENT: 'utm_content',
} as const);

// ============================================================
// Sort Order Values
// ============================================================
export const SORT_ORDERS = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
  NEWEST: 'newest',
  OLDEST: 'oldest',
  POPULAR: 'popular',
  PRICE_LOW_HIGH: 'price_low_high',
  PRICE_HIGH_LOW: 'price_high_low',
  BEST_SELLING: 'best_selling',
  TOP_RATED: 'top_rated',
} as const);

// ============================================================
// Response Status Messages (For consistent API response)
// ============================================================
export const API_RESPONSE_STATUS = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
  WARNING: 'warning',
  INFO: 'info',
} as const);

// ============================================================
// API Error Codes (Enterprise standard)
// ============================================================
export const API_ERROR_CODES = Object.freeze({
  // Client errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  
  // Business logic errors (E-commerce specific)
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  INVALID_COUPON: 'INVALID_COUPON',
  COUPON_EXPIRED: 'COUPON_EXPIRED',
  COUPON_USAGE_LIMIT: 'COUPON_USAGE_LIMIT',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  ORDER_CANNOT_CANCEL: 'ORDER_CANNOT_CANCEL',
  SHIPPING_NOT_AVAILABLE: 'SHIPPING_NOT_AVAILABLE',
  PRODUCT_NOT_AVAILABLE: 'PRODUCT_NOT_AVAILABLE',
  
  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  CACHE_ERROR: 'CACHE_ERROR',
  
  // Third-party errors
  PAYMENT_GATEWAY_ERROR: 'PAYMENT_GATEWAY_ERROR',
  SMS_GATEWAY_ERROR: 'SMS_GATEWAY_ERROR',
  EMAIL_GATEWAY_ERROR: 'EMAIL_GATEWAY_ERROR',
  SHIPPING_PARTNER_ERROR: 'SHIPPING_PARTNER_ERROR',
} as const);

// ============================================================
// API Rate Limit Keys (For different endpoints)
// ============================================================
export const API_RATE_LIMITS = Object.freeze({
  PUBLIC_READ: 'public:read',
  PUBLIC_WRITE: 'public:write',
  AUTH_READ: 'auth:read',
  AUTH_WRITE: 'auth:write',
  ADMIN_READ: 'admin:read',
  ADMIN_WRITE: 'admin:write',
  
  // Sensitive endpoints
  LOGIN: 'auth:login',
  REGISTER: 'auth:register',
  RESET_PASSWORD: 'auth:reset_password',
  OTP_SEND: 'auth:otp_send',
  OTP_VERIFY: 'auth:otp_verify',
  
  // E-commerce specific
  CHECKOUT: 'checkout',
  PAYMENT: 'payment',
  SEARCH: 'search',
} as const);
