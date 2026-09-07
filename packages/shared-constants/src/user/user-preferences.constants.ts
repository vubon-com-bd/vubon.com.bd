import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_PREFERENCES = {
  ...COMMON_TYPES,
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
} as const;
