import { z } from 'zod';

export const ApplyPersonalizationSchema = z.object({
  userId: z.string().uuid(),
  items: z.array(z.object({
    itemId: z.string(),
    baseScore: z.number().min(0).max(1),
  })).min(1),
});

export type ApplyPersonalizationRequestDTO = z.infer<typeof ApplyPersonalizationSchema>;
