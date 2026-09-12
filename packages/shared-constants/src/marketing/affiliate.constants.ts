import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { AFFILIATE_STATUS } from './affiliate-status.constants';
import { AFFILIATE_COMMISSION } from './affiliate-commission.constants';
import { AFFILIATE_PAYOUT } from './affiliate-payout.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const AFFILIATE = {
  STATUS: {
    ...STATUS,
    ...AFFILIATE_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'affiliate:view',
    CREATE: 'affiliate:create',
    UPDATE: 'affiliate:update',
    DELETE: 'affiliate:delete',
    APPROVE: 'affiliate:approve',
  },
  AFFILIATE_STATUS: { ...AFFILIATE_STATUS },
  AFFILIATE_COMMISSION: { ...AFFILIATE_COMMISSION },
  AFFILIATE_PAYOUT: { ...AFFILIATE_PAYOUT },
  USER_STATUS: { ...USER_STATUS },
  REFERRAL_COOKIE_DAYS: 30,
  MIN_WITHDRAWAL_AMOUNT: 500,
  MAX_COMMISSION_RATE: 50,
  DEFAULT_COMMISSION_RATE: 10,
} as const;
