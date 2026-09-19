/**
 * Report export configuration
 * @module shared-config/platform/reporting
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REPORT_EXPORT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REPORT_EXPORT_ENABLED', true),
  formats: Object.freeze(['pdf', 'csv', 'xlsx', 'json'] as const),
  expiryHours: getOptionalEnvInt('REPORT_EXPORT_EXPIRY_HOURS', 24),
  maxConcurrent: getOptionalEnvInt('REPORT_EXPORT_MAX_CONCURRENT', 10),
  maxPerUserPerHour: getOptionalEnvInt('REPORT_EXPORT_MAX_PER_USER', 20),
  compressionEnabled: getOptionalEnvBool('REPORT_EXPORT_COMPRESSION', true),
  encryptionEnabled: getOptionalEnvBool('REPORT_EXPORT_ENCRYPTION', false),
  streamingEnabled: getOptionalEnvBool('REPORT_EXPORT_STREAMING', true),
  batchSize: getOptionalEnvInt('REPORT_EXPORT_BATCH_SIZE', 10000),
});
