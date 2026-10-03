/**
 * CreateGuestCartRequestDTO
 * @module cart-service/application/dtos/requests/guest
 */
export interface CreateGuestCartRequestDTO {
  readonly token: string;
  readonly currency?: string;
  readonly expiresAt?: string;
}
