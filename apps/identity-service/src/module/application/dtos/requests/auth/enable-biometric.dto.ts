/**
 * Enable Biometric Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const EnableBiometricRequestSchema = z
  .object({
    type: z.enum(['fingerprint', 'face_id', 'voice', 'iris', 'palm']),
    publicKeyHash: z.string().min(32).max(512),
    deviceId: z.string().min(1).max(128),
  })
  .strict();

export type EnableBiometricRequestDTO = z.infer<typeof EnableBiometricRequestSchema>;
