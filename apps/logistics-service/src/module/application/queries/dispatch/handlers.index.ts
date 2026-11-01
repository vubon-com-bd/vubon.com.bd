import { GetDispatchHandler } from './get.handler.js';
import { GetDispatchByNumberHandler } from './get-dispatch-by-number.handler.js';
import { ListDispatchesHandler } from './list-dispatches.handler.js';
import { ListByCourierDispatchHandler } from './list-by-courier.handler.js';
import { ListByDriverDispatchHandler } from './list-by-driver.handler.js';
import { ListPendingDispatchHandler } from './list-pending.handler.js';
import { ListInTransitDispatchHandler } from './list-in-transit.handler.js';
import { ListContainingShipmentDispatchHandler } from './list-containing-shipment.handler.js';
import { GetDispatchStatsHandler } from './get-dispatch-stats.handler.js';

export const DISPATCH_QUERY_HANDLERS = [
  GetDispatchHandler,
  GetDispatchByNumberHandler,
  ListDispatchesHandler,
  ListByCourierDispatchHandler,
  ListByDriverDispatchHandler,
  ListPendingDispatchHandler,
  ListInTransitDispatchHandler,
  ListContainingShipmentDispatchHandler,
  GetDispatchStatsHandler,
] as const;
