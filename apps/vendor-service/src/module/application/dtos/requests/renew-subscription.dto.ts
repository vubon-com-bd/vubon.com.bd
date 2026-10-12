/**
 * RenewSubscriptionRequestDto
 * @module vendor-service/application/dtos/requests
 */
export class RenewSubscriptionRequestDto {
  vendorId!: string;
  paymentReference?: string;
  idempotencyKey?: string;
}
