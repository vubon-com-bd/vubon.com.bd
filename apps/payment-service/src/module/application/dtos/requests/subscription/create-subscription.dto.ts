import { z } from 'zod';

export const CreateSubscriptionRequestSchema = z.object({
  plan: z.string().min(1).max(50),
  paymentMethodId: z.string().uuid().optional(),
  currentPeriodFrom: z.string().datetime(),
  currentPeriodTo: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type CreateSubscriptionRequestDTO = z.infer<typeof CreateSubscriptionRequestSchema>;
