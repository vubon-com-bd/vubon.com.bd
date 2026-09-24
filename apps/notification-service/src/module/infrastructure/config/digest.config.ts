import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const DIGEST_CONFIG = Object.freeze({
  maxItems: getOptionalEnvInt('DIGEST_MAX_ITEMS', 100),
  defaultFrequency: 'daily',
  sendHour: getOptionalEnvInt('DIGEST_SEND_HOUR', 9),
});
