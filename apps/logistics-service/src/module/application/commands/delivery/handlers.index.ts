import { CreateDeliveryHandler } from './create-delivery.handler.js';
import { ScheduleDeliveryHandler } from './schedule-delivery.handler.js';
import { AssignDeliveryHandler } from './assign-delivery.handler.js';
import { PickUpDeliveryHandler } from './pick-up-delivery.handler.js';
import { DeliveryStartTransitHandler } from './start-transit-delivery.handler.js';
import { DeliveryOutForDeliveryHandler } from './out-for-delivery-delivery.handler.js';
import { ArriveDeliveryHandler } from './arrive-delivery.handler.js';
import { CompleteDeliveryHandler } from './complete-delivery.handler.js';
import { FailDeliveryHandler } from './fail-delivery.handler.js';
import { RescheduleDeliveryHandler } from './reschedule-delivery.handler.js';
import { CancelDeliveryHandler } from './cancel-delivery.handler.js';
import { RefuseDeliveryHandler } from './refuse-delivery.handler.js';

export const DELIVERY_COMMAND_HANDLERS = [
  CreateDeliveryHandler,
  ScheduleDeliveryHandler,
  AssignDeliveryHandler,
  PickUpDeliveryHandler,
  DeliveryStartTransitHandler,
  DeliveryOutForDeliveryHandler,
  ArriveDeliveryHandler,
  CompleteDeliveryHandler,
  FailDeliveryHandler,
  RescheduleDeliveryHandler,
  CancelDeliveryHandler,
  RefuseDeliveryHandler,
] as const;
