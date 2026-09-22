import { z } from 'zod';

export const SubscriptionPublicResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  plan: z.string(),
  status: z.string(),
  currentPeriodFrom: z.string().datetime(),
  currentPeriodTo: z.string().datetime(),
  cancelledAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime(),
});

export type SubscriptionResponseDTO = z.infer<typeof SubscriptionPublicResponseSchema>;
