import { z } from 'zod';

export const AuthSettingsResponseSchema = z.object({
  userId: z.string(),
  mfaRequired: z.boolean(),
  sessionTimeoutMinutes: z.number(),
  passwordExpiryDays: z.number(),
  loginNotifications: z.boolean(),
  updatedAt: z.string().datetime(),
});

export type AuthSettingsResponseDTO = z.infer<typeof AuthSettingsResponseSchema>;
