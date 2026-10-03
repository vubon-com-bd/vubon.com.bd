/**
 * CreateCartRequestDTO
 * @module cart-service/application/dtos/requests/cart
 */
export interface CreateCartRequestDTO {
  readonly type?: 'guest' | 'user' | 'wishlist' | 'saved' | 'subscription';
  readonly userId?: string;
  readonly sessionId?: string;
  readonly currency?: string;
  readonly notes?: string;
  readonly expiresAt?: string;
}
