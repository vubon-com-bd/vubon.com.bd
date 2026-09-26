import { z } from 'zod';
import { RefundPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';

export type RequestRefundRequestDTO = z.infer<typeof RefundPaymentRequestSchema>;
