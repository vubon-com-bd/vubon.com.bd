/**
 * Process Payment Request Schema
 * @module shared-schemas/business/payment/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { PaymentMethodSchema } from './payment-method.schema';
import { PaymentGatewaySchema } from './payment-gateway.schema';

export const ProcessPaymentRequestSchema = z
  .object({
    orderId: UuidSchema,
    method: PaymentMethodSchema,
    gateway: PaymentGatewaySchema.optional(),
    amount: PositiveMoneySchema,
    currency: z.string().length(3),
    returnUrl: z.string().url().optional(),
    idempotencyKey: z.string().min(8).max(128).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type ProcessPaymentRequestSchemaType = z.infer<typeof ProcessPaymentRequestSchema>;
