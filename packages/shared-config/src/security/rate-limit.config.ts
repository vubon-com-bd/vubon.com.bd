/**
 * Rate Limit Configuration - Throttling policies
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/security/rate-limit.config
 * 
 * RULES:
 * ✅ ONLY rate limit configuration - NO business logic
 * ✅ NO Redis implementation, middleware binding, storage logic
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';
import { RATE_LIMIT_CONFIG } from '@vubon/shared-constants';
// ==================== Constants ====================

// Time constants (in milliseconds)
const ONE_MINUTE = 60 * 1000;
const FIVE_MINUTES = 5 * ONE_MINUTE;
const FIFTEEN_MINUTES = 15 * ONE_MINUTE;
// ✅ FIXED: Removed unused constants
// const THIRTY_MINUTES = 30 * ONE_MINUTE;
const ONE_HOUR = 60 * ONE_MINUTE;
// const ONE_DAY = 24 * ONE_HOUR;

// ✅ NEW: Get default values from shared-constants (SSOT)
const DEFAULT_GLOBAL_LIMIT = RATE_LIMIT_CONFIG.API.PUBLIC.max;
const DEFAULT_GLOBAL_WINDOW = RATE_LIMIT_CONFIG.API.PUBLIC.windowMs / 1000;
const DEFAULT_LOGIN_LIMIT = RATE_LIMIT_CONFIG.AUTH.LOGIN.max;
const DEFAULT_LOGIN_WINDOW = RATE_LIMIT_CONFIG.AUTH.LOGIN.windowMs / 1000;

// Default rate limits from environment
const DEFAULT_GLOBAL_LIMIT = env.RATE_LIMIT_MAX_REQUESTS || 100;
const DEFAULT_GLOBAL_WINDOW = env.RATE_LIMIT_TTL || 60;
const DEFAULT_LOGIN_LIMIT = env.RATE_LIMIT_LOGIN_MAX || 5;
const DEFAULT_LOGIN_WINDOW = env.RATE_LIMIT_LOGIN_TTL || 900;

// ==================== Rate Limit Configuration ====================

export const rateLimitConfig = Object.freeze({
  // Global defaults
  global: {
    windowMs: DEFAULT_GLOBAL_WINDOW * 1000,
    max: DEFAULT_GLOBAL_LIMIT,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
  },
  
  // Authentication endpoints (stricter)
  auth: {
    login: {
      windowMs: DEFAULT_LOGIN_WINDOW * 1000,
      max: DEFAULT_LOGIN_LIMIT,
      skipSuccessfulRequests: true,
      skipFailedRequests: false,
      message: 'Too many login attempts. Please try again later.',
      messageBn: 'অনেকবার লগইন করার চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
    },
    register: {
      windowMs: ONE_HOUR,
      max: 3,
      message: 'Too many registration attempts. Please try again later.',
      messageBn: 'অনেকবার নিবন্ধনের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
    },
    passwordReset: {
      windowMs: ONE_HOUR,
      max: 3,
      message: 'Too many password reset requests. Please try again later.',
      messageBn: 'অনেকবার পাসওয়ার্ড রিসেটের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
    },
    mfaVerify: {
      windowMs: FIFTEEN_MINUTES,
      max: 5,
      message: 'Too many MFA verification attempts. Please try again later.',
      messageBn: 'অনেকবার MFA যাচাইয়ের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
    },
    mfaSetup: {
      windowMs: ONE_HOUR,
      max: 10,
      message: 'Too many MFA setup attempts. Please try again later.',
    },
    emailVerification: {
      windowMs: ONE_HOUR,
      max: 5,
      message: 'Too many email verification requests. Please try again later.',
    },
  },
  
  // API endpoints
  api: {
    read: {
      windowMs: ONE_MINUTE,
      max: 60,
      description: 'Standard read operations',
    },
    write: {
      windowMs: ONE_MINUTE,
      max: 30,
      description: 'Write operations (POST, PUT, PATCH)',
    },
    delete: {
      windowMs: ONE_MINUTE,
      max: 10,
      description: 'Delete operations',
    },
    admin: {
      windowMs: ONE_MINUTE,
      max: 100,
      description: 'Admin operations (higher limit)',
    },
  },
  
  // Specific endpoints
  endpoints: {
    '/api/v1/auth/login': {
      windowMs: FIFTEEN_MINUTES,
      max: 5,
      description: 'Login endpoint',
    },
    '/api/v1/auth/register': {
      windowMs: ONE_HOUR,
      max: 3,
      description: 'Registration endpoint',
    },
    '/api/v1/products/search': {
      windowMs: ONE_MINUTE,
      max: 30,
      description: 'Product search (prevent scraping)',
    },
    '/api/v1/checkout': {
      windowMs: FIVE_MINUTES,
      max: 5,
      description: 'Checkout endpoint',
    },
    '/api/v1/payments': {
      windowMs: ONE_MINUTE,
      max: 5,
      description: 'Payment processing',
    },
    '/api/v1/payments/verify': {
      windowMs: ONE_MINUTE,
      max: 20,
      description: 'Payment verification',
    },
    '/api/v1/webhooks': {
      windowMs: ONE_MINUTE,
      max: 100,
      skipFailedRequests: true,
      description: 'Webhook endpoint (higher limit)',
    },
    '/api/v1/otp/send': {
      windowMs: FIVE_MINUTES,
      max: 3,
      message: 'Too many OTP requests. Please wait before requesting another.',
      description: 'OTP sending endpoint',
    },
    '/api/v1/otp/verify': {
      windowMs: FIVE_MINUTES,
      max: 5,
      message: 'Too many OTP verification attempts. Please try again later.',
      description: 'OTP verification endpoint',
    },
  },
  
  // User-based limits (after authentication)
  user: {
    standard: {
      windowMs: ONE_MINUTE,
      max: 120,
      description: 'Standard user limit',
    },
    premium: {
      windowMs: ONE_MINUTE,
      max: 300,
      description: 'Premium user limit',
    },
    seller: {
      windowMs: ONE_MINUTE,
      max: 200,
      description: 'Seller/Vendor limit',
    },
    admin: {
      windowMs: ONE_MINUTE,
      max: 500,
      description: 'Admin user limit',
    },
    support: {
      windowMs: ONE_MINUTE,
      max: 150,
      description: 'Support agent limit',
    },
  },
  
  // IP-based limits (for unauthenticated)
  ip: {
    windowMs: ONE_MINUTE,
    max: 50,
    description: 'IP-based limit for unauthenticated requests',
  },
  
  // Key generator patterns
  keyGenerator: {
    ip: 'ip',
    userId: 'userId',
    apiKey: 'apiKey',
    endpoint: 'endpoint',
    ipEndpoint: 'ip:endpoint',
    userEndpoint: 'user:endpoint',
  },
  
  // Store configuration
  store: {
    type: 'redis' as const,
    prefix: 'ratelimit:',
    resetOnChange: false,
    redis: {
      enableOfflineQueue: false,
      connectionTimeout: 5000,
      maxRetries: 3,
    },
  },
  
  // Response headers
  headers: {
    limit: 'X-RateLimit-Limit',
    remaining: 'X-RateLimit-Remaining',
    reset: 'X-RateLimit-Reset',
    retryAfter: 'Retry-After',
  },
  
  // White-listed IPs (bypass rate limiting)
  whitelist: {
    ips: [] as string[],
    cidrs: [] as string[],
  },
  
  // Black-listed IPs (blocked)
  blacklist: {
    ips: [] as string[],
    cidrs: [] as string[],
  },
} as const);

// ==================== Rate limit by HTTP method ====================

export const rateLimitByMethod = Object.freeze({
  GET: 'read',
  POST: 'write',
  PUT: 'write',
  PATCH: 'write',
  DELETE: 'delete',
  OPTIONS: 'read',
  HEAD: 'read',
} as const);

// ==================== Helper Functions ====================

/**
 * Get rate limit rule for a specific endpoint
 * Pure function - no side effects
 */
export const getEndpointRateLimit = (endpoint: string): RateLimitRule | undefined => {
  const rule = rateLimitConfig.endpoints[endpoint as keyof typeof rateLimitConfig.endpoints];
  if (rule) {
    return rule as RateLimitRule;
  }
  return undefined;
};

/**
 * Get rate limit rule for HTTP method
 */
export const getMethodRateLimit = (method: string): RateLimitRule => {
  const type = rateLimitByMethod[method as keyof typeof rateLimitByMethod];
  const config = rateLimitConfig.api[type as keyof typeof rateLimitConfig.api];
  return config as RateLimitRule;
};

/**
 * Get user tier rate limit
 */
export const getUserTierRateLimit = (tier: 'standard' | 'premium' | 'seller' | 'admin' | 'support'): RateLimitRule => {
  const config = rateLimitConfig.user[tier];
  return config as RateLimitRule;
};

/**
 * Check if IP is whitelisted
 */
export const isIpWhitelisted = (ip: string): boolean => {
  return rateLimitConfig.whitelist.ips.includes(ip);
};

// ==================== Type Exports ====================

export type RateLimitConfig = typeof rateLimitConfig;
export type RateLimitRule = {
  windowMs: number;
  max: number;
  message?: string;
  messageBn?: string;
  description?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyPrefix?: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
};
