import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const EVENT_CONFIG = Object.freeze({
  maxBatchSize: getOptionalEnvInt('EVENT_MAX_BATCH_SIZE', 500),
  maxPayloadBytes: getOptionalEnvInt('EVENT_MAX_PAYLOAD_BYTES', 64 * 1024),
  maxPayloadKeys: getOptionalEnvInt('EVENT_MAX_PAYLOAD_KEYS', 50),
  dedupeWindowMs: getOptionalEnvInt('EVENT_DEDUPE_WINDOW_MS', 5 * 60 * 1000),
  trackFutureToleranceMs: getOptionalEnvInt('EVENT_FUTURE_TOLERANCE_MS', 60_000),
  autoProcess: getOptionalEnvBool('EVENT_AUTO_PROCESS', true),
  processConcurrency: getOptionalEnvInt('EVENT_PROCESS_CONCURRENCY', 10),
} as const);
