import { z } from 'zod';

export const TrackConversionRequestSchema = z.object({
  affiliateId: z.string().uuid(),
  orderId: z.string().uuid(),
  orderAmount: z.number().nonnegative(),
  currency: z.string().length(3).optional(),
});

export type TrackConversionRequestDTO = z.infer<typeof TrackConversionRequestSchema>;
