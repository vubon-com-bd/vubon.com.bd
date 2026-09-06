/**
 * Deal Status Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/deal-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const DEAL_STATUS = {
  // Base status from common
  ...STATUS,

  // Deal specific status
  DEAL_PENDING: 'deal_pending',
  DEAL_ACTIVE: 'deal_active',
  DEAL_PAUSED: 'deal_paused',
  DEAL_ENDED: 'deal_ended',
  DEAL_CANCELLED: 'deal_cancelled',
  DEAL_EXPIRED: 'deal_expired',
  DEAL_COMPLETED: 'deal_completed',
  DEAL_PREPARING: 'deal_preparing',
  DEAL_READY: 'deal_ready',
  DEAL_EXTENDED: 'deal_extended',
  DEAL_SOLD_OUT: 'deal_sold_out',
  DEAL_APPROVED: 'deal_approved',
  DEAL_REJECTED: 'deal_rejected',
  DEAL_PENDING_APPROVAL: 'deal_pending_approval',
  DEAL_UNDER_REVIEW: 'deal_under_review',
  DEAL_SUSPENDED: 'deal_suspended',
  DEAL_EXPIRING: 'deal_expiring',
} as const;

// Define DealStatus as union of all status values
export type DealStatus = (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];

// Define a type for status keys that are not from the base STATUS
export type DealExtendedStatusKey =
  | 'DEAL_PENDING'
  | 'DEAL_ACTIVE'
  | 'DEAL_PAUSED'
  | 'DEAL_ENDED'
  | 'DEAL_CANCELLED'
  | 'DEAL_EXPIRED'
  | 'DEAL_COMPLETED'
  | 'DEAL_PREPARING'
  | 'DEAL_READY'
  | 'DEAL_EXTENDED'
  | 'DEAL_SOLD_OUT'
  | 'DEAL_APPROVED'
  | 'DEAL_REJECTED'
  | 'DEAL_PENDING_APPROVAL'
  | 'DEAL_UNDER_REVIEW'
  | 'DEAL_SUSPENDED'
  | 'DEAL_EXPIRING';

// For labels and colors, only include the extended status keys
export const DEAL_STATUS_LABELS: Record<DealExtendedStatusKey, string> = {
  DEAL_PENDING: 'Deal Pending',
  DEAL_ACTIVE: 'Deal Active',
  DEAL_PAUSED: 'Deal Paused',
  DEAL_ENDED: 'Deal Ended',
  DEAL_CANCELLED: 'Deal Cancelled',
  DEAL_EXPIRED: 'Deal Expired',
  DEAL_COMPLETED: 'Deal Completed',
  DEAL_PREPARING: 'Deal Preparing',
  DEAL_READY: 'Deal Ready',
  DEAL_EXTENDED: 'Deal Extended',
  DEAL_SOLD_OUT: 'Deal Sold Out',
  DEAL_APPROVED: 'Deal Approved',
  DEAL_REJECTED: 'Deal Rejected',
  DEAL_PENDING_APPROVAL: 'Pending Approval',
  DEAL_UNDER_REVIEW: 'Under Review',
  DEAL_SUSPENDED: 'Deal Suspended',
  DEAL_EXPIRING: 'Deal Expiring',
};

export const DEAL_STATUS_COLORS: Record<DealExtendedStatusKey, string> = {
  DEAL_PENDING: '#eab308',
  DEAL_ACTIVE: '#22c55e',
  DEAL_PAUSED: '#f59e0b',
  DEAL_ENDED: '#6b7280',
  DEAL_CANCELLED: '#dc2626',
  DEAL_EXPIRED: '#9ca3af',
  DEAL_COMPLETED: '#22c55e',
  DEAL_PREPARING: '#8b5cf6',
  DEAL_READY: '#3b82f6',
  DEAL_EXTENDED: '#8b5cf6',
  DEAL_SOLD_OUT: '#ef4444',
  DEAL_APPROVED: '#22c55e',
  DEAL_REJECTED: '#ef4444',
  DEAL_PENDING_APPROVAL: '#eab308',
  DEAL_UNDER_REVIEW: '#60a5fa',
  DEAL_SUSPENDED: '#dc2626',
  DEAL_EXPIRING: '#f59e0b',
};

export const DEAL_STATUS_GROUPS = {
  PENDING: [
    DEAL_STATUS.DEAL_PENDING,
    DEAL_STATUS.DEAL_PENDING_APPROVAL,
    DEAL_STATUS.DEAL_UNDER_REVIEW,
  ] as const,

  ACTIVE: [DEAL_STATUS.DEAL_ACTIVE, DEAL_STATUS.DEAL_READY, DEAL_STATUS.DEAL_APPROVED] as const,

  PAUSED: [DEAL_STATUS.DEAL_PAUSED, DEAL_STATUS.DEAL_SUSPENDED] as const,

  ENDED: [DEAL_STATUS.DEAL_ENDED, DEAL_STATUS.DEAL_COMPLETED, DEAL_STATUS.DEAL_SOLD_OUT] as const,

  CANCELLED: [
    DEAL_STATUS.DEAL_CANCELLED,
    DEAL_STATUS.DEAL_EXPIRED,
    DEAL_STATUS.DEAL_REJECTED,
  ] as const,

  PREPARING: [
    DEAL_STATUS.DEAL_PREPARING,
    DEAL_STATUS.DEAL_EXTENDED,
    DEAL_STATUS.DEAL_EXPIRING,
  ] as const,
} as const;
