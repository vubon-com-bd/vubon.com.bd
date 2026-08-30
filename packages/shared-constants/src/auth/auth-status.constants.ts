/**
 * Authentication Status Constants
 * Status values for authentication and user accounts
 */

import { HTTP_STATUS } from '../common/http-status.constants';

/**
 * Authentication Status
 * Current status of an authenticated user or session
 */
export const AUTH_STATUS = {
  /** User is active and authenticated */
  ACTIVE: 'active',
  /** User is inactive but account exists */
  INACTIVE: 'inactive',
  /** User account is blocked by admin */
  BLOCKED: 'blocked',
  /** User account is permanently deleted */
  DELETED: 'deleted',
  /** User account is pending verification */
  PENDING: 'pending',
  /** User account is temporarily suspended */
  SUSPENDED: 'suspended',
  /** User is locked due to multiple failed attempts */
  LOCKED: 'locked',
  /** User account is expired */
  EXPIRED: 'expired',
  /** User is authenticated but requires MFA */
  MFA_REQUIRED: 'mfa_required',
  /** Session is active */
  SESSION_ACTIVE: 'session_active',
  /** Session is expired */
  SESSION_EXPIRED: 'session_expired',
  /** Session is invalid */
  SESSION_INVALID: 'session_invalid',
  /** Session is terminated */
  SESSION_TERMINATED: 'session_terminated',
} as const;

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

/**
 * HTTP Status Code Mapping for Auth Status
 * Maps authentication status to HTTP status codes
 */
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

/**
 * Authentication Status Messages
 * Human-readable messages for each status
 */
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

/**
 * Authenticated Statuses
 * Statuses that indicate a user is authenticated
 */
export const AUTHENTICATED_STATUSES: AuthStatus[] = [
  AUTH_STATUS.ACTIVE,
  AUTH_STATUS.MFA_REQUIRED,
  AUTH_STATUS.SESSION_ACTIVE,
] as const;

/**
 * Unauthenticated Statuses
 * Statuses that indicate a user is not authenticated
 */
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

/**
 * Pending Statuses
 * Statuses that indicate pending action
 */
export const PENDING_STATUSES: AuthStatus[] = [
  AUTH_STATUS.PENDING,
  AUTH_STATUS.MFA_REQUIRED,
] as const;

/**
 * Blocked Statuses
 * Statuses that indicate account is blocked or restricted
 */
export const BLOCKED_STATUSES: AuthStatus[] = [
  AUTH_STATUS.BLOCKED,
  AUTH_STATUS.LOCKED,
  AUTH_STATUS.SUSPENDED,
] as const;

/**
 * Session Statuses
 * Statuses related to session state
 */
export const SESSION_STATUSES: AuthStatus[] = [
  AUTH_STATUS.SESSION_ACTIVE,
  AUTH_STATUS.SESSION_EXPIRED,
  AUTH_STATUS.SESSION_INVALID,
  AUTH_STATUS.SESSION_TERMINATED,
] as const;

/**
 * Helper function to check if status is authenticated
 */
export function isAuthenticatedStatus(status: AuthStatus): boolean {
  return AUTHENTICATED_STATUSES.includes(status);
}

/**
 * Helper function to check if status is unauthenticated
 */
export function isUnauthenticatedStatus(status: AuthStatus): boolean {
  return UNAUTHENTICATED_STATUSES.includes(status);
}

/**
 * Helper function to check if status is pending
 */
export function isPendingStatus(status: AuthStatus): boolean {
  return PENDING_STATUSES.includes(status);
}

/**
 * Helper function to check if status is blocked
 */
export function isBlockedStatus(status: AuthStatus): boolean {
  return BLOCKED_STATUSES.includes(status);
}

/**
 * Helper function to check if status is session related
 */
export function isSessionStatus(status: AuthStatus): boolean {
  return SESSION_STATUSES.includes(status);
}

/**
 * Helper function to get HTTP status code for auth status
 */
export function getHttpStatusFromAuthStatus(status: AuthStatus): number {
  return AUTH_STATUS_HTTP_MAP[status] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

/**
 * Helper function to get status message
 */
export function getAuthStatusMessage(status: AuthStatus): string {
  return AUTH_STATUS_MESSAGES[status] || 'Unknown status';
}

/**
 * Helper function to check if auth status is valid
 */
export function isValidAuthStatus(status: string): status is AuthStatus {
  return Object.values(AUTH_STATUS).includes(status as AuthStatus);
}
