/**
 * Shared Config - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-config/index
 *
 * @description
 * Central export point for all configuration modules.
 * Provides type-safe access to environment, OAuth, security, SEO, and OTP settings.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// 1. Environment Configuration (env/index.ts)
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

  // Core validation
  validateEnv,
  safeValidateEnv,

  // Validated environment object (readonly & frozen)
  env,

  // Environment helper
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
} from './env';

export type {
  // Core types
  NodeEnv,
  ServerConfig,
  DatabaseConfig,
  RedisConfig,
  JWTConfig,
  OAuthConfig,
  SecurityConfig as Security_Config,
  EmailConfig,
  FeatureFlags,
  Env,

  // OAuth provider types
  RequiredOAuthConfig,
  ValidatedEnv,
} from './env';

// ============================================================
// 2. OAuth Configurations (oauth/index.ts)
// ============================================================
export {
  // Google OAuth
  GOOGLE_PROVIDER_NAME,
  GOOGLE_AUTH_URL,
  GOOGLE_TOKEN_URL,
  GOOGLE_USER_INFO_URL,
  GOOGLE_REVOKE_URL,
  GOOGLE_DISCOVERY_URL,
  GOOGLE_OAUTH_VERSION,
  GOOGLE_OIDC_VERSION,
  GOOGLE_SCOPES,
  GOOGLE_DEFAULT_SCOPES,
  GOOGLE_RESPONSE_TYPES,
  GOOGLE_DEFAULT_RESPONSE_TYPE,
  GOOGLE_GRANT_TYPES,
  GOOGLE_PROMPT_TYPES,
  GOOGLE_DEFAULT_PROMPT,
  GOOGLE_ACCESS_TYPES,
  GOOGLE_DEFAULT_ACCESS_TYPE,
  googleOAuthConfig,
  isGoogleOAuthConfigured,
  getGoogleLoginUrl,
  getGoogleRevokeUrl,

  // Facebook OAuth
  FACEBOOK_PROVIDER_NAME,
  FACEBOOK_API_VERSION,
  FACEBOOK_AUTH_URL,
  FACEBOOK_TOKEN_URL,
  FACEBOOK_USER_INFO_URL,
  FACEBOOK_REVOKE_URL,
  FACEBOOK_DEBUG_TOKEN_URL,
  FACEBOOK_OAUTH_VERSION,
  FACEBOOK_SCOPES,
  FACEBOOK_DEFAULT_SCOPES,
  FACEBOOK_RESPONSE_TYPES,
  FACEBOOK_DEFAULT_RESPONSE_TYPE,
  FACEBOOK_DISPLAY_MODES,
  FACEBOOK_DEFAULT_DISPLAY,
  FACEBOOK_GRANT_TYPES,
  facebookOAuthConfig,
  isFacebookOAuthConfigured,
  getFacebookLoginUrl,
  getFacebookUserInfoUrl,
  extractAvatarUrl,
  extractFacebookUserInfo,
  getFacebookRevokeUrl,
  getDebugTokenUrl,

  // GitHub OAuth
  GITHUB_PROVIDER_NAME,
  GITHUB_AUTH_URL,
  GITHUB_TOKEN_URL,
  GITHUB_USER_INFO_URL,
  GITHUB_USER_EMAIL_URL,
  GITHUB_REVOKE_URL,
  GITHUB_API_VERSION,
  GITHUB_SCOPES,
  GITHUB_DEFAULT_SCOPES,
  GITHUB_RESPONSE_TYPES,
  GITHUB_DEFAULT_RESPONSE_TYPE,
  GITHUB_GRANT_TYPES,
  githubOAuthConfig,
  isGitHubOAuthConfigured,
  getGitHubLoginUrl,
  getGitHubRevokeUrl,
  extractPrimaryEmail,
  extractGitHubUserInfo,
  getGitHubUserInfoUrl,
  getGitHubApiHeaders,
  getUserEmailsUrl,

  // Apple OAuth
  APPLE_PROVIDER_NAME,
  APPLE_AUTH_URL,
  APPLE_TOKEN_URL,
  APPLE_REVOKE_URL,
  APPLE_USER_INFO_URL,
  APPLE_OAUTH_VERSION,
  APPLE_SCOPES,
  APPLE_DEFAULT_SCOPES,
  APPLE_RESPONSE_TYPES,
  APPLE_DEFAULT_RESPONSE_TYPE,
  APPLE_RESPONSE_MODES,
  APPLE_DEFAULT_RESPONSE_MODE,
  APPLE_GRANT_TYPES,
  appleOAuthConfig,
  isAppleOAuthConfigured,
  getAppleLoginUrl,
  extractAppleUserInfo,
  getAppleClientSecretConfig,
  getAppleRevokeUrl,
  getRealUserStatusDescription,
  isPrivateRelayEmail,

  // LinkedIn OAuth
  LINKEDIN_PROVIDER_NAME,
  LINKEDIN_AUTH_URL,
  LINKEDIN_TOKEN_URL,
  LINKEDIN_USER_INFO_URL,
  LINKEDIN_REVOKE_URL,
  LINKEDIN_EMAIL_URL,
  LINKEDIN_API_VERSION,
  LINKEDIN_OAUTH_VERSION,
  LINKEDIN_SCOPES,
  LINKEDIN_DEFAULT_SCOPES,
  LINKEDIN_RESPONSE_TYPES,
  LINKEDIN_DEFAULT_RESPONSE_TYPE,
  LINKEDIN_GRANT_TYPES,
  linkedinOAuthConfig,
  isLinkedInOAuthConfigured,
  getLinkedInLoginUrl,
  getEmailUrl,
  extractLinkedInUserInfo,
  getLinkedInApiHeaders,
  extractLinkedInEmail,
  getLinkedInRevokeUrl,
  getLinkedInUserInfoUrl,
  extractProfilePicture,
} from './oauth';

export type {
  // Google types
  GoogleScope,
  GoogleResponseType,
  GoogleGrantType,
  GooglePromptType,
  GoogleAccessType,
  GoogleOAuthConfig,

  // Facebook types
  FacebookScope,
  FacebookResponseType,
  FacebookDisplayMode,
  FacebookGrantType,
  FacebookOAuthConfig,
  ExtractedFacebookUserInfo,

  // GitHub types
  GitHubScope,
  GitHubResponseType,
  GitHubGrantType,
  GitHubOAuthConfig,
  ExtractedGitHubUserInfo,
  ExtractedPrimaryEmail,
  GitHubApiHeaders,

  // Apple types
  AppleScope,
  AppleResponseType,
  AppleResponseMode,
  AppleGrantType,
  AppleOAuthConfig,
  ExtractedAppleUserInfo,
  AppleClientSecretConfig,

  // LinkedIn types
  LinkedInScope,
  LinkedInResponseType,
  LinkedInGrantType,
  LinkedInOAuthConfig,
  ExtractedLinkedInUserInfo,
  LinkedInApiHeaders,
} from './oauth';

// ============================================================
// 3. Security Configurations (security/index.ts)
// ============================================================
export {
  // CORS Configuration
  corsConfig,
  corsConfigByEnv,
  getCorsConfig,
  isOriginAllowed,
  getAllowedOrigins,

  // Helmet/Security Headers
  cspConfig,
  securityHeadersConfig,
  trustedTypesConfig,
  helmetConfigByEnv,
  getHelmetConfig,
  isCspReportOnly,
  getCspReportUri,
  getCspNonce,
  isCspUnsafeInlineAllowed,
  getAllowedDomains,

  // Rate Limit Configuration
  rateLimitConfig,
  rateLimitByMethod,
  getEndpointRateLimit,
  getMethodRateLimit,
  getUserTierRateLimit,
  isIpWhitelisted,

  // Cross-Security Utilities
  getSecurityConfig,
  isProductionSecurityReady,
  getSecurityReadinessStatus,
} from './security';

export type {
  // CORS types
  CorsConfig,
  AllowedMethod,
  AllowedHeader,
  ExposedHeader,
  CorsOptions,

  // Helmet types
  CSPConfig,
  SecurityHeadersConfig,
  TrustedTypesConfig,
  HelmetConfigByEnv,
  HelmetConfig,

  // Rate Limit types
  RateLimitConfig,
  RateLimitRule,

  // Cross-Security types
  SecurityConfigName,
  SecurityConfig,
  SecurityReadinessStatus,
} from './security';

// ============================================================
// 4. SEO Configurations (seo/index.ts)
// ============================================================
export {
  // Robots.txt Configuration
  robotsTxtConfig,
  metaRobotsConfig,
  getRobotsTxtConfig,
  getMetaRobots,

  // SEO Configuration
  seoConfig,
  robotsConfig,
  getTitle,
  getOpenGraphConfig,

  // Sitemap Configuration
  sitemapConfig,
  getChangeFrequency,
  getPriority,
  getFullUrl,

  // Cross-SEO Utilities
  getSEOConfig,
  isSEOProductionReady,
  getSEOReadinessStatus,
  getSitemapUrls,
  getDefaultMetaRobots,
  isExcludedFromSitemap,
  shouldNoIndex,
  getCanonicalUrl,
} from './seo';

export type {
  // Robots types
  RobotsTxtConfig,
  MetaRobotsConfig,
  MetaRobots,

  // SEO types
  SEOConfig,
  RobotsConfig,
  OpenGraphConfig,
  TwitterConfig,
  JsonLdConfig,

  // Sitemap types
  SitemapConfig,
  ChangeFrequency,

  // Cross-SEO types
  SEOConfigName,
  SEOFullConfig,
  SEOReadinessStatus,
} from './seo';

// ============================================================
// 5. OTP Configuration (otp/otp.config.ts)
// ============================================================
export {
  // Main configuration object
  OTP_CONFIG,
} from './otp/otp.config';

export type {
  // Core OTP types
  OTPLengthConfig,
  OTPTypeConfig,
  OTPSupportedChannel,
  OTPRateLimitConfig,
  OTPTemplateConfig,
  OTPBangladeshSpecific,
  OTPConfig,
} from './otp/otp.config';

// ============================================================
// 6. Cross-Configuration Utilities
// ============================================================
export {
  // Environment helpers (already exported above, kept for consistency)
  // All cross-domain helpers are exported from their respective domains
} from './env';
