import { z } from 'zod';

export const UpgradeSubscriptionRequestSchema = z.object({
  subscriptionId: z.string().uuid(),
  newPlan: z.string().min(1).max(50),
}).strict();

export type UpgradeSubscriptionRequestDTO = z.infer<typeof UpgradeSubscriptionRequestSchema>;
