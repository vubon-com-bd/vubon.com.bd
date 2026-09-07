import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_DEPARTMENT = {
  ...COMMON_TYPES,
  IT: 'it',
  HR: 'hr',
  FINANCE: 'finance',
  OPERATIONS: 'operations',
} as const;
