import { z } from 'zod';

export const UpdateBioRequestSchema = z.object({
  userId: z.string().min(1),
  bio: z.string().max(500).nullable(),
});

export type UpdateBioRequestDTO = z.infer<typeof UpdateBioRequestSchema>;
