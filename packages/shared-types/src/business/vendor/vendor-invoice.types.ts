import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_INVOICE } from '@vubon/shared-constants/src/business/vendor/vendor-invoice.constants';
import { Vendor } from './vendor.types';
import { VendorCommission } from './vendor-commission.types';

export interface VendorInvoice extends BaseEntity {
  invoiceId: string;
  invoiceNumber: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_INVOICE.STATUS | string;
  type: keyof typeof VENDOR_INVOICE.INVOICE_TYPES | string;
  amount: Money;
  tax: Money;
  discount: Money;
  total: Money;
  commission: VendorCommission;
  issuedDate: Date;
  dueDate: Date;
  paidDate?: Date;
  notes?: string;
  metadata: Record<string, unknown>;
}
