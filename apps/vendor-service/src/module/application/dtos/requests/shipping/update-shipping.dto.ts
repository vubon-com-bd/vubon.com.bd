/**
 * Update Shipping Request DTO
 * @module vendor-service/application/dtos/requests/shipping
 */
export interface UpdateShippingRequestDTO {
  readonly vendorId: string;
  readonly freeShippingThreshold?: number;
  readonly defaultShippingCost?: number;
  readonly maxShippingCost?: number;
  readonly allowsPickup?: boolean;
  readonly allowsCourier?: boolean;
  readonly trackingRequired?: boolean;
  readonly processingDays?: number;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
