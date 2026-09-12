/**
 * Auth API endpoint paths.
 * @module shared-api/endpoints/auth
 */

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
  VERIFY_EMAIL: '/auth/verify-email',
  VERIFY_PHONE: '/auth/verify-phone',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  ENABLE_2FA: '/auth/2fa/enable',
  DISABLE_2FA: '/auth/2fa/disable',
  VERIFY_2FA: '/auth/2fa/verify',
  BIOMETRIC_ENROLL: '/auth/biometric/enroll',
  BIOMETRIC_VERIFY: '/auth/biometric/verify',
  SSO_GOOGLE: '/auth/sso/google',
  SSO_FACEBOOK: '/auth/sso/facebook',
  SSO_GITHUB: '/auth/sso/github',
  OAUTH_AUTHORIZE: '/auth/oauth/authorize',
  OAUTH_CALLBACK: '/auth/oauth/callback',
  OAUTH_TOKEN: '/auth/oauth/token',
  SSO_SAML_LOGIN: '/auth/sso/saml/login',
  SSO_SAML_CALLBACK: '/auth/sso/saml/callback',
  SSO_OIDC_LOGIN: '/auth/sso/oidc/login',
  SSO_OIDC_CALLBACK: '/auth/sso/oidc/callback',
  RECOVERY_CODES: '/auth/recovery-codes',
  RECOVERY_CODE_VERIFY: '/auth/recovery-codes/verify',
  SESSION_LIST: '/auth/sessions',
  SESSION_REVOKE: (sessionId: string) => `/auth/sessions/${sessionId}`,
  DEVICE_LIST: '/auth/devices',
  DEVICE_REVOKE: (deviceId: string) => `/auth/devices/${deviceId}`,
  LOGIN_ATTEMPTS: '/auth/login-attempts',
} as const;
