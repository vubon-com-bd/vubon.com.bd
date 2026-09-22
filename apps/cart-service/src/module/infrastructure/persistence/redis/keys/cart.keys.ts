export const CartKeys = {
  byId: (cartId: string): string => `cart:${cartId}`,
  byUser: (userId: string): string => `cart:user:${userId}`,
  lock: (cartId: string): string => `cart:lock:${cartId}`,
  count: (cartId: string): string => `cart:${cartId}:count`,
};
