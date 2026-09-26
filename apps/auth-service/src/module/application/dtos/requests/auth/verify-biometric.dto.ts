/**
 * VerifyBiometricRequest DTO — inline
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const VerifyBiometricSchema = z
  .object({
    biometricId: z.string().min(8).max(256),
    challenge: z.string().min(8).max(2048),
    deviceId: z.string().min(1).max(128),
  })
  .strict();

export type VerifyBiometricRequestDTO = z.infer<typeof VerifyBiometricSchema>;

export function validateVerifyBiometricRequest(
  input: unknown,
): VerifyBiometricRequestDTO {
  return VerifyBiometricSchema.parse(input);
}
