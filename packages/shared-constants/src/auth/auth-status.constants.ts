/**
 * Authentication Status Constants
 * Status values for authentication and user accounts
 */

import { HTTP_STATUS } from '../common/http-status.constants';

// ============================================================
// AUTH STATUS
// ============================================================
export const AUTH_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  LOCKED: 'locked',
  EXPIRED: 'expired',
  MFA_REQUIRED: 'mfa_required',
  SESSION_ACTIVE: 'session_active',
  SESSION_EXPIRED: 'session_expired',
  SESSION_INVALID: 'session_invalid',
  SESSION_TERMINATED: 'session_terminated',
} as const;

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

// ============================================================
// AUTH STATUS HTTP MAP
// ============================================================
export const AUTH_STATUS_HTTP_MAP: Record<AuthStatus, number> = {
  [AUTH_STATUS.ACTIVE]: HTTP_STATUS.OK,
  [AUTH_STATUS.INACTIVE]: HTTP_STATUS.FORBIDDEN,
  [AUTH_STATUS.BLOCKED]: HTTP_STATUS.FORBIDDEN,
  [AUTH_STATUS.DELETED]: HTTP_STATUS.NOT_FOUND,
  [AUTH_STATUS.PENDING]: HTTP_STATUS.ACCEPTED,
  [AUTH_STATUS.SUSPENDED]: HTTP_STATUS.FORBIDDEN,
  [AUTH_STATUS.LOCKED]: HTTP_STATUS.FORBIDDEN,
  [AUTH_STATUS.EXPIRED]: HTTP_STATUS.UNAUTHORIZED,
  [AUTH_STATUS.MFA_REQUIRED]: HTTP_STATUS.UNAUTHORIZED,
  [AUTH_STATUS.SESSION_ACTIVE]: HTTP_STATUS.OK,
  [AUTH_STATUS.SESSION_EXPIRED]: HTTP_STATUS.UNAUTHORIZED,
  [AUTH_STATUS.SESSION_INVALID]: HTTP_STATUS.UNAUTHORIZED,
  [AUTH_STATUS.SESSION_TERMINATED]: HTTP_STATUS.UNAUTHORIZED,
} as const;

// ============================================================
// AUTH STATUS MESSAGES
// ============================================================
export const AUTH_STATUS_MESSAGES: Record<AuthStatus, string> = {
  [AUTH_STATUS.ACTIVE]: 'Account is active and authenticated',
  [AUTH_STATUS.INACTIVE]: 'Account is inactive. Please contact support',
  [AUTH_STATUS.BLOCKED]: 'Account has been blocked. Please contact support',
  [AUTH_STATUS.DELETED]: 'Account has been deleted',
  [AUTH_STATUS.PENDING]: 'Account is pending verification',
  [AUTH_STATUS.SUSPENDED]: 'Account has been suspended temporarily',
  [AUTH_STATUS.LOCKED]: 'Account is locked due to suspicious activity',
  [AUTH_STATUS.EXPIRED]: 'Account has expired. Please renew',
  [AUTH_STATUS.MFA_REQUIRED]: 'Two-factor authentication required',
  [AUTH_STATUS.SESSION_ACTIVE]: 'Session is active',
  [AUTH_STATUS.SESSION_EXPIRED]: 'Session has expired',
  [AUTH_STATUS.SESSION_INVALID]: 'Session is invalid',
  [AUTH_STATUS.SESSION_TERMINATED]: 'Session has been terminated',
} as const;

// ============================================================
// AUTHENTICATED STATUSES
// ============================================================
export const AUTHENTICATED_STATUSES: AuthStatus[] = [
  AUTH_STATUS.ACTIVE,
  AUTH_STATUS.MFA_REQUIRED,
  AUTH_STATUS.SESSION_ACTIVE,
] as const;

// ============================================================
// UNAUTHENTICATED STATUSES
// ============================================================
export const UNAUTHENTICATED_STATUSES: AuthStatus[] = [
  AUTH_STATUS.INACTIVE,
  AUTH_STATUS.BLOCKED,
  AUTH_STATUS.DELETED,
  AUTH_STATUS.SUSPENDED,
  AUTH_STATUS.LOCKED,
  AUTH_STATUS.EXPIRED,
  AUTH_STATUS.SESSION_EXPIRED,
  AUTH_STATUS.SESSION_INVALID,
  AUTH_STATUS.SESSION_TERMINATED,
] as const;

// ============================================================
// PENDING STATUSES
// ============================================================
export const PENDING_STATUSES: AuthStatus[] = [
  AUTH_STATUS.PENDING,
  AUTH_STATUS.MFA_REQUIRED,
] as const;

// ============================================================
// BLOCKED STATUSES
// ============================================================
export const BLOCKED_STATUSES: AuthStatus[] = [
  AUTH_STATUS.BLOCKED,
  AUTH_STATUS.LOCKED,
  AUTH_STATUS.SUSPENDED,
] as const;

// ============================================================
// SESSION STATUSES
// ============================================================
export const SESSION_STATUSES: AuthStatus[] = [
  AUTH_STATUS.SESSION_ACTIVE,
  AUTH_STATUS.SESSION_EXPIRED,
  AUTH_STATUS.SESSION_INVALID,
  AUTH_STATUS.SESSION_TERMINATED,
] as const;

// ============================================================
// AUTH STATUS MAIN OBJECT
// ============================================================
export const authStatus = {
  STATUS: AUTH_STATUS,
  HTTP_MAP: AUTH_STATUS_HTTP_MAP,
  MESSAGES: AUTH_STATUS_MESSAGES,
  AUTHENTICATED: AUTHENTICATED_STATUSES,
  UNAUTHENTICATED: UNAUTHENTICATED_STATUSES,
  PENDING: PENDING_STATUSES,
  BLOCKED: BLOCKED_STATUSES,
  SESSION: SESSION_STATUSES,
} as const;

export type AuthStatusConstants = typeof authStatus;

// ============================================================
// HELPER FUNCTIONS (সব নামে AUTH যোগ করা হয়েছে)
// ============================================================
export function isAuthenticatedAuthStatus(status: AuthStatus): boolean {
  return AUTHENTICATED_STATUSES.includes(status);
}

export function isUnauthenticatedAuthStatus(status: AuthStatus): boolean {
  return UNAUTHENTICATED_STATUSES.includes(status);
}

export function isPendingAuthStatus(status: AuthStatus): boolean {
  return PENDING_STATUSES.includes(status);
}

export function isBlockedAuthStatus(status: AuthStatus): boolean {
  return BLOCKED_STATUSES.includes(status);
}

export function isSessionAuthStatus(status: AuthStatus): boolean {
  return SESSION_STATUSES.includes(status);
}

export function getHttpStatusFromAuthStatus(status: AuthStatus): number {
  return AUTH_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

export function getAuthStatusMessage(status: AuthStatus): string {
  return AUTH_STATUS_MESSAGES[status] || 'Unknown status';
}

export function isValidAuthStatus(status: string): status is AuthStatus {
  return Object.values(AUTH_STATUS).includes(status as AuthStatus);
}
