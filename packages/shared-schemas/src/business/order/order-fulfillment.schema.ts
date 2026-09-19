/**
 * Order Fulfillment Schema
 * @module shared-schemas/business/order
 *
 * Values আসে shared-constants/business/order-fulfillment.constants থেকে।
 */

import { z } from 'zod';
import { ORDER_FULFILLMENT_STATUS, ORDER_FULFILLMENT_TYPE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const OrderFulfillmentStatusSchema = z.enum(
  Object.values(ORDER_FULFILLMENT_STATUS) as [string, ...string[]]
);

export const OrderFulfillmentTypeSchema = z.enum(
  Object.values(ORDER_FULFILLMENT_TYPE) as [string, ...string[]]
);

export const OrderFulfillmentSchema = z.object({
  id: UuidSchema,
  orderId: UuidSchema,
  vendorId: UuidSchema.optional(),
  status: OrderFulfillmentStatusSchema,
  type: OrderFulfillmentTypeSchema,
  itemIds: z.array(UuidSchema).min(1).max(100),
  trackingNumber: z.string().max(100).optional(),
  courierId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  shippingCost: MoneySchema.optional(),
  currency: z.string().length(3),
  fulfilledAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const OrderFulfillmentPublicSchema = OrderFulfillmentSchema.pick({
  id: true,
  status: true,
  type: true,
  trackingNumber: true,
  fulfilledAt: true,
  deliveredAt: true,
});

export type OrderFulfillmentStatusSchemaType = z.infer<typeof OrderFulfillmentStatusSchema>;
export type OrderFulfillmentTypeSchemaType = z.infer<typeof OrderFulfillmentTypeSchema>;
export type OrderFulfillmentSchemaType = z.infer<typeof OrderFulfillmentSchema>;
export type OrderFulfillmentPublicSchemaType = z.infer<typeof OrderFulfillmentPublicSchema>;
