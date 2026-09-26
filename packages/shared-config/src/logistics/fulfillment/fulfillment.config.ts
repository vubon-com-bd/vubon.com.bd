/**
 * Fulfillment configuration
 * @module shared-config/logistics/fulfillment
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const FULFILLMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FULFILLMENT_ENABLED', true),
  autoFulfill: getOptionalEnvBool('FULFILLMENT_AUTO', false),
  allowPartial: getOptionalEnvBool('FULFILLMENT_PARTIAL', true),
  maxItemsPerFulfillment: getOptionalEnvInt('FULFILLMENT_MAX_ITEMS', 100),
  maxFulfillmentsPerOrder: getOptionalEnvInt('FULFILLMENT_MAX_PER_ORDER', 10),
  slaHours: getOptionalEnvInt('FULFILLMENT_SLA_HOURS', 48),
  pickingTimeoutMinutes: getOptionalEnvInt('FULFILLMENT_PICKING_TIMEOUT_MIN', 60),
  packingTimeoutMinutes: getOptionalEnvInt('FULFILLMENT_PACKING_TIMEOUT_MIN', 30),
  requireQc: getOptionalEnvBool('FULFILLMENT_REQUIRE_QC', true),
  requireLabel: getOptionalEnvBool('FULFILLMENT_REQUIRE_LABEL', true),
  notifyCustomer: getOptionalEnvBool('FULFILLMENT_NOTIFY', true),
});
