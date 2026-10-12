// commands/delivery/index.ts
export * from './schedule-delivery.command.js'; export * from './schedule-delivery.handler.js';
export * from './assign-delivery-driver.command.js'; export * from './assign-delivery-driver.handler.js';
export * from './add-delivery-attempt.command.js'; export * from './add-delivery-attempt.handler.js';
export * from './complete-delivery.command.js'; export * from './complete-delivery.handler.js';
export * from './fail-delivery.command.js'; export * from './fail-delivery.handler.js';
export * from './reschedule-delivery.command.js'; export * from './reschedule-delivery.handler.js';
export * from './cancel-delivery.command.js'; export * from './cancel-delivery.handler.js';

import { ScheduleDeliveryHandler } from './schedule-delivery.handler.js';
import { AssignDeliveryDriverHandler } from './assign-delivery-driver.handler.js';
import { AddDeliveryAttemptHandler } from './add-delivery-attempt.handler.js';
import { CompleteDeliveryHandler } from './complete-delivery.handler.js';
import { FailDeliveryHandler } from './fail-delivery.handler.js';
import { RescheduleDeliveryHandler } from './reschedule-delivery.handler.js';
import { CancelDeliveryHandler } from './cancel-delivery.handler.js';

export const DELIVERY_COMMAND_HANDLERS = [
  ScheduleDeliveryHandler, AssignDeliveryDriverHandler, AddDeliveryAttemptHandler,
  CompleteDeliveryHandler, FailDeliveryHandler, RescheduleDeliveryHandler, CancelDeliveryHandler,
] as const;
