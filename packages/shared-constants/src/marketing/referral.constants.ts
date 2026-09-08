import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { REFERRAL_STATUS } from './referral-status.constants';
import { REFERRAL_REWARD } from './referral-reward.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const REFERRAL = {
  STATUS: {
    ...STATUS,
    ...REFERRAL_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'referral:view',
    CREATE: 'referral:create',
    UPDATE: 'referral:update',
    DELETE: 'referral:delete',
  },
  REFERRAL_STATUS: { ...REFERRAL_STATUS },
  REFERRAL_REWARD: { ...REFERRAL_REWARD },
  USER_STATUS: { ...USER_STATUS },
  REFERRAL_CODE_LENGTH: 8,
  REFERRAL_CODE_PREFIX: 'REF',
  MAX_REFERRALS_PER_USER: 100,
  REFERRAL_EXPIRY_DAYS: 30,
} as const;
