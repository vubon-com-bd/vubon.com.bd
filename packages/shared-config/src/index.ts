// packages/shared-config/src/index.ts
/**
 * Shared configuration module entry point
 * Exports all configuration schemas and types
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
