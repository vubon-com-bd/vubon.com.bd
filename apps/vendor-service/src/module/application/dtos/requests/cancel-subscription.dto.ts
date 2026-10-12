/**
 * CancelSubscriptionRequestDto
 * @module vendor-service/application/dtos/requests
 */
export class CancelSubscriptionRequestDto {
  vendorId!: string;
  immediate!: boolean;
  reason?: string;
  idempotencyKey?: string;
}
