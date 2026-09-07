import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_SOCIAL = {
  ...COMMON_TYPES,
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  GITHUB: 'github',
} as const;
