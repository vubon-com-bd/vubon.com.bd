/**
 * Funnel Query Handlers Barrel
 */
import { GetFunnelHandler } from '../../../application/queries/funnel/get-funnel.handler.js';
import { ListFunnelsHandler } from '../../../application/queries/funnel/list-funnels.handler.js';

export const FUNNEL_QUERY_HANDLERS = [
  GetFunnelHandler,
  ListFunnelsHandler,
] as const;

export { GetFunnelHandler, ListFunnelsHandler };
