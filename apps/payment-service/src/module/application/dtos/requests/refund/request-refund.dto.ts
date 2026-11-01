/**
 * RequestRefundRequestDTO
 * @module payment-service/application/dtos/requests/refund
 *
 * Source: RefundPaymentRequestSchema from shared-schemas.
 */
import type { RefundPaymentRequestSchemaType } from '@vubon/shared-schemas/business/payment';

export type RequestRefundRequestDTO = RefundPaymentRequestSchemaType;

export interface RequestRefundContextDTO {
  readonly request: RequestRefundRequestDTO;
  readonly userId: string;
  readonly actorId?: string;
}
