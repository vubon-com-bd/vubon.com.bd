/**
 * Confirm Checkout Request DTO
 * @module order-service/application/dtos/requests/checkout
 */
import type { ConfirmOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type ConfirmCheckoutRequestDTO = ConfirmOrderRequestSchemaType;

export interface ConfirmCheckoutCommandDTO extends ConfirmCheckoutRequestDTO {
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
