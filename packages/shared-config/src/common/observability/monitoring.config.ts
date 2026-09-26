/**
 * Monitoring configuration
 * @module shared-config/common/observability
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../env/env.helper';

export const MONITORING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MONITORING_ENABLED', true),
  serviceName: getOptionalEnv('MONITORING_SERVICE_NAME', 'vubon-api'),
  environment: getOptionalEnv('NODE_ENV', 'development'),
  metricsEnabled: getOptionalEnvBool('METRICS_ENABLED', true),
  metricsPath: getOptionalEnv('METRICS_PATH', '/metrics'),
  healthCheckPath: getOptionalEnv('HEALTH_CHECK_PATH', '/health'),
  readinessPath: getOptionalEnv('READINESS_PATH', '/ready'),
  livenessPath: getOptionalEnv('LIVENESS_PATH', '/live'),
  collectIntervalMs: getOptionalEnvInt('METRICS_INTERVAL_MS', 15000),
} as const);

export type MonitoringConfig = typeof MONITORING_CONFIG;
