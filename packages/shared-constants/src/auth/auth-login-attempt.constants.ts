export const AUTH_LOGIN_ATTEMPT = {
  MAX_ATTEMPTS: 5,
  MAX_ATTEMPTS_PER_IP: 20,
  LOCKOUT_DURATION_SECONDS: 900,
  ATTEMPT_WINDOW_SECONDS: 300,
  RESET_AFTER_SUCCESS: true,
  TRACK_BY_IP: true,
  TRACK_BY_EMAIL: true,
  TRACK_BY_DEVICE: true,
} as const;

export const AUTH_LOGIN_ATTEMPT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  LOCKED: 'locked',
  BLOCKED: 'blocked',
} as const;

export type AuthLoginAttemptStatusType =
  (typeof AUTH_LOGIN_ATTEMPT_STATUS)[keyof typeof AUTH_LOGIN_ATTEMPT_STATUS];
