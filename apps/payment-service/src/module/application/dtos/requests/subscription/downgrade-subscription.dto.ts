import { z } from 'zod';

export const DowngradeSubscriptionRequestSchema = z.object({
  subscriptionId: z.string().uuid(),
  newPlan: z.string().min(1).max(50),
}).strict();

export type DowngradeSubscriptionRequestDTO = z.infer<typeof DowngradeSubscriptionRequestSchema>;
