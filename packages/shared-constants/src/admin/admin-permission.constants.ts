import { PERMISSIONS as COMMON_PERMISSIONS } from '../common/permissions.constants';
import { USER_PERMISSIONS } from '../user/user-permission.constants';

export const ADMIN_PERMISSIONS = {
  ...COMMON_PERMISSIONS,
  ...USER_PERMISSIONS,
  MANAGE_USERS: 'admin:manage_users',
  MANAGE_SYSTEM: 'admin:manage_system',
  VIEW_ANALYTICS: 'admin:view_analytics',
} as const;
