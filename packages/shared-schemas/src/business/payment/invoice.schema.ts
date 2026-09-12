import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { INVOICE } from '@vubon/shared-constants/src/business/payment/invoice.constants';
import { OrderSchema } from '../checkout/order.schema';

const invoiceStatusKeys = Object.keys(INVOICE.STATUS) as [string, ...string[]];
const invoiceTypeKeys = Object.keys(INVOICE.TYPES) as [string, ...string[]];

export const InvoiceSchema = BaseSchema.extend({
  invoiceId: z.string().uuid(),
  invoiceNumber: z.string().min(1).max(50),
  orderId: z.string().uuid(),
  order: OrderSchema,
  paymentId: z.string().uuid().optional(),
  status: z.enum(invoiceStatusKeys),
  type: z.enum(invoiceTypeKeys),
  subtotal: MoneySchema,
  taxTotal: MoneySchema,
  discountTotal: MoneySchema,
  grandTotal: MoneySchema,
  currency: z.string().min(3).max(3),
  issuedDate: z.date(),
  dueDate: z.date(),
  paidDate: z.date().optional(),
  notes: z.string().optional(),
  terms: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
