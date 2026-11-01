/**
 * DeletePaymentMethodRequestDTO
 * @module payment-service/application/dtos/requests/method
 */
export interface DeletePaymentMethodRequestDTO {
  readonly methodId: string;
  readonly reason?: string;
}

export interface DeletePaymentMethodContextDTO {
  readonly request: DeletePaymentMethodRequestDTO;
  readonly userId: string;
}
