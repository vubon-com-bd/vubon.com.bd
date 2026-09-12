import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { ROLES } from '../../common/roles.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { VENDOR_PERMISSION } from './vendor-permission.constants';

export const VENDOR_TEAM = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    REMOVED: 'removed',
  },
  ROLES: {
    ...ROLES,
    VENDOR_OWNER: 'vendor_owner',
    VENDOR_ADMIN: 'vendor_admin',
    VENDOR_MANAGER: 'vendor_manager',
    VENDOR_STAFF: 'vendor_staff',
    VENDOR_VIEWER: 'vendor_viewer',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_PERMISSION: { ...VENDOR_PERMISSION },
  MAX_TEAM_MEMBERS: 50,
  INVITATION_EXPIRY_DAYS: 7,
  ROLE_PERMISSIONS: {
    VENDOR_OWNER: ['*'],
    VENDOR_ADMIN: ['vendor:*', '!vendor:delete'],
    VENDOR_MANAGER: ['vendor_product:*', 'vendor_order:*'],
    VENDOR_STAFF: ['vendor_product:view', 'vendor_order:view'],
    VENDOR_VIEWER: ['vendor:view', 'vendor_analytics:view'],
  },
} as const;
