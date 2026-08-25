/**
 * Authentication Social Status Constants
 * Status values for social authentication
 */

export const AUTH_SOCIAL_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  BLOCKED: 'blocked',

  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  AUTHENTICATION_PENDING: 'authentication_pending',
  AUTHENTICATION_FAILED: 'authentication_failed',

  TOKEN_VALID: 'token_valid',
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_REVOKED: 'token_revoked',
  TOKEN_REFRESHED: 'token_refreshed',

  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  VERIFICATION_PENDING: 'verification_pending',
  VERIFICATION_FAILED: 'verification_failed',

  LINKED: 'linked',
  UNLINKED: 'unlinked',
  LINKING_PENDING: 'linking_pending',
  LINKING_FAILED: 'linking_failed',

  SECURE: 'secure',
  SUSPICIOUS: 'suspicious',
  COMPROMISED: 'compromised',
} as const;

export type AuthsocialStatus = (typeof AUTH_SOCIAL_STATUS)[keyof typeof AUTH_SOCIAL_STATUS];

export const AUTHSOCIAL_ACTIVE_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.ACTIVE,
  AUTH_SOCIAL_STATUS.AUTHENTICATED,
  AUTH_SOCIAL_STATUS.TOKEN_VALID,
  AUTH_SOCIAL_STATUS.VERIFIED,
  AUTH_SOCIAL_STATUS.LINKED,
  AUTH_SOCIAL_STATUS.SECURE,
];

export const AUTHSOCIAL_PENDING_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.PENDING,
  AUTH_SOCIAL_STATUS.AUTHENTICATION_PENDING,
  AUTH_SOCIAL_STATUS.VERIFICATION_PENDING,
  AUTH_SOCIAL_STATUS.LINKING_PENDING,
];

export const AUTHSOCIAL_INACTIVE_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.INACTIVE,
  AUTH_SOCIAL_STATUS.EXPIRED,
  AUTH_SOCIAL_STATUS.REVOKED,
  AUTH_SOCIAL_STATUS.UNAUTHENTICATED,
  AUTH_SOCIAL_STATUS.TOKEN_EXPIRED,
  AUTH_SOCIAL_STATUS.TOKEN_REVOKED,
  AUTH_SOCIAL_STATUS.UNVERIFIED,
  AUTH_SOCIAL_STATUS.UNLINKED,
];

export const AUTHSOCIAL_FAILED_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.AUTHENTICATION_FAILED,
  AUTH_SOCIAL_STATUS.VERIFICATION_FAILED,
  AUTH_SOCIAL_STATUS.LINKING_FAILED,
  AUTH_SOCIAL_STATUS.BLOCKED,
];

export const AUTHSOCIAL_SECURITY_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.SUSPICIOUS,
  AUTH_SOCIAL_STATUS.COMPROMISED,
];

export const AUTHSOCIAL_TOKEN_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.TOKEN_VALID,
  AUTH_SOCIAL_STATUS.TOKEN_EXPIRED,
  AUTH_SOCIAL_STATUS.TOKEN_REVOKED,
  AUTH_SOCIAL_STATUS.TOKEN_REFRESHED,
];

export const AUTHSOCIAL_LINKED_VERIFIED_STATUSES: AuthsocialStatus[] = [
  AUTH_SOCIAL_STATUS.VERIFIED,
  AUTH_SOCIAL_STATUS.AUTHENTICATED,
  AUTH_SOCIAL_STATUS.LINKED,
];

export function isAuthsocialActive(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_ACTIVE_STATUSES.includes(status);
}

export function isAuthsocialPending(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_PENDING_STATUSES.includes(status);
}

export function isAuthsocialInactive(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_INACTIVE_STATUSES.includes(status);
}

export function isAuthsocialFailed(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_FAILED_STATUSES.includes(status);
}

export function isAuthsocialSecurityIssue(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_SECURITY_STATUSES.includes(status);
}

export function isAuthsocialTokenStatus(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_TOKEN_STATUSES.includes(status);
}

export function isAuthsocialLinked(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_LINKED_VERIFIED_STATUSES.includes(status);
}

export function isAuthsocialVerified(status: AuthsocialStatus): boolean {
  return AUTHSOCIAL_LINKED_VERIFIED_STATUSES.includes(status);
}

export function getAuthsocialStatusLabel(status: AuthsocialStatus): string {
  const labels: Record<AuthsocialStatus, string> = {
    [AUTH_SOCIAL_STATUS.PENDING]: 'Pending',
    [AUTH_SOCIAL_STATUS.ACTIVE]: 'Active',
    [AUTH_SOCIAL_STATUS.INACTIVE]: 'Inactive',
    [AUTH_SOCIAL_STATUS.EXPIRED]: 'Expired',
    [AUTH_SOCIAL_STATUS.REVOKED]: 'Revoked',
    [AUTH_SOCIAL_STATUS.BLOCKED]: 'Blocked',
    [AUTH_SOCIAL_STATUS.AUTHENTICATED]: 'Authenticated',
    [AUTH_SOCIAL_STATUS.UNAUTHENTICATED]: 'Unauthenticated',
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_PENDING]: 'Authentication Pending',
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_FAILED]: 'Authentication Failed',
    [AUTH_SOCIAL_STATUS.TOKEN_VALID]: 'Token Valid',
    [AUTH_SOCIAL_STATUS.TOKEN_EXPIRED]: 'Token Expired',
    [AUTH_SOCIAL_STATUS.TOKEN_REVOKED]: 'Token Revoked',
    [AUTH_SOCIAL_STATUS.TOKEN_REFRESHED]: 'Token Refreshed',
    [AUTH_SOCIAL_STATUS.VERIFIED]: 'Verified',
    [AUTH_SOCIAL_STATUS.UNVERIFIED]: 'Unverified',
    [AUTH_SOCIAL_STATUS.VERIFICATION_PENDING]: 'Verification Pending',
    [AUTH_SOCIAL_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
    [AUTH_SOCIAL_STATUS.LINKED]: 'Linked',
    [AUTH_SOCIAL_STATUS.UNLINKED]: 'Unlinked',
    [AUTH_SOCIAL_STATUS.LINKING_PENDING]: 'Linking Pending',
    [AUTH_SOCIAL_STATUS.LINKING_FAILED]: 'Linking Failed',
    [AUTH_SOCIAL_STATUS.SECURE]: 'Secure',
    [AUTH_SOCIAL_STATUS.SUSPICIOUS]: 'Suspicious',
    [AUTH_SOCIAL_STATUS.COMPROMISED]: 'Compromised',
  };

  return labels[status] || 'Unknown Status';
}

export function getAuthsocialStatusColor(status: AuthsocialStatus): string {
  const colors: Record<AuthsocialStatus, string> = {
    [AUTH_SOCIAL_STATUS.PENDING]: '#F59E0B',
    [AUTH_SOCIAL_STATUS.ACTIVE]: '#10B981',
    [AUTH_SOCIAL_STATUS.INACTIVE]: '#6B7280',
    [AUTH_SOCIAL_STATUS.EXPIRED]: '#6B7280',
    [AUTH_SOCIAL_STATUS.REVOKED]: '#6B7280',
    [AUTH_SOCIAL_STATUS.BLOCKED]: '#DC2626',
    [AUTH_SOCIAL_STATUS.AUTHENTICATED]: '#10B981',
    [AUTH_SOCIAL_STATUS.UNAUTHENTICATED]: '#6B7280',
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_PENDING]: '#F59E0B',
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_FAILED]: '#EF4444',
    [AUTH_SOCIAL_STATUS.TOKEN_VALID]: '#10B981',
    [AUTH_SOCIAL_STATUS.TOKEN_EXPIRED]: '#6B7280',
    [AUTH_SOCIAL_STATUS.TOKEN_REVOKED]: '#6B7280',
    [AUTH_SOCIAL_STATUS.TOKEN_REFRESHED]: '#3B82F6',
    [AUTH_SOCIAL_STATUS.VERIFIED]: '#10B981',
    [AUTH_SOCIAL_STATUS.UNVERIFIED]: '#F59E0B',
    [AUTH_SOCIAL_STATUS.VERIFICATION_PENDING]: '#F59E0B',
    [AUTH_SOCIAL_STATUS.VERIFICATION_FAILED]: '#EF4444',
    [AUTH_SOCIAL_STATUS.LINKED]: '#10B981',
    [AUTH_SOCIAL_STATUS.UNLINKED]: '#6B7280',
    [AUTH_SOCIAL_STATUS.LINKING_PENDING]: '#F59E0B',
    [AUTH_SOCIAL_STATUS.LINKING_FAILED]: '#EF4444',
    [AUTH_SOCIAL_STATUS.SECURE]: '#10B981',
    [AUTH_SOCIAL_STATUS.SUSPICIOUS]: '#F59E0B',
    [AUTH_SOCIAL_STATUS.COMPROMISED]: '#DC2626',
  };

  return colors[status] || '#6B7280';
}

export function getAuthsocialStatusPriority(status: AuthsocialStatus): number {
  const priorities: Record<AuthsocialStatus, number> = {
    [AUTH_SOCIAL_STATUS.PENDING]: 5,
    [AUTH_SOCIAL_STATUS.ACTIVE]: 10,
    [AUTH_SOCIAL_STATUS.INACTIVE]: 3,
    [AUTH_SOCIAL_STATUS.EXPIRED]: 3,
    [AUTH_SOCIAL_STATUS.REVOKED]: 3,
    [AUTH_SOCIAL_STATUS.BLOCKED]: 1,
    [AUTH_SOCIAL_STATUS.AUTHENTICATED]: 10,
    [AUTH_SOCIAL_STATUS.UNAUTHENTICATED]: 3,
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_PENDING]: 5,
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_FAILED]: 2,
    [AUTH_SOCIAL_STATUS.TOKEN_VALID]: 8,
    [AUTH_SOCIAL_STATUS.TOKEN_EXPIRED]: 3,
    [AUTH_SOCIAL_STATUS.TOKEN_REVOKED]: 3,
    [AUTH_SOCIAL_STATUS.TOKEN_REFRESHED]: 7,
    [AUTH_SOCIAL_STATUS.VERIFIED]: 9,
    [AUTH_SOCIAL_STATUS.UNVERIFIED]: 4,
    [AUTH_SOCIAL_STATUS.VERIFICATION_PENDING]: 5,
    [AUTH_SOCIAL_STATUS.VERIFICATION_FAILED]: 2,
    [AUTH_SOCIAL_STATUS.LINKED]: 9,
    [AUTH_SOCIAL_STATUS.UNLINKED]: 4,
    [AUTH_SOCIAL_STATUS.LINKING_PENDING]: 5,
    [AUTH_SOCIAL_STATUS.LINKING_FAILED]: 2,
    [AUTH_SOCIAL_STATUS.SECURE]: 10,
    [AUTH_SOCIAL_STATUS.SUSPICIOUS]: 4,
    [AUTH_SOCIAL_STATUS.COMPROMISED]: 1,
  };

  return priorities[status] || 5;
}

export function getAuthsocialStatusBadgeType(
  status: AuthsocialStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const types: Record<AuthsocialStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    [AUTH_SOCIAL_STATUS.PENDING]: 'warning',
    [AUTH_SOCIAL_STATUS.ACTIVE]: 'success',
    [AUTH_SOCIAL_STATUS.INACTIVE]: 'default',
    [AUTH_SOCIAL_STATUS.EXPIRED]: 'default',
    [AUTH_SOCIAL_STATUS.REVOKED]: 'default',
    [AUTH_SOCIAL_STATUS.BLOCKED]: 'error',
    [AUTH_SOCIAL_STATUS.AUTHENTICATED]: 'success',
    [AUTH_SOCIAL_STATUS.UNAUTHENTICATED]: 'default',
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_PENDING]: 'warning',
    [AUTH_SOCIAL_STATUS.AUTHENTICATION_FAILED]: 'error',
    [AUTH_SOCIAL_STATUS.TOKEN_VALID]: 'success',
    [AUTH_SOCIAL_STATUS.TOKEN_EXPIRED]: 'default',
    [AUTH_SOCIAL_STATUS.TOKEN_REVOKED]: 'default',
    [AUTH_SOCIAL_STATUS.TOKEN_REFRESHED]: 'info',
    [AUTH_SOCIAL_STATUS.VERIFIED]: 'success',
    [AUTH_SOCIAL_STATUS.UNVERIFIED]: 'warning',
    [AUTH_SOCIAL_STATUS.VERIFICATION_PENDING]: 'warning',
    [AUTH_SOCIAL_STATUS.VERIFICATION_FAILED]: 'error',
    [AUTH_SOCIAL_STATUS.LINKED]: 'success',
    [AUTH_SOCIAL_STATUS.UNLINKED]: 'default',
    [AUTH_SOCIAL_STATUS.LINKING_PENDING]: 'warning',
    [AUTH_SOCIAL_STATUS.LINKING_FAILED]: 'error',
    [AUTH_SOCIAL_STATUS.SECURE]: 'success',
    [AUTH_SOCIAL_STATUS.SUSPICIOUS]: 'warning',
    [AUTH_SOCIAL_STATUS.COMPROMISED]: 'error',
  };

  return types[status] || 'default';
}
