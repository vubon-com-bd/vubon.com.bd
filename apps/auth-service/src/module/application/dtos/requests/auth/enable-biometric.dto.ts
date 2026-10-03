/**
 * EnableBiometricRequest DTO — inline
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const EnableBiometricSchema = z
  .object({
    kind: z.enum(['fingerprint', 'face', 'voice', 'iris']),
    biometricId: z.string().min(8).max(256),
    deviceId: z.string().min(1).max(128),
    password: z.string().min(1).max(128),
  })
  .strict();

export type EnableBiometricRequestDTO = z.infer<typeof EnableBiometricSchema>;

export function validateEnableBiometricRequest(
  input: unknown,
): EnableBiometricRequestDTO {
  return EnableBiometricSchema.parse(input);
}
