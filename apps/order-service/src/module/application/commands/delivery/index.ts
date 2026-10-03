import { ScheduleDeliveryHandler } from './schedule-delivery.handler.js';
import { RescheduleDeliveryHandler } from './reschedule-delivery.handler.js';
import { ConfirmDeliveryHandler } from './confirm-delivery.handler.js';

export * from './schedule-delivery.command.js';
export * from './schedule-delivery.handler.js';
export * from './reschedule-delivery.command.js';
export * from './reschedule-delivery.handler.js';
export * from './confirm-delivery.command.js';
export * from './confirm-delivery.handler.js';

export const DELIVERY_COMMAND_HANDLERS = [
  ScheduleDeliveryHandler,
  RescheduleDeliveryHandler,
  ConfirmDeliveryHandler,
] as const;
