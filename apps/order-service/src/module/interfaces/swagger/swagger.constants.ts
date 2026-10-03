/**
 * Order-service Swagger shared constants
 * @module order-service/interfaces/swagger
 */
export const SWAGGER_TAGS = {
  ORDERS: 'orders',
  ORDER_ITEMS: 'order-items',
  CHECKOUTS: 'checkouts',
  DELIVERIES: 'deliveries',
  CANCELS: 'order-cancels',
  RETURNS: 'order-returns',
  FULFILLMENTS: 'order-fulfillments',
  TRACKING: 'order-tracking',
} as const;
