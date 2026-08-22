/**
 * Authentication Constants Index
 * Export all authentication constants with proper type safety
 */

// Core Authentication
export {
  AUTH,
  getSessionMaxAge,
  getPasswordMinLength,
  getPasswordMaxLength,
  getVerificationCodeLength,
  getVerificationExpiry,
  getLoginMaxAttempts,
  getLoginBlockDuration,
  isPasswordValid,
  getPasswordStrength,
} from './auth.constants';

export type {
  AuthSessionConfig,
  AuthTokenConfig,
  AuthPasswordConfig,
  AuthVerificationConfig,
  AuthRateLimitConfig,
  AuthDefaults,
  AuthCookieConfig,
} from './auth.constants';

// Auth Status
export {
  AUTH_STATUS,
  ACTIVE_AUTH_STATUSES,
  INACTIVE_AUTH_STATUSES,
  LOCKED_AUTH_STATUSES,
  PENDING_AUTH_STATUSES,
  VERIFIED_AUTH_STATUSES,
  isAuthActive,
  isAuthLocked,
  isAuthPending,
  isAuthVerified,
  getAuthStatusLabel,
} from './auth-status.constants';

export type { AuthStatus } from './auth-status.constants';

// Auth Types
export {
  AUTH_TYPE,
  LOCAL_AUTH_TYPES,
  EXTERNAL_AUTH_TYPES,
  MFA_TYPES,
  TWO_FA_TYPES,
  DEVICE_TYPES,
  GRANT_TYPES,
  isLocalAuth,
  isExternalAuth,
  isMFA,
  isTwoFA,
  isDevice,
  isGrantType,
  getAuthTypeLabel,
} from './auth-type.constants';

export type { AuthType } from './auth-type.constants';

// Auth Providers
export {
  AUTH_PROVIDER,
  SOCIAL_PROVIDERS,
  BANGLADESH_PROVIDERS,
  ENTERPRISE_PROVIDERS,
  SSO_PROVIDERS,
  isSocialProvider,
  isBangladeshProvider,
  isEnterpriseProvider,
  isSSOProvider,
  getProviderLabel,
  getProviderIcon,
  getProviderColor,
} from './auth-provider.constants';

export type { AuthProvider } from './auth-provider.constants';

// Auth Methods
export {
  AUTH_METHOD,
  OTP_METHODS,
  BIOMETRIC_METHODS,
  SOCIAL_METHODS,
  SSO_METHODS,
  TOKEN_METHODS,
  DEVICE_METHODS,
  isOTPMethod,
  isBiometricMethod,
  isSocialMethod,
  isSSOMethod,
  isTokenMethod,
  isDeviceMethod,
  getMethodLabel,
  getMethodSecurityLevel,
} from './auth-method.constants';

export type { AuthMethod } from './auth-method.constants';

// Auth Errors
export {
  AUTH_ERROR,
  AUTH_ERROR_MESSAGES,
  AUTH_ERROR_HTTP_STATUS,
  getErrorMessage,
  getErrorHttpStatus,
  isAuthError,
} from './auth-error.constants';

export type { AuthError } from './auth-error.constants';

// Auth Permissions
export {
  AUTH_PERMISSION,
  USER_PERMISSIONS,
  AUTH_PERMISSIONS,
  MFA_PERMISSIONS,
  TWO_FA_PERMISSIONS,
  SESSION_PERMISSIONS,
  TOKEN_PERMISSIONS,
  ADMIN_PERMISSIONS,
  ROLE_PERMISSIONS,
  PERMISSION_MANAGEMENT,
  isUserPermission,
  isAuthAuthPermission,
  isMFAPermission,
  isTwoFAPermission,
  isSessionPermission,
  isTokenPermission,
  isAdminPermission,
  isRolePermission,
  isPermissionManagement,
  getPermissionLabel,
  getPermissionCategory,
} from './auth-permission.constants';

export type { AuthPermission } from './auth-permission.constants';

// Auth Roles
export {
  AUTH_ROLE,
  ADMIN_ROLES,
  USER_ROLES,
  VENDOR_ROLES,
  SUPPORT_ROLES,
  MARKETING_ROLES,
  ANALYTICS_ROLES,
  GUEST_ROLES,
  SYSTEM_ROLES,
  PRIVILEGED_ROLES,
  PUBLIC_ROLES,
  isAdminRole,
  isUserRole,
  isVendorRole,
  isSupportRole,
  isMarketingRole,
  isAnalyticsRole,
  isGuestRole,
  isSystemRole,
  isPrivilegedRole,
  isPublicRole,
  getRoleLabel,
  getRoleLevel,
  hasSufficientRole,
} from './auth-role.constants';

export type { AuthRole } from './auth-role.constants';

// Auth Sessions
export {
  AUTH_SESSION,
  ACTIVE_SESSION_STATUSES,
  INACTIVE_SESSION_STATUSES,
  isSessionActive,
  isSessionInactive,
  getSessionStatusLabel,
  getSessionTypeLabel,
  isSessionExpired,
  getRemainingSessionTime,
  shouldExtendSession,
} from './auth-session.constants';

export type {
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
} from './auth-session.constants';

// Auth Tokens
export {
  AUTH_TOKEN,
  BEARER_TOKEN_TYPES,
  SINGLE_USE_TOKEN_TYPES,
  VALID_TOKEN_STATUSES,
  INVALID_TOKEN_STATUSES,
  isTokenValid,
  isTokenInvalid,
  isBearerToken,
  isSingleUseToken,
  getTokenExpiry,
  getTokenTypeLabel,
  getTokenStatusLabel,
  getAlgorithmLabel,
  getDefaultAlgorithm,
  isTokenExpired,
  getTokenRemainingTime,
} from './auth-token.constants';

export type {
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
} from './auth-token.constants';

// Auth Verifications
export {
  AUTH_VERIFICATION,
  IDENTITY_VERIFICATION_TYPES,
  DOCUMENT_VERIFICATION_TYPES,
  CONTACT_VERIFICATION_TYPES,
  COMPLETED_VERIFICATION_STATUSES,
  IN_PROGRESS_VERIFICATION_STATUSES,
  FAILED_VERIFICATION_STATUSES,
  isVerificationComplete,
  isVerificationInProgress,
  isVerificationFailed,
  isIdentityVerification,
  isDocumentVerification,
  isContactVerification,
  getVerificationExpiry as getVerificationExpiryTime,
  getVerificationTypeLabel,
  getVerificationStatusLabel,
  getVerificationChannelLabel,
  getVerificationLevel,
} from './auth-verification.constants';

export type {
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
} from './auth-verification.constants';

// Auth Passwords
export {
  AUTH_PASSWORD,
  REQUIRED_CHARACTERS,
  getPasswordMinLength as getPasswordMinLengthValue,
  getPasswordMaxLength as getPasswordMaxLengthValue,
  getPasswordStrength as getPasswordStrengthValue,
  validatePassword,
  isPasswordValid as isPasswordValidValue,
  isPasswordCommon,
  isPasswordExpired,
  isPasswordTooNew,
  getPasswordRemainingDays,
  getPasswordErrorMessage,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from './auth-password.constants';

export type { AuthPasswordStrength, AuthPasswordError } from './auth-password.constants';

// Auth MFA
export {
  AUTH_MFA,
  MFA_METHODS_LIST,
  REQUIRED_MFA_METHODS,
  OPTIONAL_MFA_METHODS,
  isMFAMethod,
  isRequiredMFAMethod,
  isOptionalMFAMethod,
  getMFAMethodLabel,
  getMFAMethodSecurityLevel,
  getMFALevelLabel,
  getMFAMethodIcon,
  getTOTPConfig,
  getSMSConfig,
  getEmailConfig,
  getBackupCodeConfig,
  getBiometricConfig,
  getBackupCodesCount,
  getBackupCodeLength,
  getTOTPPeriod,
  getTOTPDigits,
  getTOTPWindow,
  getMFACodeExpiry,
  getMFAMaxAttempts,
} from './mfa/auth-mfa.constants';

export type {
  AuthMFAConfig,
  AuthMFAMethod,
  AuthMFALevel,
  AuthMFAEvent,
  AuthMFADefaults,
} from './mfa/auth-mfa.constants';

// Auth MFA Types
export {
  AUTH_MFA_TYPE,
  PRIMARY_MFA_TYPES,
  BIOMETRIC_MFA_TYPES,
  HARDWARE_MFA_TYPES,
  PUSH_MFA_TYPES,
  CODE_BASED_MFA_TYPES,
  DEVICE_BASED_MFA_TYPES,
  isPrimaryMFAType,
  isBiometricMFAType,
  isHardwareMFAType,
  isPushMFAType,
  isCodeBasedMFAType,
  isDeviceBasedMFAType,
  getMFATypeLabel,
  getMFATypeCategory,
  getMFATypeIcon,
} from './mfa/auth-mfa-type.constants';

export type { AuthMFAType } from './mfa/auth-mfa-type.constants';

// Auth MFA Status
export {
  AUTH_MFA_STATUS,
  ACTIVE_MFA_STATUSES,
  INACTIVE_MFA_STATUSES,
  PENDING_MFA_STATUSES,
  FAILED_MFA_STATUSES,
  BLOCKED_MFA_STATUSES,
  BACKUP_CODE_STATUSES as MFA_BACKUP_CODE_STATUSES,
  isMFAActive,
  isMFAInactive,
  isMFAPending,
  isMFAFailed,
  isMFABlocked,
  isBackupCodeStatus as isMFABackupCodeStatus,
  getMFAStatusLabel,
  getMFAStatusColor,
  getMFAStatusPriority,
} from './mfa/auth-mfa-status.constants';

export type { AuthMFAStatus } from './mfa/auth-mfa-status.constants';

// Auth Recovery Code
export {
  AUTH_RECOVERY_CODE,
  RECOVERY_CODE_TYPES_LIST,
  SINGLE_USE_RECOVERY_TYPES,
  MULTI_USE_RECOVERY_TYPES,
  TEMPORARY_RECOVERY_TYPES,
  PERMANENT_RECOVERY_TYPES,
  isRecoveryCodeType,
  isSingleUseRecoveryType,
  isMultiUseRecoveryType,
  isTemporaryRecoveryType,
  isPermanentRecoveryType,
  getRecoveryCodeTypeLabel,
  getRecoveryCodeTypeIcon,
  getRecoveryCodeTypePriority,
  getRecoveryCodeConfig,
  getRecoveryCodeLength,
  getRecoveryCodeCount,
  getRecoveryCodeExpiryDays,
  getRecoveryCodeMaxAttempts,
  getRecoveryCodeLockoutDuration,
  getRecoveryCodeResendCooldown,
  getRecoveryCodeMaxGenerations,
  generateRecoveryCode,
  generateRecoveryCodes,
  isRecoveryCodeValid,
  isRecoveryCodeExpired,
  getRecoveryCodeRemainingDays,
  getRecoveryCodeStatus,
  getRecoveryCodeStatusLabel,
  getRecoveryCodeStatusColor,
} from './recovery/auth-recovery-code.constants';

export type {
  AuthRecoveryCodeConfig,
  AuthRecoveryCodeType,
  AuthRecoveryCodeEvent,
  AuthRecoveryCodeDefaults,
  AuthRecoveryCodeValidation,
} from './recovery/auth-recovery-code.constants';

// Auth Recovery Code Status
export {
  AUTH_RECOVERY_CODE_STATUS,
  ACTIVE_RECOVERY_STATUSES,
  INACTIVE_RECOVERY_STATUSES,
  USED_RECOVERY_STATUSES,
  FAILED_RECOVERY_STATUSES,
  SECURITY_RECOVERY_STATUSES,
  isRecoveryCodeActive,
  isRecoveryCodeInactive,
  isRecoveryCodeUsed,
  isRecoveryCodeFailed,
  isRecoveryCodeSecurityIssue,
  getRecoveryCodeStatusPriority,
  getRecoveryCodeStatusBadgeType,
} from './recovery/auth-recovery-code-status.constants';

export type { AuthRecoveryCodeStatus } from './recovery/auth-recovery-code-status.constants';

// Auth Account Lock
export {
  AUTH_ACCOUNT_LOCK,
  LOCK_REASONS_LIST,
  LOCK_TYPES_LIST,
  TEMPORARY_LOCK_TYPES,
  PERMANENT_LOCK_TYPES,
  ADMIN_LOCK_TYPES,
  SYSTEM_LOCK_TYPES,
  SECURITY_LOCK_REASONS,
  POLICY_LOCK_REASONS,
  isLockReason,
  isLockType,
  isTemporaryLock,
  isPermanentLock,
  isAdminLock,
  isSystemLock,
  isSecurityLock,
  isPolicyLock,
  getLockReasonLabel,
  getLockTypeLabel,
  getLockTypeIcon,
  getLockLevel,
  getLockLevelLabel,
  getLockLevelColor,
  getLockDurationMinutes,
  getLockMaxAttempts,
  getLockFailedAttempts,
  isLockExpired,
  getLockRemainingMinutes,
  shouldAutoUnlock,
  getLockLevelFromAttempts,
} from './recovery/auth-account-lock.constants';

export type {
  AuthAccountLockConfig,
  AuthAccountLockReason,
  AuthAccountLockType,
  AuthAccountLockEvent,
  AuthAccountLockLevel,
  AuthAccountLockDefaults,
} from './recovery/auth-account-lock.constants';

// Auth Account Lock Status
export {
  AUTH_ACCOUNT_LOCK_STATUS,
  LOCKED_STATUSES,
  UNLOCKED_STATUSES,
  PENDING_STATUSES as ACCOUNT_LOCK_PENDING_STATUSES,
  EXPIRED_STATUSES,
  SECURITY_STATUSES as ACCOUNT_LOCK_SECURITY_STATUSES,
  RECOVERY_STATUSES as ACCOUNT_LOCK_RECOVERY_STATUSES,
  isAccountLocked,
  isAccountUnlocked,
  isAccountPending,
  isAccountExpired,
  isAccountSecurityIssue,
  isAccountRecovery,
  getAccountLockStatusLabel,
  getAccountLockStatusColor,
  getAccountLockStatusPriority,
  getAccountLockStatusBadgeType,
} from './recovery/auth-account-lock-status.constants';

export type { AuthAccountLockStatus } from './recovery/auth-account-lock-status.constants';

// Auth Login Attempt
export {
  AUTH_LOGIN_ATTEMPT,
  ATTEMPT_TYPES,
  ATTEMPT_REASONS,
  ATTEMPT_EVENTS,
  ATTEMPT_LEVELS,
  ATTEMPT_CONFIG,
  ATTEMPT_DEFAULTS,
  ATTEMPT_TYPES_LIST,
  SUCCESS_ATTEMPT_TYPES,
  FAILED_ATTEMPT_TYPES,
  BLOCKED_ATTEMPT_TYPES,
  ATTEMPT_REASONS_LIST,
  SECURITY_ATTEMPT_REASONS,
  CREDENTIAL_ATTEMPT_REASONS,
  TOKEN_ATTEMPT_REASONS,
  MFA_ATTEMPT_REASONS,
  isAttemptType,
  isSuccessAttempt,
  isFailedAttempt,
  isBlockedAttempt,
  isAttemptReason,
  isSecurityAttempt,
  isCredentialAttempt,
  isTokenAttempt,
  isMFAAttempt,
  getAttemptTypeLabel,
  getAttemptTypeIcon,
  getAttemptReasonLabel,
  getAttemptLevel,
  getAttemptLevelLabel,
  getAttemptLevelColor,
  getMaxLoginAttempts,
  getMaxFailedAttempts,
  getResetAfterMinutes,
  getBlockDurationMinutes,
  getCaptchaAfterAttempts,
  shouldRequireCaptcha,
  getAttemptLevelFromAttempts,
  isAccountBlocked,
  getRemainingAttempts,
  shouldResetAttempts,
} from './login-attempt/auth-login-attempt.constants';

export type {
  AuthLoginAttemptConfig,
  AuthLoginAttemptType,
  AuthLoginAttemptReason,
  AuthLoginAttemptEvent,
  AuthLoginAttemptLevel,
  AuthLoginAttemptDefaults,
} from './login-attempt/auth-login-attempt.constants';

// Auth Login Attempt Status
export {
  AUTH_LOGIN_ATTEMPT_STATUS,
  SUCCESS_STATUSES,
  FAILED_STATUSES as LOGIN_FAILED_STATUSES,
  BLOCKED_STATUSES,
  PENDING_STATUSES as LOGIN_PENDING_STATUSES,
  SECURITY_STATUSES as LOGIN_SECURITY_STATUSES,
  VERIFICATION_STATUSES,
  MFA_STATUSES,
  isLoginSuccess,
  isLoginFailed,
  isLoginBlocked,
  isLoginPending,
  isLoginSecurityIssue,
  isLoginVerification,
  isLoginMFA,
  getLoginAttemptStatusLabel,
  getLoginAttemptStatusColor,
  getLoginAttemptStatusPriority,
  getLoginAttemptStatusBadgeType,
} from './login-attempt/auth-login-attempt-status.constants';

export type { AuthLoginAttemptStatus } from './login-attempt/auth-login-attempt-status.constants';

// Auth Device
export {
  AUTH_DEVICE,
  DEVICE_PLATFORMS,
  DEVICE_TRUST_LEVELS,
  DEVICE_EVENTS,
  DEVICE_CONFIG,
  DEVICE_DEFAULTS,
  DEVICE_PLATFORMS_LIST,
  MOBILE_PLATFORMS,
  DESKTOP_PLATFORMS,
  EMBEDDED_PLATFORMS,
  isDevicePlatform,
  isMobilePlatform,
  isDesktopPlatform,
  isEmbeddedPlatform,
  getDevicePlatformLabel,
  getDevicePlatformIcon,
  getDeviceTrustLevel,
  getDeviceTrustLevelLabel,
  getDeviceTrustLevelColor,
  getMaxDevicesPerUser,
  getMaxActiveSessions,
  getSessionTimeoutMinutes,
  getRememberMeDays,
  isDeviceTrusted as isDeviceTrustedLevel,
  isDeviceUntrusted as isDeviceUntrustedLevel,
  getDeviceTrustLevelFromHistory,
} from './device/auth-device.constants';

export type {
  AuthDeviceConfig,
  AuthDevicePlatform,
  AuthDeviceTrustLevel,
  AuthDeviceEvent,
  AuthDeviceDefaults,
} from './device/auth-device.constants';

// Auth Device Types
export {
  AUTH_DEVICE_TYPE,
  PRIMARY_DEVICE_TYPES,
  BROWSER_TYPES,
  MOBILE_OS_TYPES,
  DESKTOP_OS_TYPES,
  BROWSER_ENGINE_TYPES,
  DEVICE_CAPABILITIES,
  MOBILE_DEVICE_TYPES,
  DESKTOP_DEVICE_TYPES,
  TOUCH_DEVICE_TYPES,
  isPrimaryDeviceType,
  isBrowserType,
  isMobileOSType,
  isDesktopOSType,
  isBrowserEngineType,
  isDeviceCapability,
  getDeviceTypeLabel,
  getDeviceTypeIcon,
  getDeviceTypeCategory,
  isMobileDevice,
  isDesktopDevice,
  isTouchDevice,
} from './device/auth-device-type.constants';

export type { AuthDeviceType } from './device/auth-device-type.constants';

// Auth Device Status
export {
  AUTH_DEVICE_STATUS,
  ACTIVE_DEVICE_STATUSES,
  INACTIVE_DEVICE_STATUSES,
  PENDING_DEVICE_STATUSES,
  BLOCKED_DEVICE_STATUSES,
  SECURITY_DEVICE_STATUSES,
  TRUSTED_DEVICE_STATUSES,
  UNTRUSTED_DEVICE_STATUSES,
  isDeviceActive,
  isDeviceInactive,
  isDevicePending,
  isDeviceBlocked,
  isDeviceSecurityIssue,
  isDeviceTrusted as isDeviceTrustedStatus,
  isDeviceUntrusted as isDeviceUntrustedStatus,
  getDeviceStatusLabel,
  getDeviceStatusColor,
  getDeviceStatusPriority,
  getDeviceStatusBadgeType,
} from './device/auth-device-status.constants';

export type { AuthDeviceStatus } from './device/auth-device-status.constants';

// Auth Social
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
  getSocialProviderLabel,
  getSocialProviderIcon,
  getSocialProviderColor,
  getSocialAuthStateExpiry,
  getSocialCodeExpiry,
  getSocialTokenExpiry,
  getSocialRefreshTokenExpiry,
  isSocialStateValid,
  isSocialCodeValid,
  isSocialTokenValid,
  shouldRefreshToken,
} from './social/auth-social.constants';

export type {
  AuthSocialConfig,
  AuthSocialEvent,
  AuthSocialDefaults,
  SocialProviderConfig,
} from './social/auth-social.constants';

// Auth Social Providers
export {
  AUTH_SOCIAL_PROVIDER,
  MAJOR_PROVIDERS,
  BANGLADESH_PROVIDERS as SOCIAL_BANGLADESH_PROVIDERS,
  ENTERPRISE_PROVIDERS as SOCIAL_ENTERPRISE_PROVIDERS,
  OTHER_PROVIDERS,
  SOCIAL_PROVIDERS_LIST,
  OAUTH2_PROVIDERS,
  OIDC_PROVIDERS as SOCIAL_OIDC_PROVIDERS,
  SOCIAL_ONLY_PROVIDERS,
  isMajorProvider,
  isBangladeshProvider as isSocialBangladeshProvider,
  isEnterpriseProvider as isSocialEnterpriseProvider,
  isOtherProvider,
  isOAuth2Provider,
  isOIDCProvider as isSocialOIDCProvider,
  isSocialOnlyProvider,
  getSocialProviderType,
} from './social/auth-social-provider.constants';

export type { AuthSocialProvider } from './social/auth-social-provider.constants';

// Auth Social Status
export {
  AUTH_SOCIAL_STATUS,
  ACTIVE_STATUSES,
  PENDING_STATUSES as SOCIAL_PENDING_STATUSES,
  INACTIVE_STATUSES,
  FAILED_STATUSES as SOCIAL_FAILED_STATUSES,
  SECURITY_STATUSES as SOCIAL_SECURITY_STATUSES,
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
} from './social/auth-social-status.constants';

export type { AuthSocialStatus } from './social/auth-social-status.constants';

// Auth OAuth
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
} from './oauth/auth-oauth.constants';

export type {
  AuthOAuthConfig,
  AuthOAuthEvent,
  AuthOAuthDefaults,
  OAuthProviderConfig,
} from './oauth/auth-oauth.constants';

// Auth OAuth Providers
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
  getOAuthProviderType,
} from './oauth/auth-oauth-provider.constants';

export type { AuthOAuthProvider } from './oauth/auth-oauth-provider.constants';

// Auth OAuth Status
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
} from './oauth/auth-oauth-status.constants';

export type { AuthOAuthStatus } from './oauth/auth-oauth-status.constants';

// Auth SSO
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
} from './sso/auth-sso.constants';

export type {
  AuthSSOConfig,
  AuthSSOEvent,
  AuthSSODefaults,
  SSOProviderConfig,
} from './sso/auth-sso.constants';

// Auth SSO Providers
export {
  AUTH_SSO_PROVIDER,
  ENTERPRISE_SSO_PROVIDERS,
  SAML_PROVIDERS,
  OIDC_PROVIDERS as SSO_OIDC_PROVIDERS,
  LDAP_PROVIDERS,
  SSO_PROVIDERS_LIST,
  isEnterpriseSSOProvider,
  isSAMLProvider,
  isOIDCProvider as isSSO_OIDCProvider,
  isLDAPProvider,
  getSSOProviderType,
} from './sso/auth-sso-provider.constants';

export type { AuthSSOProvider } from './sso/auth-sso-provider.constants';

// Auth SSO Status
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
} from './sso/auth-sso-status.constants';

export type { AuthSSOStatus } from './sso/auth-sso-status.constants';

// Auth 2FA
export {
  AUTH_2FA,
  AUTH_2FA_TYPES,
  AUTH_2FA_CONFIG,
  AUTH_2FA_EVENTS,
  get2FATypeLabel,
  get2FATypeIcon,
  get2FATypeSecurityLevel,
  getTOTPConfig as get2FATOTPConfig,
  getSMSConfig as get2FASMSConfig,
  getEmailConfig as get2FAEmailConfig,
  getAuthenticatorConfig,
  getBackupCodeConfig as get2FABackupCodeConfig,
  getRecoveryCodeConfig as get2FARecoveryCodeConfig,
  get2FACodeExpiry,
  get2FAMaxAttempts,
  get2FALockoutDuration,
  get2FARateLimitWindow,
  get2FAMaxRateLimitAttempts,
  get2FATrustDuration,
  get2FAMaxTrustedDevices,
  generate2FACode,
  generateBackupCodes as generate2FABackupCodes,
  generateRecoveryCodes as generate2FARecoveryCodes,
  is2FACodeValid,
  is2FACodeExpired,
  get2FACodeRemainingTime,
} from './2fa/auth-2fa.constants';

export type {
  Auth2FAConfig,
  Auth2FAType,
  Auth2FAEvent,
  Auth2FADefaults,
} from './2fa/auth-2fa.constants';

// Auth 2FA Types
export {
  AUTH_2FA_TYPE,
  PRIMARY_2FA_TYPES,
  CODE_BASED_2FA_TYPES,
  DEVICE_BASED_2FA_TYPES,
  BIOMETRIC_2FA_TYPES,
  HARDWARE_2FA_TYPES,
  PUSH_2FA_TYPES,
  isPrimary2FAType,
  isCodeBased2FAType,
  isDeviceBased2FAType,
  isBiometric2FAType,
  isHardware2FAType,
  isPush2FAType,
  get2FATypeCategory,
} from './2fa/auth-2fa-type.constants';

export type { Auth2FAType as Auth2FATypeType } from './2fa/auth-2fa-type.constants';

// Auth 2FA Status
export {
  AUTH_2FA_STATUS,
  ACTIVE_2FA_STATUSES,
  PENDING_2FA_STATUSES,
  INACTIVE_2FA_STATUSES,
  FAILED_2FA_STATUSES,
  SECURITY_2FA_STATUSES,
  BACKUP_CODE_STATUSES as TWO_FA_BACKUP_CODE_STATUSES,
  RECOVERY_STATUSES as TWO_FA_RECOVERY_STATUSES,
  is2FAActive,
  is2FAPending,
  is2FAInactive,
  is2FAFailed,
  is2FASecurityIssue,
  isBackupCodeStatus as is2FABackupCodeStatus,
  isRecoveryStatus as is2FARecoveryStatus,
  get2FAStatusLabel,
  get2FAStatusColor,
  get2FAStatusPriority,
  get2FAStatusBadgeType,
} from './2fa/auth-2fa-status.constants';

export type { Auth2FAStatus } from './2fa/auth-2fa-status.constants';

// Auth Biometric
export {
  AUTH_BIOMETRIC,
  AUTH_BIOMETRIC_TYPES,
  AUTH_BIOMETRIC_CONFIG,
  AUTH_BIOMETRIC_EVENTS,
  getBiometricTypeLabel,
  getBiometricTypeIcon,
  getBiometricTypeSecurityLevel,
  getBiometricTypeAccuracy,
  getBiometricMaxDevices,
  getBiometricMaxAttempts,
  getBiometricLockoutDuration,
  getBiometricSessionTimeout,
  getBiometricReauthInterval,
  getBiometricMinConfidence,
  getBiometricMaxRetries,
  isBiometricTypeSupported,
  getSupportedBiometricTypes,
  isBiometricEnabled,
  isBiometricLocked,
  getBiometricTypeCategory,
} from './biometric/auth-biometric.constants';

export type {
  AuthBiometricConfig,
  AuthBiometricType,
  AuthBiometricEvent,
  AuthBiometricDefaults,
} from './biometric/auth-biometric.constants';

// Auth Biometric Types
export {
  AUTH_BIOMETRIC_TYPE,
  PHYSICAL_BIOMETRICS,
  BEHAVIORAL_BIOMETRICS,
  PHYSIOLOGICAL_BIOMETRICS,
  MOBILE_BIOMETRICS,
  PLATFORM_BIOMETRICS,
  COMMON_BIOMETRICS,
  BIOMETRIC_TYPES_LIST,
  isPhysicalBiometric,
  isBehavioralBiometric,
  isPhysiologicalBiometric,
  isMobileBiometric,
  isPlatformBiometric,
  isCommonBiometric,
} from './biometric/auth-biometric-type.constants';

export type { AuthBiometricType as AuthBiometricTypeType } from './biometric/auth-biometric-type.constants';

// Auth Biometric Status
export {
  AUTH_BIOMETRIC_STATUS,
  ACTIVE_BIOMETRIC_STATUSES,
  PENDING_BIOMETRIC_STATUSES,
  INACTIVE_BIOMETRIC_STATUSES,
  FAILED_BIOMETRIC_STATUSES,
  SECURITY_BIOMETRIC_STATUSES,
  TRUSTED_BIOMETRIC_STATUSES,
  UNTRUSTED_BIOMETRIC_STATUSES,
  isBiometricActive,
  isBiometricPending,
  isBiometricInactive,
  isBiometricFailed,
  isBiometricSecurityIssue,
  isBiometricTrusted,
  isBiometricUntrusted,
  getBiometricStatusLabel,
  getBiometricStatusColor,
  getBiometricStatusPriority,
  getBiometricStatusBadgeType,
} from './biometric/auth-biometric-status.constants';

export type { AuthBiometricStatus } from './biometric/auth-biometric-status.constants';

// Re-export all from auth.constants with unique names to avoid conflicts
export {
  getSessionMaxAge as getSessionMaxAgeValue,
  getVerificationExpiry as getVerificationExpiryValue,
  getPasswordMinLength as getPasswordMinLengthValueAlt,
  getPasswordMaxLength as getPasswordMaxLengthValueAlt,
  isPasswordValid as isPasswordValidValueAlt,
  getPasswordStrength as getPasswordStrengthValueAlt,
} from './auth.constants';
