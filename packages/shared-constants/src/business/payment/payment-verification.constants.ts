import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { PAYMENT_STATUS } from './payment-status.constants';

export const PAYMENT_VERIFICATION = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    SUSPICIOUS: 'suspicious',
    FLAGGED: 'flagged',
    REJECTED: 'rejected',
  },
  VERIFICATION: { ...VERIFICATION },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  VERIFICATION_TIMEOUT_HOURS: 24,
  MAX_VERIFICATION_ATTEMPTS: 5,
  REQUIRED_CHECKS: ['signature', 'amount', 'currency', 'merchant_id'],
} as const;
