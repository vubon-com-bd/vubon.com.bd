/**
 * Authentication Status Schema
 * Zod schemas for authentication status values
 */

import { z } from 'zod';
import {
  AUTH_STATUS,
  AUTH_STATUS_MESSAGES,
  AUTHENTICATED_STATUSES,
  UNAUTHENTICATED_STATUSES,
  PENDING_STATUSES,
  BLOCKED_STATUSES,
  SESSION_STATUSES,
  type AuthStatus,
} from '@vubon/shared-constants';

// ============================================================
// AUTH STATUS SCHEMAS
// ============================================================

/**
 * Auth status schema
 * All supported authentication statuses
 */
export const authStatusSchema = z.enum([
  AUTH_STATUS.ACTIVE,
  AUTH_STATUS.INACTIVE,
  AUTH_STATUS.BLOCKED,
  AUTH_STATUS.DELETED,
  AUTH_STATUS.PENDING,
  AUTH_STATUS.SUSPENDED,
  AUTH_STATUS.LOCKED,
  AUTH_STATUS.EXPIRED,
  AUTH_STATUS.MFA_REQUIRED,
  AUTH_STATUS.SESSION_ACTIVE,
  AUTH_STATUS.SESSION_EXPIRED,
  AUTH_STATUS.SESSION_INVALID,
  AUTH_STATUS.SESSION_TERMINATED,
]);

// ============================================================
// AUTH STATUS INFO SCHEMA
// ============================================================

/**
 * Auth status info schema
 */
export const authStatusInfoSchema = z.object({
  name: authStatusSchema,
  message: z.string(),
  isAuthenticated: z.boolean(),
  isUnauthenticated: z.boolean(),
  isPending: z.boolean(),
  isBlocked: z.boolean(),
  isSessionStatus: z.boolean(),
});

// ============================================================
// AUTH STATUS FILTER SCHEMA
// ============================================================

/**
 * Auth status filter schema
 */
export const authStatusFilterSchema = z.object({
  authenticatedOnly: z.boolean().optional(),
  unauthenticatedOnly: z.boolean().optional(),
  pendingOnly: z.boolean().optional(),
  blockedOnly: z.boolean().optional(),
  sessionOnly: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthStatusInfo = z.infer<typeof authStatusInfoSchema>;
export type AuthStatusFilter = z.infer<typeof authStatusFilterSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if authentication status is valid
 */
export function isValidAuthStatus(status: string): status is AuthStatus {
  return Object.values(AUTH_STATUS).includes(status as AuthStatus);
}

/**
 * Check if status is authenticated
 */
export function isAuthStatusAuthenticated(status: AuthStatus): boolean {
  return AUTHENTICATED_STATUSES.includes(status);
}

/**
 * Check if status is unauthenticated
 */
export function isAuthStatusUnauthenticated(status: AuthStatus): boolean {
  return UNAUTHENTICATED_STATUSES.includes(status);
}

/**
 * Check if status is pending
 */
export function isAuthStatusPending(status: AuthStatus): boolean {
  return PENDING_STATUSES.includes(status);
}

/**
 * Check if status is blocked
 */
export function isAuthStatusBlocked(status: AuthStatus): boolean {
  return BLOCKED_STATUSES.includes(status);
}

/**
 * Check if status is session status
 */
export function isAuthStatusSession(status: AuthStatus): boolean {
  return SESSION_STATUSES.includes(status);
}

/**
 * Get status message
 */
export function getAuthStatusMessage(status: AuthStatus): string {
  return AUTH_STATUS_MESSAGES[status] || 'Unknown status';
}

/**
 * Get all authentication statuses
 */
export function getAllAuthStatuses(): AuthStatus[] {
  return Object.values(AUTH_STATUS);
}

/**
 * Get authenticated statuses
 */
export function getAuthAuthenticatedStatuses(): AuthStatus[] {
  return [...AUTHENTICATED_STATUSES];
}

/**
 * Get unauthenticated statuses
 */
export function getAuthUnauthenticatedStatuses(): AuthStatus[] {
  return [...UNAUTHENTICATED_STATUSES];
}

/**
 * Get pending statuses
 */
export function getAuthPendingStatuses(): AuthStatus[] {
  return [...PENDING_STATUSES];
}

/**
 * Get blocked statuses
 */
export function getAuthBlockedStatuses(): AuthStatus[] {
  return [...BLOCKED_STATUSES];
}

/**
 * Get session statuses
 */
export function getAuthSessionStatuses(): AuthStatus[] {
  return [...SESSION_STATUSES];
}

/**
 * Get status info
 */
export function getAuthStatusInfo(status: AuthStatus): AuthStatusInfo {
  return {
    name: status,
    message: getAuthStatusMessage(status),
    isAuthenticated: isAuthStatusAuthenticated(status),
    isUnauthenticated: isAuthStatusUnauthenticated(status),
    isPending: isAuthStatusPending(status),
    isBlocked: isAuthStatusBlocked(status),
    isSessionStatus: isAuthStatusSession(status),
  };
}

/**
 * Get all statuses info
 */
export function getAllAuthStatusesInfo(): AuthStatusInfo[] {
  return getAllAuthStatuses().map((status) => getAuthStatusInfo(status));
}

/**
 * Get statuses by filter
 */
export function getAuthStatusesByFilter(filter: AuthStatusFilter): AuthStatus[] {
  let statuses = getAllAuthStatuses();

  if (filter.authenticatedOnly) {
    statuses = statuses.filter((status) => isAuthStatusAuthenticated(status));
  }

  if (filter.unauthenticatedOnly) {
    statuses = statuses.filter((status) => isAuthStatusUnauthenticated(status));
  }

  if (filter.pendingOnly) {
    statuses = statuses.filter((status) => isAuthStatusPending(status));
  }

  if (filter.blockedOnly) {
    statuses = statuses.filter((status) => isAuthStatusBlocked(status));
  }

  if (filter.sessionOnly) {
    statuses = statuses.filter((status) => isAuthStatusSession(status));
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    statuses = statuses.filter(
      (status) =>
        status.toLowerCase().includes(searchLower) ||
        getAuthStatusMessage(status).toLowerCase().includes(searchLower)
    );
  }

  return statuses;
}
