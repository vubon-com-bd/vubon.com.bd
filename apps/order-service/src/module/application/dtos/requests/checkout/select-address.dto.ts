import { z } from 'zod';

export const SelectAddressRequestSchema = z.object({
  checkoutId: z.string().min(1),
  addressId: z.string().min(1),
});

export type SelectAddressRequestDTO = z.infer<typeof SelectAddressRequestSchema>;
