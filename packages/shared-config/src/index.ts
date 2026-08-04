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

// Export GitHub OAuth configuration
export {
  // Constants
  GITHUB_API_VERSION,
  GITHUB_AUTH_ENDPOINT,
  GITHUB_TOKEN_ENDPOINT,
  GITHUB_USER_INFO_ENDPOINT,
  GITHUB_USER_EMAILS_ENDPOINT,
  GITHUB_SCOPES,
  GITHUB_RESPONSE_TYPE,
  GITHUB_GRANT_TYPE,
  GITHUB_OAUTH_ERRORS,
  GITHUB_OAUTH_ERROR_MESSAGES,

  // Configuration
  githubOAuthConfig,
  createGitHubOAuthConfig,

  // Helper functions
  isGitHubOAuthConfigured,
  getGitHubLoginUrl,
  getGitHubTokenExchangeBody,
  getGitHubUserInfoUrl,
  getGitHubUserEmailsUrl,
  extractGitHubUserInfo,
  extractGitHubPrimaryEmail,
  extractGitHubAllEmails,
  isValidGitHubTokenResponse,

  // Error handling
  getGitHubOAuthErrorMessage,
  isGitHubOAuthAccessDenied,
} from './oauth/github.config';

// Export GitHub OAuth types
export type {
  GitHubOAuthConfig,
  GitHubLoginUrlOptions,
  GitHubUserInfo,
  GitHubEmailInfo,
} from './oauth/github.config';

// Export Apple OAuth configuration
export {
  // Constants
  APPLE_AUTH_ENDPOINT,
  APPLE_TOKEN_ENDPOINT,
  APPLE_USER_INFO_ENDPOINT,
  APPLE_SCOPES,
  APPLE_RESPONSE_TYPE,
  APPLE_RESPONSE_MODE,
  APPLE_GRANT_TYPE,
  APPLE_OAUTH_ERRORS,
  APPLE_OAUTH_ERROR_MESSAGES,

  // Configuration
  appleOAuthConfig,
  createAppleOAuthConfig,

  // Helper functions
  isAppleOAuthConfigured,
  getAppleLoginUrl,
  getAppleTokenExchangeBody,
  extractAppleUserInfo,
  isValidAppleTokenResponse,
  validateAppleIDToken,
  getAppleClientSecret,

  // Error handling
  getAppleOAuthErrorMessage,
  isAppleOAuthAccessDenied,
} from './oauth/apple.config';

// Export Apple OAuth types
export type {
  AppleOAuthConfig,
  AppleLoginUrlOptions,
  AppleUserInfo,
  AppleIDTokenPayload,
} from './oauth/apple.config';

// Export LinkedIn OAuth configuration
export {
  // Constants
  LINKEDIN_API_VERSION,
  LINKEDIN_AUTH_ENDPOINT,
  LINKEDIN_TOKEN_ENDPOINT,
  LINKEDIN_USER_INFO_ENDPOINT,
  LINKEDIN_SCOPES,
  LINKEDIN_RESPONSE_TYPE,
  LINKEDIN_GRANT_TYPE,
  LINKEDIN_OAUTH_ERRORS,
  LINKEDIN_OAUTH_ERROR_MESSAGES,

  // Configuration
  linkedinOAuthConfig,
  createLinkedInOAuthConfig,

  // Helper functions
  isLinkedInOAuthConfigured,
  getLinkedInLoginUrl,
  getLinkedInTokenExchangeBody,
  getLinkedInUserInfoUrl,
  extractLinkedInUserInfo,
  isValidLinkedInTokenResponse,

  // Error handling
  getLinkedInOAuthErrorMessage,
  isLinkedInOAuthAccessDenied,
} from './oauth/linkedin.config';

// Export LinkedIn OAuth types
export type {
  LinkedInOAuthConfig,
  LinkedInLoginUrlOptions,
  LinkedInUserInfo,
} from './oauth/linkedin.config';

// Export SEO configuration
export {
  // Default configurations
  DEFAULT_SEO_CONFIG,
  DEFAULT_OPEN_GRAPH_CONFIG,
  DEFAULT_ROBOTS_CONFIG,

  // Configuration instances
  seoConfig,
  openGraphConfig,
  robotsConfig,
  jsonLdConfig,

  // Factory functions
  createSeoConfig,
  createOpenGraphConfig,
  createRobotsConfig,
  createJsonLdConfig,

  // Helper functions
  getTitle,
  getOpenGraphConfig,
  getRobotsTag,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  getBreadcrumbJsonLd,
  getMetaTags,
} from './seo/seo.config';

// Export SEO types
export type { SeoConfig, OpenGraphConfig, RobotsConfig, JsonLdConfig } from './seo/seo.config';

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
