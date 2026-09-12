/**
 * User Status Constants
 * @module shared-constants/user/user-status
 *
 * Note: Deliberately does NOT spread COMMON_STATUS — COMMON_STATUS contains
 * nested objects (ORDER, PAYMENT, SHIPMENT, ...) which would leak into
 * Object.values() and break the enum.
 */

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  PENDING_VERIFICATION: 'pending_verification',
  PENDING_APPROVAL: 'pending_approval',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
} as const;

export type UserStatusValue = (typeof USER_STATUS)[keyof typeof USER_STATUS];
