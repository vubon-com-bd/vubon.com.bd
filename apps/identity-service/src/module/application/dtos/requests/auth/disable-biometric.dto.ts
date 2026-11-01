/**
 * Disable Biometric Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const DisableBiometricRequestSchema = z
  .object({
    deviceId: z.string().min(1).max(128),
  })
  .strict();

export type DisableBiometricRequestDTO = z.infer<typeof DisableBiometricRequestSchema>;
