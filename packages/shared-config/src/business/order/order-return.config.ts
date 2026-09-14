/**
 * Order return configuration
 * @module shared-config/business/order
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ORDER_RETURN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_RETURN_ENABLED', true),
  windowDays: getOptionalEnvInt('ORDER_RETURN_WINDOW_DAYS', 7),
  maxDaysAfterDelivery: getOptionalEnvInt('ORDER_RETURN_MAX_DAYS', 30),
  pickupWindowDays: getOptionalEnvInt('ORDER_RETURN_PICKUP_DAYS', 3),
  inspectionDays: getOptionalEnvInt('ORDER_RETURN_INSPECTION_DAYS', 2),
  refundProcessingDays: getOptionalEnvInt('ORDER_RETURN_REFUND_DAYS', 7),
  restockFeePercent: getOptionalEnvInt('ORDER_RETURN_RESTOCK_FEE', 0),
  freeReturn: getOptionalEnvBool('ORDER_RETURN_FREE', true),
  requireImages: getOptionalEnvBool('ORDER_RETURN_REQUIRE_IMAGES', true),
  maxImages: getOptionalEnvInt('ORDER_RETURN_MAX_IMAGES', 5),
});
