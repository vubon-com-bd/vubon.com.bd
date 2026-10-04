// application/commands/refund/index.ts
import { RequestRefundHandler } from './request-refund.handler.js';
import { ApproveRefundHandler } from './approve-refund.handler.js';
import { ProcessRefundHandler } from './process-refund.handler.js';
import { CompleteRefundHandler } from './complete-refund.handler.js';
import { FailRefundHandler } from './fail-refund.handler.js';
import { CancelRefundHandler } from './cancel-refund.handler.js';

export * from './request-refund.command.js';
export * from './request-refund.handler.js';
export * from './approve-refund.command.js';
export * from './approve-refund.handler.js';
export * from './process-refund.command.js';
export * from './process-refund.handler.js';
export * from './complete-refund.command.js';
export * from './complete-refund.handler.js';
export * from './fail-refund.command.js';
export * from './fail-refund.handler.js';
export * from './cancel-refund.command.js';
export * from './cancel-refund.handler.js';

export const REFUND_COMMAND_HANDLERS = [
  RequestRefundHandler,
  ApproveRefundHandler,
  ProcessRefundHandler,
  CompleteRefundHandler,
  FailRefundHandler,
  CancelRefundHandler,
] as const;
