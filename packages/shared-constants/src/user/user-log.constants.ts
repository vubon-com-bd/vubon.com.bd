import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const USER_LOG = {
  ...COMMON_TYPES,
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
} as const;
