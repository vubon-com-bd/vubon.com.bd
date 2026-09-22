import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const ABANDONMENT_CONFIG = Object.freeze({
  idleThresholdHours: getOptionalEnvInt('CART_ABANDONMENT_IDLE_HOURS', 4),
  minItemCount: getOptionalEnvInt('CART_ABANDONMENT_MIN_ITEMS', 1),
  detectorCronExpression: getOptionalEnv('CART_ABANDONMENT_CRON', '0 */1 * * *'),
  detectorBatchSize: getOptionalEnvInt('CART_ABANDONMENT_BATCH_SIZE', 500),
} as const);

function getOptionalEnv(key: string, fallback: string): string {
  const value = process.env[key];
  return value ?? fallback;
}
