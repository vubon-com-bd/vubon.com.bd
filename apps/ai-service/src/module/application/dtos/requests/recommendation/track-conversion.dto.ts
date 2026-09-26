import { z } from 'zod';

export const TrackConversionSchema = z.object({
  recommendationId: z.string().uuid(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  orderId: z.string().uuid().optional(),
  revenue: z.number().nonnegative().optional(),
});

export type TrackConversionRequestDTO = z.infer<typeof TrackConversionSchema>;
