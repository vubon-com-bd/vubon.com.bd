/**
 * Update Inventory Request Schema
 * @module shared-schemas/business/product/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const UpdateInventoryRequestSchema = z
  .object({
    inventoryId: UuidSchema,
    delta: z
      .number()
      .int()
      .refine((v) => v !== 0, {
        message: 'Delta cannot be zero',
      }),
    reason: z.string().min(1).max(500),
    reference: z.string().max(255).optional(),
  })
  .strict();

export const SetInventoryRequestSchema = z
  .object({
    inventoryId: UuidSchema,
    quantity: z.number().int().nonnegative(),
    reason: z.string().min(1).max(500),
  })
  .strict();

export type UpdateInventoryRequestSchemaType = z.infer<typeof UpdateInventoryRequestSchema>;
export type SetInventoryRequestSchemaType = z.infer<typeof SetInventoryRequestSchema>;
