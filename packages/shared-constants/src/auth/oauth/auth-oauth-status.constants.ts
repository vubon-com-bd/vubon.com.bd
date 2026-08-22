/**
 * Authentication OAuth Status Constants
 * Status values for OAuth authentication
 */

export const AUTH_OAUTH_STATUS = {
  // Primary status
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  BLOCKED: 'blocked',

  // Authentication status
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  AUTHENTICATION_PENDING: 'authentication_pending',
  AUTHENTICATION_FAILED: 'authentication_failed',

  // Token status
  TOKEN_VALID: 'token_valid',
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_REVOKED: 'token_revoked',
  TOKEN_REFRESHED: 'token_refreshed',
  TOKEN_ISSUED: 'token_issued',

  // Code status
  CODE_ISSUED: 'code_issued',
  CODE_EXPIRED: 'code_expired',
  CODE_USED: 'code_used',
  CODE_REVOKED: 'code_revoked',

  // User info status
  USERINFO_FETCHED: 'userinfo_fetched',
  USERINFO_FAILED: 'userinfo_failed',
  USERINFO_PENDING: 'userinfo_pending',

  // Security status
  SECURE: 'secure',
  SUSPICIOUS: 'suspicious',
  COMPROMISED: 'compromised',

  // Session status
  SESSION_ACTIVE: 'session_active',
  SESSION_EXPIRED: 'session_expired',
  SESSION_TERMINATED: 'session_terminated',
} as const;

export type AuthOAuthStatus = (typeof AUTH_OAUTH_STATUS)[keyof typeof AUTH_OAUTH_STATUS];

export const ACTIVE_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.ACTIVE,
  AUTH_OAUTH_STATUS.AUTHENTICATED,
  AUTH_OAUTH_STATUS.TOKEN_VALID,
  AUTH_OAUTH_STATUS.TOKEN_ISSUED,
  AUTH_OAUTH_STATUS.USERINFO_FETCHED,
  AUTH_OAUTH_STATUS.SECURE,
  AUTH_OAUTH_STATUS.SESSION_ACTIVE,
];

export const PENDING_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.PENDING,
  AUTH_OAUTH_STATUS.AUTHENTICATION_PENDING,
  AUTH_OAUTH_STATUS.USERINFO_PENDING,
  AUTH_OAUTH_STATUS.CODE_ISSUED,
];

export const INACTIVE_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.INACTIVE,
  AUTH_OAUTH_STATUS.EXPIRED,
  AUTH_OAUTH_STATUS.REVOKED,
  AUTH_OAUTH_STATUS.UNAUTHENTICATED,
  AUTH_OAUTH_STATUS.TOKEN_EXPIRED,
  AUTH_OAUTH_STATUS.TOKEN_REVOKED,
  AUTH_OAUTH_STATUS.CODE_EXPIRED,
  AUTH_OAUTH_STATUS.CODE_USED,
  AUTH_OAUTH_STATUS.CODE_REVOKED,
  AUTH_OAUTH_STATUS.SESSION_EXPIRED,
  AUTH_OAUTH_STATUS.SESSION_TERMINATED,
];

export const FAILED_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.AUTHENTICATION_FAILED,
  AUTH_OAUTH_STATUS.USERINFO_FAILED,
  AUTH_OAUTH_STATUS.BLOCKED,
];

export const SECURITY_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.SUSPICIOUS,
  AUTH_OAUTH_STATUS.COMPROMISED,
];

export const TOKEN_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.TOKEN_VALID,
  AUTH_OAUTH_STATUS.TOKEN_EXPIRED,
  AUTH_OAUTH_STATUS.TOKEN_REVOKED,
  AUTH_OAUTH_STATUS.TOKEN_REFRESHED,
  AUTH_OAUTH_STATUS.TOKEN_ISSUED,
];

export const CODE_OAUTH_STATUSES: AuthOAuthStatus[] = [
  AUTH_OAUTH_STATUS.CODE_ISSUED,
  AUTH_OAUTH_STATUS.CODE_EXPIRED,
  AUTH_OAUTH_STATUS.CODE_USED,
  AUTH_OAUTH_STATUS.CODE_REVOKED,
];

export function isOAuthActive(status: AuthOAuthStatus): boolean {
  return ACTIVE_OAUTH_STATUSES.includes(status);
}

export function isOAuthPending(status: AuthOAuthStatus): boolean {
  return PENDING_OAUTH_STATUSES.includes(status);
}

export function isOAuthInactive(status: AuthOAuthStatus): boolean {
  return INACTIVE_OAUTH_STATUSES.includes(status);
}

export function isOAuthFailed(status: AuthOAuthStatus): boolean {
  return FAILED_OAUTH_STATUSES.includes(status);
}

export function isOAuthSecurityIssue(status: AuthOAuthStatus): boolean {
  return SECURITY_OAUTH_STATUSES.includes(status);
}

export function isOAuthTokenStatus(status: AuthOAuthStatus): boolean {
  return TOKEN_OAUTH_STATUSES.includes(status);
}

export function isOAuthCodeStatus(status: AuthOAuthStatus): boolean {
  return CODE_OAUTH_STATUSES.includes(status);
}

export function getOAuthStatusLabel(status: AuthOAuthStatus): string {
  const labels: Record<AuthOAuthStatus, string> = {
    [AUTH_OAUTH_STATUS.PENDING]: 'Pending',
    [AUTH_OAUTH_STATUS.ACTIVE]: 'Active',
    [AUTH_OAUTH_STATUS.INACTIVE]: 'Inactive',
    [AUTH_OAUTH_STATUS.EXPIRED]: 'Expired',
    [AUTH_OAUTH_STATUS.REVOKED]: 'Revoked',
    [AUTH_OAUTH_STATUS.BLOCKED]: 'Blocked',
    [AUTH_OAUTH_STATUS.AUTHENTICATED]: 'Authenticated',
    [AUTH_OAUTH_STATUS.UNAUTHENTICATED]: 'Unauthenticated',
    [AUTH_OAUTH_STATUS.AUTHENTICATION_PENDING]: 'Authentication Pending',
    [AUTH_OAUTH_STATUS.AUTHENTICATION_FAILED]: 'Authentication Failed',
    [AUTH_OAUTH_STATUS.TOKEN_VALID]: 'Token Valid',
    [AUTH_OAUTH_STATUS.TOKEN_EXPIRED]: 'Token Expired',
    [AUTH_OAUTH_STATUS.TOKEN_REVOKED]: 'Token Revoked',
    [AUTH_OAUTH_STATUS.TOKEN_REFRESHED]: 'Token Refreshed',
    [AUTH_OAUTH_STATUS.TOKEN_ISSUED]: 'Token Issued',
    [AUTH_OAUTH_STATUS.CODE_ISSUED]: 'Code Issued',
    [AUTH_OAUTH_STATUS.CODE_EXPIRED]: 'Code Expired',
    [AUTH_OAUTH_STATUS.CODE_USED]: 'Code Used',
    [AUTH_OAUTH_STATUS.CODE_REVOKED]: 'Code Revoked',
    [AUTH_OAUTH_STATUS.USERINFO_FETCHED]: 'User Info Fetched',
    [AUTH_OAUTH_STATUS.USERINFO_FAILED]: 'User Info Failed',
    [AUTH_OAUTH_STATUS.USERINFO_PENDING]: 'User Info Pending',
    [AUTH_OAUTH_STATUS.SECURE]: 'Secure',
    [AUTH_OAUTH_STATUS.SUSPICIOUS]: 'Suspicious',
    [AUTH_OAUTH_STATUS.COMPROMISED]: 'Compromised',
    [AUTH_OAUTH_STATUS.SESSION_ACTIVE]: 'Session Active',
    [AUTH_OAUTH_STATUS.SESSION_EXPIRED]: 'Session Expired',
    [AUTH_OAUTH_STATUS.SESSION_TERMINATED]: 'Session Terminated',
  };

  return labels[status] || 'Unknown Status';
}

export function getOAuthStatusColor(status: AuthOAuthStatus): string {
  const colors: Record<AuthOAuthStatus, string> = {
    [AUTH_OAUTH_STATUS.PENDING]: '#F59E0B',
    [AUTH_OAUTH_STATUS.ACTIVE]: '#10B981',
    [AUTH_OAUTH_STATUS.INACTIVE]: '#6B7280',
    [AUTH_OAUTH_STATUS.EXPIRED]: '#6B7280',
    [AUTH_OAUTH_STATUS.REVOKED]: '#6B7280',
    [AUTH_OAUTH_STATUS.BLOCKED]: '#DC2626',
    [AUTH_OAUTH_STATUS.AUTHENTICATED]: '#10B981',
    [AUTH_OAUTH_STATUS.UNAUTHENTICATED]: '#6B7280',
    [AUTH_OAUTH_STATUS.AUTHENTICATION_PENDING]: '#F59E0B',
    [AUTH_OAUTH_STATUS.AUTHENTICATION_FAILED]: '#EF4444',
    [AUTH_OAUTH_STATUS.TOKEN_VALID]: '#10B981',
    [AUTH_OAUTH_STATUS.TOKEN_EXPIRED]: '#6B7280',
    [AUTH_OAUTH_STATUS.TOKEN_REVOKED]: '#6B7280',
    [AUTH_OAUTH_STATUS.TOKEN_REFRESHED]: '#3B82F6',
    [AUTH_OAUTH_STATUS.TOKEN_ISSUED]: '#3B82F6',
    [AUTH_OAUTH_STATUS.CODE_ISSUED]: '#3B82F6',
    [AUTH_OAUTH_STATUS.CODE_EXPIRED]: '#6B7280',
    [AUTH_OAUTH_STATUS.CODE_USED]: '#6B7280',
    [AUTH_OAUTH_STATUS.CODE_REVOKED]: '#6B7280',
    [AUTH_OAUTH_STATUS.USERINFO_FETCHED]: '#10B981',
    [AUTH_OAUTH_STATUS.USERINFO_FAILED]: '#EF4444',
    [AUTH_OAUTH_STATUS.USERINFO_PENDING]: '#F59E0B',
    [AUTH_OAUTH_STATUS.SECURE]: '#10B981',
    [AUTH_OAUTH_STATUS.SUSPICIOUS]: '#F59E0B',
    [AUTH_OAUTH_STATUS.COMPROMISED]: '#DC2626',
    [AUTH_OAUTH_STATUS.SESSION_ACTIVE]: '#10B981',
    [AUTH_OAUTH_STATUS.SESSION_EXPIRED]: '#6B7280',
    [AUTH_OAUTH_STATUS.SESSION_TERMINATED]: '#6B7280',
  };

  return colors[status] || '#6B7280';
}

export function getOAuthStatusPriority(status: AuthOAuthStatus): number {
  const priorities: Record<AuthOAuthStatus, number> = {
    [AUTH_OAUTH_STATUS.PENDING]: 5,
    [AUTH_OAUTH_STATUS.ACTIVE]: 10,
    [AUTH_OAUTH_STATUS.INACTIVE]: 3,
    [AUTH_OAUTH_STATUS.EXPIRED]: 3,
    [AUTH_OAUTH_STATUS.REVOKED]: 3,
    [AUTH_OAUTH_STATUS.BLOCKED]: 1,
    [AUTH_OAUTH_STATUS.AUTHENTICATED]: 10,
    [AUTH_OAUTH_STATUS.UNAUTHENTICATED]: 3,
    [AUTH_OAUTH_STATUS.AUTHENTICATION_PENDING]: 5,
    [AUTH_OAUTH_STATUS.AUTHENTICATION_FAILED]: 2,
    [AUTH_OAUTH_STATUS.TOKEN_VALID]: 8,
    [AUTH_OAUTH_STATUS.TOKEN_EXPIRED]: 3,
    [AUTH_OAUTH_STATUS.TOKEN_REVOKED]: 3,
    [AUTH_OAUTH_STATUS.TOKEN_REFRESHED]: 7,
    [AUTH_OAUTH_STATUS.TOKEN_ISSUED]: 7,
    [AUTH_OAUTH_STATUS.CODE_ISSUED]: 6,
    [AUTH_OAUTH_STATUS.CODE_EXPIRED]: 3,
    [AUTH_OAUTH_STATUS.CODE_USED]: 4,
    [AUTH_OAUTH_STATUS.CODE_REVOKED]: 3,
    [AUTH_OAUTH_STATUS.USERINFO_FETCHED]: 8,
    [AUTH_OAUTH_STATUS.USERINFO_FAILED]: 2,
    [AUTH_OAUTH_STATUS.USERINFO_PENDING]: 5,
    [AUTH_OAUTH_STATUS.SECURE]: 10,
    [AUTH_OAUTH_STATUS.SUSPICIOUS]: 4,
    [AUTH_OAUTH_STATUS.COMPROMISED]: 1,
    [AUTH_OAUTH_STATUS.SESSION_ACTIVE]: 8,
    [AUTH_OAUTH_STATUS.SESSION_EXPIRED]: 3,
    [AUTH_OAUTH_STATUS.SESSION_TERMINATED]: 3,
  };

  return priorities[status] || 5;
}

export function getOAuthStatusBadgeType(
  status: AuthOAuthStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const types: Record<AuthOAuthStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    [AUTH_OAUTH_STATUS.PENDING]: 'warning',
    [AUTH_OAUTH_STATUS.ACTIVE]: 'success',
    [AUTH_OAUTH_STATUS.INACTIVE]: 'default',
    [AUTH_OAUTH_STATUS.EXPIRED]: 'default',
    [AUTH_OAUTH_STATUS.REVOKED]: 'default',
    [AUTH_OAUTH_STATUS.BLOCKED]: 'error',
    [AUTH_OAUTH_STATUS.AUTHENTICATED]: 'success',
    [AUTH_OAUTH_STATUS.UNAUTHENTICATED]: 'default',
    [AUTH_OAUTH_STATUS.AUTHENTICATION_PENDING]: 'warning',
    [AUTH_OAUTH_STATUS.AUTHENTICATION_FAILED]: 'error',
    [AUTH_OAUTH_STATUS.TOKEN_VALID]: 'success',
    [AUTH_OAUTH_STATUS.TOKEN_EXPIRED]: 'default',
    [AUTH_OAUTH_STATUS.TOKEN_REVOKED]: 'default',
    [AUTH_OAUTH_STATUS.TOKEN_REFRESHED]: 'info',
    [AUTH_OAUTH_STATUS.TOKEN_ISSUED]: 'info',
    [AUTH_OAUTH_STATUS.CODE_ISSUED]: 'info',
    [AUTH_OAUTH_STATUS.CODE_EXPIRED]: 'default',
    [AUTH_OAUTH_STATUS.CODE_USED]: 'default',
    [AUTH_OAUTH_STATUS.CODE_REVOKED]: 'default',
    [AUTH_OAUTH_STATUS.USERINFO_FETCHED]: 'success',
    [AUTH_OAUTH_STATUS.USERINFO_FAILED]: 'error',
    [AUTH_OAUTH_STATUS.USERINFO_PENDING]: 'warning',
    [AUTH_OAUTH_STATUS.SECURE]: 'success',
    [AUTH_OAUTH_STATUS.SUSPICIOUS]: 'warning',
    [AUTH_OAUTH_STATUS.COMPROMISED]: 'error',
    [AUTH_OAUTH_STATUS.SESSION_ACTIVE]: 'success',
    [AUTH_OAUTH_STATUS.SESSION_EXPIRED]: 'default',
    [AUTH_OAUTH_STATUS.SESSION_TERMINATED]: 'default',
  };

  return types[status] || 'default';
}
