/**
 * Digest Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const DIGEST_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('DIGEST_ENABLED', true),
  maxItems: getOptionalEnvInt('DIGEST_MAX_ITEMS', 50),
  minItemsToSend: getOptionalEnvInt('DIGEST_MIN_ITEMS', 1),
  defaultSendHour: getOptionalEnvInt('DIGEST_DEFAULT_SEND_HOUR', 9),
  checkIntervalMinutes: getOptionalEnvInt('DIGEST_CHECK_INTERVAL', 15),
  timezoneDefault: 'Asia/Dhaka',
});
