import { VERIFICATION as COMMON_VERIFICATION } from '../common/verification.constants';

export const AUTH_VERIFICATION = {
  ...COMMON_VERIFICATION,
  EMAIL: 'email',
  PHONE: 'phone',
  DOCUMENT: 'document',
} as const;
