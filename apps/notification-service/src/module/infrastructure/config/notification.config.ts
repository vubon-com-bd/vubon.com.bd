import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const NOTIFICATION_CONFIG = Object.freeze({
  maxRecipients: getOptionalEnvInt('NOTIFICATION_MAX_RECIPIENTS', 1000000),
  maxPerBatch: getOptionalEnvInt('NOTIFICATION_MAX_PER_BATCH', 1000),
  retentionDays: getOptionalEnvInt('NOTIFICATION_RETENTION_DAYS', 365),
  deliveryTimeoutSeconds: getOptionalEnvInt('NOTIFICATION_DELIVERY_TIMEOUT', 60),
  retryAttempts: getOptionalEnvInt('NOTIFICATION_RETRY_ATTEMPTS', 3),
  enableInApp: getOptionalEnvBool('NOTIFICATION_ENABLE_IN_APP', true),
});
