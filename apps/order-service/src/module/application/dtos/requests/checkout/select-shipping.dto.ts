import { z } from 'zod';

export const SelectShippingRequestSchema = z.object({
  checkoutId: z.string().min(1),
  methodId: z.string().min(1),
});

export type SelectShippingRequestDTO = z.infer<typeof SelectShippingRequestSchema>;
