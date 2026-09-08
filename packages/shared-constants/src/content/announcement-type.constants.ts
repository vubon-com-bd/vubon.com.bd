import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const ANNOUNCEMENT_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    GENERAL: 'general',
    PROMOTIONAL: 'promotional',
    MAINTENANCE: 'maintenance',
    SECURITY: 'security',
    FEATURE: 'feature',
    UPDATE: 'update',
    EVENT: 'event',
    URGENT: 'urgent',
  },
} as const;
