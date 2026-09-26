import { z } from 'zod';
import { PaymentMethodSchema } from '@vubon/shared-schemas/business/payment';
import { PaymentGatewaySchema } from '@vubon/shared-schemas/business/payment';

export const AddPaymentMethodRequestSchema = z.object({
  method: PaymentMethodSchema,
  gateway: PaymentGatewaySchema.optional(),
  cardToken: z.string().min(8).max(255).optional(),
  cardLast4: z.string().regex(/^\d{4}$/).optional(),
  cardBrand: z.string().max(30).optional(),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2,4}$/).optional(),
  walletAddress: z.string().max(255).optional(),
  isDefault: z.boolean().optional().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type AddPaymentMethodRequestDTO = z.infer<typeof AddPaymentMethodRequestSchema>;
