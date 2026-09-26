/**
 * Order Core Schema
 * @module shared-schemas/business/order
 *
 * Order entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema, PositiveMoneySchema } from '../../common/primitives/money.schema';
import { AddressSchema } from '../../common/geo/address.schema';
import { OrderStatusSchema, OrderPrioritySchema } from './order-status.schema';
import { OrderItemPublicSchema } from './order-item.schema';
import { OrderReturnPublicSchema } from './order-return.schema';
import { OrderTrackingPublicSchema } from './order-tracking.schema';
import { OrderFulfillmentPublicSchema } from './order-fulfillment.schema';

export const OrderTypeSchema = z.enum([
  'regular',
  'pre_order',
  'backorder',
  'subscription',
  'exchange',
  'replacement',
]);

export const OrderSchema = BaseEntitySchema.extend({
  orderNumber: z.string().min(1).max(50),
  userId: UuidSchema,
  vendorIds: z.array(UuidSchema).max(100).optional(),
  type: OrderTypeSchema,
  status: OrderStatusSchema,
  priority: OrderPrioritySchema,
  items: z.array(OrderItemPublicSchema).min(1).max(100),
  subtotal: PositiveMoneySchema,
  discountAmount: MoneySchema,
  taxAmount: MoneySchema,
  shippingAmount: MoneySchema,
  total: PositiveMoneySchema,
  currency: z.string().length(3),
  paymentId: UuidSchema.optional(),
  paymentStatus: z.string().max(50).optional(),
  paymentMethod: z.string().max(50).optional(),
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema.optional(),
  shippingMethod: z.string().max(100).optional(),
  trackingNumber: z.string().max(100).optional(),
  returns: z.array(OrderReturnPublicSchema).max(20).optional(),
  tracking: z.array(OrderTrackingPublicSchema).max(500).optional(),
  fulfillments: z.array(OrderFulfillmentPublicSchema).max(20).optional(),
  notes: z.string().max(1000).optional(),
  customerNotes: z.string().max(1000).optional(),
  confirmedAt: z.string().datetime().optional(),
  shippedAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
});

export const OrderPublicSchema = OrderSchema.pick({
  id: true,
  orderNumber: true,
  status: true,
  priority: true,
  items: true,
  subtotal: true,
  discountAmount: true,
  taxAmount: true,
  shippingAmount: true,
  total: true,
  currency: true,
  trackingNumber: true,
  createdAt: true,
  shippedAt: true,
  deliveredAt: true,
});

export const OrderSummarySchema = OrderSchema.pick({
  id: true,
  orderNumber: true,
  status: true,
  total: true,
  currency: true,
  createdAt: true,
}).extend({
  itemCount: z.number().int().nonnegative(),
});

export const OrderStatsSchema = z.object({
  totalOrders: z.number().int().nonnegative(),
  totalRevenue: MoneySchema,
  averageOrderValue: MoneySchema,
  currency: z.string().length(3),
  byStatus: z.record(z.string(), z.number().int().nonnegative()),
});

export const OrderListFilterSchema = z.object({
  userId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  status: OrderStatusSchema.optional(),
  priority: OrderPrioritySchema.optional(),
  type: OrderTypeSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  minTotal: z.number().nonnegative().optional(),
  maxTotal: z.number().nonnegative().optional(),
  search: z.string().max(200).optional(),
});

export type OrderTypeSchemaType = z.infer<typeof OrderTypeSchema>;
export type OrderSchemaType = z.infer<typeof OrderSchema>;
export type OrderPublicSchemaType = z.infer<typeof OrderPublicSchema>;
export type OrderSummarySchemaType = z.infer<typeof OrderSummarySchema>;
export type OrderStatsSchemaType = z.infer<typeof OrderStatsSchema>;
export type OrderListFilterSchemaType = z.infer<typeof OrderListFilterSchema>;
