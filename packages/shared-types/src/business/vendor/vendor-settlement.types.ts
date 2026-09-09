import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_SETTLEMENT } from '@vubon/shared-constants/src/business/vendor/vendor-settlement.constants';
import { Vendor } from './vendor.types';
import { VendorPayout } from './vendor-payout.types';

export interface VendorSettlement extends BaseEntity {
  settlementId: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_SETTLEMENT.STATUS | string;
  type: keyof typeof VENDOR_SETTLEMENT.SETTLEMENT_TYPES | string;
  amount: Money;
  fee: Money;
  netAmount: Money;
  startDate: Date;
  endDate: Date;
  payout: VendorPayout;
  processedAt?: Date;
  settledAt?: Date;
  metadata: Record<string, unknown>;
}
