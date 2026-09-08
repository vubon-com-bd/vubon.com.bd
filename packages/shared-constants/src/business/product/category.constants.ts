import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { USER_PERMISSIONS } from '../../user/user-permission.constants';

export const CATEGORY = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
  },
  PERMISSIONS: {
    ...USER_PERMISSIONS,
    MANAGE_CATEGORY: 'category:manage',
  },
} as const;
