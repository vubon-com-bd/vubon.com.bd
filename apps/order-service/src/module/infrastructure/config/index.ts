/**
 * Order Service — Infrastructure Config Barrel
 * @module order-service/infrastructure/config
 */
export * from './db-mode.config.js';
export * from './order.config.js';
export * from './order-item.config.js';
export * from './checkout.config.js';
export * from './delivery.config.js';
export * from './cancel.config.js';
export * from './return.config.js';
export * from './fulfillment.config.js';
export * from './tracking.config.js';

// ─── Aggregate — all configs in one place ──
import { ORDER_CONFIG } from './order.config.js';
import { ORDER_ITEM_CONFIG } from './order-item.config.js';
import { CHECKOUT_CONFIG } from './checkout.config.js';
import { DELIVERY_CONFIG } from './delivery.config.js';
import { CANCEL_CONFIG } from './cancel.config.js';
import { RETURN_CONFIG } from './return.config.js';
import { FULFILLMENT_CONFIG } from './fulfillment.config.js';
import { TRACKING_CONFIG } from './tracking.config.js';

export const ORDER_INFRA_CONFIG = Object.freeze({
  order: ORDER_CONFIG,
  orderItem: ORDER_ITEM_CONFIG,
  checkout: CHECKOUT_CONFIG,
  delivery: DELIVERY_CONFIG,
  cancel: CANCEL_CONFIG,
  return: RETURN_CONFIG,
  fulfillment: FULFILLMENT_CONFIG,
  tracking: TRACKING_CONFIG,
} as const);

export type OrderInfraConfig = typeof ORDER_INFRA_CONFIG;
