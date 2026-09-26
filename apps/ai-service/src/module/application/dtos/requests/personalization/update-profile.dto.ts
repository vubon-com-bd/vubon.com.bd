import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  userId: z.string().uuid(),
  interests: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  brandAffinity: z.record(z.string(), z.number().min(0).max(1)).optional(),
  priceRangeMin: z.number().nonnegative().nullable().optional(),
  priceRangeMax: z.number().nonnegative().nullable().optional(),
});

export type UpdateProfileRequestDTO = z.infer<typeof UpdateProfileSchema>;
