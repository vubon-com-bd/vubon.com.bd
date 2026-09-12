import { Address } from '../../common/address.types';
import { SHIPPING_ADDRESS } from '@vubon/shared-constants/src/business/checkout/shipping-address.constants';
import { Checkout } from './checkout.types';

export interface ShippingAddress extends Address {
  addressId: string;
  checkoutId: string;
  checkout: Checkout;
  type: keyof typeof SHIPPING_ADDRESS.TYPES | string;
  isVerified: boolean;
  deliveryInstructions?: string;
  metadata: Record<string, unknown>;
}
