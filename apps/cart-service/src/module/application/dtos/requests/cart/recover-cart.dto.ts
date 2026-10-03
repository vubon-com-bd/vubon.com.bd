/**
 * RecoverCartRequestDTO
 * @module cart-service/application/dtos/requests/cart
 */
export interface RecoverCartRequestDTO {
  readonly cartId: string;
  readonly recoveredBy?: string;
  readonly channel?: 'email' | 'sms' | 'push';
}
