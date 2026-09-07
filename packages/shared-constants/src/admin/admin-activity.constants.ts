import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_ACTIVITY = {
  ...COMMON_TYPES,
  LOGIN: 'login',
  LOGOUT: 'logout',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
} as const;
