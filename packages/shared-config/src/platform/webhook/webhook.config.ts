/**
 * Webhook base configuration
 * @module shared-config/platform/webhook
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const WEBHOOK_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('WEBHOOK_ENABLED', true),
  timeoutMs: getOptionalEnvInt('WEBHOOK_TIMEOUT_MS', 30000),
  maxPayloadSizeKb: getOptionalEnvInt('WEBHOOK_MAX_PAYLOAD_KB', 256),
  maxHeaders: getOptionalEnvInt('WEBHOOK_MAX_HEADERS', 20),
  maxActiveWebhooks: getOptionalEnvInt('WEBHOOK_MAX_ACTIVE', 50),
  trackDeliveries: getOptionalEnvBool('WEBHOOK_TRACK_DELIVERIES', true),
  retentionDays: getOptionalEnvInt('WEBHOOK_RETENTION_DAYS', 30),
});
