import { ROLES as COMMON_ROLES } from '../common/roles.constants';

export const AUTH_ROLES = {
  ...COMMON_ROLES,
  AUTH_USER: 'auth_user',
  AUTH_GUEST: 'auth_guest',
} as const;
