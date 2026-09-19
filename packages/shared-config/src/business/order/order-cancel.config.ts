/**
 * Order cancel configuration
 * @module shared-config/business/order
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ORDER_CANCEL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_CANCEL_ENABLED', true),
  windowHours: getOptionalEnvInt('ORDER_CANCEL_WINDOW_HOURS', 24),
  allowAfterShipment: getOptionalEnvBool('ORDER_CANCEL_AFTER_SHIP', false),
  autoApprove: getOptionalEnvBool('ORDER_CANCEL_AUTO_APPROVE', true),
  refundAuto: getOptionalEnvBool('ORDER_CANCEL_REFUND_AUTO', true),
  restockInventory: getOptionalEnvBool('ORDER_CANCEL_RESTOCK', true),
  maxReasonLength: getOptionalEnvInt('ORDER_CANCEL_MAX_REASON', 500),
});
