/**
 * CartItem Redis keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
export const CART_ITEM_KEYS = {
  base: (cartId: string, itemId: string): string => `cart:${cartId}:item:${itemId}`,
  byCart: (cartId: string): string => `cart:${cartId}:items`,
  byProduct: (cartId: string, productId: string, variantId?: string): string =>
    variantId ? `cart:${cartId}:product:${productId}:${variantId}` : `cart:${cartId}:product:${productId}`,
  byProductId: (productId: string): string => `cart-item:product:${productId}`,
} as const;
