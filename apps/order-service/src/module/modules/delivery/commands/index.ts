/**
 * Delivery Command Handlers Barrel
 * @module order-service/modules/delivery/commands
 */
import { ScheduleDeliveryHandler } from '../../../application/commands/delivery/schedule-delivery.handler.js';
import { RescheduleDeliveryHandler } from '../../../application/commands/delivery/reschedule-delivery.handler.js';
import { ConfirmDeliveryHandler } from '../../../application/commands/delivery/confirm-delivery.handler.js';

export const DELIVERY_COMMAND_HANDLERS = [
  ScheduleDeliveryHandler,
  RescheduleDeliveryHandler,
  ConfirmDeliveryHandler,
] as const;

export {
  ScheduleDeliveryHandler,
  RescheduleDeliveryHandler,
  ConfirmDeliveryHandler,
};
