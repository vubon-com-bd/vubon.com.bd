/**
 * OAuth Constants Index
 * Export all OAuth constants and types for easy importing
 */

// OAuth
export {
  AUTH_OAUTH,
  OAUTH_CONFIG,
  OAUTH_PROVIDER_CONFIGS,
  OAUTH_EVENTS,
  getOAuthProviderConfig,
  getOAuthScopes,
  getOAuthRedirectUri,
  getOAuthAuthorizationUrl,
  getOAuthTokenUrl,
  getOAuthUserInfoUrl,
  isOAuthProviderSupported,
  getSupportedOAuthProviders,
  getOAuthProviderLabel,
  getOAuthProviderIcon,
  getOAuthProviderColor,
  getOAuthStateExpiry,
  getOAuthCodeExpiry,
  getOAuthAccessTokenExpiry,
  getOAuthRefreshTokenExpiry,
  getOAuthIdTokenExpiry,
  isOAuthStateValid,
  isOAuthCodeValid,
  isOAuthAccessTokenValid,
  shouldRefreshAccessToken,
  getOAuthGrantTypeLabel,
  getOAuthResponseTypeLabel,
  getOAuthTokenTypeLabel,
} from './auth-oauth.constants';

export type {
  AuthOAuthConfig,
  AuthOAuthEvent,
  AuthOAuthDefaults,
  OAuthProviderConfig,
} from './auth-oauth.constants';

// OAuth Providers
export {
  AUTH_OAUTH_PROVIDER,
  MAJOR_OAUTH_PROVIDERS,
  ENTERPRISE_OAUTH_PROVIDERS,
  OTHER_OAUTH_PROVIDERS,
  OAUTH_PROVIDERS_LIST,
  OIDC_COMPLIANT_PROVIDERS,
  PKCE_SUPPORTED_PROVIDERS,
  isMajorOAuthProvider,
  isEnterpriseOAuthProvider,
  isOtherOAuthProvider,
  isOIDCCompliant,
  isPKCESupported,
  getOAuthProviderLabel as getOAuthProviderLabelType,
  getOAuthProviderIcon as getOAuthProviderIconType,
  getOAuthProviderColor as getOAuthProviderColorType,
  getOAuthProviderType,
} from './auth-oauth-provider.constants';

export type { AuthOAuthProvider } from './auth-oauth-provider.constants';

// OAuth Status
export {
  AUTH_OAUTH_STATUS,
  ACTIVE_OAUTH_STATUSES,
  PENDING_OAUTH_STATUSES,
  INACTIVE_OAUTH_STATUSES,
  FAILED_OAUTH_STATUSES,
  SECURITY_OAUTH_STATUSES,
  TOKEN_OAUTH_STATUSES,
  CODE_OAUTH_STATUSES,
  isOAuthActive,
  isOAuthPending,
  isOAuthInactive,
  isOAuthFailed,
  isOAuthSecurityIssue,
  isOAuthTokenStatus,
  isOAuthCodeStatus,
  getOAuthStatusLabel,
  getOAuthStatusColor,
  getOAuthStatusPriority,
  getOAuthStatusBadgeType,
} from './auth-oauth-status.constants';

export type { AuthOAuthStatus } from './auth-oauth-status.constants';
