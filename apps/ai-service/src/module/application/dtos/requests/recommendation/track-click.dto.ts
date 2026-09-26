import { z } from 'zod';

export const TrackClickSchema = z.object({
  recommendationId: z.string().uuid(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  position: z.number().int().min(0).optional(),
});

export type TrackClickRequestDTO = z.infer<typeof TrackClickSchema>;
