/**
 * OrderTracking Command Handlers Barrel
 * @module order-service/modules/order-tracking/commands
 */
import { AddTrackingHandler } from '../../../application/commands/tracking/add-tracking.handler.js';
import { UpdateTrackingHandler } from '../../../application/commands/tracking/update-tracking.handler.js';

export const ORDER_TRACKING_COMMAND_HANDLERS = [
  AddTrackingHandler,
  UpdateTrackingHandler,
] as const;

export { AddTrackingHandler, UpdateTrackingHandler };
