export const GuestCartKeys = {
  byToken: (token: string): string => `guest:${token}`,
  cartLink: (cartId: string): string => `guest:cart:${cartId}`,
};
