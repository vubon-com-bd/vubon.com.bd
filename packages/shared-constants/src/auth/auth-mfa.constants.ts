import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_MFA = {
  ...COMMON_TYPES,
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  BACKUP: 'backup',
} as const;
