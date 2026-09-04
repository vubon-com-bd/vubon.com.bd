/**
 * Vendor Bank Account Types
 * ভেন্ডর ব্যাংক অ্যাকাউন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorBankAccount extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  accountType: 'savings' | 'current' | 'business';
  bankName: string;
  bankNameBangla?: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
  swiftCode?: string;
  branchName?: string;
  branchCode?: string;
  bankAddress?: string;
  isDefault: boolean;
  isVerified: boolean;
  verifiedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorBankAccountCreateInput {
  vendorId: string;
  accountType: 'savings' | 'current' | 'business';
  bankName: string;
  bankNameBangla?: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
  swiftCode?: string;
  branchName?: string;
  branchCode?: string;
  bankAddress?: string;
  isDefault?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorBankAccountUpdateInput {
  bankName?: string;
  bankNameBangla?: string;
  accountNumber?: string;
  accountName?: string;
  routingNumber?: string;
  swiftCode?: string;
  branchName?: string;
  branchCode?: string;
  bankAddress?: string;
  isDefault?: boolean;
  isVerified?: boolean;
  verifiedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorBankAccountResponse {
  vendorBankAccount: VendorBankAccount;
}
