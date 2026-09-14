import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AUTH_STATUS = {
  ACTIVE: COMMON_STATUS.ACTIVE,
  INACTIVE: COMMON_STATUS.INACTIVE,
  PENDING: COMMON_STATUS.PENDING,
  LOCKED: 'locked',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  UNVERIFIED: 'unverified',
} as const;

export type AuthStatusType = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];
