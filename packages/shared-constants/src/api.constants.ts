/**
 * API Constants - Enterprise Grade with Full Connection Config
 * Production-ready for vubon.com.bd
 * 
 * @module shared-constants/api.constants
 * 
 * RULES:
 * ✅ NO axios instances, API calls, fetch requests
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

import { ENV_CONFIG } from './env.constants';

import type { ValueOf } from './common.types';

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
  INTERNAL: '/internal',
} as const;

// ============================================================
// API Gateway Configuration (CRITICAL FOR CONNECTIONS)
// ============================================================
export const API_GATEWAY_CONFIG = {
  EXTERNAL_API_URL: ENV_CONFIG.IS_PRODUCTION 
    ? 'https://api.vubon.com.bd'
    : 'http://localhost:3000',
  INTERNAL_API_URL: process.env['INTERNAL_API_URL'] || 'http://localhost:3001',
  ADMIN_API_URL: process.env['ADMIN_API_URL'] || 'http://localhost:3002',
  PARTNER_API_URL: process.env['PARTNER_API_URL'] || 'http://localhost:3003',
  
  TIMEOUT: {
    DEFAULT: 30000,      // 30 seconds
    LONG: 120000,        // 2 minutes (exports/imports)
    SHORT: 5000,         // 5 seconds (health checks)
    WEBSOCKET: 60000,    // 1 minute
    WEBHOOK: 10000,      // 10 seconds
  },
  
  KEEP_ALIVE: {
    ENABLED: true,
    TIMEOUT_MS: 60000,   // 1 minute
    MAX_SOCKETS: 50,
    MAX_FREE_SOCKETS: 25,
  },
} as const;

// ============================================================
// Rate Limiting Configuration (Security & Performance)
// ============================================================
export const RATE_LIMIT_CONFIG = {
  AUTH: {
    LOGIN: { windowMs: 15 * 60 * 1000, max: 5, message: 'Too many login attempts' },
    REGISTER: { windowMs: 60 * 60 * 1000, max: 3, message: 'Too many registrations' },
    OTP_SEND: { windowMs: 5 * 60 * 1000, max: 2, message: 'OTP limit exceeded' },
    OTP_VERIFY: { windowMs: 5 * 60 * 1000, max: 5, message: 'Too many verification attempts' },
    FORGOT_PASSWORD: { windowMs: 15 * 60 * 1000, max: 3, message: 'Too many password reset requests' },
    REFRESH_TOKEN: { windowMs: 60 * 60 * 1000, max: 50, message: 'Too many refresh attempts' },
  },
  API: {
    PUBLIC: { windowMs: 60 * 1000, max: 100, message: 'Public API rate limit exceeded' },
    AUTHENTICATED: { windowMs: 60 * 1000, max: 1000, message: 'Rate limit exceeded' },
    ADMIN: { windowMs: 60 * 1000, max: 5000, message: 'Admin rate limit exceeded' },
    PARTNER: { windowMs: 60 * 1000, max: 2000, message: 'Partner rate limit exceeded' },
  },
  BULK_OPERATIONS: {
    MAX_ITEMS_PER_REQUEST: 1000,
    REQUEST_TIMEOUT_MS: 300000,  // 5 minutes
    MAX_CONCURRENT_BULK_JOBS: 5,
  },
  GRAPHQL: {
    MAX_DEPTH: 10,
    MAX_COMPLEXITY: 1000,
    MAX_ALIASES: 20,
  },
} as const;

// ============================================================
// Resilience Configuration (Retry, Circuit Breaker, Bulkhead)
// ============================================================
export const RESILIENCE_CONFIG = {
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY_MS: 1000,
    BACKOFF_MULTIPLIER: 2,
    MAX_DELAY_MS: 10000,
    RETRYABLE_STATUSES: [408, 429, 500, 502, 503, 504],
    RETRYABLE_METHODS: ['GET', 'PUT', 'DELETE', 'POST'],
  },
  CIRCUIT_BREAKER: {
    FAILURE_THRESHOLD: 5,      // 5 failures opens circuit
    RESET_TIMEOUT_MS: 60000,   // 1 minute before retry
    HALF_OPEN_MAX_ATTEMPTS: 3, // 3 attempts in half-open state
    ROLLING_WINDOW_MS: 120000, // 2 minute rolling window
    MINIMUM_REQUESTS: 10,      // Minimum requests before calculation
  },
  BULKHEAD: {
    MAX_CONCURRENT_CALLS: 100,
    MAX_WAIT_QUEUE_SIZE: 50,
    TIMEOUT_MS: 30000,
  },
  TIMEOUT: {
    DEFAULT: 30000,
    LONG_OPERATION: 120000,
    CRITICAL: 10000,
  },
} as const;

// ============================================================
// Connection Pool Configuration
// ============================================================
export const CONNECTION_POOL = {
  HTTP: {
    MAX_SOCKETS: 50,
    MAX_FREE_SOCKETS: 25,
    TIMEOUT_MS: 60000,
    KEEP_ALIVE_MS: 30000,
    SCHEDULER: 'fifo',
  },
  WEBSOCKET: {
    MAX_CONNECTIONS: 10000,
    PING_INTERVAL_MS: 30000,
    RECONNECT_DELAY_MS: 3000,
    MAX_RECONNECT_ATTEMPTS: 10,
    HEARTBEAT_INTERVAL_MS: 15000,
  },
  DATABASE_POOL: {
    MIN: 5,
    MAX: 20,
    IDLE_TIMEOUT_MS: 10000,
    ACQUIRE_TIMEOUT_MS: 30000,
  },
} as const;

// ============================================================
// Webhook Configuration (Bangladesh Payment Gateways)
// ============================================================
export const WEBHOOK_CONFIG = {
  SSLCOMMERZ: {
    TIMEOUT_MS: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 2000,
    IP_WHITELIST: ['107.22.0.0/16', '54.224.0.0/16', '52.0.0.0/8'],
    WEBHOOK_PATH: '/webhook/sslcommerz',
    VERIFY_SIGNATURE: true,
  },
  BKASH: {
    TIMEOUT_MS: 20000,
    RETRY_ATTEMPTS: 2,
    RETRY_DELAY_MS: 1000,
    IP_WHITELIST: ['10.0.0.0/8', '172.16.0.0/12'],
    WEBHOOK_PATH: '/webhook/bkash',
    VERIFY_SIGNATURE: true,
  },
  NAGAD: {
    TIMEOUT_MS: 15000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 1000,
    WEBHOOK_PATH: '/webhook/nagad',
    VERIFY_SIGNATURE: true,
  },
  ROCKET: {
    TIMEOUT_MS: 15000,
    RETRY_ATTEMPTS: 2,
    WEBHOOK_PATH: '/webhook/rocket',
  },
  STRIPE: {
    TIMEOUT_MS: 20000,
    RETRY_ATTEMPTS: 3,
    WEBHOOK_PATH: '/webhook/stripe',
    VERIFY_SIGNATURE: true,
  },
  GENERAL: {
    MAX_PAYLOAD_SIZE_MB: 10,
    MAX_RETRY_QUEUE_SIZE: 1000,
    DEAD_LETTER_QUEUE_ENABLED: true,
    WEBHOOK_TIMEOUT_MS: 10000,
  },
} as const;

// ============================================================
// Health Check Configuration
// ============================================================
export const HEALTH_CONFIG = {
  CHECK_INTERVAL_MS: 30000,  // 30 seconds
  TIMEOUT_MS: 5000,           // 5 seconds
  DEPENDENCIES: ['DATABASE', 'REDIS', 'QUEUE', 'MEMCACHED'],
  DETAILED_METRICS: ENV_CONFIG.IS_DEVELOPMENT,
  READINESS_CHECK_DELAY_MS: 10000,
  LIVENESS_CHECK_THRESHOLD: 3,
} as const;

// ============================================================
// Resource Names (Your existing resources - KEPT)
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

// ============================================================
// Full API Routes (Dynamic - Your existing routes remain)
// ============================================================
// ... (keep your existing API_ROUTES section exactly as is)
// I'm keeping it but truncated for brevity in this response

// Export everything
export { ENV_CONFIG } from './env.constants';
