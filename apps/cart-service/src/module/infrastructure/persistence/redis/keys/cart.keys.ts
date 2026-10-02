/**
 * Cart Redis keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
export const CART_KEYS = {
  base: (cartId: string): string => `cart:${cartId}`,
  byUser: (userId: string): string => `cart:user:${userId}`,
  bySession: (sessionId: string): string => `cart:session:${sessionId}`,
  byUserActive: (userId: string): string => `cart:user:${userId}:active`,
  items: (cartId: string): string => `cart:${cartId}:items`,
  item: (cartId: string, itemId: string): string => `cart:${cartId}:item:${itemId}`,
  totals: (cartId: string): string => `cart:${cartId}:totals`,
  summary: (cartId: string): string => `cart:${cartId}:summary`,
  lock: (cartId: string): string => `cart:lock:${cartId}`,
  expired: (): string => 'cart:expired',
  activeSet: (): string => 'cart:active',
} as const;
