import { RequestReturnHandler } from './request-return.handler.js';
import { ApproveReturnHandler } from './approve-return.handler.js';
import { RejectReturnHandler } from './reject-return.handler.js';
import { CompleteReturnHandler } from './complete-return.handler.js';

export * from './request-return.command.js';
export * from './request-return.handler.js';
export * from './approve-return.command.js';
export * from './approve-return.handler.js';
export * from './reject-return.command.js';
export * from './reject-return.handler.js';
export * from './complete-return.command.js';
export * from './complete-return.handler.js';

export const RETURN_COMMAND_HANDLERS = [
  RequestReturnHandler,
  ApproveReturnHandler,
  RejectReturnHandler,
  CompleteReturnHandler,
] as const;
