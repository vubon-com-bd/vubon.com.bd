// Export all constants from auth-oauth.constants
export {
  AUTH_OAUTH,
  OAUTH_CONFIG,
  OAUTH_GRANT_TYPES,
  OAUTH_RESPONSE_TYPES,
  OAUTH_TOKEN_TYPES,
  OAUTH_SCOPES,
  OAUTH_ENDPOINTS,
  OAUTH_SECURITY,
  OAUTH_RATE_LIMIT,
  OAUTH_DEFAULTS,
  OAUTH_EVENTS,
  OAUTH_PROVIDER_CONFIGS,
} from './auth-oauth.constants';

// Export all types from auth-oauth.constants
export type {
  AuthOAuthConfig,
  AuthOAuthEvent,
  AuthOAuthDefaults,
  OAuthProviderConfig,
} from './auth-oauth.constants';

// Export all functions from auth-oauth.constants
export {
  getOauthProviderConfig,
  getOauthScopes,
  getOauthRedirectUri,
  getOauthAuthorizationUrl,
  getOauthTokenUrl,
  getOauthUserInfoUrl,
  isOauthProviderSupported,
  getOauthSupportedProviders,
  getOauthProviderLabel,
  getOauthProviderIcon,
  getOauthProviderColor,
  getOauthStateExpiry,
  getOauthCodeExpiry,
  getOauthAccessTokenExpiry,
  getOauthRefreshTokenExpiry,
  getOauthIdTokenExpiry,
  isOauthStateValid,
  isOauthCodeValid,
  isOauthAccessTokenValid,
  shouldOauthRefreshAccessToken,
  getOauthGrantTypeLabel,
  getOauthResponseTypeLabel,
  getOauthTokenTypeLabel,
} from './auth-oauth.constants';

// Export all constants from auth-oauth-status.constants
export {
  AUTH_OAUTH_STATUS,
  OAUTH_ACTIVE_STATUSES,
  OAUTH_PENDING_STATUSES,
  OAUTH_INACTIVE_STATUSES,
  OAUTH_FAILED_STATUSES,
  OAUTH_SECURITY_STATUSES,
  OAUTH_TOKEN_STATUSES,
  OAUTH_CODE_STATUSES,
} from './auth-oauth-status.constants';

// Export all types from auth-oauth-status.constants
export type { AuthOauthStatus } from './auth-oauth-status.constants';

// Export all functions from auth-oauth-status.constants
export {
  isOauthActive,
  isOauthPending,
  isOauthInactive,
  isOauthFailed,
  isOauthSecurityIssue,
  isOauthTokenStatus,
  isOauthCodeStatus,
  getOauthStatusLabel,
  getOauthStatusColor,
  getOauthStatusPriority,
  getOauthStatusBadgeType,
} from './auth-oauth-status.constants';

// Export all constants from auth-oauth-provider.constants
export {
  AUTH_OAUTH_PROVIDER,
  OAUTH_MAJOR_PROVIDERS,
  OAUTH_ENTERPRISE_PROVIDERS,
  OAUTH_OTHER_PROVIDERS,
  OAUTH_PROVIDERS_LIST,
  OAUTH_OIDC_COMPLIANT_PROVIDERS,
  OAUTH_PKCE_SUPPORTED_PROVIDERS,
} from './auth-oauth-provider.constants';

// Export all types from auth-oauth-provider.constants
export type { AuthOauthProvider } from './auth-oauth-provider.constants';

// Export all functions from auth-oauth-provider.constants
export {
  isOauthMajorProvider,
  isOauthEnterpriseProvider,
  isOauthOtherProvider,
  isOauthOIDCCompliant,
  isOauthPKCESupported,
  getOauthProviderLabel as getOauthProviderLabelFromProvider,
  getOauthProviderIcon as getOauthProviderIconFromProvider,
  getOauthProviderColor as getOauthProviderColorFromProvider,
  getOauthProviderType,
} from './auth-oauth-provider.constants';
