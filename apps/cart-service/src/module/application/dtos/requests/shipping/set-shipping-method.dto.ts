import { z } from 'zod';

export const SetShippingMethodRequestSchema = z.object({
  cartId: z.string().uuid(),
  method: z.string().min(1).max(50),
  cost: z.number().nonnegative(),
  addressId: z.string().uuid().optional(),
}).strict();

export type SetShippingMethodRequestDTO = z.infer<typeof SetShippingMethodRequestSchema>;
