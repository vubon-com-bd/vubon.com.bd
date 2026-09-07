import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AUTH_TYPES = {
  ...COMMON_TYPES,
  BASIC: 'basic',
  ADVANCED: 'advanced',
} as const;
