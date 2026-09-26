import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const BROADCAST_CONFIG = Object.freeze({
  maxBroadcasts: getOptionalEnvInt('BROADCAST_MAX', 100),
  batchSize: getOptionalEnvInt('BROADCAST_BATCH_SIZE', 500),
  maxRecipientsPerBroadcast: getOptionalEnvInt('BROADCAST_MAX_RECIPIENTS', 1000000),
});
