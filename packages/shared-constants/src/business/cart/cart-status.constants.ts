import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const CART_STATUS = {
  ...COMMON_STATUS,
  EMPTY: 'empty',
  ACTIVE: 'active',
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  ABANDONED: 'abandoned',
} as const;
