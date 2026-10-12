/**
 * Set Default Address Request DTO
 * @module identity-service/application/dtos/requests/address
 */
import { z } from 'zod';

export const SetDefaultAddressRequestSchema = z
  .object({
    addressId: z.string().uuid(),
    scope: z.enum(['shipping', 'billing', 'both']).default('both'),
  })
  .strict();

export type SetDefaultAddressRequestDTO = z.infer<typeof SetDefaultAddressRequestSchema>;
