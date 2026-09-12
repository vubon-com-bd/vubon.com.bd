import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ORDER_FULFILLMENT } from '@vubon/shared-constants/src/business/checkout/order-fulfillment.constants';
import { OrderSchema } from './order.schema';
import { OrderItemSchema } from './order-item.schema';

const orderFulfillmentStatusKeys = Object.keys(ORDER_FULFILLMENT.STATUS) as [string, ...string[]];
const orderFulfillmentTypeKeys = Object.keys(ORDER_FULFILLMENT.TYPES) as [string, ...string[]];

export const OrderFulfillmentSchema = BaseSchema.extend({
  fulfillmentId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  status: z.enum(orderFulfillmentStatusKeys),
  type: z.enum(orderFulfillmentTypeKeys),
  items: z.array(
    z.object({
      itemId: z.string().uuid(),
      orderItem: OrderItemSchema,
      quantity: z.number().int().min(1),
      status: z.enum(['pending', 'packed', 'shipped', 'delivered']),
    })
  ),
  warehouseId: z.string(),
  warehouseName: z.string(),
  packedAt: z.date().optional(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  trackingNumber: z.string().optional(),
  carrier: z.string().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
