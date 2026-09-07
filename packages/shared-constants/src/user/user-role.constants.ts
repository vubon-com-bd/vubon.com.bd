import { ROLES as COMMON_ROLES } from '../common/roles.constants';

export const USER_ROLES = {
  ...COMMON_ROLES,
  USER: 'user',
  PREMIUM_USER: 'premium_user',
  GUEST: 'guest',
} as const;
