/**
 * SMS base configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SMS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SMS_ENABLED', true),
  provider: getOptionalEnv('SMS_PROVIDER', 'twilio'), // twilio | vonage | aws-sns | sslwireless
  senderId: getOptionalEnv('SMS_SENDER_ID', 'VUBON'),
  maxLength: getOptionalEnvInt('SMS_MAX_LENGTH', 160),
  unicodeMaxLength: getOptionalEnvInt('SMS_UNICODE_MAX_LENGTH', 70),
  maxSegments: getOptionalEnvInt('SMS_MAX_SEGMENTS', 5),
  trackDelivery: getOptionalEnvBool('SMS_TRACK_DELIVERY', true),
  rateLimitPerSecond: getOptionalEnvInt('SMS_RATE_LIMIT_PER_SECOND', 60),
});
