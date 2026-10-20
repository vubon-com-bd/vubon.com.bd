/**
 * ICheckoutSessionService — contract
 * @module order-service/application/services/interfaces
 */
import type { CheckoutSessionResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CHECKOUT_SESSION_SERVICE = Symbol('CHECKOUT_SESSION_SERVICE');

// ─── Main Interface ────────────────────────
export interface ICheckoutSessionService {
  getById(id: string): Promise<CheckoutSessionResponseDTO>;
  getLatestByCheckout(checkoutId: string): Promise<CheckoutSessionResponseDTO | null>;
  listByCheckout(checkoutId: string): Promise<readonly CheckoutSessionResponseDTO[]>;
}
