import { GetSettlementHandler } from '../../../application/queries/settlement/get-settlement.handler.js';
import { ListSettlementsHandler } from '../../../application/queries/settlement/list-settlements.handler.js';

export const VENDOR_SETTLEMENT_QUERY_HANDLERS = [
  GetSettlementHandler,
  ListSettlementsHandler,
] as const;

export { GetSettlementHandler, ListSettlementsHandler };
