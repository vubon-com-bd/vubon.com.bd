/**
 * Set Shipping Methods Request DTO
 * @module vendor-service/application/dtos/requests/shipping
 */
export interface SetShippingMethodsRequestDTO {
  readonly vendorId: string;
  readonly methods: readonly (
    | 'standard'
    | 'express'
    | 'same_day'
    | 'next_day'
    | 'pickup'
    | 'courier'
  )[];
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
