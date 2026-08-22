/**
 * Authentication Error Constants
 * Error codes and messages for authentication
 */

export const AUTH_ERROR = {
  // Authentication errors
  INVALID_CREDENTIALS: 'invalid_credentials',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_SUSPENDED: 'account_suspended',
  ACCOUNT_DELETED: 'account_deleted',
  ACCOUNT_EXPIRED: 'account_expired',
  ACCOUNT_NOT_VERIFIED: 'account_not_verified',
  ACCOUNT_ALREADY_EXISTS: 'account_already_exists',

  // Session errors
  SESSION_EXPIRED: 'session_expired',
  SESSION_INVALID: 'session_invalid',
  SESSION_REVOKED: 'session_revoked',
  SESSION_NOT_FOUND: 'session_not_found',
  SESSION_TERMINATED: 'session_terminated',

  // Token errors
  TOKEN_INVALID: 'token_invalid',
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_REVOKED: 'token_revoked',
  TOKEN_MALFORMED: 'token_malformed',
  TOKEN_NOT_FOUND: 'token_not_found',

  // Verification errors
  VERIFICATION_FAILED: 'verification_failed',
  VERIFICATION_EXPIRED: 'verification_expired',
  VERIFICATION_INVALID: 'verification_invalid',
  VERIFICATION_ATTEMPT_EXCEEDED: 'verification_attempt_exceeded',
  VERIFICATION_CODE_MISMATCH: 'verification_code_mismatch',

  // MFA/2FA errors
  MFA_REQUIRED: 'mfa_required',
  MFA_INVALID: 'mfa_invalid',
  MFA_EXPIRED: 'mfa_expired',
  MFA_NOT_ENABLED: 'mfa_not_enabled',
  MFA_ATTEMPT_EXCEEDED: 'mfa_attempt_exceeded',

  // Password errors
  PASSWORD_TOO_WEAK: 'password_too_weak',
  PASSWORD_MISMATCH: 'password_mismatch',
  PASSWORD_EXPIRED: 'password_expired',
  PASSWORD_REUSED: 'password_reused',
  PASSWORD_INVALID: 'password_invalid',

  // Provider errors
  PROVIDER_NOT_SUPPORTED: 'provider_not_supported',
  PROVIDER_AUTH_FAILED: 'provider_auth_failed',
  PROVIDER_ACCOUNT_NOT_LINKED: 'provider_account_not_linked',
  PROVIDER_ACCOUNT_ALREADY_LINKED: 'provider_account_already_linked',

  // Rate limit errors
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  LOGIN_ATTEMPT_EXCEEDED: 'login_attempt_exceeded',
  RESET_ATTEMPT_EXCEEDED: 'reset_attempt_exceeded',

  // Permission errors
  PERMISSION_DENIED: 'permission_denied',
  INSUFFICIENT_ROLE: 'insufficient_role',

  // 2FA errors
  TWO_FA_REQUIRED: '2fa_required',
  TWO_FA_INVALID: '2fa_invalid',
  TWO_FA_EXPIRED: '2fa_expired',
  TWO_FA_NOT_ENABLED: '2fa_not_enabled',
  TWO_FA_ATTEMPT_EXCEEDED: '2fa_attempt_exceeded',

  // General errors
  UNKNOWN_ERROR: 'unknown_error',
  INTERNAL_ERROR: 'internal_error',
  NETWORK_ERROR: 'network_error',
  TIMEOUT_ERROR: 'timeout_error',
  CONFIGURATION_ERROR: 'configuration_error',
} as const;

export type AuthError = (typeof AUTH_ERROR)[keyof typeof AUTH_ERROR];

export const AUTH_ERROR_MESSAGES: Record<AuthError, string> = {
  [AUTH_ERROR.INVALID_CREDENTIALS]: 'Invalid email or password',
  [AUTH_ERROR.ACCOUNT_LOCKED]: 'Account has been locked',
  [AUTH_ERROR.ACCOUNT_SUSPENDED]: 'Account has been suspended',
  [AUTH_ERROR.ACCOUNT_DELETED]: 'Account has been deleted',
  [AUTH_ERROR.ACCOUNT_EXPIRED]: 'Account has expired',
  [AUTH_ERROR.ACCOUNT_NOT_VERIFIED]: 'Account is not verified',
  [AUTH_ERROR.ACCOUNT_ALREADY_EXISTS]: 'Account already exists',
  [AUTH_ERROR.SESSION_EXPIRED]: 'Session has expired',
  [AUTH_ERROR.SESSION_INVALID]: 'Session is invalid',
  [AUTH_ERROR.SESSION_REVOKED]: 'Session has been revoked',
  [AUTH_ERROR.SESSION_NOT_FOUND]: 'Session not found',
  [AUTH_ERROR.SESSION_TERMINATED]: 'Session has been terminated',
  [AUTH_ERROR.TOKEN_INVALID]: 'Token is invalid',
  [AUTH_ERROR.TOKEN_EXPIRED]: 'Token has expired',
  [AUTH_ERROR.TOKEN_REVOKED]: 'Token has been revoked',
  [AUTH_ERROR.TOKEN_MALFORMED]: 'Token is malformed',
  [AUTH_ERROR.TOKEN_NOT_FOUND]: 'Token not found',
  [AUTH_ERROR.VERIFICATION_FAILED]: 'Verification failed',
  [AUTH_ERROR.VERIFICATION_EXPIRED]: 'Verification has expired',
  [AUTH_ERROR.VERIFICATION_INVALID]: 'Verification is invalid',
  [AUTH_ERROR.VERIFICATION_ATTEMPT_EXCEEDED]: 'Verification attempts exceeded',
  [AUTH_ERROR.VERIFICATION_CODE_MISMATCH]: 'Verification code mismatch',
  [AUTH_ERROR.MFA_REQUIRED]: 'MFA verification required',
  [AUTH_ERROR.MFA_INVALID]: 'MFA code is invalid',
  [AUTH_ERROR.MFA_EXPIRED]: 'MFA code has expired',
  [AUTH_ERROR.MFA_NOT_ENABLED]: 'MFA is not enabled',
  [AUTH_ERROR.MFA_ATTEMPT_EXCEEDED]: 'MFA attempts exceeded',
  [AUTH_ERROR.PASSWORD_TOO_WEAK]: 'Password is too weak',
  [AUTH_ERROR.PASSWORD_MISMATCH]: 'Passwords do not match',
  [AUTH_ERROR.PASSWORD_EXPIRED]: 'Password has expired',
  [AUTH_ERROR.PASSWORD_REUSED]: 'Password cannot be reused',
  [AUTH_ERROR.PASSWORD_INVALID]: 'Password is invalid',
  [AUTH_ERROR.PROVIDER_NOT_SUPPORTED]: 'Authentication provider not supported',
  [AUTH_ERROR.PROVIDER_AUTH_FAILED]: 'Provider authentication failed',
  [AUTH_ERROR.PROVIDER_ACCOUNT_NOT_LINKED]: 'Provider account not linked',
  [AUTH_ERROR.PROVIDER_ACCOUNT_ALREADY_LINKED]: 'Provider account already linked',
  [AUTH_ERROR.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [AUTH_ERROR.LOGIN_ATTEMPT_EXCEEDED]: 'Login attempts exceeded',
  [AUTH_ERROR.RESET_ATTEMPT_EXCEEDED]: 'Reset attempts exceeded',
  [AUTH_ERROR.PERMISSION_DENIED]: 'Permission denied',
  [AUTH_ERROR.INSUFFICIENT_ROLE]: 'Insufficient role',
  [AUTH_ERROR.TWO_FA_REQUIRED]: '2FA verification required',
  [AUTH_ERROR.TWO_FA_INVALID]: '2FA code is invalid',
  [AUTH_ERROR.TWO_FA_EXPIRED]: '2FA code has expired',
  [AUTH_ERROR.TWO_FA_NOT_ENABLED]: '2FA is not enabled',
  [AUTH_ERROR.TWO_FA_ATTEMPT_EXCEEDED]: '2FA attempts exceeded',
  [AUTH_ERROR.UNKNOWN_ERROR]: 'An unknown error occurred',
  [AUTH_ERROR.INTERNAL_ERROR]: 'Internal server error',
  [AUTH_ERROR.NETWORK_ERROR]: 'Network connection error',
  [AUTH_ERROR.TIMEOUT_ERROR]: 'Request timeout',
  [AUTH_ERROR.CONFIGURATION_ERROR]: 'Configuration error',
};

export const AUTH_ERROR_HTTP_STATUS: Record<AuthError, number> = {
  [AUTH_ERROR.INVALID_CREDENTIALS]: 401,
  [AUTH_ERROR.ACCOUNT_LOCKED]: 403,
  [AUTH_ERROR.ACCOUNT_SUSPENDED]: 403,
  [AUTH_ERROR.ACCOUNT_DELETED]: 403,
  [AUTH_ERROR.ACCOUNT_EXPIRED]: 403,
  [AUTH_ERROR.ACCOUNT_NOT_VERIFIED]: 403,
  [AUTH_ERROR.ACCOUNT_ALREADY_EXISTS]: 409,
  [AUTH_ERROR.SESSION_EXPIRED]: 401,
  [AUTH_ERROR.SESSION_INVALID]: 401,
  [AUTH_ERROR.SESSION_REVOKED]: 401,
  [AUTH_ERROR.SESSION_NOT_FOUND]: 401,
  [AUTH_ERROR.SESSION_TERMINATED]: 401,
  [AUTH_ERROR.TOKEN_INVALID]: 401,
  [AUTH_ERROR.TOKEN_EXPIRED]: 401,
  [AUTH_ERROR.TOKEN_REVOKED]: 401,
  [AUTH_ERROR.TOKEN_MALFORMED]: 401,
  [AUTH_ERROR.TOKEN_NOT_FOUND]: 401,
  [AUTH_ERROR.VERIFICATION_FAILED]: 400,
  [AUTH_ERROR.VERIFICATION_EXPIRED]: 400,
  [AUTH_ERROR.VERIFICATION_INVALID]: 400,
  [AUTH_ERROR.VERIFICATION_ATTEMPT_EXCEEDED]: 429,
  [AUTH_ERROR.VERIFICATION_CODE_MISMATCH]: 400,
  [AUTH_ERROR.MFA_REQUIRED]: 401,
  [AUTH_ERROR.MFA_INVALID]: 401,
  [AUTH_ERROR.MFA_EXPIRED]: 401,
  [AUTH_ERROR.MFA_NOT_ENABLED]: 400,
  [AUTH_ERROR.MFA_ATTEMPT_EXCEEDED]: 429,
  [AUTH_ERROR.PASSWORD_TOO_WEAK]: 400,
  [AUTH_ERROR.PASSWORD_MISMATCH]: 400,
  [AUTH_ERROR.PASSWORD_EXPIRED]: 400,
  [AUTH_ERROR.PASSWORD_REUSED]: 400,
  [AUTH_ERROR.PASSWORD_INVALID]: 400,
  [AUTH_ERROR.PROVIDER_NOT_SUPPORTED]: 400,
  [AUTH_ERROR.PROVIDER_AUTH_FAILED]: 401,
  [AUTH_ERROR.PROVIDER_ACCOUNT_NOT_LINKED]: 400,
  [AUTH_ERROR.PROVIDER_ACCOUNT_ALREADY_LINKED]: 409,
  [AUTH_ERROR.RATE_LIMIT_EXCEEDED]: 429,
  [AUTH_ERROR.LOGIN_ATTEMPT_EXCEEDED]: 429,
  [AUTH_ERROR.RESET_ATTEMPT_EXCEEDED]: 429,
  [AUTH_ERROR.PERMISSION_DENIED]: 403,
  [AUTH_ERROR.INSUFFICIENT_ROLE]: 403,
  [AUTH_ERROR.TWO_FA_REQUIRED]: 401,
  [AUTH_ERROR.TWO_FA_INVALID]: 401,
  [AUTH_ERROR.TWO_FA_EXPIRED]: 401,
  [AUTH_ERROR.TWO_FA_NOT_ENABLED]: 400,
  [AUTH_ERROR.TWO_FA_ATTEMPT_EXCEEDED]: 429,
  [AUTH_ERROR.UNKNOWN_ERROR]: 500,
  [AUTH_ERROR.INTERNAL_ERROR]: 500,
  [AUTH_ERROR.NETWORK_ERROR]: 503,
  [AUTH_ERROR.TIMEOUT_ERROR]: 504,
  [AUTH_ERROR.CONFIGURATION_ERROR]: 500,
};

export function getErrorMessage(error: AuthError): string {
  return AUTH_ERROR_MESSAGES[error] || 'An unknown error occurred';
}

export function getErrorHttpStatus(error: AuthError): number {
  return AUTH_ERROR_HTTP_STATUS[error] || 500;
}

export function isAuthError(value: string): value is AuthError {
  return Object.values(AUTH_ERROR).includes(value as AuthError);
}
