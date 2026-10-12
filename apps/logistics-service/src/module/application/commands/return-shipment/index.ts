// commands/return-shipment/index.ts
export * from './request-return.command.js'; export * from './request-return.handler.js';
export * from './approve-return.command.js'; export * from './approve-return.handler.js';
export * from './reject-return.command.js'; export * from './reject-return.handler.js';
export * from './schedule-return-pickup.command.js'; export * from './schedule-return-pickup.handler.js';
export * from './pickup-return.command.js'; export * from './pickup-return.handler.js';
export * from './mark-return-in-transit.command.js'; export * from './mark-return-in-transit.handler.js';
export * from './receive-return.command.js'; export * from './receive-return.handler.js';
export * from './inspect-return.command.js'; export * from './inspect-return.handler.js';
export * from './complete-return.command.js'; export * from './complete-return.handler.js';
export * from './issue-return-refund.command.js'; export * from './issue-return-refund.handler.js';
export * from './cancel-return.command.js'; export * from './cancel-return.handler.js';
export * from './mark-return-lost.command.js'; export * from './mark-return-lost.handler.js';

import { RequestReturnHandler } from './request-return.handler.js';
import { ApproveReturnHandler } from './approve-return.handler.js';
import { RejectReturnHandler } from './reject-return.handler.js';
import { ScheduleReturnPickupHandler } from './schedule-return-pickup.handler.js';
import { PickupReturnHandler } from './pickup-return.handler.js';
import { MarkReturnInTransitHandler } from './mark-return-in-transit.handler.js';
import { ReceiveReturnHandler } from './receive-return.handler.js';
import { InspectReturnHandler } from './inspect-return.handler.js';
import { CompleteReturnHandler } from './complete-return.handler.js';
import { IssueReturnRefundHandler } from './issue-return-refund.handler.js';
import { CancelReturnHandler } from './cancel-return.handler.js';
import { MarkReturnLostHandler } from './mark-return-lost.handler.js';

export const RETURN_SHIPMENT_COMMAND_HANDLERS = [
  RequestReturnHandler, ApproveReturnHandler, RejectReturnHandler,
  ScheduleReturnPickupHandler, PickupReturnHandler, MarkReturnInTransitHandler,
  ReceiveReturnHandler, InspectReturnHandler, CompleteReturnHandler,
  IssueReturnRefundHandler, CancelReturnHandler, MarkReturnLostHandler,
] as const;
