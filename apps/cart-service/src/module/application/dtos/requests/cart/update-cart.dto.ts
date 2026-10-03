/**
 * UpdateCartRequestDTO
 * @module cart-service/application/dtos/requests/cart
 */
export interface UpdateCartRequestDTO {
  readonly notes?: string;
  readonly currency?: string;
  readonly expiresAt?: string;
  readonly status?: string;
}
