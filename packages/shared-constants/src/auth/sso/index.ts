/**
 * SSO Constants Index
 * Export all SSO constants and types for easy importing
 */

// SSO
export {
  AUTH_SSO,
  SSO_PROVIDER_CONFIGS,
  SSO_PROTOCOLS,
  SSO_SAML_BINDINGS,
  SSO_SAML_NAME_ID_FORMATS,
  SSO_LDAP_ATTRIBUTES,
  SSO_SECURITY,
  SSO_SESSION,
  SSO_RATE_LIMIT,
  SSO_DEFAULTS,
  SSO_EVENTS,
  getSSOProviderConfig,
  getSSOProtocol,
  getSSOProviderLabel,
  getSSOProviderIcon,
  getSSOProviderColor,
  getSSOProtocolLabel,
  getSAMLNameIdFormatLabel,
  getSAMLBindingLabel,
  getLDAPAttributeLabel,
  getSSOSessionMaxAge,
  getSSOSessionInactivityTimeout,
  getSSOMaxSessionsPerUser,
  isSSOProviderSupported,
  getSupportedSSOProviders,
} from './auth-sso.constants';

export type {
  AuthSSOConfig,
  AuthSSOEvent,
  AuthSSODefaults,
  SSOProviderConfig,
} from './auth-sso.constants';

// SSO Providers
export {
  AUTH_SSO_PROVIDER,
  ENTERPRISE_SSO_PROVIDERS,
  SAML_PROVIDERS,
  OIDC_PROVIDERS,
  LDAP_PROVIDERS,
  SSO_PROVIDERS_LIST,
  isEnterpriseSSOProvider,
  isSAMLProvider,
  isOIDCProvider,
  isLDAPProvider,
  getSSOProviderType,
} from './auth-sso-provider.constants';

export type { AuthSSOProvider } from './auth-sso-provider.constants';

// SSO Status
export {
  AUTH_SSO_STATUS,
  ACTIVE_SSO_STATUSES,
  PENDING_SSO_STATUSES,
  INACTIVE_SSO_STATUSES,
  FAILED_SSO_STATUSES,
  SECURITY_SSO_STATUSES,
  SAML_SSO_STATUSES,
  LDAP_SSO_STATUSES,
  LOGOUT_SSO_STATUSES,
  isSSOActive,
  isSSOPending,
  isSSOInactive,
  isSSOFailed,
  isSSOSecurityIssue,
  isSAMLStatus,
  isLDAPStatus,
  isLogoutStatus,
  getSSOStatusLabel,
  getSSOStatusColor,
  getSSOStatusPriority,
  getSSOStatusBadgeType,
} from './auth-sso-status.constants';

export type { AuthSSOStatus } from './auth-sso-status.constants';
