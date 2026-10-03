/**
 * GuestCartResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface GuestCartResponseDTO {
  readonly id: string;
  readonly token: string;
  readonly status: string;
  readonly itemCount: number;
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly mergedIntoCartId?: string;
}
