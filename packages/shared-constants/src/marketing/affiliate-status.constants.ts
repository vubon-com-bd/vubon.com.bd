import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AFFILIATE_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
} as const;
