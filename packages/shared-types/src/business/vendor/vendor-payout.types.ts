import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/src/business/vendor/vendor-payout.constants';
import { Vendor } from './vendor.types';
import { VendorBankAccount } from './vendor-bank-account.types';

export interface VendorPayout extends BaseEntity {
  payoutId: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_PAYOUT.STATUS | string;
  type: keyof typeof VENDOR_PAYOUT.PAYOUT_TYPES | string;
  amount: Money;
  fee: Money;
  netAmount: Money;
  bankAccount: VendorBankAccount;
  reference: string;
  description?: string;
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
