/**
 * Order Item Schema
 * @module shared-schemas/business/order
 *
 * Values আসে shared-constants/business/order-item.constants থেকে।
 */

import { z } from 'zod';
import { ORDER_ITEM_STATUS, ORDER_ITEM_TYPE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema, PositiveMoneySchema } from '../../common/primitives/money.schema';

export const OrderItemStatusSchema = z.enum(
  Object.values(ORDER_ITEM_STATUS) as [string, ...string[]]
);

export const OrderItemTypeSchema = z.enum(Object.values(ORDER_ITEM_TYPE) as [string, ...string[]]);

export const OrderItemSchema = z.object({
  id: UuidSchema,
  orderId: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  sku: z.string().min(1).max(64),
  name: z.string().min(1).max(200),
  imageUrl: z.string().url().optional(),
  type: OrderItemTypeSchema,
  status: OrderItemStatusSchema,
  quantity: z.number().int().min(1).max(999),
  unitPrice: PositiveMoneySchema,
  compareAtPrice: MoneySchema.optional(),
  subtotal: PositiveMoneySchema,
  discountAmount: MoneySchema.optional(),
  taxAmount: MoneySchema.optional(),
  shippingAmount: MoneySchema.optional(),
  total: PositiveMoneySchema,
  currency: z.string().length(3),
  attributes: z.record(z.string(), z.string()).optional(),
  notes: z.string().max(500).optional(),
});

export const OrderItemPublicSchema = OrderItemSchema.pick({
  id: true,
  productId: true,
  variantId: true,
  name: true,
  imageUrl: true,
  quantity: true,
  unitPrice: true,
  total: true,
  status: true,
});

export type OrderItemStatusSchemaType = z.infer<typeof OrderItemStatusSchema>;
export type OrderItemTypeSchemaType = z.infer<typeof OrderItemTypeSchema>;
export type OrderItemSchemaType = z.infer<typeof OrderItemSchema>;
export type OrderItemPublicSchemaType = z.infer<typeof OrderItemPublicSchema>;
