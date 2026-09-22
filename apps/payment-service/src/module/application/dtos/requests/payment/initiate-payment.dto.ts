import { z } from 'zod';
import { ProcessPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';

export type InitiatePaymentRequestDTO = z.infer<typeof ProcessPaymentRequestSchema>;
