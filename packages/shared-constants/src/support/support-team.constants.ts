import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { SUPPORT_AGENT } from './support-agent.constants';

export const SUPPORT_TEAM = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  },
  TYPES: {
    ...COMMON_TYPES,
    GENERAL: 'general',
    TECHNICAL: 'technical',
    BILLING: 'billing',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    ESCALATION: 'escalation',
  },
  SUPPORT_AGENT: { ...SUPPORT_AGENT },
  TEAM_SIZE_MIN: 3,
  TEAM_SIZE_MAX: 20,
  SHIFT_ROTATION_DAYS: 7,
} as const;
