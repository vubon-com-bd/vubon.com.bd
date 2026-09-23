import { z } from 'zod';

export const SettleInsuranceRequestSchema = z.object({
  insuranceId: z.string().uuid(),
  settlementAmount: z.number().positive(),
  notes: z.string().max(500).optional(),
});

export type SettleInsuranceRequestDTO = z.infer<typeof SettleInsuranceRequestSchema>;
