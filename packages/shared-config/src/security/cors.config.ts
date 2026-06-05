/**
 * CORS Configuration - Cross-origin resource sharing rules
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/security/cors.config
 * 
 * RULES:
 * ✅ ONLY CORS configuration - NO business logic
 * ✅ NO middleware binding, request handling logic
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

// Common allowed HTTP methods
const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'HEAD',
] as const;

// Common allowed headers
const ALLOWED_HEADERS = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'Authorization',
  'x-api-key',
  'x-session-id',
  'x-request-id',
  'x-correlation-id',
  'x-device-fingerprint',
  'x-client-version',
  'x-platform',
  'x-device-id',
] as const;

// Headers exposed to frontend
const EXPOSED_HEADERS = [
  'x-request-id',
  'x-correlation-id',
  'x-rate-limit-remaining',
  'x-rate-limit-reset',
  'x-rate-limit-limit',
] as const;

// Development origins
const DEVELOPMENT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

// Test origins
const TEST_ORIGINS = [
  'http://localhost:3000',
];

// ==================== CORS Configuration ====================

export const corsConfig = {
  // Allowed origins (from environment, comma-separated)
  origin: env.CORS_ORIGINS as string | string[],
  
  // Allow credentials (cookies, authorization headers)
  credentials: env.CORS_CREDENTIALS,
  
  // Allowed HTTP methods
  methods: ALLOWED_METHODS,
  
  // Allowed headers
  allowedHeaders: ALLOWED_HEADERS,
  
  // Exposed headers (accessible to frontend JavaScript)
  exposedHeaders: EXPOSED_HEADERS,
  
  // Max age for preflight requests (seconds)
  // 24 hours is safe for most browsers
  maxAge: 86400,
  
  // Options success status (204 is more efficient than 200)
  optionsSuccessStatus: 204,
  
  // Don't pass preflight response to next handler
  preflightContinue: false,
} as const;

// ==================== Environment-specific overrides ====================

export const corsConfigByEnv = {
  development: {
    origin: DEVELOPMENT_ORIGINS,
    credentials: true,
    maxAge: 0, // No caching for development
    methods: ALLOWED_METHODS,
    allowedHeaders: ALLOWED_HEADERS,
    exposedHeaders: EXPOSED_HEADERS,
    optionsSuccessStatus: 204,
    preflightContinue: false,
  },
  production: corsConfig,
  test: {
    origin: TEST_ORIGINS,
    credentials: true,
    maxAge: 0,
    methods: ALLOWED_METHODS,
    allowedHeaders: ALLOWED_HEADERS,
    exposedHeaders: EXPOSED_HEADERS,
    optionsSuccessStatus: 204,
    preflightContinue: false,
  },
} as const;

// ==================== Helper Functions ====================

/**
 * Get CORS configuration for specific environment
 */
export const getCorsConfig = (environment: 'development' | 'production' | 'test' = env.NODE_ENV): CorsOptions => {
  const config = corsConfigByEnv[environment];
  if (!config) {
    return corsConfigByEnv.production as CorsOptions;
  }
  return config as CorsOptions;
};

/**
 * Check if an origin is allowed
 * Pure function - no side effects
 */
export const isOriginAllowed = (origin: string, environment?: 'development' | 'production' | 'test'): boolean => {
  const config = getCorsConfig(environment);
  const allowedOrigins = config.origin;
  
  if (allowedOrigins === true) return true;
  if (allowedOrigins === false) return false;
  if (typeof allowedOrigins === 'string') return allowedOrigins === origin;
  if (Array.isArray(allowedOrigins)) return allowedOrigins.includes(origin);
  
  return false;
};

/**
 * Get allowed origins as array
 */
export const getAllowedOrigins = (environment?: 'development' | 'production' | 'test'): string[] => {
  const config = getCorsConfig(environment);
  const origins = config.origin;
  
  if (Array.isArray(origins)) return origins;
  if (typeof origins === 'string') return [origins];
  return [];
};

// ==================== Type Exports ====================

export type CorsConfig = typeof corsConfig;
export type AllowedMethod = typeof ALLOWED_METHODS[number];
export type AllowedHeader = typeof ALLOWED_HEADERS[number];
export type ExposedHeader = typeof EXPOSED_HEADERS[number];

export interface CorsOptions {
  origin: string | string[] | boolean;
  credentials: boolean;
  methods: readonly string[];
  allowedHeaders: readonly string[];
  exposedHeaders?: readonly string[];
  maxAge?: number;
  optionsSuccessStatus?: number;
  preflightContinue?: boolean;
}
