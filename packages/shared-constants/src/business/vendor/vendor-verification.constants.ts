import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_VERIFICATION = {
  STATUS: {
    ...COMMON_STATUS,
    ...VERIFICATION,
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
  },
  VERIFICATION: { ...VERIFICATION },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  VERIFICATION_LEVELS: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    PREMIUM: 'premium',
  },
  VERIFICATION_TIMEOUT_HOURS: 72,
  MAX_VERIFICATION_ATTEMPTS: 3,
  REVERIFICATION_DAYS: 365,
} as const;
