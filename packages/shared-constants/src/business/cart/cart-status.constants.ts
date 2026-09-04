/**
 * Cart Status Constants
 * কার্ট স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { CART } from './cart.constants';

export const CART_STATUS = {
  // Common statuses
  ...STATUS,

  // Cart specific statuses
  ACTIVE: CART.STATUS.ACTIVE,
  ABANDONED: CART.STATUS.ABANDONED,
  CHECKED_OUT: CART.STATUS.CHECKED_OUT,
  CONVERTED: CART.STATUS.CONVERTED,
  EXPIRED: CART.STATUS.EXPIRED,
  DELETED: CART.STATUS.DELETED,

  // Additional cart statuses
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type CartStatusType = (typeof CART_STATUS)[keyof typeof CART_STATUS];
