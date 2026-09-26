import { z } from 'zod';

export const BuildProfileSchema = z.object({
  userId: z.string().uuid(),
  interactions: z.array(z.object({
    action: z.enum(['view', 'like', 'purchase', 'review']),
    itemId: z.string(),
    categories: z.array(z.string()).default([]),
    brands: z.array(z.string()).default([]),
    price: z.number().nonnegative().nullable().optional(),
  })).min(1),
});

export type BuildProfileRequestDTO = z.infer<typeof BuildProfileSchema>;
