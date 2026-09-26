import { z } from 'zod';

export const CancelSubscriptionRequestSchema = z.object({
  subscriptionId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type CancelSubscriptionRequestDTO = z.infer<typeof CancelSubscriptionRequestSchema>;
