/**
 * Authentication Method Constants
 * Extended method definitions (re-exports from auth.constants)
 *
 * Note: Base AUTH_METHODS, AuthMethod, and isValidAuthMethod are exported from auth.constants
 */

/**
 * Authentication Method Labels
 * Human-readable labels for each authentication method
 */
export const AUTH_METHOD_LABELS: Record<string, string> = {
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  refresh: 'Refresh Token',
  verify: 'Verify Identity',
  'reset-password': 'Reset Password',
  'forgot-password': 'Forgot Password',
  'change-password': 'Change Password',
  'enable-2fa': 'Enable 2FA',
  'disable-2fa': 'Disable 2FA',
  'verify-2fa': 'Verify 2FA',
  'send-verification': 'Send Verification',
  'verify-email': 'Verify Email',
  'verify-phone': 'Verify Phone',
  'request-reset': 'Request Reset',
  'confirm-reset': 'Confirm Reset',
  'social-login': 'Social Login',
  'social-register': 'Social Register',
  'sso-login': 'SSO Login',
  'sso-callback': 'SSO Callback',
  'oauth-authorize': 'OAuth Authorize',
  'oauth-token': 'OAuth Token',
  'oauth-callback': 'OAuth Callback',
  'check-auth': 'Check Authentication',
  'validate-token': 'Validate Token',
  'revoke-token': 'Revoke Token',
  'validate-session': 'Validate Session',
  'terminate-session': 'Terminate Session',
  'terminate-all-sessions': 'Terminate All Sessions',
  'manage-devices': 'Manage Devices',
  'remove-device': 'Remove Device',
  'trust-device': 'Trust Device',
  'untrust-device': 'Untrust Device',
} as const;

/**
 * Authentication Method HTTP Verbs
 * HTTP methods for each authentication operation
 */
export const AUTH_METHOD_HTTP_VERBS: Record<string, string> = {
  login: 'POST',
  register: 'POST',
  logout: 'POST',
  refresh: 'POST',
  verify: 'POST',
  'reset-password': 'POST',
  'forgot-password': 'POST',
  'change-password': 'PUT',
  'enable-2fa': 'POST',
  'disable-2fa': 'POST',
  'verify-2fa': 'POST',
  'send-verification': 'POST',
  'verify-email': 'POST',
  'verify-phone': 'POST',
  'request-reset': 'POST',
  'confirm-reset': 'POST',
  'social-login': 'POST',
  'social-register': 'POST',
  'sso-login': 'POST',
  'sso-callback': 'GET',
  'oauth-authorize': 'GET',
  'oauth-token': 'POST',
  'oauth-callback': 'GET',
  'check-auth': 'GET',
  'validate-token': 'POST',
  'revoke-token': 'POST',
  'validate-session': 'GET',
  'terminate-session': 'DELETE',
  'terminate-all-sessions': 'DELETE',
  'manage-devices': 'GET',
  'remove-device': 'DELETE',
  'trust-device': 'POST',
  'untrust-device': 'POST',
} as const;

/**
 * Authentication Method Categories
 * Categories for grouping authentication methods
 */
export const AUTH_METHOD_CATEGORIES = {
  /** Core authentication operations */
  CORE: 'core',
  /** Password management operations */
  PASSWORD: 'password',
  /** Two-factor authentication operations */
  MFA: 'mfa',
  /** Verification operations */
  VERIFICATION: 'verification',
  /** Social/Single Sign-On operations */
  SOCIAL_SSO: 'social-sso',
  /** Token management operations */
  TOKEN: 'token',
  /** Session management operations */
  SESSION: 'session',
  /** Device management operations */
  DEVICE: 'device',
} as const;

export type AuthMethodCategory =
  (typeof AUTH_METHOD_CATEGORIES)[keyof typeof AUTH_METHOD_CATEGORIES];

/**
 * Method Category Mapping
 * Maps each authentication method to its category
 */
export const AUTH_METHOD_CATEGORY_MAP: Record<string, AuthMethodCategory> = {
  login: AUTH_METHOD_CATEGORIES.CORE,
  register: AUTH_METHOD_CATEGORIES.CORE,
  logout: AUTH_METHOD_CATEGORIES.CORE,
  refresh: AUTH_METHOD_CATEGORIES.TOKEN,
  verify: AUTH_METHOD_CATEGORIES.CORE,
  'reset-password': AUTH_METHOD_CATEGORIES.PASSWORD,
  'forgot-password': AUTH_METHOD_CATEGORIES.PASSWORD,
  'change-password': AUTH_METHOD_CATEGORIES.PASSWORD,
  'enable-2fa': AUTH_METHOD_CATEGORIES.MFA,
  'disable-2fa': AUTH_METHOD_CATEGORIES.MFA,
  'verify-2fa': AUTH_METHOD_CATEGORIES.MFA,
  'send-verification': AUTH_METHOD_CATEGORIES.VERIFICATION,
  'verify-email': AUTH_METHOD_CATEGORIES.VERIFICATION,
  'verify-phone': AUTH_METHOD_CATEGORIES.VERIFICATION,
  'request-reset': AUTH_METHOD_CATEGORIES.PASSWORD,
  'confirm-reset': AUTH_METHOD_CATEGORIES.PASSWORD,
  'social-login': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'social-register': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'sso-login': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'sso-callback': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'oauth-authorize': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'oauth-token': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'oauth-callback': AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  'check-auth': AUTH_METHOD_CATEGORIES.CORE,
  'validate-token': AUTH_METHOD_CATEGORIES.TOKEN,
  'revoke-token': AUTH_METHOD_CATEGORIES.TOKEN,
  'validate-session': AUTH_METHOD_CATEGORIES.SESSION,
  'terminate-session': AUTH_METHOD_CATEGORIES.SESSION,
  'terminate-all-sessions': AUTH_METHOD_CATEGORIES.SESSION,
  'manage-devices': AUTH_METHOD_CATEGORIES.DEVICE,
  'remove-device': AUTH_METHOD_CATEGORIES.DEVICE,
  'trust-device': AUTH_METHOD_CATEGORIES.DEVICE,
  'untrust-device': AUTH_METHOD_CATEGORIES.DEVICE,
} as const;

/**
 * Public Authentication Methods
 * Methods that don't require authentication
 */
export const PUBLIC_AUTH_METHODS: string[] = [
  'login',
  'register',
  'forgot-password',
  'reset-password',
  'send-verification',
  'verify-email',
  'verify-phone',
  'social-login',
  'social-register',
  'sso-login',
  'sso-callback',
  'oauth-authorize',
  'oauth-token',
  'oauth-callback',
  'request-reset',
  'confirm-reset',
] as const;

/**
 * Protected Authentication Methods
 * Methods that require authentication
 */
export const PROTECTED_AUTH_METHODS: string[] = [
  'logout',
  'refresh',
  'change-password',
  'enable-2fa',
  'disable-2fa',
  'verify-2fa',
  'check-auth',
  'validate-token',
  'revoke-token',
  'validate-session',
  'terminate-session',
  'terminate-all-sessions',
  'manage-devices',
  'remove-device',
  'trust-device',
  'untrust-device',
] as const;
