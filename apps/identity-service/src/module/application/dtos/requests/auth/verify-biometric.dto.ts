/**
 * Verify Biometric Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const VerifyBiometricRequestSchema = z
  .object({
    deviceId: z.string().min(1).max(128),
    challengeResponse: z.string().min(16).max(2048),
  })
  .strict();

export type VerifyBiometricRequestDTO = z.infer<typeof VerifyBiometricRequestSchema>;
