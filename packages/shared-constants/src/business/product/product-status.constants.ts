/**
 * Product Status Constants (EXTENDS common/status)
 * @module shared-constants/business/product/product-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_STATUS = {
  // Base status from common
  ...STATUS,

  // Product specific status
  PRODUCT_DRAFT: 'product_draft',
  PRODUCT_PENDING: 'product_pending',
  PRODUCT_APPROVED: 'product_approved',
  PRODUCT_REJECTED: 'product_rejected',
  PRODUCT_ACTIVE: 'product_active',
  PRODUCT_INACTIVE: 'product_inactive',
  PRODUCT_OUT_OF_STOCK: 'product_out_of_stock',
  PRODUCT_DISCONTINUED: 'product_discontinued',
  PRODUCT_COMING_SOON: 'product_coming_soon',
  PRODUCT_PRE_ORDER: 'product_pre_order',
  PRODUCT_BACK_ORDER: 'product_back_order',
  PRODUCT_ARCHIVED: 'product_archived',
  PRODUCT_DELETED: 'product_deleted',
  PRODUCT_RESTRICTED: 'product_restricted',
  PRODUCT_FLAGGED: 'product_flagged',
  PRODUCT_UNDER_REVIEW: 'product_under_review',
  PRODUCT_EXPIRED: 'product_expired',
  PRODUCT_SUSPENDED: 'product_suspended',
  PRODUCT_BLOCKED: 'product_blocked',
  PRODUCT_VERIFIED: 'product_verified',
  PRODUCT_UNVERIFIED: 'product_unverified',
} as const;

// Only define keys for product specific status (not including common STATUS keys)
export type ProductExtendedStatusKey =
  | 'PRODUCT_DRAFT'
  | 'PRODUCT_PENDING'
  | 'PRODUCT_APPROVED'
  | 'PRODUCT_REJECTED'
  | 'PRODUCT_ACTIVE'
  | 'PRODUCT_INACTIVE'
  | 'PRODUCT_OUT_OF_STOCK'
  | 'PRODUCT_DISCONTINUED'
  | 'PRODUCT_COMING_SOON'
  | 'PRODUCT_PRE_ORDER'
  | 'PRODUCT_BACK_ORDER'
  | 'PRODUCT_ARCHIVED'
  | 'PRODUCT_DELETED'
  | 'PRODUCT_RESTRICTED'
  | 'PRODUCT_FLAGGED'
  | 'PRODUCT_UNDER_REVIEW'
  | 'PRODUCT_EXPIRED'
  | 'PRODUCT_SUSPENDED'
  | 'PRODUCT_BLOCKED'
  | 'PRODUCT_VERIFIED'
  | 'PRODUCT_UNVERIFIED';

// Rename type to avoid conflict with common ProductStatus
export type ProductStatusType = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export const PRODUCT_STATUS_LABELS: Record<ProductExtendedStatusKey, string> = {
  PRODUCT_DRAFT: 'Product Draft',
  PRODUCT_PENDING: 'Product Pending',
  PRODUCT_APPROVED: 'Product Approved',
  PRODUCT_REJECTED: 'Product Rejected',
  PRODUCT_ACTIVE: 'Product Active',
  PRODUCT_INACTIVE: 'Product Inactive',
  PRODUCT_OUT_OF_STOCK: 'Out of Stock',
  PRODUCT_DISCONTINUED: 'Discontinued',
  PRODUCT_COMING_SOON: 'Coming Soon',
  PRODUCT_PRE_ORDER: 'Pre-Order',
  PRODUCT_BACK_ORDER: 'Back Order',
  PRODUCT_ARCHIVED: 'Product Archived',
  PRODUCT_DELETED: 'Product Deleted',
  PRODUCT_RESTRICTED: 'Product Restricted',
  PRODUCT_FLAGGED: 'Product Flagged',
  PRODUCT_UNDER_REVIEW: 'Under Review',
  PRODUCT_EXPIRED: 'Product Expired',
  PRODUCT_SUSPENDED: 'Product Suspended',
  PRODUCT_BLOCKED: 'Product Blocked',
  PRODUCT_VERIFIED: 'Product Verified',
  PRODUCT_UNVERIFIED: 'Product Unverified',
};

export const PRODUCT_STATUS_COLORS: Record<ProductExtendedStatusKey, string> = {
  PRODUCT_DRAFT: '#60a5fa',
  PRODUCT_PENDING: '#eab308',
  PRODUCT_APPROVED: '#22c55e',
  PRODUCT_REJECTED: '#ef4444',
  PRODUCT_ACTIVE: '#22c55e',
  PRODUCT_INACTIVE: '#9ca3af',
  PRODUCT_OUT_OF_STOCK: '#ef4444',
  PRODUCT_DISCONTINUED: '#6b7280',
  PRODUCT_COMING_SOON: '#60a5fa',
  PRODUCT_PRE_ORDER: '#eab308',
  PRODUCT_BACK_ORDER: '#f59e0b',
  PRODUCT_ARCHIVED: '#6b7280',
  PRODUCT_DELETED: '#ef4444',
  PRODUCT_RESTRICTED: '#f59e0b',
  PRODUCT_FLAGGED: '#ef4444',
  PRODUCT_UNDER_REVIEW: '#eab308',
  PRODUCT_EXPIRED: '#9ca3af',
  PRODUCT_SUSPENDED: '#f59e0b',
  PRODUCT_BLOCKED: '#dc2626',
  PRODUCT_VERIFIED: '#22c55e',
  PRODUCT_UNVERIFIED: '#f59e0b',
};

export const PRODUCT_STATUS_GROUPS = {
  ACTIVE: [
    PRODUCT_STATUS.ACTIVE,
    PRODUCT_STATUS.PRODUCT_ACTIVE,
    PRODUCT_STATUS.PRODUCT_APPROVED,
    PRODUCT_STATUS.PRODUCT_VERIFIED,
  ] as const,

  PENDING: [
    PRODUCT_STATUS.PENDING,
    PRODUCT_STATUS.PRODUCT_PENDING,
    PRODUCT_STATUS.PRODUCT_UNDER_REVIEW,
    PRODUCT_STATUS.PRODUCT_PRE_ORDER,
  ] as const,

  INACTIVE: [
    PRODUCT_STATUS.INACTIVE,
    PRODUCT_STATUS.PRODUCT_INACTIVE,
    PRODUCT_STATUS.PRODUCT_DISCONTINUED,
    PRODUCT_STATUS.PRODUCT_EXPIRED,
    PRODUCT_STATUS.PRODUCT_ARCHIVED,
  ] as const,

  OUT_OF_STOCK: [PRODUCT_STATUS.PRODUCT_OUT_OF_STOCK, PRODUCT_STATUS.PRODUCT_BACK_ORDER] as const,

  BLOCKED: [
    PRODUCT_STATUS.BLOCKED,
    PRODUCT_STATUS.PRODUCT_BLOCKED,
    PRODUCT_STATUS.PRODUCT_SUSPENDED,
    PRODUCT_STATUS.PRODUCT_RESTRICTED,
    PRODUCT_STATUS.PRODUCT_FLAGGED,
  ] as const,

  DELETED: [PRODUCT_STATUS.DELETED, PRODUCT_STATUS.PRODUCT_DELETED] as const,

  COMING: [PRODUCT_STATUS.PRODUCT_COMING_SOON] as const,
} as const;
