/**
 * Brute-force protection configuration
 * @module shared-config/security/brute-force
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const BRUTE_FORCE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BRUTE_FORCE_ENABLED', true),
  maxAttempts: getOptionalEnvInt('BRUTE_FORCE_MAX_ATTEMPTS', 5),
  windowMs: getOptionalEnvInt('BRUTE_FORCE_WINDOW_MS', 900000), // 15 min
  blockDurationMs: getOptionalEnvInt('BRUTE_FORCE_BLOCK_MS', 900000),
  progressiveDelay: getOptionalEnvBool('BRUTE_FORCE_PROGRESSIVE', true),
  progressiveDelayBaseMs: getOptionalEnvInt('BRUTE_FORCE_BASE_DELAY_MS', 1000),
  trackByIp: getOptionalEnvBool('BRUTE_FORCE_TRACK_IP', true),
  trackByEmail: getOptionalEnvBool('BRUTE_FORCE_TRACK_EMAIL', true),
  trackByDevice: getOptionalEnvBool('BRUTE_FORCE_TRACK_DEVICE', false),
  permanentBlockAfter: getOptionalEnvInt('BRUTE_FORCE_PERMANENT_AFTER', 20),
  notifyOnBlock: getOptionalEnvBool('BRUTE_FORCE_NOTIFY', true),
});
