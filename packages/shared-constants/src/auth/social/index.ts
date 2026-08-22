/**
 * Social Auth Constants Index
 * Export all social auth constants and types for easy importing
 */

// Social Auth
export {
  AUTH_SOCIAL,
  SOCIAL_CONFIG,
  SOCIAL_PROVIDER_CONFIGS,
  SOCIAL_EVENTS,
  getProviderConfig,
  getProviderScopes,
  getProviderRedirectUri,
  getProviderClientId,
  getSocialAuthUrl,
  isSocialProviderSupported,
  getSupportedProviders,
  // রিনেম করা ফাংশন
  getAuthSocialProviderLabel,
  getAuthSocialProviderIcon,
  getAuthSocialProviderColor,
  getSocialAuthStateExpiry,
  getSocialCodeExpiry,
  getSocialTokenExpiry,
  getSocialRefreshTokenExpiry,
  isSocialStateValid,
  isSocialCodeValid,
  isSocialTokenValid,
  shouldRefreshToken,
} from './auth-social.constants';

export type {
  AuthSocialConfig,
  AuthSocialEvent,
  AuthSocialDefaults,
  SocialProviderConfig,
} from './auth-social.constants';

// Social Providers
export {
  AUTH_SOCIAL_PROVIDER,
  MAJOR_PROVIDERS,
  BANGLADESH_PROVIDERS,
  ENTERPRISE_PROVIDERS,
  OTHER_PROVIDERS,
  SOCIAL_PROVIDERS_LIST,
  OAUTH2_PROVIDERS,
  OIDC_PROVIDERS,
  SOCIAL_ONLY_PROVIDERS,
  isMajorProvider,
  isBangladeshProvider,
  isEnterpriseProvider,
  isOtherProvider,
  isOAuth2Provider,
  isOIDCProvider,
  isSocialOnlyProvider,
  getSocialProviderLabel as getSocialProviderLabelType,
  getSocialProviderIcon as getSocialProviderIconType,
  getSocialProviderColor as getSocialProviderColorType,
  getSocialProviderType,
} from './auth-social-provider.constants';

export type { AuthSocialProvider } from './auth-social-provider.constants';

// Social Status
export {
  AUTH_SOCIAL_STATUS,
  ACTIVE_STATUSES,
  PENDING_STATUSES,
  INACTIVE_STATUSES,
  FAILED_STATUSES,
  SECURITY_STATUSES,
  TOKEN_STATUSES,
  isSocialActive,
  isSocialPending,
  isSocialInactive,
  isSocialFailed,
  isSocialSecurityIssue,
  isSocialTokenStatus,
  isSocialLinked,
  isSocialVerified,
  getSocialStatusLabel,
  getSocialStatusColor,
  getSocialStatusPriority,
  getSocialStatusBadgeType,
} from './auth-social-status.constants';

export type { AuthSocialStatus } from './auth-social-status.constants';
