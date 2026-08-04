// packages/shared-config/src/security/rate-limit.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Rate Limit Configuration Interfaces
// ============================================================================

/**
 * Rate limit configuration interface
 */
export interface RateLimitConfig {
  /** Global rate limit */
  global: RateLimitRule;
  /** Authentication rate limits */
  auth: AuthRateLimit;
  /** API rate limits */
  api: ApiRateLimit;
  /** User tier rate limits */
  userTiers: UserTierRateLimit;
  /** Endpoint-specific rate limits */
  endpoints: EndpointRateLimit[];
}

/**
 * Rate limit rule interface
 */
export interface RateLimitRule {
  /** Time window in milliseconds */
  windowMs: number;
  /** Maximum number of requests in the window */
  max: number;
  /** Message to display when rate limit is exceeded */
  message: string;
  /** Whether to skip rate limiting */
  skip?: (req: unknown) => boolean;
  /** Key generator function */
  keyGenerator?: (req: unknown) => string;
}

/**
 * Authentication rate limits
 */
export interface AuthRateLimit {
  /** Login rate limit */
  login: RateLimitRule;
  /** Registration rate limit */
  register: RateLimitRule;
  /** Password reset rate limit */
  passwordReset: RateLimitRule;
  /** Email verification rate limit */
  emailVerification: RateLimitRule;
  /** MFA verification rate limit */
  mfaVerification: RateLimitRule;
  /** Refresh token rate limit */
  refreshToken: RateLimitRule;
}

/**
 * API rate limits
 */
export interface ApiRateLimit {
  /** Read operations (GET, HEAD) */
  read: RateLimitRule;
  /** Write operations (POST, PUT, PATCH) */
  write: RateLimitRule;
  /** Delete operations (DELETE) */
  delete: RateLimitRule;
  /** Bulk operations */
  bulk: RateLimitRule;
  /** Webhook operations */
  webhook: RateLimitRule;
  /** Public endpoints */
  public: RateLimitRule;
}

/**
 * User tier rate limits
 */
export interface UserTierRateLimit {
  /** Standard user tier */
  standard: TierRateLimit;
  /** Premium user tier */
  premium: TierRateLimit;
  /** Seller/merchant tier */
  seller: TierRateLimit;
  /** Admin tier */
  admin: TierRateLimit;
}

/**
 * Tier rate limit
 */
export interface TierRateLimit {
  /** Base rate limit */
  base: RateLimitRule;
  /** Read operations */
  read: RateLimitRule;
  /** Write operations */
  write: RateLimitRule;
  /** Bulk operations */
  bulk: RateLimitRule;
}

/**
 * Endpoint-specific rate limit
 */
export interface EndpointRateLimit {
  /** Endpoint path pattern */
  path: string | RegExp;
  /** HTTP methods to apply to (optional, applies to all if not specified) */
  methods?: string[];
  /** Rate limit rule */
  rule: RateLimitRule;
}

/**
 * User tier types
 */
export type UserTier = 'standard' | 'premium' | 'seller' | 'admin';

// ============================================================================
// Rate Limit Constants
// ============================================================================

/**
 * Bengali rate limit messages
 */
export const RATE_LIMIT_MESSAGES = {
  BN: {
    DEFAULT: 'অনেক বেশি রিকোয়েস্ট পাঠানো হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
    LOGIN:
      'লগইনের জন্য অনেক বেশি চেষ্টা করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
    REGISTER:
      'নিবন্ধনের জন্য অনেক বেশি চেষ্টা করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
    PASSWORD_RESET:
      'পাসওয়ার্ড রিসেটের জন্য অনেক বেশি চেষ্টা করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
    EMAIL_VERIFICATION:
      'ইমেইল ভেরিফিকেশনের জন্য অনেক বেশি চেষ্টা করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
    MFA: 'MFA ভেরিফিকেশনের জন্য অনেক বেশি চেষ্টা করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
    API_LIMIT:
      'এপিআই রিকোয়েস্টের সীমা অতিক্রম করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
    BULK: 'একসাথে অনেক বেশি ডেটা প্রক্রিয়াকরণের চেষ্টা করা হয়েছে। অনুগ্রহ করে {seconds} সেকেন্ড পর আবার চেষ্টা করুন।',
  },
  EN: {
    DEFAULT: 'Too many requests. Please try again later.',
    LOGIN: 'Too many login attempts. Please try again in {seconds} seconds.',
    REGISTER: 'Too many registration attempts. Please try again in {seconds} seconds.',
    PASSWORD_RESET: 'Too many password reset attempts. Please try again in {seconds} seconds.',
    EMAIL_VERIFICATION:
      'Too many email verification attempts. Please try again in {seconds} seconds.',
    MFA: 'Too many MFA verification attempts. Please try again in {seconds} seconds.',
    API_LIMIT: 'API rate limit exceeded. Please try again in {seconds} seconds.',
    BULK: 'Bulk operation limit exceeded. Please try again in {seconds} seconds.',
  },
};

/**
 * Default time windows
 */
export const TIME_WINDOWS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  FIVE_MINUTES: 5 * 60 * 1000,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
};

// ============================================================================
// Rate Limit Configuration Factory
// ============================================================================

/**
 * Creates rate limit configuration from environment
 * @param envConfig - The environment configuration
 * @param language - The language for messages ('bn' or 'en')
 * @returns Rate limit configuration
 */
export function createRateLimitConfig(
  envConfig: EnvConfig = env,
  language: 'bn' | 'en' = 'bn'
): RateLimitConfig {
  const { server } = envConfig;
  const isProduction = server.NODE_ENV === 'production';

  const messages = language === 'bn' ? RATE_LIMIT_MESSAGES.BN : RATE_LIMIT_MESSAGES.EN;

  // Rate limits are more strict in production
  const factor = isProduction ? 1 : 2;

  return {
    global: {
      windowMs: TIME_WINDOWS.MINUTE,
      max: 100 * factor,
      message: messages.DEFAULT,
    },
    auth: {
      login: {
        windowMs: TIME_WINDOWS.FIFTEEN_MINUTES,
        max: 5 * factor,
        message: messages.LOGIN,
      },
      register: {
        windowMs: TIME_WINDOWS.HOUR,
        max: 10 * factor,
        message: messages.REGISTER,
      },
      passwordReset: {
        windowMs: TIME_WINDOWS.HOUR,
        max: 5 * factor,
        message: messages.PASSWORD_RESET,
      },
      emailVerification: {
        windowMs: TIME_WINDOWS.HOUR,
        max: 5 * factor,
        message: messages.EMAIL_VERIFICATION,
      },
      mfaVerification: {
        windowMs: TIME_WINDOWS.FIFTEEN_MINUTES,
        max: 5 * factor,
        message: messages.MFA,
      },
      refreshToken: {
        windowMs: TIME_WINDOWS.MINUTE,
        max: 10 * factor,
        message: messages.DEFAULT,
      },
    },
    api: {
      read: {
        windowMs: TIME_WINDOWS.MINUTE,
        max: 60 * factor,
        message: messages.API_LIMIT,
      },
      write: {
        windowMs: TIME_WINDOWS.MINUTE,
        max: 30 * factor,
        message: messages.API_LIMIT,
      },
      delete: {
        windowMs: TIME_WINDOWS.MINUTE,
        max: 10 * factor,
        message: messages.API_LIMIT,
      },
      bulk: {
        windowMs: TIME_WINDOWS.HOUR,
        max: 5 * factor,
        message: messages.BULK,
      },
      webhook: {
        windowMs: TIME_WINDOWS.MINUTE,
        max: 20 * factor,
        message: messages.API_LIMIT,
      },
      public: {
        windowMs: TIME_WINDOWS.MINUTE,
        max: 120 * factor,
        message: messages.API_LIMIT,
      },
    },
    userTiers: {
      standard: {
        base: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 30 * factor,
          message: messages.API_LIMIT,
        },
        read: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 40 * factor,
          message: messages.API_LIMIT,
        },
        write: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 20 * factor,
          message: messages.API_LIMIT,
        },
        bulk: {
          windowMs: TIME_WINDOWS.HOUR,
          max: 3 * factor,
          message: messages.BULK,
        },
      },
      premium: {
        base: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 60 * factor,
          message: messages.API_LIMIT,
        },
        read: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 80 * factor,
          message: messages.API_LIMIT,
        },
        write: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 40 * factor,
          message: messages.API_LIMIT,
        },
        bulk: {
          windowMs: TIME_WINDOWS.HOUR,
          max: 10 * factor,
          message: messages.BULK,
        },
      },
      seller: {
        base: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 50 * factor,
          message: messages.API_LIMIT,
        },
        read: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 60 * factor,
          message: messages.API_LIMIT,
        },
        write: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 30 * factor,
          message: messages.API_LIMIT,
        },
        bulk: {
          windowMs: TIME_WINDOWS.HOUR,
          max: 5 * factor,
          message: messages.BULK,
        },
      },
      admin: {
        base: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 120 * factor,
          message: messages.API_LIMIT,
        },
        read: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 150 * factor,
          message: messages.API_LIMIT,
        },
        write: {
          windowMs: TIME_WINDOWS.MINUTE,
          max: 80 * factor,
          message: messages.API_LIMIT,
        },
        bulk: {
          windowMs: TIME_WINDOWS.HOUR,
          max: 20 * factor,
          message: messages.BULK,
        },
      },
    },
    endpoints: [],
  };
}

// ============================================================================
// Rate Limit Configuration Instance
// ============================================================================

/**
 * Rate limit configuration instance
 */
export const rateLimitConfig: RateLimitConfig = createRateLimitConfig();

// ============================================================================
// Rate Limit Helper Functions
// ============================================================================

/**
 * Gets endpoint-specific rate limit
 * @param path - The endpoint path
 * @param method - The HTTP method (optional)
 * @param config - The rate limit configuration (optional)
 * @returns Rate limit rule or null if no match
 *
 * @example
 * const rule = getEndpointRateLimit('/api/products', 'GET');
 */
export function getEndpointRateLimit(
  path: string,
  method?: string,
  config: RateLimitConfig = rateLimitConfig
): RateLimitRule | null {
  for (const endpoint of config.endpoints) {
    let matches = false;

    if (typeof endpoint.path === 'string') {
      // Check if path matches the endpoint path pattern
      if (path === endpoint.path || path.startsWith(endpoint.path.replace(/\*/g, ''))) {
        matches = true;
      }
    } else if (endpoint.path instanceof RegExp) {
      if (endpoint.path.test(path)) {
        matches = true;
      }
    }

    if (matches) {
      // Check method if specified
      if (method && endpoint.methods && !endpoint.methods.includes(method)) {
        continue;
      }
      return endpoint.rule;
    }
  }

  return null;
}

/**
 * Gets method-specific rate limit
 * @param method - The HTTP method
 * @param isAuthenticated - Whether the request is authenticated
 * @param config - The rate limit configuration (optional)
 * @returns Rate limit rule
 *
 * @example
 * const rule = getMethodRateLimit('POST', true);
 */
export function getMethodRateLimit(
  method: string,
  isAuthenticated: boolean = false,
  config: RateLimitConfig = rateLimitConfig
): RateLimitRule {
  const upperMethod = method.toUpperCase();

  if (!isAuthenticated) {
    return config.api.public;
  }

  switch (upperMethod) {
    case 'GET':
    case 'HEAD':
      return config.api.read;
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return config.api.write;
    case 'DELETE':
      return config.api.delete;
    default:
      return config.api.read;
  }
}

/**
 * Gets user tier rate limit
 * @param tier - The user tier
 * @param operation - The operation type ('base', 'read', 'write', 'bulk')
 * @param config - The rate limit configuration (optional)
 * @returns Rate limit rule
 *
 * @example
 * const rule = getUserTierRateLimit('premium', 'write');
 */
export function getUserTierRateLimit(
  tier: UserTier,
  operation: 'base' | 'read' | 'write' | 'bulk' = 'base',
  config: RateLimitConfig = rateLimitConfig
): RateLimitRule {
  const tierLimits = config.userTiers[tier];

  if (!tierLimits) {
    return config.userTiers.standard.base;
  }

  return tierLimits[operation] || tierLimits.base;
}

/**
 * Adds an endpoint-specific rate limit
 * @param path - The endpoint path pattern
 * @param rule - The rate limit rule
 * @param methods - The HTTP methods to apply (optional)
 * @param config - The rate limit configuration (optional)
 * @returns Updated rate limit configuration
 *
 * @example
 * const config = addEndpointRateLimit('/api/special/*', {
 *   windowMs: 60000,
 *   max: 10,
 *   message: 'Too many requests'
 * }, ['POST']);
 */
export function addEndpointRateLimit(
  path: string | RegExp,
  rule: RateLimitRule,
  methods?: string[],
  config: RateLimitConfig = rateLimitConfig
): RateLimitConfig {
  const newConfig = { ...config };
  newConfig.endpoints = [
    ...config.endpoints,
    {
      path,
      methods,
      rule,
    },
  ];
  return newConfig;
}

/**
 * Removes an endpoint-specific rate limit
 * @param path - The endpoint path pattern to remove
 * @param config - The rate limit configuration (optional)
 * @returns Updated rate limit configuration
 *
 * @example
 * const config = removeEndpointRateLimit('/api/special/*');
 */
export function removeEndpointRateLimit(
  path: string | RegExp,
  config: RateLimitConfig = rateLimitConfig
): RateLimitConfig {
  const newConfig = { ...config };
  newConfig.endpoints = config.endpoints.filter((endpoint) => {
    if (typeof endpoint.path === 'string' && typeof path === 'string') {
      return endpoint.path !== path;
    }
    if (endpoint.path instanceof RegExp && path instanceof RegExp) {
      return endpoint.path.source !== path.source;
    }
    return true;
  });
  return newConfig;
}

/**
 * Generates a rate limit key for a request
 * @param identifier - The unique identifier (e.g., user ID, IP address)
 * @param endpoint - The endpoint path
 * @param method - The HTTP method
 * @returns The rate limit key
 *
 * @example
 * const key = generateRateLimitKey('user-123', '/api/products', 'GET');
 */
export function generateRateLimitKey(identifier: string, endpoint: string, method: string): string {
  return `rate-limit:${identifier}:${method}:${endpoint}`;
}

/**
 * Formats a rate limit message with time placeholder
 * @param message - The message template
 * @param seconds - The number of seconds to wait
 * @returns Formatted message
 *
 * @example
 * const msg = formatRateLimitMessage('Try again in {seconds} seconds', 30);
 */
export function formatRateLimitMessage(message: string, seconds: number): string {
  return message.replace(/{seconds}/g, String(seconds));
}

/**
 * Validates rate limit configuration
 * @param config - The rate limit configuration to validate
 * @returns True if the configuration is valid, false otherwise
 *
 * @example
 * const isValid = validateRateLimitConfig(config);
 */
export function validateRateLimitConfig(config: RateLimitConfig): boolean {
  if (!config || typeof config !== 'object') {
    return false;
  }

  // Check global
  if (!config.global || typeof config.global !== 'object') {
    return false;
  }
  if (typeof config.global.max !== 'number' || config.global.max < 1) {
    return false;
  }
  if (typeof config.global.windowMs !== 'number' || config.global.windowMs < 1000) {
    return false;
  }

  // Check auth
  if (!config.auth || typeof config.auth !== 'object') {
    return false;
  }

  // Check API
  if (!config.api || typeof config.api !== 'object') {
    return false;
  }

  // Check user tiers
  if (!config.userTiers || typeof config.userTiers !== 'object') {
    return false;
  }

  // Check endpoints
  if (!Array.isArray(config.endpoints)) {
    return false;
  }

  return true;
}
