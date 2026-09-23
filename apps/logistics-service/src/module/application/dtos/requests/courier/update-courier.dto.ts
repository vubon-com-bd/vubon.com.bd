import { z } from 'zod';

export const UpdateCourierRequestSchema = z.object({
  courierId: z.string().uuid(),
  apiUrl: z.string().url().optional(),
  apiKey: z.string().min(1).max(500).optional(),
});

export type UpdateCourierRequestDTO = z.infer<typeof UpdateCourierRequestSchema>;
