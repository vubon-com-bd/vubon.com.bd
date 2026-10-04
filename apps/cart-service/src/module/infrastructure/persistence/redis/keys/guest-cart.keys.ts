/**
 * Guest Cart Redis keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
export const GUEST_CART_KEYS = {
  base: (guestCartId: string): string => `guest:${guestCartId}`,
  byToken: (token: string): string => `guest:token:${token}`,
  activeSet: (): string => 'guest:active',
  expiredSet: (): string => 'guest:expired',
} as const;

export const CART_MERGER_KEYS = {
  base: (mergerId: string): string => `cart-merger:${mergerId}`,
  bySource: (cartId: string): string => `cart-merger:source:${cartId}`,
  byTarget: (cartId: string): string => `cart-merger:target:${cartId}`,
} as const;
