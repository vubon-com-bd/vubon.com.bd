/**
 * Cancel Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const CANCEL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_CANCEL_ENABLED', true),
  windowHours: getOptionalEnvInt('ORDER_SERVICE_CANCEL_WINDOW_HOURS', 24),
  allowAfterShipment: getOptionalEnvBool('ORDER_SERVICE_CANCEL_ALLOW_AFTER_SHIP', false),
  autoApprove: getOptionalEnvBool('ORDER_SERVICE_CANCEL_AUTO_APPROVE', true),
  refundAuto: getOptionalEnvBool('ORDER_SERVICE_CANCEL_REFUND_AUTO', true),
  restockInventory: getOptionalEnvBool('ORDER_SERVICE_CANCEL_RESTOCK', true),
  maxReasonLength: getOptionalEnvInt('ORDER_SERVICE_CANCEL_MAX_REASON', 500),
});

export type CancelConfig = typeof CANCEL_CONFIG;
