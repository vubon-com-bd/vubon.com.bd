/**
 * OAuth Configurations - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-config/oauth/index
 *
 * @description
 * Central export point for all OAuth provider configurations.
 * Provides type-safe access to Google, Facebook, GitHub, Apple, and LinkedIn OAuth settings.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 */

// ============================================================
// Google OAuth Configuration (google.config.ts)
// ============================================================
export {
  // Constants
  GOOGLE_PROVIDER_NAME,
  GOOGLE_AUTH_URL,
  GOOGLE_TOKEN_URL,
  GOOGLE_USER_INFO_URL,
  GOOGLE_REVOKE_URL,
  GOOGLE_DISCOVERY_URL,
  GOOGLE_OAUTH_VERSION,
  GOOGLE_OIDC_VERSION,

  // Scopes
  GOOGLE_SCOPES,
  GOOGLE_DEFAULT_SCOPES,

  // Response Types
  GOOGLE_RESPONSE_TYPES,
  GOOGLE_DEFAULT_RESPONSE_TYPE,

  // Grant Types
  GOOGLE_GRANT_TYPES,

  // Prompt Types
  GOOGLE_PROMPT_TYPES,
  GOOGLE_DEFAULT_PROMPT,

  // Access Types
  GOOGLE_ACCESS_TYPES,
  GOOGLE_DEFAULT_ACCESS_TYPE,

  // Configuration
  googleOAuthConfig,

  // Helper Functions
  isGoogleOAuthConfigured,
  getGoogleLoginUrl,
  getRevokeUrl as getGoogleRevokeUrl,
} from './google.config';

export type {
  GoogleScope,
  GoogleResponseType,
  GoogleGrantType,
  GooglePromptType,
  GoogleAccessType,
  GoogleOAuthConfig,
} from './google.config';

// ============================================================
// Facebook OAuth Configuration (facebook.config.ts)
// ============================================================
export {
  // Constants
  FACEBOOK_PROVIDER_NAME,
  FACEBOOK_API_VERSION,
  FACEBOOK_AUTH_URL,
  FACEBOOK_TOKEN_URL,
  FACEBOOK_USER_INFO_URL,
  FACEBOOK_REVOKE_URL,
  FACEBOOK_DEBUG_TOKEN_URL,
  FACEBOOK_OAUTH_VERSION,

  // Scopes
  FACEBOOK_SCOPES,
  FACEBOOK_DEFAULT_SCOPES,

  // Response Types
  FACEBOOK_RESPONSE_TYPES,
  FACEBOOK_DEFAULT_RESPONSE_TYPE,

  // Display Modes
  FACEBOOK_DISPLAY_MODES,
  FACEBOOK_DEFAULT_DISPLAY,

  // Grant Types
  FACEBOOK_GRANT_TYPES,

  // Configuration
  facebookOAuthConfig,

  // Helper Functions
  isFacebookOAuthConfigured,
  getFacebookLoginUrl,
  getUserInfoUrl as getFacebookUserInfoUrl,
  extractAvatarUrl,
  extractFacebookUserInfo,
  getRevokeUrl as getFacebookRevokeUrl,
  getDebugTokenUrl,
} from './facebook.config';

export type {
  FacebookScope,
  FacebookResponseType,
  FacebookDisplayMode,
  FacebookGrantType,
  FacebookOAuthConfig,
  ExtractedFacebookUserInfo,
} from './facebook.config';

// ============================================================
// GitHub OAuth Configuration (github.config.ts)
// ============================================================
export {
  // Constants
  GITHUB_PROVIDER_NAME,
  GITHUB_AUTH_URL,
  GITHUB_TOKEN_URL,
  GITHUB_USER_INFO_URL,
  GITHUB_USER_EMAIL_URL,
  GITHUB_REVOKE_URL,
  GITHUB_API_VERSION,

  // Scopes
  GITHUB_SCOPES,
  GITHUB_DEFAULT_SCOPES,

  // Response Types
  GITHUB_RESPONSE_TYPES,
  GITHUB_DEFAULT_RESPONSE_TYPE,

  // Grant Types
  GITHUB_GRANT_TYPES,

  // Configuration
  githubOAuthConfig,

  // Helper Functions
  isGitHubOAuthConfigured,
  getGitHubLoginUrl,
  getRevokeUrl as getGitHubRevokeUrl,
  extractPrimaryEmail,
  extractGitHubUserInfo,
  getUserInfoUrl as getGitHubUserInfoUrl,
  getGitHubApiHeaders,
  getUserEmailsUrl,
} from './github.config';

export type {
  GitHubScope,
  GitHubResponseType,
  GitHubGrantType,
  GitHubOAuthConfig,
  ExtractedGitHubUserInfo,
  ExtractedPrimaryEmail,
  GitHubApiHeaders,
} from './github.config';

// ============================================================
// Apple OAuth Configuration (apple.config.ts)
// ============================================================
export {
  // Constants
  APPLE_PROVIDER_NAME,
  APPLE_AUTH_URL,
  APPLE_TOKEN_URL,
  APPLE_REVOKE_URL,
  APPLE_USER_INFO_URL,
  APPLE_OAUTH_VERSION,

  // Scopes
  APPLE_SCOPES,
  APPLE_DEFAULT_SCOPES,

  // Response Types
  APPLE_RESPONSE_TYPES,
  APPLE_DEFAULT_RESPONSE_TYPE,

  // Response Modes
  APPLE_RESPONSE_MODES,
  APPLE_DEFAULT_RESPONSE_MODE,

  // Grant Types
  APPLE_GRANT_TYPES,

  // Configuration
  appleOAuthConfig,

  // Helper Functions
  isAppleOAuthConfigured,
  getAppleLoginUrl,
  extractAppleUserInfo,
  getAppleClientSecretConfig,
  getRevokeUrl as getAppleRevokeUrl,
  getRealUserStatusDescription,
  isPrivateRelayEmail,
} from './apple.config';

export type {
  AppleScope,
  AppleResponseType,
  AppleResponseMode,
  AppleGrantType,
  AppleOAuthConfig,
  ExtractedAppleUserInfo,
  AppleClientSecretConfig,
} from './apple.config';

// ============================================================
// LinkedIn OAuth Configuration (linkedin.config.ts)
// ============================================================
export {
  // Constants
  LINKEDIN_PROVIDER_NAME,
  LINKEDIN_AUTH_URL,
  LINKEDIN_TOKEN_URL,
  LINKEDIN_USER_INFO_URL,
  LINKEDIN_REVOKE_URL,
  LINKEDIN_EMAIL_URL,
  LINKEDIN_API_VERSION,
  LINKEDIN_OAUTH_VERSION,

  // Scopes
  LINKEDIN_SCOPES,
  LINKEDIN_DEFAULT_SCOPES,

  // Response Types
  LINKEDIN_RESPONSE_TYPES,
  LINKEDIN_DEFAULT_RESPONSE_TYPE,

  // Grant Types
  LINKEDIN_GRANT_TYPES,

  // Configuration
  linkedinOAuthConfig,

  // Helper Functions
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

export type {
  LinkedInScope,
  LinkedInResponseType,
  LinkedInGrantType,
  LinkedInOAuthConfig,
  ExtractedLinkedInUserInfo,
  LinkedInApiHeaders,
} from './linkedin.config';

// ============================================================
// Cross-OAuth Utility Types & Functions
// ============================================================

export type OAuthProviderName =
  | typeof GOOGLE_PROVIDER_NAME
  | typeof FACEBOOK_PROVIDER_NAME
  | typeof GITHUB_PROVIDER_NAME
  | typeof APPLE_PROVIDER_NAME
  | typeof LINKEDIN_PROVIDER_NAME;

export type OAuthConfigCheck = () => boolean;

export const OAUTH_CONFIG_CHECKS: Record<OAuthProviderName, OAuthConfigCheck> = {
  [GOOGLE_PROVIDER_NAME]: isGoogleOAuthConfigured,
  [FACEBOOK_PROVIDER_NAME]: isFacebookOAuthConfigured,
  [GITHUB_PROVIDER_NAME]: isGitHubOAuthConfigured,
  [APPLE_PROVIDER_NAME]: isAppleOAuthConfigured,
  [LINKEDIN_PROVIDER_NAME]: isLinkedInOAuthConfigured,
} as const;

export const getConfiguredProviders = (): OAuthProviderName[] => {
  return (Object.keys(OAUTH_CONFIG_CHECKS) as OAuthProviderName[]).filter(
    (provider) => OAUTH_CONFIG_CHECKS[provider]()
  );
};

export const isAnyOAuthConfigured = (): boolean => {
  return getConfiguredProviders().length > 0;
};

export const getProviderLoginUrl = (
  provider: OAuthProviderName,
  state: string,
  options?: {
    nonce?: string;
    redirectUri?: string;
    scopes?: readonly string[];
    hd?: string;
    prompt?: string;
    accessType?: string;
    allowSignup?: boolean;
  }
): string | null => {
  if (!OAUTH_CONFIG_CHECKS[provider]()) {
    return null;
  }

  switch (provider) {
    case GOOGLE_PROVIDER_NAME:
      return getGoogleLoginUrl(
        state,
        options?.nonce,
        options?.hd,
        options?.prompt,
        options?.accessType
      );
    case FACEBOOK_PROVIDER_NAME:
      return getFacebookLoginUrl(
        state,
        options?.redirectUri,
        options?.scopes
      );
    case GITHUB_PROVIDER_NAME:
      return getGitHubLoginUrl(state, options?.allowSignup);
    case APPLE_PROVIDER_NAME:
      if (!options?.nonce) {
        throw new Error('Apple OAuth requires a nonce parameter');
      }
      return getAppleLoginUrl(state, options.nonce);
    case LINKEDIN_PROVIDER_NAME:
      return getLinkedInLoginUrl(state);
    default:
      return null;
  }
};
