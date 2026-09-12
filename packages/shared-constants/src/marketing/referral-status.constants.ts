import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const REFERRAL_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;
