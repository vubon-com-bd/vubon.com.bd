import { PERMISSIONS as COMMON_PERMISSIONS } from '../common/permissions.constants';

export const AUTH_PERMISSIONS = {
  ...COMMON_PERMISSIONS,
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
} as const;
