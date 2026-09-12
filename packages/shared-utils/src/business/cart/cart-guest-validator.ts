import { CART_GUEST } from '@vubon/shared-constants/src/business/cart/cart-guest.constants';

export interface CartGuestInput {
  deviceId: string;
  sessionId: string;
  status: string;
}

export const validateCartGuest = (
  guest: Partial<CartGuestInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!guest.deviceId) errors.push('Device ID is required');
  if (!guest.sessionId) errors.push('Session ID is required');
  if (guest.status && !Object.keys(CART_GUEST.STATUS).includes(guest.status)) {
    errors.push('Invalid guest status');
  }
  return { isValid: errors.length === 0, errors };
};
