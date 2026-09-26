/**
 * DeleteAddressRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const DeleteAddressSchema = z
  .object({
    addressId: UuidSchema,
  })
  .strict();

export type DeleteAddressRequestDTO = z.infer<typeof DeleteAddressSchema>;

export function validateDeleteAddressRequest(
  input: unknown,
): DeleteAddressRequestDTO {
  return DeleteAddressSchema.parse(input);
}
