/**
 * Calculate Shipping Request DTO
 * @module cart-service/application/dtos/requests/shipping
 *
 * Dry-run shipping calculation.
 */
import { z } from 'zod';

export const CalculateShippingRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    method: z.enum(['standard', 'express', 'same_day', 'pickup', 'international']),
    addressId: z.string().uuid().optional(),
  })
  .strict();

export type CalculateShippingRequestDTO = z.infer<typeof CalculateShippingRequestSchema>;
