// packages/shared-config/src/index.ts
/**
 * Shared configuration module entry point
 * Exports all configuration schemas, types, and validation utilities
 */

// Export environment schemas
export {
  // Base schemas
  NodeEnvSchema,
  ServerConfigSchema,
  DatabaseConfigSchema,
  RedisConfigSchema,
  JWTConfigSchema,
  OAuthConfigSchema,
  SecurityConfigSchema,
  EmailConfigSchema,
  FeatureFlagSchema,

  // Complete environment schema
  EnvSchema,

  // Validation functions
  parseEnv,
  safeParseEnv,
  validateEnvVar,
  hasEnvVar,

  // Utility functions
  maskSensitiveEnv,
} from './env/env.schema';

// Export environment validation and utilities
export {
  // Core exports
  env,
  validateEnv,

  // Environment checks
  isProduction,
  isDevelopment,
  isStaging,
  isTest,
  getNodeEnv,

  // Configuration getters
  getEnv,
  getEnvOrDefault,

  // OAuth utilities
  isOAuthProviderConfigured,
  isOAuthConfigured,
  getEnabledOAuthProviders,

  // Feature flags
  isFeatureEnabled,
  getFeatureFlags,

  // Database utilities
  getDatabaseUrl,
  getRedisUrl,

  // Security utilities
  getJWTConfig,
  isSessionEncryptionConfigured,

  // Environment info
  getEnvironmentInfo,
} from './env/env.validation';

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
