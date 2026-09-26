import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const DEAL_STATUS = {
  DRAFT: COMMON_STATUS.DRAFT,
  SCHEDULED: 'scheduled',
  ACTIVE: COMMON_STATUS.ACTIVE,
  SOLD_OUT: 'sold_out',
  EXPIRED: COMMON_STATUS.EXPIRED,
  DISABLED: 'disabled',
  CANCELLED: 'cancelled',
} as const;

export type DealStatusType = (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];
