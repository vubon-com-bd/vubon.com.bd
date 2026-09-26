import { z } from 'zod';

export const DeleteAddressRequestSchema = z.object({
  addressId: z.string().min(1),
});

export type DeleteAddressRequestDTO = z.infer<typeof DeleteAddressRequestSchema>;
