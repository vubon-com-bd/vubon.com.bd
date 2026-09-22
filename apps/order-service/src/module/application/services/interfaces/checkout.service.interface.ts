import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CheckoutEntity } from '../../../domain/entities/checkout.entity';
import type { StartCheckoutRequestDTO } from '../../dtos/requests/checkout/start-checkout.dto';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

export interface CheckoutServiceInterface
  extends BaseServiceInterface<CheckoutEntity, string> {
  start(input: StartCheckoutRequestDTO): Promise<CheckoutResponseDTO>;
  selectAddress(checkoutId: string, addressId: string): Promise<CheckoutResponseDTO>;
  selectShipping(checkoutId: string, methodId: string): Promise<CheckoutResponseDTO>;
  selectPayment(checkoutId: string, paymentMethod: string): Promise<CheckoutResponseDTO>;
  confirm(checkoutId: string): Promise<CheckoutResponseDTO>;
  abandon(checkoutId: string, reason?: string): Promise<void>;
  findById(checkoutId: string): Promise<CheckoutResponseDTO | null>;
}
