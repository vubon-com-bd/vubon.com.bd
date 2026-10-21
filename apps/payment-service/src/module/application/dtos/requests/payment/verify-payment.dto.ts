/**
 * VerifyPaymentRequestDTO
 * @module payment-service/application/dtos/requests/payment
 *
 * Source: VerifyPaymentRequestSchema from shared-schemas.
 */
import type { VerifyPaymentRequestSchemaType } from '@vubon/shared-schemas/business/payment';

export type VerifyPaymentRequestDTO = VerifyPaymentRequestSchemaType;

export interface VerifyPaymentContextDTO {
  readonly request: VerifyPaymentRequestDTO;
  readonly userId: string;
}
