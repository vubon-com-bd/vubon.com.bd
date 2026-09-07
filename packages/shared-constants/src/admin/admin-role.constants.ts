import { ROLES as COMMON_ROLES } from '../common/roles.constants';
import { USER_ROLES } from '../user/user-role.constants';

export const ADMIN_ROLES = {
  ...COMMON_ROLES,
  ...USER_ROLES,
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;
