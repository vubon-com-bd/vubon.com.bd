/**
 * Auth Status Constants (EXTENDS common/status)
 * @module shared-constants/auth/auth-status.constants
 */

import { STATUS } from '../common/status.constants';

export const AUTH_STATUS = {
  // Base status from common (using spread)
  ...STATUS,

  // Auth specific status
  AUTH_PENDING: 'auth_pending',
  AUTH_VERIFIED: 'auth_verified',
  AUTH_FAILED: 'auth_failed',
  AUTH_EXPIRED: 'auth_expired',
  AUTH_REVOKED: 'auth_revoked',
  AUTH_SUSPENDED: 'auth_suspended',
  AUTH_LOCKED: 'auth_locked',
  AUTH_TERMINATED: 'auth_terminated',
  AUTH_DEACTIVATED: 'auth_deactivated',
  AUTH_ARCHIVED: 'auth_archived',
} as const;

// Define AuthStatus as union of string literals only
export type AuthStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'draft'
  | 'archived'
  | 'deleted'
  | 'blocked'
  | 'suspended'
  | 'auth_pending'
  | 'auth_verified'
  | 'auth_failed'
  | 'auth_expired'
  | 'auth_revoked'
  | 'auth_suspended'
  | 'auth_locked'
  | 'auth_terminated'
  | 'auth_deactivated'
  | 'auth_archived'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded'
  | 'partial_shipped'
  | 'ready_to_ship'
  | 'on_hold'
  | 'failed'
  | 'paid'
  | 'partial'
  | 'partial_refund'
  | 'authorized'
  | 'captured'
  | 'in_transit'
  | 'out_for_delivery'
  | 'pending_verification'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'out_of_stock'
  | 'discontinued'
  | 'coming_soon'
  | 'verified'
  | 'expired'
  | 'in_progress'
  | 'revoked'
  | 'invalid'
  | 'completed'
  | 'open'
  | 'resolved'
  | 'closed'
  | 'reopened'
  | 'escalated';

export const AUTH_STATUS_LABELS: Partial<Record<AuthStatus, string>> = {
  // General status
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  draft: 'Draft',
  archived: 'Archived',
  deleted: 'Deleted',
  blocked: 'Blocked',
  suspended: 'Suspended',

  // Auth specific
  auth_pending: 'Auth Pending',
  auth_verified: 'Auth Verified',
  auth_failed: 'Auth Failed',
  auth_expired: 'Auth Expired',
  auth_revoked: 'Auth Revoked',
  auth_suspended: 'Auth Suspended',
  auth_locked: 'Auth Locked',
  auth_terminated: 'Auth Terminated',
  auth_deactivated: 'Auth Deactivated',
  auth_archived: 'Auth Archived',

  // Order status
  confirmed: 'Order Confirmed',
  processing: 'Order Processing',
  shipped: 'Order Shipped',
  delivered: 'Order Delivered',
  cancelled: 'Order Cancelled',
  returned: 'Order Returned',
  refunded: 'Order Refunded',
  partial_shipped: 'Partial Shipped',
  ready_to_ship: 'Ready to Ship',
  on_hold: 'On Hold',
  failed: 'Order Failed',

  // Payment status
  paid: 'Paid',
  partial: 'Partial Payment',
  partial_refund: 'Partial Refund',
  authorized: 'Authorized',
  captured: 'Captured',

  // Shipment status
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',

  // User status
  pending_verification: 'Pending Verification',
  pending_approval: 'Pending Approval',
  approved: 'User Approved',
  rejected: 'User Rejected',

  // Product status
  out_of_stock: 'Out of Stock',
  discontinued: 'Discontinued',
  coming_soon: 'Coming Soon',

  // Verification status
  verified: 'Verified',
  expired: 'Expired',
  in_progress: 'In Progress',

  // Session status
  revoked: 'Revoked',
  invalid: 'Invalid',

  // Payout status
  completed: 'Completed',

  // Ticket status
  open: 'Ticket Open',
  resolved: 'Ticket Resolved',
  closed: 'Ticket Closed',
  reopened: 'Ticket Reopened',
  escalated: 'Ticket Escalated',
};

export const AUTH_STATUS_COLORS: Partial<Record<AuthStatus, string>> = {
  active: '#22c55e',
  inactive: '#9ca3af',
  pending: '#eab308',
  draft: '#60a5fa',
  archived: '#6b7280',
  deleted: '#ef4444',
  blocked: '#dc2626',
  suspended: '#f59e0b',
  auth_pending: '#eab308',
  auth_verified: '#22c55e',
  auth_failed: '#ef4444',
  auth_expired: '#9ca3af',
  auth_revoked: '#ef4444',
  auth_suspended: '#f59e0b',
  auth_locked: '#dc2626',
  auth_terminated: '#ef4444',
  auth_deactivated: '#9ca3af',
  auth_archived: '#6b7280',
  confirmed: '#22c55e',
  processing: '#60a5fa',
  shipped: '#8b5cf6',
  delivered: '#22c55e',
  cancelled: '#ef4444',
  returned: '#f59e0b',
  refunded: '#06b6d4',
  partial_shipped: '#8b5cf6',
  ready_to_ship: '#22c55e',
  on_hold: '#f59e0b',
  failed: '#ef4444',
  paid: '#22c55e',
  partial: '#f59e0b',
  partial_refund: '#06b6d4',
  authorized: '#22c55e',
  captured: '#22c55e',
  in_transit: '#8b5cf6',
  out_for_delivery: '#8b5cf6',
  pending_verification: '#eab308',
  pending_approval: '#eab308',
  approved: '#22c55e',
  rejected: '#ef4444',
  out_of_stock: '#ef4444',
  discontinued: '#6b7280',
  coming_soon: '#60a5fa',
  verified: '#22c55e',
  expired: '#9ca3af',
  in_progress: '#60a5fa',
  revoked: '#ef4444',
  invalid: '#ef4444',
  completed: '#22c55e',
  open: '#eab308',
  resolved: '#22c55e',
  closed: '#9ca3af',
  reopened: '#f59e0b',
  escalated: '#ef4444',
};
