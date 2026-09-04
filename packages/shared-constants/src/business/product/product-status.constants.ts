/**
 * Product Status Constants
 * প্রোডাক্ট স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { PRODUCT } from './product.constants';

export const PRODUCT_STATUS = {
  // Common statuses
  ...STATUS,

  // Product specific statuses
  DRAFT: PRODUCT.STATUS.DRAFT,
  PENDING_APPROVAL: PRODUCT.STATUS.PENDING_APPROVAL,
  APPROVED: PRODUCT.STATUS.APPROVED,
  PUBLISHED: PRODUCT.STATUS.PUBLISHED,
  OUT_OF_STOCK: PRODUCT.STATUS.OUT_OF_STOCK,
  DISCONTINUED: PRODUCT.STATUS.DISCONTINUED,
  REJECTED: PRODUCT.STATUS.REJECTED,
  ARCHIVED: PRODUCT.STATUS.ARCHIVED,

  // Additional product statuses
  IN_REVIEW: 'in_review',
  NEEDS_REVISION: 'needs_revision',
  READY_FOR_PUBLISH: 'ready_for_publish',
  SCHEDULED: 'scheduled',
  EXPIRED: 'expired',
  COMING_SOON: 'coming_soon',
  PRE_ORDER: 'pre_order',
  BACK_ORDER: 'back_order',
} as const;

export type ProductStatusType = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
