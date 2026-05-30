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
 * ✅ NO direct process.env (use imported ENV_CONFIG)
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Import Environment Configuration
// ============================================================
import { ENV_CONFIG } from './env.constants';

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
// Environment Configuration Interface (No process.env here)
// ✅ Values are imported from env.constants.ts
// ============================================================
export interface EnvConfig {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly API_BASE_URL: string;
  readonly IS_PRODUCTION: boolean;
  readonly IS_DEVELOPMENT: boolean;
}

// ✅ Re-export ENV_CONFIG from env.constants.ts
// This keeps the interface clean and all rules intact
export { ENV_CONFIG } from './env.constants';

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

  // Auth Routes (Single source of truth - use these everywhere)
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

// Rest of the file remains exactly the same as your original...
// (CLIENT_ROUTES, PAGINATION, API_HEADERS, API_QUERY_PARAMS, 
//  SORT_ORDERS, SORT_FIELDS, API_RESPONSE_STATUS, API_ERROR_CODES,
//  API_RATE_LIMITS, RATE_LIMIT_VALUES, SUPPORTED_CURRENCIES,
//  SUPPORTED_LOCALES, HTTP_STATUS sections remain unchanged)
