/**
 * Delivery configuration
 * @module shared-config/logistics/delivery
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const DELIVERY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('DELIVERY_ENABLED', true),
  maxAttempts: getOptionalEnvInt('DELIVERY_MAX_ATTEMPTS', 3),
  attemptIntervalHours: getOptionalEnvInt('DELIVERY_ATTEMPT_INTERVAL_HOURS', 24),
  gracePeriodMinutes: getOptionalEnvInt('DELIVERY_GRACE_PERIOD_MIN', 15),
  rescheduleWindowHours: getOptionalEnvInt('DELIVERY_RESCHEDULE_WINDOW_HOURS', 48),
  proofRequired: getOptionalEnvBool('DELIVERY_PROOF_REQUIRED', true),
  signatureRequired: getOptionalEnvBool('DELIVERY_SIGNATURE_REQUIRED', false),
  photoRequired: getOptionalEnvBool('DELIVERY_PHOTO_REQUIRED', true),
  otpRequired: getOptionalEnvBool('DELIVERY_OTP_REQUIRED', false),
  otpLength: getOptionalEnvInt('DELIVERY_OTP_LENGTH', 6),
  contactlessAvailable: getOptionalEnvBool('DELIVERY_CONTACTLESS', true),
  sameDayCutoffHour: getOptionalEnvInt('DELIVERY_SAME_DAY_CUTOFF_HOUR', 12),
});
