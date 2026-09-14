/**
 * Notification base configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const NOTIFICATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('NOTIFICATION_ENABLED', true),
  emailEnabled: getOptionalEnvBool('NOTIFY_EMAIL_ENABLED', true),
  smsEnabled: getOptionalEnvBool('NOTIFY_SMS_ENABLED', true),
  pushEnabled: getOptionalEnvBool('NOTIFY_PUSH_ENABLED', true),
  inAppEnabled: getOptionalEnvBool('NOTIFY_IN_APP_ENABLED', true),
  webhookEnabled: getOptionalEnvBool('NOTIFY_WEBHOOK_ENABLED', false),
  retryAttempts: getOptionalEnvInt('NOTIFY_RETRY_ATTEMPTS', 3),
  retryDelayMs: getOptionalEnvInt('NOTIFY_RETRY_DELAY_MS', 60000),
  batchSize: getOptionalEnvInt('NOTIFY_BATCH_SIZE', 500),
  rateLimitPerSecond: getOptionalEnvInt('NOTIFY_RATE_LIMIT_PER_SECOND', 100),
  queueEnabled: getOptionalEnvBool('NOTIFY_QUEUE_ENABLED', true),
});
