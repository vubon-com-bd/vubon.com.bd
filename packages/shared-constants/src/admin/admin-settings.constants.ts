import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ADMIN_SETTINGS = {
  ...COMMON_TYPES,
  SYSTEM: 'system',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
} as const;
