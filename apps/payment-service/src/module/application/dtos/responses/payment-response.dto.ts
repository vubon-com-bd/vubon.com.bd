import { z } from 'zod';
import {
  PaymentResponseSchema,
  PaymentInitiateResponseSchema,
  PaymentSummaryResponseSchema,
  PaymentVerifyResponseSchema,
} from '@vubon/shared-schemas/business/payment';

export type PaymentResponseDTO = z.infer<typeof PaymentResponseSchema>;
export type PaymentInitiateResponseDTO = z.infer<typeof PaymentInitiateResponseSchema>;
export type PaymentSummaryResponseDTO = z.infer<typeof PaymentSummaryResponseSchema>;
export type PaymentVerifyResponseDTO = z.infer<typeof PaymentVerifyResponseSchema>;
