/**
 * Fulfillment Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const FULFILLMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_FULFILLMENT_ENABLED', true),
  autoFulfill: getOptionalEnvBool('ORDER_SERVICE_FULFILLMENT_AUTO', false),
  allowPartial: getOptionalEnvBool('ORDER_SERVICE_FULFILLMENT_ALLOW_PARTIAL', true),
  notifyCustomer: getOptionalEnvBool('ORDER_SERVICE_FULFILLMENT_NOTIFY', true),
  maxItemsPerShipment: getOptionalEnvInt('ORDER_SERVICE_FULFILLMENT_MAX_ITEMS', 50),
  slaHours: getOptionalEnvInt('ORDER_SERVICE_FULFILLMENT_SLA_HOURS', 48),
});

export type FulfillmentConfig = typeof FULFILLMENT_CONFIG;
