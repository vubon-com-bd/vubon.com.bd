/**
 * Refund Query Handlers — Barrel
 * @module payment-service/modules/refund/queries
 */
import { GetRefundHandler } from '@application/queries/refund/get-refund.handler';
import { ListRefundsHandler } from '@application/queries/refund/list-refunds.handler';

export const REFUND_QUERY_HANDLERS = [
  GetRefundHandler,
  ListRefundsHandler,
] as const;
