/**
 * DisableBiometricRequest DTO — inline
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const DisableBiometricSchema = z
  .object({
    biometricId: z.string().min(8).max(256),
    password: z.string().min(1).max(128),
  })
  .strict();

export type DisableBiometricRequestDTO = z.infer<
  typeof DisableBiometricSchema
>;

export function validateDisableBiometricRequest(
  input: unknown,
): DisableBiometricRequestDTO {
  return DisableBiometricSchema.parse(input);
}
