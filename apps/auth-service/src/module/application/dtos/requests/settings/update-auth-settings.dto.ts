import { z } from 'zod';

export const UpdateAuthSettingsRequestSchema = z.object({
  userId: z.string().min(1),
  mfaRequired: z.boolean().optional(),
  sessionTimeoutMinutes: z.number().int().min(5).max(1440).optional(),
  passwordExpiryDays: z.number().int().min(0).max(365).optional(),
  loginNotifications: z.boolean().optional(),
});

export type UpdateAuthSettingsRequestDTO = z.infer<typeof UpdateAuthSettingsRequestSchema>;
