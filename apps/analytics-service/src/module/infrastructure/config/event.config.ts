/**
 * Event Configuration
 * @module analytics-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const EVENT_CONFIG = Object.freeze({
  ingestionEnabled: getOptionalEnvBool('ANALYTICS_EVENT_INGESTION_ENABLED', true),
  batchSize: getOptionalEnvInt('ANALYTICS_EVENT_BATCH_SIZE', 500),
  maxPayloadBytes: getOptionalEnvInt('ANALYTICS_EVENT_MAX_PAYLOAD_BYTES', 51200),
  maxFutureSkewMs: getOptionalEnvInt('ANALYTICS_EVENT_MAX_FUTURE_SKEW_MS', 300000),
  maxAgeMs: getOptionalEnvInt('ANALYTICS_EVENT_MAX_AGE_MS', 63072000000),
  rateLimitPerSecond: getOptionalEnvInt('ANALYTICS_EVENT_RATE_LIMIT', 10000),
  retentionDays: getOptionalEnvInt('ANALYTICS_EVENT_RETENTION_DAYS', 730),
  enrichWithGeo: getOptionalEnvBool('ANALYTICS_EVENT_ENRICH_GEO', true),
  enrichWithDevice: getOptionalEnvBool('ANALYTICS_EVENT_ENRICH_DEVICE', true),
  sampleRate: getOptionalEnvInt('ANALYTICS_EVENT_SAMPLE_RATE', 100),
  provider: getOptionalEnv('ANALYTICS_EVENT_PROVIDER', 'kafka'),
});
