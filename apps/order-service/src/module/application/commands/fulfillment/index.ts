import { StartFulfillmentHandler } from './start-fulfillment.handler.js';
import { PackOrderHandler } from './pack-order.handler.js';
import { ShipOrderHandler } from './ship-order.handler.js';
import { CompleteFulfillmentHandler } from './complete-fulfillment.handler.js';

export * from './start-fulfillment.command.js';
export * from './start-fulfillment.handler.js';
export * from './pack-order.command.js';
export * from './pack-order.handler.js';
export * from './ship-order.command.js';
export * from './ship-order.handler.js';
export * from './complete-fulfillment.command.js';
export * from './complete-fulfillment.handler.js';

export const FULFILLMENT_COMMAND_HANDLERS = [
  StartFulfillmentHandler,
  PackOrderHandler,
  ShipOrderHandler,
  CompleteFulfillmentHandler,
] as const;
