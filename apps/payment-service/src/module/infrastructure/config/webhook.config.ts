/**
 * Webhook Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const WEBHOOK_INFRA_CONFIG = Object.freeze({
  signatureVerification: getOptionalEnvBool('WEBHOOK_SIGNATURE_VERIFY', true),
  retryMaxAttempts: getOptionalEnvInt('WEBHOOK_RETRY_MAX_ATTEMPTS', 5),
  retryDelayMs: getOptionalEnvInt('WEBHOOK_RETRY_DELAY_MS', 30_000),
  toleranceSeconds: getOptionalEnvInt('WEBHOOK_TOLERANCE_SECONDS', 300),
  retentionDays: getOptionalEnvInt('WEBHOOK_RETENTION_DAYS', 30),
  idempotencyWindowHours: getOptionalEnvInt('WEBHOOK_IDEMPOTENCY_HOURS', 24),
});

export type WebhookInfraConfig = typeof WEBHOOK_INFRA_CONFIG;
