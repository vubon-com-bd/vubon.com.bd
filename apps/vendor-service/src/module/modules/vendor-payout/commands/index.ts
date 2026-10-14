import { RequestPayoutHandler } from '../../../application/commands/payout/request-payout.handler.js';
import { ApprovePayoutHandler } from '../../../application/commands/payout/approve-payout.handler.js';
import { RejectPayoutHandler } from '../../../application/commands/payout/reject-payout.handler.js';
import { ProcessPayoutHandler } from '../../../application/commands/payout/process-payout.handler.js';

export const VENDOR_PAYOUT_COMMAND_HANDLERS = [
  RequestPayoutHandler,
  ApprovePayoutHandler,
  RejectPayoutHandler,
  ProcessPayoutHandler,
] as const;

export {
  RequestPayoutHandler,
  ApprovePayoutHandler,
  RejectPayoutHandler,
  ProcessPayoutHandler,
};
