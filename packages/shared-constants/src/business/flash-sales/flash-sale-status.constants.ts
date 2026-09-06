/**
 * Flash Sale Status Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_STATUS = {
  // Base status from common
  ...STATUS,

  // Flash sale specific status
  FLASH_SALE_PENDING: 'flash_sale_pending',
  FLASH_SALE_UPCOMING: 'flash_sale_upcoming',
  FLASH_SALE_ACTIVE: 'flash_sale_active',
  FLASH_SALE_PAUSED: 'flash_sale_paused',
  FLASH_SALE_ENDED: 'flash_sale_ended',
  FLASH_SALE_CANCELLED: 'flash_sale_cancelled',
  FLASH_SALE_EXPIRED: 'flash_sale_expired',
  FLASH_SALE_COMPLETED: 'flash_sale_completed',
  FLASH_SALE_PREPARING: 'flash_sale_preparing',
  FLASH_SALE_READY: 'flash_sale_ready',
  FLASH_SALE_EXTENDED: 'flash_sale_extended',
  FLASH_SALE_SOLD_OUT: 'flash_sale_sold_out',
  FLASH_SALE_APPROVED: 'flash_sale_approved',
  FLASH_SALE_REJECTED: 'flash_sale_rejected',
  FLASH_SALE_PENDING_APPROVAL: 'flash_sale_pending_approval',
} as const;

// Define FlashSaleStatus as union of all status values
export type FlashSaleStatus = (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];

// Define a type for status keys that are not from the base STATUS
export type FlashSaleExtendedStatusKey =
  | 'FLASH_SALE_PENDING'
  | 'FLASH_SALE_UPCOMING'
  | 'FLASH_SALE_ACTIVE'
  | 'FLASH_SALE_PAUSED'
  | 'FLASH_SALE_ENDED'
  | 'FLASH_SALE_CANCELLED'
  | 'FLASH_SALE_EXPIRED'
  | 'FLASH_SALE_COMPLETED'
  | 'FLASH_SALE_PREPARING'
  | 'FLASH_SALE_READY'
  | 'FLASH_SALE_EXTENDED'
  | 'FLASH_SALE_SOLD_OUT'
  | 'FLASH_SALE_APPROVED'
  | 'FLASH_SALE_REJECTED'
  | 'FLASH_SALE_PENDING_APPROVAL';

// For labels and colors, only include the extended status keys
export const FLASH_SALE_STATUS_LABELS: Record<FlashSaleExtendedStatusKey, string> = {
  FLASH_SALE_PENDING: 'Flash Sale Pending',
  FLASH_SALE_UPCOMING: 'Upcoming',
  FLASH_SALE_ACTIVE: 'Active',
  FLASH_SALE_PAUSED: 'Paused',
  FLASH_SALE_ENDED: 'Ended',
  FLASH_SALE_CANCELLED: 'Cancelled',
  FLASH_SALE_EXPIRED: 'Expired',
  FLASH_SALE_COMPLETED: 'Completed',
  FLASH_SALE_PREPARING: 'Preparing',
  FLASH_SALE_READY: 'Ready',
  FLASH_SALE_EXTENDED: 'Extended',
  FLASH_SALE_SOLD_OUT: 'Sold Out',
  FLASH_SALE_APPROVED: 'Approved',
  FLASH_SALE_REJECTED: 'Rejected',
  FLASH_SALE_PENDING_APPROVAL: 'Pending Approval',
};

export const FLASH_SALE_STATUS_COLORS: Record<FlashSaleExtendedStatusKey, string> = {
  FLASH_SALE_PENDING: '#eab308',
  FLASH_SALE_UPCOMING: '#60a5fa',
  FLASH_SALE_ACTIVE: '#22c55e',
  FLASH_SALE_PAUSED: '#f59e0b',
  FLASH_SALE_ENDED: '#6b7280',
  FLASH_SALE_CANCELLED: '#dc2626',
  FLASH_SALE_EXPIRED: '#9ca3af',
  FLASH_SALE_COMPLETED: '#22c55e',
  FLASH_SALE_PREPARING: '#8b5cf6',
  FLASH_SALE_READY: '#3b82f6',
  FLASH_SALE_EXTENDED: '#8b5cf6',
  FLASH_SALE_SOLD_OUT: '#ef4444',
  FLASH_SALE_APPROVED: '#22c55e',
  FLASH_SALE_REJECTED: '#ef4444',
  FLASH_SALE_PENDING_APPROVAL: '#eab308',
};

export const FLASH_SALE_STATUS_GROUPS = {
  PENDING: [
    FLASH_SALE_STATUS.FLASH_SALE_PENDING,
    FLASH_SALE_STATUS.FLASH_SALE_PENDING_APPROVAL,
  ] as const,

  UPCOMING: [
    FLASH_SALE_STATUS.FLASH_SALE_UPCOMING,
    FLASH_SALE_STATUS.FLASH_SALE_PREPARING,
    FLASH_SALE_STATUS.FLASH_SALE_READY,
  ] as const,

  ACTIVE: [
    FLASH_SALE_STATUS.FLASH_SALE_ACTIVE,
    FLASH_SALE_STATUS.FLASH_SALE_APPROVED,
    FLASH_SALE_STATUS.FLASH_SALE_EXTENDED,
  ] as const,

  PAUSED: [FLASH_SALE_STATUS.FLASH_SALE_PAUSED] as const,

  ENDED: [
    FLASH_SALE_STATUS.FLASH_SALE_ENDED,
    FLASH_SALE_STATUS.FLASH_SALE_COMPLETED,
    FLASH_SALE_STATUS.FLASH_SALE_SOLD_OUT,
  ] as const,

  CANCELLED: [
    FLASH_SALE_STATUS.FLASH_SALE_CANCELLED,
    FLASH_SALE_STATUS.FLASH_SALE_EXPIRED,
    FLASH_SALE_STATUS.FLASH_SALE_REJECTED,
  ] as const,
} as const;
