import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const USER_STATUS = {
  ...COMMON_STATUS,
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;
