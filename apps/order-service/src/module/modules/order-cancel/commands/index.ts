/**
 * OrderCancel Command Handlers Barrel
 * @module order-service/modules/order-cancel/commands
 */
import { RequestCancelHandler } from '../../../application/commands/cancel/request-cancel.handler.js';
import { ApproveCancelHandler } from '../../../application/commands/cancel/approve-cancel.handler.js';
import { RejectCancelHandler } from '../../../application/commands/cancel/reject-cancel.handler.js';

export const ORDER_CANCEL_COMMAND_HANDLERS = [
  RequestCancelHandler,
  ApproveCancelHandler,
  RejectCancelHandler,
] as const;

export { RequestCancelHandler, ApproveCancelHandler, RejectCancelHandler };
