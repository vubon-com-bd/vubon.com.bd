import { z } from 'zod';

export const CalculateShippingRequestSchema = z.object({
  cartId: z.string().uuid(),
  method: z.string().min(1).max(50),
  addressId: z.string().uuid().optional(),
}).strict();

export type CalculateShippingRequestDTO = z.infer<typeof CalculateShippingRequestSchema>;
