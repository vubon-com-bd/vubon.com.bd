// commands/shipment/handlers.index.ts — Handler barrel
import { CreateShipmentHandler } from './create-shipment.handler.js';
import { UpdateShipmentHandler } from './update-shipment.handler.js';
import { CancelShipmentHandler } from './cancel-shipment.handler.js';
import { ConfirmShipmentHandler } from './confirm-shipment.handler.js';
import { StartProcessingHandler } from './start-processing.handler.js';
import { PackShipmentHandler } from './pack-shipment.handler.js';
import { PickUpShipmentHandler } from './pick-up-shipment.handler.js';
import { StartTransitHandler } from './start-transit.handler.js';
import { OutForDeliveryHandler } from './out-for-delivery.handler.js';
import { DeliverShipmentHandler } from './deliver-shipment.handler.js';
import { FailShipmentHandler } from './fail-shipment.handler.js';
import { ReturnShipmentHandler } from './return-shipment.handler.js';
import { PutOnHoldHandler } from './put-on-hold.handler.js';
import { MarkDelayedHandler } from './mark-delayed.handler.js';
import { ResumeFromHoldHandler } from './resume-from-hold.handler.js';
import { AssignCourierHandler } from './assign-courier.handler.js';
import { AssignWarehouseHandler } from './assign-warehouse.handler.js';

export const SHIPMENT_COMMAND_HANDLERS = [
  CreateShipmentHandler,
  UpdateShipmentHandler,
  CancelShipmentHandler,
  ConfirmShipmentHandler,
  StartProcessingHandler,
  PackShipmentHandler,
  PickUpShipmentHandler,
  StartTransitHandler,
  OutForDeliveryHandler,
  DeliverShipmentHandler,
  FailShipmentHandler,
  ReturnShipmentHandler,
  PutOnHoldHandler,
  MarkDelayedHandler,
  ResumeFromHoldHandler,
  AssignCourierHandler,
  AssignWarehouseHandler,
] as const;
