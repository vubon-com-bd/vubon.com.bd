import { GetRouteHandler } from './get-route.handler.js';
import { GetRouteByCodeHandler } from './get-route-by-code.handler.js';
import { ListRoutesHandler } from './list-routes.handler.js';
import { ListByWarehouseRouteHandler } from './list-by-warehouse.handler.js';
import { ListByDriverRouteHandler } from './list-by-driver.handler.js';
import { ListByScheduledDateRouteHandler } from './list-by-scheduled-date.handler.js';
import { ListActiveRoutesHandler } from './list-active-routes.handler.js';
import { ListPendingOptimizationHandler } from './list-pending-optimization.handler.js';
import { GetRouteStatsHandler } from './get-route-stats.handler.js';

export const ROUTE_QUERY_HANDLERS = [
  GetRouteHandler,
  GetRouteByCodeHandler,
  ListRoutesHandler,
  ListByWarehouseRouteHandler,
  ListByDriverRouteHandler,
  ListByScheduledDateRouteHandler,
  ListActiveRoutesHandler,
  ListPendingOptimizationHandler,
  GetRouteStatsHandler,
] as const;
