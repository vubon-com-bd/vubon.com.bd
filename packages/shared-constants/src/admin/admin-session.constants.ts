import { SESSION as COMMON_SESSION } from '../common/session.constants';

export const ADMIN_SESSION = {
  ...COMMON_SESSION,
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;
