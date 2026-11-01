import { GetCommissionHandler } from '../../../application/queries/commission/get-commission.handler.js';
import { ListCommissionsHandler } from '../../../application/queries/commission/list-commissions.handler.js';
import { GetCommissionSummaryHandler } from '../../../application/queries/commission/get-commission-summary.handler.js';

export const VENDOR_COMMISSION_QUERY_HANDLERS = [
  GetCommissionHandler,
  ListCommissionsHandler,
  GetCommissionSummaryHandler,
] as const;

export { GetCommissionHandler, ListCommissionsHandler, GetCommissionSummaryHandler };
