import { z } from 'zod';

export const PauseSubscriptionRequestSchema = z.object({
  subscriptionId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type PauseSubscriptionRequestDTO = z.infer<typeof PauseSubscriptionRequestSchema>;
