/**
 * Update Auth Preferences Request DTO
 * @module identity-service/application/dtos/requests/settings
 */
import { z } from 'zod';

export const UpdateAuthPreferencesRequestSchema = z
  .object({
    preferredMfaMethod: z.enum(['totp', 'sms', 'email', 'push', 'webauthn', 'backup_code']).optional(),
    trustDeviceDefault: z.boolean().optional(),
    trustDeviceExpiryDays: z.number().int().min(1).max(365).optional(),
    rememberMeDefault: z.boolean().optional(),
    biometricEnabled: z.boolean().optional(),
    loginNotifications: z.boolean().optional(),
  })
  .strict();

export type UpdateAuthPreferencesRequestDTO = z.infer<typeof UpdateAuthPreferencesRequestSchema>;
