import { GetFulfillmentHandler } from './get-fulfillment.handler.js';
import { ListFulfillmentsHandler } from './list-fulfillments.handler.js';

export * from './get-fulfillment.query.js';
export * from './get-fulfillment.handler.js';
export * from './list-fulfillments.query.js';
export * from './list-fulfillments.handler.js';

export const FULFILLMENT_QUERY_HANDLERS = [
  GetFulfillmentHandler,
  ListFulfillmentsHandler,
] as const;
