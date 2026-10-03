import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { ORDER_FULFILLMENT } from '@vubon/shared-constants/business/order';

export const FULFILLMENT_CONFIG = Object.freeze({
  MAX_ITEMS_PER_SHIPMENT: getOptionalEnvInt(
    'ORDER_FULFILLMENT_MAX_ITEMS_PER_SHIPMENT',
    ORDER_FULFILLMENT.MAX_ITEMS_PER_SHIPMENT,
  ),
  AUTO_FULFILL: getOptionalEnvBool(
    'ORDER_FULFILLMENT_AUTO',
    ORDER_FULFILLMENT.AUTO_FULFILL,
  ),
  ALLOW_PARTIAL: getOptionalEnvBool(
    'ORDER_FULFILLMENT_ALLOW_PARTIAL',
    ORDER_FULFILLMENT.ALLOW_PARTIAL,
  ),
  NOTIFY_CUSTOMER: getOptionalEnvBool(
    'ORDER_FULFILLMENT_NOTIFY',
    ORDER_FULFILLMENT.NOTIFY_CUSTOMER,
  ),
  SLA_HOURS: getOptionalEnvInt('ORDER_FULFILLMENT_SLA_HOURS', ORDER_FULFILLMENT.SLA_HOURS),
});

export type FulfillmentConfigType = typeof FULFILLMENT_CONFIG;
