/**
 * UpdatePaymentMethodRequestDTO
 * @module payment-service/application/dtos/requests/method
 *
 * Updates labels/metadata; sensitive fields are immutable.
 */
export interface UpdatePaymentMethodRequestDTO {
  readonly methodId: string;
  readonly label?: string;
  readonly holderName?: string;
  readonly expiryMonth?: number;
  readonly expiryYear?: number;
}

export interface UpdatePaymentMethodContextDTO {
  readonly request: UpdatePaymentMethodRequestDTO;
  readonly userId: string;
}
