import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_BANK_ACCOUNT } from '@vubon/shared-constants/src/business/vendor/vendor-bank-account.constants';
import { Vendor } from './vendor.types';

export interface VendorBankAccount extends BaseEntity {
  accountId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_BANK_ACCOUNT.TYPES | string;
  accountType: keyof typeof VENDOR_BANK_ACCOUNT.ACCOUNT_TYPES | string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode?: string;
  isDefault: boolean;
  isVerified: boolean;
  isActive: boolean;
  balance: Money;
  metadata: Record<string, unknown>;
}
