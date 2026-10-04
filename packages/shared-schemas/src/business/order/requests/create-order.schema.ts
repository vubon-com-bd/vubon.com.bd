/**
 * Create Order Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';
import { AddressSchema } from '../../../common/geo/address.schema.js';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';

export const CreateOrderItemInputSchema = z.object({
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  quantity: z.number().int().min(1).max(999),
  unitPrice: z.number().positive().optional(),
  discountAmount: z.number().nonnegative().optional(),
  notes: z.string().max(500).optional(),
});

export const CreateOrderRequestSchema = z
  .object({
    customerId: UuidSchema,
    cartId: UuidSchema.optional(),
    items: z.array(CreateOrderItemInputSchema).min(1).max(ORDER_LIMIT.MAX_ITEMS),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema.optional(),
    shippingMethod: z.string().max(50).optional(),
    paymentMethod: z.string().max(50).optional(),
    currency: z.string().length(3).optional(),
    customerNotes: z.string().max(1000).optional(),
    notes: z.string().max(1000).optional(),
    idempotencyKey: z.string().min(8).max(128).optional(),
  })
  .strict();

export type CreateOrderItemInputSchemaType = z.infer<typeof CreateOrderItemInputSchema>;
export type CreateOrderRequestSchemaType = z.infer<typeof CreateOrderRequestSchema>;
