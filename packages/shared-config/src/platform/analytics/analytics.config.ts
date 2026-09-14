/**
 * Analytics base configuration
 * @module shared-config/platform/analytics
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ANALYTICS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ANALYTICS_ENABLED', true),
  provider: getOptionalEnv('ANALYTICS_PROVIDER', 'ga'), // ga | mixpanel | custom
  trackPageViews: getOptionalEnvBool('ANALYTICS_TRACK_PAGE_VIEWS', true),
  trackEvents: getOptionalEnvBool('ANALYTICS_TRACK_EVENTS', true),
  trackErrors: getOptionalEnvBool('ANALYTICS_TRACK_ERRORS', true),
  trackPerformance: getOptionalEnvBool('ANALYTICS_TRACK_PERFORMANCE', false),
  anonymizeIp: getOptionalEnvBool('ANALYTICS_ANONYMIZE_IP', true),
  respectDnt: getOptionalEnvBool('ANALYTICS_RESPECT_DNT', true),
  sampleRate: getOptionalEnvInt('ANALYTICS_SAMPLE_RATE', 100),
  batchSize: getOptionalEnvInt('ANALYTICS_BATCH_SIZE', 20),
  flushIntervalMs: getOptionalEnvInt('ANALYTICS_FLUSH_INTERVAL_MS', 10000),
});
