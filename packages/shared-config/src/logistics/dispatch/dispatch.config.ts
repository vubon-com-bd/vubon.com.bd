/**
 * Dispatch configuration
 * @module shared-config/logistics/dispatch
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const DISPATCH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('DISPATCH_ENABLED', true),
  maxItemsPerDispatch: getOptionalEnvInt('DISPATCH_MAX_ITEMS', 500),
  maxBatchSize: getOptionalEnvInt('DISPATCH_MAX_BATCH', 100),
  cutoffHour: getOptionalEnvInt('DISPATCH_CUTOFF_HOUR', 16),
  sameDayCutoffHour: getOptionalEnvInt('DISPATCH_SAME_DAY_CUTOFF_HOUR', 12),
  autoDispatch: getOptionalEnvBool('DISPATCH_AUTO', false),
  requireManifest: getOptionalEnvBool('DISPATCH_REQUIRE_MANIFEST', true),
  printLabels: getOptionalEnvBool('DISPATCH_PRINT_LABELS', true),
  notifyCourier: getOptionalEnvBool('DISPATCH_NOTIFY_COURIER', true),
  maxPerDay: getOptionalEnvInt('DISPATCH_MAX_PER_DAY', 50),
});
