/**
 * Refund Command Handlers — Barrel
 * @module payment-service/modules/refund/commands
 */
import { RequestRefundHandler } from '@application/commands/refund/request-refund.handler';
import { ApproveRefundHandler } from '@application/commands/refund/approve-refund.handler';
import { RejectRefundHandler } from '@application/commands/refund/reject-refund.handler';
import { PartialRefundHandler } from '@application/commands/refund/partial-refund.handler';

export const REFUND_COMMAND_HANDLERS = [
  RequestRefundHandler,
  ApproveRefundHandler,
  RejectRefundHandler,
  PartialRefundHandler,
] as const;
