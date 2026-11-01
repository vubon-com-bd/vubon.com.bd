/**
 * Migrations & Retention Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const MIGRATIONS_INFRA_CONFIG = Object.freeze({
  runOnStartup: getOptionalEnvBool('MIGRATIONS_RUN_ON_STARTUP', false),
  autoRetention: getOptionalEnvBool('RETENTION_AUTO_ENABLED', true),
  notificationRetentionDays: getOptionalEnvInt('RETENTION_NOTIFICATION_DAYS', 90),
  webhookRetentionDays: getOptionalEnvInt('RETENTION_WEBHOOK_DAYS', 30),
  digestRetentionDays: getOptionalEnvInt('RETENTION_DIGEST_DAYS', 90),
  auditRetentionDays: getOptionalEnvInt('RETENTION_AUDIT_DAYS', 365),
  cleanupIntervalHours: getOptionalEnvInt('RETENTION_CLEANUP_INTERVAL_H', 24),
});
