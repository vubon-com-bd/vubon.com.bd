import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const LOGIN_ATTEMPT_CONFIG = Object.freeze({
  maxAttempts: getOptionalEnvInt('LOGIN_MAX_ATTEMPTS', 5),
  maxAttemptsPerIp: getOptionalEnvInt('LOGIN_MAX_ATTEMPTS_PER_IP', 20),
  attemptWindowSeconds: getOptionalEnvInt('LOGIN_ATTEMPT_WINDOW', 300),
  resetAfterSuccess: getOptionalEnvBool('LOGIN_RESET_AFTER_SUCCESS', true),
  trackByIp: getOptionalEnvBool('LOGIN_TRACK_BY_IP', true),
  trackByEmail: getOptionalEnvBool('LOGIN_TRACK_BY_EMAIL', true),
  trackByDevice: getOptionalEnvBool('LOGIN_TRACK_BY_DEVICE', true),
} as const);
