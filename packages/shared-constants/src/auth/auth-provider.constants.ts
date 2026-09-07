import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_PROVIDER = {
  ...COMMON_TYPES,
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
} as const;
