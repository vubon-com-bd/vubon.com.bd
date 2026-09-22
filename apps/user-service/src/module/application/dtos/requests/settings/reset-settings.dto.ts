import { z } from 'zod';

export const ResetSettingsRequestSchema = z.object({
  userId: z.string().min(1),
});

export type ResetSettingsRequestDTO = z.infer<typeof ResetSettingsRequestSchema>;
