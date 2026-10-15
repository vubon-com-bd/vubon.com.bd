/**
 * CartItem Redis Keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
const NS = 'cart:item';

export const CartItemKeys = {
  byId: (id: string): string => `${NS}:by-id:${id}`,
  byCart: (cartId: string): string => `${NS}:by-cart:${cartId}`,
  byProduct: (productId: string): string => `${NS}:by-product:${productId}`,
  byStatus: (status: string): string => `${NS}:by-status:${status}`,
  byCartProduct: (cartId: string, productId: string, variantId?: string): string =>
    `${NS}:cart-product:${cartId}:${productId}:${variantId ?? '_'}`,
  allByCart: (cartId: string): string => `${NS}:all:${cartId}`,
} as const;
