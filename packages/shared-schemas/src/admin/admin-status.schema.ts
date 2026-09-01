/**
 * Admin Status Schema
 * Zod schemas for admin status definitions
 */

import { z } from 'zod';
import { ADMIN_STATUS_TRANSITIONS } from '@vubon/shared-constants';

/**
 * Admin status enum schema (from constants)
 * Combines common STATUS with admin-specific statuses
 */
export const adminStatusSchema = z.enum([
  // From common STATUS (via STATUS constant)
  'active',
  'inactive',
  'pending',
  'suspended',
  'deleted',
  'archived',
  'draft',
  'published',
  'unpublished',
  'scheduled',
  'expired',
  'cancelled',
  'completed',
  'failed',
  'success',
  'processing',
  'initiated',
  'confirmed',
  'rejected',
  'approved',
  'review',
  'on_hold',
  'paused',
  'resumed',
  'locked',
  'unlocked',
  'verified',
  'unverified',
  'blocked',
  'enabled',
  'disabled',
  'open',
  'closed',
  'available',
  'unavailable',
  'in_stock',
  'out_of_stock',
  'pre_order',
  'back_order',
  'discontinued',
  'new',
  'used',
  'refurbished',
  'rented',
  'leased',
  // Admin-specific (from admin-status.constants)
  'training',
  'probation',
  'terminated',
  'resigned',
  'on_leave',
  'investigation',
  'suspended_admin',
  'awaiting_verification',
  'awaiting_approval',
  'pending_activation',
]);

/**
 * Admin status category schema
 */
export const adminStatusCategorySchema = z.enum([
  'active',
  'inactive',
  'pending',
  'terminal',
  'transitional',
  'restricted',
]);

/**
 * Admin status transition schema
 */
export const adminStatusTransitionSchema = z.object({
  from: adminStatusSchema,
  to: adminStatusSchema,
  allowed: z.boolean(),
});

/**
 * Type inference from schemas
 */
export type AdminStatusSchemaType = z.infer<typeof adminStatusSchema>;
export type AdminStatusCategorySchemaType = z.infer<typeof adminStatusCategorySchema>;

/**
 * Helper function to check if status is active (admin-specific)
 */
export function isAdminStatusActive(status: AdminStatusSchemaType): boolean {
  const activeStatuses: AdminStatusSchemaType[] = [
    'active',
    'verified',
    'enabled',
    'unlocked',
    'training',
  ];
  return activeStatuses.includes(status);
}

/**
 * Helper function to check if status is inactive (admin-specific)
 */
export function isAdminStatusInactive(status: AdminStatusSchemaType): boolean {
  const inactiveStatuses: AdminStatusSchemaType[] = [
    'inactive',
    'suspended',
    'suspended_admin',
    'deleted',
    'terminated',
    'resigned',
    'blocked',
    'disabled',
    'locked',
  ];
  return inactiveStatuses.includes(status);
}

/**
 * Helper function to check if status is pending (admin-specific)
 */
export function isAdminStatusPending(status: AdminStatusSchemaType): boolean {
  const pendingStatuses: AdminStatusSchemaType[] = [
    'pending',
    'awaiting_verification',
    'awaiting_approval',
    'pending_activation',
    'probation',
    'training',
  ];
  return pendingStatuses.includes(status);
}

/**
 * Helper function to get admin status category
 */
export function getAdminStatusCategory(
  status: AdminStatusSchemaType
): AdminStatusCategorySchemaType {
  if (isAdminStatusActive(status)) return 'active';
  if (isAdminStatusInactive(status)) return 'inactive';
  if (isAdminStatusPending(status)) return 'pending';
  if (
    status === 'deleted' ||
    status === 'archived' ||
    status === 'terminated' ||
    status === 'resigned'
  ) {
    return 'terminal';
  }
  if (status === 'draft' || status === 'review' || status === 'on_hold' || status === 'paused') {
    return 'transitional';
  }
  if (status === 'suspended' || status === 'suspended_admin' || status === 'investigation') {
    return 'restricted';
  }
  return 'inactive';
}

/**
 * Helper function to get admin status color
 */
export function getAdminStatusColorFromStatus(status: AdminStatusSchemaType): string {
  const colorMap: Record<string, string> = {
    // Admin-specific statuses
    training: 'info',
    probation: 'warning',
    terminated: 'error',
    resigned: 'default',
    on_leave: 'warning',
    investigation: 'error',
    suspended_admin: 'error',
    awaiting_verification: 'info',
    awaiting_approval: 'warning',
    pending_activation: 'info',
    // Common statuses
    active: 'success',
    inactive: 'default',
    pending: 'warning',
    suspended: 'error',
    deleted: 'error',
    archived: 'default',
    verified: 'success',
    unverified: 'warning',
    locked: 'error',
    unlocked: 'success',
    blocked: 'error',
    enabled: 'success',
    disabled: 'error',
    expired: 'default',
    completed: 'success',
    failed: 'error',
    cancelled: 'default',
    processing: 'info',
    published: 'success',
    unpublished: 'default',
    draft: 'default',
    scheduled: 'info',
    confirmed: 'success',
    rejected: 'error',
    approved: 'success',
    review: 'warning',
    on_hold: 'warning',
    paused: 'warning',
    resumed: 'success',
    open: 'success',
    closed: 'default',
    available: 'success',
    unavailable: 'error',
    in_stock: 'success',
    out_of_stock: 'error',
    pre_order: 'warning',
    back_order: 'warning',
    discontinued: 'error',
    new: 'success',
    used: 'warning',
    refurbished: 'info',
    rented: 'info',
    leased: 'info',
  };
  return colorMap[status] || 'default';
}

/**
 * Helper function to get admin status label
 */
export function getAdminStatusLabelFromStatus(status: AdminStatusSchemaType): string {
  const labelMap: Record<string, string> = {
    // Admin-specific statuses
    training: 'In Training',
    probation: 'On Probation',
    terminated: 'Terminated',
    resigned: 'Resigned',
    on_leave: 'On Leave',
    investigation: 'Under Investigation',
    suspended_admin: 'Suspended',
    awaiting_verification: 'Awaiting Verification',
    awaiting_approval: 'Awaiting Approval',
    pending_activation: 'Pending Activation',
    // Common statuses
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    deleted: 'Deleted',
    archived: 'Archived',
    verified: 'Verified',
    unverified: 'Unverified',
    locked: 'Locked',
    unlocked: 'Unlocked',
    blocked: 'Blocked',
    enabled: 'Enabled',
    disabled: 'Disabled',
    expired: 'Expired',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
    processing: 'Processing',
    published: 'Published',
    unpublished: 'Unpublished',
    draft: 'Draft',
    scheduled: 'Scheduled',
    confirmed: 'Confirmed',
    rejected: 'Rejected',
    approved: 'Approved',
    review: 'Review',
    on_hold: 'On Hold',
    paused: 'Paused',
    resumed: 'Resumed',
    open: 'Open',
    closed: 'Closed',
    available: 'Available',
    unavailable: 'Unavailable',
    in_stock: 'In Stock',
    out_of_stock: 'Out of Stock',
    pre_order: 'Pre-Order',
    back_order: 'Back Order',
    discontinued: 'Discontinued',
    new: 'New',
    used: 'Used',
    refurbished: 'Refurbished',
    rented: 'Rented',
    leased: 'Leased',
  };
  return labelMap[status] || status;
}

/**
 * Helper function to get allowed next admin statuses
 */
export function getAllowedNextAdminStatuses(
  currentStatus: AdminStatusSchemaType
): AdminStatusSchemaType[] {
  const transitions = ADMIN_STATUS_TRANSITIONS.filter((t) => t.from === currentStatus && t.allowed);
  return transitions.map((t) => t.to as AdminStatusSchemaType);
}

/**
 * Helper function to check if status transition is allowed
 */
export function canAdminTransitionTo(
  currentStatus: AdminStatusSchemaType,
  nextStatus: AdminStatusSchemaType
): boolean {
  return ADMIN_STATUS_TRANSITIONS.some(
    (t) => t.from === currentStatus && t.to === nextStatus && t.allowed
  );
}

/**
 * Get all admin status options for dropdown
 */
export function getAdminStatusOptions(): Array<{
  value: AdminStatusSchemaType;
  label: string;
  color: string;
}> {
  const statusValues = adminStatusSchema.options;
  return statusValues.map((status) => ({
    value: status as AdminStatusSchemaType,
    label: getAdminStatusLabelFromStatus(status as AdminStatusSchemaType),
    color: getAdminStatusColorFromStatus(status as AdminStatusSchemaType),
  }));
}

export const adminStatusSchemas = {
  status: adminStatusSchema,
  category: adminStatusCategorySchema,
  transition: adminStatusTransitionSchema,
  isActive: isAdminStatusActive,
  isInactive: isAdminStatusInactive,
  isPending: isAdminStatusPending,
  getCategory: getAdminStatusCategory,
  getColor: getAdminStatusColorFromStatus,
  getLabel: getAdminStatusLabelFromStatus,
  getAllowedNext: getAllowedNextAdminStatuses,
  canTransitionTo: canAdminTransitionTo,
  getOptions: getAdminStatusOptions,
};

export default adminStatusSchemas;
