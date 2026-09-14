/**
 * Webhook signature configuration
 * @module shared-config/platform/webhook
 */
import { getOptionalEnv, getOptionalEnvInt } from '../../common/env/env.helper';

export const WEBHOOK_SIGNATURE_CONFIG = Object.freeze({
  enabled: true,
  algorithm: getOptionalEnv('WEBHOOK_SIGNATURE_ALGORITHM', 'sha256'),
  headerName: getOptionalEnv('WEBHOOK_SIGNATURE_HEADER', 'x-webhook-signature'),
  timestampHeaderName: getOptionalEnv('WEBHOOK_TIMESTAMP_HEADER', 'x-webhook-timestamp'),
  toleranceSeconds: getOptionalEnvInt('WEBHOOK_SIGNATURE_TOLERANCE', 300),
});
