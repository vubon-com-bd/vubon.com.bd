import { z } from 'zod';

export const SetDefaultAddressRequestSchema = z.object({
  userId: z.string().min(1),
  addressId: z.string().min(1),
});

export type SetDefaultAddressRequestDTO = z.infer<typeof SetDefaultAddressRequestSchema>;
