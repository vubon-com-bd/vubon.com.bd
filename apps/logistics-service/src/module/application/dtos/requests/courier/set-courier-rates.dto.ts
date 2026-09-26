import { z } from 'zod';

export const SetCourierRatesRequestSchema = z.object({
  courierId: z.string().uuid(),
  zoneId: z.string().uuid().optional(),
  weightMin: z.number().nonnegative(),
  weightMax: z.number().positive(),
  baseRate: z.number().nonnegative(),
  perKgRate: z.number().nonnegative(),
  currency: z.string().length(3).default('BDT'),
});

export type SetCourierRatesRequestDTO = z.infer<typeof SetCourierRatesRequestSchema>;
