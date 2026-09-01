/**
 * Admin Status Constants
 * Admin-specific status definitions and helpers
 */

import {
  STATUS,
  isActiveStatus,
  isInactiveStatus,
  isTerminalStatus,
  isTransitionalStatus,
  getStatusColor,
  getStatusLabel,
  getStatusPriority,
} from '../common/status.constants';

/**
 * Admin status - extends common STATUS with admin-specific statuses
 * Note: ADMIN_STATUS is NOT exported from here to avoid conflict with admin.constants
 */
const ADMIN_STATUS = {
  ...STATUS,
  /** Admin is in training mode */
  TRAINING: 'training',
  /** Admin is on probation period */
  PROBATION: 'probation',
  /** Admin has been terminated */
  TERMINATED: 'terminated',
  /** Admin has resigned */
  RESIGNED: 'resigned',
  /** Admin is on leave */
  ON_LEAVE: 'on_leave',
  /** Admin under investigation */
  INVESTIGATION: 'investigation',
  /** Admin is on suspension */
  SUSPENDED_ADMIN: 'suspended_admin',
  /** Admin is awaiting verification */
  AWAITING_VERIFICATION: 'awaiting_verification',
  /** Admin is awaiting approval */
  AWAITING_APPROVAL: 'awaiting_approval',
  /** Admin is pending activation */
  PENDING_ACTIVATION: 'pending_activation',
} as const;

export type AdminStatus = (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];

/**
 * Admin status categories
 */
export const ADMIN_STATUS_CATEGORY = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  TERMINAL: 'terminal',
  TRANSITIONAL: 'transitional',
  RESTRICTED: 'restricted',
} as const;

export type AdminStatusCategory =
  (typeof ADMIN_STATUS_CATEGORY)[keyof typeof ADMIN_STATUS_CATEGORY];

/**
 * Admin status colors - admin-specific only
 */
export const ADMIN_STATUS_COLOR: Partial<Record<AdminStatus, string>> = {
  [ADMIN_STATUS.TRAINING]: 'info',
  [ADMIN_STATUS.PROBATION]: 'warning',
  [ADMIN_STATUS.TERMINATED]: 'error',
  [ADMIN_STATUS.RESIGNED]: 'default',
  [ADMIN_STATUS.ON_LEAVE]: 'warning',
  [ADMIN_STATUS.INVESTIGATION]: 'error',
  [ADMIN_STATUS.SUSPENDED_ADMIN]: 'error',
  [ADMIN_STATUS.AWAITING_VERIFICATION]: 'info',
  [ADMIN_STATUS.AWAITING_APPROVAL]: 'warning',
  [ADMIN_STATUS.PENDING_ACTIVATION]: 'info',
};

/**
 * Admin status labels - admin-specific only
 */
export const ADMIN_STATUS_LABEL: Partial<Record<AdminStatus, string>> = {
  [ADMIN_STATUS.TRAINING]: 'In Training',
  [ADMIN_STATUS.PROBATION]: 'On Probation',
  [ADMIN_STATUS.TERMINATED]: 'Terminated',
  [ADMIN_STATUS.RESIGNED]: 'Resigned',
  [ADMIN_STATUS.ON_LEAVE]: 'On Leave',
  [ADMIN_STATUS.INVESTIGATION]: 'Under Investigation',
  [ADMIN_STATUS.SUSPENDED_ADMIN]: 'Suspended',
  [ADMIN_STATUS.AWAITING_VERIFICATION]: 'Awaiting Verification',
  [ADMIN_STATUS.AWAITING_APPROVAL]: 'Awaiting Approval',
  [ADMIN_STATUS.PENDING_ACTIVATION]: 'Pending Activation',
};

/**
 * Admin status icons - admin-specific only
 */
export const ADMIN_STATUS_ICON: Partial<Record<AdminStatus, string>> = {
  [ADMIN_STATUS.TRAINING]: 'graduation-cap',
  [ADMIN_STATUS.PROBATION]: 'balance-scale',
  [ADMIN_STATUS.TERMINATED]: 'user-times',
  [ADMIN_STATUS.RESIGNED]: 'door-open',
  [ADMIN_STATUS.ON_LEAVE]: 'umbrella-beach',
  [ADMIN_STATUS.INVESTIGATION]: 'search',
  [ADMIN_STATUS.SUSPENDED_ADMIN]: 'user-slash',
  [ADMIN_STATUS.AWAITING_VERIFICATION]: 'envelope',
  [ADMIN_STATUS.AWAITING_APPROVAL]: 'thumbs-up',
  [ADMIN_STATUS.PENDING_ACTIVATION]: 'user-plus',
};

/**
 * Admin status priority - admin-specific only
 */
export const ADMIN_STATUS_PRIORITY: Partial<Record<AdminStatus, number>> = {
  [ADMIN_STATUS.AWAITING_APPROVAL]: 50,
  [ADMIN_STATUS.AWAITING_VERIFICATION]: 60,
  [ADMIN_STATUS.PENDING_ACTIVATION]: 70,
  [ADMIN_STATUS.PROBATION]: 90,
  [ADMIN_STATUS.TRAINING]: 100,
  [ADMIN_STATUS.ON_LEAVE]: 110,
  [ADMIN_STATUS.INVESTIGATION]: 120,
  [ADMIN_STATUS.SUSPENDED_ADMIN]: 140,
  [ADMIN_STATUS.RESIGNED]: 200,
  [ADMIN_STATUS.TERMINATED]: 210,
};

/**
 * Admin status transitions
 */
export const ADMIN_STATUS_TRANSITIONS = [
  // From training
  { from: ADMIN_STATUS.TRAINING, to: ADMIN_STATUS.ACTIVE, allowed: true },
  { from: ADMIN_STATUS.TRAINING, to: ADMIN_STATUS.PROBATION, allowed: true },
  { from: ADMIN_STATUS.TRAINING, to: ADMIN_STATUS.TERMINATED, allowed: true },

  // From probation
  { from: ADMIN_STATUS.PROBATION, to: ADMIN_STATUS.ACTIVE, allowed: true },
  { from: ADMIN_STATUS.PROBATION, to: ADMIN_STATUS.TERMINATED, allowed: true },
  { from: ADMIN_STATUS.PROBATION, to: ADMIN_STATUS.TRAINING, allowed: true },

  // From active
  { from: ADMIN_STATUS.ACTIVE, to: ADMIN_STATUS.ON_LEAVE, allowed: true },
  { from: ADMIN_STATUS.ACTIVE, to: ADMIN_STATUS.SUSPENDED_ADMIN, allowed: true },
  { from: ADMIN_STATUS.ACTIVE, to: ADMIN_STATUS.INACTIVE, allowed: true },
  { from: ADMIN_STATUS.ACTIVE, to: ADMIN_STATUS.RESIGNED, allowed: true },
  { from: ADMIN_STATUS.ACTIVE, to: ADMIN_STATUS.TERMINATED, allowed: true },

  // From suspended
  { from: ADMIN_STATUS.SUSPENDED_ADMIN, to: ADMIN_STATUS.ACTIVE, allowed: true },
  { from: ADMIN_STATUS.SUSPENDED_ADMIN, to: ADMIN_STATUS.INVESTIGATION, allowed: true },
  { from: ADMIN_STATUS.SUSPENDED_ADMIN, to: ADMIN_STATUS.TERMINATED, allowed: true },

  // From investigation
  { from: ADMIN_STATUS.INVESTIGATION, to: ADMIN_STATUS.ACTIVE, allowed: true },
  { from: ADMIN_STATUS.INVESTIGATION, to: ADMIN_STATUS.SUSPENDED_ADMIN, allowed: true },
  { from: ADMIN_STATUS.INVESTIGATION, to: ADMIN_STATUS.TERMINATED, allowed: true },

  // From on leave
  { from: ADMIN_STATUS.ON_LEAVE, to: ADMIN_STATUS.ACTIVE, allowed: true },
  { from: ADMIN_STATUS.ON_LEAVE, to: ADMIN_STATUS.RESIGNED, allowed: true },
  { from: ADMIN_STATUS.ON_LEAVE, to: ADMIN_STATUS.TERMINATED, allowed: true },

  // From resigned
  { from: ADMIN_STATUS.RESIGNED, to: ADMIN_STATUS.ARCHIVED, allowed: true },
  { from: ADMIN_STATUS.RESIGNED, to: ADMIN_STATUS.DELETED, allowed: true },

  // From terminated
  { from: ADMIN_STATUS.TERMINATED, to: ADMIN_STATUS.ARCHIVED, allowed: true },
  { from: ADMIN_STATUS.TERMINATED, to: ADMIN_STATUS.DELETED, allowed: true },
];

/**
 * Check if admin status is active
 */
export function isAdminStatusActive(status: string): boolean {
  const activeStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.UNLOCKED,
  ];
  return activeStatuses.includes(status) || isActiveStatus(status);
}

/**
 * Check if admin status is inactive
 */
export function isAdminStatusInactive(status: string): boolean {
  const inactiveStatuses: string[] = [
    STATUS.INACTIVE,
    STATUS.SUSPENDED,
    ADMIN_STATUS.SUSPENDED_ADMIN,
    STATUS.DELETED,
    ADMIN_STATUS.TERMINATED,
    ADMIN_STATUS.RESIGNED,
    STATUS.BLOCKED,
    STATUS.DISABLED,
    STATUS.LOCKED,
  ];
  return inactiveStatuses.includes(status) || isInactiveStatus(status);
}

/**
 * Check if admin status is pending
 */
export function isAdminStatusPending(status: string): boolean {
  const pendingStatuses: string[] = [
    STATUS.PENDING,
    ADMIN_STATUS.AWAITING_VERIFICATION,
    ADMIN_STATUS.AWAITING_APPROVAL,
    ADMIN_STATUS.PENDING_ACTIVATION,
    ADMIN_STATUS.PROBATION,
    ADMIN_STATUS.TRAINING,
  ];
  return pendingStatuses.includes(status);
}

/**
 * Check if admin can perform actions based on status
 */
export function canAdminPerformActionsBasedOnStatus(status: string): boolean {
  const allowedStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.UNLOCKED,
    ADMIN_STATUS.TRAINING,
  ];
  return allowedStatuses.includes(status);
}

/**
 * Get admin status category
 */
export function getAdminStatusCategory(status: string): keyof typeof ADMIN_STATUS_CATEGORY {
  if (isAdminStatusActive(status)) {
    return 'ACTIVE';
  }
  if (isAdminStatusInactive(status)) {
    return 'INACTIVE';
  }
  if (isAdminStatusPending(status)) {
    return 'PENDING';
  }
  if (isTerminalStatus(status)) {
    return 'TERMINAL';
  }
  if (isTransitionalStatus(status)) {
    return 'TRANSITIONAL';
  }
  return 'INACTIVE';
}

/**
 * Get admin status color (admin-specific only)
 */
export function getAdminStatusColorFromStatus(status: string): string {
  return ADMIN_STATUS_COLOR[status as AdminStatus] || getStatusColor(status) || 'default';
}

/**
 * Get admin status label (admin-specific only)
 */
export function getAdminStatusLabelFromStatus(status: string): string {
  return ADMIN_STATUS_LABEL[status as AdminStatus] || getStatusLabel(status) || status;
}

/**
 * Get admin status icon
 */
export function getAdminStatusIcon(status: string): string {
  return ADMIN_STATUS_ICON[status as AdminStatus] || 'circle';
}

/**
 * Get admin status priority
 */
export function getAdminStatusPriority(status: string): number {
  return ADMIN_STATUS_PRIORITY[status as AdminStatus] || getStatusPriority(status) || 999;
}

/**
 * Check if admin status allows login
 */
export function canAdminLogin(status: string): boolean {
  const allowedStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.UNLOCKED,
    ADMIN_STATUS.TRAINING,
  ];
  return allowedStatuses.includes(status);
}

/**
 * Check if admin status allows administrative actions
 */
export function canAdminDoAdminWork(status: string): boolean {
  const allowedStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.UNLOCKED,
  ];
  return allowedStatuses.includes(status);
}

/**
 * Get allowed next admin statuses
 */
export function getAllowedNextAdminStatuses(currentStatus: string): string[] {
  return ADMIN_STATUS_TRANSITIONS.filter((t) => t.from === currentStatus && t.allowed).map(
    (t) => t.to
  );
}

/**
 * Check if admin status transition is allowed
 */
export function canAdminTransitionTo(currentStatus: string, nextStatus: string): boolean {
  return ADMIN_STATUS_TRANSITIONS.some(
    (t) => t.from === currentStatus && t.to === nextStatus && t.allowed
  );
}

/**
 * Get all admin status options for dropdown
 */
export function getAdminStatusOptions(): Array<{
  value: string;
  label: string;
  color: string;
}> {
  return Object.values(ADMIN_STATUS).map((status) => ({
    value: status,
    label: getAdminStatusLabelFromStatus(status),
    color: getAdminStatusColorFromStatus(status),
  }));
}

/**
 * Get active admin statuses
 */
export function getActiveAdminStatuses(): string[] {
  return Object.values(ADMIN_STATUS).filter(isAdminStatusActive);
}

/**
 * Get inactive admin statuses
 */
export function getInactiveAdminStatuses(): string[] {
  return Object.values(ADMIN_STATUS).filter(isAdminStatusInactive);
}

/**
 * Get pending admin statuses
 */
export function getPendingAdminStatuses(): string[] {
  return Object.values(ADMIN_STATUS).filter(isAdminStatusPending);
}
