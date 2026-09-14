/**
 * Auth Status Constants
 * @module shared-constants/auth/auth-status
 *
 * Note: Does NOT spread COMMON_STATUS — nested objects (ORDER, PAYMENT, USER)
 * would leak into this flat enum. We reference only auth-relevant scalar values.
 */

import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AUTH_STATUS = {
  // Referenced from common (downward layer, scalar values only)
  ACTIVE: COMMON_STATUS.ACTIVE,
  INACTIVE: COMMON_STATUS.INACTIVE,
  PENDING: COMMON_STATUS.PENDING,
  BLOCKED: COMMON_STATUS.BLOCKED,
  SUSPENDED: COMMON_STATUS.SUSPENDED,

  // Auth-specific statuses
  PENDING_VERIFICATION: 'pending_verification',
  LOCKED: 'locked',
} as const;

export type AuthStatusValue = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];
