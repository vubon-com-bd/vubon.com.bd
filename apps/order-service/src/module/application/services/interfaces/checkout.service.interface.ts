/**
 * ICheckoutService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  StartCheckoutCommandDTO,
  SelectAddressCommandDTO,
  SelectShippingCommandDTO,
  SelectPaymentCommandDTO,
  ConfirmCheckoutCommandDTO,
  AbandonCheckoutCommandDTO,
} from '../../dtos/requests/checkout/index.js';
import type {
  CheckoutResponseDTO,
  CheckoutPublicResponseDTO,
  CheckoutConfirmResponseDTO,
} from '../../dtos/responses/checkout-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CHECKOUT_SERVICE = Symbol('CHECKOUT_SERVICE');

// ─── Main Interface ────────────────────────
export interface ICheckoutService {
  // Commands
  start(dto: StartCheckoutCommandDTO, userId: string): Promise<CheckoutResponseDTO>;
  selectAddress(dto: SelectAddressCommandDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  selectShipping(dto: SelectShippingCommandDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  selectPayment(dto: SelectPaymentCommandDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  confirm(
    dto: ConfirmCheckoutCommandDTO,
    actorId?: string,
  ): Promise<CheckoutConfirmResponseDTO>;
  abandon(dto: AbandonCheckoutCommandDTO, actorId?: string): Promise<CheckoutResponseDTO>;

  // Queries
  getById(id: string): Promise<CheckoutResponseDTO>;
  getPublic(id: string): Promise<CheckoutPublicResponseDTO>;
}
