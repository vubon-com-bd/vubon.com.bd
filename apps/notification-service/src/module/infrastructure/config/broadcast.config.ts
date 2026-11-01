/**
 * Broadcast Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const BROADCAST_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BROADCAST_ENABLED', true),
  batchSize: getOptionalEnvInt('BROADCAST_BATCH_SIZE', 1000),
  batchDelayMs: getOptionalEnvInt('BROADCAST_BATCH_DELAY_MS', 1000),
  maxConcurrent: getOptionalEnvInt('BROADCAST_MAX_CONCURRENT', 5),
  throttlePerSecond: getOptionalEnvInt('BROADCAST_THROTTLE_PER_SEC', 500),
  requireApproval: getOptionalEnvBool('BROADCAST_REQUIRE_APPROVAL', true),
  testModeEnabled: getOptionalEnvBool('BROADCAST_TEST_MODE', true),
});
