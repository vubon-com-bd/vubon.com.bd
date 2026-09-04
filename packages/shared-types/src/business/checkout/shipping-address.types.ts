/**
 * Shipping Address Types
 * শিপিং ঠিকানা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Address } from '../../common/address';

export interface ShippingAddress extends BaseEntity, Address {
  checkoutId: string;
  deliveryInstructions?: string;
  contactPhone?: string;
  contactName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingAddressCreateInput {
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
  deliveryInstructions?: string;
  contactPhone?: string;
  contactName?: string;
}

export interface ShippingAddressUpdateInput extends Partial<ShippingAddressCreateInput> {}

export interface ShippingAddressResponse {
  shippingAddress: ShippingAddress;
}
