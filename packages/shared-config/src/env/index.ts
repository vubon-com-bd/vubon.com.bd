/**
 * Environment Configuration - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-config/env/index
 *
 * @description
 * Central export point for all environment configuration.
 * Provides type-safe access to validated environment variables.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Environment Schema (env.schema.ts)
// ============================================================
export {
  // Core schemas
  NodeEnvSchema,
  ServerConfigSchema,
  DatabaseConfigSchema,
  RedisConfigSchema,
  JWTConfigSchema,
  OAuthConfigSchema,
  SecurityConfigSchema,
  EmailConfigSchema,
  FeatureFlagsSchema,
  EnvSchema,

  // OAuth provider schemas
  GoogleOAuthSchema,
  GitHubOAuthSchema,
  FacebookOAuthSchema,
  AppleOAuthSchema,
  LinkedInOAuthSchema,
  WhatsAppOAuthSchema,
  BkashOAuthSchema,
  NagadOAuthSchema,
  RequiredOAuthConfigSchema,
  OptionalOAuthConfigSchema,
} from './env.schema';

export type {
  // Core types
  NodeEnv,
  ServerConfig,
  DatabaseConfig,
  RedisConfig,
  JWTConfig,
  OAuthConfig,
  SecurityConfig,
  EmailConfig,
  FeatureFlags,
  Env,

  // OAuth provider types
  RequiredOAuthConfig,
} from './env.schema';

// ============================================================
// Environment Validation (env.validation.ts)
// ============================================================
export {
  // Core validation
  validateEnv,
  safeValidateEnv,

  // Validated environment object (readonly & frozen)
  env,

  
  // ✅ NEW: Export default values from shared-constants
  DEFAULT_GLOBAL_LIMIT,
  DEFAULT_GLOBAL_WINDOW,
  DEFAULT_LOGIN_LIMIT,
  DEFAULT_LOGIN_WINDOW,
  
  // Environment helpers
  isProduction,
  isDevelopment,
  isTest,
  isStaging,
  getEnv,
  isOAuthConfigured,
  getConfiguredOAuthProviders,
  isFeatureEnabled,
  getCorsOrigins,
  isMaintenanceMode,
  isDebugMode,
} from './env.validation';

export type {
  ValidatedEnv,
} from './env.validation';
