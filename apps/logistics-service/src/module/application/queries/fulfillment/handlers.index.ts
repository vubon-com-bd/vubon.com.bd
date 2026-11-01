import { GetFulfillmentHandler } from './get.handler.js';
import { ListFulfillmentHandler } from './list.handler.js';
import { ListByOrderFulfillmentHandler } from './list-by-order.handler.js';
import { ListByVendorFulfillmentHandler } from './list-by-vendor.handler.js';
import { ListByWarehouseFulfillmentHandler } from './list-by-warehouse.handler.js';
import { ListPendingFulfillmentHandler } from './list-pending.handler.js';
import { ListSlaBreachedFulfillmentHandler } from './list-sla-breached.handler.js';
import { GetStatsFulfillmentHandler } from './get-stats.handler.js';

export const FULFILLMENT_QUERY_HANDLERS = [
  GetFulfillmentHandler,
  ListFulfillmentHandler,
  ListByOrderFulfillmentHandler,
  ListByVendorFulfillmentHandler,
  ListByWarehouseFulfillmentHandler,
  ListPendingFulfillmentHandler,
  ListSlaBreachedFulfillmentHandler,
  GetStatsFulfillmentHandler,
] as const;
