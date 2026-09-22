import { z } from 'zod';

export const ProceedToCheckoutRequestSchema = z.object({
  cartId: z.string().uuid(),
  addressId: z.string().uuid().optional(),
  shippingMethod: z.string().max(50).optional(),
  idempotencyKey: z.string().min(8).max(128).optional(),
}).strict();

export type ProceedToCheckoutRequestDTO = z.infer<typeof ProceedToCheckoutRequestSchema>;
