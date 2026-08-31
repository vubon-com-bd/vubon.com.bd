/**
 * User Status Constants
 * All possible status values for a user in the system
 * Imports common status values where applicable
 */

import { STATUS, STATUS_CATEGORY } from '../common/status.constants';

/**
 * Core user status types
 * Defines the fundamental states a user account can be in
 * Reuses common status values where applicable
 */
export const USER_STATUS = {
  /** User is active and can access the system */
  ACTIVE: STATUS.ACTIVE,
  /** User account is pending activation */
  PENDING: STATUS.PENDING,
  /** User is inactive (not banned, just not active) */
  INACTIVE: STATUS.INACTIVE,
  /** User account has been suspended temporarily */
  SUSPENDED: STATUS.SUSPENDED,
  /** User account has been permanently blocked */
  BLOCKED: STATUS.BLOCKED,
  /** User account has been deleted (soft delete) */
  DELETED: STATUS.DELETED,
  /** User account is archived (no longer active) */
  ARCHIVED: STATUS.ARCHIVED,
  /** User account has been locked due to security concerns */
  LOCKED: STATUS.LOCKED,
} as const;

/**
 * User verification status types
 * Status of user identity verification
 */
export const USER_VERIFICATION_STATUS = {
  /** User is fully verified */
  VERIFIED: STATUS.VERIFIED,
  /** User verification is pending */
  UNVERIFIED: STATUS.UNVERIFIED,
  /** Verification is in progress */
  IN_PROGRESS: 'in_progress',
  /** Verification has failed */
  FAILED: STATUS.FAILED,
  /** Verification requires manual review */
  REQUIRES_REVIEW: 'requires_review',
} as const;

/**
 * User account status types
 * Account-level status that affects user operations
 */
export const USER_ACCOUNT_STATUS = {
  /** Account is in good standing */
  GOOD_STANDING: 'good_standing',
  /** Account has restrictions */
  RESTRICTED: 'restricted',
  /** Account is under review */
  UNDER_REVIEW: 'under_review',
  /** Account has been flagged */
  FLAGGED: 'flagged',
} as const;

/**
 * User KYC status types
 * Know Your Customer verification levels
 */
export const USER_KYC_STATUS = {
  /** No KYC submitted */
  NOT_SUBMITTED: 'not_submitted',
  /** KYC is pending review */
  PENDING: STATUS.PENDING,
  /** KYC is approved */
  APPROVED: STATUS.APPROVED,
  /** KYC is rejected */
  REJECTED: STATUS.REJECTED,
  /** KYC requires additional information */
  REQUIRES_INFO: 'requires_info',
  /** KYC is expired */
  EXPIRED: STATUS.EXPIRED,
} as const;

/**
 * User preference status types
 * Status of user preferences
 */
export const USER_PREFERENCE_STATUS = {
  /** Preferences are active */
  ACTIVE: STATUS.ACTIVE,
  /** Preferences are inactive */
  INACTIVE: STATUS.INACTIVE,
  /** Preferences are being updated */
  UPDATING: 'updating',
  /** Preferences have been reset to default */
  RESET: 'reset',
} as const;

/**
 * User contact status types
 * Status of user contact information
 */
export const USER_CONTACT_STATUS = {
  /** Contact is verified and active */
  ACTIVE: STATUS.ACTIVE,
  /** Contact is pending verification */
  PENDING: STATUS.PENDING,
  /** Contact has been verified */
  VERIFIED: STATUS.VERIFIED,
  /** Contact is inactive */
  INACTIVE: STATUS.INACTIVE,
  /** Contact has been removed */
  REMOVED: 'removed',
  /** Contact verification failed */
  VERIFICATION_FAILED: STATUS.FAILED,
} as const;

/**
 * User address status types
 * Status of user addresses
 */
export const USER_ADDRESS_STATUS = {
  /** Address is active and current */
  ACTIVE: STATUS.ACTIVE,
  /** Address is inactive */
  INACTIVE: STATUS.INACTIVE,
  /** Address is pending verification */
  PENDING: STATUS.PENDING,
  /** Address is verified */
  VERIFIED: STATUS.VERIFIED,
  /** Address has been removed */
  REMOVED: 'removed',
  /** Address is set as default */
  DEFAULT: 'default',
  /** Address is set as billing address */
  BILLING: 'billing',
  /** Address is set as shipping address */
  SHIPPING: 'shipping',
} as const;

/**
 * User session status types
 * Status of user sessions
 */
export const USER_SESSION_STATUS = {
  /** Session is active */
  ACTIVE: STATUS.ACTIVE,
  /** Session has expired */
  EXPIRED: STATUS.EXPIRED,
  /** Session has been terminated */
  TERMINATED: 'terminated',
  /** Session is idle */
  IDLE: 'idle',
  /** Session is about to expire */
  ABOUT_TO_EXPIRE: 'about_to_expire',
} as const;

/**
 * User activity status types
 * Status of user activities
 */
export const USER_ACTIVITY_STATUS = {
  /** Activity is completed */
  COMPLETED: STATUS.COMPLETED,
  /** Activity is in progress */
  IN_PROGRESS: 'in_progress',
  /** Activity is pending */
  PENDING: STATUS.PENDING,
  /** Activity has failed */
  FAILED: STATUS.FAILED,
  /** Activity has been cancelled */
  CANCELLED: STATUS.CANCELLED,
  /** Activity is being processed */
  PROCESSING: STATUS.PROCESSING,
} as const;

/**
 * User notification status types
 * Status of user notifications
 */
export const USER_NOTIFICATION_STATUS = {
  /** Notification has been read */
  READ: 'read',
  /** Notification is unread */
  UNREAD: 'unread',
  /** Notification has been delivered */
  DELIVERED: 'delivered',
  /** Notification has been sent */
  SENT: 'sent',
  /** Notification delivery failed */
  FAILED: STATUS.FAILED,
  /** Notification has been archived */
  ARCHIVED: STATUS.ARCHIVED,
} as const;

/**
 * User relationship status types
 * Status of relationships between users
 */
export const USER_RELATIONSHIP_STATUS = {
  /** Relationship is pending approval */
  PENDING: STATUS.PENDING,
  /** Relationship is accepted */
  ACCEPTED: 'accepted',
  /** Relationship is declined */
  DECLINED: 'declined',
  /** Relationship has been blocked */
  BLOCKED: STATUS.BLOCKED,
  /** Relationship is active */
  ACTIVE: STATUS.ACTIVE,
  /** Relationship is inactive */
  INACTIVE: STATUS.INACTIVE,
} as const;

/**
 * User subscription status types
 * Status of user subscriptions
 */
export const USER_SUBSCRIPTION_STATUS = {
  /** Subscription is active */
  ACTIVE: STATUS.ACTIVE,
  /** Subscription has expired */
  EXPIRED: STATUS.EXPIRED,
  /** Subscription is pending */
  PENDING: STATUS.PENDING,
  /** Subscription has been cancelled */
  CANCELLED: STATUS.CANCELLED,
  /** Subscription is past due */
  PAST_DUE: 'past_due',
  /** Subscription is being processed */
  PROCESSING: STATUS.PROCESSING,
} as const;

/**
 * User account type labels
 * Human-readable labels for UI
 */
export const USER_STATUS_LABELS: Record<string, string> = {
  [USER_STATUS.ACTIVE]: 'Active',
  [USER_STATUS.PENDING]: 'Pending',
  [USER_STATUS.INACTIVE]: 'Inactive',
  [USER_STATUS.SUSPENDED]: 'Suspended',
  [USER_STATUS.BLOCKED]: 'Blocked',
  [USER_STATUS.DELETED]: 'Deleted',
  [USER_STATUS.ARCHIVED]: 'Archived',
  [USER_STATUS.LOCKED]: 'Locked',
};

/**
 * User verification status labels
 */
export const USER_VERIFICATION_STATUS_LABELS: Record<string, string> = {
  [USER_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [USER_VERIFICATION_STATUS.UNVERIFIED]: 'Unverified',
  [USER_VERIFICATION_STATUS.IN_PROGRESS]: 'In Progress',
  [USER_VERIFICATION_STATUS.FAILED]: 'Verification Failed',
  [USER_VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Requires Review',
};

/**
 * User KYC status labels
 */
export const USER_KYC_STATUS_LABELS: Record<string, string> = {
  [USER_KYC_STATUS.NOT_SUBMITTED]: 'Not Submitted',
  [USER_KYC_STATUS.PENDING]: 'KYC Pending',
  [USER_KYC_STATUS.APPROVED]: 'KYC Approved',
  [USER_KYC_STATUS.REJECTED]: 'KYC Rejected',
  [USER_KYC_STATUS.REQUIRES_INFO]: 'Requires Additional Info',
  [USER_KYC_STATUS.EXPIRED]: 'KYC Expired',
};

/**
 * User preference status labels
 */
export const USER_PREFERENCE_STATUS_LABELS: Record<string, string> = {
  [USER_PREFERENCE_STATUS.ACTIVE]: 'Active',
  [USER_PREFERENCE_STATUS.INACTIVE]: 'Inactive',
  [USER_PREFERENCE_STATUS.UPDATING]: 'Updating',
  [USER_PREFERENCE_STATUS.RESET]: 'Reset to Default',
};

/**
 * User address status labels
 */
export const USER_ADDRESS_STATUS_LABELS: Record<string, string> = {
  [USER_ADDRESS_STATUS.ACTIVE]: 'Active',
  [USER_ADDRESS_STATUS.INACTIVE]: 'Inactive',
  [USER_ADDRESS_STATUS.PENDING]: 'Pending',
  [USER_ADDRESS_STATUS.VERIFIED]: 'Verified',
  [USER_ADDRESS_STATUS.REMOVED]: 'Removed',
  [USER_ADDRESS_STATUS.DEFAULT]: 'Default Address',
  [USER_ADDRESS_STATUS.BILLING]: 'Billing Address',
  [USER_ADDRESS_STATUS.SHIPPING]: 'Shipping Address',
};

/**
 * User contact status labels
 */
export const USER_CONTACT_STATUS_LABELS: Record<string, string> = {
  [USER_CONTACT_STATUS.ACTIVE]: 'Active',
  [USER_CONTACT_STATUS.PENDING]: 'Pending Verification',
  [USER_CONTACT_STATUS.VERIFIED]: 'Verified',
  [USER_CONTACT_STATUS.INACTIVE]: 'Inactive',
  [USER_CONTACT_STATUS.REMOVED]: 'Removed',
  [USER_CONTACT_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
};

/**
 * Check if user status is active
 */
export function isUserStatusActive(status: string): boolean {
  const activeStatuses: string[] = [
    USER_STATUS.ACTIVE,
    USER_VERIFICATION_STATUS.VERIFIED,
    USER_ACCOUNT_STATUS.GOOD_STANDING,
  ];
  return activeStatuses.includes(status);
}

/**
 * Check if user status is inactive
 */
export function isUserStatusInactive(status: string): boolean {
  const inactiveStatuses: string[] = [
    USER_STATUS.INACTIVE,
    USER_STATUS.DELETED,
    USER_STATUS.ARCHIVED,
    USER_STATUS.BLOCKED,
    USER_STATUS.SUSPENDED,
    USER_STATUS.LOCKED,
  ];
  return inactiveStatuses.includes(status);
}

/**
 * Check if user status is pending
 */
export function isUserStatusPending(status: string): boolean {
  const pendingStatuses: string[] = [
    USER_STATUS.PENDING,
    USER_VERIFICATION_STATUS.IN_PROGRESS,
    USER_VERIFICATION_STATUS.UNVERIFIED,
    USER_VERIFICATION_STATUS.REQUIRES_REVIEW,
    USER_KYC_STATUS.PENDING,
    USER_KYC_STATUS.REQUIRES_INFO,
  ];
  return pendingStatuses.includes(status);
}

/**
 * Check if user status is verified
 */
export function isUserStatusVerified(status: string): boolean {
  const verifiedStatuses: string[] = [
    USER_VERIFICATION_STATUS.VERIFIED,
    USER_KYC_STATUS.APPROVED,
    USER_CONTACT_STATUS.VERIFIED,
    USER_ADDRESS_STATUS.VERIFIED,
  ];
  return verifiedStatuses.includes(status);
}

/**
 * Get user status label
 */
export function getUserStatusLabel(status: string): string {
  return USER_STATUS_LABELS[status] || status;
}

/**
 * Get user verification status label
 */
export function getUserVerificationStatusLabel(status: string): string {
  return USER_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user KYC status label
 */
export function getUserKycStatusLabel(status: string): string {
  return USER_KYC_STATUS_LABELS[status] || status;
}

/**
 * Get user preference status label
 */
export function getUserPreferenceStatusLabel(status: string): string {
  return USER_PREFERENCE_STATUS_LABELS[status] || status;
}

/**
 * Get user address status label
 */
export function getUserAddressStatusLabel(status: string): string {
  return USER_ADDRESS_STATUS_LABELS[status] || status;
}

/**
 * Get user contact status label
 */
export function getUserContactStatusLabel(status: string): string {
  return USER_CONTACT_STATUS_LABELS[status] || status;
}

/**
 * Check if user status is blocked
 */
export function isUserStatusBlocked(status: string): boolean {
  return status === USER_STATUS.BLOCKED || status === USER_STATUS.SUSPENDED;
}

/**
 * Check if user status is deleted
 */
export function isUserStatusDeleted(status: string): boolean {
  return status === USER_STATUS.DELETED || status === USER_STATUS.ARCHIVED;
}

/**
 * Check if user status is locked
 */
export function isUserStatusLocked(status: string): boolean {
  return status === USER_STATUS.LOCKED;
}

/**
 * Check if user can login based on status
 */
export function canUserLogin(status: string): boolean {
  const allowedStatuses: string[] = [
    USER_STATUS.ACTIVE,
    USER_STATUS.PENDING,
    USER_VERIFICATION_STATUS.VERIFIED,
  ];
  return allowedStatuses.includes(status);
}

/**
 * Check if user needs verification
 */
export function userNeedsVerification(status: string): boolean {
  const needsVerificationStatuses: string[] = [
    USER_VERIFICATION_STATUS.UNVERIFIED,
    USER_VERIFICATION_STATUS.FAILED,
    USER_VERIFICATION_STATUS.REQUIRES_REVIEW,
  ];
  return needsVerificationStatuses.includes(status);
}

/**
 * Check if user KYC is approved
 */
export function isUserKycApproved(status: string): boolean {
  return status === USER_KYC_STATUS.APPROVED;
}

/**
 * Check if user KYC is pending
 */
export function isUserKycPending(status: string): boolean {
  return status === USER_KYC_STATUS.PENDING || status === USER_KYC_STATUS.REQUIRES_INFO;
}

/**
 * Check if user KYC is rejected
 */
export function isUserKycRejected(status: string): boolean {
  return status === USER_KYC_STATUS.REJECTED || status === USER_KYC_STATUS.EXPIRED;
}

/**
 * Check if user relationship is active
 */
export function isUserRelationshipActive(status: string): boolean {
  return status === USER_RELATIONSHIP_STATUS.ACTIVE;
}

/**
 * Check if user relationship is blocked
 */
export function isUserRelationshipBlocked(status: string): boolean {
  return status === USER_RELATIONSHIP_STATUS.BLOCKED;
}

/**
 * Check if user subscription is active
 */
export function isUserSubscriptionActive(status: string): boolean {
  return status === USER_SUBSCRIPTION_STATUS.ACTIVE;
}

/**
 * Check if user subscription is expired or cancelled
 */
export function isUserSubscriptionInactive(status: string): boolean {
  const inactiveStatuses: string[] = [
    USER_SUBSCRIPTION_STATUS.EXPIRED,
    USER_SUBSCRIPTION_STATUS.CANCELLED,
    USER_SUBSCRIPTION_STATUS.PAST_DUE,
  ];
  return inactiveStatuses.includes(status);
}

/**
 * Check if user notification is unread
 */
export function isUserNotificationUnread(status: string): boolean {
  return status === USER_NOTIFICATION_STATUS.UNREAD;
}

/**
 * Check if user session is active
 */
export function isUserSessionActive(status: string): boolean {
  return status === USER_SESSION_STATUS.ACTIVE;
}

/**
 * Check if user session is expired or terminated
 */
export function isUserSessionInactive(status: string): boolean {
  const inactiveStatuses: string[] = [
    USER_SESSION_STATUS.EXPIRED,
    USER_SESSION_STATUS.TERMINATED,
    USER_SESSION_STATUS.IDLE,
  ];
  return inactiveStatuses.includes(status);
}

/**
 * Check if user address is verified
 */
export function isUserAddressVerified(status: string): boolean {
  return status === USER_ADDRESS_STATUS.VERIFIED;
}

/**
 * Check if user address is default
 */
export function isUserAddressDefault(status: string): boolean {
  return status === USER_ADDRESS_STATUS.DEFAULT;
}

/**
 * Check if user contact is active
 */
export function isUserContactActive(status: string): boolean {
  return status === USER_CONTACT_STATUS.ACTIVE;
}

/**
 * Check if user contact is verified
 */
export function isUserContactVerified(status: string): boolean {
  return status === USER_CONTACT_STATUS.VERIFIED;
}

/**
 * Get user status category
 */
export function getUserStatusCategory(status: string): string {
  if (isUserStatusActive(status)) {
    return STATUS_CATEGORY.ACTIVE;
  }
  if (isUserStatusInactive(status)) {
    return STATUS_CATEGORY.INACTIVE;
  }
  if (isUserStatusPending(status)) {
    return STATUS_CATEGORY.TRANSITIONAL;
  }
  return STATUS_CATEGORY.INACTIVE;
}

/**
 * Get all user statuses
 */
export function getAllUserStatuses(): string[] {
  return Object.values(USER_STATUS);
}

/**
 * Get all user verification statuses
 */
export function getAllUserVerificationStatuses(): string[] {
  return Object.values(USER_VERIFICATION_STATUS);
}

/**
 * Get all user KYC statuses
 */
export function getAllUserKycStatuses(): string[] {
  return Object.values(USER_KYC_STATUS);
}

/**
 * Get all user address statuses
 */
export function getAllUserAddressStatuses(): string[] {
  return Object.values(USER_ADDRESS_STATUS);
}

/**
 * Get all user contact statuses
 */
export function getAllUserContactStatuses(): string[] {
  return Object.values(USER_CONTACT_STATUS);
}

/**
 * Get all user session statuses
 */
export function getAllUserSessionStatuses(): string[] {
  return Object.values(USER_SESSION_STATUS);
}

/**
 * Get all user activity statuses
 */
export function getAllUserActivityStatuses(): string[] {
  return Object.values(USER_ACTIVITY_STATUS);
}

/**
 * Get all user notification statuses
 */
export function getAllUserNotificationStatuses(): string[] {
  return Object.values(USER_NOTIFICATION_STATUS);
}

/**
 * Get all user relationship statuses
 */
export function getAllUserRelationshipStatuses(): string[] {
  return Object.values(USER_RELATIONSHIP_STATUS);
}

/**
 * Get all user subscription statuses
 */
export function getAllUserSubscriptionStatuses(): string[] {
  return Object.values(USER_SUBSCRIPTION_STATUS);
}

/**
 * User status transition types
 */
export interface UserStatusTransition {
  from: string;
  to: string;
  allowed: boolean;
}

/**
 * Common user status transitions
 */
export const COMMON_USER_STATUS_TRANSITIONS: UserStatusTransition[] = [
  { from: USER_STATUS.PENDING, to: USER_STATUS.ACTIVE, allowed: true },
  { from: USER_STATUS.PENDING, to: USER_STATUS.INACTIVE, allowed: true },
  { from: USER_STATUS.PENDING, to: USER_STATUS.ARCHIVED, allowed: true },

  { from: USER_STATUS.ACTIVE, to: USER_STATUS.INACTIVE, allowed: true },
  { from: USER_STATUS.ACTIVE, to: USER_STATUS.SUSPENDED, allowed: true },
  { from: USER_STATUS.ACTIVE, to: USER_STATUS.BLOCKED, allowed: true },
  { from: USER_STATUS.ACTIVE, to: USER_STATUS.LOCKED, allowed: true },

  { from: USER_STATUS.INACTIVE, to: USER_STATUS.ACTIVE, allowed: true },
  { from: USER_STATUS.INACTIVE, to: USER_STATUS.ARCHIVED, allowed: true },

  { from: USER_STATUS.SUSPENDED, to: USER_STATUS.ACTIVE, allowed: true },
  { from: USER_STATUS.SUSPENDED, to: USER_STATUS.BLOCKED, allowed: true },
  { from: USER_STATUS.SUSPENDED, to: USER_STATUS.DELETED, allowed: true },

  { from: USER_STATUS.BLOCKED, to: USER_STATUS.ACTIVE, allowed: true },
  { from: USER_STATUS.BLOCKED, to: USER_STATUS.DELETED, allowed: true },

  { from: USER_STATUS.LOCKED, to: USER_STATUS.ACTIVE, allowed: true },
  { from: USER_STATUS.LOCKED, to: USER_STATUS.BLOCKED, allowed: true },

  { from: USER_STATUS.DELETED, to: USER_STATUS.ARCHIVED, allowed: true },

  // Verification transitions
  {
    from: USER_VERIFICATION_STATUS.UNVERIFIED,
    to: USER_VERIFICATION_STATUS.IN_PROGRESS,
    allowed: true,
  },
  {
    from: USER_VERIFICATION_STATUS.IN_PROGRESS,
    to: USER_VERIFICATION_STATUS.VERIFIED,
    allowed: true,
  },
  {
    from: USER_VERIFICATION_STATUS.IN_PROGRESS,
    to: USER_VERIFICATION_STATUS.FAILED,
    allowed: true,
  },
  {
    from: USER_VERIFICATION_STATUS.FAILED,
    to: USER_VERIFICATION_STATUS.IN_PROGRESS,
    allowed: true,
  },
  {
    from: USER_VERIFICATION_STATUS.REQUIRES_REVIEW,
    to: USER_VERIFICATION_STATUS.VERIFIED,
    allowed: true,
  },
  {
    from: USER_VERIFICATION_STATUS.REQUIRES_REVIEW,
    to: USER_VERIFICATION_STATUS.FAILED,
    allowed: true,
  },

  // KYC transitions
  { from: USER_KYC_STATUS.NOT_SUBMITTED, to: USER_KYC_STATUS.PENDING, allowed: true },
  { from: USER_KYC_STATUS.PENDING, to: USER_KYC_STATUS.APPROVED, allowed: true },
  { from: USER_KYC_STATUS.PENDING, to: USER_KYC_STATUS.REJECTED, allowed: true },
  { from: USER_KYC_STATUS.PENDING, to: USER_KYC_STATUS.REQUIRES_INFO, allowed: true },
  { from: USER_KYC_STATUS.REQUIRES_INFO, to: USER_KYC_STATUS.PENDING, allowed: true },
  { from: USER_KYC_STATUS.APPROVED, to: USER_KYC_STATUS.EXPIRED, allowed: true },
  { from: USER_KYC_STATUS.REJECTED, to: USER_KYC_STATUS.PENDING, allowed: true },

  // Contact transitions
  {
    from: USER_CONTACT_STATUS.PENDING,
    to: USER_CONTACT_STATUS.VERIFIED,
    allowed: true,
  },
  {
    from: USER_CONTACT_STATUS.PENDING,
    to: USER_CONTACT_STATUS.VERIFICATION_FAILED,
    allowed: true,
  },
  {
    from: USER_CONTACT_STATUS.ACTIVE,
    to: USER_CONTACT_STATUS.INACTIVE,
    allowed: true,
  },
  {
    from: USER_CONTACT_STATUS.VERIFICATION_FAILED,
    to: USER_CONTACT_STATUS.PENDING,
    allowed: true,
  },

  // Address transitions
  { from: USER_ADDRESS_STATUS.PENDING, to: USER_ADDRESS_STATUS.VERIFIED, allowed: true },
  { from: USER_ADDRESS_STATUS.PENDING, to: USER_ADDRESS_STATUS.REMOVED, allowed: true },
  { from: USER_ADDRESS_STATUS.ACTIVE, to: USER_ADDRESS_STATUS.INACTIVE, allowed: true },
  { from: USER_ADDRESS_STATUS.ACTIVE, to: USER_ADDRESS_STATUS.DEFAULT, allowed: true },
  { from: USER_ADDRESS_STATUS.VERIFIED, to: USER_ADDRESS_STATUS.ACTIVE, allowed: true },

  // Session transitions
  { from: USER_SESSION_STATUS.ACTIVE, to: USER_SESSION_STATUS.EXPIRED, allowed: true },
  { from: USER_SESSION_STATUS.ACTIVE, to: USER_SESSION_STATUS.TERMINATED, allowed: true },
  { from: USER_SESSION_STATUS.ACTIVE, to: USER_SESSION_STATUS.IDLE, allowed: true },
  { from: USER_SESSION_STATUS.IDLE, to: USER_SESSION_STATUS.ACTIVE, allowed: true },
  { from: USER_SESSION_STATUS.IDLE, to: USER_SESSION_STATUS.EXPIRED, allowed: true },
  { from: USER_SESSION_STATUS.ABOUT_TO_EXPIRE, to: USER_SESSION_STATUS.ACTIVE, allowed: true },
  { from: USER_SESSION_STATUS.ABOUT_TO_EXPIRE, to: USER_SESSION_STATUS.EXPIRED, allowed: true },

  // Activity transitions
  { from: USER_ACTIVITY_STATUS.PENDING, to: USER_ACTIVITY_STATUS.IN_PROGRESS, allowed: true },
  { from: USER_ACTIVITY_STATUS.IN_PROGRESS, to: USER_ACTIVITY_STATUS.COMPLETED, allowed: true },
  { from: USER_ACTIVITY_STATUS.IN_PROGRESS, to: USER_ACTIVITY_STATUS.FAILED, allowed: true },
  { from: USER_ACTIVITY_STATUS.IN_PROGRESS, to: USER_ACTIVITY_STATUS.CANCELLED, allowed: true },
  { from: USER_ACTIVITY_STATUS.PENDING, to: USER_ACTIVITY_STATUS.CANCELLED, allowed: true },

  // Notification transitions
  { from: USER_NOTIFICATION_STATUS.SENT, to: USER_NOTIFICATION_STATUS.DELIVERED, allowed: true },
  { from: USER_NOTIFICATION_STATUS.SENT, to: USER_NOTIFICATION_STATUS.FAILED, allowed: true },
  { from: USER_NOTIFICATION_STATUS.DELIVERED, to: USER_NOTIFICATION_STATUS.READ, allowed: true },
  { from: USER_NOTIFICATION_STATUS.DELIVERED, to: USER_NOTIFICATION_STATUS.UNREAD, allowed: true },
  { from: USER_NOTIFICATION_STATUS.READ, to: USER_NOTIFICATION_STATUS.ARCHIVED, allowed: true },

  // Relationship transitions
  { from: USER_RELATIONSHIP_STATUS.PENDING, to: USER_RELATIONSHIP_STATUS.ACCEPTED, allowed: true },
  { from: USER_RELATIONSHIP_STATUS.PENDING, to: USER_RELATIONSHIP_STATUS.DECLINED, allowed: true },
  { from: USER_RELATIONSHIP_STATUS.ACTIVE, to: USER_RELATIONSHIP_STATUS.INACTIVE, allowed: true },
  { from: USER_RELATIONSHIP_STATUS.ACTIVE, to: USER_RELATIONSHIP_STATUS.BLOCKED, allowed: true },

  // Subscription transitions
  { from: USER_SUBSCRIPTION_STATUS.PENDING, to: USER_SUBSCRIPTION_STATUS.ACTIVE, allowed: true },
  { from: USER_SUBSCRIPTION_STATUS.ACTIVE, to: USER_SUBSCRIPTION_STATUS.EXPIRED, allowed: true },
  { from: USER_SUBSCRIPTION_STATUS.ACTIVE, to: USER_SUBSCRIPTION_STATUS.CANCELLED, allowed: true },
  { from: USER_SUBSCRIPTION_STATUS.ACTIVE, to: USER_SUBSCRIPTION_STATUS.PAST_DUE, allowed: true },
  { from: USER_SUBSCRIPTION_STATUS.PAST_DUE, to: USER_SUBSCRIPTION_STATUS.ACTIVE, allowed: true },
  { from: USER_SUBSCRIPTION_STATUS.PAST_DUE, to: USER_SUBSCRIPTION_STATUS.EXPIRED, allowed: true },
];

/**
 * Get allowed next user statuses
 */
export function getAllowedNextUserStatuses(
  currentStatus: string,
  allowedTransitions: UserStatusTransition[] = COMMON_USER_STATUS_TRANSITIONS
): string[] {
  return allowedTransitions.filter((t) => t.from === currentStatus && t.allowed).map((t) => t.to);
}

/**
 * Check if user status transition is allowed
 */
export function canUserStatusTransitionTo(
  currentStatus: string,
  nextStatus: string,
  allowedTransitions: UserStatusTransition[] = COMMON_USER_STATUS_TRANSITIONS
): boolean {
  return allowedTransitions.some(
    (t) => t.from === currentStatus && t.to === nextStatus && t.allowed
  );
}

/**
 * Validate user status transition
 */
export function validateUserStatusTransition(
  currentStatus: string,
  nextStatus: string,
  allowedTransitions: UserStatusTransition[] = COMMON_USER_STATUS_TRANSITIONS
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
