import { GetOrderHandler } from './get-order.handler.js';
import { GetOrderByNumberHandler } from './get-order-by-number.handler.js';
import { ListOrdersHandler } from './list-orders.handler.js';
import { ListOrdersByCustomerHandler } from './list-orders-by-customer.handler.js';
import { ListOrdersByVendorHandler } from './list-orders-by-vendor.handler.js';
import { GetOrderStatsHandler } from './get-order-stats.handler.js';

export * from './get-order.query.js';
export * from './get-order.handler.js';
export * from './get-order-by-number.query.js';
export * from './get-order-by-number.handler.js';
export * from './list-orders.query.js';
export * from './list-orders.handler.js';
export * from './list-orders-by-customer.query.js';
export * from './list-orders-by-customer.handler.js';
export * from './list-orders-by-vendor.query.js';
export * from './list-orders-by-vendor.handler.js';
export * from './get-order-stats.query.js';
export * from './get-order-stats.handler.js';

export const ORDER_QUERY_HANDLERS = [
  GetOrderHandler,
  GetOrderByNumberHandler,
  ListOrdersHandler,
  ListOrdersByCustomerHandler,
  ListOrdersByVendorHandler,
  GetOrderStatsHandler,
] as const;
