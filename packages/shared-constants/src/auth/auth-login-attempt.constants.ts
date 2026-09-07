import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AUTH_LOGIN_ATTEMPT = {
  ...COMMON_STATUS,
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
} as const;
