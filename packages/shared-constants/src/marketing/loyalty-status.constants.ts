import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const LOYALTY_STATUS = {
  ...COMMON_STATUS,
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
} as const;
