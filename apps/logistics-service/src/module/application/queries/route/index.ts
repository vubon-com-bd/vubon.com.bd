// queries/route/index.ts
export * from './get-route.query.js'; export * from './get-route.handler.js';
export * from './list-routes.query.js'; export * from './list-routes.handler.js';

import { GetRouteHandler } from './get-route.handler.js';
import { ListRoutesHandler } from './list-routes.handler.js';

export const ROUTE_QUERY_HANDLERS = [GetRouteHandler, ListRoutesHandler] as const;
