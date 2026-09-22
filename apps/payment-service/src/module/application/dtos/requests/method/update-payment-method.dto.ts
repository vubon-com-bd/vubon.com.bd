import { z } from 'zod';

export const UpdatePaymentMethodRequestSchema = z.object({
  methodId: z.string().uuid(),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2,4}$/).optional(),
  cardToken: z.string().min(8).max(255).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type UpdatePaymentMethodRequestDTO = z.infer<typeof UpdatePaymentMethodRequestSchema>;
