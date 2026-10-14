import { GetPayoutHandler } from '../../../application/queries/payout/get-payout.handler.js';
import { ListPayoutsHandler } from '../../../application/queries/payout/list-payouts.handler.js';
import { GetPayoutSummaryHandler } from '../../../application/queries/payout/get-payout-summary.handler.js';

export const VENDOR_PAYOUT_QUERY_HANDLERS = [
  GetPayoutHandler,
  ListPayoutsHandler,
  GetPayoutSummaryHandler,
] as const;

export { GetPayoutHandler, ListPayoutsHandler, GetPayoutSummaryHandler };
