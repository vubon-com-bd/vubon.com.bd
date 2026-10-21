/**
 * InitiatePaymentRequestDTO
 * @module payment-service/application/dtos/requests/payment
 *
 * Source: ProcessPaymentRequestSchema from shared-schemas.
 * Single source of truth — no duplicate Zod.
 */
import type { ProcessPaymentRequestSchemaType } from '@vubon/shared-schemas/business/payment';

export type InitiatePaymentRequestDTO = ProcessPaymentRequestSchemaType;

/**
 * Extended internal DTO — carries actor + correlation.
 * Not part of public schema; server-side enrichment.
 */
export interface InitiatePaymentContextDTO {
  readonly request: InitiatePaymentRequestDTO;
  readonly userId: string;
  readonly actorId?: string;
  readonly requestId?: string;
}
