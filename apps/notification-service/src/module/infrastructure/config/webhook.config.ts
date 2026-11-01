/**
 * Webhook Config
 * @module notification-service/infrastructure/config
 */
import {
  WEBHOOK_CONFIG,
  WEBHOOK_RETRY_CONFIG,
  WEBHOOK_SIGNATURE_CONFIG,
} from '@vubon/shared-config/platform';

export const WEBHOOK_INFRA_CONFIG = Object.freeze({
  base: WEBHOOK_CONFIG,
  retry: WEBHOOK_RETRY_CONFIG,
  signature: WEBHOOK_SIGNATURE_CONFIG,
});
