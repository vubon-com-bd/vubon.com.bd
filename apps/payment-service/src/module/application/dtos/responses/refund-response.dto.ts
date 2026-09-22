import { z } from 'zod';
import {
  RefundPublicSchema,
  PaymentRefundResponseSchema,
} from '@vubon/shared-schemas/business/payment';

export type RefundResponseDTO = z.infer<typeof RefundPublicSchema>;
export type RefundOperationResponseDTO = z.infer<typeof PaymentRefundResponseSchema>;
