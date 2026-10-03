/**
 * Order feature config
 * @module order-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';

export const ORDER_CONFIG = Object.freeze({
  MAX_ITEMS: getOptionalEnvInt('ORDER_MAX_ITEMS', ORDER_LIMIT.MAX_ITEMS),
  MIN_AMOUNT: getOptionalEnvInt('ORDER_MIN_AMOUNT', ORDER_LIMIT.MIN_AMOUNT),
  MAX_AMOUNT: getOptionalEnvInt('ORDER_MAX_AMOUNT', ORDER_LIMIT.MAX_AMOUNT),
  PAYMENT_WINDOW_MINUTES: getOptionalEnvInt(
    'ORDER_PAYMENT_WINDOW_MINUTES',
    ORDER_LIMIT.PAYMENT_WINDOW_MINUTES,
  ),
  CONFIRMATION_WINDOW_HOURS: getOptionalEnvInt(
    'ORDER_CONFIRMATION_WINDOW_HOURS',
    ORDER_LIMIT.CONFIRMATION_WINDOW_HOURS,
  ),
  AUTO_CANCEL_HOURS: getOptionalEnvInt('ORDER_AUTO_CANCEL_HOURS', ORDER_LIMIT.AUTO_CANCEL_HOURS),
  ALLOW_GUEST_ORDER: getOptionalEnvBool('ORDER_ALLOW_GUEST', ORDER_LIMIT.ALLOW_GUEST_ORDER),
  MAX_NOTES_LENGTH: getOptionalEnvInt('ORDER_MAX_NOTES_LENGTH', ORDER_LIMIT.MAX_NOTES_LENGTH),
});

export type OrderConfigType = typeof ORDER_CONFIG;
