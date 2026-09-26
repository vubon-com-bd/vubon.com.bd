import { z } from 'zod';

export const PurchaseInsuranceRequestSchema = z.object({
  shipmentId: z.string().uuid(),
  provider: z.string().min(2).max(100),
  coverage: z.string().min(1).max(50),
  declaredValue: z.number().positive(),
  currency: z.string().length(3).default('BDT'),
});

export type PurchaseInsuranceRequestDTO = z.infer<typeof PurchaseInsuranceRequestSchema>;
