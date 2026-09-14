import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const CART_STATUS = {
  ACTIVE: COMMON_STATUS.ACTIVE,
  INACTIVE: COMMON_STATUS.INACTIVE,
  ABANDONED: 'abandoned',
  CONVERTED: 'converted',
  EXPIRED: COMMON_STATUS.EXPIRED,
  MERGED: 'merged',
  CLEARED: 'cleared',
} as const;

export type CartStatusType = (typeof CART_STATUS)[keyof typeof CART_STATUS];
