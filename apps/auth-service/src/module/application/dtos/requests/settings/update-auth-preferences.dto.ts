import { z } from 'zod';

export const UpdateAuthPreferencesRequestSchema = z.object({
  userId: z.string().min(1),
  preferredMfaMethod: z
    .enum(['totp', 'sms', 'email', 'backup_code'])
    .optional(),
  trustedDeviceOnly: z.boolean().optional(),
  biometricEnabled: z.boolean().optional(),
  socialLoginEnabled: z.boolean().optional(),
});

export type UpdateAuthPreferencesRequestDTO = z.infer<typeof UpdateAuthPreferencesRequestSchema>;
