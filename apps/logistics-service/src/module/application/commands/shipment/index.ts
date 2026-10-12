// application/commands/shipment/index.ts — Shipment commands + handlers
export * from './create-shipment.command.js';
export * from './create-shipment.handler.js';
export * from './confirm-shipment.command.js';
export * from './confirm-shipment.handler.js';
export * from './start-processing.command.js';
export * from './start-processing.handler.js';
export * from './mark-packed.command.js';
export * from './mark-packed.handler.js';
export * from './generate-label.command.js';
export * from './generate-label.handler.js';
export * from './pickup-shipment.command.js';
export * from './pickup-shipment.handler.js';
export * from './mark-in-transit.command.js';
export * from './mark-in-transit.handler.js';
export * from './mark-out-for-delivery.command.js';
export * from './mark-out-for-delivery.handler.js';
export * from './deliver-shipment.command.js';
export * from './deliver-shipment.handler.js';
export * from './fail-shipment.command.js';
export * from './fail-shipment.handler.js';
export * from './mark-returned.command.js';
export * from './mark-returned.handler.js';
export * from './cancel-shipment.command.js';
export * from './cancel-shipment.handler.js';
export * from './put-on-hold.command.js';
export * from './put-on-hold.handler.js';
export * from './release-shipment.command.js';
export * from './release-shipment.handler.js';
export * from './mark-delayed.command.js';
export * from './mark-delayed.handler.js';
export * from './assign-courier.command.js';
export * from './assign-courier.handler.js';
export * from './assign-warehouse.command.js';
export * from './assign-warehouse.handler.js';
export * from './change-priority.command.js';
export * from './change-priority.handler.js';
export * from './update-shipment.command.js';
export * from './update-shipment.handler.js';

import { CreateShipmentHandler } from './create-shipment.handler.js';
import { ConfirmShipmentHandler } from './confirm-shipment.handler.js';
import { StartProcessingHandler } from './start-processing.handler.js';
import { MarkPackedHandler } from './mark-packed.handler.js';
import { GenerateLabelHandler } from './generate-label.handler.js';
import { PickupShipmentHandler } from './pickup-shipment.handler.js';
import { MarkInTransitHandler } from './mark-in-transit.handler.js';
import { MarkOutForDeliveryHandler } from './mark-out-for-delivery.handler.js';
import { DeliverShipmentHandler } from './deliver-shipment.handler.js';
import { FailShipmentHandler } from './fail-shipment.handler.js';
import { MarkReturnedHandler } from './mark-returned.handler.js';
import { CancelShipmentHandler } from './cancel-shipment.handler.js';
import { PutOnHoldHandler } from './put-on-hold.handler.js';
import { ReleaseShipmentHandler } from './release-shipment.handler.js';
import { MarkDelayedHandler } from './mark-delayed.handler.js';
import { AssignCourierHandler } from './assign-courier.handler.js';
import { AssignWarehouseHandler } from './assign-warehouse.handler.js';
import { ChangePriorityHandler } from './change-priority.handler.js';
import { UpdateShipmentHandler } from './update-shipment.handler.js';

export const SHIPMENT_COMMAND_HANDLERS = [
  CreateShipmentHandler,
  ConfirmShipmentHandler,
  StartProcessingHandler,
  MarkPackedHandler,
  GenerateLabelHandler,
  PickupShipmentHandler,
  MarkInTransitHandler,
  MarkOutForDeliveryHandler,
  DeliverShipmentHandler,
  FailShipmentHandler,
  MarkReturnedHandler,
  CancelShipmentHandler,
  PutOnHoldHandler,
  ReleaseShipmentHandler,
  MarkDelayedHandler,
  AssignCourierHandler,
  AssignWarehouseHandler,
  ChangePriorityHandler,
  UpdateShipmentHandler,
] as const;
