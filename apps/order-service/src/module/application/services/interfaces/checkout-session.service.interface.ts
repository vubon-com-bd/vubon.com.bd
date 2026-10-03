/**
 * ICheckoutSessionService
 */
import type { CheckoutSessionResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

export const CHECKOUT_SESSION_SERVICE = Symbol('CHECKOUT_SESSION_SERVICE');

export interface ICheckoutSessionService {
  create(checkoutId: string, customerId: string): Promise<CheckoutSessionResponseDTO>;
  getById(sessionId: string): Promise<CheckoutSessionResponseDTO>;
  getByToken(token: string): Promise<CheckoutSessionResponseDTO>;
  getByCheckoutId(checkoutId: string): Promise<CheckoutSessionResponseDTO | null>;
  deleteByCheckoutId(checkoutId: string): Promise<void>;
}
