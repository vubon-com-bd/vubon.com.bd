/**
 * Update Auth Settings Request DTO
 * @module identity-service/application/dtos/requests/settings
 */
import { z } from 'zod';

export const UpdateAuthSettingsRequestSchema = z
  .object({
    twoFactorRequired: z.boolean().optional(),
    sessionTimeoutSeconds: z.number().int().min(300).max(30 * 24 * 3600).optional(),
    passwordExpiryDays: z.number().int().min(0).max(365).optional(),
    passwordHistoryCount: z.number().int().min(0).max(20).optional(),
    loginAlertsEnabled: z.boolean().optional(),
    maxLoginAttempts: z.number().int().min(1).max(20).optional(),
    lockoutDurationSeconds: z.number().int().min(60).max(24 * 3600).optional(),
    allowedIpRanges: z.array(z.string()).optional(),
    mfaRequired: z.boolean().optional(),
  })
  .strict();

export type UpdateAuthSettingsRequestDTO = z.infer<typeof UpdateAuthSettingsRequestSchema>;
