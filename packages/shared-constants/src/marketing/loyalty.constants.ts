import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { LOYALTY_STATUS } from './loyalty-status.constants';
import { LOYALTY_POINTS } from './loyalty-points.constants';
import { LOYALTY_TIER } from './loyalty-tier.constants';
import { LOYALTY_REWARD } from './loyalty-reward.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const LOYALTY = {
  STATUS: {
    ...STATUS,
    ...LOYALTY_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'loyalty:view',
    CREATE: 'loyalty:create',
    UPDATE: 'loyalty:update',
    DELETE: 'loyalty:delete',
    MANAGE: 'loyalty:manage',
  },
  LOYALTY_STATUS: { ...LOYALTY_STATUS },
  LOYALTY_POINTS: { ...LOYALTY_POINTS },
  LOYALTY_TIER: { ...LOYALTY_TIER },
  LOYALTY_REWARD: { ...LOYALTY_REWARD },
  USER_STATUS: { ...USER_STATUS },
  POINTS_PER_PURCHASE: 1,
  POINTS_REDEMPTION_RATE: 0.01,
  MAX_POINTS_PER_USER: 100000,
  POINTS_EXPIRY_DAYS: 365,
} as const;
