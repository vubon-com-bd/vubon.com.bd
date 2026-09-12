import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_LOG = {
  ...COMMON_TYPES,
  ACCESS: 'access',
  ERROR: 'error',
  SECURITY: 'security',
} as const;
