import { z } from 'zod';

export const CalculateShippingRequestSchema = z.object({
  methodId: z.string().uuid().optional(),
  courierId: z.string().uuid().optional(),
  zoneId: z.string().uuid().optional(),
  weightKg: z.number().positive(),
  declaredValue: z.number().nonnegative().optional(),
});

export type CalculateShippingRequestDTO = z.infer<typeof CalculateShippingRequestSchema>;
