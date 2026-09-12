import { Address } from '../../common/address.types';
import { BILLING_ADDRESS } from '@vubon/shared-constants/src/business/checkout/billing-address.constants';
import { Checkout } from './checkout.types';

export interface BillingAddress extends Address {
  addressId: string;
  checkoutId: string;
  checkout: Checkout;
  type: keyof typeof BILLING_ADDRESS.TYPES | string;
  isSameAsShipping: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
