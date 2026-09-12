import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_APPROVAL = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    IN_REVIEW: 'in_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CONDITIONAL: 'conditional',
  },
  ADMIN_PERMISSIONS: { ...ADMIN_PERMISSIONS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  APPROVAL_FLOW: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    HYBRID: 'hybrid',
  },
  APPROVAL_TIMEOUT_DAYS: 7,
  REJECTION_REASONS: [
    'incomplete_documents',
    'invalid_information',
    'policy_violation',
    'fraud_suspicion',
    'duplicate_application',
  ],
  AUTO_APPROVAL_THRESHOLD: 80,
} as const;
