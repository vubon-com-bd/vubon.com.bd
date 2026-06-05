/**
 * OAuth Configuration - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/oauth/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure config exports only
 */

// ============================================================
// Google OAuth Configuration
// ============================================================
export {
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
  getRevokeUrl as getGoogleRevokeUrl,
} from './google.config';

// ============================================================
// Facebook OAuth Configuration
// ============================================================
export {
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
  getUserInfoUrl as getFacebookUserInfoUrl,
  extractAvatarUrl,
  extractFacebookUserInfo,
  getRevokeUrl as getFacebookRevokeUrl,
  getDebugTokenUrl,
} from './facebook.config';

// ============================================================
// GitHub OAuth Configuration
// ============================================================
export {
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
  getRevokeUrl as getGitHubRevokeUrl,
  extractPrimaryEmail,
  extractGitHubUserInfo,
  getUserInfoUrl as getGitHubUserInfoUrl,
  getGitHubApiHeaders,
  getUserEmailsUrl,
} from './github.config';

// ============================================================
// Apple OAuth Configuration
// ============================================================
export {
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
  getRevokeUrl as getAppleRevokeUrl,
  getRealUserStatusDescription,
  isPrivateRelayEmail,
} from './apple.config';

// ============================================================
// LinkedIn OAuth Configuration
// ============================================================
export {
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
  getRevokeUrl as getLinkedInRevokeUrl,
  getUserInfoUrl as getLinkedInUserInfoUrl,
  extractProfilePicture,
} from './linkedin.config';
