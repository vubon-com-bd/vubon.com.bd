// commands/fulfillment/index.ts
export * from './create-fulfillment.command.js'; export * from './create-fulfillment.handler.js';
export * from './assign-fulfillment.command.js'; export * from './assign-fulfillment.handler.js';
export * from './update-fulfillment.command.js'; export * from './update-fulfillment.handler.js';
export * from './start-fulfillment-processing.command.js'; export * from './start-fulfillment-processing.handler.js';
export * from './start-fulfillment-picking.command.js'; export * from './start-fulfillment-picking.handler.js';
export * from './start-fulfillment-packing.command.js'; export * from './start-fulfillment-packing.handler.js';
export * from './ready-to-ship-fulfillment.command.js'; export * from './ready-to-ship-fulfillment.handler.js';
export * from './ship-fulfillment.command.js'; export * from './ship-fulfillment.handler.js';
export * from './fulfill-fulfillment.command.js'; export * from './fulfill-fulfillment.handler.js';
export * from './mark-partial-fulfillment.command.js'; export * from './mark-partial-fulfillment.handler.js';
export * from './hold-fulfillment.command.js'; export * from './hold-fulfillment.handler.js';
export * from './release-fulfillment.command.js'; export * from './release-fulfillment.handler.js';
export * from './fail-fulfillment.command.js'; export * from './fail-fulfillment.handler.js';
export * from './cancel-fulfillment.command.js'; export * from './cancel-fulfillment.handler.js';

import { CreateFulfillmentHandler } from './create-fulfillment.handler.js';
import { AssignFulfillmentHandler } from './assign-fulfillment.handler.js';
import { UpdateFulfillmentHandler } from './update-fulfillment.handler.js';
import { StartFulfillmentProcessingHandler } from './start-fulfillment-processing.handler.js';
import { StartFulfillmentPickingHandler } from './start-fulfillment-picking.handler.js';
import { StartFulfillmentPackingHandler } from './start-fulfillment-packing.handler.js';
import { ReadyToShipFulfillmentHandler } from './ready-to-ship-fulfillment.handler.js';
import { ShipFulfillmentHandler } from './ship-fulfillment.handler.js';
import { FulfillFulfillmentHandler } from './fulfill-fulfillment.handler.js';
import { MarkPartialFulfillmentHandler } from './mark-partial-fulfillment.handler.js';
import { HoldFulfillmentHandler } from './hold-fulfillment.handler.js';
import { ReleaseFulfillmentHandler } from './release-fulfillment.handler.js';
import { FailFulfillmentHandler } from './fail-fulfillment.handler.js';
import { CancelFulfillmentHandler } from './cancel-fulfillment.handler.js';

export const FULFILLMENT_COMMAND_HANDLERS = [
  CreateFulfillmentHandler, AssignFulfillmentHandler, UpdateFulfillmentHandler,
  StartFulfillmentProcessingHandler, StartFulfillmentPickingHandler, StartFulfillmentPackingHandler,
  ReadyToShipFulfillmentHandler, ShipFulfillmentHandler, FulfillFulfillmentHandler,
  MarkPartialFulfillmentHandler, HoldFulfillmentHandler, ReleaseFulfillmentHandler,
  FailFulfillmentHandler, CancelFulfillmentHandler,
] as const;
