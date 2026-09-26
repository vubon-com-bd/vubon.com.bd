import { z } from 'zod';
import { VerifyPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';

export type VerifyPaymentRequestDTO = z.infer<typeof VerifyPaymentRequestSchema>;
