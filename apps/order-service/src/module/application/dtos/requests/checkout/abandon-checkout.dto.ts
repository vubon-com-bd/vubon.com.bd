/**
 * Abandon Checkout Request DTO
 * @module order-service/application/dtos/requests/checkout
 *
 * No schema in shared-schemas; define inline.
 */
export interface AbandonCheckoutRequestDTO {
  readonly checkoutId: string;
  readonly reason?: string;
}

export interface AbandonCheckoutCommandDTO extends AbandonCheckoutRequestDTO {
  readonly actorId?: string;
}
