/**
 * Vendor Payout Method Types
 * ভেন্ডর পেআউট পদ্ধতি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorPayoutMethod extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: 'bank_transfer' | 'mobile_banking' | 'payment_gateway' | 'check' | 'cash';
  name: string;
  nameBangla?: string;
  isDefault: boolean;
  isActive: boolean;
  bankAccountId?: string;
  mobileBankingId?: string;
  gatewayId?: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  routingNumber?: string;
  swiftCode?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorPayoutMethodCreateInput {
  vendorId: string;
  type: 'bank_transfer' | 'mobile_banking' | 'payment_gateway' | 'check' | 'cash';
  name: string;
  nameBangla?: string;
  isDefault?: boolean;
  bankAccountId?: string;
  mobileBankingId?: string;
  gatewayId?: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  routingNumber?: string;
  swiftCode?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPayoutMethodUpdateInput {
  name?: string;
  nameBangla?: string;
  isDefault?: boolean;
  isActive?: boolean;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  routingNumber?: string;
  swiftCode?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPayoutMethodResponse {
  vendorPayoutMethod: VendorPayoutMethod;
}
