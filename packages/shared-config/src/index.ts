/**
 * Shared configuration module entry point
 * Exports all configuration schemas, types, and utilities
 */

// Export environment schemas
export {
  NodeEnvSchema,
  ServerConfigSchema,
  DatabaseConfigSchema,
  RedisConfigSchema,
  JWTConfigSchema,
  OAuthConfigSchema,
  SecurityConfigSchema,
  EmailConfigSchema,
  FeatureFlagSchema,
  EnvSchema,
  parseEnv,
  safeParseEnv,
  validateEnvVar,
  hasEnvVar,
  maskSensitiveEnv,
} from './env/env.schema';

// Export environment validation and utilities
export {
  env,
  validateEnv,
  isProduction,
  isDevelopment,
  isStaging,
  isTest,
  getNodeEnv,
  getEnv,
  getEnvOrDefault,
  isOAuthProviderConfigured,
  isOAuthConfigured,
  getEnabledOAuthProviders,
  isFeatureEnabled,
  getFeatureFlags,
  getDatabaseUrl,
  getRedisUrl,
  getJWTConfig,
  isSessionEncryptionConfigured,
  getEnvironmentInfo,
} from './env/env.validation';

// Export CORS configuration
export {
  DEFAULT_ALLOWED_METHODS,
  DEFAULT_ALLOWED_HEADERS,
  DEFAULT_EXPOSED_HEADERS,
  DEFAULT_MAX_AGE,
  DEVELOPMENT_ORIGINS,
  corsConfig,
  createCorsConfig,
  getCorsConfig,
  isOriginAllowed,
  getAllowedOrigins,
  getCorsForRoute,
  getCorsMiddlewareOptions,
  addOrigin,
  removeOrigin,
  addMethod,
  removeMethod,
  addHeader,
  removeHeader,
  validateCorsConfig,
  type CorsConfig,
  type CorsRouteOptions,
} from './security/cors.config';

// Export Rate Limit configuration
export {
  RATE_LIMIT_MESSAGES,
  TIME_WINDOWS,
  rateLimitConfig,
  createRateLimitConfig,
  getEndpointRateLimit,
  getMethodRateLimit,
  getUserTierRateLimit,
  addEndpointRateLimit,
  removeEndpointRateLimit,
  generateRateLimitKey,
  formatRateLimitMessage,
  validateRateLimitConfig,
  type RateLimitConfig,
  type RateLimitRule,
  type AuthRateLimit,
  type ApiRateLimit,
  type UserTierRateLimit,
  type TierRateLimit,
  type EndpointRateLimit,
  type UserTier,
} from './security/rate-limit.config';

// Export Helmet configuration
export {
  DEFAULT_ALLOWED_DOMAINS,
  DEFAULT_HSTS_MAX_AGE,
  DEFAULT_REFERRER_POLICY,
  DEFAULT_PERMISSIONS_POLICY,
  helmetConfig,
  createHelmetConfig,
  getAllowedDomains,
  isCspReportOnly,
  getCspConfig,
  getSecurityHeadersConfig,
  getHelmetConfig,
  addCspDomain,
  removeCspDomain,
  validateHelmetConfig,
  type HelmetConfig,
  type CSPConfig,
  type CSPDirectives,
  type HSTSConfig,
  type XFrameOptionsConfig,
  type ReferrerPolicyConfig,
  type PermissionsPolicyConfig,
  type OtherHeadersConfig,
} from './security/helmet.config';

// Export types
export type {
  NodeEnv,
  ServerConfig,
  DatabaseConfig,
  RedisConfig,
  JWTConfig,
  OAuthConfig,
  SecurityConfig,
  EmailConfig,
  FeatureFlags,
  EnvConfig,
} from './env/env.schema';
