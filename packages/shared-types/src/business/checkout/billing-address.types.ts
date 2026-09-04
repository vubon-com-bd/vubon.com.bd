/**
 * Billing Address Types
 * বিলিং ঠিকানা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Address } from '../../common/address';

export interface BillingAddress extends BaseEntity, Address {
  checkoutId: string;
  isSameAsShipping: boolean;
  company?: string;
  taxId?: string;
  vatNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingAddressCreateInput {
  checkoutId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  division: string;
  district: string;
  upazila?: string;
  union?: string;
  isDefault?: boolean;
  addressType?: 'shipping' | 'billing' | 'both';
  landmark?: string;
  latitude?: number;
  longitude?: number;
  isSameAsShipping?: boolean;
  company?: string;
  taxId?: string;
  vatNumber?: string;
}

export interface BillingAddressUpdateInput extends Partial<BillingAddressCreateInput> {}

export interface BillingAddressResponse {
  billingAddress: BillingAddress;
}
