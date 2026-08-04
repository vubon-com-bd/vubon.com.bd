// packages/shared-config/src/security/cors.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// CORS Configuration Interfaces
// ============================================================================

/**
 * CORS configuration interface
 */
export interface CorsConfig {
  /** Allowed origins */
  origins: (string | RegExp)[];
  /** Allowed HTTP methods */
  methods: string[];
  /** Allowed headers */
  allowedHeaders: string[];
  /** Exposed headers */
  exposedHeaders: string[];
  /** Whether to allow credentials */
  credentials: boolean;
  /** Preflight cache max age in seconds */
  maxAge: number;
  /** Whether to allow any origin */
  allowAnyOrigin: boolean;
  /** Options success status code */
  optionsSuccessStatus: number;
}

/**
 * CORS options for specific routes
 */
export interface CorsRouteOptions {
  /** Path pattern */
  path: string | RegExp;
  /** CORS configuration override */
  config: Partial<CorsConfig>;
}

// ============================================================================
// CORS Constants
// ============================================================================

/**
 * Default allowed HTTP methods
 */
export const DEFAULT_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

/**
 * Default allowed headers
 */
export const DEFAULT_ALLOWED_HEADERS = [
  'Origin',
  'X-Requested-With',
  'Content-Type',
  'Accept',
  'Authorization',
  'X-API-Key',
  'X-CSRF-Token',
  'X-Session-ID',
  'X-Device-ID',
];

/**
 * Default exposed headers
 */
export const DEFAULT_EXPOSED_HEADERS = [
  'X-Total-Count',
  'X-Page',
  'X-Limit',
  'X-Request-ID',
  'X-RateLimit-Limit',
  'X-RateLimit-Remaining',
  'X-RateLimit-Reset',
];

/**
 * Default preflight cache max age (24 hours)
 */
export const DEFAULT_MAX_AGE = 86400;

/**
 * Development origins
 */
export const DEVELOPMENT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

/**
 * Production origins (to be overridden by environment)
 */
export const PRODUCTION_ORIGINS: string[] = [];

// ============================================================================
// CORS Configuration Factory
// ============================================================================

/**
 * Creates CORS configuration from environment variables
 * @param envConfig - The environment configuration
 * @returns CORS configuration object
 */
export function createCorsConfig(envConfig: EnvConfig = env): CorsConfig {
  const { server } = envConfig;
  const isProduction = server.NODE_ENV === 'production';

  // Get allowed origins from environment or use defaults
  let origins: (string | RegExp)[] = [];

  if (server.CORS_ORIGINS && server.CORS_ORIGINS !== '*') {
    // Parse comma-separated origins
    origins = server.CORS_ORIGINS.split(',').map((origin) => origin.trim());
  } else if (isProduction) {
    // In production, use configured origins or empty array (will be configured via env)
    origins = [];
  } else {
    // In development, allow localhost origins
    origins = [...DEVELOPMENT_ORIGINS];
  }

  // If CORS_ORIGINS is '*', allow any origin
  const allowAnyOrigin = server.CORS_ORIGINS === '*';

  return {
    origins,
    methods: DEFAULT_ALLOWED_METHODS,
    allowedHeaders: DEFAULT_ALLOWED_HEADERS,
    exposedHeaders: DEFAULT_EXPOSED_HEADERS,
    credentials: true,
    maxAge: DEFAULT_MAX_AGE,
    allowAnyOrigin,
    optionsSuccessStatus: 204,
  };
}

// ============================================================================
// CORS Configuration Instance
// ============================================================================

/**
 * CORS configuration instance
 */
export const corsConfig: CorsConfig = createCorsConfig();

// ============================================================================
// CORS Helper Functions
// ============================================================================

/**
 * Gets the CORS configuration
 * @param envConfig - The environment configuration (optional)
 * @returns CORS configuration object
 *
 * @example
 * const config = getCorsConfig();
 */
export function getCorsConfig(envConfig: EnvConfig = env): CorsConfig {
  return createCorsConfig(envConfig);
}

/**
 * Checks if an origin is allowed
 * @param origin - The origin to check
 * @param config - The CORS configuration (optional)
 * @returns True if the origin is allowed
 *
 * @example
 * isOriginAllowed('https://example.com') // true or false
 */
export function isOriginAllowed(
  origin: string | null | undefined,
  config: CorsConfig = corsConfig
): boolean {
  if (!origin) {
    return false;
  }

  // If any origin is allowed, return true
  if (config.allowAnyOrigin) {
    return true;
  }

  // Check if origin matches any allowed origin
  for (const allowed of config.origins) {
    if (typeof allowed === 'string') {
      // Check exact match
      if (allowed === origin) {
        return true;
      }
    } else if (allowed instanceof RegExp) {
      // Check regex match
      if (allowed.test(origin)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Gets all allowed origins
 * @param config - The CORS configuration (optional)
 * @returns Array of allowed origins
 *
 * @example
 * const origins = getAllowedOrigins();
 */
export function getAllowedOrigins(config: CorsConfig = corsConfig): (string | RegExp)[] {
  if (config.allowAnyOrigin) {
    return ['*'];
  }

  return [...config.origins];
}

/**
 * Gets the CORS configuration for a specific route
 * @param path - The route path
 * @param routeConfigs - Array of route-specific configurations
 * @param defaultConfig - Default CORS configuration (optional)
 * @returns CORS configuration for the route
 *
 * @example
 * const config = getCorsForRoute('/api/auth/*', routeConfigs);
 */
export function getCorsForRoute(
  path: string,
  routeConfigs: CorsRouteOptions[] = [],
  defaultConfig: CorsConfig = corsConfig
): CorsConfig {
  // Find matching route configuration
  for (const route of routeConfigs) {
    if (typeof route.path === 'string') {
      // Check if path matches the route path pattern
      if (path === route.path || path.startsWith(route.path.replace(/\*/g, ''))) {
        return {
          ...defaultConfig,
          ...route.config,
        };
      }
    } else if (route.path instanceof RegExp) {
      // Check regex pattern
      if (route.path.test(path)) {
        return {
          ...defaultConfig,
          ...route.config,
        };
      }
    }
  }

  return defaultConfig;
}

/**
 * Gets CORS configuration as Express/Connect middleware options
 * @param config - The CORS configuration (optional)
 * @returns CORS middleware options
 *
 * @example
 * const options = getCorsMiddlewareOptions();
 */
export function getCorsMiddlewareOptions(config: CorsConfig = corsConfig): {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
  optionsSuccessStatus: number;
} {
  return {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        callback(null, true);
        return;
      }

      // Check if origin is allowed
      const allowed = isOriginAllowed(origin, config);
      callback(null, allowed);
    },
    methods: config.methods,
    allowedHeaders: config.allowedHeaders,
    exposedHeaders: config.exposedHeaders,
    credentials: config.credentials,
    maxAge: config.maxAge,
    optionsSuccessStatus: config.optionsSuccessStatus,
  };
}

/**
 * Adds an origin to the CORS configuration
 * @param origin - The origin to add
 * @param config - The CORS configuration (optional)
 * @returns Updated CORS configuration
 *
 * @example
 * const config = addOrigin('https://example.com');
 */
export function addOrigin(origin: string | RegExp, config: CorsConfig = corsConfig): CorsConfig {
  const newConfig = { ...config };

  // Check if origin already exists
  const exists = config.origins.some((o) => {
    if (typeof o === 'string' && typeof origin === 'string') {
      return o === origin;
    }
    if (o instanceof RegExp && origin instanceof RegExp) {
      return o.source === origin.source;
    }
    return false;
  });

  if (!exists) {
    newConfig.origins = [...config.origins, origin];
  }

  return newConfig;
}

/**
 * Removes an origin from the CORS configuration
 * @param origin - The origin to remove
 * @param config - The CORS configuration (optional)
 * @returns Updated CORS configuration
 *
 * @example
 * const config = removeOrigin('https://example.com');
 */
export function removeOrigin(origin: string | RegExp, config: CorsConfig = corsConfig): CorsConfig {
  const newConfig = { ...config };

  newConfig.origins = config.origins.filter((o) => {
    if (typeof o === 'string' && typeof origin === 'string') {
      return o !== origin;
    }
    if (o instanceof RegExp && origin instanceof RegExp) {
      return o.source !== origin.source;
    }
    return true;
  });

  return newConfig;
}

/**
 * Adds a method to the allowed methods
 * @param method - The HTTP method to add
 * @param config - The CORS configuration (optional)
 * @returns Updated CORS configuration
 *
 * @example
 * const config = addMethod('PATCH');
 */
export function addMethod(method: string, config: CorsConfig = corsConfig): CorsConfig {
  const newConfig = { ...config };

  if (!config.methods.includes(method)) {
    newConfig.methods = [...config.methods, method];
  }

  return newConfig;
}

/**
 * Removes a method from the allowed methods
 * @param method - The HTTP method to remove
 * @param config - The CORS configuration (optional)
 * @returns Updated CORS configuration
 *
 * @example
 * const config = removeMethod('PATCH');
 */
export function removeMethod(method: string, config: CorsConfig = corsConfig): CorsConfig {
  const newConfig = { ...config };

  newConfig.methods = config.methods.filter((m) => m !== method);

  return newConfig;
}

/**
 * Adds a header to the allowed headers
 * @param header - The header to add
 * @param config - The CORS configuration (optional)
 * @returns Updated CORS configuration
 *
 * @example
 * const config = addHeader('X-Custom-Header');
 */
export function addHeader(header: string, config: CorsConfig = corsConfig): CorsConfig {
  const newConfig = { ...config };

  if (!config.allowedHeaders.includes(header)) {
    newConfig.allowedHeaders = [...config.allowedHeaders, header];
  }

  return newConfig;
}

/**
 * Removes a header from the allowed headers
 * @param header - The header to remove
 * @param config - The CORS configuration (optional)
 * @returns Updated CORS configuration
 *
 * @example
 * const config = removeHeader('X-Custom-Header');
 */
export function removeHeader(header: string, config: CorsConfig = corsConfig): CorsConfig {
  const newConfig = { ...config };

  newConfig.allowedHeaders = config.allowedHeaders.filter((h) => h !== header);

  return newConfig;
}

/**
 * Validates CORS configuration
 * @param config - The CORS configuration to validate
 * @returns True if the configuration is valid, false otherwise
 *
 * @example
 * const isValid = validateCorsConfig(config);
 */
export function validateCorsConfig(config: CorsConfig): boolean {
  if (!config || typeof config !== 'object') {
    return false;
  }

  // Check origins
  if (!config.allowAnyOrigin && (!config.origins || config.origins.length === 0)) {
    return false;
  }

  // Check methods
  if (!config.methods || config.methods.length === 0) {
    return false;
  }

  // Check allowed headers
  if (!config.allowedHeaders || config.allowedHeaders.length === 0) {
    return false;
  }

  // Check maxAge
  if (typeof config.maxAge !== 'number' || config.maxAge < 0) {
    return false;
  }

  return true;
}
