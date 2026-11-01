import { CreateFulfillmentHandler } from './create.handler.js';
import { StartFulfillmentHandler } from './start.handler.js';
import { BeginPickingFulfillmentHandler } from './begin-picking.handler.js';
import { BeginPackingFulfillmentHandler } from './begin-packing.handler.js';
import { MarkReadyToShipFulfillmentHandler } from './mark-ready-to-ship.handler.js';
import { ShipFulfillmentHandler } from './ship.handler.js';
import { FulfillFulfillmentHandler } from './fulfill.handler.js';
import { PartiallyFulfillFulfillmentHandler } from './partially-fulfill.handler.js';
import { CancelFulfillmentHandler } from './cancel.handler.js';
import { FailFulfillmentHandler } from './fail.handler.js';
import { PutOnHoldFulfillmentHandler } from './put-on-hold.handler.js';
import { ResumeFromHoldFulfillmentHandler } from './resume-from-hold.handler.js';

export const FULFILLMENT_COMMAND_HANDLERS = [
  CreateFulfillmentHandler,
  StartFulfillmentHandler,
  BeginPickingFulfillmentHandler,
  BeginPackingFulfillmentHandler,
  MarkReadyToShipFulfillmentHandler,
  ShipFulfillmentHandler,
  FulfillFulfillmentHandler,
  PartiallyFulfillFulfillmentHandler,
  CancelFulfillmentHandler,
  FailFulfillmentHandler,
  PutOnHoldFulfillmentHandler,
  ResumeFromHoldFulfillmentHandler,
] as const;
