import { STATUS } from '../../common/status.constants';
import { ROLES } from '../../common/roles.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { USER_TYPES } from '../../user/user-type.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';

export const VENDOR = {
  STATUS: {
    ...STATUS,
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
    DELETED: 'deleted',
  },
  ROLES: {
    ...ROLES,
    VENDOR_OWNER: 'vendor_owner',
    VENDOR_MANAGER: 'vendor_manager',
    VENDOR_STAFF: 'vendor_staff',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'vendor:view',
    CREATE: 'vendor:create',
    UPDATE: 'vendor:update',
    DELETE: 'vendor:delete',
    MANAGE: 'vendor:manage',
    APPROVE: 'vendor:approve',
    SUSPEND: 'vendor:suspend',
    VERIFY: 'vendor:verify',
  },
  USER_STATUS: { ...USER_STATUS },
  USER_TYPES: { ...USER_TYPES },
  MAX_VENDORS_PER_USER: 5,
  MIN_AGE_DAYS: 180,
  REGISTRATION_FEE: 0,
} as const;
