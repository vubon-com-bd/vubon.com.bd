/**
 * Security Configurations - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-config/security/index
 *
 * @description
 * Central export point for all security configurations.
 * Provides type-safe access to CORS, Helmet, and Rate Limit settings.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// CORS Configuration (cors.config.ts)
// ============================================================
export {
  // Configuration
  corsConfig,
  corsConfigByEnv,

  // Helper Functions
  getCorsConfig,
  isOriginAllowed,
  getAllowedOrigins,

  // Constants
  ALLOWED_METHODS,
  ALLOWED_HEADERS,
  EXPOSED_HEADERS,
  DEVELOPMENT_ORIGINS,
  TEST_ORIGINS,
} from './cors.config';

export type {
  CorsConfig,
  AllowedMethod,
  AllowedHeader,
  ExposedHeader,
  CorsOptions,
} from './cors.config';

// ============================================================
// Helmet/Security Headers Configuration (helmet.config.ts)
// ============================================================
export {
  // Configurations
  cspConfig,
  securityHeadersConfig,
  trustedTypesConfig,
  helmetConfigByEnv,

  // Helper Functions
  getHelmetConfig,
  isCspReportOnly,
  getCspReportUri,
  getCspNonce,
  isCspUnsafeInlineAllowed,
  getAllowedDomains,

  // Constants
  PRODUCTION_DOMAINS,
  CDN_DOMAINS,
  PAYMENT_DOMAINS,
  ANALYTICS_DOMAINS,
  IS_PRODUCTION,
} from './helmet.config';

export type {
  CSPConfig,
  SecurityHeadersConfig,
  TrustedTypesConfig,
  HelmetConfigByEnv,
  HelmetConfig,
} from './helmet.config';

// ============================================================
// Rate Limit Configuration (rate-limit.config.ts)
// ============================================================
export {
  // Configuration
  rateLimitConfig,
  rateLimitByMethod,

  // Helper Functions
  getEndpointRateLimit,
  getMethodRateLimit,
  getUserTierRateLimit,
  isIpWhitelisted,

  // Constants
  ONE_MINUTE,
  FIVE_MINUTES,
  FIFTEEN_MINUTES,
  ONE_HOUR,
  DEFAULT_GLOBAL_LIMIT,
  DEFAULT_GLOBAL_WINDOW,
  DEFAULT_LOGIN_LIMIT,
  DEFAULT_LOGIN_WINDOW,
} from './rate-limit.config';

export type {
  RateLimitConfig,
  RateLimitRule,
} from './rate-limit.config';

// ============================================================
// Cross-Security Utility Types & Functions
// ============================================================

import { env } from '../env/env.validation';
import { corsConfig, corsConfigByEnv } from './cors.config';
import { helmetConfigByEnv } from './helmet.config';
import { rateLimitConfig } from './rate-limit.config';

/**
 * All security configuration names
 */
export type SecurityConfigName = 'cors' | 'helmet' | 'rate-limit';

/**
 * Get all security configurations for the current environment
 * Returns a consolidated security config object
 */
export const getSecurityConfig = () => {
  const environment = env.NODE_ENV as 'development' | 'production' | 'test';

  return {
    cors: corsConfigByEnv[environment] || corsConfig,
    helmet: helmetConfigByEnv[environment] || helmetConfigByEnv.production,
    rateLimit: rateLimitConfig,
    environment,
    isProduction: environment === 'production',
    isDevelopment: environment === 'development',
    isTest: environment === 'test',
  };
};

/**
 * Type for consolidated security configuration
 */
export type SecurityConfig = ReturnType<typeof getSecurityConfig>;

/**
 * Check if security is properly configured for production
 * Returns true if all required security features are enabled
 */
export const isProductionSecurityReady = (): boolean => {
  const config = getSecurityConfig();

  // Check CORS: should have strict origins in production
  const corsOrigins = config.cors.origin;
  const hasCorsRestrictions =
    typeof corsOrigins === 'string' ||
    (Array.isArray(corsOrigins) && corsOrigins.length > 0);

  // Check Helmet: CSP should not be in report-only mode in production
  const cspEnabled = !config.helmet.csp.reportOnly;

  // Check Rate Limiting: should have reasonable limits
  const hasRateLimits = config.rateLimit.global.max > 0;

  return hasCorsRestrictions && cspEnabled && hasRateLimits;
};

/**
 * Get security readiness status with details
 */
export const getSecurityReadinessStatus = () => {
  const config = getSecurityConfig();

  return {
    isReady: isProductionSecurityReady(),
    checks: {
      cors: {
        passed: config.cors.origin !== '*',
        details: `Origins: ${
          Array.isArray(config.cors.origin)
            ? config.cors.origin.join(', ')
            : config.cors.origin
        }`,
      },
      csp: {
        passed: !config.helmet.csp.reportOnly,
        details: `CSP Report Only: ${config.helmet.csp.reportOnly}`,
      },
      rateLimit: {
        passed: config.rateLimit.global.max > 0,
        details: `Global limit: ${config.rateLimit.global.max} requests per ${config.rateLimit.global.windowMs / 1000}s`,
      },
      hsts: {
        passed: config.helmet.hsts.enabled,
        details: `HSTS Enabled: ${config.helmet.hsts.enabled}`,
      },
    },
    environment: config.environment,
  };
};

export type SecurityReadinessStatus = ReturnType<
  typeof getSecurityReadinessStatus
>;
