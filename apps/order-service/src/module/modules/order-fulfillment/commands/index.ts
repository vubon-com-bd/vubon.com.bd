/**
 * OrderFulfillment Command Handlers Barrel
 * @module order-service/modules/order-fulfillment/commands
 */
import { StartFulfillmentHandler } from '../../../application/commands/fulfillment/start-fulfillment.handler.js';
import { PackOrderHandler } from '../../../application/commands/fulfillment/pack-order.handler.js';
import { ShipOrderHandler } from '../../../application/commands/fulfillment/ship-order.handler.js';
import { CompleteFulfillmentHandler } from '../../../application/commands/fulfillment/complete-fulfillment.handler.js';

export const ORDER_FULFILLMENT_COMMAND_HANDLERS = [
  StartFulfillmentHandler,
  PackOrderHandler,
  ShipOrderHandler,
  CompleteFulfillmentHandler,
] as const;

export {
  StartFulfillmentHandler,
  PackOrderHandler,
  ShipOrderHandler,
  CompleteFulfillmentHandler,
};
