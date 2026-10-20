/**
 * Select Payment Request DTO
 * @module order-service/application/dtos/requests/checkout
 *
 * No schema in shared-schemas; define inline.
 */
export interface SelectPaymentRequestDTO {
  readonly checkoutId: string;
  readonly paymentMethod: string;
}

export interface SelectPaymentCommandDTO extends SelectPaymentRequestDTO {
  readonly actorId?: string;
}
