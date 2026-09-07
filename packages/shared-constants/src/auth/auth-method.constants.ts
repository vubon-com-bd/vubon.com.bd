import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_METHOD = {
  ...COMMON_TYPES,
  PASSWORD: 'password',
  OTP: 'otp',
  BIOMETRIC: 'biometric',
} as const;
