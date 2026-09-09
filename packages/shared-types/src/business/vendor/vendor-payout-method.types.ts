import { BaseEntity } from '../../common/base.types';
import { VENDOR_PAYOUT_METHOD } from '@vubon/shared-constants/src/business/vendor/vendor-payout-method.constants';
import { Vendor } from './vendor.types';
import { VendorBankAccount } from './vendor-bank-account.types';

export interface VendorPayoutMethod extends BaseEntity {
  methodId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_PAYOUT_METHOD.TYPES | string;
  bankAccount?: VendorBankAccount;
  mobileNumber?: string;
  email?: string;
  isDefault: boolean;
  isActive: boolean;
  priority: number;
  metadata: Record<string, unknown>;
}
