import { ListAbandonedHandler } from '../../../application/queries/abandoned/list-abandoned.handler.js';
import { GetAbandonedStatsHandler } from '../../../application/queries/abandoned/get-abandoned-stats.handler.js';

export const ABANDONED_CART_QUERY_HANDLERS = [
  ListAbandonedHandler,
  GetAbandonedStatsHandler,
] as const;

export { ListAbandonedHandler, GetAbandonedStatsHandler };
