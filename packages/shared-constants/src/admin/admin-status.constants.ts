import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const ADMIN_STATUS = {
  ...COMMON_STATUS,
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BLOCKED: 'blocked',
} as const;
