/**
 * Update Cart Item Request Schema
 * @module shared-schemas/business/cart/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const UpdateCartItemRequestSchema = z
  .object({
    itemId: UuidSchema,
    quantity: z.number().int().min(1).max(999).optional(),
    attributes: z.record(z.string(), z.string()).optional(),
  })
  .strict()
  .refine((data) => data.quantity !== undefined || data.attributes !== undefined, {
    message: 'At least quantity or attributes must be provided',
  });

export const RemoveCartItemRequestSchema = z
  .object({
    itemId: UuidSchema,
  })
  .strict();

export type UpdateCartItemRequestSchemaType = z.infer<typeof UpdateCartItemRequestSchema>;
export type RemoveCartItemRequestSchemaType = z.infer<typeof RemoveCartItemRequestSchema>;
