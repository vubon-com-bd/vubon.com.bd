import { GetReturnReasonHandler } from './get-return-reason.handler.js';
import { GetReturnReasonByCodeHandler } from './get-return-reason-by-code.handler.js';
import { ListReturnReasonsHandler } from './list-return-reasons.handler.js';
import { ListActiveReturnReasonsHandler } from './list-active-return-reasons.handler.js';
import { ListReturnReasonsByTypeHandler } from './list-return-reasons-by-type.handler.js';
import { GetReturnReasonStatsHandler } from './get-return-reason-stats.handler.js';

export const RETURN_REASON_QUERY_HANDLERS = [
  GetReturnReasonHandler,
  GetReturnReasonByCodeHandler,
  ListReturnReasonsHandler,
  ListActiveReturnReasonsHandler,
  ListReturnReasonsByTypeHandler,
  GetReturnReasonStatsHandler,
] as const;
