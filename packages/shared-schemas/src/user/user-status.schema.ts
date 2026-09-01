/**
 * User Status Schema
 * Zod schemas for user status management
 */

import { z } from 'zod';
import {
  USER_STATUS,
  USER_ACCOUNT_STATUS,
  USER_SESSION_STATUS,
  USER_NOTIFICATION_STATUS,
  USER_RELATIONSHIP_STATUS,
  USER_SUBSCRIPTION_STATUS,
  USER_STATUS_LABELS,
  COMMON_USER_STATUS_TRANSITIONS,
  type UserStatusTransition as ConstantsUserStatusTransition,
} from '@vubon/shared-constants';

// ============================================================
// USER STATUS SCHEMAS
// ============================================================

/**
 * User status schema
 */
export const userStatusSchema = z.enum([
  USER_STATUS.ACTIVE,
  USER_STATUS.PENDING,
  USER_STATUS.INACTIVE,
  USER_STATUS.SUSPENDED,
  USER_STATUS.BLOCKED,
  USER_STATUS.DELETED,
  USER_STATUS.ARCHIVED,
  USER_STATUS.LOCKED,
]);

/**
 * User account status schema
 */
export const userAccountStatusSchema = z.enum([
  USER_ACCOUNT_STATUS.GOOD_STANDING,
  USER_ACCOUNT_STATUS.RESTRICTED,
  USER_ACCOUNT_STATUS.UNDER_REVIEW,
  USER_ACCOUNT_STATUS.FLAGGED,
]);

/**
 * User session status schema
 */
export const userSessionStatusSchema = z.enum([
  USER_SESSION_STATUS.ACTIVE,
  USER_SESSION_STATUS.EXPIRED,
  USER_SESSION_STATUS.TERMINATED,
  USER_SESSION_STATUS.IDLE,
  USER_SESSION_STATUS.ABOUT_TO_EXPIRE,
]);

/**
 * User notification status schema
 */
export const userNotificationStatusSchema = z.enum([
  USER_NOTIFICATION_STATUS.READ,
  USER_NOTIFICATION_STATUS.UNREAD,
  USER_NOTIFICATION_STATUS.DELIVERED,
  USER_NOTIFICATION_STATUS.SENT,
  USER_NOTIFICATION_STATUS.FAILED,
  USER_NOTIFICATION_STATUS.ARCHIVED,
]);

/**
 * User relationship status schema
 */
export const userRelationshipStatusSchema = z.enum([
  USER_RELATIONSHIP_STATUS.PENDING,
  USER_RELATIONSHIP_STATUS.ACCEPTED,
  USER_RELATIONSHIP_STATUS.DECLINED,
  USER_RELATIONSHIP_STATUS.BLOCKED,
  USER_RELATIONSHIP_STATUS.ACTIVE,
  USER_RELATIONSHIP_STATUS.INACTIVE,
]);

/**
 * User subscription status schema
 */
export const userSubscriptionStatusSchema = z.enum([
  USER_SUBSCRIPTION_STATUS.ACTIVE,
  USER_SUBSCRIPTION_STATUS.EXPIRED,
  USER_SUBSCRIPTION_STATUS.PENDING,
  USER_SUBSCRIPTION_STATUS.CANCELLED,
  USER_SUBSCRIPTION_STATUS.PAST_DUE,
  USER_SUBSCRIPTION_STATUS.PROCESSING,
]);

// ============================================================
// USER STATUS TRANSITION
// ============================================================

export type UserStatusTransition = ConstantsUserStatusTransition;

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserStatus = z.infer<typeof userStatusSchema>;
export type UserAccountStatus = z.infer<typeof userAccountStatusSchema>;
export type UserSessionStatus = z.infer<typeof userSessionStatusSchema>;
export type UserNotificationStatus = z.infer<typeof userNotificationStatusSchema>;
export type UserRelationshipStatus = z.infer<typeof userRelationshipStatusSchema>;
export type UserSubscriptionStatus = z.infer<typeof userSubscriptionStatusSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function isUserStatusActive(status: UserStatus): boolean {
  const activeStatuses: UserStatus[] = ['active'];
  return activeStatuses.includes(status);
}

export function isUserStatusInactive(status: UserStatus): boolean {
  const inactiveStatuses: UserStatus[] = [
    'inactive',
    'deleted',
    'archived',
    'blocked',
    'suspended',
    'locked',
  ];
  return inactiveStatuses.includes(status);
}

export function isUserStatusPending(status: UserStatus): boolean {
  return status === USER_STATUS.PENDING;
}

export function isUserStatusBlocked(status: UserStatus): boolean {
  return status === USER_STATUS.BLOCKED || status === USER_STATUS.SUSPENDED;
}

export function isUserStatusDeleted(status: UserStatus): boolean {
  return status === USER_STATUS.DELETED || status === USER_STATUS.ARCHIVED;
}

export function isUserStatusLocked(status: UserStatus): boolean {
  return status === USER_STATUS.LOCKED;
}

export function canUserLogin(status: UserStatus): boolean {
  const allowedStatuses: UserStatus[] = ['active', 'pending'];
  return allowedStatuses.includes(status);
}

export function getUserStatusDisplayName(status: UserStatus): string {
  return USER_STATUS_LABELS[status] || status;
}

export function getAllUserStatuses(): UserStatus[] {
  return Object.values(USER_STATUS);
}

export function getAllUserSessionStatuses(): UserSessionStatus[] {
  return Object.values(USER_SESSION_STATUS);
}

export function getAllUserNotificationStatuses(): UserNotificationStatus[] {
  return Object.values(USER_NOTIFICATION_STATUS);
}

export function getAllUserRelationshipStatuses(): UserRelationshipStatus[] {
  return Object.values(USER_RELATIONSHIP_STATUS);
}

export function getAllUserSubscriptionStatuses(): UserSubscriptionStatus[] {
  return Object.values(USER_SUBSCRIPTION_STATUS);
}

export function getAllowedNextUserStatuses(
  currentStatus: UserStatus,
  allowedTransitions: ConstantsUserStatusTransition[] = COMMON_USER_STATUS_TRANSITIONS
): UserStatus[] {
  return allowedTransitions
    .filter((t) => t.from === currentStatus && t.allowed)
    .map((t) => t.to as UserStatus);
}

export function canUserStatusTransitionTo(
  currentStatus: UserStatus,
  nextStatus: UserStatus,
  allowedTransitions: ConstantsUserStatusTransition[] = COMMON_USER_STATUS_TRANSITIONS
): boolean {
  return allowedTransitions.some(
    (t) => t.from === currentStatus && t.to === nextStatus && t.allowed
  );
}

export function validateUserStatusTransition(
  currentStatus: UserStatus,
  nextStatus: UserStatus,
  allowedTransitions: ConstantsUserStatusTransition[] = COMMON_USER_STATUS_TRANSITIONS
): { valid: boolean; message: string } {
  const isValid = canUserStatusTransitionTo(currentStatus, nextStatus, allowedTransitions);

  if (isValid) {
    return {
      valid: true,
      message: `Transition from ${currentStatus} to ${nextStatus} is allowed`,
    };
  }

  return {
    valid: false,
    message: `Transition from ${currentStatus} to ${nextStatus} is not allowed`,
  };
}

export function isUserRelationshipActive(status: UserRelationshipStatus): boolean {
  return status === USER_RELATIONSHIP_STATUS.ACTIVE;
}

export function isUserRelationshipBlocked(status: UserRelationshipStatus): boolean {
  return status === USER_RELATIONSHIP_STATUS.BLOCKED;
}

export function isUserSubscriptionActive(status: UserSubscriptionStatus): boolean {
  return status === USER_SUBSCRIPTION_STATUS.ACTIVE;
}

export function isUserSubscriptionInactive(status: UserSubscriptionStatus): boolean {
  const inactiveStatuses: UserSubscriptionStatus[] = [
    USER_SUBSCRIPTION_STATUS.EXPIRED,
    USER_SUBSCRIPTION_STATUS.CANCELLED,
    USER_SUBSCRIPTION_STATUS.PAST_DUE,
  ];
  return inactiveStatuses.includes(status);
}

export function isUserNotificationUnread(status: UserNotificationStatus): boolean {
  return status === USER_NOTIFICATION_STATUS.UNREAD;
}

export function isUserSessionActive(status: UserSessionStatus): boolean {
  return status === USER_SESSION_STATUS.ACTIVE;
}

export function isUserSessionInactive(status: UserSessionStatus): boolean {
  const inactiveStatuses: UserSessionStatus[] = [
    USER_SESSION_STATUS.EXPIRED,
    USER_SESSION_STATUS.TERMINATED,
    USER_SESSION_STATUS.IDLE,
  ];
  return inactiveStatuses.includes(status);
}
