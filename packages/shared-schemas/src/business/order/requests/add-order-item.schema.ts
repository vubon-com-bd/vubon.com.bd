/**
 * Add Order Item Request Schema
 * @module shared-schemas/business/order/requests
 */
import { z } from 'zod';
import { UuidSchema } from '../../../common/primitives/uuid.schema.js';

export const AddOrderItemRequestSchema = z
  .object({
    orderId: UuidSchema,
    productId: UuidSchema,
    variantId: UuidSchema.optional(),
    vendorId: UuidSchema.optional(),
    sku: z.string().min(1).max(64),
    name: z.string().min(1).max(200),
    imageUrl: z.string().url().optional(),
    quantity: z.number().int().min(1).max(999),
    unitPrice: z.number().positive(),
    compareAtPrice: z.number().nonnegative().optional(),
    discountAmount: z.number().nonnegative().optional(),
    taxAmount: z.number().nonnegative().optional(),
    shippingAmount: z.number().nonnegative().optional(),
    notes: z.string().max(500).optional(),
    attributes: z.record(z.string(), z.string()).optional(),
  })
  .strict();

export type AddOrderItemRequestSchemaType = z.infer<typeof AddOrderItemRequestSchema>;
