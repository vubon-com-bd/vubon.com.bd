/**
 * User Activity Configuration
 * @module shared-config/user/activity
 */
import {
  USER_ACTIVITY,
  USER_ACTIVITY_CATEGORY,
} from '@vubon/shared-constants/user';
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '../../common/env/env.helper.js';

export const ACTIVITY_CONFIG = Object.freeze({
  allowedTypes: Object.freeze(Object.values(USER_ACTIVITY)),
  allowedCategories: Object.freeze(Object.values(USER_ACTIVITY_CATEGORY)),

  trackIp: getOptionalEnvBool('ACTIVITY_TRACK_IP', true),
  trackUserAgent: getOptionalEnvBool('ACTIVITY_TRACK_UA', true),
  trackDevice: getOptionalEnvBool('ACTIVITY_TRACK_DEVICE', true),
  trackMetadata: getOptionalEnvBool('ACTIVITY_TRACK_METADATA', true),

  retentionDays: getOptionalEnvInt('ACTIVITY_RETENTION_DAYS', 90),
  maxEntriesPerUser: getOptionalEnvInt('ACTIVITY_MAX_PER_USER', 10000),
  batchSize: getOptionalEnvInt('ACTIVITY_BATCH_SIZE', 100),
  cleanupIntervalHours: getOptionalEnvInt('ACTIVITY_CLEANUP_INTERVAL_HOURS', 24),

  emitEvents: getOptionalEnvBool('ACTIVITY_EMIT_EVENTS', true),
  anonymizeOld: getOptionalEnvBool('ACTIVITY_ANONYMIZE_OLD', false),
});
