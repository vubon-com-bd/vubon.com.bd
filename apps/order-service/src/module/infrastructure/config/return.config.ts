/**
 * Return Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const RETURN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_RETURN_ENABLED', true),
  windowDays: getOptionalEnvInt('ORDER_SERVICE_RETURN_WINDOW_DAYS', 7),
  maxDaysAfterDelivery: getOptionalEnvInt('ORDER_SERVICE_RETURN_MAX_DAYS_AFTER_DELIVERY', 30),
  pickupWindowDays: getOptionalEnvInt('ORDER_SERVICE_RETURN_PICKUP_WINDOW_DAYS', 3),
  inspectionDays: getOptionalEnvInt('ORDER_SERVICE_RETURN_INSPECTION_DAYS', 2),
  refundProcessingDays: getOptionalEnvInt('ORDER_SERVICE_RETURN_REFUND_PROCESSING_DAYS', 7),
  restockFeePercent: getOptionalEnvInt('ORDER_SERVICE_RETURN_RESTOCK_FEE_PERCENT', 0),
  freeReturn: getOptionalEnvBool('ORDER_SERVICE_RETURN_FREE', true),
  maxImages: getOptionalEnvInt('ORDER_SERVICE_RETURN_MAX_IMAGES', 5),
  maxReasonLength: getOptionalEnvInt('ORDER_SERVICE_RETURN_MAX_REASON', 1000),
});

export type ReturnConfig = typeof RETURN_CONFIG;
