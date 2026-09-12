import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { VENDOR_INVOICE } from '@vubon/shared-constants/src/business/vendor/vendor-invoice.constants';
import { VendorCommissionSchema } from './vendor-commission.schema';

const vendorInvoiceStatusKeys = Object.keys(VENDOR_INVOICE.STATUS) as [string, ...string[]];
const vendorInvoiceTypeKeys = Object.keys(VENDOR_INVOICE.INVOICE_TYPES) as [string, ...string[]];

export const VendorInvoiceSchema = BaseSchema.extend({
  invoiceId: z.string().uuid(),
  invoiceNumber: z.string().min(1).max(50),
  vendorId: z.string().uuid(),
  status: z.enum(vendorInvoiceStatusKeys),
  type: z.enum(vendorInvoiceTypeKeys),
  amount: MoneySchema,
  tax: MoneySchema,
  discount: MoneySchema,
  total: MoneySchema,
  commission: VendorCommissionSchema,
  issuedDate: z.date(),
  dueDate: z.date(),
  paidDate: z.date().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
