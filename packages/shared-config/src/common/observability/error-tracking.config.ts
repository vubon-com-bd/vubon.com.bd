/**
 * Error tracking configuration (Sentry, Rollbar, etc.)
 * @module shared-config/common/observability
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../env/env.helper';

export const ERROR_TRACKING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ERROR_TRACKING_ENABLED', false),
  provider: getOptionalEnv('ERROR_TRACKING_PROVIDER', 'sentry'), // sentry | rollbar | custom
  dsn: getOptionalEnv('ERROR_TRACKING_DSN', ''),
  environment: getOptionalEnv('NODE_ENV', 'development'),
  release: getOptionalEnv('APP_VERSION', '1.0.0'),
  sampleRate: getOptionalEnvInt('ERROR_TRACKING_SAMPLE_RATE', 100),
  tracesSampleRate: getOptionalEnvInt('ERROR_TRACKING_TRACES_SAMPLE_RATE', 0),
  attachStacktrace: getOptionalEnvBool('ERROR_TRACKING_ATTACH_STACKTRACE', true),
  maxBreadcrumbs: getOptionalEnvInt('ERROR_TRACKING_MAX_BREADCRUMBS', 100),
} as const);

export type ErrorTrackingConfig = typeof ERROR_TRACKING_CONFIG;
