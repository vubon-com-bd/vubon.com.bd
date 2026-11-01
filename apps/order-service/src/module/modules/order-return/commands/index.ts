/**
 * OrderReturn Command Handlers Barrel
 * @module order-service/modules/order-return/commands
 */
import { RequestReturnHandler } from '../../../application/commands/return/request-return.handler.js';
import { ApproveReturnHandler } from '../../../application/commands/return/approve-return.handler.js';
import { RejectReturnHandler } from '../../../application/commands/return/reject-return.handler.js';
import { CompleteReturnHandler } from '../../../application/commands/return/complete-return.handler.js';

export const ORDER_RETURN_COMMAND_HANDLERS = [
  RequestReturnHandler,
  ApproveReturnHandler,
  RejectReturnHandler,
  CompleteReturnHandler,
] as const;

export {
  RequestReturnHandler,
  ApproveReturnHandler,
  RejectReturnHandler,
  CompleteReturnHandler,
};
