/**
 * Shipping/Tax Redis keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
export const TAX_KEYS = {
  base: (taxId: string): string => `cart-tax:${taxId}`,
  byCart: (cartId: string): string => `cart:${cartId}:tax`,
} as const;

export const SHIPPING_KEYS = {
  base: (shippingId: string): string => `cart-shipping:${shippingId}`,
  byCart: (cartId: string): string => `cart:${cartId}:shipping`,
} as const;
