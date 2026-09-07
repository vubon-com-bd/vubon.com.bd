import { VERIFICATION as COMMON_VERIFICATION } from '../common/verification.constants';

export const USER_VERIFICATION = {
  ...COMMON_VERIFICATION,
  IDENTITY: 'identity',
  ADDRESS: 'address',
  INCOME: 'income',
} as const;
