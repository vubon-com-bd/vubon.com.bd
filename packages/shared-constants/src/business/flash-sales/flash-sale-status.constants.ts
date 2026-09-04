/**
 * Flash Sale Status Constants
 * ফ্ল্যাশ সেল স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { FLASH_SALE } from './flash-sale.constants';

export const FLASH_SALE_STATUS = {
  // Common statuses
  ...STATUS,

  // Flash sale specific statuses
  DRAFT: FLASH_SALE.STATUS.DRAFT,
  SCHEDULED: FLASH_SALE.STATUS.SCHEDULED,
  ACTIVE: FLASH_SALE.STATUS.ACTIVE,
  PAUSED: FLASH_SALE.STATUS.PAUSED,
  ENDED: FLASH_SALE.STATUS.ENDED,
  CANCELLED: FLASH_SALE.STATUS.CANCELLED,
  ARCHIVED: FLASH_SALE.STATUS.ARCHIVED,

  // Additional flash sale statuses
  PREPARING: 'preparing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING_APPROVAL: 'pending_approval',
} as const;

export type FlashSaleStatusType = (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];
