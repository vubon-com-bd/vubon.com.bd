export const CartItemKeys = {
  items: (cartId: string): string => `cart:${cartId}:items`,
  byId: (cartId: string, itemId: string): string => `cart:${cartId}:item:${itemId}`,
};
