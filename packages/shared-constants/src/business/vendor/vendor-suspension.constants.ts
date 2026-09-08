import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_SUSPENSION = {
  STATUS: {
    ...COMMON_STATUS,
    WARNING: 'warning',
    TEMPORARY: 'temporary',
    PERMANENT: 'permanent',
    LIFTED: 'lifted',
    APPEALED: 'appealed',
  },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  SUSPENSION_REASONS: [
    'policy_violation',
    'fraud_activity',
    'poor_performance',
    'customer_complaints',
    'payment_issue',
    'document_expiry',
  ],
  SUSPENSION_GRACE_DAYS: 7,
  MAX_WARNINGS: 3,
  REINSTATEMENT_DAYS: 30,
} as const;
