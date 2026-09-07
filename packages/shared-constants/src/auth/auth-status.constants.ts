import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const AUTH_STATUS = {
  ...COMMON_STATUS,
  PENDING_VERIFICATION: 'pending_verification',
  LOCKED: 'locked',
} as const;
