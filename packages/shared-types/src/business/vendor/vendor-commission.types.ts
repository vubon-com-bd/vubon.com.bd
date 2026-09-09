import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/src/business/vendor/vendor-commission.constants';
import { Vendor } from './vendor.types';

export interface VendorCommission extends BaseEntity {
  commissionId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_COMMISSION.TYPES | string;
  rate: number;
  fixedAmount?: Money;
  minAmount?: Money;
  maxAmount?: Money;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
