/**
 * Set Shipping Method Request DTO
 * @module cart-service/application/dtos/requests/shipping
 */
import { z } from 'zod';

export const SetShippingMethodRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    method: z.enum(['standard', 'express', 'same_day', 'pickup', 'international']),
    addressId: z.string().uuid().optional(),
    cost: z.number().min(0).optional(),
    freeAbove: z.number().min(0).optional(),
    estimatedDays: z.number().int().min(0).max(90).optional(),
  })
  .strict();

export type SetShippingMethodRequestDTO = z.infer<typeof SetShippingMethodRequestSchema>;
