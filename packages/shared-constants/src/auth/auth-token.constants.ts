import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_TOKEN = {
  ...COMMON_TYPES,
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET: 'reset',
} as const;
