import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { ORDER_CANCEL } from '@vubon/shared-constants/business/order';

export const CANCEL_CONFIG = Object.freeze({
  WINDOW_HOURS: getOptionalEnvInt('ORDER_CANCEL_WINDOW_HOURS', ORDER_CANCEL.WINDOW_HOURS),
  ALLOW_AFTER_SHIPMENT: getOptionalEnvBool(
    'ORDER_CANCEL_ALLOW_AFTER_SHIPMENT',
    ORDER_CANCEL.ALLOW_AFTER_SHIPMENT,
  ),
  AUTO_APPROVE: getOptionalEnvBool('ORDER_CANCEL_AUTO_APPROVE', ORDER_CANCEL.AUTO_APPROVE),
  REFUND_AUTO: getOptionalEnvBool('ORDER_CANCEL_REFUND_AUTO', ORDER_CANCEL.REFUND_AUTO),
  RESTOCK_INVENTORY: getOptionalEnvBool(
    'ORDER_CANCEL_RESTOCK',
    ORDER_CANCEL.RESTOCK_INVENTORY,
  ),
  MAX_REASON_LENGTH: getOptionalEnvInt(
    'ORDER_CANCEL_MAX_REASON_LENGTH',
    ORDER_CANCEL.MAX_REASON_LENGTH,
  ),
});

export type CancelConfigType = typeof CANCEL_CONFIG;
