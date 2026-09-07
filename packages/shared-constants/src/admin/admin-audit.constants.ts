import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_AUDIT = {
  ...COMMON_TYPES,
  SYSTEM: 'system',
  USER: 'user',
  CONFIG: 'config',
} as const;
