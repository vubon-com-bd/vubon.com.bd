import { z } from 'zod';

export const ResetPreferencesRequestSchema = z.object({
  userId: z.string().min(1),
});

export type ResetPreferencesRequestDTO = z.infer<typeof ResetPreferencesRequestSchema>;
