import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { USER_PERMISSIONS } from '../../user/user-permission.constants';

export const BRAND = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
  },
  PERMISSIONS: {
    ...USER_PERMISSIONS,
    MANAGE_BRAND: 'brand:manage',
  },
} as const;
