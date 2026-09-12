import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { LEAD_STATUS } from './lead-status.constants';
import { LEAD_SOURCE } from './lead-source.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const LEAD_GENERATION = {
  STATUS: {
    ...STATUS,
    ...LEAD_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'lead:view',
    CREATE: 'lead:create',
    UPDATE: 'lead:update',
    DELETE: 'lead:delete',
    CONVERT: 'lead:convert',
    QUALIFY: 'lead:qualify',
  },
  LEAD_STATUS: { ...LEAD_STATUS },
  LEAD_SOURCE: { ...LEAD_SOURCE },
  USER_STATUS: { ...USER_STATUS },
  LEAD_SCORE_WEIGHTS: {
    EMAIL: 10,
    PHONE: 20,
    ADDRESS: 15,
    INTEREST: 25,
    BUDGET: 30,
  },
  MAX_LEADS_PER_USER: 100,
  LEAD_EXPIRY_DAYS: 90,
  MIN_LEAD_SCORE: 50,
  MAX_LEAD_SCORE: 100,
} as const;
