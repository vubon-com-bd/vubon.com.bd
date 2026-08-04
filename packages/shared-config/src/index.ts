// packages/shared-config/src/index.ts
/**
 * Shared configuration module entry point
 * Exports all configuration schemas, types, and utilities
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

// Export Google OAuth configuration
export {
  // Constants
  GOOGLE_AUTH_ENDPOINT,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USER_INFO_ENDPOINT,
  GOOGLE_REVOKE_ENDPOINT,
  GOOGLE_SCOPES,
  GOOGLE_RESPONSE_TYPE,
  GOOGLE_GRANT_TYPE,
  GOOGLE_ACCESS_TYPE,
  GOOGLE_OAUTH_ERRORS,
  GOOGLE_OAUTH_ERROR_MESSAGES,

  // Configuration
  googleOAuthConfig,
  createGoogleOAuthConfig,

  // Helper functions
  isGoogleOAuthConfigured,
  getGoogleLoginUrl,
  getGoogleTokenExchangeBody,
  getGoogleRevokeBody,
  getGoogleUserInfoUrl,
  getGoogleRevokeUrl,

  // Error handling
  isGoogleOAuthAccessDenied,
  isGoogleOAuthConfigError,
  getGoogleOAuthErrorMessage,

  // Token validation
  isValidGoogleTokenResponse,
  isValidGoogleUserInfo,
} from './oauth/google.config';

// Export Google OAuth types
export type { GoogleOAuthConfig, GoogleLoginUrlOptions } from './oauth/google.config';

// Export Facebook OAuth configuration
export {
  // Constants
  FACEBOOK_API_VERSION,
  FACEBOOK_AUTH_ENDPOINT,
  FACEBOOK_TOKEN_ENDPOINT,
  FACEBOOK_USER_INFO_ENDPOINT,
  FACEBOOK_SCOPES,
  FACEBOOK_RESPONSE_TYPE,
  FACEBOOK_GRANT_TYPE,
  FACEBOOK_OAUTH_ERRORS,
  FACEBOOK_OAUTH_ERROR_MESSAGES,

  // Configuration
  facebookOAuthConfig,
  createFacebookOAuthConfig,

  // Helper functions
  isFacebookOAuthConfigured,
  getFacebookLoginUrl,
  getFacebookTokenExchangeBody,
  getFacebookUserInfoUrl,
  extractFacebookUserInfo,
  isValidFacebookTokenResponse,

  // Error handling
  getFacebookOAuthErrorMessage,
  isFacebookOAuthAccessDenied,
} from './oauth/facebook.config';

// Export Facebook OAuth types
export type {
  FacebookOAuthConfig,
  FacebookLoginUrlOptions,
  FacebookUserInfo,
} from './oauth/facebook.config';

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
