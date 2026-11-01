/**
 * Start Checkout Request DTO
 * @module order-service/application/dtos/requests/checkout
 *
 * Shape derives from StartCheckoutRequestSchema in shared-schemas/business/checkout.
 */
import type { StartCheckoutRequestSchemaType } from '@vubon/shared-schemas/business';

export type StartCheckoutRequestDTO = StartCheckoutRequestSchemaType;

export interface StartCheckoutCommandDTO extends StartCheckoutRequestDTO {
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
