import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_ACTIVITY = {
  ...COMMON_TYPES,
  LOGIN: 'login',
  LOGOUT: 'logout',
  PURCHASE: 'purchase',
} as const;
