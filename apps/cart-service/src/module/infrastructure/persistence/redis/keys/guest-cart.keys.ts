/**
 * GuestCart Redis Keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
const NS = 'guest-cart';

export const GuestCartKeys = {
  byId: (id: string): string => `${NS}:by-id:${id}`,
  byToken: (token: string): string => `${NS}:by-token:${token}`,
  byCart: (cartId: string): string => `${NS}:by-cart:${cartId}`,
  allIds: (): string => `${NS}:all-ids`,
} as const;
