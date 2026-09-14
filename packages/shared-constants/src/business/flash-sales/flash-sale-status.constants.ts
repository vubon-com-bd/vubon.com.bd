import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const FLASH_SALE_STATUS = {
  DRAFT: COMMON_STATUS.DRAFT,
  SCHEDULED: 'scheduled',
  ACTIVE: COMMON_STATUS.ACTIVE,
  PAUSED: 'paused',
  ENDED: 'ended',
  EXPIRED: COMMON_STATUS.EXPIRED,
  CANCELLED: 'cancelled',
  ARCHIVED: COMMON_STATUS.ARCHIVED,
} as const;

export type FlashSaleStatusType = (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];
