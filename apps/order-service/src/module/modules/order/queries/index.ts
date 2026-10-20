/**
 * Order Query Handlers Barrel
 * @module order-service/modules/order/queries
 */
import { GetOrderHandler } from '../../../application/queries/order/get-order.handler.js';
import { GetOrderByNumberHandler } from '../../../application/queries/order/get-order-by-number.handler.js';
import { ListOrdersHandler } from '../../../application/queries/order/list-orders.handler.js';
import { ListOrdersByCustomerHandler } from '../../../application/queries/order/list-orders-by-customer.handler.js';
import { ListOrdersByVendorHandler } from '../../../application/queries/order/list-orders-by-vendor.handler.js';
import { GetOrderStatsHandler } from '../../../application/queries/order/get-order-stats.handler.js';

export const ORDER_QUERY_HANDLERS = [
  GetOrderHandler,
  GetOrderByNumberHandler,
  ListOrdersHandler,
  ListOrdersByCustomerHandler,
  ListOrdersByVendorHandler,
  GetOrderStatsHandler,
] as const;

export {
  GetOrderHandler,
  GetOrderByNumberHandler,
  ListOrdersHandler,
  ListOrdersByCustomerHandler,
  ListOrdersByVendorHandler,
  GetOrderStatsHandler,
};
