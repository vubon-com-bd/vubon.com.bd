import { CreateReturnShipmentHandler } from './create-return-shipment.handler.js';
import { ApproveReturnShipmentHandler } from './approve.handler.js';
import { RejectReturnShipmentHandler } from './reject.handler.js';
import { SchedulePickupReturnShipmentHandler } from './schedule-pickup.handler.js';
import { MarkPickedUpReturnShipmentHandler } from './mark-picked-up.handler.js';
import { StartTransitReturnShipmentHandler } from './start-transit.handler.js';
import { MarkReceivedReturnShipmentHandler } from './mark-received.handler.js';
import { InspectReturnShipmentHandler } from './inspect.handler.js';
import { CompleteReturnShipmentHandler } from './complete.handler.js';
import { CancelReturnShipmentHandler } from './cancel.handler.js';
import { MarkLostReturnShipmentHandler } from './mark-lost.handler.js';

export const RETURN_SHIPMENT_COMMAND_HANDLERS = [
  CreateReturnShipmentHandler,
  ApproveReturnShipmentHandler,
  RejectReturnShipmentHandler,
  SchedulePickupReturnShipmentHandler,
  MarkPickedUpReturnShipmentHandler,
  StartTransitReturnShipmentHandler,
  MarkReceivedReturnShipmentHandler,
  InspectReturnShipmentHandler,
  CompleteReturnShipmentHandler,
  CancelReturnShipmentHandler,
  MarkLostReturnShipmentHandler,
] as const;
