/**
 * ICheckoutService
 */
import type { StartCheckoutRequestDTO } from '../../dtos/requests/checkout/start-checkout.dto.js';
import type { SelectAddressRequestDTO } from '../../dtos/requests/checkout/select-address.dto.js';
import type { SelectShippingRequestDTO } from '../../dtos/requests/checkout/select-shipping.dto.js';
import type { SelectPaymentRequestDTO } from '../../dtos/requests/checkout/select-payment.dto.js';
import type { ConfirmCheckoutRequestDTO } from '../../dtos/requests/checkout/confirm-checkout.dto.js';
import type { AbandonCheckoutRequestDTO } from '../../dtos/requests/checkout/abandon-checkout.dto.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

export const CHECKOUT_SERVICE = Symbol('CHECKOUT_SERVICE');

export interface ICheckoutService {
  start(dto: StartCheckoutRequestDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  selectAddress(dto: SelectAddressRequestDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  selectShipping(dto: SelectShippingRequestDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  selectPayment(dto: SelectPaymentRequestDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  confirm(dto: ConfirmCheckoutRequestDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  abandon(dto: AbandonCheckoutRequestDTO, actorId?: string): Promise<CheckoutResponseDTO>;
  getById(checkoutId: string): Promise<CheckoutResponseDTO>;
  getActiveByCustomer(customerId: string): Promise<CheckoutResponseDTO | null>;
}
