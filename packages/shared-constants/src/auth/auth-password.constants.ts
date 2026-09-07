import { VALIDATION as COMMON_VALIDATION } from '../common/validation.constants';

export const AUTH_PASSWORD = {
  ...COMMON_VALIDATION,
  MIN_LENGTH: 8,
  MAX_LENGTH: 32,
  PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
} as const;
