/**
 * Delete Address Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const DeleteAddressRequestSchema = z
  .object({
    addressId: z.string().uuid(),
  })
  .strict();

export type DeleteAddressRequestDTO = z.infer<typeof DeleteAddressRequestSchema>;
