/**
 * Distributed tracing configuration
 * @module shared-config/common/observability
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../env/env.helper';

export const TRACING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TRACING_ENABLED', false),
  serviceName: getOptionalEnv('TRACING_SERVICE_NAME', 'vubon-api'),
  exporter: getOptionalEnv('TRACING_EXPORTER', 'otlp'), // otlp | jaeger | zipkin | none
  endpoint: getOptionalEnv('TRACING_ENDPOINT', ''),
  sampleRate: getOptionalEnvInt('TRACING_SAMPLE_RATE', 100),
  maxAttributes: getOptionalEnvInt('TRACING_MAX_ATTRIBUTES', 128),
  maxEventsPerSpan: getOptionalEnvInt('TRACING_MAX_EVENTS', 128),
} as const);

export type TracingConfig = typeof TRACING_CONFIG;
