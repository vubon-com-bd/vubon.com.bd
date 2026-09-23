import { z } from 'zod';

export const UpdateShippingMethodRequestSchema = z.object({
  methodId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  baseRate: z.number().nonnegative().optional(),
  perKgRate: z.number().nonnegative().optional(),
});

export type UpdateShippingMethodRequestDTO = z.infer<typeof UpdateShippingMethodRequestSchema>;
